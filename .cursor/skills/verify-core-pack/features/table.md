# Table

The Table (`com.realmacsoftware.table`) renders data in a structured grid with
optional header, footer, striped rows, hover effects, and column-level
alignment. It supports two data sources: **manual** (rows defined in the
Elements editor) and **CSV** (inline file or remote URL). CSV mode adds
client-side sorting, search filtering, and pagination via an Alpine.js
component. The table requires PHP for CSV URL fetching at publish time.

## Sub-features

- **manual-mode** — Traditional HTML table with configurable row count, striped rows, hover effects, column widths, and cell dropzones
- **csv-file-mode** — Reads a CSV file attached to the project, renders headers from the first row (if `csvFirstRowIsHeader`), and enables sorting/search/pagination
- **csv-url-mode** — Fetches a remote CSV at publish time via PHP, same interactive features as file mode
- **column-options** — Per-column sortable, hidden, alignment, and width settings via the `columns` collection; global alignment as fallback
- **pagination** — Configurable rows-per-page, prev/next/first/last labels (localizable), page text with `{{page}}`/`{{total}}` placeholders
- **search** — Client-side text filtering across all visible columns
- **alpine-config** — JSON config string (with single-quote escaping for safe template embedding) driving the Alpine.js `table()` component

## How to get to it (user POV)

- **In RapidWeaver Elements (not driveable from VM):** Drag "Table" from the Content group. Add columns, toggle CSV mode, configure sorting and pagination in the inspector.
- **In the test harness (driveable):** Run `node --test test/table-component.test.mjs`. Tests exercise the `transformHook` with mock column collections and assert on computed props, Alpine config, and template constraints.
- **In Template Previews (driveable):** Data & Tables templates at `#cat-P1-data-tables`, `#cat-P2-data-tables`, `#cat-P3-data-tables`.

## Driving it with the Node.js test harness

**Preconditions:**
- `npm run build` has completed successfully
- `hooks.source.js` exists at `packs/Core.elementsdevpack/components/com.realmacsoftware.table/hooks.source.js`

- **Run all table tests:**
  `node --test test/table-component.test.mjs`
  → Observable: exit code 0, all 22 tests show `ok`
- **Verify manual-mode defaults:**
  Test "defaults keep legacy manual-mode behaviour" asserts `isCSVMode === false`, `showHeader === true`, `rows.length === 3`
  → Observable: `ok 1 - defaults keep legacy manual-mode behaviour`
- **Verify CSV URL mode:**
  Test "csv url mode passes the source through and stays sortable" asserts `isCSVUrl === true`, `csvSource === "https://example.com/data.csv"`
  → Observable: `ok 20 - csv url mode passes the source through and stays sortable`
- **Verify template safety constraints:**
  Tests "alpine template contains no template-engine tokens", "no @raw blocks", "no backslashes" read `templates/alpine.html` and assert no `{{`, `@raw`, or `\` characters (these break the Elements edit-mode canvas renderer)
  → Observable: `ok 16`, `ok 17`, `ok 18`
- **Verify pagination labels:**
  Test "custom pagination labels pass through for localization" verifies localized labels like "Vorige", "Volgende" pass through
  → Observable: `ok 12 - custom pagination labels pass through for localization`
- **Verify build artifacts:**
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.table/hooks.js ] && echo OK`
  → Observable: prints "OK"

## Gotchas

- The Alpine.js template (`templates/alpine.html`) must not contain literal `{{` tokens, `@raw` blocks, or backslash escapes. The Elements template engine processes these before they reach the browser, causing regressions (documented as the "8e5dafa regression" and "3.0.8 regex-literal regression"). Build runtime strings by concatenation instead.
- The `alpineConfig` prop uses single quotes (`'`) instead of double quotes for JSON, because it's embedded in an HTML attribute. Tests parse it with `.replace(/'/g, '"')` before `JSON.parse()`.
- `showFirstLast` accepts both boolean and string values (`"true"`, `"false"`) because responsive-era projects save switch values as strings.
- `requiresPhp: true` in `info.json` — the table's CSV URL mode needs server-side PHP for remote fetching.
