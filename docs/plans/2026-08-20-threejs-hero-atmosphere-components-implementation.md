# Three.js Hero and Atmosphere Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship internal canaries of Image Effects/Ripple, Atmosphere/Flow, and Particle Field/Drift that render inline in RapidWeaver Elements edit mode, publish reliably, and retain attractive static fallbacks.

**Architecture:** Hooks produce one clamped, URL-encoded settings payload for both editor and publish. Each component has a component-local engine shared by its editor adapter and published registration; a small page-level coordinator loads pinned Three.js once and manages discovery, visibility, and removal. The first preset of each engine is completed and gated before additional presets are considered.

**Tech Stack:** RapidWeaver Elements Dev Pack templates and Hooks, Three.js r165, ES modules, GLSL shaders, CSS fallbacks, and Node's built-in `node:test` runner.

---

## Delivery decisions

- Implement only one canary preset per component: **Ripple**, **Flow**, and **Drift**.
- Do not build a universal scene composer, shared renderer, renderer pool, post-processing stack, or Three.js add-on pipeline.
- The editor adapter imports only `import * as THREE from "three"` and is tested in a normal Elements editor session.
- The expected editor revision is 165, based on the current Elements contract. Task 1 is authoritative: if it reports another revision, update the design, this plan, tests, and published pin before continuing.
- Assuming Task 1 confirms r165, the initial published implementation imports exactly:

  ```text
  https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js
  ```

  This matches the known editor revision and the Asterra proof while avoiding a large file in Core's always-published shared assets. The URL is centralized and pinned; failed loading retains the fallback. Reconsider local vendoring only as a separate packaging decision after the canaries pass.
- A small shared published coordinator is acceptable in `components/shared/assets/`; engine code remains component-local.
- Top-level component templates such as `templates/three-runtime.html` are processed by the Dev Pack; do not also `@include` them from `index.html`.
- The production sharing boundary in this release is a lifecycle contract and parameterized test suite. Do not attempt an unverified cross-component editor import from `sharedAssetPath`.
- Components fill their parent. Only an explicit **Full Viewport** switch may add `100dvh`.
- Generated `hooks.js` and `properties.json` are committed but never edited by hand.
- Keep the unrelated untracked `.basecamp/` directory out of every commit.

## File map

```text
packs/Core.elementsdevpack/components/
├── shared/assets/
│   └── elements-three-runtime.module.js
├── com.realmacsoftware.imageEffects/
│   ├── info.json
│   ├── properties.config.json
│   ├── properties.json                         # generated
│   ├── hooks.source.js
│   ├── hooks.js                                # generated
│   ├── icon.pdf
│   ├── paletteIcon.pdf
│   ├── templates/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── three-runtime.html
│   └── assets/page/
│       ├── editor-preview.module.js
│       └── image-effects-engine.module.js
├── com.realmacsoftware.atmosphere/
│   └── ...same standard anatomy...
└── com.realmacsoftware.particleField/
    └── assets/page/
        ├── editor-preview.module.js
        ├── particle-field-engine.module.js
        └── particle-model.module.js

test/
├── helpers/three-lifecycle-contract.mjs
├── three-live-preview-schema.test.mjs
├── three-template-transpiler.test.mjs
├── three-runtime.test.mjs
├── image-effects-component.test.mjs
├── image-effects-runtime.test.mjs
├── atmosphere-component.test.mjs
├── atmosphere-runtime.test.mjs
├── particle-field-component.test.mjs
├── particle-model.test.mjs
└── particle-field-runtime.test.mjs

docs/testing/
└── threejs-elements-matrix.md
```

## Source and generation rules

Edit these files directly:

- `properties.config.json`
- `hooks.source.js`
- `templates/**`
- `assets/page/*.module.js`
- `components/shared/assets/*.module.js`
- `test/**/*.mjs`

Regenerate after every property or Hook change:

```sh
npm run build:properties
npm run build:hooks
```

Inspect generated changes before staging. If the generator touches unrelated components, stop and investigate instead of committing them.

Run focused tests during each task. The repository-wide test command is:

```sh
node --test
```

Do not use `node --test test/`; that form is not supported by the repository's current Node invocation.

---

### Task 1: Prove the Dev Pack live-preview module path

This is a blocking compatibility spike. Do not begin the Ripple renderer until it passes inside Elements.

**Files:**

- Create: `test/three-live-preview-schema.test.mjs`
- Create: `test/three-template-transpiler.test.mjs`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/info.json`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/properties.config.json`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/hooks.source.js`
- Generate: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/properties.json`
- Generate: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/hooks.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/index.html`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/styles.css`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/three-runtime.html`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/editor-preview.module.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js` (publish-path probe only)
- Create: `packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js` (publish-path probe only)
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/icon.pdf`
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/paletteIcon.pdf`
- Modify: `graphics/Component Icons.sketch`
- Create: `docs/testing/threejs-elements-matrix.md`

**Step 1: Write the failing schema test**

Use `fs.readFileSync` assertions, following `test/site-search-component.test.mjs`:

```js
test("Image Effects uses the Dev Pack live-preview contract", () => {
    const template = read("templates/index.html");
    const publishTemplate = read("templates/three-runtime.html");
    const module = read("assets/page/editor-preview.module.js");

    assert.match(template, /<rwlivepreview\b/);
    assert.match(template, /module="\{\{assetPath\}\}\/editor-preview\.module\.js"/);
    assert.match(template, /props="\{\{livePreviewProps\}\}"/);
    assert.match(module, /import \* as THREE from ["']three["']/);
    assert.match(module, /from ["']\.\/image-effects-engine\.module\.js["']/);
    assert.match(module, /export function mount\(/);
    assert.match(module, /update\(next/);
    assert.match(module, /setVisible\(visible/);
    assert.match(module, /dispose\(\)/);
    assert.match(publishTemplate, /type="module"/);
    assert.match(publishTemplate, /\{\{sharedAssetPath\}\}\/elements-three-runtime\.module\.js/);
    assert.match(publishTemplate, /\{\{assetPath\}\}\/image-effects-engine\.module\.js/);
});
```

Run:

```sh
node --test test/three-live-preview-schema.test.mjs
```

Expected: FAIL because the component files do not exist.

**Step 2: Add the smallest valid component shell**

Use this metadata initially:

```json
{
  "identifier": "com.realmacsoftware.imageEffects",
  "author": "Realmac Software",
  "title": "Image Effects",
  "group": "Media",
  "build": "1",
  "version": "1",
  "framework": "Elements"
}
```

The spike Hook must pass the exact Dev Pack paths and encoded props:

```js
const transformHook = (rw) => {
    const isEdit = rw.project.mode === "edit";
    const settings = {
        schemaVersion: 1,
        preset: "spike",
        spikeValue: Number(rw.props.spikeValue) || 50,
    };
    const payload = encodeURIComponent(JSON.stringify(settings));

    rw.setRootElement({
        as: "div",
        class: "three-image-effects",
        args: { "data-elements-three-engine": "image-effects" },
    });

    rw.setProps({
        isEdit,
        assetPath: rw.component.assetPath,
        sharedAssetPath: rw.component.sharedAssetPath,
        livePreviewProps: payload,
    });
};

exports.transformHook = transformHook;
```

Give `properties.config.json` one temporary, integer-valued `spikeValue` slider so changing it can prove that Elements calls `update`. The generated schema is replaced with the real Image Effects controls in Task 2.

```json
{
  "groups": [
    {
      "title": "Preview Probe",
      "icon": "slider.horizontal.3",
      "properties": [
        {
          "title": "Value",
          "id": "spikeValue",
          "responsive": false,
          "slider": {
            "default": 50,
            "min": 0,
            "max": 100,
            "step": 1,
            "round": true
          }
        }
      ]
    }
  ]
}
```

The edit template must use lowercase tag and attributes:

```html
@if(isEdit)
<rwlivepreview
    module="{{assetPath}}/editor-preview.module.js"
    props="{{livePreviewProps}}"
    class="three-image-effects__preview"
></rwlivepreview>
@endif
```

Also prove the final published URL shapes before writing the real runtime. The two probe modules export constants only:

```js
// components/shared/assets/elements-three-runtime.module.js
export const PUBLISH_RUNTIME_PROBE = "shared-ok";

// com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js
export const IMAGE_EFFECTS_ENGINE_PROBE = "engine-ok";
```

The root-level `templates/three-runtime.html` is processed automatically and must not be included from `index.html`:

```html
@if(!isEdit)
@portal(bodyEnd, id: "com.realmacsoftware.imageEffects.three-probe", includeOnce: true)
<script type="module">
    import { PUBLISH_RUNTIME_PROBE } from "{{sharedAssetPath}}/elements-three-runtime.module.js";
    import { IMAGE_EFFECTS_ENGINE_PROBE } from "{{assetPath}}/image-effects-engine.module.js";

    document
        .querySelectorAll('[data-elements-three-engine="image-effects"]')
        .forEach((host) => {
            host.dataset.threePublishProbe =
                PUBLISH_RUNTIME_PROBE + ":" + IMAGE_EFFECTS_ENGINE_PROBE;
        });
</script>
@endportal
@endif
```

This probe deliberately does not load Three.js; its job is to verify shared/component asset URLs, MIME type, inline-module interpolation, and root-template processing.

The spike module should append its own canvas and render a flat diagnostic frame with the editor-provided Three module. It must return synchronous lifecycle handlers. During this task only, set `el.dataset.threeRevision = THREE.REVISION` so the manual check can record the editor revision.

```js
import * as THREE from "three";
import { IMAGE_EFFECTS_ENGINE_PROBE } from "./image-effects-engine.module.js";

export function mount(el, props) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas);
    el.dataset.threeRevision = THREE.REVISION;
    el.dataset.threeEditorDependency = IMAGE_EFFECTS_ENGINE_PROBE;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setSize(32, 32, false);
    renderer.setClearColor(0x7c3aed, 1);
    renderer.clear();
    let disposed = false;
    let isVisible = true;

    return {
        update(next) {
            props = next || {};
            renderer.setClearColor(Number(props.spikeValue) > 50 ? 0x06b6d4 : 0x7c3aed, 1);
            renderer.clear();
        },
        setVisible(visible) {
            isVisible = Boolean(visible);
            canvas.hidden = !isVisible;
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            renderer.dispose();
            renderer.forceContextLoss();
            canvas.remove();
        },
    };
}
```

Export temporary internal-canary icons from `graphics/Component Icons.sketch`; do not copy another component's icon.

**Step 3: Generate and verify**

Create `test/three-template-transpiler.test.mjs` around the official smoke harness named in `tasks/lessons.md`. Use `createRequire(import.meta.url)` to load:

```text
/Applications/Elements.app/Contents/Frameworks/RWElementsILTranspiler.framework/Versions/A/Resources/elementsLangTranspiler.js
```

Call its exported `run(source)` for every existing `.html` and `.css` file under the three component `templates/` directories. Skip with an explicit message only when Elements.app is not installed; the release Mac may not skip. This is a parser smoke test, not a substitute for the real editor gate.

Run:

```sh
npm run build:properties
npm run build:hooks
node --test test/three-live-preview-schema.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
```

Expected: all commands PASS and only the new component's generated files change.

**Step 4: Pass the real Elements gate**

Load the Dev Pack in a normal Elements editor session. The local UI-development server is not valid evidence for asset module URLs.

Record the Elements build and `THREE.REVISION` in `docs/testing/threejs-elements-matrix.md`, then verify:

- `{{assetPath}}/editor-preview.module.js` resolves.
- Bare `three` resolves to revision 165.
- The spike editor module's relative engine import resolves and the host reports `data-three-editor-dependency="engine-ok"`.
- The `<rwlivepreview>` wrapper contains exactly one module-owned canvas.
- A prop edit calls `update` without appending a second canvas.
- Scrolling the component offscreen and back exercises `setVisible`.
- Delete and undo exercise `dispose` and remount without a context warning.
- Save, close, and reopen the project; the preview still loads.
- Open Elements Preview and a locally exported/published page; the host reports `data-three-publish-probe="shared-ok:engine-ok"` with no module URL or MIME error.

Expected: every item PASS. Stop here if the module URL or bare import fails. If `THREE.REVISION` is not `165`, update every revision/version assertion and the future CDN pin in both plan documents as part of this spike; do not allow editor/publish version drift.

**Step 5: Commit**

```sh
git add test/three-live-preview-schema.test.mjs \
  test/three-template-transpiler.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects \
  packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js \
  graphics/Component\ Icons.sketch \
  docs/testing/threejs-elements-matrix.md
git commit -m "spike: validate Three.js Dev Pack preview"
```

---

### Task 2: Define the Image Effects component contract

**Files:**

- Create: `test/image-effects-component.test.mjs`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/properties.config.json`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/hooks.source.js`
- Generate: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/properties.json`
- Generate: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/hooks.js`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/index.html`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/styles.css`
- Verify unchanged until Task 4: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/three-runtime.html`

**Step 1: Write Hook and template tests first**

Copy the VM harness shape from `test/shapes-component.test.mjs`. Mock `rw.component.assetPath`, `rw.component.sharedAssetPath`, `rw.node.id`, and `rw.project.mode`.

Cover these cases:

- The resource root has `rwResourceDropZone: "effectImage"`.
- `true`, `false`, `"true"`, and `"false"` normalize correctly.
- Numeric strings normalize; invalid values use defaults.
- Strength, idle strength, and chromatic controls clamp before division by 1000.
- The live-preview payload is URI encoded.
- `root.args["data-elements-three-settings"] === computedProps.livePreviewProps`.
- Image source, identity, alt, width, and height survive normalization.
- The image source is rendered in a normal `<img>` fallback.
- Edit mode renders `<rwlivepreview>`; publish mode renders a real canvas marked with `data-elements-three-canvas`.
- Canvas is `aria-hidden` and CSS gives the canvas layer `pointer-events: none`.
- Root classes are static and contain no node-ID selector.
- The root remains flow-based (`position: relative`), fills its parent, and is never absolutely positioned as a layout mechanism.
- `100dvh` is applied only by the Full Viewport modifier.
- Every Image Effects template passes the existing Core IL-safety guards: no `@raw`, no backslashes, and every `{{...}}` is a simple, matched property insertion.
- Generated `hooks.js` contains the engine/root contract and generated `properties.json` contains every canary property ID after the build.

Run:

```sh
node --test test/image-effects-component.test.mjs
```

Expected: FAIL against the spike shell.

**Step 2: Implement one settings normalizer**

Keep normalization in `hooks.source.js`; do not create separate editor and publish defaults.

```js
const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number)
        ? Math.min(Math.max(number, min), max)
        : fallback;
};

const asBoolean = (value, fallback) => {
    if (value === true || value === "true") return true;
    if (value === false || value === "false") return false;
    return fallback;
};

const normalizeSettings = (props, nodeId) => {
    const resource = props.effectImage || {};
    return {
        schemaVersion: 1,
        engine: "image-effects",
        preset: "ripple",
        image: {
            identity: resource.id || resource.path || resource.image || "",
            src: resource.image || "",
            alt: resource.alt || "",
            width: Number(resource.width) || 0,
            height: Number(resource.height) || 0,
        },
        strength: clamp(props.strength, 2, 80, 25) / 1000,
        speed: clamp(props.speed, 1, 8, 2),
        frequency: clamp(props.frequency, 6, 70, 28),
        decay: clamp(props.decay, 2, 18, 7),
        chromaticAberration:
            clamp(props.chromaticAberration, 0, 30, 6) / 1000,
        idleMotion: asBoolean(props.idleMotion, true),
        idleStrength: clamp(props.idleStrength, 1, 50, 12) / 1000,
        ambientChromaticAberration:
            clamp(props.ambientChromaticAberration, 0, 60, 8) / 1000,
        animateInEditor: asBoolean(props.animateInEditor, true),
        quality: ["automatic", "low", "high"].includes(props.quality)
            ? props.quality
            : "automatic",
        fullViewport: asBoolean(props.fullViewport, false),
        instanceKey: nodeId,
    };
};
```

Serialize the same object once:

```js
const settings = normalizeSettings(rw.props, rw.node.id);
const settingsPayload = encodeURIComponent(JSON.stringify(settings));

rw.setRootElement({
    as: "div",
    class: classnames([
        "three-image-effects",
        settings.fullViewport ? "three-visual--viewport" : null,
        globalLayout(rw),
        globalSizing(rw),
        globalSpacing(rw),
        advancedClasses(rw),
    ]).toString(),
    args: {
        rwResourceDropZone: "effectImage",
        "data-elements-three-engine": "image-effects",
        "data-elements-three-settings": settingsPayload,
    },
});
```

Pass `isEdit`, `assetPath`, `sharedAssetPath`, `livePreviewProps`, `effectImage`, and `hasImage` through `rw.setProps()`.

**Step 3: Build the canary inspector**

Use integer-friendly slider ranges. Organize the Inspector as:

1. Preset — Ripple, stored now even though it is the sole choice.
2. Image — resource well using the exact schema below.
3. Motion — speed and ambient-motion switch.
4. Interaction — strength.
5. Advanced — frequency, falloff, active/ambient chromatic aberration, ambient strength.
6. Performance and Accessibility — Automatic/Low/High, Animate in Editor, Full Viewport.
7. Standard Layout, Sizing, and Spacing global controls.

Do not add any of the later Image Effects presets in this task.

```json
{
  "title": "Image",
  "id": "effectImage",
  "responsive": false,
  "resource": {
    "accepts": "image/*",
    "excludes": ".svg"
  }
}
```

**Step 4: Implement the three visual layers**

The template must retain the accessible source image underneath WebGL:

```html
<div class="three-image-effects__source">
    @if(hasImage)
    <img
        src="{{effectImage.image}}"
        alt="{{effectImage.alt}}"
        loading="eager"
        decoding="async"
    >
    @else
    @if(isEdit)
    <div class="three-image-effects__empty">Choose or drop an image</div>
    @endif
    @endif
</div>

@if(isEdit)
<rwlivepreview
    module="{{assetPath}}/editor-preview.module.js"
    props="{{livePreviewProps}}"
    class="three-image-effects__preview"
></rwlivepreview>
@else
<canvas
    class="three-image-effects__canvas"
    data-elements-three-canvas
    aria-hidden="true"
></canvas>
@endif

<div class="three-image-effects__content">
    @dropzone("content", title: "Content")
</div>
```

Use z-index 1 for fallback, 2 for preview/canvas, and 3 for content. Keep both preview wrapper and its nested canvas sized to the same box. The actual canvas starts transparent and becomes opaque only with `data-three-state="ready"`; do not hide the source image from assistive technology.

Use the Asterra-proven root baseline: `position: relative`, `width: 100%`, `height: 100%`, `min-width: 0`, `min-height: 16rem`, `overflow: hidden`, and `isolation: isolate`. Normal Containers/Grid/Flex own external sizing and spacing.

**Step 5: Generate, test, and commit**

Run:

```sh
npm run build:properties
npm run build:hooks
node --test test/image-effects-component.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
git diff --check
```

Expected: PASS.

```sh
git add test/image-effects-component.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects
git commit -m "feat: define Image Effects component contract"
```

---

### Task 3: Port Ripple behind a testable lifecycle

**Files:**

- Create: `test/helpers/three-lifecycle-contract.mjs`
- Create: `test/image-effects-runtime.test.mjs`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/editor-preview.module.js`

**Step 1: Write the shared lifecycle contract tests**

The helper should accept a harness factory rather than import Three.js:

```js
export function testThreeLifecycleContract(label, createHarness) {
    test(`${label}: update keeps one renderer`, async () => {
        const h = await createHarness();
        h.lifecycle.update(h.nextSettings());
        assert.equal(h.createdRenderers(), 1);
    });

    test(`${label}: hidden cancels and visible resumes one RAF`, async () => {
        const h = await createHarness();
        h.lifecycle.setVisible(false);
        assert.equal(h.pendingFrames(), 0);
        h.lifecycle.setVisible(true);
        assert.equal(h.pendingFrames(), 1);
    });

    test(`${label}: dispose is complete and idempotent`, async () => {
        const h = await createHarness();
        h.lifecycle.dispose();
        h.lifecycle.dispose();
        assert.equal(h.pendingFrames(), 0);
        assert.equal(h.listenerCount(), 0);
        assert.equal(h.observerCount(), 0);
        assert.equal(h.undisposedGpuResources(), 0);
        assert.equal(h.contextLossCount(), 1);
    });
}
```

Add Image Effects-specific tests for:

- Missing image does not construct a renderer.
- Initial and replacement images are fresh `Image` objects loaded from the current rendered DOM `currentSrc`/`src`.
- If the rendered DOM `currentSrc` changes while the encoded props remain identical, edit mode still detects it, loads a fresh `Image`, and replaces the texture.
- A later image request wins over a slower earlier request.
- An `update()` that arrives before the new bitmap decodes can never upload pixels from the previous request.
- Removing an image disposes the old texture and reveals the fallback.
- Uniform-only changes retain renderer, geometry, material, and texture.
- Quality caps DPR at 1 for Low, 1.5 for Automatic, and 2 for High, never exceeding the device DPR.
- A resize storm temporarily drops DPR to 1 and restores the selected cap after settling.
- First successful render sets `data-three-state="ready"` on the canvas.
- Image, renderer, shader, and context failures remove the ready state. Three import rejection is owned and tested by the published coordinator in Task 4.
- Reduced motion disables pointer and idle displacement, renders once, and has no pending RAF.
- With idle motion off, Ripple is render-on-demand: it has no RAF until bounded pointer input begins and stops again after activity decays.
- Pointer events outside canvas bounds do not activate Ripple.
- Active and ambient chromatic settings update separate uniforms; zero disables the corresponding channel split.
- Dispose releases texture, material, geometry, renderer, observer, listeners, timers, and context.
- Disposing while image initialization is pending prevents later renderer creation, texture upload, observers, or listeners.

Run:

```sh
node --test test/image-effects-runtime.test.mjs
```

Expected: FAIL because the engine does not exist.

**Step 2: Define the component-local engine API**

The engine module must not import Three.js. Receive the environment so the same engine can run in editor and publish and tests can inject fakes:

```js
export function mountImageEffects({
    THREE,
    root,
    canvas,
    settings,
    mode,
    env = createBrowserEnvironment(),
}) {
    // Own scene resources and return the common lifecycle.
    return {
        update(nextSettings) {},
        setVisible(visible) {},
        dispose() {},
    };
}
```

Keep `createBrowserEnvironment()` injectable for RAF, timers, `ResizeObserver`, `Image`, `matchMedia`, clock, and event targets.

The state machine is:

```text
fallback -> loading -> ready
    ^           |         |
    +-----------+---------+
       missing/error/loss
```

Only `ready` makes the canvas opaque.

**Step 3: Port only the proven Ripple scene**

Port the shader and cover-UV behavior from the Asterra custom component at:

```text
packs/Core.elementsdevpack/projects/Asterra.elements/data.json
custom component D8C8012A-0143-4541-AB30-F721FD7518F1
```

Retain the proven Asterra controls:

- strength
- speed
- frequency
- decay/falloff
- idle motion and idle strength

Add the two chromatic-aberration controls from the user-supplied extended prototype as explicit new canary work. The repository's older Asterra JSON does not yet contain this extension. Active chroma offsets red/blue samples along the ripple direction; ambient chroma offsets them along the idle-wave direction:

```glsl
vec2 chromaOffset = direction * wave * falloff
    * uChromaticAberration * uActivity;
vec2 ambientDirection = normalize(idleWave + vec2(0.0001));
chromaOffset += ambientDirection * uAmbientChromaticAberration
    * uIdle * (1.0 - uActivity * 0.6);

vec4 centerColor = texture2D(uTexture, clamp(uv, 0.001, 0.999));
float red = texture2D(uTexture, clamp(uv + chromaOffset, 0.001, 0.999)).r;
float blue = texture2D(uTexture, clamp(uv - chromaOffset, 0.001, 0.999)).b;
gl_FragColor = vec4(red, centerColor.g, blue, centerColor.a);
```

Make these lifecycle corrections while porting:

- `setVisible(false)` cancels the outstanding RAF; it must not keep scheduling skipped frames.
- Resume resets the last timestamp before scheduling.
- Reduced motion stops all automatic and pointer motion and renders one representative frame.
- `animateInEditor: false` freezes only `mode: "edit"`; it never changes published motion.
- A resize renders immediately after `renderer.setSize()` so no cleared/stretched frame is presented.
- During a resize storm, temporarily use DPR 1 and restore the quality-capped DPR after 180 ms.
- Use a monotonically increasing image-request token so stale loads cannot replace the current texture.
- In edit mode, compare the live DOM image source after relevant DOM mutations and resize callbacks as well as `update()`. This covers same-identity replacements and responsive `currentSrc` changes without polling continuously.
- Disposal invalidates every pending async token before releasing current resources.
- Observe the stable canvas/live-preview descendant, not an ancestor Elements may replace.
- Use window pointer events plus canvas bounds; the canvas remains pointer-transparent.
- Mark readiness on the surviving canvas, not an imperative root class.

**Step 4: Replace the spike editor module**

```js
import * as THREE from "three";
import { mountImageEffects } from "./image-effects-engine.module.js";

export function mount(el, props) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas);

    const initialRoot = el.closest(".three-image-effects") || el.parentElement;
    const getRoot = () =>
        (canvas.isConnected && canvas.closest(".three-image-effects")) ||
        initialRoot;

    return mountImageEffects({
        THREE,
        root: getRoot,
        canvas,
        settings: props || {},
        mode: "edit",
    });
}
```

The engine accepts either a root element or a root resolver, so it never retains a replaceable editor ancestor as its only lookup path.

Keep `export const IMAGE_EFFECTS_ENGINE_PROBE = "engine-ok"` temporarily so the Task 1 published-path probe remains valid at this intermediate commit. Task 4 removes the probe portal and this temporary export when real registration replaces it.

**Step 5: Verify and commit**

Run:

```sh
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/editor-preview.module.js
node --test test/image-effects-runtime.test.mjs
node --test test/image-effects-component.test.mjs
```

Expected: PASS.

```sh
git add test/helpers/three-lifecycle-contract.mjs \
  test/image-effects-runtime.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page
git commit -m "feat: add Image Effects Ripple engine"
```

---

### Task 4: Add the shared published-page coordinator

**Files:**

- Create: `test/three-runtime.test.mjs`
- Modify: `packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/three-runtime.html`
- Modify: `packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js` (remove probe export)

**Step 1: Test the coordinator as a dependency-injected factory**

Test:

- The exact pinned r165 URL is exported.
- Two hosts and two registered engine names still call `loadThree()` once.
- Registration rescans hosts that existed before the engine registered.
- A host mounts at most once.
- An initially offscreen host is observed but does not load Three.js or create a renderer until it approaches the viewport.
- A host removed before first intersection never mounts.
- A host removed, or a runtime stopped, after the Three import begins but before it resolves never mounts or attaches instance resources.
- URI-encoded settings decode safely.
- Invalid settings retain fallback and log once.
- Intersection visibility calls the instance's `setVisible`.
- Removed hosts call `dispose` once.
- Added hosts are discovered.
- A rejected Three import is cached and does not retry on every mutation.
- Calling `stop()` disconnects shared observers and disposes every instance.

Use this API shape:

```js
export const THREE_VERSION = "0.165.0";
export const THREE_URL =
    "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js";

export function createElementsThreeRuntime(deps) {
    return {
        register(engineName, mountEngine) {},
        scan(root) {},
        start() {},
        stop() {},
    };
}

export function getElementsThreeRuntime() {}
```

Run:

```sh
node --test test/three-runtime.test.mjs
```

Expected: FAIL because the probe module does not implement the coordinator API.

**Step 2: Implement the browser singleton**

Requirements:

- No DOM work occurs merely by importing the module in Node.
- `getElementsThreeRuntime()` lazily creates one browser singleton on `window`.
- The first `register()` call starts DOM-ready scanning automatically; portal registrations require no second bootstrap call.
- `loadThree` stores one promise using `import(THREE_URL)`.
- `IntersectionObserver` owns published visibility coordination.
- Use a small preload margin (for example 200 px): first intersection triggers lazy mount; later visibility changes call `setVisible`.
- If `IntersectionObserver` is unavailable, mount immediately and preserve all other cleanup behavior.
- `MutationObserver` discovers insertions and disposes removals.
- Component instances still own canvas, renderer, scene, resize observer, input listeners, and GPU resources.
- The coordinator finds the published canvas with `[data-elements-three-canvas]`; it never assumes an engine-specific class name.
- The runtime passes `{ THREE, host, canvas, settings }` to the registered engine factory.
- A host's fallback remains unchanged if mounting fails.
- Replace the Task 1 probe exports with this real API; do not retain a second bootstrap path.

**Step 3: Register Image Effects once per page**

Use a component-specific include-once portal; instance settings remain on each root:

```html
@if(!isEdit)
@portal(bodyEnd, id: "com.realmacsoftware.imageEffects.three", includeOnce: true)
<script type="module">
    import { getElementsThreeRuntime } from "{{sharedAssetPath}}/elements-three-runtime.module.js";
    import { mountImageEffects } from "{{assetPath}}/image-effects-engine.module.js";

    getElementsThreeRuntime().register("image-effects", (context) =>
        mountImageEffects({
            THREE: context.THREE,
            root: context.host,
            canvas: context.canvas,
            settings: context.settings,
            mode: "publish",
        })
    );
</script>
@endportal
@endif
```

Do not put per-instance JSON in the include-once portal.

This replaces the `three-probe` portal. Remove the temporary `PUBLISH_RUNTIME_PROBE` and `IMAGE_EFFECTS_ENGINE_PROBE` exports once the real registration template and its tests pass.

**Step 4: Verify and commit**

Run:

```sh
node --check packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js
node --test test/three-runtime.test.mjs
node --test test/image-effects-component.test.mjs
node --test test/image-effects-runtime.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
```

Expected: PASS.

```sh
git add test/three-runtime.test.mjs \
  packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/templates/three-runtime.html \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects/assets/page/image-effects-engine.module.js
git commit -m "feat: add shared Three.js page coordinator"
```

---

### Task 5: Pass the Image Effects canary gate

**Files:**

- Modify: `test/image-effects-runtime.test.mjs`
- Modify: `test/three-runtime.test.mjs`
- Modify: `docs/testing/threejs-elements-matrix.md`
- Modify as failures require: Image Effects engine, adapter, template, Hook, and styles

**Step 1: Add repeatable failure seams**

The test environment must independently simulate:

- Three module rejection
- renderer-construction failure
- image timeout and decode failure
- shader/material failure
- `webglcontextlost` and `webglcontextrestored`
- visibility changes
- reduced motion changes

Test a bounded context-recovery attempt. A second failure remains on fallback and does not create a retry loop.

**Step 2: Run the automated canary gate**

```sh
node --test test/three-live-preview-schema.test.mjs
node --test test/three-runtime.test.mjs
node --test test/image-effects-component.test.mjs
node --test test/image-effects-runtime.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
node --test
git diff --check
```

Expected: every command PASS.

**Step 3: Run the Image Effects Elements matrix**

Create one QA page with:

- one Ripple in a 640x360 Container
- one in a tall/narrow Container
- one in responsive Grid/Flex
- one below a long spacer for offscreen testing
- two duplicated instances using different images and settings
- text, links, and buttons in the content dropzone

Run in edit, Elements Preview, published Safari, published Chromium, and a narrow mobile viewport. Repeat from a freshly created project and a saved/reopened project.

Pass criteria:

- Empty state starts no renderer.
- Dropping, replacing, and removing an image never flashes an old texture.
- Fallback and canvas have identical bounds and crop with no layout shift.
- Pointer input activates only inside the canvas bounds.
- Reduced Motion disables idle and pointer displacement while retaining the image.
- Idle Motion off consumes no continuing RAF while the pointer is inactive.
- Rapid width dragging produces no blank/stale frame and restores sharp DPR.
- Inspector changes update without a second canvas or renderer.
- Duplicate, copy/paste, reorder, delete, undo, and redo leave exactly one lifecycle per instance.
- Offscreen scenes have zero pending component render frames after visibility settles.
- Ten add/delete cycles return active loop, observer, listener, and context counts to baseline.
- Canvas does not capture selection, clicks, scrolling, or dropzone controls.
- VoiceOver announces the source image alt exactly once and ignores the canvas.
- Blocked Three loading, renderer failure, and context loss expose the image fallback.
- No unhandled promise, WebGL context-limit warning, or monotonic memory growth appears.

Do not begin Atmosphere until this matrix passes without a blank image, duplicate loop, selection conflict, or retained context.

**Step 4: Record and commit the gate**

Record Elements/app/browser versions and pass/fail evidence in `docs/testing/threejs-elements-matrix.md`.

```sh
git add test/image-effects-runtime.test.mjs test/three-runtime.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects \
  docs/testing/threejs-elements-matrix.md
git commit -m "test: pass Image Effects canary gate"
```

---

### Task 6: Define the Atmosphere/Flow component contract

**Files:**

- Create: `test/atmosphere-component.test.mjs`
- Create standard static component anatomy under: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/` (Task 7 adds engine/adapter/runtime registration files)
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/icon.pdf`
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/paletteIcon.pdf`
- Modify: `graphics/Component Icons.sketch`

**Step 1: Write the failing component tests**

Follow the Image Effects VM harness. Assert:

- Metadata identifier is `com.realmacsoftware.atmosphere`, title is Atmosphere, group is Animation.
- Preset is fixed to `flow` for the canary.
- Two theme-colour formatted classes pass through unchanged.
- Intensity, scale, and speed accept numeric strings and clamp.
- Motion, Animate in Editor, Full Viewport, and quality normalize.
- Editor and publish use the identical URI-encoded settings payload.
- The edit template uses the exact editor module contract.
- Publish emits an `aria-hidden` canvas ready for the runtime registration added in Task 7.
- The published canvas has the common `data-elements-three-canvas` marker used by the coordinator.
- A normal content dropzone sits above the visual.
- No pointer data attribute or listener requirement is present.
- Fallback color probes remain visible under the canvas.
- The root uses the same flow-based fill/minimum baseline as Image Effects and cannot collapse with an empty dropzone.
- Atmosphere templates pass the same IL-safety guards as Image Effects, and generated `hooks.js`/`properties.json` contain the engine contract and every canary property ID.
- `100dvh` exists only under the Full Viewport modifier.

Run:

```sh
node --test test/atmosphere-component.test.mjs
```

Expected: FAIL because the component does not exist.

**Step 2: Add the Inspector and Hook**

Inspector order:

1. Preset — Flow only.
2. Colours — two `themeColor` properties using `format: "bg-{{value}}"`.
3. Motion — intensity, scale, speed, motion on/off.
4. Advanced — Flow distortion and softness, using integer-friendly sliders.
5. Performance and Accessibility — quality, Animate in Editor, Full Viewport.
6. Standard Layout, Sizing, and Spacing controls.

Use one normalized payload:

```js
const settings = {
    schemaVersion: 1,
    engine: "atmosphere",
    preset: "flow",
    colorAKey: rw.props.colorA || "bg-brand-500",
    colorBKey: rw.props.colorB || "bg-surface-950",
    intensity: clamp(rw.props.intensity, 0, 100, 65) / 100,
    scale: clamp(rw.props.scale, 25, 300, 100) / 100,
    speed: clamp(rw.props.speed, 0, 100, 35) / 100,
    distortion: clamp(rw.props.distortion, 0, 100, 45) / 100,
    softness: clamp(rw.props.softness, 0, 100, 60) / 100,
    motion: asBoolean(rw.props.motion, true),
    animateInEditor: asBoolean(rw.props.animateInEditor, true),
    quality: normalizeQuality(rw.props.quality),
    fullViewport: asBoolean(rw.props.fullViewport, false),
    instanceKey: rw.node.id,
};
```

**Step 3: Build a useful static fallback**

Render two absolutely positioned, blurred color blobs using the formatted theme background classes. Mark them `aria-hidden`. They both provide the CSS fallback and act as runtime color probes:

```html
<div class="three-atmosphere__fallback" aria-hidden="true">
    <span class="three-atmosphere__color-a {{colorA}}" data-three-color="a"></span>
    <span class="three-atmosphere__color-b {{colorB}}" data-three-color="b"></span>
</div>
```

The engine later reads each probe's computed `backgroundColor`. Do not attempt to parse Tailwind/theme token class names in JavaScript.

Layer edit preview/publish canvas and content using the same 1/2/3 z-index model as Image Effects.

Use the same flow-based root baseline: `position: relative`, `width: 100%`, `height: 100%`, `min-width: 0`, `min-height: 16rem`, `overflow: hidden`, and `isolation: isolate`.

**Step 4: Generate, test, and commit**

```sh
npm run build:properties
npm run build:hooks
node --test test/atmosphere-component.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
git diff --check
```

Expected: PASS.

```sh
git add test/atmosphere-component.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere \
  graphics/Component\ Icons.sketch
git commit -m "feat: define Atmosphere Flow component"
```

---

### Task 7: Implement and gate the Flow engine

**Files:**

- Create: `test/atmosphere-runtime.test.mjs`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/assets/page/atmosphere-engine.module.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/assets/page/editor-preview.module.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/templates/three-runtime.html`
- Modify: `test/three-runtime.test.mjs`
- Modify: `test/atmosphere-component.test.mjs`
- Modify: `docs/testing/threejs-elements-matrix.md`

**Step 1: Apply the common lifecycle suite before implementation**

Use `testThreeLifecycleContract("Atmosphere", createAtmosphereHarness)` and add engine-specific tests:

- Computed probe colors become `THREE.Color` values.
- A color-class update re-queries the live root's probes.
- Uniform-only changes do not recreate renderer, geometry, or material.
- Motion off renders once and schedules no RAF.
- Reduced motion uses the same stable representative time as Motion off.
- Animate in Editor off freezes edit mode only; the same saved setting still animates published output when Motion is on.
- No pointer listener is installed.
- First frame and failure state control canvas readiness.
- Resize covers the whole box without seams.

Run:

```sh
node --test test/atmosphere-runtime.test.mjs
```

Expected: FAIL because the engine does not exist.

**Step 2: Implement Flow without add-ons**

Use a full-screen orthographic plane and a small self-contained GLSL noise/fBm function. Required uniforms:

```js
{
    uTime,
    uResolution,
    uColorA,
    uColorB,
    uIntensity,
    uScale,
    uSpeed,
    uDistortion,
    uSoftness,
}
```

The component must be visually complete with only two theme colors. Do not add pointer response, textures, post-processing, or additional Atmosphere presets.

Editor adapter structure matches Image Effects: bare `three`, relative engine import, module-owned canvas, root resolver, and the common lifecycle return value.

**Step 3: Register Flow with the published coordinator**

Use an include-once portal ID of `com.realmacsoftware.atmosphere.three` and register the engine name `atmosphere`. The shared runtime test must now prove that Image Effects and Atmosphere still share one Three module promise.

Extend `test/atmosphere-component.test.mjs` here—not in Task 6—to assert the portal ID, shared/runtime import paths, and `atmosphere` registration.

**Step 4: Run the mixed-engine automated gate**

```sh
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/assets/page/atmosphere-engine.module.js
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere/assets/page/editor-preview.module.js
node --test test/atmosphere-component.test.mjs
node --test test/atmosphere-runtime.test.mjs
node --test test/image-effects-runtime.test.mjs
node --test test/three-runtime.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
node --test
```

Expected: PASS.

**Step 5: Pass the Elements mixed-engine gate**

Add one Flow beside Ripple and test edit, preview, publish, narrow viewport, and save/reopen.

Pass criteria:

- A fresh Flow is attractive without an asset.
- Both theme colours update live and match the static fallback.
- Motion off and Reduced Motion render a stable frame with zero continuing renders.
- No pointer listener or interaction is present.
- Text, links, buttons, component selection, and resizing remain operable.
- Ripple and Flow retain independent settings.
- Only one published Three URL is requested.
- Offscreen instances pause independently.
- Duplicate/delete/undo produces no extra canvas, callback, or context.
- Three/WebGL failure leaves the themed fallback, never white/transparent.

If this exposes lifecycle duplication that is both identical and error-prone, document it for a later bundling/extraction task. Do not add an unverified shared editor-module import during this release.

**Step 6: Record and commit**

```sh
git add test/atmosphere-runtime.test.mjs test/atmosphere-component.test.mjs \
  test/three-runtime.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere \
  docs/testing/threejs-elements-matrix.md
git commit -m "feat: add and gate Atmosphere Flow engine"
```

---

### Task 8: Define a deterministic Particle Field model and component

**Files:**

- Create: `test/particle-model.test.mjs`
- Create: `test/particle-field-component.test.mjs`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/particle-model.module.js`
- Create standard static component anatomy under: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/` (Task 9 adds engine/adapter/runtime registration files)
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/icon.pdf`
- Export: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/paletteIcon.pdf`
- Modify: `graphics/Component Icons.sketch`

**Step 1: Test the pure particle model**

Define and test these exports:

```js
export const PARTICLE_LIMITS = {
    low: 600,
    automatic: 1500,
    high: 3000,
};

export function mulberry32(seed) {}
export function hashSeed(value) {}
export function particleCount({ density, quality }) {}
export function createParticlePositions({ count, seed }) {}
```

Tests must prove:

- Same seed and settings produce byte-identical `Float32Array` positions.
- A different seed produces a different distribution.
- Density clamps to 1-100.
- Quality selects a hard maximum and arbitrary values cannot exceed 3000.
- All coordinates are finite and stay inside a normalized unit volume; the renderer applies the user-facing depth as a uniform.
- Unrelated settings never regenerate positions.

Run:

```sh
node --test test/particle-model.test.mjs
```

Expected: FAIL because the model does not exist.

**Step 2: Implement the pure model**

Keep this module free of DOM and Three.js imports. Allocate the position array once per density/seed rebuild.

**Step 3: Test and add the component contract**

The Hook/template test must cover:

- Identifier `com.realmacsoftware.particleField`, title Particle Field, group Animation.
- Preset fixed to `drift` for the canary.
- Stable seed derived from `rw.node.id` and identical in editor/publish payloads.
- Theme-colour class passes through for fallback/probe use.
- Density clamps 1-100; point size, depth, and speed clamp and scale.
- Motion/Animate in Editor/quality/Full Viewport normalize.
- Canvas and fallback are decorative.
- The published canvas has the common `data-elements-three-canvas` marker used by the coordinator.
- Content dropzone remains normal DOM above the visual.
- No pointer controls or data exist in v1.
- The root uses the same flow-based fill/minimum baseline and cannot collapse with an empty dropzone.
- Particle Field templates pass the same IL-safety guards, and generated `hooks.js`/`properties.json` contain the engine contract and every canary property ID.

Inspector order:

1. Preset — Drift only.
2. Colours — one particle theme colour and one background/fallback theme colour.
3. Motion — density, point size, depth, speed, motion on/off.
4. Advanced — twinkle amount only if it can remain a uniform; no connectors/trails.
5. Performance and Accessibility — quality, Animate in Editor, Full Viewport.
6. Standard Layout, Sizing, and Spacing.

Use a simple themed background layer as the failure fallback; disappearing decorative points must not expose a white/transparent hole.

Apply the same `position: relative`, 100% fill, zero minimum width, 16rem minimum height, hidden overflow, and isolated stacking baseline used by the first two engines.

**Step 4: Generate and verify**

```sh
npm run build:properties
npm run build:hooks
node --test test/particle-model.test.mjs
node --test test/particle-field-component.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
git diff --check
```

Expected: PASS.

**Step 5: Commit**

```sh
git add test/particle-model.test.mjs test/particle-field-component.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.particleField \
  graphics/Component\ Icons.sketch
git commit -m "feat: define deterministic Particle Field"
```

---

### Task 9: Implement and gate the Drift engine

**Files:**

- Create: `test/particle-field-runtime.test.mjs`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/particle-field-engine.module.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/editor-preview.module.js`
- Create: `packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/templates/three-runtime.html`
- Modify: `test/three-runtime.test.mjs`
- Modify: `test/particle-field-component.test.mjs`
- Modify: `docs/testing/threejs-elements-matrix.md`

**Step 1: Write runtime tests**

Apply the common lifecycle suite and assert:

- Initial positions come from `particle-model.module.js`.
- Density, quality, or seed changes rebuild and dispose one `BufferGeometry`.
- Speed, color, point size, depth, and twinkle update uniforms without regenerating positions.
- Resize updates camera/aspect uniforms without reseeding.
- Motion off and Reduced Motion render one stable field and stop.
- Animate in Editor off freezes edit mode only and does not disable published motion.
- Hidden state has zero pending RAF.
- No per-frame geometry, typed-array, vector, material, or texture allocation occurs.
- Dispose releases geometry, material, buffers, renderer, observer, frame, and context.
- No pointer listener is installed.

Run:

```sh
node --test test/particle-field-runtime.test.mjs
```

Expected: FAIL because the engine does not exist.

**Step 2: Implement Drift**

Use `THREE.Points` with a component-owned shader material. The vertex shader moves points slowly through depth from their deterministic base positions. The fragment shader uses `gl_PointCoord` and `discard` or smooth alpha to produce circular points.

Keep buffers immutable between density/seed changes. Use uniforms for time, depth, size, color, and twinkle. Do not add pointer attraction, connectors, custom sprites, emitters, physics, or trails.

**Step 3: Add editor and published adapters**

The editor adapter follows the same exact import/lifecycle pattern. The published portal ID is `com.realmacsoftware.particleField.three`, registering engine name `particle-field`.

Extend `test/particle-field-component.test.mjs` here to assert the portal ID, shared/runtime import paths, and `particle-field` registration.

Extend `test/three-runtime.test.mjs` to prove three different engines still trigger one Three import and dispose independently.

**Step 4: Verify**

```sh
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/particle-model.module.js
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/particle-field-engine.module.js
node --check packs/Core.elementsdevpack/components/com.realmacsoftware.particleField/assets/page/editor-preview.module.js
node --test test/particle-model.test.mjs
node --test test/particle-field-component.test.mjs
node --test test/particle-field-runtime.test.mjs
node --test test/three-runtime.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
node --test
```

Expected: PASS.

**Step 5: Pass the Particle/mixed Elements gate**

Pass criteria:

- Save/reopen and unrelated property edits do not reshuffle particles.
- Density changes rebuild once and never exceed the tested cap.
- Speed/color/size/depth changes do not regenerate positions.
- Motion off and Reduced Motion retain a stable field without an RAF.
- Resize changes coverage without a full random reseed.
- Maximum density does not freeze the editor or produce context warnings.
- Several Drift instances coexist with Ripple and Flow.
- Offscreen render calls reach zero after visibility settles.
- Ten duplicate/delete cycles return loops, observers, buffers, and contexts to baseline.
- Failure leaves the configured normal background intact.

Record results in `docs/testing/threejs-elements-matrix.md`.

**Step 6: Commit**

```sh
git add test/particle-field-runtime.test.mjs test/particle-field-component.test.mjs \
  test/three-runtime.test.mjs \
  packs/Core.elementsdevpack/components/com.realmacsoftware.particleField \
  docs/testing/threejs-elements-matrix.md
git commit -m "feat: add and gate Particle Field Drift engine"
```

---

### Task 10: Harden the family as one system

**Files:**

- Modify: `test/three-runtime.test.mjs`
- Modify: `test/helpers/three-lifecycle-contract.mjs`
- Modify: all three component/runtime tests as failures require
- Modify: `docs/testing/threejs-elements-matrix.md`
- Modify as failures require: shared runtime and component adapters/engines

**Step 1: Add cross-family automated cases**

Cover:

- Several hosts of the same engine and one host of every engine share one Three import.
- Settings and GPU state never leak between instances.
- A failed host does not prevent another host mounting.
- A removed subtree disposes every nested instance.
- Reinserted nodes mount once.
- Repeated failures log once and retain fallback without retries.
- Visibility is independent per host.
- Reduced motion stops all automatic motion for all three engines.
- Static scenes render on demand rather than continuously.
- Every canvas is `aria-hidden` and pointer-transparent.
- Full Viewport is opt-in for all three components.

**Step 2: Establish the automatic-quality gate**

On the current supported baseline Mac and a representative mobile device, use the mixed QA page with one visible default instance of each engine.

Initial gate:

- No WebGL context-limit warnings.
- Active component RAF count equals visible animated instances; offscreen/static instances contribute zero.
- No repeated long task over 100 ms after initial mount.
- Automatic quality sustains a responsive editor and approximately 50+ fps after settling.
- Resize storms recover full quality within 300 ms after dragging stops.
- Ten add/delete cycles show no monotonic growth in live canvases, observers, listeners, GPU resources, or contexts.

If the gate fails, lower automatic DPR/particle limits before weakening lifecycle requirements.

**Step 3: Run all automated checks**

```sh
node --test test/three-live-preview-schema.test.mjs
node --test test/three-runtime.test.mjs
node --test test/image-effects-component.test.mjs
node --test test/image-effects-runtime.test.mjs
node --test test/atmosphere-component.test.mjs
node --test test/atmosphere-runtime.test.mjs
node --test test/particle-model.test.mjs
node --test test/particle-field-component.test.mjs
node --test test/particle-field-runtime.test.mjs
node --test test/three-template-transpiler.test.mjs
npm run build
node --test
git diff --check
```

Expected: PASS.

**Step 4: Commit hardening changes**

```sh
git add test/three-runtime.test.mjs \
  test/helpers/three-lifecycle-contract.mjs \
  test/image-effects-component.test.mjs \
  test/image-effects-runtime.test.mjs \
  test/atmosphere-component.test.mjs \
  test/atmosphere-runtime.test.mjs \
  test/particle-field-component.test.mjs \
  test/particle-field-runtime.test.mjs \
  packs/Core.elementsdevpack/components/shared/assets/elements-three-runtime.module.js \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects \
  packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere \
  packs/Core.elementsdevpack/components/com.realmacsoftware.particleField \
  docs/testing/threejs-elements-matrix.md
git commit -m "fix: harden Three.js multi-instance lifecycle"
```

Before committing, inspect `git status --short` and unstage any unrelated files, especially `.basecamp/`.

---

### Task 11: Finish icons, documentation, and release verification

**Files:**

- Modify: `graphics/Component Icons.sketch`
- Replace/export: each component's `icon.pdf` and `paletteIcon.pdf`
- Modify: each component's `info.json` with final build/version/help metadata
- Modify: `docs/testing/threejs-elements-matrix.md`
- Create or modify the appropriate Core component documentation pages if help URLs are enabled

**Step 1: Finalize component presentation**

Create a coherent icon family for Image Effects, Atmosphere, and Particle Field in `graphics/Component Icons.sketch`, then export both icon sizes. Ensure titles and palette grouping are consistent:

- Image Effects — Media
- Atmosphere — Animation
- Particle Field — Animation

Do not expose the candidate presets that were not implemented.

**Step 2: Make the runtime dependency explicit**

Document that published pages use pinned jsDelivr Three.js 0.165.0 and retain fallbacks if it is unavailable. Record the editor revision verified in Task 1. Do not change to `latest` or a second Three version.

Open a separate follow-up if the product decision is to vendor Three.js locally. That follow-up must measure Core's shared-asset publication behavior and preserve one module instance per page; it is not an incidental URL swap.

**Step 3: Run final clean generation and automated verification**

```sh
npm run build:properties
npm run build:hooks
npm run build
node --test
node --test test/three-template-transpiler.test.mjs
git diff --check
```

Inspect:

```sh
git status --short
```

Expected before the final gate: all commands PASS and only intended source, generated outputs, icons, tests, and documentation are modified. `.basecamp/` remains untracked and unstaged.

**Step 4: Complete the final Elements matrix**

Repeat the full matrix in:

- Elements edit mode
- Elements Preview
- published Safari
- published Chromium
- narrow/mobile viewport
- fresh project
- saved and reopened project

Exercise:

- same-engine and mixed-engine instances
- responsive and continuous resizing
- image replacement/removal
- theme-colour changes
- pointer and touch on Ripple
- reduced motion
- offscreen pause/resume
- duplicate/copy/paste/reorder/delete/undo/redo
- Three import failure
- renderer and shader failure seams
- WebGL context loss/restoration

Record the final evidence in `docs/testing/threejs-elements-matrix.md`. Do not call the canary complete or make the final commit while any matrix row is failing.

**Step 5: Commit the verified canary evidence and assets**

Inspect `git status --short`, then stage only the files intentionally changed in this task:

```sh
git add graphics/Component\ Icons.sketch \
  packs/Core.elementsdevpack/components/com.realmacsoftware.imageEffects \
  packs/Core.elementsdevpack/components/com.realmacsoftware.atmosphere \
  packs/Core.elementsdevpack/components/com.realmacsoftware.particleField \
  docs/testing/threejs-elements-matrix.md
git commit -m "docs: prepare Three.js visual components for canary"
```

If component help documentation was added, stage those exact paths explicitly as well.

**Step 6: Prove the committed state remains clean**

Run fresh verification after the commit:

```sh
npm run build
node --test
node --test test/three-template-transpiler.test.mjs
git diff --check
git status --short
```

Expected:

- Build PASS.
- Tests PASS.
- No regenerated diff appears.
- Only the pre-existing untracked `.basecamp/` remains.

The internal canary is complete only after both the committed Elements matrix and this clean post-commit verification pass.

---

## Deferred follow-ups

Create separate approved designs and plans for these; do not fold them into the canary implementation:

- More Image Effects presets: Refraction, Liquid Lens, Chromatic Shift, Heat Haze, Pixelation, Depth Parallax, Hologram.
- More Atmosphere presets: Aurora, Liquid Gradient, Plasma, Silk, Caustics, Nebula, Noise Flow, Holographic Grid.
- More Particle Field presets: Starfield, Floating Dust, Fireflies, Sparks, Snow, Constellation, Flow Field, Light Trails.
- Pointer/scroll response for Atmosphere or Particle Field.
- Video/CMS sources, custom particle sprites, connectors, emitters, confetti, physics, audio response, or poster generation.
- Three.js add-ons, post-processing, WebGPU, renderer pooling, or a general scene composer.
- Cross-component production lifecycle extraction, after a bundling/import strategy is proven in the Elements editor.
- A 3D Accent component with perspective camera, lighting, materials, and geometry.

## Rollout order

1. Image Effects/Ripple internal canary.
2. Atmosphere/Flow internal canary on a mixed page with Ripple.
3. Particle Field/Drift internal canary on a mixed page with both earlier engines.
4. Public palette exposure only after the final Elements matrix passes.
