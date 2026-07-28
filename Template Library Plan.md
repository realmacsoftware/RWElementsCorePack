# Core Pack — Template Library Plan

A clean-slate plan for the next generation of templates in the Elements Core Pack. No backwards compatibility with the current set; this is a full redesign aimed at covering, comprehensively, the kinds of content people actually build websites out of.

The companion spreadsheet (`Template Library Plan.xlsx`) holds the same data as a build tracker, with one row per template, a category overview, and priority/status columns.

## Goals

The library should let someone assemble an entire, professional site without ever dropping to a bare component — from a single H3 heading up to a complete multi-column footer. To do that well it needs three things: full coverage of common content patterns, a predictable structure so people can find what they need, and consistency so templates combine cleanly. Every template is composed only from the 32 components already shipping in the pack, so nothing here depends on new component work.

## Structure: two tiers

Templates split into two tiers — **Basics** and **Layouts**. This mirrors how people build: they reach for a small basic to fill a gap, or drop in a whole layout to scaffold a page. It also keeps the picker uncluttered. (Both tiers are still "templates" in the app; the tier names just describe scale.)

**Basics** are atomic, single-purpose pieces: a heading, a paragraph, a button, a card, a column grid. They are the vocabulary. Most map to one component or a tight cluster, and they're what someone grabs when they want to add one specific thing.

**Layouts** are composed, full-width page regions built from several basics and components: heroes, feature grids, pricing tables, footers. They are the sentences. Someone scaffolding a page drops these in and edits the copy.

The relationship is deliberate: a Layout like *Team Grid* is just the *Profile Card* basic repeated inside a *Grid*. Designing basics first and composing layouts from them keeps the whole library visually coherent and makes it far cheaper to maintain.

## Basics

### Headings & Display
The full type scale, from oversized display down to H5, plus the small supporting pieces that headings travel with. Includes a *Section Heading Group* (eyebrow + heading + lead paragraph) because that trio appears at the top of nearly every section and is tedious to rebuild each time.

Display Heading · H1 · H2 · H3 · H4 · H5 · Eyebrow / Kicker · Eyebrow Brand · Section Heading Group · Gradient Heading

### Body Text
Everything below a heading: the lead paragraph, standard body, small print, captions, quotes, and a Markdown-driven rich text block for long-form prose where mixed formatting matters.

Paragraph Lead · Paragraph · Paragraph Small · Caption / Fine Print · Rich Text Block · Pull Quote · Blockquote · Drop Cap Paragraph

### Lists
Plain ordered and unordered lists, plus the patterned variants people reach for: icon checklists, feature lists, and dot-leader rows (label … value).

Bulleted List · Numbered List · Icon Checklist · Feature List · Dot Leader List · Definition List · Inline Tag List

### Buttons & Actions
The button in every weight and icon arrangement, button groups for paired CTAs, inline link arrows, scroll-to-top, and a social icon row.

Primary · Secondary · Outline · Ghost / Text · Button + Icon Left · Button + Icon Right · Full-width · Button Group · Link Arrow · Scroll to Top · Social Icon Row

### Badges & Labels
Small status and category markers: badges, pill tags, status dots, ribbons, and promotional flags.

Badge · Pill Tag · Status Dot · Ribbon · New / Sale Label

### Media
Single media elements in their common treatments — rounded, framed, full-bleed, captioned — plus avatars, logos, icons, and video.

Image (Rounded) · Image (Framed) · Full-bleed Image · Image with Caption · Avatar · Logo · Icon · Video Embed · Video with Poster · Aspect-ratio Frame

### Cards
The single most reused composite. A spread of card types covers most layout needs: basic, image, icon, profile, stat, pricing, and testimonial cards are each the seed of a corresponding Layout.

Basic · Image · Rounded · Polaroid · Icon · Profile / Team · Stat · Pricing · Testimonial · Hover / Link · Horizontal

### Dividers & Spacers
Visual separators and whitespace control.

Line Divider · Decorative Divider · Spacer · Vertical Rule

### Layout Primitives
The structural scaffolding everything else sits inside: the centred container, 2/3/4-column and auto-fit grids, the bento grid, flex rows and columns, and sidebar splits.

Container · 2 Column · 3 Column · 4 Column · Auto-fit Grid · Photo Grid x3 · Bento Grid · Flex Row · Flex Column · Sidebar Split · Sticky Column · Masonry Columns

### Interactive Atoms
The small interactive pieces that sections are built from: accordion items, tab sets, dropdowns, modals, scroll reveals, and tooltips.

Accordion Item · Tab Set · Dropdown · Modal / Lightbox · Reveal on Scroll · Tooltip

## Layouts

### Navigation
Every common header pattern plus the secondary navigation pieces. Covers standard, sticky, transparent/overlay, centred-logo, and mega menus, a vertical sidebar nav, breadcrumb bar, utility top bar, and a mobile drawer.

Standard Menu · Sticky Menu · Fixed / Transparent Menu · Centered Logo Menu · Mega Menu · Vertical / Sidebar Nav · Breadcrumb Bar · Top Bar + Nav · Mobile Drawer Menu · Page List Nav

### Heroes
The opening section of a page, in the layouts that account for the overwhelming majority of real sites: centred, split (image left/right), full-bleed photo, video and gradient backgrounds, plus task-specific heroes for email capture, stats, and app downloads.

Simple Centered · Simple Alt (Left) · Split (Image Right) · Split (Image Left) · Full-bleed Photo · Video Background · Gradient · Hero with Email Form · Hero with Stats · App Download · Minimal Text

### Feature Sections
Where a product or service is explained. Grids of varying density, alternating image/text rows, bento showcases, screenshot pairings, tabbed features, and comparison columns.

Feature Grid Small · Feature Grid Large · Icon Feature Trio · Alternating Feature Rows · Bento Feature Grid · Feature with Screenshot · Tabbed Features · Checklist Feature · Comparison Columns

### Content / Editorial
Long-form and mixed text/media layouts: the two-column text+image pair (both orientations), full article bodies, prose with a sidebar, pull-quote sections, stats bands, process steps, and timelines.

Two Column Left · Two Column Right · Article Body · Prose with Sidebar · Pull Quote Section · Stats Band · Process / Steps · Timeline · Icon + Text Columns

### Galleries & Media
Image- and video-led sections: grid and masonry galleries, carousels, before/after sliders, logo walls, video showcases, lightboxes, and marquees.

Grid Gallery · Masonry Gallery · Carousel / Slider · Content Carousel · Before / After · Logo Wall · Video Showcase · Lightbox Gallery · Image Marquee

### Testimonials & Social Proof
The trust-building sections: single featured quote, testimonial grids and carousels, logo clouds, rating bands, case-study highlights, and press mentions.

Single Quote · Testimonial Grid · Testimonial Carousel · Logo Cloud · Rating Band · Case Study Highlight · Press Mentions

### Pricing
Tiered card layouts (2 and 3 plans), a single highlighted plan, a monthly/annual toggle, and table-driven comparison and feature-matrix layouts.

3-Tier · 2-Tier · Single Plan · Monthly / Annual Toggle · Comparison Table · Feature Matrix

### Team & About
People and company sections: team grids and carousels, founder bios, values grids, milestone timelines, and culture galleries.

Team Grid · Team Carousel · Founder Bio Split · Company Values Grid · Milestones Timeline · Office / Culture Gallery

### CTA
Conversion sections in their main shapes: centred callouts, full-width banners, split-with-image, gradient, inline newsletter, app download, and a sticky bottom bar.

Centered Callout · Banner · Split with Image · Gradient · Inline Newsletter · App Download · Sticky Bottom Bar

### Contact & Forms
Contact and capture: a contact form, form + map split, newsletter signup, booking prompt, contact-info columns, and a support CTA.

Contact Form · Contact + Map Split · Newsletter Signup · Booking / Appointment · Contact Info Columns · Support / Help CTA

### FAQ
Accordion-based question lists in their common arrangements: classic, smooth, two-column, tabbed by category, and searchable.

FAQ Classic · FAQ Smooth · Two Column FAQ · Tabbed FAQ · Searchable FAQ

### Blog & Content Lists
Everything a blog or news section needs: post grids and lists, a featured-post layout, category filtering, related posts, author bios, post headers and bodies, and pagination.

Blog Post Grid · Blog List · Featured + Grid · Category Filter Grid · Related Posts · Author Bio · Post Header · Post Body · Pagination

### Footers
The full range, from a single-line minimal footer to a big multi-column footer with newsletter signup, social row, sitemap, and legal/app variants.

Simple · Big · With Newsletter · Minimal · With Social · Sitemap · Legal / App

### Stats & Metrics
Number-led sections: animated counters, KPI bands, progress bars, and comparison stats.

Stat Counters · KPI Band · Progress Bars · Comparison Stats

### Banners & Announcements
Thin attention bars: top announcements, promo banners, cookie/consent notices, alerts, and countdown bars.

Top Announcement Bar · Promo Banner · Cookie / Consent Bar · Alert Banner · Countdown / Sale Bar

### Audio & Podcast
The audio player in its size and style variants, podcast players, and an episode list — built on the Audio component.

Audio Player Large · Medium · Mini · Curved · Podcast Player Small · Podcast Player Large · Episode List

### Data & Tables
Table-driven content: basic data tables, striped/sortable variants, spec/comparison tables, and key/value definition tables.

Basic Data Table · Striped / Sortable Table · Spec / Comparison Table · Definition Table

## Priorities

Each template carries a priority in the spreadsheet so the build can ship in waves rather than all at once.

**P1 — core launch set.** The basics and layouts no site can do without: the type scale, core buttons and cards, the column grids, standard navigation, the main hero and feature layouts, pricing, contact, FAQ, blog basics, and footers. Shipping P1 alone gives a complete, usable library.

**P2 — second wave.** Important variants that broaden coverage: alternate hero treatments, tabbed and bento features, carousels, the monthly/annual pricing toggle, team and stats sections, and richer footers.

**P3 — expansion.** Nice-to-have and niche templates: before/after sliders, marquees, sitemap footers, countdown bars, and similar.

## Component coverage

Every template draws only from the existing pack components. All 32 are exercised by the plan: Text and Typography drive the headings, body, and quotes; Markdown handles long-form prose; Button covers actions; Image, Video, SVG, Gallery, Image Slider, and Content Slider cover media; Grid, Bento Grid, Flex, Container, and Background handle layout; List, Table, Accordion, Tabs, Dropdown, Modal/Modal Close, Reveal, Filter, and Filter Tags power interactive and data sections; Menu, Top Pages, Tree, and Breadcrumbs cover navigation; Audio and Elements Badge round out media and labels.

## Styling & theming strategy

For the library to work as a *base* people build their own projects on, the styling has to be deliberately unopinionated and — more importantly — driven entirely by the theme system. The goal: a user drops in templates, changes one theme, and the whole site takes on their brand without touching any template. The pack's existing semantic theme tokens make this achievable if we hold to a few rules.

### 1. Token-first: never hard-code a value
Every color, space, radius, shadow, font, and type size in a template must bind to a theme token, not a literal. Use the theme controls (`themeColor`, `themeSpacing`, `themeTextStyle`, `themeFont`, `themeShadow`, `themeBorderRadius`) rather than fixed Tailwind values like `bg-blue-500` or `p-6`. A hard-coded color is a place the user's theme can't reach. This single rule is what makes the library re-skinnable.

### 2. Bind to semantic strips, not literal palettes
The themes expose semantic color strips — **brand**, **accent**, **surface**, **text** — sitting above the literal palettes (blue, red, etc.). Templates should reference only the semantic ones, with a consistent contract:

- **brand** — primary actions and emphasis (primary buttons, active states, key highlights)
- **accent** — secondary highlights and supporting accents
- **surface** — backgrounds and cards, using the 50→950 shade range for layering
- **text** — headings and body copy

If a user remaps brand to their colour, every primary button, link, and highlight across all 205 templates updates at once. Literal palettes stay available for the rare deliberate exception, but the default styling never reaches for them.

### 3. Ship against a neutral base theme
Provide one deliberately blank base theme the whole library is authored against: a grayscale surface ramp, a single restrained brand colour, the system font stack, moderate border radius, and soft shadows. It should read as a canvas, not a finished brand — no decorative flourishes, gradients, or personality baked into the templates themselves. Then ship two or three *starter* themes (e.g. a bold one, a soft/editorial one, a high-contrast one) that extend the base via `baseThemeIdentifier`, so users can see the same templates re-skinned instantly and have a starting point to fork.

### 4. Light/dark parity by default
Every template uses the theme's `dark:` token variants throughout (the strips already carry both light and dark shades). Nothing should look broken or low-contrast when the user flips to dark mode — that parity has to be built in per template, not retrofitted.

### 5. Consistent structural rhythm
Generic-feeling templates come from predictable spacing and proportion, not just colour. Standardise the section vertical-padding scale, the max-width container, and the heading/type-scale usage across every layout so basics and layouts stack cleanly in any order. A user assembling a page from ten different sections should get even, coherent rhythm without manual adjustment.

### 6. Expose a small, high-value set of knobs
Each template should surface only the few properties that matter — colour role, padding, alignment, column count — each wired to theme tokens and responsive by breakpoint. Hide one-off, arbitrary settings. Fewer, theme-bound controls keep templates from drifting into bespoke styling that breaks the re-skin guarantee.

### 7. Neutral default content
Use placeholder copy, generic icons, and neutral stock/placeholder imagery in the defaults — nothing brand-specific. The user should perceive an empty, ready-to-fill structure, not someone else's finished page they have to dismantle.

### Deliverables this implies
Alongside the templates, plan for: a **neutral base theme**, **2–3 starter themes** extending it, and a short **token contract doc** specifying exactly how brand/accent/surface/text and the spacing/type scales are used — so every template is authored to the same rules and the re-skin guarantee actually holds.

## Suggested build order

Start by building the P1 **Basics**, since every layout composes from them — locking the type scale, buttons, cards, and grids first means the layouts inherit a consistent look automatically. Then build the P1 **Layouts** category by category, beginning with the ones every site needs (Navigation, Heroes, Footers) and moving through Features, Pricing, Contact, FAQ, and Blog. Layer in P2 and P3 once the core set is in place and validated against real pages.
