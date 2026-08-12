# Lessons

## Template files: no literal braces, no backslashes, and no @raw() in inline scripts (2026-08-09, supersedes 2026-08-08 entry)

**What happened (three regressions in a row):** Fixing the Table pagination counter (raw `{{page}}`/`{{total}}` showing in preview) by spelling the placeholders as regex literals (`/\{\{page\}\}/g`) in `templates/alpine.html` broke the table in edit mode — the backslash escape sequences themselves broke the edit-mode renderer. The repair after that built the tokens at runtime by string concatenation, which worked. That was then "cleaned up" to the documented `@raw()` ... `@endraw` directive (8e5dafa) — and the table stopped rendering entirely in Elements, in every data-source mode. `@raw` parses cleanly in the app's own transpiler, but the literal `{{...}}` text it preserves reaches the edit-mode canvas renderer, which dies on it; since alpine.html is included on line 1 of index.php, the whole component blanked.

**Rule:** in `templates/*.html` inline scripts, build brace tokens at runtime by concatenation — `const token = (name) => "{" + "{" + name + "}" + "}"`. Never write literal `{{`, never use backslash escapes, and never rely on `@raw()` to protect script content: it only protects against the transpiler stage, not the edit canvas. The lexer also scans JS comments inside templates — `@raw()` or `{{` in a comment is itself a syntax error.

**Prevention:** `test/table-component.test.mjs` asserts alpine.html contains no `{{`, no `\`, and no `@raw`. Apply the same guards to any component template carrying inline JavaScript.

**Meta-lesson:** "verified against the transpiler" is not "verified in the app." The render pipeline has multiple stages (IL transpiler → edit-canvas bridge → PHP publish) with different tolerances, and the edit canvas is the strictest and least inspectable. Any template escaping change must be checked in the running Elements app before merging — a passing parse and passing unit tests are necessary but not sufficient. A "documented directive" beating a "working workaround" is not a reason to swap them minutes before merge without in-app verification. (Transpiler smoke-test harness: `run()` from `/Applications/Elements.app/Contents/Frameworks/RWElementsILTranspiler.framework/Versions/A/Resources/elementsLangTranspiler.js`.)

**Durable fix (follow-up):** move portal scripts out of templates into shared assets (componentAssets .js) so template-engine escaping rules stop applying to JavaScript at all.

**Also (2026-08-08, still valid):** `rw-build` regenerates every component's hooks.js and can pull in unrelated shared-hooks drift from RWElementsPacksTools. For a targeted bugfix, revert the mass regeneration and sync only the affected component's hooks.js with its source change.
