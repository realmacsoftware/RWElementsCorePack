# Gallery

The Gallery (`com.realmacsoftware.gallery`) displays a grid of images with
optional lightbox overlay, lazy loading, thumbnail resizing, and caption/author
display. It supports two source modes: **resource** (images attached in the
Elements editor) and **remote** (a server-side folder scanned at publish time
via PHP). The remote mode requires PHP execution on the published site and
ships PHP templates for server-side rendering.

## Sub-features

- **lazy-loading** — Only the first row of thumbnails loads eagerly; the rest use `loading="lazy"` and `decoding="async"`. Configurable via `thumbnailLazyLoading` switch.
- **thumbnail-resize** — Opt-in author-controlled thumbnail size served at 2× for retina displays via `rw.resizeResource()`.
- **remote-folder-mode** — In published mode, defers rendering to PHP templates (`remote-scan.php`, `remote-grid.php`, `remote-slides.php`). Companion thumbnail images are paired and excluded from the gallery.
- **lightbox-aspect-ratio** — Lightbox slides get an `aspect` property from the resource's width/height (or `"auto"`) to reserve space before load.
- **php-id-safety** — Node IDs are sanitized to be valid PHP variable suffixes (punctuation replaced with underscores).

## How to get to it (user POV)

- **In RapidWeaver Elements (not driveable from VM):** Drag "Gallery" from the Media group. Add images via the resource picker or set a remote folder URL.
- **In the test harness (partially driveable):** Run `node --test test/gallery-component.test.mjs`. **Note:** These tests require `switchToBool.js` from the sibling `RWElementsPacksTools` repo, which is not available in the npm package. Tests will fail with a file-not-found error when run with the npm-installed tools. This is a known limitation.
- **In Template Previews (driveable):** Gallery templates are at `#cat-P1-galleries-media`, `#cat-P2-galleries-media`, `#cat-P3-galleries-media`.

## Driving it with the Node.js test harness

**Preconditions:**
- `npm run build` has completed successfully
- For full test execution: `node_modules/rw-elements-tools/shared-hooks/core/switchToBool.js` must exist (requires sibling repo, not npm install)
- Without sibling repo: only build artifact verification and Template Previews content checks are available

- **Run gallery tests (will fail without sibling repo):**
  `node --test test/gallery-component.test.mjs`
  → Observable: 17 failures with `ENOENT` for `switchToBool.js` when using npm-installed tools
- **Verify build artifacts:**
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.gallery/hooks.js ] && echo OK`
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.gallery/properties.json ] && echo OK`
  → Observable: prints "OK" twice
- **Verify PHP templates exist (required for remote mode):**
  `ls packs/Core.elementsdevpack/components/com.realmacsoftware.gallery/templates/include/*.php`
  → Observable: lists `remote-scan.php`, `remote-grid.php`, `remote-slides.php`
- **Verify `info.json` declares PHP requirement:**
  `node -e "const i=JSON.parse(require('fs').readFileSync('packs/Core.elementsdevpack/components/com.realmacsoftware.gallery/info.json','utf8')); console.log(i.requiresPhp === true ? 'OK' : 'FAIL')"`
  → Observable: prints "OK"
- **Verify gallery templates in Template Previews:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -c 'id="cat-P[123]-galleries-media"'`
  → Observable: prints "3" (one gallery category per phase)

## Gotchas

- Gallery tests are the only test file that depends on an external shared hook (`switchToBool.js`). All other test files are self-contained.
- The `remote-scan.php` template uses a PCRE thumbnail-matching rule to pair companion thumbnails with their source images. The test extracts this regex and exercises it in JavaScript — syntax must be compatible with both PCRE and JS `RegExp`.
- Remote folder values undergo PHP-safe sanitization (single quotes and backslashes stripped, whitespace trimmed).
- The component's `requiresPhp: true` in `info.json` causes the published page to use `.php` extension instead of `.html`.
