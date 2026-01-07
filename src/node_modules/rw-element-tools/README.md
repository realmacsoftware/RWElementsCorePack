# rw-element-tools

Build tools for RapidWeaver Elements packs. Transforms configuration files into production-ready `properties.json` and `hooks.js` files.

## Installation

```bash
npm install --save-dev rw-element-tools
```

## Quick Start

```bash
# Build all properties and hooks
npx rw-build all

# Build properties only
npx rw-build properties

# Build hooks only
npx rw-build hooks

# Watch for changes
npx rw-build all --watch        # Watch both properties and hooks
npx rw-build properties --watch # Watch properties only
npx rw-build hooks --watch      # Watch hooks only
```

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "rw-build all",
    "build:properties": "rw-build properties",
    "build:hooks": "rw-build hooks",
    "dev": "rw-build all --watch"
  }
}
```

## Configuration

The packs directory can be configured via multiple methods (in priority order):

### 1. CLI Argument (highest priority)

```bash
rw-build all --packs ./my-elements
```

### 2. Environment Variable

```bash
RW_PACKS_DIR=./my-elements npm run build
```

### 3. package.json

```json
{
  "rw-element-tools": {
    "packsDir": "./my-elements"
  }
}
```

### 4. Config File

```javascript
// rw-element-tools.config.js
export default {
  packsDir: './my-elements'
}
```

### 5. Default

If no configuration is provided, looks for `./packs` in the project root.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Properties Build System](#properties-build-system)
4. [Shared Hooks Build System](#shared-hooks-build-system)
5. [Controls](#controls)
6. [Properties](#properties)
7. [Configuration File Format](#configuration-file-format)
8. [Adding New Controls](#adding-new-controls)
9. [Adding New Properties](#adding-new-properties)
10. [Adding Shared Hooks](#adding-shared-hooks)
11. [Advanced Features](#advanced-features)
12. [Build Commands](#build-commands)
13. [Programmatic Usage](#programmatic-usage)

---

## Overview

The build system processes `properties.config.json` files located in element component directories and generates expanded `properties.json` files. This allows developers to:

- **Reuse common UI controls** across multiple elements via `globalControl` references
- **Share property definitions** (like spacing values, font weights) via `use` references
- **Override defaults** per-element while maintaining a single source of truth
- **Apply theme defaults** for consistent theming across elements

### Data Flow

```
properties.config.json     Controls (controls/)
         │                        │
         ▼                        ▼
    ┌─────────────────────────────────────┐
    │       build-properties.js            │
    │  • Expands globalControl references  │
    │  • Resolves 'use' property refs      │
    │  • Applies overrides & defaults      │
    │  • Injects Advanced group controls   │
    └─────────────────────────────────────┘
                    │
                    ▼
           properties.json
      (consumed by RapidWeaver)
```

---

## Directory Structure

```
rw-element-tools/
├── bin/
│   └── cli.js               # CLI entry point (rw-build command)
├── build-properties.js      # Properties build script
├── build-shared-hooks.js    # Shared hooks build script
├── config.js                # Configuration resolver
├── index.js                 # Package entry point
├── package.json             # npm package config
├── README.md                # This documentation
├── controls/                # Reusable UI control definitions
│   ├── index.js             # Exports all controls
│   ├── alignment/           # Flexbox/Grid alignment controls
│   ├── Animations/          # Animation and scroll animation controls
│   ├── Background/          # Background color, image, gradient, video
│   ├── Borders/             # Border and outline controls
│   ├── core/                # Essential controls (ID, CSSClasses, etc.)
│   ├── Effects/             # Box shadow, opacity, filters, blur
│   ├── grid-flex/           # Grid and flexbox item controls
│   ├── interactive/         # Button, input, link, filter controls
│   ├── Layout/              # Position, overflow, visibility, z-index
│   ├── Overlay/             # Overlay color, gradient, image
│   ├── Sizing/              # Width, height, min/max sizing
│   ├── Spacing/             # Margin and padding controls
│   ├── Transforms/          # Rotate, scale, skew, translate
│   ├── Transitions/         # Transition timing and properties
│   └── typography/          # Text color, decoration, styles
├── properties/              # Reusable property value definitions
│   ├── index.js             # Exports all properties
│   ├── Slider.js            # Slider value ranges
│   ├── FontWeight.js        # Font weight options
│   └── ...                  # Other property definitions
└── shared-hooks/            # Shared JavaScript hook functions
    ├── aaaHelpers.js        # Core helper utilities (loaded first)
    ├── classnames.js        # CSS class manipulation utilities
    ├── globalBackground.js  # Background processing functions
    ├── globalSpacing.js     # Spacing class generation
    └── ...                  # Other shared hook modules
```

---

## Properties Build System

### Entry Point

The properties build script is executed via:

```bash
cd src
npm run build
```

This runs `node build.js` which:

1. **Finds all config files** matching the glob pattern:
   ```
   ../**/*.elementsdevpack/components/com.**/**/properties.config.json
   ```

2. **Processes each config file** through the following pipeline:
   - Parse the JSON configuration
   - Set up the Advanced group with injected controls (CSSClasses, ID)
   - Process each property group
   - Expand `globalControl` references
   - Resolve `use` property references
   - Apply overrides and theme defaults
   - Write the output to `properties.json`

### Processing Pipeline

For each property in a config file:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Check for globalControl                                   │
│    └─ If present: Load control from Controls registry        │
│    └─ If absent: Pass through with 'use' resolution only     │
├─────────────────────────────────────────────────────────────┤
│ 2. Deep clone the control (avoid mutations)                  │
├─────────────────────────────────────────────────────────────┤
│ 3. Apply property overrides                                  │
│    └─ String values: Replace directly                        │
│    └─ Object values: Shallow merge                           │
├─────────────────────────────────────────────────────────────┤
│ 4. Apply default values                                      │
│    └─ Primitive defaults: Set control.default                │
│    └─ Object defaults: Merge into theme properties           │
├─────────────────────────────────────────────────────────────┤
│ 5. Apply theme defaults                                      │
│    └─ themeColor, themeFont, themeBorderRadius, etc.         │
├─────────────────────────────────────────────────────────────┤
│ 6. Transform IDs using {{value}} template                    │
│    └─ "prefix{{value}}Suffix" → "prefixControlIdSuffix"      │
├─────────────────────────────────────────────────────────────┤
│ 7. Process nested globalControls recursively                 │
├─────────────────────────────────────────────────────────────┤
│ 8. Resolve 'use' references to Properties                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Shared Hooks Build System

The shared hooks build system combines reusable JavaScript utility functions with component-specific hook code, then applies dead code elimination to produce optimized output.

### Overview

```
src/shared-hooks/*.js          Component hooks.source.js
        │                              │
        ▼                              ▼
    ┌─────────────────────────────────────────┐
    │       build-shared-hooks.js              │
    │  • Concatenates shared + component code  │
    │  • Applies esbuild dead code elimination │
    │  • Keeps only code reachable from        │
    │    transformHook function                │
    └─────────────────────────────────────────┘
                    │
                    ▼
            hooks.js (optimized)
       (consumed by RapidWeaver)
```

### How It Works

1. **Find all source files**: Scans `packs/` for `hooks.source.js` files
2. **Read shared hooks**: Loads all `src/shared-hooks/*.js` files alphabetically
3. **Concatenate**: Combines shared code + component code
4. **Dead code elimination**: Uses esbuild to remove unused functions
5. **Output**: Writes optimized `hooks.js` to each component

### Shared Hook Files

Shared hooks in `src/shared-hooks/` are loaded alphabetically. Name files with prefixes to control load order:

| File Pattern | Purpose |
|--------------|---------|
| `aaaHelpers.js` | Core utilities (loaded first) |
| `classnames.js` | CSS class manipulation |
| `global*.js` | Feature-specific helpers |
| Other `.js` | Additional utilities |

### Component Hook Files

Each component that needs hooks creates a `hooks.source.js` file:

```javascript
// packs/Core.elementsdevpack/components/com.realmacsoftware.button/hooks.source.js

function transformHook(element, renderingContext) {
    // Use any shared hook functions here
    const classes = classnames(
        element.properties.customClasses,
        globalSpacingClasses(element)
    );
    
    return {
        ...element,
        classes
    };
}

exports.transformHook = transformHook;
```

### Key Points

- **Entry point**: The `transformHook` function is the only exported function
- **Dead code elimination**: Only code reachable from `transformHook` is kept
- **No manual imports**: Shared code is concatenated, not imported
- **Auto-generated**: Output `hooks.js` files are marked "do not edit"

### Build Commands

```bash
# Build all hooks once
npm run build:hooks

# Watch for changes
npm run build:hooks:watch

# Or from src/
cd src
npm run build:hooks
```

---

## Controls

Controls are reusable UI component definitions that map to RapidWeaver's property inspector UI elements.

### Control Structure

A control is a JavaScript object (or array of objects) that defines:

```javascript
// Simple control (single object)
const FlexDirection = {
  title: "Direction",
  id: "flexDirection",
  select: {
    default: "flex-col",
    items: [
      { value: "flex-col", title: "Column" },
      { value: "flex-row", title: "Row" },
    ],
  },
};

export default FlexDirection;
```

```javascript
// Compound control (array of objects)
const Link = [
  {
    title: "Link",
    heading: {}
  },
  {
    title: "To",
    id: "globalLink",
    link: {}
  }
];

export default Link;
```

### UI Element Types

Controls can use these UI element types:

| Type | Description | Example |
|------|-------------|---------|
| `select` | Dropdown menu | `{ select: { default: "value", items: [...] } }` |
| `segmented` | Segmented button control | `{ segmented: { default: "a", items: [...] } }` |
| `switch` | Boolean toggle | `{ switch: { default: false } }` |
| `slider` | Numeric slider | `{ slider: { default: 50, min: 0, max: 100 } }` |
| `number` | Numeric input | `{ number: { default: 0 } }` |
| `text` | Text input | `{ text: { default: "" } }` |
| `textArea` | Multi-line text | `{ textArea: { default: "" } }` |
| `link` | Link picker | `{ link: {} }` |
| `resource` | Resource/image picker | `{ resource: {} }` |
| `heading` | Section heading (no value) | `{ heading: {} }` |
| `divider` | Visual separator | `{ divider: {} }` |
| `information` | Info text | `{ information: {} }` |
| `themeColor` | Theme color picker | `{ themeColor: { default: {...} } }` |
| `themeSpacing` | Theme spacing picker | `{ themeSpacing: { mode: "single" } }` |
| `themeBorderRadius` | Border radius picker | `{ themeBorderRadius: {...} }` |
| `themeBorderWidth` | Border width picker | `{ themeBorderWidth: {...} }` |
| `themeShadow` | Shadow picker | `{ themeShadow: {...} }` |

### Control Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Display label in the UI |
| `id` | string | Property identifier (used in templates) |
| `format` | string | CSS class format, e.g., `"gap-x-{{value}}"` |
| `visible` | string | Visibility condition, e.g., `"otherProp == 'value'"` |
| `responsive` | boolean | Whether control is responsive (default: true) |
| `globalControl` | string | Reference to another control (nested) |

### Nested globalControls

Controls can reference other controls for composition:

```javascript
const Borders = [
  {
    globalControl: "ControlType",
    id: "{{value}}Borders",
  },
  {
    globalControl: "BorderStyle",
    visible: "globalControlTypeBorders == 'static'",
  },
  {
    globalControl: "BorderColor",
    visible: "globalControlTypeBorders == 'static'",
  },
];
```

---

## Properties

Properties are reusable value definitions (like enums or option lists) that can be referenced using the `use` key.

### Property Structure

```javascript
// src/properties/FontWeight.js
const FontWeight = {
  default: "normal",
  items: [
    { value: "thin", title: "Thin" },
    { value: "light", title: "Light" },
    { value: "normal", title: "Normal" },
    { value: "medium", title: "Medium" },
    { value: "semibold", title: "Semibold" },
    { value: "bold", title: "Bold" },
  ],
};

export default FontWeight;
```

### Using Properties in Controls

Reference a property using the `use` key:

```javascript
const TextWeight = {
  title: "Weight",
  id: "textWeight",
  select: {
    use: "FontWeight"  // Merges FontWeight's items and default
  }
};
```

The build system will merge the referenced property, with local values taking precedence:

```javascript
// Output
{
  title: "Weight",
  id: "textWeight",
  select: {
    default: "normal",
    items: [
      { value: "thin", title: "Thin" },
      // ... etc
    ]
  }
}
```

---

## Configuration File Format

### properties.config.json Structure

```json
{
  "groups": [
    {
      "title": "Group Title",
      "icon": "sf-symbol-name",
      "properties": [
        // Property definitions
      ]
    }
  ]
}
```

### Using globalControl

Reference a control by name:

```json
{
  "globalControl": "Spacing"
}
```

### Overriding Control Properties

Add properties alongside `globalControl` to override:

```json
{
  "globalControl": "BorderRadius",
  "title": "Corner Radius",
  "default": {
    "base": {
      "topLeft": "lg",
      "topRight": "lg",
      "bottomLeft": "none",
      "bottomRight": "none"
    }
  }
}
```

### ID Templates with {{value}}

Transform the control's ID using a template:

```json
{
  "globalControl": "Spacing",
  "id": "card{{value}}"
}
```

If the Spacing control has `id: "globalPadding"`, the output becomes `id: "cardGlobalPadding"`.

### Theme Defaults

Override theme-related properties:

```json
{
  "globalControl": "Background_Color",
  "themeColor": {
    "default": {
      "name": "brand",
      "brightness": 500
    }
  }
}
```

Supported theme properties:
- `themeColor`
- `themeFont`
- `themeBorderRadius`
- `themeBorderWidth`
- `themeSpacing`
- `themeShadow`
- `themeTextStyle`

### Inline Properties

Properties without `globalControl` are passed through with `use` resolution:

```json
{
  "title": "Custom Width",
  "id": "customWidth",
  "slider": {
    "use": "Slider",
    "default": 100,
    "min": 0,
    "max": 500
  }
}
```

---

## Adding New Controls

### Step 1: Create the Control File

Create a new file in the appropriate `controls/` subdirectory:

```javascript
// src/controls/effects/NewEffect.js

const NewEffect = {
  title: "Effect Intensity",
  id: "effectIntensity",
  format: "effect-[{{value}}%]",
  slider: {
    default: 50,
    min: 0,
    max: 100,
    round: true,
    units: "%"
  }
};

export default NewEffect;
```

### Step 2: Export from index.js

Add the export to `src/controls/index.js`:

```javascript
// In the appropriate section
export { default as NewEffect } from "./Effects/NewEffect.js";
```

### Step 3: Use in Config Files

Reference in any `properties.config.json`:

```json
{
  "globalControl": "NewEffect"
}
```

### Step 4: Rebuild

```bash
cd src
npm run build
```

### Creating Compound Controls

For controls with multiple UI elements:

```javascript
// src/controls/interactive/CustomButton.js

const CustomButton = [
  {
    title: "Button Settings",
    heading: {}
  },
  {
    title: "Style",
    id: "buttonStyle",
    segmented: {
      default: "solid",
      items: [
        { value: "solid", title: "Solid" },
        { value: "outline", title: "Outline" },
        { value: "ghost", title: "Ghost" }
      ]
    }
  },
  {
    title: "Size",
    id: "buttonSize",
    select: {
      use: "ButtonSize"
    }
  }
];

export default CustomButton;
```

### Creating Controls with Nested globalControls

```javascript
// src/controls/layout/CustomLayout.js

const CustomLayout = [
  {
    globalControl: "ControlType",
    id: "{{value}}CustomLayout"
  },
  {
    visible: "globalControlTypeCustomLayout != 'none'",
    divider: {}
  },
  {
    visible: "globalControlTypeCustomLayout != 'none'",
    globalControl: "Position"
  },
  {
    visible: "globalControlTypeCustomLayout != 'none'",
    globalControl: "ZIndex"
  }
];

export default CustomLayout;
```

---

## Adding New Properties

### Step 1: Create the Property File

```javascript
// src/properties/CustomSizes.js

const CustomSizes = {
  default: "md",
  items: [
    { value: "xs", title: "Extra Small" },
    { value: "sm", title: "Small" },
    { value: "md", title: "Medium" },
    { value: "lg", title: "Large" },
    { value: "xl", title: "Extra Large" },
  ]
};

export default CustomSizes;
```

### Step 2: Export from index.js

```javascript
// src/properties/index.js
export { default as CustomSizes } from "./CustomSizes.js";
```

### Step 3: Use in Controls

```javascript
const SizeSelector = {
  title: "Size",
  id: "elementSize",
  select: {
    use: "CustomSizes"
  }
};
```

Or use directly in config files:

```json
{
  "title": "Size",
  "id": "mySize",
  "select": {
    "use": "CustomSizes"
  }
}
```

---

## Adding Shared Hooks

### Step 1: Create the Shared Hook File

Create a new file in `src/shared-hooks/`:

```javascript
// src/shared-hooks/customHelper.js

/**
 * Generate custom CSS classes based on element properties
 * @param {Object} element - The element object
 * @returns {string} CSS class string
 */
function customHelper(element) {
    const classes = [];
    
    if (element.properties.customEnabled) {
        classes.push('custom-enabled');
        
        if (element.properties.customSize) {
            classes.push(`custom-size-${element.properties.customSize}`);
        }
    }
    
    return classes.join(' ');
}
```

### Step 2: Use in Component Hooks

Reference the function in any `hooks.source.js`:

```javascript
// packs/MyPack.elementsdevpack/components/com.example.mycomponent/hooks.source.js

function transformHook(element, renderingContext) {
    // customHelper is available from shared hooks
    const customClasses = customHelper(element);
    
    return {
        ...element,
        customClasses
    };
}

exports.transformHook = transformHook;
```

### Step 3: Build

```bash
npm run build:hooks
```

### Naming Conventions

- **Prefix with `aaa`**: For utilities that must load first (dependencies for other hooks)
- **Prefix with `global`**: For element property processing functions
- **Use descriptive names**: `backgroundClasses.js`, `spacingHelper.js`

### Dead Code Elimination

The build system automatically removes unused code. If you add a function to shared hooks but no component uses it, it won't appear in any output `hooks.js` file. This keeps the output lean.

### Example: Complex Shared Hook

```javascript
// src/shared-hooks/globalLayout.js

/**
 * Generate layout-related CSS classes
 */
function globalLayoutClasses(element) {
    const props = element.properties;
    const classes = [];
    
    // Position
    if (props.position && props.position !== 'static') {
        classes.push(props.position);
    }
    
    // Z-index
    if (props.zIndex) {
        classes.push(`z-${props.zIndex}`);
    }
    
    // Overflow
    if (props.overflow) {
        classes.push(`overflow-${props.overflow}`);
    }
    
    return classes.join(' ');
}

/**
 * Check if element has custom positioning
 */
function hasCustomPosition(element) {
    return element.properties.position && 
           element.properties.position !== 'static';
}
```

---

## Advanced Features

### Conditional Visibility

Show/hide controls based on other property values:

```json
{
  "title": "Custom Value",
  "id": "customValue",
  "visible": "sizeType == 'custom'",
  "number": {
    "default": 100
  }
}
```

Complex conditions:

```json
{
  "visible": "enableFeature == true && mode == 'advanced'"
}
```

### Format Strings

Generate CSS class names from values:

```json
{
  "id": "gapX",
  "format": "gap-x-{{value}}",
  "themeSpacing": {
    "default": { "base": { "value": "4" } }
  }
}
```

Output when value is "8": `gap-x-8`

### Responsive Controls

By default, controls are responsive. Disable with:

```json
{
  "id": "staticValue",
  "responsive": false,
  "text": { "default": "" }
}
```

### The Advanced Group

The build system automatically:
1. Injects `CSSClasses` and `ID` controls at the start of the Advanced group
2. Creates an Advanced group if one doesn't exist
3. Moves any existing Advanced group to the end
4. Sets the icon to "gearshape"

To add controls to the Advanced group:

```json
{
  "groups": [
    {
      "title": "Advanced",
      "properties": [
        { "divider": {} },
        { "globalControl": "HTMLTag" }
      ]
    }
  ]
}
```

---

## Build Commands

### Using the CLI (recommended)

```bash
# Build everything (properties + hooks)
rw-build all

# Build properties only
rw-build properties

# Build hooks only
rw-build hooks

# Watch for changes
rw-build all --watch         # Watch both properties and hooks
rw-build properties --watch  # Watch properties only
rw-build hooks --watch       # Watch hooks only

# Build with custom packs directory
rw-build all --packs ./my-elements

# Show help
rw-build --help
```

### Using npm scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "build": "rw-build all",
    "build:properties": "rw-build properties",
    "build:hooks": "rw-build hooks",
    "dev": "rw-build all --watch"
  }
}
```

Then run:

```bash
npm run build
npm run dev
```

### Development Mode Details

The `--watch` flag monitors for changes and automatically rebuilds:

| Command | Watches |
|---------|---------|
| `rw-build all --watch` | Both properties and hooks (runs watchers concurrently) |
| `rw-build properties --watch` | `properties.config.json` files in `packs/` |
| `rw-build hooks --watch` | `hooks.source.js` files in `packs/` and `shared-hooks/*.js` |

### Troubleshooting

**"Global control 'X' not found"**
- Check the control is exported in `src/controls/index.js`
- Verify the spelling matches exactly (case-sensitive)

**"Property 'X' not found in Properties"**
- Check the property is exported in `src/properties/index.js`
- Verify the `use` key spelling

**Build produces unexpected output**
- Check for circular `globalControl` references
- Verify JSON syntax in config files
- Run with `--trace-warnings` flag for more details

---

## Example: Complete Element Config

```json
{
  "groups": [
    {
      "title": "Content",
      "icon": "text.alignleft",
      "properties": [
        {
          "title": "Heading",
          "id": "headingText",
          "text": {
            "default": "Welcome"
          }
        },
        {
          "globalControl": "HeadingColor"
        }
      ]
    },
    {
      "title": "Layout",
      "icon": "square.split.bottomrightquarter",
      "properties": [
        {
          "globalControl": "Layout"
        }
      ]
    },
    {
      "title": "Spacing",
      "icon": "squareshape.squareshape.dotted",
      "properties": [
        {
          "globalControl": "Spacing"
        }
      ]
    },
    {
      "title": "Background",
      "icon": "paintbrush.fill",
      "properties": [
        {
          "globalControl": "BackgroundTransparent"
        }
      ]
    },
    {
      "title": "Borders",
      "icon": "square.dashed",
      "properties": [
        {
          "globalControl": "Borders"
        }
      ]
    },
    {
      "title": "Advanced",
      "properties": [
        {
          "divider": {}
        },
        {
          "globalControl": "HTMLTag"
        }
      ]
    }
  ]
}
```

---

## Programmatic Usage

You can also use rw-element-tools programmatically in your own build scripts:

```javascript
import { 
  buildProperties, 
  buildHooks, 
  watchProperties,
  watchHooks,
  resolveConfig,
  Controls,
  Properties 
} from 'rw-element-tools';

// Resolve configuration from all sources
const config = await resolveConfig({
  packs: './my-elements'  // Optional CLI override
});

// Build properties
await buildProperties(config);

// Build hooks
await buildHooks(config);

// Watch for changes
await watchProperties(config);  // Watch properties only
await watchHooks(config);       // Watch hooks only

// Or watch both concurrently
await Promise.all([
  watchProperties(config),
  watchHooks(config)
]);
```

### Accessing Controls and Properties

```javascript
import { Controls, Properties } from 'rw-element-tools';

// Use a control definition
console.log(Controls.Spacing);
console.log(Controls.BorderRadius);

// Use a property definition
console.log(Properties.FontWeight);
console.log(Properties.Slider);
```

### Custom Build Pipeline

```javascript
import { resolveConfig, buildProperties, buildHooks } from 'rw-element-tools';

async function customBuild() {
  const config = await resolveConfig();
  
  console.log('Building for:', config.packsDir);
  
  // Build properties first
  await buildProperties(config);
  
  // Then build hooks
  await buildHooks(config);
  
  console.log('Build complete!');
}

customBuild();
```

---

## Publishing

To publish the package to npm:

```bash
cd src
npm login
npm publish
```

For scoped packages:

```bash
npm publish --access public
```

---

## Contributing

When adding new controls or properties:

1. **Follow naming conventions**: PascalCase for exports, descriptive names
2. **Place in correct directory**: Use the categorical structure
3. **Add exports**: Update the relevant `index.js`
4. **Test the build**: Run `npm run build` and verify output
5. **Document**: Add comments for complex controls

---

*Last updated: January 2026*

