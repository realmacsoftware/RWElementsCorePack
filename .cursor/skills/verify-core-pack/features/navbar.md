# Navbar (Navigation Menu)

The Navbar (`com.realmacsoftware.navbar`) renders a responsive site navigation
menu. Users drag it from the Elements palette onto a page. It automatically
reads the site's page tree, filters out draft and hidden pages, marks the active
page and its ancestor folders, and produces an Alpine.js-powered responsive
menu with mobile hamburger toggle and nested dropdown support.

## Sub-features

- **active-child-flagging** — Folders containing the active page get `hasActiveChild: true`, propagating up through nested folders
- **draft-hidden-filtering** — Draft pages and `displayInMenu: false` pages are excluded from the rendered menu
- **has-pages** — Folders with no visible children report `hasPages: false` so templates can hide empty submenus
- **nested-folders** — Multi-level folder hierarchies are supported with recursive active-state propagation
- **hidden-active** — An active page hidden from the menu still flags its parent folder as having an active child

## How to get to it (user POV)

- **In RapidWeaver Elements (not driveable from VM):** Drag "Menu" from the Navigation group in the component palette. The inspector shows logo, layout, and mobile breakpoint settings.
- **In the test harness (driveable):** Run `node --test test/navbar-component.test.mjs`. Tests exercise the `transformHook` from `hooks.source.js` with mock page trees and assert on computed props.
- **In Template Previews (driveable):** Navigation templates are at `#cat-P1-navigation` and `#cat-P2-navigation`. Filter with `data-name` attributes containing "navbar" or "navigation".

## Driving it with the Node.js test harness

**Preconditions:**
- `npm run build` has completed successfully
- `hooks.source.js` exists at `packs/Core.elementsdevpack/components/com.realmacsoftware.navbar/hooks.source.js`

- **Run all navbar tests:**
  `node --test test/navbar-component.test.mjs`
  → Observable: exit code 0, output shows `ok` for all 5 tests
- **Verify active-child flagging:**
  Test "folder and intermediate folder are flagged when a grandchild is active" asserts `folderA.hasActiveChild === true` and `folderA2.hasActiveChild === true`
  → Observable: `ok 1 - folder and intermediate folder are flagged when a grandchild is active`
- **Verify draft/hidden filtering:**
  Test "existing filtering and hasPages behaviour is unchanged" asserts that draft and hidden pages are removed from the computed pages array
  → Observable: `ok 5 - existing filtering and hasPages behaviour is unchanged`
- **Verify build artifacts after a change:**
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.navbar/hooks.js ] && echo OK`
  `[ -s packs/Core.elementsdevpack/components/com.realmacsoftware.navbar/properties.json ] && echo OK`

## Gotchas

- The navbar hook reads `rw.pages` (the full page tree from RapidWeaver) — tests must supply this mock structure faithfully including `isFolder`, `isDraft`, `displayInMenu`, `isActive`, and nested `pages` arrays.
- The component's UI title is "Menu" (in `info.json`), not "Navbar" — search Template Previews for "navigation" category, not "navbar".
- The test sandbox must provide `classnames`, `globalNavItems`, `globalNavTitle`, `globalHTMLTag`, and other shared-hook stubs — the test file defines these itself.
