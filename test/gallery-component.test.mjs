import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const componentDir = "packs/Core.elementsdevpack/components/com.realmacsoftware.gallery";
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
        String,
        classnames,
        advancedClasses: () => "advanced",
        globalHTMLTag: (rw, fallback) => fallback,
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderGallery(overrides = {}, mode = "preview") {
    const transformHook = loadTransformHook();
    const resizeCalls = [];
    const rw = {
        props: {
            globalID: "",
            sourceType: "resource",
            resources: null,
            remoteFolderURL: "",
            thumbnailShowCaption: false,
            thumbnailShowAuthor: false,
            lightboxShowCaption: false,
            lightboxShowAuthor: false,
            lightboxPreview: false,
            ...overrides,
        },
        theme: {
            breakpoints: { screens: {} },
        },
        node: { id: "node-1", backendPath: "backend/rwNODE" },
        component: { sharedAssetPath: "/shared-assets" },
        project: { mode },
        resizeResource(resource, width) {
            resizeCalls.push({ resource, width });
            return `${resource.image}?w=${width}`;
        },
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
    rw.resizeCalls = resizeCalls;
    return rw;
}

const photo = { image: "https://example.com/photo.jpg", caption: "A photo" };
const clip = { image: "https://example.com/clip.jpg", format: "youtube", name: "A clip" };

test("resource mode processes resources and keeps the plain x-data", () => {
    const rw = renderGallery({
        resources: { name: "Holiday", resources: [{ ...photo }, { ...clip }] },
    });

    assert.equal(rw.computedProps.hasResources, true);
    assert.equal(rw.computedProps.isRemote, false);
    assert.equal(rw.computedProps.remotePublished, false);
    assert.equal(rw.computedProps.resources.length, 2);

    const [image, video] = rw.computedProps.resources;
    assert.equal(image.thumbnail, "https://example.com/photo.jpg?w=400");
    assert.equal(image.alt, "A photo");
    assert.equal(image.isVideo, false);
    assert.equal(video.isVideo, true);
    assert.equal(video.isYouTube, true);
    assert.equal(video.caption, "A clip");
    assert.equal(video.author, "Holiday");

    assert.equal(rw.resizeCalls.length, 2);
    assert.equal(rw.root.args["x-data"], "gallery('node-1')");
});

test("resource mode with no resources shows the dropzone state", () => {
    const rw = renderGallery();

    assert.equal(rw.computedProps.hasResources, false);
    assert.equal(rw.computedProps.isRemote, false);
});

test("remote mode in edit renders placeholders without fetch config", () => {
    const rw = renderGallery(
        { sourceType: "remote", remoteFolderURL: "https://example.com/photos" },
        "edit"
    );

    assert.equal(rw.computedProps.isRemote, true);
    assert.equal(rw.computedProps.remotePublished, false);
    assert.equal(rw.computedProps.hasResources, true);
    assert.equal(rw.computedProps.resources.length, 6);
    assert.equal(
        rw.computedProps.resources[0].image,
        "/shared-assets/images/image-square.png"
    );
    assert.equal(rw.resizeCalls.length, 0);
    assert.equal(rw.root.args["x-data"], "gallery('node-1')");
});

test("remote mode in edit without a folder shows the instructional state", () => {
    const rw = renderGallery({ sourceType: "remote", remoteFolderURL: "" }, "edit");

    assert.equal(rw.computedProps.isRemote, true);
    assert.equal(rw.computedProps.hasResources, false);
    assert.equal(rw.computedProps.resources.length, 0);
});

test("remote mode published passes the backend endpoint to Alpine", () => {
    const rw = renderGallery({
        sourceType: "remote",
        remoteFolderURL: " https://example.com/photos/ ",
    });

    assert.equal(rw.computedProps.remotePublished, true);
    assert.equal(rw.computedProps.hasResources, true);
    assert.equal(rw.computedProps.resources.length, 0);
    assert.equal(rw.computedProps.remoteFolder, "https://example.com/photos");
    assert.equal(
        rw.root.args["x-data"],
        "gallery('node-1', {'endpoint':'backend/rwNODE/gallery.php'})"
    );
});

test("remote folder value is sanitised for PHP and x-data embedding", () => {
    const rw = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "/pho'to\\s/",
    });

    assert.equal(rw.computedProps.remoteFolder, "/photos");
});

test("compiled files mirror the source changes", () => {
    const markers = ["sourceType", "remoteFolderURL", "remotePublished"];

    const hooksSource = fs.readFileSync(hookPath, "utf8");
    const hooksCompiled = fs.readFileSync(`${componentDir}/hooks.js`, "utf8");
    const propsConfig = fs.readFileSync(
        `${componentDir}/properties.config.json`,
        "utf8"
    );
    const propsCompiled = fs.readFileSync(`${componentDir}/properties.json`, "utf8");

    for (const marker of markers) {
        assert.ok(hooksSource.includes(marker), `hooks.source.js missing ${marker}`);
        assert.ok(hooksCompiled.includes(marker), `hooks.js missing ${marker}`);
    }
    for (const marker of ["sourceType", "remoteFolderURL"]) {
        assert.ok(
            propsConfig.includes(marker),
            `properties.config.json missing ${marker}`
        );
        assert.ok(
            propsCompiled.includes(marker),
            `properties.json missing ${marker}`
        );
    }
});
