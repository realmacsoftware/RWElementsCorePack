import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const componentPath = "packs/Core.elementsdevpack/components/com.realmacsoftware.accordion";
const hookPath = `${componentPath}/hooks.source.js`;

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
        classnames,
        globalFilter: () => ({ args: {} }),
        globalBgImageFetchPriority: () => ({
            globalBgImageFetchPriorityEnabled: false,
            globalBgImageFetchPriorityLinkElement: "",
            globalBgImageFetchPriorityLinkElementEnd: "",
        }),
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
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderAccordion(id) {
    const transformHook = loadTransformHook();
    const closedRotationClass = "data-[open=false]:[&>svg]:rotate-[20deg]";
    const rw = {
        props: {
            showContentInEdit: true,
            openOnLoad: "false",
            globalID: "",
            accordionGroup: "parent",
            accordionCustomGroupId: "",
            summaryPadding: "",
            summaryBackground: "",
            summaryBackgroundClosed: "",
            showIcon: true,
            icon: { format: "svg" },
            iconAlignment: "order-last",
            iconSize: "[&>svg]:size-[24px]",
            iconRotation: "[&>svg]:rotate-[-45deg]",
            iconColor: "",
            iconRotationClosed: closedRotationClass,
            iconColorClosed: "",
            globalFilterGroup: "",
        },
        node: { id, parent: { id: "parent" } },
        collections: { tags: [] },
        project: { mode: "preview" },
        setRootElement(root) {
            this.root = root;
        },
        setProps(computed) {
            this.computedProps = computed;
        },
        addAnchor() {},
    };

    transformHook(rw);
    return { rw, closedRotationClass };
}

test("closed rotation is emitted as a concrete local data-state class", () => {
    const config = JSON.parse(fs.readFileSync(`${componentPath}/properties.config.json`, "utf8"));
    const iconGroup = config.groups.find((group) => group.title === "Icon");
    const closedRotation = iconGroup.properties.find((property) => property.id === "iconRotationClosed");

    assert.equal(closedRotation.format, "data-[open=false]:[&>svg]:rotate-[{{value}}deg]");
});

test("transform hook preserves the concrete closed rotation class", () => {
    const { rw, closedRotationClass } = renderAccordion("accordion-one");
    const iconClasses = rw.computedProps.classes.icon.split(" ");

    assert.ok(iconClasses.includes(closedRotationClass));
    assert.ok(!rw.computedProps.classes.icon.includes("group-data-[open=false]"));
});

test("icon state is bound locally so nested accordions do not share rotation state", () => {
    const template = fs.readFileSync(`${componentPath}/templates/index.html`, "utf8");
    const first = renderAccordion("outer").rw.computedProps.classes.icon;
    const second = renderAccordion("inner").rw.computedProps.classes.icon;

    assert.match(template, /<span :data-open="open\.toString\(\)" class="\{\{classes\.icon\}\}"/);
    assert.equal(first, second);
    assert.ok(!first.includes("outer"));
    assert.ok(!second.includes("inner"));
});
