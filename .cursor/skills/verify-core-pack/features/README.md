# Core Pack Feature Map

## Baseline preconditions

Before driving any feature, confirm:

1. `npm run build` completes without errors (warnings about `PosterImage` / `AspectRatioVideo` are benign)
2. `node -e "require.resolve('rw-elements-tools')"` resolves without error
3. For features that need Template Previews: the HTTP server is running on `$VERIFY_PORT` and `curl -sf http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html` returns 200

## Driving conventions

- **Harness**: Node.js test harness (`node --test`) for component logic; `curl` + `grep` for Template Previews HTML content.
- **Selectors**: Component identifiers use `com.realmacsoftware.<name>` (e.g., `com.realmacsoftware.navbar`). Template Previews items use `data-name="<lowercase name>"` attributes and category anchors `#cat-P<phase>-<category>`.
- **Source files**: Edit `properties.config.json` (not `properties.json`) and `hooks.source.js` (not `hooks.js`). Run `npm run build` after changes.
- **Assert on**: computed props from transform hooks, generated file existence/content, template HTML structure.

## Proof and skip reporting

After driving a feature, record in evidence:

- **PASS**: test output showing `ok` for all assertions, or curl output showing expected content
- **SKIP**: record the reason (e.g., "gallery tests require switchToBool.js from sibling repo") with the exact error
- **FAIL**: record full output, the failing assertion, and which source file is suspect

## Feature entry contract

Each feature file defines:
1. One paragraph of user-visible behavior
2. Sub-features with short IDs
3. User entry points (honest about what's driveable)
4. Driving recipe with preconditions, actions, commands, and observable results

## Features

- [navbar.md](navbar.md) — Navigation bar component with responsive menu, folder hierarchy, active states
- [gallery.md](gallery.md) — Image gallery with thumbnails, lightbox, lazy loading, remote folder mode
- [accordion.md](accordion.md) — Expandable accordion panels with Alpine.js interactivity
- [table.md](table.md) — Data table with CSV import, sorting, pagination, search
- [template-previews.md](template-previews.md) — Template Previews HTML catalog (205 templates across 3 phases)
