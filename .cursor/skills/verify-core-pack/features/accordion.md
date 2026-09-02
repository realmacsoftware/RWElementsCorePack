# Accordion

The Accordion (`com.realmacsoftware.accordion`) renders expandable/collapsible
content panels. Each accordion item has a clickable summary (header) that
toggles a content region using Alpine.js's `x-collapse` transition. Accordions
support keyboard interaction (Enter and Space to toggle), ARIA attributes for
accessibility (`aria-expanded`, `aria-controls`, `role="region"`), and an
optional group mode where opening one item closes all others in the same group.

## Sub-features

- **toggle** — Click or keyboard (Enter/Space) toggles `open` state, showing/hiding content with collapse animation
- **aria-attributes** — Summary has `role="button"`, `aria-expanded`, `aria-controls`; content has `role="region"`, `aria-labelledby`
- **group-mode** — Accordions with a shared `groupId` dispatch `close-accordions-in-group` events so only one is open at a time
- **open-on-load** — `options.openOnLoad` controls whether the accordion starts expanded
- **icon-toggle** — Optional icon (chevron/arrow) that visually indicates open/closed state

## How to get to it (user POV)

- **In RapidWeaver Elements (not driveable from VM):** Drag "Accordion" from the Interactive group in the component palette. Add title and content via dropzones. Configure group ID and open-on-load in the inspector.
- **In the test harness:** No dedicated test file exists for the accordion component. Verification relies on build artifact checks and template inspection.
- **In Template Previews (driveable):** FAQ templates at `#cat-P1-faq`, `#cat-P2-faq`, `#cat-P3-faq` use accordion components. Interactive atoms at `#cat-P1-interactive-atoms` also include accordion items.

## Driving it with build and template verification

**Preconditions:**
- `npm run build` has completed successfully
- `hooks.source.js` and `properties.config.json` exist in `packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/`

- **Verify build artifacts exist:**
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/hooks.js ] && echo OK`
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/properties.json ] && echo OK`
  → Observable: prints "OK" twice
- **Verify ARIA attributes in template:**
  `grep -c 'aria-expanded' packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/templates/index.html`
  → Observable: prints "1" (the summary element)
  `grep -c 'role="region"' packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/templates/index.html`
  → Observable: prints "1" (the content region)
- **Verify Alpine.js group dispatch in alpine.html:**
  `grep -c 'close-accordions-in-group' packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/templates/alpine.html`
  → Observable: prints "2" (dispatch + listener)
- **Verify keyboard support in alpine.html:**
  `grep -c 'keydown' packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/templates/alpine.html`
  → Observable: prints "2" (Enter and Space handlers)
- **Verify FAQ templates in Template Previews:**
  `curl -sf "http://127.0.0.1:${VERIFY_PORT}/Template%20Previews.html" | grep -c 'id="cat-P[123]-faq"'`
  → Observable: prints "3" (one FAQ category per phase)

## Gotchas

- There is no `test/accordion-component.test.mjs` — the accordion has no dedicated test harness. Verification is limited to build artifacts, template structure inspection, and Template Previews content checks.
- The Alpine.js script is wrapped in `@portal(bodyEnd, includeOnce: true, ...)` — it is injected once into the page footer regardless of how many accordions are on the page.
- The `x-collapse` plugin must be loaded on the page for the expand/collapse animation to work. This is handled by the Elements runtime, not the component itself.
- In edit mode, accordion content is always visible (`style="display: none;"` is conditional on `!edit`).
