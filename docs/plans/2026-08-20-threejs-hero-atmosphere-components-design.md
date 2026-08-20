# Three.js Hero and Atmosphere Component Family Design

**Date:** 2026-08-20
**Status:** Approved design
**Target:** RapidWeaver Elements Core Pack

## Summary

Create a focused family of Three.js components for high-impact hero and atmospheric visuals in RapidWeaver Elements. The family will be preset-first, with polished results immediately available and deeper controls revealed in advanced inspector groups.

The first release contains three components:

1. **Atmosphere** — shader-driven animated backgrounds.
2. **Particle Field** — spatial particle and trail effects.
3. **Image Effects** — interactive shader treatment for a supplied image.

A later **3D Accent** component can add lit geometry such as glass orbs, metallic blobs, crystals, wireframes, and floating forms after the shared rendering contract has proven reliable.

The product goal is maximum visual impact for hero and atmosphere use cases. It is not a general-purpose 3D scene builder.

## Context

Elements can now render a live Three.js component inside edit mode through `<rwlivepreview>`. The Asterra Image Ripple custom component demonstrates the required editor lifecycle and the separate published-page runtime.

The important constraint is that edit and publish are different JavaScript environments:

- Edit mode receives Elements' bundled Three.js through `import * as THREE from 'three'` and an ES-module lifecycle.
- Published pages do not receive that editor module and must import a separately pinned Three.js runtime.
- Both environments must use the same normalized component settings and matching Three.js versions.

This design therefore shares a scene-host contract and effect behavior, not a single naive entry script.

## Goals

- Produce visually striking hero and section backgrounds with minimal setup.
- Provide polished presets before exposing advanced shader or particle controls.
- Render live in the Elements editor and update without recreating WebGL contexts unnecessarily.
- Keep normal Elements content selectable and editable above the visual layer.
- Integrate with Elements theme colours and existing Container layout controls.
- Behave consistently across edit, preview, and published output.
- Fail to an attractive static layer instead of showing an empty or broken canvas.
- Allow several components on a page without continuous offscreen rendering.

## Non-goals

- A universal scene composer, hierarchy editor, or node-based shader editor.
- Model viewing, product configuration, hotspots, AR/XR, physics, or scroll-directed cinematics in the first release.
- Essential information rendered only into a canvas.
- A separate palette component for every visual preset.
- Reimplementation of normal Elements layout controls inside the Three.js components.

## Product approach

Three portfolio approaches were considered:

1. A small family of focused visual engines.
2. One large Atmosphere Studio containing every effect.
3. Many individual, single-effect showcase components.

The focused-engine family was selected. It provides clearer component boundaries than a single conditional mega-component and avoids the palette clutter and lifecycle duplication of many one-off effects.

Presets are variations of an engine, not separate components. For example, Aurora and Plasma belong to Atmosphere; Starfield and Fireflies belong to Particle Field.

## Launch components

### Atmosphere

Shader-driven visuals intended to cover a broad section or hero.

Initial preset candidates:

- Aurora
- Liquid Gradient
- Plasma
- Silk
- Caustics
- Nebula
- Noise Flow
- Holographic Grid

Primary controls include palette, intensity, speed, scale, direction, pointer response, and ambient motion. Advanced controls expose only parameters meaningful to the selected preset, such as turbulence, frequency, distortion, glow, banding, and chromatic separation.

### Particle Field

Depth- and motion-based ambient scenes.

Initial preset candidates:

- Starfield
- Floating Dust
- Fireflies
- Sparks
- Snow
- Constellation
- Flow Field
- Light Trails

Primary controls include palette, density, particle size, speed, depth, direction, and pointer response. Advanced controls may include connection distance, trail length, turbulence, depth spread, twinkle, and attraction or repulsion strength.

Particle counts are bounded by quality presets rather than exposed as unlimited raw values.

### Image Effects

Interactive treatment for an image selected from Elements Resources.

Initial preset candidates:

- Ripple
- Refraction
- Liquid Lens
- Chromatic Shift
- Heat Haze
- Pixelation
- Depth Parallax
- Hologram

Primary controls include image, crop or focal behavior, effect strength, speed, scale, pointer response, and ambient motion. Advanced controls may include frequency, falloff, channel separation, lens radius, pixel size, turbulence, and depth strength.

The unmodified source image is always retained as the fallback layer.

### Later: 3D Accent

This component introduces perspective cameras, lighting, materials, and real geometry. It should follow the launch family rather than block it.

Candidate presets include glass orb, metallic blob, crystal, torus, wireframe form, and floating geometric cluster.

## Composition and layout

Each launch component uses three visual layers:

1. A static fallback or source layer.
2. A WebGL layer.
3. An optional Elements content dropzone above the visual.

The component fills its parent by default. A normal Elements Container owns responsive height, width, spacing, and clipping. An explicit **Full Viewport** setting may switch the component to `100dvh`; viewport height is not the default.

The content layer remains ordinary DOM content. The WebGL layer is decorative, `aria-hidden`, and does not intercept pointer events. Window-level pointer tracking is bounded to the component's canvas so editor overlays and dropzone content remain interactive.

Static CSS class scoping is used for component styles. The design does not rely on per-instance `{{id}}` interpolation in CSS, which is unreliable in some preview and publish paths.

## Inspector design

Every component follows the same group order.

### Preset

A strong preset is selected by default. Changing the preset establishes a complete, coherent visual configuration.

### Colours

Two to four Elements theme-colour controls, depending on the engine. Presets supply initial palettes while keeping the result connected to the site's design system.

### Motion

Simple controls such as speed, intensity, scale, direction, and ambient motion.

### Interaction

Interaction modes include none, pointer, touch, and ambient plus pointer where appropriate. Strength and smoothing remain simple controls.

### Advanced

Conditional, preset-specific controls expose meaningful visual parameters without turning the component into a shader editor.

### Performance and accessibility

Controls include Automatic, Low, and High quality; an edit-mode animation preference; and defined reduced-motion behavior.

Inspector sliders use reliable, ordinary numeric ranges. Small shader fractions are represented as integer-like inspector values and scaled in Hooks.

## Settings and data flow

Hooks normalize raw inspector values into one logical settings shape:

- preset
- palette
- intensity
- speed
- scale
- interaction mode
- interaction strength
- quality
- editor preview state
- effect-specific advanced values

Hooks clamp every value before serialization.

In edit mode, Hooks URL-encode a JSON representation and pass it through the `<rwlivepreview props="...">` bridge. In publish mode, the same normalized values are rendered into `data-*` attributes or another generated settings payload consumed by the published adapter.

The editor and published adapters must not maintain independently interpreted defaults. Defaults and scaling rules belong to the normalized settings contract.

## Editor adapter and import contract

The edit branch is generated only inside `@if(edit)` and behaves as an ES module:

```javascript
import * as THREE from 'three';

export function mount(el, props) {
  // Create the real canvas and return lifecycle handlers.
}
```

The `<rwlivepreview>` element is the mount host, not the canvas. `mount()` creates and appends the actual canvas. CSS must therefore account for the live-preview wrapper and its nested canvas.

`mount()` returns:

- `update(nextProps)` to apply inspector changes without remounting.
- `setVisible(isVisible)` to stop and restart the animation loop.
- `dispose()` to release every allocated resource.

Elements can preserve the live-preview host while replacing ancestors or rewriting root classes. The adapter therefore resolves the live root from the surviving canvas, observes a stable live-preview descendant, and never assumes an imperative root class will persist.

Only the core bare `three` import is considered guaranteed until tested otherwise. Three.js add-ons such as loaders, controls, and post-processing modules must not assume that `three/addons/...` resolves in the editor. Required add-ons should be bundled into an editor module or supplied through an explicitly verified module path.

## Published adapter and import contract

The published branch is generated only inside `@if(!edit)`. It runs as normal page JavaScript and dynamically imports a separately pinned Three.js build.

The published version must match the editor's Three.js version. A pack-local vendored module is preferred for predictable availability, but a pinned CDN URL can be used when deliberately chosen. The page must not import a separate copy for every component instance.

A shared page-level loader owns:

- the Three.js module promise
- instance discovery
- visibility coordination
- shared observers where appropriate

Effect instances still own and dispose their individual renderers, scenes, textures, materials, geometry, observers, and listeners.

Published code uses the same normalized settings contract as the editor adapter.

## Shared scene-host contract

The shared host behavior covers:

- renderer creation and cleanup
- device-pixel-ratio limits
- canvas sizing and resize observation
- temporary low resolution during resize storms
- visibility detection and animation cancellation
- pointer and touch normalization
- reduced-motion handling
- fallback visibility
- WebGL context loss and recovery
- error reporting in edit mode
- deterministic time and random seeds for testing

Each visual engine owns its scene, shaders, geometry, particles, and preset-specific updates. It exposes create, update, render or tick, resize, and dispose behavior to its environment adapter.

Property changes update uniforms and other lightweight state in place. Preset changes rebuild only the shader, geometry, particle system, or other resources affected by that preset.

## Edit-mode behavior

- The live preview appears beneath the content dropzone.
- Normal clicks continue to select Elements content and components.
- Pointer effects use window-level events and canvas bounds rather than direct canvas hit testing.
- Resource replacements update textures without recreating the renderer.
- Live resizing temporarily drops to a lower pixel ratio and immediately repaints after size changes.
- `setVisible(false)` cancels the animation frame rather than merely skipping GPU drawing.
- Becoming visible resumes from a safe timestamp so hidden time does not create a large animation delta.
- An **Animate in Editor** control can freeze a representative frame without changing published behavior.
- Empty, paused, unsupported, and failed states show concise editor diagnostics.

## Fallbacks and error handling

The WebGL layer becomes visible only after its first successful render.

Fallbacks are:

- Image Effects: the unmodified source image.
- Atmosphere: a static CSS gradient derived from the selected palette.
- Particle Field: a static colour treatment or optional poster image.

Import failure, unsupported WebGL, renderer construction failure, missing resources, image timeouts, shader failure, and context loss all return to the fallback layer.

Edit mode may display a concise diagnostic such as “Choose an image,” “WebGL unavailable,” or “Preview paused.” Published output fails quietly and retains the fallback.

Repeated failures should not create unbounded retry loops or repeated console noise.

## Accessibility

- Canvas output is decorative and `aria-hidden`.
- Meaningful content remains in the normal Elements dropzone.
- No required action depends solely on hover, drag, or pointer movement.
- Reduced-motion preferences stop all automatic shader, particle, and camera motion.
- A reduced-motion scene renders a static representative frame or its fallback.
- Pointer interaction may remain only when it does not create continuing motion.
- An optional visitor-facing pause control is available for especially active effects.
- Text contrast must remain controllable over animated backgrounds.

## Performance policy

- Load Three.js once per environment.
- Create expensive rendering resources only when the component is visible or about to become visible.
- Cancel animation frames while hidden, paused, or disposed.
- Cap device pixel ratio by quality preset.
- Reduce editor resolution during continuous resize events.
- Bound particle counts, light counts, texture sizes, and shader complexity.
- Render static scenes only when settings or size change.
- Coordinate multiple instances so offscreen scenes do not consume the page's rendering budget.
- Dispose animation frames, timers, observers, listeners, textures, materials, geometry, render targets, and contexts.

Exact quality budgets will be tuned with representative Intel and Apple Silicon Macs, mobile devices, and pages containing multiple instances.

## Verification strategy

### Hooks tests

Validate:

- property defaults and clamping
- integer-to-fraction scaling
- conditional inspector behavior where testable
- edit and publish values
- URL-encoded live-preview JSON
- parity between live-preview props and published settings
- root classes and data attributes

### Lifecycle tests

Validate:

- mount, update, visibility pause and resume, and disposal
- property changes do not create unnecessary renderers
- preset changes dispose only replaced resources
- image replacement updates textures
- no active frames, timers, observers, or listeners remain after disposal
- WebGL contexts are released on removal

### Rendering and visual tests

Use deterministic time and seeded randomness to capture each preset at fixed dimensions. Cover:

- normal state
- empty or missing resource
- reduced motion
- low quality
- WebGL failure
- fallback transition

### Elements integration matrix

Exercise:

- edit, preview, and published modes
- multiple instances from the same and different engines
- nested content dropzones
- responsive and continuous resizing
- image replacement
- pointer, touch, and reduced-motion input
- offscreen visibility changes
- component removal, reinsertion, undo, and redo
- WebGL context loss

## Release sequence

1. Extract and validate the shared environment contract from the existing Image Ripple proof.
2. Productize Image Effects first because its rendering, fallback, and live-update behavior already have a working precedent.
3. Build Atmosphere on the same adapter and lifecycle contract.
4. Build Particle Field after quality budgets and multi-instance scheduling are verified.
5. Evaluate 3D Accent only after the launch family is stable in edit, preview, and publish modes.

## Release criteria

A component is ready when:

- It starts with an attractive preset and useful empty state.
- It renders live in edit mode and closely matches published output.
- Inspector changes update without unnecessary remounts.
- Editor selection and nested content remain usable above the visual.
- Hidden and paused instances stop their animation loops.
- Reduced-motion mode contains no automatic movement.
- All import, asset, WebGL, and context-loss failures retain a usable fallback.
- Removal releases its listeners, observers, animation frames, resources, and WebGL context.
- Multiple instances remain within the agreed quality budget.
