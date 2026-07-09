import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.elementsplatform.shapes/hooks.source.js";

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

function renderShapes(overrides = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            shapeType: "none",
            shapePreset: "triangle",
            shapeCircleRadius: 50,
            shapeCirclePosition: "center",
            shapeEllipseRadiusX: 50,
            shapeEllipseRadiusY: 50,
            shapeEllipsePosition: "center",
            shapeInsetTop: 10,
            shapeInsetRight: 10,
            shapeInsetBottom: 10,
            shapeInsetLeft: 10,
            shapeInsetRadius: 0,
            shapeCustom: "polygon(50% 0%,100% 100%,0% 100%)",
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

test("shape type none leaves wrapper unclipped", () => {
    const rw = renderShapes();

    assert.equal(rw.root.as, "div");
    assert.match(rw.root.class, /group\/shapes/);
    assert.doesNotMatch(rw.computedProps.classes.shape, /clip-path/);
});

test("preset shape emits a polygon clip-path with spaces converted to underscores", () => {
    const rw = renderShapes({ shapeType: "preset", shapePreset: "star" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:polygon\(50%_0%,61%_35%/);
});

test("unknown preset falls back to the triangle", () => {
    const rw = renderShapes({ shapeType: "preset", shapePreset: "does-not-exist" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:polygon\(50%_0%,0%_100%,100%_100%\)\]/);
});

test("circle shape emits radius and position", () => {
    const rw = renderShapes({ shapeType: "circle", shapeCircleRadius: 40, shapeCirclePosition: "top left" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:circle\(40%_at_top_left\)\]/);
});

test("ellipse shape emits both radii and position", () => {
    const rw = renderShapes({ shapeType: "ellipse", shapeEllipseRadiusX: 60, shapeEllipseRadiusY: 30 });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:ellipse\(60%_30%_at_center\)\]/);
});

test("inset shape emits four edges and omits round when radius is zero", () => {
    const rw = renderShapes({ shapeType: "inset" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:inset\(10%_10%_10%_10%\)\]/);
});

test("inset shape appends round when radius is set", () => {
    const rw = renderShapes({ shapeType: "inset", shapeInsetRadius: 8 });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:inset\(10%_10%_10%_10%_round_8%\)\]/);
});

test("custom shape passes the raw value through with spaces converted", () => {
    const rw = renderShapes({ shapeType: "custom", shapeCustom: "polygon(0 0, 100% 0, 50% 100%)" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:polygon\(0_0,_100%_0,_50%_100%\)\]/);
});

test("empty custom shape falls back to none", () => {
    const rw = renderShapes({ shapeType: "custom", shapeCustom: "" });

    assert.match(rw.computedProps.classes.shape, /\[clip-path:none\]/);
});
