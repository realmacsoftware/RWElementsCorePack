import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.elementsplatform.shapes/hooks.source.js";
const editorCssPath = "packs/Core.elementsdevpack/components/com.elementsplatform.shapes/templates/editor-ui.css";

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
            shapeMargin: "[shape-margin:4]",
            shapeImageThreshold: 50,
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
const svg = {
    format: "svg",
    image: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>',
    alt: "A circle",
};

test("auto svg renders as an img with a shared shape-outside url", () => {
    const rw = renderShapes({ media: svg, shapeImageThreshold: 50 });

    assert.match(rw.computedProps.svgImageUrl, /^data:image\/svg\+xml;charset=utf-8,/);
    assert.match(rw.computedProps.mediaStyle, /shape-outside: url\('data:image\/svg\+xml;charset=utf-8,/);
    assert.match(rw.computedProps.mediaStyle, /shape-image-threshold: 0\.5;/);
});

test("auto svg with a resource path uses the path for img src and shape-outside", () => {
    const rw = renderShapes({
        media: { format: "svg", image: "/rwResource/foo.svg", alt: "Logo" },
    });

    assert.equal(rw.computedProps.svgImageUrl, "/rwResource/foo.svg");
    assert.match(rw.computedProps.mediaStyle, /shape-outside: url\('\/rwResource\/foo\.svg'\)/);
});

test("raster image keeps a url src and no inline svg markup", () => {
    const rw = renderShapes({ media: image });

    assert.equal(rw.computedProps.isRasterImage, true);
    assert.equal(rw.computedProps.isSvg, false);
    assert.equal(rw.computedProps.mediaSrc, "https://example.com/cutout.png");
    assert.equal(rw.computedProps.svgImageUrl, "");
});

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

test("editor-ui.css forces the slate editor back to a block box", () => {
    const css = fs.readFileSync(editorCssPath, "utf8");

    assert.match(css, /@if \(edit\)/);
    assert.match(css, /\[data-slate-editor="true"\]/);
    assert.match(css, /display:\s*block\s*!important/);
});

test("shape classes do not include slate editor overrides", () => {
    const rw = renderShapes({}, "edit");

    assert.doesNotMatch(rw.computedProps.classes.shape, /data-slate-editor/);
});

test("auto shape emits an inline shape-outside url style with threshold", () => {
    const rw = renderShapes({ media: image, shapeImageThreshold: 75 });

    assert.equal(
        rw.computedProps.mediaStyle,
        "shape-outside: url('https://example.com/cutout.png'); shape-image-threshold: 0.75; shape-margin: 1rem;"
    );
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
    assert.equal(rw.computedProps.isImage, true);
});

test("float and width classes pass through to the media, margin goes inline", () => {
    const rw = renderShapes({
        media: image,
        mediaFloat: "float-none md:float-right",
        mediaWidth: "w-[50%]",
        shapeMargin: "[shape-margin:6]",
    });

    assert.match(rw.computedProps.classes.media, /float-none md:float-right/);
    assert.match(rw.computedProps.classes.media, /w-\[50%\]/);
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-margin/);
    assert.match(rw.computedProps.mediaStyle, /shape-margin: 1\.5rem;/);
});

test("shape margin accepts custom css lengths from theme spacing", () => {
    const rw = renderShapes({
        media: image,
        shapeMargin: "[shape-margin:24px]",
    });

    assert.match(rw.computedProps.mediaStyle, /shape-margin: 24px;/);
});

test("auto shape degrades to a plain rectangle for video", () => {
    const rw = renderShapes({ media: { format: "mp4", path: "https://example.com/v.mp4" } });

    assert.equal(rw.computedProps.isMP4, true);
    assert.equal(rw.computedProps.mediaSrc, "https://example.com/v.mp4");
    assert.equal(rw.computedProps.mediaStyle, "");
    assert.doesNotMatch(rw.computedProps.classes.media, /shape-outside/);
});

test("youtube and vimeo resources render as embeds without shape styles", () => {
    const rw = renderShapes({
        media: { format: "youtube", videoId: "abc123" },
    });

    assert.equal(rw.computedProps.isEmbed, true);
    assert.equal(rw.computedProps.embedUrl, "https://www.youtube.com/embed/abc123");
    assert.match(rw.computedProps.classes.embedFrame, /aspect-video/);
    assert.equal(rw.computedProps.mediaStyle, "");
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
