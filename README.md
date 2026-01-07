# RWElementsCorePack

The Core Elements pack for RapidWeaver Elements, containing essential UI components for building websites.

## Structure

```
RWElementsCorePack/
├── packs/                              # Elements packs
│   └── Core.elementsdevpack/           # Core pack with 27+ components
│       ├── components/                 # Individual components
│       ├── themes/                     # Theme definitions
│       ├── templates/                  # Page templates
│       └── resources/                  # Shared resources (SVGs, images)
└── src/                                # Build tools
    └── package.json                    # npm dependencies & scripts
```

## Components

Includes components such as:
- Accordion, Box, Button, Container
- Flex, Grid, Gallery, Image, Image Slider
- Navbar, Navigation Tree, Nav Page List
- Text, Typography, Divider
- Background, Modal, Dropdown
- Filter, Filter Tags, Reveal, Animation
- Video, Audio Playlist, SVG
- And more...

## Development

### Setup

```bash
cd src
npm install
```

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build all properties.json and hooks.js files |
| `npm run build:properties` | Build only properties.json files |
| `npm run build:hooks` | Build only hooks.js files |
| `npm run dev` | Watch mode - rebuilds on changes |

### How It Works

This project uses [rw-element-tools](https://www.npmjs.com/package/rw-element-tools) to transform:

- `properties.config.json` → `properties.json` (expands reusable controls)
- `hooks.source.js` → `hooks.js` (bundles shared hooks with dead code elimination)

### Editing Components

1. Edit `properties.config.json` to modify the component's property inspector UI
2. Edit `hooks.source.js` to modify the component's transform logic
3. Run `npm run build` to regenerate the output files

> **Note:** Don't edit `properties.json` or `hooks.js` directly—they are auto-generated.

## License

ISC

