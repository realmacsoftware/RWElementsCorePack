---
name: verify-core-pack
description: >
  Verify RapidWeaver Elements Core Pack — 25+ components, 6 themes, 170+ templates.
  Drives the build pipeline, Node.js component test harness, and Template Previews
  HTML surface. Use after any change to a component's properties.config.json,
  hooks.source.js, or templates/.
---

# Verify Core Pack

## What you are verifying

The **RapidWeaver Elements Core Pack** (`packs/Core.elementsdevpack/`) ships
25+ UI components, 10 themes, 170+ page templates, and 300+ resources. End
users load the built `.elementsdevpack` into **RapidWeaver Elements on macOS**
(Preferences → Addons → Add Pack).

### Surfaces

| Surface | Reachable from this VM? | Notes |
|---------|------------------------|-------|
| RapidWeaver Elements (macOS app) | **No** — requires macOS + Elements | verified-unreachable: macOS + Elements |
| `Template Previews.html` (static HTML) | **Yes** — serve with any HTTP server | 205 Tailwind-rendered template previews; filter input, code expand/copy |
| `test/*.mjs` (Node.js test harness) | **Yes** — `node --test` | Unit tests for component transform hooks (navbar, gallery, modal, table, etc.) |
| Build output (`properties.json` / `hooks.js`) | **Yes** — `npm run build` | Generated files per component |

The primary **agent-driveable surface** is the combination of:
1. The Node.js test harness (`test/*.mjs`)
2. The build pipeline (`npm run build`)
3. `Template Previews.html` served over HTTP

You **cannot** drive the RapidWeaver Elements macOS inspector from this VM.
Do not pretend Playwright can click the Mac inspector.

---

## Launch

### Set REPO_ROOT

Every section below uses `$REPO_ROOT`. Define it once at the start of your
verification session:

```bash
export REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel)}"
```

### Prerequisites

- Node.js ≥ 18
- `npm install` completed (with `rw-elements-tools` resolved — see Doctor)

### Install dependencies

The repo's `package.json` declares `"rw-elements-tools": "file:../RWElementsPacksTools"`.
That sibling path does not exist on CI or in an agent VM. Install from npm instead:

```bash
cd "$REPO_ROOT"
rm -rf node_modules/rw-elements-tools
npm install rw-elements-tools@latest --save-dev --install-links
```

Do **not** commit the `package.json` change — this is a verification-only workaround.
Restore with `git checkout package.json package-lock.json` after verification.

### Build

```bash
npm run build
```

Expected: lines like `[hooks] Wrote packs/Core.elementsdevpack/components/com.realmacsoftware.*/hooks.js`
for all 35 components, ending with `[hooks] Build complete`. Two warnings about
`PosterImage` and `AspectRatioVideo` global controls not found are benign.

### Start the preview server

```bash
export VERIFY_PORT="${VERIFY_PORT:-8899}"
export VERIFY_PID_FILE="/tmp/core-pack-verify-${RUN_ID:-$$}/preview.pid"
mkdir -p "$(dirname "$VERIFY_PID_FILE")"
python3 -m http.server "$VERIFY_PORT" --bind 127.0.0.1 --directory "$REPO_ROOT" &
echo $! > "$VERIFY_PID_FILE"
```

Wait until ready:

```bash
timeout 5 bash -c "until curl -sf http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html > /dev/null; do sleep 0.2; done"
```

### Teardown

```bash
if [ -f "$VERIFY_PID_FILE" ]; then
  kill "$(cat "$VERIFY_PID_FILE")" 2>/dev/null
  rm -f "$VERIFY_PID_FILE"
fi
```

### Isolation

The HTTP server binds to `127.0.0.1` on a configurable port (`$VERIFY_PORT`).
Two instances can run side by side on different ports. Each instance's PID file
is scoped by `$RUN_ID` or PID.

---

## Doctor

Run this read-only check to confirm the environment is healthy before driving.

```bash
# 1. Tools package is real (not a dangling symlink)
node -e "require.resolve('rw-elements-tools')"

# 2. Build output exists for every component that has a source file
for cfg in packs/Core.elementsdevpack/components/*/properties.config.json; do
  dir="$(dirname "$cfg")"
  [ -f "$dir/properties.json" ] || echo "MISSING: $dir/properties.json"
done
for src in packs/Core.elementsdevpack/components/*/hooks.source.js; do
  dir="$(dirname "$src")"
  [ -f "$dir/hooks.js" ] || echo "MISSING: $dir/hooks.js"
done

# 3. Preview server responds (skip if not launched)
if [ -n "$VERIFY_PORT" ]; then
  curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \
    | grep -q "Core Pack — Template Previews" \
    && echo "Preview: OK" || echo "Preview: UNREACHABLE"
fi

# 4. Test harness can load
node --test --test-only test/navbar-component.test.mjs 2>&1 | tail -1
```

All four checks must pass before driving.

---

## Drive

### Harness 1: Node.js component tests (`test/*.mjs`)

These tests load `hooks.source.js` via `node:vm`, feed it mock `rw` objects,
and assert on the computed props and root element. They are the fastest,
most reliable verification path.

```bash
# Run all tests (gallery tests may fail without the sibling RWElementsPacksTools repo — see Known issues)
node --test test/*.test.mjs

# Run a specific component's tests
node --test test/navbar-component.test.mjs
node --test test/table-component.test.mjs
node --test test/modal-anchor-links.test.mjs
```

**Available test files and what they cover:**

| File | Component | What it tests |
|------|-----------|---------------|
| `navbar-component.test.mjs` | `com.realmacsoftware.navbar` | Active-child flagging, folder filtering, hasPages |
| `gallery-component.test.mjs` | `com.realmacsoftware.gallery` | Lazy loading, thumbnails, remote mode, PHP templates |
| `modal-anchor-links.test.mjs` | `com.realmacsoftware.modal` | Anchor link interception, scroll-to-target, edge cases |
| `table-component.test.mjs` | `com.realmacsoftware.table` | CSV mode, pagination, sorting, column alignment, Alpine config |
| `audio-playlist-component.test.mjs` | `com.realmacsoftware.audioPlaylist` | Audio playlist hook transforms |
| `mask-component.test.mjs` | `com.elementsplatform.mask` | Mask component transforms |
| `shapes-component.test.mjs` | `com.elementsplatform.shapes` | Shapes component transforms |
| `site-search-component.test.mjs` | `com.realmacsoftware.siteSearch` | Site search transforms |

**Interpreting results:** `node --test` exits 0 on all-pass, 1 on any failure.
Output format: `ok N - <test name>` for pass, `not ok N - <test name>` for fail.

### Harness 2: Build pipeline

```bash
npm run build 2>&1
```

Verify build artifacts exist and are non-empty for the component you changed:

```bash
COMPONENT="com.realmacsoftware.navbar"  # replace with your component
COMP_DIR="packs/Core.elementsdevpack/components/$COMPONENT"
[ -s "$COMP_DIR/properties.json" ] && echo "properties.json: OK" || echo "properties.json: MISSING/EMPTY"
[ -s "$COMP_DIR/hooks.js" ] && echo "hooks.js: OK" || echo "hooks.js: MISSING/EMPTY"
```

### Harness 3: Template Previews HTML

The `Template Previews.html` file is a self-contained 5000+ line HTML page with
205 template previews rendered using Tailwind CSS (via CDN). It has:

- A sidebar with phase/category navigation (anchors like `#cat-P1-navigation`)
- A filter input (`#filter`) that shows/hides `.tpl-item` elements by `data-name`
- Each template item has a `data-name` attribute (lowercase template name)
- Expandable "Tailwind code" `<details>` blocks with copy buttons

**Driving with curl (verify content integrity):**

```bash
# Verify the page loads and contains expected template count
curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \
  | grep -o 'class="tpl-item"' | wc -l
# Expected: 205

# Verify a specific template exists (e.g., navigation templates)
curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \
  | grep -o 'data-name="[^"]*navbar[^"]*"'

# Verify phase sections exist
curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \
  | grep -c 'id="phase-P'
# Expected: 3 (P1, P2, P3)
```

### Known issues

- **Gallery tests require `switchToBool.js`** from the sibling `RWElementsPacksTools`
  repo at `node_modules/rw-elements-tools/shared-hooks/core/switchToBool.js`.
  The npm-published `rw-elements-tools` package does not include this file.
  Gallery tests (`test/gallery-component.test.mjs`) will fail with a file-not-found
  error. This is a pre-existing environment limitation, not a regression.
  Run non-gallery tests to avoid false negatives:
  ```bash
  node --test test/navbar-component.test.mjs test/modal-anchor-links.test.mjs \
    test/table-component.test.mjs test/audio-playlist-component.test.mjs \
    test/mask-component.test.mjs test/shapes-component.test.mjs \
    test/site-search-component.test.mjs
  ```

---

## Evidence

Capture artifacts into a gitignored directory. Use an absolute path so cleanup
cannot accidentally remove repo files.

```bash
export EVIDENCE_DIR="/tmp/core-pack-verify-${RUN_ID:-$$}/evidence"
mkdir -p "$EVIDENCE_DIR"
```

### What to capture

| What | Command | Why |
|------|---------|-----|
| Build log | `npm run build 2>&1 \| tee "$EVIDENCE_DIR/build.log"` | Proves all 35 components compiled |
| Test results | `node --test test/*.mjs 2>&1 \| tee "$EVIDENCE_DIR/test-results.log"` | Pass/fail per component |
| Build artifact check | `ls -la packs/Core.elementsdevpack/components/*/hooks.js > "$EVIDENCE_DIR/hooks-manifest.txt"` | Proves generated files exist |
| Template Previews content | `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \| grep -c 'tpl-item' > "$EVIDENCE_DIR/template-count.txt"` | Proves 205 templates render |
| Specific component HTML | `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \| grep 'data-name=' \| head -20 > "$EVIDENCE_DIR/template-names-sample.txt"` | Sample of template data-names |

Always capture the **action** (build/test command output) AND the **resulting state**
(generated files, template counts).

Evidence directory: `$EVIDENCE_DIR` (defaults to `/tmp/core-pack-verify-<id>/evidence/`).

---

## Cleanup

Tear down only what THIS run created. Never kill by process name.

```bash
export REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel)}"

# 1. Stop the preview server (by PID file)
if [ -f "$VERIFY_PID_FILE" ]; then
  kill "$(cat "$VERIFY_PID_FILE")" 2>/dev/null
  rm -f "$VERIFY_PID_FILE"
fi

# 2. Undo the npm install workaround (restore original package.json)
cd "$REPO_ROOT"
git checkout package.json package-lock.json 2>/dev/null

# 3. Confirm evidence still exists
if [ -d "$EVIDENCE_DIR" ]; then
  echo "Evidence preserved at: $EVIDENCE_DIR"
  ls "$EVIDENCE_DIR"
else
  echo "WARNING: Evidence directory missing!"
fi
```

Cleanup must **not** remove `$EVIDENCE_DIR`. That directory persists until the
run's `/tmp` is reclaimed.

---

## Helpers

No additional helper scripts are shipped. All commands use standard Unix tools
(`curl`, `grep`, `node`, `python3`, `npm`) available on any agent VM with
Node.js ≥ 18.

---

## Quick-reference: full verification run

```bash
export REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel)}"
export RUN_ID="$$"
export VERIFY_PORT=8899
export VERIFY_PID_FILE="/tmp/core-pack-verify-${RUN_ID}/preview.pid"
export EVIDENCE_DIR="/tmp/core-pack-verify-${RUN_ID}/evidence"
mkdir -p "$EVIDENCE_DIR" "$(dirname "$VERIFY_PID_FILE")"

cd "$REPO_ROOT"

# Launch
npm run build 2>&1 | tee "$EVIDENCE_DIR/build.log"
python3 -m http.server "$VERIFY_PORT" --bind 127.0.0.1 &
echo $! > "$VERIFY_PID_FILE"
timeout 5 bash -c "until curl -sf http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html > /dev/null; do sleep 0.2; done"

# Doctor
node -e "require.resolve('rw-elements-tools')"

# Drive
node --test test/navbar-component.test.mjs test/modal-anchor-links.test.mjs \
  test/table-component.test.mjs test/audio-playlist-component.test.mjs \
  test/mask-component.test.mjs test/shapes-component.test.mjs \
  test/site-search-component.test.mjs 2>&1 | tee "$EVIDENCE_DIR/test-results.log"

curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" \
  | grep -o 'class="tpl-item"' | wc -l > "$EVIDENCE_DIR/template-count.txt"

# Evidence
ls -la packs/Core.elementsdevpack/components/*/hooks.js > "$EVIDENCE_DIR/hooks-manifest.txt" 2>&1

# Cleanup
kill "$(cat "$VERIFY_PID_FILE")" 2>/dev/null; rm -f "$VERIFY_PID_FILE"
git checkout package.json package-lock.json 2>/dev/null
echo "Evidence at: $EVIDENCE_DIR"
ls "$EVIDENCE_DIR"
```
