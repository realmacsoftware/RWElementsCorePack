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

function renderGallery(overrides = {}, mode = "preview", nodeId = "node-1", options = {}) {
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
        node: { id: nodeId },
        page: { docRootPath: options.docRootPath ?? "" },
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

test("remote mode published defers the grid to the PHP templates", () => {
    const rw = renderGallery({
        sourceType: "remote",
        remoteFolderURL: " https://example.com/photos/ ",
    });

    assert.equal(rw.computedProps.remotePublished, true);
    assert.equal(rw.computedProps.hasResources, true);
    assert.equal(rw.computedProps.resources.length, 0);
    assert.equal(rw.computedProps.remoteFolder, "https://example.com/photos");
    // No client-side fetch config — the PHP templates render the images
    assert.equal(rw.root.args["x-data"], "gallery('node-1')");
});

test("phpId is safe to use as a PHP variable suffix", () => {
    const plain = renderGallery(
        { sourceType: "remote", remoteFolderURL: "/photos" },
        "preview"
    );
    assert.equal(plain.computedProps.phpId, "node_1");

    // Real node ids carry punctuation that can't appear in a PHP variable name
    const punctuated = renderGallery(
        { sourceType: "remote", remoteFolderURL: "/photos" },
        "preview",
        "29BB9A86-0D4A-4E46.9BF5"
    );
    assert.equal(punctuated.computedProps.phpId, "29BB9A86_0D4A_4E46_9BF5");
    assert.match(punctuated.computedProps.phpId, /^[a-zA-Z0-9_]+$/);
});

test("remote folder value is sanitised for embedding in PHP", () => {
    const rw = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "/pho'to\\s/",
    });

    assert.equal(rw.computedProps.remoteFolder, "/photos");
});

test("relative folder paths are passed through unchanged", () => {
    // Relative to the page — must not gain a leading slash
    const relative = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "resources/Instagram",
    });
    assert.equal(relative.computedProps.remoteFolder, "resources/Instagram");

    // Relative to the site root — the leading slash is meaningful
    const fromRoot = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "/resources/Instagram/",
    });
    assert.equal(fromRoot.computedProps.remoteFolder, "/resources/Instagram");

    // Folder names containing spaces survive
    const spaced = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "  /resources/Holiday Photos  ",
    });
    assert.equal(spaced.computedProps.remoteFolder, "/resources/Holiday Photos");
});

test("the page's path back to the site root reaches the templates", () => {
    const nested = renderGallery(
        { sourceType: "remote", remoteFolderURL: "/resources/Instagram" },
        "preview",
        "node-1",
        { docRootPath: "../../" }
    );
    assert.equal(nested.computedProps.pageDocRoot, "../../");

    const root = renderGallery({
        sourceType: "remote",
        remoteFolderURL: "/resources/Instagram",
    });
    assert.equal(root.computedProps.pageDocRoot, "");
});

// Reads the thumbnail-matching rule out of remote-scan.php and exercises it
// here, so weakening the pattern fails the suite. PCRE and JS agree on this
// syntax, so the pattern under test is the one that actually ships.
function thumbnailRuleFromTemplate() {
    const php = fs.readFileSync(
        `${componentDir}/templates/include/remote-scan.php`,
        "utf8"
    );
    const marker = php.match(/\$rwGalleryMarker_\{\{phpId\}\} = '\/(.+?)\/i';/);
    assert.ok(marker, "could not find the thumbnail marker pattern");
    const markerRe = new RegExp(marker[1], "i");

    const doubleExt = php.match(/preg_replace\('\/\\\.\((.+?)\)\$\/i'/);
    assert.ok(doubleExt, "could not find the double-extension strip");
    const extRe = new RegExp(`\\.(${doubleExt[1]})$`, "i");

    return (filename) => {
        const stem = filename
            .replace(/\.[^.]+$/, "")
            .replace(/\s+$/, "")
            .replace(extRe, "");
        return markerRe.test(stem)
            ? { isThumb: true, pairsWith: stem.replace(markerRe, "").trim().toLowerCase() }
            : { isThumb: false };
    };
}

test("companion thumbnails are paired, never listed as gallery items", () => {
    const classify = thumbnailRuleFromTemplate();

    // Every spelling here must pair with steps-with-laptop.jpg
    const companions = [
        "steps-with-laptop_thumb.jpg",
        "steps-with-laptop-thumb.jpg",
        "steps-with-laptop.thumb.jpg",
        "steps-with-laptop thumb.jpg",
        "steps-with-laptop_Thumb.jpg",
        "steps-with-laptop_THUMB.JPG",
        "steps-with-laptop_thumbnail.jpg",
        "steps-with-laptop_thumb@2x.jpg",
        "steps-with-laptop_thumb-1.jpg",
        "steps-with-laptop_thumb.jpg.jpg",
        "steps-with-laptop_thumb .jpg",
    ];
    for (const file of companions) {
        const result = classify(file);
        assert.equal(result.isThumb, true, `${file} should be a thumbnail`);
        assert.equal(
            result.pairsWith,
            "steps-with-laptop",
            `${file} should pair with steps-with-laptop`
        );
    }

    // Ordinary photos must never be swallowed as thumbnails
    for (const file of [
        "steps-with-laptop.jpg",
        "green-thumb-garden.jpg",
        "thumbelina.jpg",
        "my-thumbprint.jpg",
        "thumb.jpg",
        "Sunset.JPEG",
    ]) {
        assert.equal(
            classify(file).isThumb,
            false,
            `${file} should stay a gallery item`
        );
    }
});

test("remote mode ships the PHP templates it depends on", () => {
    const info = JSON.parse(fs.readFileSync(`${componentDir}/info.json`, "utf8"));
    // Without this the page publishes as .html and the PHP never executes
    assert.equal(info.requiresPhp, true);

    for (const partial of ["remote-scan", "remote-grid", "remote-slides"]) {
        assert.ok(
            fs.existsSync(`${componentDir}/templates/include/${partial}.php`),
            `missing templates/include/${partial}.php`
        );
    }

    const index = fs.readFileSync(`${componentDir}/templates/index.html`, "utf8");
    const lightbox = fs.readFileSync(
        `${componentDir}/templates/include/lightbox.html`,
        "utf8"
    );
    assert.match(index, /@includeIf\(remotePublished, template: "remote-grid"\)/);
    assert.match(lightbox, /@includeIf\(remotePublished, template: "remote-slides"\)/);
});

test("compiled files mirror the source changes", () => {
    const markers = ["sourceType", "remoteFolderURL", "remotePublished", "phpId"];

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
