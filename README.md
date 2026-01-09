<div align="center">

# RapidWeaver Elements Core Pack

### The Official Component Library for RapidWeaver Elements

**Build stunning, professional websites with 25+ production-ready UI components**

[![License: ESL](https://img.shields.io/badge/License-ESL-green.svg)](LICENSE)
[![RapidWeaver](https://img.shields.io/badge/RapidWeaver-Elements-orange.svg)](https://www.realmacsoftware.com/rapidweaver/)

</div>

---

## ✨ What is the Core Pack?

The **RapidWeaver Elements Core Pack** is the essential component library that powers RapidWeaver Elements—the modern, visual website builder for macOS. This pack provides everything you need to create beautiful, responsive websites without writing code.

Whether you're building a portfolio, business site, blog, or landing page, the Core Pack delivers:

- **25+ Professional Components** — From navigation bars and image galleries to accordions and modals
- **6 Designer Themes** — Beautifully crafted color palettes and typography presets
- **300+ Ready-to-Use Resources** — Icons, images, and SVG graphics
- **170+ Page Templates** — Pre-built layouts to jumpstart your projects

Built by **Realmac Software**, the makers of RapidWeaver, the Core Pack is designed to work seamlessly with the Elements editor, giving you a pixel-perfect WYSIWYG experience.

---

## 🧩 What's Included

### Components

| Category | Components |
|----------|------------|
| **Layout** | Container, Flex, Grid, Background |
| **Navigation** | Navbar, Nav Tree, Nav Page List, Dropdown |
| **Media** | Image, Gallery, Image Slider, Video, Audio Playlist, SVG |
| **Content** | Text, Typography, Button, Divider, Accordion |
| **Interactive** | Modal, Modal Close, Filter, Filter Tags, Reveal |

### Themes

- **Architect** — Clean, professional aesthetic
- **Blush** — Soft, elegant tones
- **Build** — Bold, modern design
- **Solar** — Warm, energetic palette
- **System** — Native macOS styling
- **Typesetter** — Typography-focused refinement

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/realmacsoftware/RWElementsCorePack.git
   cd RWElementsCorePack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs the [rw-elements-tools](https://www.npmjs.com/package/rw-elements-tools) build system and any other required dependencies.

3. **Verify the installation**

   ```bash
   npm run build
   ```

   If successful, you'll see output confirming that the `properties.json` and `hooks.js` files have been generated for each component.

---

## 🛠 Development

### Project Structure

```
RWElementsCorePack/
├── packs/                              # Elements packs
│   └── Core.elementsdevpack/           # Core pack
│       ├── components/                 # 25+ UI components
│       │   ├── com.realmacsoftware.*/  # Individual component folders
│       │   └── shared/                 # Shared utilities & hooks
│       ├── themes/                     # 6 theme definitions
│       ├── templates/                  # 170+ page templates
│       └── resources/                  # SVGs, images, icons
├── package.json                        # npm configuration
└── README.md
```

### Component Anatomy

Each component follows a consistent structure:

```
com.realmacsoftware.componentName/
├── info.json              # Component metadata (name, identifier)
├── properties.config.json # Source: Property inspector configuration
├── properties.json        # Generated: Compiled properties (don't edit)
├── hooks.source.js        # Source: Transform logic & hooks
├── hooks.js               # Generated: Bundled hooks (don't edit)
├── templates/             # HTML templates for rendering
├── collections/           # Optional: Pre-built variations
├── icon.pdf               # Component icon
└── paletteIcon.pdf        # Palette/sidebar icon
```

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build all `properties.json` and `hooks.js` files |
| `npm run build:properties` | Build only `properties.json` files |
| `npm run build:hooks` | Build only `hooks.js` files |
| `npm run dev` | Watch mode — automatically rebuilds on file changes |

### How the Build System Works

This project uses [rw-elements-tools](https://www.npmjs.com/package/rw-elements-tools) to transform source files:

| Source File | Output File | Purpose |
|-------------|-------------|---------|
| `properties.config.json` | `properties.json` | Expands reusable control definitions into full property inspector configs |
| `hooks.source.js` | `hooks.js` | Bundles shared hooks with dead code elimination for optimal file size |

### Editing Components

1. **Modify the property inspector UI**
   
   Edit `properties.config.json` to add, remove, or configure controls that appear in the Elements inspector panel.

2. **Modify the transform logic**
   
   Edit `hooks.source.js` to change how component properties are transformed into HTML/CSS output.

3. **Rebuild the component**
   
   ```bash
   npm run build
   ```

   Or use watch mode for continuous development:
   
   ```bash
   npm run dev
   ```

> ⚠️ **Important:** Never edit `properties.json` or `hooks.js` directly—they are auto-generated and will be overwritten on the next build.

---

## 📂 Using the Pack in RapidWeaver

Once built, the `Core.elementsdevpack` folder can be loaded into RapidWeaver Elements:

1. Open **RapidWeaver Elements**
2. Go to **Preferences** → **Addons**
3. Click **Add Pack** and select the `Core.elementsdevpack` folder
4. The components will now appear in your Elements palette

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Make your changes and test thoroughly
4. Run `npm run build` to ensure everything compiles
5. Commit your changes (`git commit -m 'Add amazing component'`)
6. Push to the branch (`git push origin feature/amazing-component`)
7. Open a Pull Request

---

## 📄 License

This project is licensed under the **Elements Source License (ESL)** — a custom license designed for the RapidWeaver Elements ecosystem.

### What You Can Do

✅ Use, study, and modify the source code  
✅ Create component packs and extensions for RapidWeaver Elements  
✅ Redistribute in source or compiled form for use with RapidWeaver Elements  

### What You Cannot Do

❌ Use in other website builders or competing platforms  
❌ Incorporate into SaaS products or other applications  
❌ Use independently outside the RapidWeaver Elements ecosystem  

See the [LICENSE](LICENSE) file for the complete license terms.

---

## 🔗 Links

- [RapidWeaver Website](https://www.realmacsoftware.com/rapidweaver/)
- [Realmac Software](https://www.realmacsoftware.com/)

---

<div align="center">

**Made with ❤️ by [Realmac Software](https://www.realmacsoftware.com/)**

</div>
