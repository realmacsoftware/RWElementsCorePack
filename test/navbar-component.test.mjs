import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.realmacsoftware.navbar/hooks.source.js";

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
        console: { log() {} },
        classnames,
        globalLayout: () => "layout",
        globalSizingContainer: () => "sizing-container",
        globalSpacingMargin: () => "spacing-margin",
        globalSpacingPadding: () => "spacing-padding",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalFilters: () => "filters",
        globalTransforms: () => "transforms",
        globalBackground: () => "background",
        globalBorders: () => "borders",
        globalNavItems: () => "nav-items",
        globalNavTitle: () => "nav-title",
        globalHTMLTag: () => "header",
        advancedClasses: () => "advanced",
        getAlpineTransitionAttributesMobile: () => "",
        getAlpineTransitionAttributesDesktop: () => "",
        globalBgImageFetchPriority: () => ({
            globalBgImageFetchPriorityEnabled: false,
            globalBgImageFetchPriorityLinkElement: "",
            globalBgImageFetchPriorityLinkElementEnd: "",
        }),
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

function renderNavbar({ pages = [], mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            logoLink: { href: "", title: "", target: "" },
        },
        node: { id: "node-1" },
        project: { mode, title: "Site", siteUrl: "/", logo: { url: "" } },
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

test("folder and intermediate folder are flagged when a grandchild is active", () => {
    const rw = renderNavbar({
        pages: [
            makePage("Home"),
            makePage("Folder A", {
                isFolder: true,
                pages: [
                    makePage("Page A1"),
                    makePage("Folder A2", {
                        isFolder: true,
                        pages: [makePage("Page A2a", { isActive: true })],
                    }),
                ],
            }),
        ],
    });
    const [home, folderA] = rw.computedProps.pages;
    const [pageA1, folderA2] = folderA.pages;
    const [pageA2a] = folderA2.pages;

    assert.equal(home.hasActiveChild, false);
    assert.equal(folderA.hasActiveChild, true);
    assert.equal(pageA1.hasActiveChild, false);
    assert.equal(folderA2.hasActiveChild, true);
    assert.equal(pageA2a.hasActiveChild, false);
    assert.equal(pageA2a.isActive, true);
});

test("an active page hidden from the menu still flags its parent folder", () => {
    const rw = renderNavbar({
        pages: [
            makePage("Folder A", {
                isFolder: true,
                pages: [
                    makePage("Page A1"),
                    makePage("Hidden Detail", {
                        displayInMenu: false,
                        isActive: true,
                    }),
                ],
            }),
        ],
    });
    const [folderA] = rw.computedProps.pages;

    assert.equal(folderA.hasActiveChild, true);
    assert.equal(folderA.pages.length, 1);
    assert.equal(folderA.pages[0].title, "Page A1");
});

test("no page flagged when nothing is active", () => {
    const rw = renderNavbar({
        pages: [
            makePage("Home"),
            makePage("Folder A", {
                isFolder: true,
                pages: [makePage("Page A1"), makePage("Page A2")],
            }),
        ],
    });
    const flags = [];
    const collect = (pages) =>
        pages.forEach((page) => {
            flags.push(page.hasActiveChild);
            if (page.pages) collect(page.pages);
        });
    collect(rw.computedProps.pages);

    assert.equal(flags.length, 4);
    assert.ok(flags.every((flag) => flag === false));
});

test("the active page itself is not flagged as having an active child", () => {
    const rw = renderNavbar({
        pages: [
            makePage("Folder A", {
                isFolder: true,
                isActive: true,
                pages: [makePage("Page A1")],
            }),
        ],
    });
    const [folderA] = rw.computedProps.pages;

    assert.equal(folderA.isActive, true);
    assert.equal(folderA.hasActiveChild, false);
});

test("existing filtering and hasPages behaviour is unchanged", () => {
    const rw = renderNavbar({
        pages: [
            makePage("Home"),
            makePage("Draft Page", { isDraft: true }),
            makePage("Hidden Page", { displayInMenu: false }),
            makePage("Folder A", {
                isFolder: true,
                pages: [makePage("Draft Child", { isDraft: true })],
            }),
        ],
    });
    const pages = rw.computedProps.pages;

    assert.deepEqual(
        pages.map((page) => page.title),
        ["Home", "Folder A"]
    );
    assert.equal(pages[0].hasPages, false);
    assert.equal(pages[1].hasPages, false);
    assert.equal(pages[1].pages.length, 0);
});
