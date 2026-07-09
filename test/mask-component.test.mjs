import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.elementsplatform.mask/hooks.source.js";

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
        classnames,
        globalLayout: () => "layout",
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalTransitions: () => "transitions",
        advancedClasses: () => "advanced",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderMask(overrides = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            maskType: "none",
            maskResource: null,
            maskMode: "mask-alpha",
            maskSize: "mask-contain",
            maskCustomSize: "100%_100%",
            maskPosition: "mask-center",
            maskRepeat: "mask-no-repeat",
            maskEdgeSide: "b",
            maskEdgeFrom: 75,
            maskEdgeTo: 100,
            maskLinearAngle: 45,
            maskLinearFrom: 10,
            maskLinearTo: 90,
            maskRadialSize: "mask-radial-[100%_100%]",
            maskRadialPosition: "mask-radial-at-center",
            maskRadialFrom: 70,
            maskRadialTo: 100,
            ...overrides,
        },
        node: { id: "node-1" },
        setRootElement(root) {
            this.root = root;
        },
        setProps(props) {
            this.computedProps = props;
        },
        addAnchor(id) {
            this.anchor = id;
        },
    };

    transformHook(rw);
    return rw;
}

test("mask type none leaves wrapper unmasked", () => {
    const rw = renderMask();

    assert.equal(rw.root.as, "div");
    assert.match(rw.root.class, /group\/mask/);
    assert.match(rw.computedProps.classes.mask, /mask-none/);
    assert.doesNotMatch(rw.computedProps.classes.mask, /mask-b-from/);
});

test("svg mask inlines the encoded image data and emits mode, size, position, and repeat utilities", () => {
    const rw = renderMask({
        maskType: "svg",
        maskResource: { image: "<svg viewBox=\"0 0 1 1\"><path d=\"M0 0h1v1H0z\"/></svg>" },
    });

    assert.match(rw.computedProps.classes.mask, /mask-alpha/);
    assert.match(rw.computedProps.classes.mask, /mask-\[url\('data:image\/svg\+xml,/);
    assert.match(rw.computedProps.classes.mask, /%3Csvg/);
    assert.match(rw.computedProps.classes.mask, /mask-contain/);
    assert.match(rw.computedProps.classes.mask, /mask-center/);
    assert.match(rw.computedProps.classes.mask, /mask-no-repeat/);
});

test("edge mask emits side from and to utilities", () => {
    const rw = renderMask({ maskType: "edge", maskEdgeSide: "b", maskEdgeFrom: 75, maskEdgeTo: 100 });

    assert.match(rw.computedProps.classes.mask, /mask-b-from-\[75%\]/);
    assert.match(rw.computedProps.classes.mask, /mask-b-to-\[100%\]/);
    assert.doesNotMatch(rw.computedProps.classes.mask, /,/);
});

test("linear mask emits angle from and to utilities", () => {
    const rw = renderMask({ maskType: "linear", maskLinearAngle: 45, maskLinearFrom: 10, maskLinearTo: 90 });

    assert.match(rw.computedProps.classes.mask, /mask-linear-\[45deg\]/);
    assert.match(rw.computedProps.classes.mask, /mask-linear-from-\[10%\]/);
    assert.match(rw.computedProps.classes.mask, /mask-linear-to-\[90%\]/);
});

test("radial mask emits size position from and to utilities", () => {
    const rw = renderMask({ maskType: "radial", maskRadialFrom: 70, maskRadialTo: 100 });

    assert.match(rw.computedProps.classes.mask, /mask-radial-\[100%_100%\]/);
    assert.match(rw.computedProps.classes.mask, /mask-radial-at-center/);
    assert.match(rw.computedProps.classes.mask, /mask-radial-from-\[70%\]/);
    assert.match(rw.computedProps.classes.mask, /mask-radial-to-\[100%\]/);
});
