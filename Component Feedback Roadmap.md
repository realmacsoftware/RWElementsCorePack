# Core Pack — Component Feedback Roadmap

**July 2026 · Forum feedback analysis**

An analysis of recent forum activity ([forums.realmacsoftware.com](https://forums.realmacsoftware.com), ~April–July 2026) focused on what it tells us about the Core Pack components: what's broken, what people are asking for, and what to prioritise next. Compiled from a full sweep of the Elements category — component threads, the 3.0.x beta/release threads, and long-running bug topics — cross-checked against this repo's recent commits and open GitHub issues. Every item links back to the source thread(s).

**Headline:** sentiment towards Elements 3 is strongly positive (speed praise is near-universal, and staff responsiveness earns repeated goodwill). The pain concentrates in five places:

1. **Hover-on-touch is broken** since Tailwind 4 and is the biggest unresolved regression.
2. **Mobile Navbar quality** — scrolling, tap targets, and flexibility gaps generate more frustrated threads than any other single component.
3. **Media metadata** (captions/alt/titles in lightboxes) is the most widespread feature pain, ~12 distinct users across 8 topics.
4. **Table data management** is the loudest concrete feature ask, with staff already on record promising it.
5. **A handful of confirmed bugs have been open for months** (CMS image lightbox, video lightbox close button) and users have started calling out the delay publicly.

---

## P0 — Fix now

*Confirmed bugs and regressions with real user impact.*

### 1. Hover effects dead on touch devices (cross-cutting, Tailwind 4)

Tailwind 4 gates the `hover:` variant behind `@media (hover: hover)`, so on phones/tablets every hover-driven design silently does nothing: card overlays with links inside become unreachable, hover-scale effects vanish, and the new **3D Transforms** component is inert on mobile. The old "first tap = hover" behaviour from 2.x is gone. The requested fix is small: `@custom-variant hover (&:hover);` in the Tailwind build, or an app/pack setting. Alternative: per-component touch fallbacks (tap-to-toggle) for 3D Transforms and hover-reveal patterns.

- **Impact:** WeaverPixel's commercial templates are broken in the field; Blumik's live homepage effect does nothing on mobile. Users have pinged twice as instructed; dan has only committed to "discuss with ben".
- **Why P0:** it's a regression from 2.x, it breaks published sites invisibly (authors preview on desktop), and it undermines the template/store ecosystem.
- **Sources:** [Hover animations on touch devices (57041)](https://forums.realmacsoftware.com/t/57041) · [3D Transform (57053)](https://forums.realmacsoftware.com/t/57053) · echoed in [3.0.4 Buttons Transforms issue (57115)](https://forums.realmacsoftware.com/t/57115)

### 2. Image Lightbox empty with CMS-sourced images

Confirmed bug with a ticket since **April**; dan said "fix early next week" on **May 28**; still open. Three separate users hit it building exactly the CMS gallery/blog pattern we recommend. The lightbox template needs to use the CMS image src (it currently appears to use the alt).

- **Sources:** [Image Lightbox not working with CMS pictures (55847)](https://forums.realmacsoftware.com/t/55847) · [Image on Post page of CMS not displaying in lightbox (56398)](https://forums.realmacsoftware.com/t/56398) · [CMS Gallery (56375)](https://forums.realmacsoftware.com/t/56375) · [GitHub #72](https://github.com/realmacsoftware/RWElementsCorePack/issues/72)

### 3. Video lightbox close button misaligned / unclickable

Open since **March**: on mobile portrait the X can't be tapped at all (users must rotate to landscape); on Windows Chrome/Firefox the X does nothing (ESC works); the hit target drifts as the window narrows. Ben ticketed it in March and acknowledged in May it got deprioritised for CMS work — and a user pushed back publicly: *"i dont understand prioritising something thats not available yet to something that people are actually paying good money for."* Small fix, outsized trust cost while open.

- **Sources:** [Videos will not close (55091)](https://forums.realmacsoftware.com/t/55091) · [Video → Lightbox → Closing Icon (55890)](https://forums.realmacsoftware.com/t/55890) · [A few minor issues (56123)](https://forums.realmacsoftware.com/t/56123)

### 4. Navbar mobile menu can't scroll on iPhone

When the open mobile menu is taller than the viewport, items below the fold are unreachable. Community root cause: the menu's bottom position defaults to `auto`; any explicit value fixes it. Known for over a year, still ships as the default. 4+ users in one thread: *"I can't believe this problem still exists."* One-line default change in the navbar component.

- **Sources:** [Menu Not Scrolling on iPhone (56703)](https://forums.realmacsoftware.com/t/56703) · original report [48241](https://forums.realmacsoftware.com/t/48241)

### 5. Navbar mobile menu items need two taps

Only the text label is the hit area — tapping the padding around a menu item does nothing, so imprecise taps read as "menu is broken". Reported independently twice in one week. Fix: make the whole row clickable.

- **Sources:** [Drop Down Menu double touch (56937)](https://forums.realmacsoftware.com/t/56937) · [Menu in Elements (56979)](https://forums.realmacsoftware.com/t/56979)

### 6. Alt text: remote/CMS images have no alt field, and the migration scared users

After alt moved to the Resource Info panel: (a) remote/warehoused images have **no way** to set alt at all (ben: "I'll chat with the team… ASAP"); (b) the Image component's CMS mode has no alt input, `{{item.image.alt}}` doesn't flow through (ben: "a slight oversight… we'll get this fixed"); (c) users report previously entered alt text on hundreds of images appearing gone. dan promised the component-side rollout of the new Alt field in May ("Weeks, I want to get this in asap"). Finish the rollout across Image, Gallery, Slider, Background.

- **Sources:** [Missing alt text field (56488)](https://forums.realmacsoftware.com/t/56488) · [Image alt tag in CMS container (56686)](https://forums.realmacsoftware.com/t/56686) · [Gallery – Alt text (55469)](https://forums.realmacsoftware.com/t/55469) · [Gallery question (56163)](https://forums.realmacsoftware.com/t/56163)

### 7. Custom image shows dark-mode variant when project dark mode is off

Still open from February; simple conditional in the image template.

- **Sources:** [GitHub #56](https://github.com/realmacsoftware/RWElementsCorePack/issues/56) · [Image not displaying with custom source URL (54641)](https://forums.realmacsoftware.com/t/54641)

### 8. Remaining 3.0.x migration loose ends

Most Tailwind-4 fallout was fixed fast (shadow token names, border-radius `sm` token, effects hover shadow, resource links reverting — all confirmed in 3.0.4/3.0.5). Still open:

- **"Auto" values not re-serialised** (Image width auto, Flex basis auto) — currently requires manual re-selection per instance; WeaverPixel has had 3 support emails from template customers about it. Worth an automated migration pass if feasible. — [Elements 3.0 Beta thread (56986)](https://forums.realmacsoftware.com/t/56986)
- **Custom theme migration docs** — adding `"tailwindVersion": "v4"` didn't fix jenkman's theme and his request for a migration guide is unanswered. — [56986](https://forums.realmacsoftware.com/t/56986)
- **Text Wrap (Shapes):** mask/theme-link icon click "changed the appearance of everything" until restart, and breakpoint-width edits applying to all breakpoints — unacknowledged. — [Text wrap component (57126)](https://forums.realmacsoftware.com/t/57126)
- **Tabs library categories disappear** from the component panel in 3.0.4 until app restart — a returning bug, no staff reply yet. — [56986 (post 57)](https://forums.realmacsoftware.com/t/56986/57)

---

## P1 — Build next

*High-demand features, mostly already staff-acknowledged.*

### 1. Navbar flexibility: folder-scoped sources & conditions — *top feature demand*

**6+ users across 5 threads (Apr–Jul)** need the Navbar to list something other than top-level pages: a specific folder, or pages filtered by condition — driven mostly by **multilingual sites** (EN/FR/DE folder structures). Top Pages can target a folder but has no mobile/hamburger version, so everyone falls into the gap; workarounds include AI-generated HTML embeds and Modal-as-menu projects. Direct escalation: *"Dear Dan & Elements Team, Please provide a better solution for this issue."*

- **Sources:** [Elements. Multilingual website (56418)](https://forums.realmacsoftware.com/t/56418) · [55792](https://forums.realmacsoftware.com/t/55792) · [56302](https://forums.realmacsoftware.com/t/56302) · [57063](https://forums.realmacsoftware.com/t/57063) · [56226](https://forums.realmacsoftware.com/t/56226)

Related asks that would ride along:

- Option to **disable the hamburger** and keep the horizontal menu at all breakpoints — dan confirmed the gap. — [Turn Off Mobile Menu? (56877)](https://forums.realmacsoftware.com/t/56877) · [56516](https://forums.realmacsoftware.com/t/56516)
- **Mega menu** support — 4 interested users, concrete 86-link migration use case. — [Is a Mega Menu on the Horizon? (55348)](https://forums.realmacsoftware.com/t/55348)
- Separate **hover state** for menu items ([55955](https://forums.realmacsoftware.com/t/55955)), **text-transform** control ([56124](https://forums.realmacsoftware.com/t/56124)), Dropdown link alignment ([56295](https://forums.realmacsoftware.com/t/56295))

### 2. Gallery: captions in the lightbox + alt/caption separation — *already promised*

Ben on record: *"We'll be adding the ability to add the Caption and Author to the built-in Gallery Lightbox in the near future."* 5 users, some furious (months of searching; one bought a third-party gallery just for this; resentment at "buy Gallery Pro" as the answer). Bundle with:

- **Separate alt vs caption fields** — ticketed, "high on the list"; same Alt-field rollout as P0 #6. — [55469](https://forums.realmacsoftware.com/t/55469) · [56163](https://forums.realmacsoftware.com/t/56163)
- **Loop option** in the lightbox; arrows currently go dead at the ends and can't be hidden. — [Gallery Component – Request (55728)](https://forums.realmacsoftware.com/t/55728)
- Safari-only caption spacing bug in the lightbox. — [55728](https://forums.realmacsoftware.com/t/55728)
- **Sources:** [Titles Under Images? (56664)](https://forums.realmacsoftware.com/t/56664) · [No description or author showing in Lightbox (54116)](https://forums.realmacsoftware.com/t/54116)

### 3. Table: manage rows in the app

Four distinct users in seven weeks want to insert/delete/**reorder** rows without re-typing data or round-tripping a CSV. Staff is committed: ben — *"We do have plans to update the Table to support more ways for you to manage your data"*; dan — ben has *"an internal build… that allows you to [drop components in cells]. We'll hopefully get around to fixing it up and shipping it soon."*

- **Note:** CSV and dropzone-cell support **already exist in this repo's Table component** — the remaining work is row manipulation UX and shipping the cell-dropzone option.
- **Semicolon-separated CSV support:** EU-locale Numbers/Excel exports are rejected with an unhelpful error — unaddressed. — [Apple's Numbers App to .CSV vs Table (57032)](https://forums.realmacsoftware.com/t/57032)
- Close stale [GitHub #67](https://github.com/realmacsoftware/RWElementsCorePack/issues/67) (CSV) and [GitHub #68](https://github.com/realmacsoftware/RWElementsCorePack/issues/68) (dropzone cells) — both implemented.
- **Sources:** [Moving table rows (57128)](https://forums.realmacsoftware.com/t/57128) · [How do you insert or delete a row in tables (56624)](https://forums.realmacsoftware.com/t/56624) · CSV beta bugs: [Elements 3.0 beta and Table component (56999)](https://forums.realmacsoftware.com/t/56999)

### 4. Warehousing / remote media — *top Classic-migration blocker*

The emotional peak of the quarter: *"a complete show stopper… Until I can find a gallery solution I'm stuck with RapidWeaver."* Users with thousands of images need galleries fed from a **server folder** (5 supporters; ben: "something we'd love to add"), remote-URL **background images** (currently third-party-only), and alt text on remote images (P0 #6). Even a v1 (folder URL + JSON manifest, no thumbnails-on-server) would unblock migrations.

- **Sources:** [Does the Gallery Component support warehousing images? (56788)](https://forums.realmacsoftware.com/t/56788) · [Warehousing: Can Gallery Pro access a folder of images on the server? (56647)](https://forums.realmacsoftware.com/t/56647) · [Warehoused Images as Banners (56902)](https://forums.realmacsoftware.com/t/56902)

### 5. Text component: preserve links on paste

Pasting text containing hyperlinks strips them all. One user states this alone blocks migrating two Classic sites ("hundreds of weblinks"); at least three threads over time. dan: *"It is on our list to support, I'll bump it up the priority list for you."*

- **Sources:** [Pasting hyperlinks (56147)](https://forums.realmacsoftware.com/t/56147)

### 6. Anchors & smooth scrolling for one-page sites

The right-click "New Link → #anchor" workflow is beloved but effectively secret (users search for days; the same old video keeps being rediscovered and thanked). Explicit request to build in **smooth scroll with easing and reliable scroll-to-ID offsets**, with Blocs/Webflow/Framer cited as the bar, because the documented CDN snippet "never scrolls back to the exact ID position". 5+ users.

- **Sources:** [One page web design (56883)](https://forums.realmacsoftware.com/t/56883) · [Adding Anchor on single page site to Menu (48411)](https://forums.realmacsoftware.com/t/48411)

### 7. Audio Playlist: finish the musician feature set

Volume control shipped (#95) — remaining accepted/requested items:

- **Track duration + current position** display ("a must"). — [Volume control & track time in audio component (57028)](https://forums.realmacsoftware.com/t/57028)
- Editable track metadata without deleting and re-adding. — [56083](https://forums.realmacsoftware.com/t/56083)
- Track-list density control (currently an `!important` CSS hack). — [Audio Component – Reduce padding around track names (56901)](https://forums.realmacsoftware.com/t/56901)
- Optional pause when scrolled out of view; simple single-track variant. — [Request for 'Simple' Custom Audio Component (55021)](https://forums.realmacsoftware.com/t/55021)

---

## P2 — Usability & polish

*High-frequency friction, smaller lifts.*

### The "Editor Preview" trap — biggest cross-component usability issue

Users cannot discover that editing hidden states (non-first tab, mobile menu, slides) requires an inspector setting. Two Tabs threads in two weeks; the menu Preview toggle locks the editor so convincingly that one user **rebuilt his entire site** believing it corrupted (dan: "we'll look at improving"). Expected behaviour is direct manipulation: click a tab/slide/menu state on the canvas to activate it. Much of this is app-side, but component `editorPreview` properties and canvas affordances in this pack are part of the fix.

- **Sources:** [Tabs component not switching tabs in editor (56088)](https://forums.realmacsoftware.com/t/56088) · [How to enter content into Tabs (56310)](https://forums.realmacsoftware.com/t/56310) · [Editing Mobile & Sub Menus (56698)](https://forums.realmacsoftware.com/t/56698) · [UI Improvement request (56371)](https://forums.realmacsoftware.com/t/56371)

### Grid ergonomics

The span-based column model defeats users monthly: asymmetric widths ("30/70") require a 10-column + span workaround, centering an odd last row requires a 6-column trick, and dragging into a specific cell fails often enough that people retreat to the node browser. Native fractional column widths and a "center last row" option would eliminate a steady stream of support videos. Plus: pagination/"load more" for card grids.

- **Sources:** [Defining grid column widths (55521)](https://forums.realmacsoftware.com/t/55521) · [2 column with custom size for each column (56475)](https://forums.realmacsoftware.com/t/56475) · [Centering Cards on a Grid (56218)](https://forums.realmacsoftware.com/t/56218) · [Creating a grid in trial mode (55952)](https://forums.realmacsoftware.com/t/55952) · [Paginate Card Grids (57132)](https://forums.realmacsoftware.com/t/57132)

### Text vs Typography split

Chronic conceptual confusion — Theme Editor styles only affect Typography/Markdown, not Text; terminology differs between the two inspectors (zero replies to the request to unify); capabilities differ (`line-clamp` works in one, tracking classes don't apply in Text); accidental inline styles silently double-style text. Users literally ask AI to explain the difference. Concrete component-level fixes: consistent property names, `line-clamp`/`tracking` support in Text, and the **links-in-lists styling gap** (dan: "We don't yet offer controls to style links in lists"; 4+ users) which needs a List link style in the theme typography settings.

- **Sources:** [Theme Editor Typography issues (56215)](https://forums.realmacsoftware.com/t/56215) · [Dark mode issues for text components (55846)](https://forums.realmacsoftware.com/t/55846) · [Styling Text and Typography (55310)](https://forums.realmacsoftware.com/t/55310) · [line-clamp not working in Text (55109)](https://forums.realmacsoftware.com/t/55109) · [Custom Letter Spacing (55950)](https://forums.realmacsoftware.com/t/55950) · [Text component adds extra vertical space (57047)](https://forums.realmacsoftware.com/t/57047) · links-in-lists: [54884](https://forums.realmacsoftware.com/t/54884) · [55522](https://forums.realmacsoftware.com/t/55522)

### Sliders

**Content Slider:**

- **Reorder arrows move the title but not the slide content** — acknowledged bug from March, no confirmed fix. — [Content Slider bug? (55264)](https://forums.realmacsoftware.com/t/55264)
- Duplicate Advanced setting ("we'll get that fixed", Feb). — [54151](https://forums.realmacsoftware.com/t/54151)
- Reveal animations only fire on the first slide (unanswered). — [Content Slider Reveal Question (56032)](https://forums.realmacsoftware.com/t/56032)
- Help "?" button 404s; docs page empty. — [55264](https://forums.realmacsoftware.com/t/55264) · [Add content to content slider (57054)](https://forums.realmacsoftware.com/t/57054)
- Max-height ignored when used as a banner (unresolved). — [56791](https://forums.realmacsoftware.com/t/56791)

**Image Slider:**

- No ordering control; starts on the *last* image of a folder (unanswered). — [Image slider order problem (57022)](https://forums.realmacsoftware.com/t/57022)
- Autoplay broken inside Accordion; "Visible Slides" lacks a responsive dot (unanswered, pinged twice). — [Image Slider – bug? (55475)](https://forums.realmacsoftware.com/t/55475)
- Nav button styling parity with Gallery (dan said he'd look at it). — [Image slider pagination (53401)](https://forums.realmacsoftware.com/t/53401)
- Open link in new tab option (logged). — [Image Slider Request (56687)](https://forums.realmacsoftware.com/t/56687)

### Video

- **Portrait/vertical videos render tiny** — community found a one-line CSS fix (`.video-vertical .h-auto { height: 100% }`). — [Vimeo portrait video (57055)](https://forums.realmacsoftware.com/t/57055)
- No auto-thumbnail (parity gap: Gallery Pro generates one, Video doesn't). — [A few minor issues (56123)](https://forums.realmacsoftware.com/t/56123)
- Poster fallback for video backgrounds on mobile (unanswered). — [Poster Image for Video/Mobile (56127)](https://forums.realmacsoftware.com/t/56127)
- `.mov`/codec failures give no useful error — validate or warn at import. — [Self Hosted Video disappearing in 3.0 (57013)](https://forums.realmacsoftware.com/t/57013) · [Video doesn't play on Safari (56024)](https://forums.realmacsoftware.com/t/56024)
- Subtitle tracks (.srt/.vtt) for a 50-video migration. — [Feature Request: Video Subtitles (56285)](https://forums.realmacsoftware.com/t/56285)
- Unlisted-Vimeo support — making a video public to onboard it caused real subscriber fallout. — [Vimeo (47959)](https://forums.realmacsoftware.com/t/47959)
- Autoplay only works in Safari; request auto-pause off-viewport. — [Video and browser compatibility (56016)](https://forums.realmacsoftware.com/t/56016)

### Modal / Reveal

- Video-in-modal stop-on-close only partially fixed — YouTube embeds can restart seconds after closing (flagged to ben, no reply). — [Stop Video in a modal after modal close (53639)](https://forums.realmacsoftware.com/t/53639)
- Autofocus ring on the first link when a Modal is used as a nav (unanswered). — [Modal used for menu (55904)](https://forums.realmacsoftware.com/t/55904)
- Reveal can't be dismissed after triggering (confirmed limitation); entry opacity/scale can't be disabled for scroll-zoom effects (dan pinged twice). — [Reveal and then go away (55360)](https://forums.realmacsoftware.com/t/55360) · [Image-Zoom on scroll (55191)](https://forums.realmacsoftware.com/t/55191)
- Hover-triggered tooltip/popover pattern has no component (unanswered). — [Tooltip Modal or something else? (57079)](https://forums.realmacsoftware.com/t/57079)

### Smaller component asks worth batching

- **Accordion:** transition duration control (dan: "probably something we can add"). — [Accordion help (56259)](https://forums.realmacsoftware.com/t/56259)
- **Background:** border/border-radius controls (currently needs `rounded-2xl` + Overflow None trivia). — [Container Background image with CMS (56835)](https://forums.realmacsoftware.com/t/56835)
- **Divider:** vertical variant ([54130](https://forums.realmacsoftware.com/t/54130)); rename the "Background" property — users expect "Fill" ([55790](https://forums.realmacsoftware.com/t/55790))
- **Breadcrumbs:** emit BreadcrumbList JSON-LD (dan confirmed gap; cheap SEO win). — [BreadcrumbList schema (55279)](https://forums.realmacsoftware.com/t/55279)
- **Container:** "Over" (Self/Parent) trigger for Color/Hover fill (unanswered). — [Fill/Color Background – Over Option (57085)](https://forums.realmacsoftware.com/t/57085)
- **Tabs:** URL-hash/JS tab activation — dan hand-built a custom component for one user; fold it in. — [Tabs: activate a tab with javascript (57097)](https://forums.realmacsoftware.com/t/57097)
- **Navbar logo drop zone:** accept direct image-file drops (or show a hint), and validate SVGs — malformed SVG markup has leaked visible code onto every published page; 4+ users confused over 4 months. — [Standard Menu Issue (56296)](https://forums.realmacsoftware.com/t/56296) · [PNG on left side of Standard Menu (56981)](https://forums.realmacsoftware.com/t/56981) · [Animated gif in menu rather than SVG? (55547)](https://forums.realmacsoftware.com/t/55547) · [Menu not working (57117)](https://forums.realmacsoftware.com/t/57117)
- **SVG:** Safari hairline artifact on section dividers ([56150](https://forums.realmacsoftware.com/t/56150)); dark-mode icon colour bug, ticketed ([55275](https://forums.realmacsoftware.com/t/55275))
- **Image:** EXIF rotation wrong in editor for iPhone photos ([56765](https://forums.realmacsoftware.com/t/56765)); "Reveal in Resources" context action — dan: "great idea, I'll add it to the list" ([57005](https://forums.realmacsoftware.com/t/57005)); per-breakpoint crops ([56519](https://forums.realmacsoftware.com/t/56519))
- **More per-breakpoint (blue-dot) properties**, starting with background colour/visibility — reportedly "on the list" for ~20 months — and make the dot itself more visible (multiple independent complaints). — [More responsive properties (57040)](https://forums.realmacsoftware.com/t/57040) · [Line Height issue (56919)](https://forums.realmacsoftware.com/t/56919)

---

## Docs debt

*Cheap, high-leverage. The same questions recur because staff answer with excellent one-off screencasts instead of docs — effective but unscalable.*

- **Content Slider docs are empty** and its in-app "?" help button 404s. — [57054](https://forums.realmacsoftware.com/t/57054) · [55264](https://forums.realmacsoftware.com/t/55264)
- **Tabs manual** "pretty empty". — [56310](https://forums.realmacsoftware.com/t/56310)
- **Custom theme Tailwind-4 migration guide** — explicitly requested, unanswered. — [56986](https://forums.realmacsoftware.com/t/56986)
- CSV format expectations for Table (Numbers/Excel/EU exports). — [57032](https://forums.realmacsoftware.com/t/57032) · [57128](https://forums.realmacsoftware.com/t/57128)
- Image Slider: folder-vs-images requirement; CMS `Gallery` front-matter. — [55573](https://forums.realmacsoftware.com/t/55573) · [56616](https://forums.realmacsoftware.com/t/56616)
- The anchor right-click workflow and multilingual setup patterns. — [56883](https://forums.realmacsoftware.com/t/56883) · [56418](https://forums.realmacsoftware.com/t/56418)

---

## Housekeeping

**Close stale GitHub issues:**

- [#67](https://github.com/realmacsoftware/RWElementsCorePack/issues/67) (Table CSV) and [#68](https://github.com/realmacsoftware/RWElementsCorePack/issues/68) (dropzone cells) are implemented in the repo.
- [#37](https://github.com/realmacsoftware/RWElementsCorePack/issues/37) (dark-mode links) appears fixed by the Text component fix (#93) — verify against [Link Color Not Being Respected (54085)](https://forums.realmacsoftware.com/t/54085) (user hasn't re-tested on 3.x yet) and close.

**Verify shipped fixes resolve their threads** and reply:

- [Sticky menu text states (56719)](https://forums.realmacsoftware.com/t/56719) — navbar active folders, fixed in #94
- [3.0.4 Theme Border Radius bugs (57121)](https://forums.realmacsoftware.com/t/57121) — radius token, fixed in #96
- [Volume control & track time (57028)](https://forums.realmacsoftware.com/t/57028) / [55021](https://forums.realmacsoftware.com/t/55021) — volume shipped in #95 (track time still open)

**Triage unanswered bug reports** (zero staff replies, some with repro material):

- [Possible Tabs Bug on Mobile (56560)](https://forums.realmacsoftware.com/t/56560) — video attached, pinged dan twice
- [Image Slider autoplay in Accordion (55475)](https://forums.realmacsoftware.com/t/55475)
- [Reveal in Content Slider (56032)](https://forums.realmacsoftware.com/t/56032)
- [Image slider order problem (57022)](https://forums.realmacsoftware.com/t/57022)
- [Modal nav focus ring + hover styles (55904)](https://forums.realmacsoftware.com/t/55904)
- [Published text overflowing containers (57056)](https://forums.realmacsoftware.com/t/57056)
- [Stale global-nav URLs after renames (56700)](https://forums.realmacsoftware.com/t/56700) — potential publishing-integrity bug
- [Dirty flag on caret placement (56636)](https://forums.realmacsoftware.com/t/56636)
- [Theme Studio Google Fonts silently deselecting (57100)](https://forums.realmacsoftware.com/t/57100)

---

## Out of scope for this repo

*Recorded because forum demand is real, but the fix lives in the Elements app or `rw-elements-tools`:*

- Copy/paste of Effects/Transform/Filter attribute stacks between components — dan: "on the roadmap". — [57007](https://forums.realmacsoftware.com/t/57007)
- Inspector remembering the last-edited parameter — 4 supporters. — [56551](https://forums.realmacsoftware.com/t/56551)
- Eye-toggle hide/show in the layers tree. — [56910](https://forums.realmacsoftware.com/t/56910)
- Collapsible/favourite component panel sections; larger inspector text. — [57061](https://forums.realmacsoftware.com/t/57061)
- Publishing integrity — interactive JS dead on live sites until a full server wipe. — [56189](https://forums.realmacsoftware.com/t/56189)
- Global shadow opacity/colour controls → `rw-elements-tools`. — [GitHub #66](https://github.com/realmacsoftware/RWElementsCorePack/issues/66) · richer shadow authoring: [57009](https://forums.realmacsoftware.com/t/57009)
- Frontmatter-driven Markdown import with schema.org output — a serious spec worth a product conversation. — [57096](https://forums.realmacsoftware.com/t/57096)
- Extended Markdown (heading IDs). — [55852](https://forums.realmacsoftware.com/t/55852)

---

## Suggested sequencing

| Sprint | Focus |
|---|---|
| Now (3.0.x point releases) | Hover-on-touch fix · CMS image lightbox (#72) · video lightbox close X · navbar mobile scroll + tap targets · #56 dark-mode image · finish Alt field rollout · Text Wrap mask glitch |
| Next release | Gallery lightbox captions + alt/caption split · Table row management (+ semicolon CSV) · Navbar folder sources / hamburger-off option · paste-with-links in Text |
| Following release | Warehousing v1 (gallery from server folder, remote backgrounds) · smooth-scroll anchors · audio track time/metadata editing · slider bug batch |
| Continuous | Docs debt · unanswered-thread triage · close stale issues · small-asks batches (accordion duration, breadcrumb JSON-LD, divider vertical, background radius) |

**Prioritisation logic:** regressions that silently break published sites come first (hover-on-touch above all — it also damages the paid template ecosystem); then confirmed bugs where public promises are aging (CMS lightbox, video close button) because they're now trust issues, not just bugs; then the features with both high demand *and* an existing staff commitment (gallery captions, table rows, navbar sources) since the expectation is already set; then migration blockers (warehousing, paste-with-links) which directly gate Classic→Elements conversions and therefore revenue; polish and docs run continuously since they're what generate the daily support load.
