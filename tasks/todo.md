# Site Search Component

Plan: `~/.claude/plans/i-want-to-plan-quiet-quokka.md`

- [x] Scaffold `com.realmacsoftware.siteSearch` (info.json, properties.config.json, hooks.source.js, templates, assets/page/site-search.js)
- [x] `npm run build`; keep only siteSearch's generated files (reverted 56-file shared-hooks drift per lessons.md)
- [x] Tests: `test/site-search-component.test.mjs` — 12 tests; full suite 100/100 passing (`node --test` from repo root; note `node --test test/` errors on this Node version — use bare `node --test`)
- [x] Transpiler smoke test: all 3 templates pass `run()` from the Elements IL transpiler
- [ ] **In-app verification (required before merge — lessons.md: transpiler + tests ≠ edit canvas):**
  - [ ] Edit canvas renders — especially `templates/search-index.html` (JSON `<script>` portal) and the conditionally-hidden dropzone div
  - [ ] Drop a Text component into "Result Item", type `{{ item.title }}` — confirm user-typed braces survive the pipeline as plain text (top risk; fallback token syntax e.g. `[[item.title]]` if not)
  - [ ] Preview: live search, ranking, keyboard nav (arrows/enter/escape), empty state, result click navigates, new-window pages open in new tab
  - [ ] Two Site Search instances on one page → one index blob, both inputs work
- [ ] Real icon designs (`icon.pdf` / `paletteIcon.pdf` are copies of Filter's icons)

## Review

**What was built.** A Site Search component: `hooks.source.js` walks `rw.pages` recursively (draft subtrees pruned, folders recursed but not emitted) into a metadata index `{title, url, menu, newWindow}`, serialized with `<` → `<` and injected once per page via `@portal(bodyEnd, includeOnce: true)` as a `<script type="application/json">` blob. The blob is instance-independent (always all pages; the "Hidden Pages" switch filters client-side) so the includeOnce race is safe. All frontend logic lives in `assets/page/site-search.js` (no inline template JS, per lessons.md): Alpine `siteSearch(minChars, maxResults, includeHidden)` with 150ms debounce, substring ranking (title-prefix → title → URL), and per-result cloning of the dropzone design with Twig-style `{{ item.title }}` / `{{ item.url }}` token replacement (HTML-escaped before innerHTML insertion). Inspector mirrors Filter's input styling groups plus a Results group (panel bg/radius/shadow/max-height/dividers, item padding/hover, empty-state text).

**Key platform constraint.** Hooks cannot emit files — a fetched `search-index.json` is impossible; inline portal blob is the only delivery mechanism. No page body content is exposed to hooks — index is titles/URLs only.

---

# Modal anchor jump links (Android Chrome)

Forum report: https://forums.realmacsoftware.com/t/bug-anchor-jump-links-in-mobile-menu-dont-work-on-android-chrome-samsung-etc-fix-for-elements-projects/57412

- [x] Reproduce: mobile viewport, Pixel 8 UA — tapping `href="#section"` inside a Modal updates `location.hash` and `window.scrollY` but the dialog stays open and the viewport never moves
- [x] Fix in the Modal component (not a per-project custom-code snippet): `assets/page/modal-anchor-links.js`, loaded from the existing `templates/alpine-plugins.html` portal
- [x] Tests: `test/modal-anchor-links.test.mjs` — 16 tests; full suite 179 passing (`node --test 'test/*.test.mjs'`)
- [x] Browser verification: 26 jumps across sticky/static triggers and smooth/auto scroll-behavior, 0 failures
- [ ] In-app verification in Elements (edit canvas + preview) before release

## Review

**Cause.** Two things, not one. The dialog has no close handler on its links, so `x-trap.inert.noscroll` keeps `html { overflow: hidden }` in place — Safari lets the scroll through anyway, Chrome on Android does not. And once the dialog *does* close, its focus trap restores focus to whatever was focused when it opened, and focusing that element scrolls it into view, which drags the page back off the anchor.

**Fix.** A delegated capture-phase click listener (capture is load-bearing — the modal panel calls `stopPropagation`). For same-document hash links inside `[data-modal-id]` it closes the Alpine dialog, then waits on `requestAnimationFrame` until the scroll lock is off *and* no `focusin` has fired for 3 frames, then re-runs `scrollIntoView({ block: "start" })`. Bails out for modified clicks, new-tab links, cross-page links, missing targets, and any case where there was no open dialog holding the lock. Default navigation is never prevented, so the URL, history, `:target` and the sequential-focus starting point behave exactly as before.

**Rejected approaches.** The forum's suggested fix uses a fixed `setTimeout(…, 350)`; measured traces showed the focus handover lands ~8ms after close but the scroll animation runs for ~1s, so a fixed delay is both arbitrary and racy. An earlier draft here also moved focus to the target with a temporary `tabindex="-1"` — that made each previous anchor target the focus-restore node for the *next* open, which then retargeted the in-flight smooth scroll and left the page short of the anchor (reproduced: landed at 1173 instead of 46). Dropping the focus handling entirely fixed it and is what the browser's own hash navigation already does correctly.

**Not changed.** `com.realmacsoftware.navbar`'s own mobile menu already closes on link clicks, so it isn't affected. It does reset with `document.body.style.overflow = "auto"` rather than `""`, which clobbers a site's own overflow rule — separate, cosmetic, left alone.
