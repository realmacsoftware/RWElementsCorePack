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

function renderShapes(overrides = {}, mode = "preview") {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            media: null,
            mediaAlt: "",
            mediaFloat: "float-left",
            mediaWidth: "w-[40%]",
            shapeMargin: "[shape-margin:16px]",
            shapeSource: "auto",
            shapeImageThreshold: 50,
            clipMedia: true,
            shapePreset: "triangle",
            shapeCircleRadius: 50,
            shapeCirclePosition: "center",
            shapeEllipseRadiusX: 50,
            shapeEllipseRadiusY: 50,
            shapeEllipsePosition: "center",
            shapeCustom: "polygon(50% 0%,100% 100%,0% 100%)",
            ...overrides,
        },
        node: { id: "node-1" },
        project: { mode },
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

const image = { format: "png", image: "https://example.com/cutout.png", alt: "A cutout" };

test("root element accepts dropped resources and keeps group classes", () => {
    const rw = renderShapes();

    assert.equal(rw.root.as, "div");
    assert.match(rw.root.class, /group\/shapes/);
    assert.equal(rw.root.args.rwResourceDropZone, "media");
    assert.equal(rw.computedProps.hasMedia, false);
});

test("shape wrapper contains the float with flow-root", () => {
    const rw = renderShapes();

    assert.match(rw.computedProps.classes.shape, /flow-root/);
});

test("auto shape emits an inline shape-outside url style with threshold", () => {
    const rw = renderShapes({ media: image, shapeImageThreshold: 75 });

    assert.equal(
        rw.computedProps.mediaStyle,
        "shape-outside: url('https://example.com/cutout.png'); shape-image-threshold: 0.75;"
    );
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
    assert.equal(rw.computedProps.isImage, true);
});

test("float, width and margin classes pass through to the media", () => {
    const rw = renderShapes({
        media: image,
        mediaFloat: "float-none md:float-right",
        mediaWidth: "w-[50%]",
        shapeMargin: "[shape-margin:24px]",
    });

    assert.match(rw.computedProps.classes.media, /float-none md:float-right/);
    assert.match(rw.computedProps.classes.media, /w-\[50%\]/);
    assert.match(rw.computedProps.classes.media, /\[shape-margin:24px\]/);
});

test("auto shape degrades to a plain rectangle for video", () => {
    const rw = renderShapes({ media: { format: "mp4", path: "https://example.com/v.mp4" } });

    assert.equal(rw.computedProps.isMP4, true);
    assert.equal(rw.computedProps.mediaSrc, "https://example.com/v.mp4");
    assert.equal(rw.computedProps.mediaStyle, "");
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
});

test("youtube and vimeo resources render as embeds with the shape on the frame", () => {
    const rw = renderShapes({
        media: { format: "youtube", videoId: "abc123" },
        shapeSource: "circle",
        shapeCircleRadius: 40,
    });

    assert.equal(rw.computedProps.isEmbed, true);
    assert.equal(rw.computedProps.embedUrl, "https://www.youtube.com/embed/abc123");
    assert.match(rw.computedProps.classes.embedFrame, /aspect-video/);
    assert.match(rw.computedProps.classes.embedFrame, /\[shape-outside:circle\(40%_at_center\)\]/);
});

test("circle shape emits matching shape-outside and clip-path classes", () => {
    const rw = renderShapes({
        media: image,
        shapeSource: "circle",
        shapeCircleRadius: 40,
        shapeCirclePosition: "top left",
    });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:circle\(40%_at_top_left\)\]/);
    assert.match(rw.computedProps.classes.media, /\[clip-path:circle\(40%_at_top_left\)\]/);
});

test("clip toggle off keeps shape-outside but drops clip-path", () => {
    const rw = renderShapes({ media: image, shapeSource: "circle", clipMedia: false });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:circle\(50%_at_center\)\]/);
    assert.doesNotMatch(rw.computedProps.classes.media, /clip-path/);
});

test("ellipse shape emits both radii and position", () => {
    const rw = renderShapes({
        media: image,
        shapeSource: "ellipse",
        shapeEllipseRadiusX: 60,
        shapeEllipseRadiusY: 30,
    });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:ellipse\(60%_30%_at_center\)\]/);
});

test("preset shape emits a polygon with spaces converted to underscores", () => {
    const rw = renderShapes({ media: image, shapeSource: "preset", shapePreset: "star" });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:polygon\(50%_0%,61%_35%/);
});

test("unknown preset falls back to the triangle", () => {
    const rw = renderShapes({ media: image, shapeSource: "preset", shapePreset: "does-not-exist" });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:polygon\(50%_0%,0%_100%,100%_100%\)\]/);
});

test("custom shape passes the raw value through with spaces converted", () => {
    const rw = renderShapes({
        media: image,
        shapeSource: "custom",
        shapeCustom: "polygon(0 0, 100% 0, 50% 100%)",
    });

    assert.match(rw.computedProps.classes.media, /\[shape-outside:polygon\(0_0,_100%_0,_50%_100%\)\]/);
});

test("empty custom shape emits no shape classes", () => {
    const rw = renderShapes({ media: image, shapeSource: "custom", shapeCustom: "" });

    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
    assert.doesNotMatch(rw.computedProps.classes.media, /clip-path/);
});

test("shape source none wraps as a plain rectangle", () => {
    const rw = renderShapes({ media: image, shapeSource: "none" });

    assert.equal(rw.computedProps.mediaStyle, "");
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
});

test("resource alt wins over the alt text property", () => {
    const withResourceAlt = renderShapes({ media: image, mediaAlt: "fallback" });
    assert.equal(withResourceAlt.computedProps.mediaAlt, "A cutout");

    const withoutResourceAlt = renderShapes({ media: { format: "png", image: "x.png" }, mediaAlt: "fallback" });
    assert.equal(withoutResourceAlt.computedProps.mediaAlt, "fallback");
});

test("edit flag reflects the project mode", () => {
    assert.equal(renderShapes({}, "edit").computedProps.edit, true);
    assert.equal(renderShapes({}, "preview").computedProps.edit, false);
});
