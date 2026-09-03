import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath =
    "packs/Core.elementsdevpack/components/com.realmacsoftware.accordion/hooks.source.js";

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
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalFilters: () => "filters",
        globalTransforms: () => "transforms",
        globalBackground: () => "background",
        globalBorders: () => "borders",
        advancedClasses: () => "advanced",
        injectPrefixOnDarkModeColors: (_prefix, classes) => classes,
        globalFilter: () => ({ args: {} }),
        globalBgImageFetchPriority: () => ({
            globalBgImageFetchPriorityEnabled: false,
            globalBgImageFetchPriorityLinkElement: "",
            globalBgImageFetchPriorityLinkElementEnd: "",
        }),
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderAccordion({ props = {}, mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            showContentInEdit: true,
            openOnLoad: "false",
            globalID: "",
            accordionGroup: "none",
            accordionCustomGroupId: "",
            summaryPadding: "p-4",
            summaryBackground: "bg-white",
            summaryBackgroundClosed: "",
            showIcon: true,
            icon: null,
            iconAlignment: "",
            iconSize: "",
            iconRotation: "",
            iconColor: "",
            iconRotationClosed: "",
            iconColorClosed: "",
            globalFilterGroup: "",
            ...props,
        },
        node: { id: "acc-node-1", parent: { id: "parent-1" } },
        project: { mode },
        collections: { tags: [] },
        component: { assetPath: "" },
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

test("root exposes stable non-ARIA CSS hooks (rw-accordion + data-rw-accordion)", () => {
    const rw = renderAccordion();

    assert.match(rw.root.class, /\brw-accordion\b/);
    assert.equal(Object.prototype.hasOwnProperty.call(rw.root.args, "data-rw-accordion"), true);
    assert.equal(rw.root.args["data-rw-accordion"], "");
});

test("root does not restore removed ARIA identity attrs from #118", () => {
    const rw = renderAccordion();

    assert.equal(rw.root.args.role, undefined);
    assert.equal(rw.root.args["aria-roledescription"], undefined);
    assert.equal(rw.root.args["aria-label"], undefined);
});

test("keyboard a11y focus ring classes from #118 remain on summary", () => {
    const rw = renderAccordion();

    assert.match(rw.computedProps.classes.summary, /focus-visible:outline-none/);
    assert.match(rw.computedProps.classes.summary, /focus-visible:ring-2/);
    assert.match(rw.computedProps.classes.summary, /focus-visible:ring-brand-500/);
});
