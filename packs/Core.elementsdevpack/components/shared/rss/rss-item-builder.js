/**
 * Builds RSS 2.0 XML from a list of collection items.
 *
 * Frontmatter keys consumed (matching the CMS markdown collection conventions):
 *
 *   title          — string, required
 *   date_published — ISO 8601 or any Date-parseable string
 *   description    — plain-text excerpt / summary
 *   image          — string URL **or** object with a `src` property
 *   tags           — array of strings (emitted as <category>)
 *   categories     — array of strings (emitted as <category>)
 *   link           — permalink to the item
 *   guid           — globally unique id (defaults to link)
 *
 * RSS extensions used:
 *   <enclosure>       — standard RSS 2.0 image enclosure
 *   <media:content>   — Media RSS for richer feed readers
 *   <media:thumbnail> — Media RSS thumbnail hint
 *   <category>        — standard RSS 2.0 (one element per tag/category)
 */

function escapeXml(str) {
    if (typeof str !== "string") return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function toRfc822(dateInput) {
    if (!dateInput) return "";
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(d.getTime())) return "";
    return d.toUTCString();
}

function resolveImageUrl(image) {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (typeof image === "object" && image.src) return image.src;
    return null;
}

function guessMimeType(url) {
    if (!url) return "image/jpeg";
    const lower = url.toLowerCase();
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".gif")) return "image/gif";
    if (lower.endsWith(".webp")) return "image/webp";
    if (lower.endsWith(".avif")) return "image/avif";
    if (lower.endsWith(".svg")) return "image/svg+xml";
    return "image/jpeg";
}

function buildRssItem(item) {
    const lines = [];
    lines.push("    <item>");

    if (item.title) {
        lines.push(`      <title>${escapeXml(item.title)}</title>`);
    }

    if (item.link) {
        lines.push(`      <link>${escapeXml(item.link)}</link>`);
    }

    if (item.description) {
        lines.push(`      <description>${escapeXml(item.description)}</description>`);
    }

    if (item.date_published) {
        const rfc = toRfc822(item.date_published);
        if (rfc) lines.push(`      <pubDate>${rfc}</pubDate>`);
    }

    const guid = item.guid || item.link;
    if (guid) {
        lines.push(`      <guid>${escapeXml(guid)}</guid>`);
    }

    const imageUrl = resolveImageUrl(item.image);
    if (imageUrl) {
        const mime = guessMimeType(imageUrl);

        lines.push(
            `      <enclosure url="${escapeXml(imageUrl)}" type="${mime}" length="0" />`
        );

        lines.push(
            `      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${mime}" />`
        );

        lines.push(
            `      <media:thumbnail url="${escapeXml(imageUrl)}" />`
        );
    }

    const cats = [];
    if (Array.isArray(item.tags)) {
        for (const tag of item.tags) {
            const label = typeof tag === "object" ? tag.title || tag.name : tag;
            if (label) cats.push(label);
        }
    }
    if (Array.isArray(item.categories)) {
        for (const cat of item.categories) {
            const label = typeof cat === "object" ? cat.title || cat.name : cat;
            if (label) cats.push(label);
        }
    }
    for (const cat of cats) {
        lines.push(`      <category>${escapeXml(cat)}</category>`);
    }

    lines.push("    </item>");
    return lines.join("\n");
}

function buildRssFeed({ title, link, description, language, items }) {
    const header = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0"',
        '  xmlns:media="http://search.yahoo.com/mrss/"',
        '  xmlns:atom="http://www.w3.org/2005/Atom">',
        "  <channel>",
        `    <title>${escapeXml(title || "")}</title>`,
        `    <link>${escapeXml(link || "")}</link>`,
        `    <description>${escapeXml(description || "")}</description>`,
    ];

    if (language) {
        header.push(`    <language>${escapeXml(language)}</language>`);
    }

    if (link) {
        header.push(
            `    <atom:link href="${escapeXml(link)}" rel="self" type="application/rss+xml" />`
        );
    }

    const itemXml = (items || []).map(buildRssItem).join("\n");

    const footer = ["  </channel>", "</rss>"];

    return [...header, itemXml, ...footer].join("\n");
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { buildRssFeed, buildRssItem, escapeXml, toRfc822, resolveImageUrl, guessMimeType };
}
