# Template Previews

The `Template Previews.html` file at the repo root is a self-contained HTML
catalog of all 205 page templates included in the Core Pack. It renders each
template's visual output using Tailwind CSS (loaded via CDN), organized into
three phases (P1 Core Launch, P2 Second Wave, P3 Expansion) and grouped by
category (Headings, Navigation, Heroes, etc.). Each template preview includes
an expandable "Tailwind code" block with a copy button showing the exact HTML
markup. A sidebar filter input lets users narrow by template name.

## Sub-features

- **phase-organization** — Templates grouped into Phase 1 (89 templates), Phase 2 (88 templates), Phase 3 (28 templates) with section headers and anchor links
- **category-grouping** — Within each phase, templates are grouped by category (Basics vs Layouts tier, then specific categories like Navigation, Heroes, FAQ, etc.)
- **filter-search** — A text input (`#filter`) filters `.tpl-item` elements by their `data-name` attribute, hiding non-matching templates and empty categories/phases
- **code-expand** — Each template has a `<details>` block containing the Tailwind HTML code with a "Copy" button using `navigator.clipboard.writeText()`
- **sidebar-navigation** — Fixed sidebar with linked category entries for quick scrolling (visible on `lg:` breakpoint)

## How to get to it (user POV)

- **In a browser (driveable via HTTP server):** Open `Template Previews.html` in a browser. Browse visually, use the filter, expand code blocks, and copy markup.
- **Via curl (driveable):** Serve with `python3 -m http.server` and query content with `curl` + `grep` for structural validation.
- **In RapidWeaver Elements (not driveable from VM):** Templates appear in the template library when the Core Pack is loaded. The preview HTML is a standalone reference, not consumed by Elements directly.

## Driving it with curl and grep

**Preconditions:**
- HTTP server running on `$VERIFY_PORT` serving the repo root
- `curl` and `grep` available

- **Verify total template count:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -o 'class="tpl-item"' | wc -l`
  → Observable: prints `205`
- **Verify phase sections exist:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -o 'id="phase-P[123]"'`
  → Observable: prints `id="phase-P1"`, `id="phase-P2"`, `id="phase-P3"` (3 lines)
- **Verify navigation category exists in P1:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -c 'id="cat-P1-navigation"'`
  → Observable: prints `1`
- **Verify filter input exists:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -c 'id="filter"'`
  → Observable: prints `1`
- **Verify code blocks are present:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -o 'class="code-details' | wc -l`
  → Observable: prints `205` (one per template)
- **Verify a specific template exists by data-name:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -o 'data-name="display heading"'`
  → Observable: prints `data-name="display heading"`
- **Verify copy buttons present:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -o 'class="copy-btn' | wc -l`
  → Observable: prints `205`

## Gotchas

- The HTML file is ~755 KB and 5054 lines. It is a single self-contained file with no local asset dependencies beyond the Tailwind CDN script and Google Fonts.
- Template previews are static Tailwind HTML — they do not use the actual Elements component rendering pipeline. They show what the templates *look like*, not how the Elements engine renders them.
- The filter JavaScript is minimal: it matches `data-name` (lowercase) against the input, then hides/shows items, categories, and phases based on visible children. A `#noresults` div appears when nothing matches.
- The sidebar is only visible at `lg:` breakpoint (1024px+). Below that, you scroll the main content area directly.
- Template names in `data-name` are lowercase (e.g., `"display heading"`, `"navbar — logo left"`).
