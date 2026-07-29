# Core Pack — Component Feedback Roadmap (July 2026)

An analysis of recent forum activity (forums.realmacsoftware.com, ~April–July 2026) focused on what it tells us about the Core Pack components: what's broken, what people are asking for, and what to prioritise next. Compiled from a full sweep of the Elements category — component threads, the 3.0.x beta/release threads, and long-running bug topics — cross-checked against this repo's recent commits and open GitHub issues.

**Headline:** sentiment towards Elements 3 is strongly positive (speed praise is near-universal, and staff responsiveness earns repeated goodwill). The pain concentrates in five places:

1. **Hover-on-touch is broken** since Tailwind 4 and is the biggest unresolved regression.
2. **Mobile Navbar quality** — scrolling, tap targets, and flexibility gaps generate more frustrated threads than any other single component.
3. **Media metadata** (captions/alt/titles in lightboxes) is the most widespread feature pain, ~12 distinct users across 8 topics.
4. **Table data management** is the loudest concrete feature ask, with staff already on record promising it.
5. **A handful of confirmed bugs have been open for months** (CMS image lightbox, video lightbox close button) and users have started calling out the delay publicly.

---

## P0 — Fix now (confirmed bugs & regressions with real user impact)

### 1. Hover effects dead on touch devices (cross-cutting, Tailwind 4)
Tailwind 4 gates the `hover:` variant behind `@media (hover: hover)`, so on phones/tablets every hover-driven design silently does nothing: card overlays with links inside become unreachable, hover-scale effects vanish, and the new **3D Transforms** component is inert on mobile. The old "first tap = hover" behaviour from 2.x is gone.
- Topics: 57041 (Hover animations on touch devices), 57053 (3D Transform), echoed in 57115.
- Impact: WeaverPixel's commercial templates are broken in the field; Blumik's live site homepage effect does nothing on mobile. Users have pinged twice as instructed; dan has only committed to "discuss with ben".
- Requested fix is small: `@custom-variant hover (&:hover);` in the Tailwind build, or an app/pack setting. Alternative: per-component touch fallbacks (tap-to-toggle) for 3D Transforms and hover-reveal patterns.
- **Why P0:** it's a regression from 2.x, it breaks published sites invisibly (authors preview on desktop), and it undermines the template/store ecosystem.

### 2. Image Lightbox empty with CMS-sourced images (GitHub #72)
Confirmed bug with a ticket since **April**; dan said "fix early next week" on **May 28**; still open. Three separate users (WeaverPixel, ercross, MikeB) hit it building exactly the CMS gallery/blog pattern we recommend. Topics: 55847, 56398, 56375. The lightbox template needs to use the CMS image src (it currently appears to use the alt).

### 3. Video lightbox close button misaligned/unclickable
Open since **March** (55091), re-reported in April (55890) and May (56123): on mobile portrait the X can't be tapped at all (users must rotate to landscape); on Windows Chrome/Firefox the X does nothing (ESC works); the hit target drifts as the window narrows. Ben ticketed it in March and acknowledged in May it got deprioritised for CMS work — and a user pushed back publicly: *"i dont understand prioritising something thats not available yet to something that people are actually paying good money for."* Small fix, outsized trust cost while open.

### 4. Navbar mobile menu can't scroll on iPhone
When the open mobile menu is taller than the viewport, items below the fold are unreachable. Community root cause: the menu's bottom position defaults to `auto`; any explicit value fixes it. Known for over a year (references thread 48241), still ships as the default. 4+ users in 56703 alone ("I can't believe this problem still exists"). One-line default change in the navbar component.

### 5. Navbar mobile menu items need two taps
Only the text label is the hit area — tapping the padding around a menu item does nothing, so imprecise taps read as "menu is broken". Reported independently twice in one week (56937, 56979). Fix: make the whole row clickable.

### 6. Alt text: remote/CMS images have no alt field, and the migration scared users
After alt moved to the Resource Info panel: (a) remote/warehoused images have **no way** to set alt at all (56488 — ben: "I'll chat with the team… ASAP"); (b) the Image component's CMS mode has no alt input, `{{item.image.alt}}` doesn't flow through (56686 — ben: "a slight oversight… we'll get this fixed"); (c) users report previously entered alt text on hundreds of images appearing gone. dan promised the component-side rollout of the new Alt field in May ("Weeks, I want to get this in asap"). Finish the rollout across Image, Gallery, Slider, Background.

### 7. Custom image shows dark-mode variant when project dark mode is off (GitHub #56)
Still open from February; simple conditional in the image template.

### 8. Remaining 3.0.x migration loose ends
Most Tailwind-4 fallout was fixed fast (shadow token names, border-radius `sm` token, effects hover shadow, resource links reverting — all confirmed in 3.0.4/3.0.5). Still open:
- **"Auto" values not re-serialised** (Image width auto, Flex basis auto) — currently requires manual re-selection per instance; WeaverPixel has had 3 support emails from template customers about it (56986). Worth an automated migration pass if feasible.
- **Custom theme migration docs** — adding `"tailwindVersion": "v4"` didn't fix jenkman's theme and his request for a migration guide is unanswered (56986).
- **Text Wrap (Shapes)**: mask/theme-link icon click "changed the appearance of everything" until restart, and breakpoint-width edits applying to all breakpoints (57126) — unacknowledged.
- **Tabs library categories disappear** from the component panel in 3.0.4 until app restart — a returning bug, no staff reply yet (56986 post 57, Pegasus).

---

## P1 — Build next (high-demand, staff-acknowledged features)

### 1. Navbar flexibility: folder-scoped sources & conditions (top feature demand)
**6+ users across 5 threads (Apr–Jul)** need the Navbar to list something other than top-level pages: a specific folder, or pages filtered by condition — driven mostly by **multilingual sites** (EN/FR/DE folder structures). Top Pages can target a folder but has no mobile/hamburger version, so everyone falls into the gap; workarounds include AI-generated HTML embeds and Modal-as-menu projects. Direct escalation: *"Dear Dan & Elements Team, Please provide a better solution for this issue."* Topics: 56418, 55792, 56302, 57063, 56226. Related asks that would ride along:
- Option to **disable the hamburger** and keep the horizontal menu at all breakpoints (56877, 56516 — dan confirmed the gap).
- **Mega menu** support (55348 — 4 interested users, concrete 86-link migration use case).
- Separate **hover state** (55955), **text-transform** control (56124), Dropdown link alignment (56295).

### 2. Gallery: captions in the lightbox + alt/caption separation (already promised)
Ben on record (56664): *"We'll be adding the ability to add the Caption and Author to the built-in Gallery Lightbox in the near future."* 5 users, some furious (months of searching; one bought a third-party gallery just for this; resentment at "buy Gallery Pro" as the answer). Bundle with:
- **Separate alt vs caption fields** (55469, 56163 — ticketed, "high on the list") — same Alt-field rollout as P0 #6.
- **Loop option** in the lightbox; arrows currently go dead at the ends and can't be hidden (55728).
- Safari-only caption spacing bug in the lightbox (55728).

### 3. Table: manage rows in the app
Four distinct users in seven weeks want to insert/delete/**reorder** rows without re-typing data or round-tripping a CSV (57128, 56624). Staff is committed: ben — *"We do have plans to update the Table to support more ways for you to manage your data"*; dan — ben has *"an internal build… that allows you to [drop components in cells]. We'll hopefully get around to fixing it up and shipping it soon."* Note: **CSV and dropzone-cell support already exist in this repo's Table component** — the remaining work is row manipulation UX and shipping the cell-dropzone option. Also:
- **Semicolon-separated CSV support** (EU-locale Numbers/Excel exports are rejected with an unhelpful error — 57032, unaddressed).
- Close stale GitHub issues #67 (CSV) and #68 (dropzone cells) — both are implemented in the code.

### 4. Warehousing / remote media (top Classic-migration blocker)
The emotional peak of the quarter: *"a complete show stopper… Until I can find a gallery solution I'm stuck with RapidWeaver."* Users with thousands of images need galleries fed from a **server folder** (56788 — 5 supporters; 56647 — ben: "something we'd love to add"), remote-URL **background images** (56902, currently third-party-only), and alt text on remote images (P0 #6). Even a v1 (folder URL + JSON manifest, no thumbnails-on-server) would unblock migrations.

### 5. Text component: preserve links on paste
Pasting text containing hyperlinks strips them all (56147). One user states this alone blocks migrating two Classic sites ("hundreds of weblinks"); at least three threads over time. dan: *"It is on our list to support, I'll bump it up the priority list for you."*

### 6. Anchors & smooth scrolling for one-page sites
The right-click "New Link → #anchor" workflow is beloved but effectively secret (users search for days; the same old video keeps being rediscovered and thanked — 56883, 48411). Explicit request to build in **smooth scroll with easing and reliable scroll-to-ID offsets**, with Blocs/Webflow/Framer cited as the bar, because the documented CDN snippet "never scrolls back to the exact ID position". 5+ users.

### 7. Audio Playlist: finish the musician feature set
Volume control shipped (#95) — remaining accepted/requested items: **track duration + current position** display (57028 — "a must"), editable track metadata without deleting and re-adding (56083), track-list density control (56901, currently a `!important` CSS hack), optional pause when scrolled out of view (55021).

---

## P2 — Usability & polish (high-frequency friction, smaller lifts)

**The "Editor Preview" trap (biggest cross-component usability issue).** Users cannot discover that editing hidden states (non-first tab, mobile menu, slides) requires an inspector setting: Tabs (56088, 56310 — two threads in two weeks), mobile/sub menus (56698), and the menu Preview toggle that locks the editor so convincingly that one user **rebuilt his entire site** believing it corrupted (56371 — dan: "we'll look at improving"). The expected behaviour is direct manipulation: click a tab/slide/menu state on the canvas to activate it. Much of this is app-side, but component `editorPreview` properties and canvas affordances in this pack are part of the fix.

**Grid ergonomics.** The span-based column model defeats users monthly: asymmetric widths ("30/70") require a 10-column + span workaround (55521, 56475), centering an odd last row requires a 6-column trick (56218), dragging into a specific cell fails often enough that people retreat to the node browser (55952). Native fractional column widths and a "center last row" option would eliminate a steady stream of support videos. Plus: pagination/"load more" for card grids (57132).

**Text vs Typography split.** Chronic conceptual confusion — Theme Editor styles only affect Typography/Markdown, not Text (56215, 55846); terminology differs between the two inspectors (55310, zero replies); capabilities differ (`line-clamp` works in one, tracking classes don't apply in Text — 55109, 55950); accidental inline styles silently double-style text (57047). Users literally ask AI to explain the difference. Concrete component-level fixes: consistent property names, `line-clamp`/`tracking` support in Text, and the **links-in-lists styling gap** (54884, 55522 — dan: "We don't yet offer controls to style links in lists", 4+ users) which needs a List link style in the theme typography settings.

**Sliders.**
- Content Slider: **reorder arrows move the title but not the slide content** — acknowledged bug from March, no confirmed fix (55264); duplicate Advanced setting (54151, "we'll get that fixed"); Reveal animations only fire on the first slide (56032, unanswered); help "?" button 404s.
- Image Slider: no ordering control and starts on the last image of a folder (57022, unanswered); autoplay broken inside Accordion (55475, unanswered); "Visible Slides" lacks a responsive dot; nav button styling parity with Gallery (53401 — dan said he'd look at it).

**Video.** Portrait/vertical videos render tiny — community found a one-line CSS fix (`.video-vertical .h-auto { height: 100% }`, 57055); no auto-thumbnail (parity gap: Gallery Pro generates one, Video doesn't — 56123); poster fallback for video backgrounds on mobile (56127, unanswered); `.mov`/codec failures give no useful error — validate or warn at import (57013, 56024); subtitle tracks (.srt/.vtt) requested for a 50-video migration (56285); unlisted-Vimeo support (47959 — making a video public to onboard it caused real subscriber fallout).

**Modal / Reveal.** Video-in-modal stop-on-close is only partially fixed — YouTube embeds can restart seconds after closing (53639, flagged to ben with no reply); autofocus ring on the first link when a Modal is used as a nav (55904, unanswered); Reveal can't be dismissed after triggering (55360 — confirmed limitation) and its opacity/scale entry can't be disabled for scroll-zoom effects (55191, dan pinged twice).

**Smaller component asks worth batching:**
- Accordion: transition duration control (56259 — dan: "probably something we can add").
- Background: border/border-radius controls (56835 — currently needs `rounded-2xl` + Overflow None trivia).
- Divider: vertical variant (54130); rename the "Background" property (users expect it to be "Fill" — 55790).
- Breadcrumbs: emit BreadcrumbList JSON-LD (55279 — dan confirmed gap; cheap SEO win).
- Container: "Over" (Self/Parent) trigger for Color/Hover fill (57085, unanswered).
- Tabs: URL-hash/JS tab activation (57097 — dan hand-built a custom component for one user; fold it in).
- Navbar logo drop zone: accept direct image-file drops (or show a hint), and validate SVGs — malformed SVG markup has leaked visible code onto every published page (56296; 4+ users confused over 4 months).
- More per-breakpoint (blue-dot) properties, starting with background colour/visibility (57040 — reportedly "on the list" for ~20 months) — and make the dot itself more visible (multiple independent complaints).

---

## Docs debt (cheap, high-leverage)

The same questions recur because staff answer with excellent one-off screencasts instead of docs — effective but unscalable:
- **Content Slider docs are empty** and its in-app "?" help button 404s (57054, 55264).
- **Tabs manual** "pretty empty" (56310).
- **Custom theme Tailwind-4 migration guide** — explicitly requested, unanswered (56986).
- CSV format expectations for Table (Numbers/Excel/EU exports — 57032, 57128).
- Image Slider: folder-vs-images requirement; CMS `Gallery` front-matter (55573, 56616).
- The anchor right-click workflow and multilingual setup patterns.

---

## Housekeeping

- **Close stale GitHub issues**: #67 (Table CSV) and #68 (dropzone cells) are implemented in the repo; #37 (dark-mode links) appears fixed by the Text component fix (#93) — verify against thread 54085 (user hasn't re-tested on 3.x yet) and close.
- **Verify shipped fixes resolve their threads** and reply: 56719 (navbar active folders — fixed in #94), 57121 (radius token — #96), 57028/55021 (volume — #95).
- **Triage unanswered bug reports** (zero staff replies, some with repro material): 56560 (Tabs on mobile — video attached, pinged dan twice), 55475 (Image Slider autoplay in Accordion), 56032 (Reveal in Content Slider), 57022 (Slider ordering), 55904 (modal nav focus ring + hover styles), 57056 (published text overflowing containers), 56700 (stale global-nav URLs after renames — potential publishing-integrity bug), 56636 (dirty flag on caret placement), 57100 (Theme Studio Google Fonts silently deselecting).

## Out of scope for this repo (route to the app / rw-elements-tools)

Recorded here because forum demand is real, but the fix lives elsewhere: copy/paste of Effects/Transform/Filter attribute stacks between components (dan: "on the roadmap"), inspector remembering the last-edited parameter (4 supporters), eye-toggle hide/show in the layers tree, collapsible/favourite component panel sections, publishing integrity (interactive JS dead on live sites until a full server wipe — 56189), global shadow opacity/colour controls (GitHub #66 → rw-elements-tools), rich text editor improvements beyond paste, and frontmatter-driven Markdown import with schema.org output (57096 — a serious spec worth a product conversation).

---

## Suggested sequencing

| Sprint | Focus |
|---|---|
| Now (3.0.x point releases) | Hover-on-touch fix · CMS image lightbox (#72) · video lightbox close X · navbar mobile scroll + tap targets · #56 dark-mode image · finish Alt field rollout · Text Wrap mask glitch |
| Next release | Gallery lightbox captions + alt/caption split · Table row management (+ semicolon CSV) · Navbar folder sources / hamburger-off option · paste-with-links in Text |
| Following release | Warehousing v1 (gallery from server folder, remote backgrounds) · smooth-scroll anchors · audio track time/metadata editing · slider bug batch |
| Continuous | Docs debt · unanswered-thread triage · close stale issues · small-asks batches (accordion duration, breadcrumb JSON-LD, divider vertical, background radius) |

**Prioritisation logic:** regressions that silently break published sites come first (hover-on-touch above all — it also damages the paid template ecosystem); then confirmed bugs where public promises are aging (CMS lightbox, video close button) because they're now trust issues, not just bugs; then the features with both high demand *and* an existing staff commitment (gallery captions, table rows, navbar sources) since the expectation is already set; then migration blockers (warehousing, paste-with-links) which directly gate Classic→Elements conversions and therefore revenue; polish and docs run continuously since they're what generate the daily support load.
