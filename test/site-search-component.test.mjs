import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const componentDir =
    "packs/Core.elementsdevpack/components/com.realmacsoftware.siteSearch";
const hookPath = `${componentDir}/hooks.source.js`;

function classnames(initialClasses = "") {
    const initialClassArray = Array.isArray(initialClasses)
        ? initialClasses
        : initialClasses.split(" ").filter(Boolean);
    const classes = new Set(initialClassArray.filter(Boolean));

    return {
        add(className) {
            (Array.isArray(className) ? className : [className]).forEach((cls) => {
                if (cls) classes.add(cls);
            });
            return this;
        },
        toString() {
            return Array.from(classes).join(" ");
        },
    };
}

function loadTransformHook() {
    const source = fs.readFileSync(hookPath, "utf8");
    const sandbox = {
        exports: {},
        JSON,
        Array,
        Math,
        Boolean,
        parseInt,
        console: { log() {} },
        classnames,
        globalLayout: () => "layout",
        globalSizing: () => "sizing",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalFilters: () => "filters",
        globalTransforms: () => "transforms",
        globalBackground: () => "background",
        globalBorders: () => "borders",
        globalInputFontAndTextStyles: () => "input-font",
        globalOutline: () => "outline",
        advancedClasses: () => "advanced",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function makePage(title, options = {}) {
    return {
        title,
        url: `/${title.toLowerCase().replace(/\s+/g, "-")}/`,
        displayInMenu: true,
        isDraft: false,
        isActive: false,
        isFolder: false,
        openInNewWindow: false,
        pages: null,
        ...options,
    };
}

function renderSiteSearch({ pages = [], mode = "preview", props = {} } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            placeholder: "Search...",
            emptyText: "No results found",
            ...props,
        },
        node: { id: "node-1" },
        project: { mode, title: "Site", siteUrl: "/" },
        component: { assetPath: "/assets" },
        pages,
        setRootElement(root) {
            this.root = root;
        },
        setProps(computed) {
            this.computedProps = computed;
        },
        addAnchor(id) {
            this.anchor = id;
        },
    };

    transformHook(rw);
    return rw;
}

function parseIndex(rw) {
    return JSON.parse(rw.computedProps.searchIndexJson);
}

test("nested tree flattens to an index; folders recursed but not emitted", () => {
    const rw = renderSiteSearch({
        pages: [
            makePage("Home"),
            makePage("Folder A", {
                isFolder: true,
                pages: [
                    makePage("Page A1"),
                    makePage("Folder A2", {
                        isFolder: true,
                        pages: [makePage("Page A2a")],
                    }),
                ],
            }),
        ],
    });
    const index = parseIndex(rw);
    const titles = index.map((entry) => entry.title);

    assert.deepEqual(titles, ["Home", "Page A1", "Page A2a"]);
    assert.equal(index[0].url, "/home/");
});

test("draft pages are pruned with their entire subtree", () => {
    const rw = renderSiteSearch({
        pages: [
            makePage("Home"),
            makePage("Draft Section", {
                isDraft: true,
                pages: [makePage("Published Child")],
            }),
            makePage("Draft Folder", {
                isDraft: true,
                isFolder: true,
                pages: [makePage("Folder Child")],
            }),
        ],
    });
    const titles = parseIndex(rw).map((entry) => entry.title);

    assert.deepEqual(titles, ["Home"]);
});

test("pages hidden from the menu are indexed with menu: false", () => {
    const rw = renderSiteSearch({
        pages: [
            makePage("Visible"),
            makePage("Hidden", { displayInMenu: false }),
        ],
    });
    const index = parseIndex(rw);

    assert.equal(index.length, 2);
    assert.equal(index[0].menu, true);
    assert.equal(index[1].menu, false);
});

test("openInNewWindow round-trips as newWindow", () => {
    const rw = renderSiteSearch({
        pages: [makePage("External", { openInNewWindow: true })],
    });

    assert.equal(parseIndex(rw)[0].newWindow, true);
});

test("index JSON contains no raw < characters and round-trips hostile titles", () => {
    const hostile = "</script><script>alert(1)</script>";
    const rw = renderSiteSearch({ pages: [makePage("Safe", { title: hostile })] });
    const json = rw.computedProps.searchIndexJson;

    assert.ok(!json.includes("<"));
    assert.equal(JSON.parse(json)[0].title, hostile);
});

test("index is identical regardless of includeHiddenPages (includeOnce safety)", () => {
    const pages = [
        makePage("Visible"),
        makePage("Hidden", { displayInMenu: false }),
    ];
    const withHidden = renderSiteSearch({
        pages,
        props: { includeHiddenPages: true },
    });
    const withoutHidden = renderSiteSearch({
        pages,
        props: { includeHiddenPages: false },
    });

    assert.equal(
        withHidden.computedProps.searchIndexJson,
        withoutHidden.computedProps.searchIndexJson
    );
});

test("minChars and maxResults coerce strings and fall back to defaults", () => {
    const coerced = renderSiteSearch({
        props: { minChars: "3", maxResults: "25" },
    });
    assert.equal(coerced.root.args["x-data"], "siteSearch(3, 25, false)");

    const defaults = renderSiteSearch({});
    assert.equal(defaults.root.args["x-data"], "siteSearch(2, 10, false)");

    const hidden = renderSiteSearch({ props: { includeHiddenPages: "true" } });
    assert.equal(hidden.root.args["x-data"], "siteSearch(2, 10, true)");
});

test("edit mode: no x-data, edit prop set, panel positions relatively", () => {
    const rw = renderSiteSearch({ mode: "edit" });

    assert.equal(rw.root.args["x-data"], undefined);
    assert.equal(rw.computedProps.edit, true);
    assert.ok(rw.computedProps.classes.panel.includes("relative"));
    assert.ok(!rw.computedProps.classes.panel.includes("absolute"));
});

test("live mode: x-data present, panel positions absolutely", () => {
    const rw = renderSiteSearch({ mode: "preview" });

    assert.ok(rw.root.args["x-data"].startsWith("siteSearch("));
    assert.equal(rw.computedProps.edit, false);
    assert.ok(rw.computedProps.classes.panel.includes("absolute"));
});

test("resultsDivider switch applies divide-y", () => {
    const on = renderSiteSearch({ props: { resultsDivider: true } });
    const off = renderSiteSearch({ props: { resultsDivider: false } });

    assert.ok(on.computedProps.classes.panel.includes("divide-y"));
    assert.ok(!off.computedProps.classes.panel.includes("divide-y"));
});

test("template guards: no backslashes, no @raw, no literal braces outside insertions", () => {
    const templates = [
        `${componentDir}/templates/index.html`,
        `${componentDir}/templates/search-index.html`,
        `${componentDir}/templates/site-search-js.html`,
    ];
    for (const file of templates) {
        const content = fs.readFileSync(file, "utf8");
        assert.ok(!content.includes("\\"), `${file} contains a backslash`);
        assert.ok(!content.includes("@raw"), `${file} contains @raw`);
        // Every {{ must open a simple property insertion, e.g. {{classes.input}}
        const braces = content.match(/\{\{[^}]*\}\}/g) || [];
        const opens = content.match(/\{\{/g) || [];
        assert.equal(
            braces.length,
            opens.length,
            `${file} has an unmatched {{`
        );
        for (const insertion of braces) {
            assert.match(
                insertion,
                /^\{\{[a-zA-Z][a-zA-Z0-9_.]*\}\}$/,
                `${file}: unexpected insertion ${insertion}`
            );
        }
    }
});

test("frontend asset escapes HTML before token replacement", () => {
    const asset = fs.readFileSync(
        `${componentDir}/assets/page/site-search.js`,
        "utf8"
    );

    assert.ok(asset.includes("function escapeHtml"));
    assert.ok(asset.includes("escapeHtml(item.title)"));
    assert.ok(asset.includes("escapeHtml(item.url)"));
});
