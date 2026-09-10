import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const builderPath =
    "packs/Core.elementsdevpack/components/shared/rss/rss-item-builder.js";

function loadBuilder() {
    const source = fs.readFileSync(builderPath, "utf8");
    const sandbox = { module: { exports: {} }, Date, Array, isNaN, parseInt };
    vm.runInNewContext(source, sandbox, { filename: builderPath });
    return sandbox.module.exports;
}

const {
    buildRssFeed,
    buildRssItem,
    escapeXml,
    toRfc822,
    resolveImageUrl,
    guessMimeType,
} = loadBuilder();

// ---------------------------------------------------------------------------
// Unit: escapeXml
// ---------------------------------------------------------------------------

test("escapeXml encodes all five XML special characters", () => {
    assert.equal(escapeXml('a&b<c>d"e\'f'), "a&amp;b&lt;c&gt;d&quot;e&apos;f");
});

test("escapeXml returns empty string for non-string input", () => {
    assert.equal(escapeXml(null), "");
    assert.equal(escapeXml(undefined), "");
    assert.equal(escapeXml(42), "");
});

// ---------------------------------------------------------------------------
// Unit: toRfc822
// ---------------------------------------------------------------------------

test("toRfc822 converts ISO date to RFC 822", () => {
    const result = toRfc822("2026-03-18T12:00:00Z");
    assert.match(result, /Wed, 18 Mar 2026/);
});

test("toRfc822 returns empty string for invalid date", () => {
    assert.equal(toRfc822("not-a-date"), "");
    assert.equal(toRfc822(null), "");
});

// ---------------------------------------------------------------------------
// Unit: resolveImageUrl
// ---------------------------------------------------------------------------

test("resolveImageUrl handles string URL", () => {
    assert.equal(resolveImageUrl("https://example.com/img.jpg"), "https://example.com/img.jpg");
});

test("resolveImageUrl handles object with src", () => {
    assert.equal(
        resolveImageUrl({ src: "https://example.com/photo.png" }),
        "https://example.com/photo.png"
    );
});

test("resolveImageUrl returns null for falsy input", () => {
    assert.equal(resolveImageUrl(null), null);
    assert.equal(resolveImageUrl(""), null);
    assert.equal(resolveImageUrl(undefined), null);
});

// ---------------------------------------------------------------------------
// Unit: guessMimeType
// ---------------------------------------------------------------------------

test("guessMimeType recognises common extensions", () => {
    assert.equal(guessMimeType("photo.png"), "image/png");
    assert.equal(guessMimeType("photo.gif"), "image/gif");
    assert.equal(guessMimeType("photo.webp"), "image/webp");
    assert.equal(guessMimeType("photo.jpg"), "image/jpeg");
    assert.equal(guessMimeType("photo.jpeg"), "image/jpeg");
});

test("guessMimeType defaults to image/jpeg for unknown", () => {
    assert.equal(guessMimeType("photo.bmp"), "image/jpeg");
    assert.equal(guessMimeType(null), "image/jpeg");
});

// ---------------------------------------------------------------------------
// Integration: buildRssItem — featured image
// ---------------------------------------------------------------------------

test("buildRssItem emits enclosure for a string image URL", () => {
    const xml = buildRssItem({
        title: "Post One",
        image: "https://example.com/hero.jpg",
    });
    assert.match(xml, /<enclosure\s/);
    assert.match(xml, /url="https:\/\/example\.com\/hero\.jpg"/);
    assert.match(xml, /type="image\/jpeg"/);
});

test("buildRssItem emits enclosure for an object image with src", () => {
    const xml = buildRssItem({
        title: "Post Two",
        image: { src: "https://cdn.example.com/banner.png" },
    });
    assert.match(xml, /<enclosure\s/);
    assert.match(xml, /url="https:\/\/cdn\.example\.com\/banner\.png"/);
    assert.match(xml, /type="image\/png"/);
});

test("buildRssItem emits media:content for featured image", () => {
    const xml = buildRssItem({
        title: "Post Three",
        image: "https://example.com/photo.webp",
    });
    assert.match(xml, /<media:content\s/);
    assert.match(xml, /medium="image"/);
    assert.match(xml, /type="image\/webp"/);
});

test("buildRssItem emits media:thumbnail for featured image", () => {
    const xml = buildRssItem({
        title: "Post Four",
        image: "https://example.com/thumb.gif",
    });
    assert.match(xml, /<media:thumbnail\s/);
    assert.match(xml, /url="https:\/\/example\.com\/thumb\.gif"/);
});

test("buildRssItem omits image elements when image is absent", () => {
    const xml = buildRssItem({ title: "No Image" });
    assert.doesNotMatch(xml, /<enclosure/);
    assert.doesNotMatch(xml, /<media:content/);
    assert.doesNotMatch(xml, /<media:thumbnail/);
});

// ---------------------------------------------------------------------------
// Integration: buildRssItem — tags
// ---------------------------------------------------------------------------

test("buildRssItem emits category elements for string tags", () => {
    const xml = buildRssItem({
        title: "Tagged",
        tags: ["technology", "country-life", "attention"],
    });
    assert.match(xml, /<category>technology<\/category>/);
    assert.match(xml, /<category>country-life<\/category>/);
    assert.match(xml, /<category>attention<\/category>/);
});

test("buildRssItem emits category elements for enriched tag objects", () => {
    const xml = buildRssItem({
        title: "Rich Tags",
        tags: [
            { title: "Nature", url: "/tags/nature" },
            { title: "Tech", url: "/tags/tech" },
        ],
    });
    assert.match(xml, /<category>Nature<\/category>/);
    assert.match(xml, /<category>Tech<\/category>/);
});

// ---------------------------------------------------------------------------
// Integration: buildRssItem — categories
// ---------------------------------------------------------------------------

test("buildRssItem emits category elements for categories array", () => {
    const xml = buildRssItem({
        title: "Categorised",
        categories: ["tutorials", "guides"],
    });
    assert.match(xml, /<category>tutorials<\/category>/);
    assert.match(xml, /<category>guides<\/category>/);
});

test("buildRssItem combines tags and categories", () => {
    const xml = buildRssItem({
        title: "Both",
        tags: ["alpha"],
        categories: ["beta"],
    });
    const catMatches = xml.match(/<category>/g);
    assert.equal(catMatches.length, 2);
    assert.match(xml, /<category>alpha<\/category>/);
    assert.match(xml, /<category>beta<\/category>/);
});

// ---------------------------------------------------------------------------
// Integration: buildRssItem — standard fields still present
// ---------------------------------------------------------------------------

test("buildRssItem includes title, link, description, pubDate, guid", () => {
    const xml = buildRssItem({
        title: "Full Post",
        link: "https://example.com/posts/full",
        description: "A summary of the post.",
        date_published: "2026-06-15T10:30:00Z",
        guid: "https://example.com/posts/full",
    });
    assert.match(xml, /<title>Full Post<\/title>/);
    assert.match(xml, /<link>https:\/\/example\.com\/posts\/full<\/link>/);
    assert.match(xml, /<description>A summary of the post\.<\/description>/);
    assert.match(xml, /<pubDate>/);
    assert.match(xml, /Mon, 15 Jun 2026/);
    assert.match(xml, /<guid>https:\/\/example\.com\/posts\/full<\/guid>/);
});

// ---------------------------------------------------------------------------
// Integration: buildRssFeed — full feed with all new fields
// ---------------------------------------------------------------------------

test("buildRssFeed produces valid RSS 2.0 with media namespace", () => {
    const xml = buildRssFeed({
        title: "My Blog",
        link: "https://example.com/blog",
        description: "Latest posts",
        language: "en",
        items: [],
    });
    assert.match(xml, /^<\?xml version="1\.0"/);
    assert.match(xml, /<rss version="2\.0"/);
    assert.match(xml, /xmlns:media="http:\/\/search\.yahoo\.com\/mrss\/"/);
    assert.match(xml, /<channel>/);
    assert.match(xml, /<title>My Blog<\/title>/);
});

test("buildRssFeed includes atom:link self reference", () => {
    const xml = buildRssFeed({
        title: "Blog",
        link: "https://example.com/feed.xml",
        items: [],
    });
    assert.match(xml, /<atom:link\s/);
    assert.match(xml, /rel="self"/);
    assert.match(xml, /type="application\/rss\+xml"/);
});

test("full feed with image, tags, and categories round-trips correctly", () => {
    const xml = buildRssFeed({
        title: "Country Blog",
        link: "https://country.example.com/feed.xml",
        description: "Life in the countryside",
        language: "en",
        items: [
            {
                title: "The Signal at the Kitchen Window",
                link: "https://country.example.com/posts/kitchen-window",
                description: "Jenny introduces the cottage and its unreliable connection.",
                date_published: "2026-09-01T08:00:00Z",
                image: "https://country.example.com/images/kitchen-window.jpg",
                tags: ["country-life", "technology", "attention"],
                categories: ["essays"],
            },
            {
                title: "The Quiet Hour",
                link: "https://country.example.com/posts/quiet-hour",
                description: "Jonny tries beginning the day without a screen.",
                date_published: "2026-09-02T08:00:00Z",
                image: { src: "https://country.example.com/images/quiet-hour.png" },
                tags: ["technology", "habit"],
            },
            {
                title: "Rain in the Forecast",
                link: "https://country.example.com/posts/rain-forecast",
                description: "Jenny compares weather apps with looking at the sky.",
                date_published: "2026-09-03T08:00:00Z",
            },
        ],
    });

    assert.match(xml, /<title>Country Blog<\/title>/);

    // Item 1: image as string, tags + categories
    assert.match(xml, /<title>The Signal at the Kitchen Window<\/title>/);
    assert.match(xml, /url="https:\/\/country\.example\.com\/images\/kitchen-window\.jpg"/);
    assert.match(xml, /<enclosure\s[^>]*url="https:\/\/country\.example\.com\/images\/kitchen-window\.jpg"/);
    assert.match(xml, /<media:content\s[^>]*url="https:\/\/country\.example\.com\/images\/kitchen-window\.jpg"/);
    assert.match(xml, /<media:thumbnail\s[^>]*url="https:\/\/country\.example\.com\/images\/kitchen-window\.jpg"/);
    assert.match(xml, /<category>country-life<\/category>/);
    assert.match(xml, /<category>essays<\/category>/);

    // Item 2: image as object with src, PNG mime type
    assert.match(xml, /<title>The Quiet Hour<\/title>/);
    assert.match(xml, /url="https:\/\/country\.example\.com\/images\/quiet-hour\.png"/);
    assert.match(xml, /type="image\/png"/);
    assert.match(xml, /<category>habit<\/category>/);

    // Item 3: no image, no tags — should not have image or category elements
    const item3Start = xml.indexOf("<title>Rain in the Forecast</title>");
    const item3End = xml.indexOf("</item>", item3Start);
    const item3Xml = xml.slice(item3Start, item3End);
    assert.doesNotMatch(item3Xml, /<enclosure/);
    assert.doesNotMatch(item3Xml, /<media:content/);
    assert.doesNotMatch(item3Xml, /<category>/);
});

// ---------------------------------------------------------------------------
// Fixture: write generated XML to test/fixtures for manual inspection
// ---------------------------------------------------------------------------

test("generates RSS XML fixture file for inspection", () => {
    const xml = buildRssFeed({
        title: "Microblog — RSS Feed",
        link: "https://microblog.example.com/feed.xml",
        description: "Essays on living slowly with fast technology",
        language: "en",
        items: [
            {
                title: "The Signal at the Kitchen Window",
                link: "https://microblog.example.com/posts/kitchen-window",
                description:
                    "Jenny introduces the cottage, its unreliable connection and the question of attention.",
                date_published: "2026-09-01T08:00:00Z",
                image: "https://microblog.example.com/images/kitchen-window-hero.jpg",
                tags: ["country-life", "technology", "attention"],
                categories: ["essays"],
            },
            {
                title: "The Quiet Hour",
                link: "https://microblog.example.com/posts/quiet-hour",
                description:
                    "Jonny tries beginning the day without a screen.",
                date_published: "2026-09-02T08:00:00Z",
                image: { src: "https://microblog.example.com/images/quiet-hour.png" },
                tags: ["technology", "habit"],
            },
            {
                title: "Rain in the Forecast",
                link: "https://microblog.example.com/posts/rain-forecast",
                description:
                    "Jenny compares weather apps with looking directly at the sky.",
                date_published: "2026-09-03T08:00:00Z",
                tags: ["country-life", "nature"],
            },
        ],
    });

    const fixtureDir = "test/fixtures";
    fs.mkdirSync(fixtureDir, { recursive: true });
    fs.writeFileSync(`${fixtureDir}/rss-feed-sample.xml`, xml, "utf8");

    const written = fs.readFileSync(`${fixtureDir}/rss-feed-sample.xml`, "utf8");
    assert.ok(written.includes('<?xml version="1.0"'));
    assert.ok(written.includes("<enclosure"));
    assert.ok(written.includes("<media:content"));
    assert.ok(written.includes("<media:thumbnail"));
    assert.ok(written.includes("<category>"));
});
