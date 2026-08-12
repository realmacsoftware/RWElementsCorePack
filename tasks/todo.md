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
