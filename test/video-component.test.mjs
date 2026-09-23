import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const componentDir =
    "packs/Core.elementsdevpack/components/com.realmacsoftware.video";
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

function aspectRatioClasses(rw) {
    const { aspectRatio, aspectRatioCustom } = rw.props;
    const mapped = {
        "aspect-[auto]": rw.component.title == "Video" ? "aspect-video" : "aspect-[auto]",
        "aspect-[custom]": aspectRatioCustom,
    };
    return classnames().add(mapped[aspectRatio] || aspectRatio).toString();
}

function objectClasses(rw) {
    const { aspectRatio, objectFit, objectPosition } = rw.props;
    return classnames([
        aspectRatio !== "aspect-[auto]" ? objectFit : "",
        objectPosition,
    ]).toString();
}

function loadTransformHook() {
    const source = fs.readFileSync(hookPath, "utf8");
    const sandbox = {
        exports: {},
        JSON,
        Array,
        String,
        classnames,
        aspectRatioClasses,
        objectClasses,
        advancedClasses: () => "advanced",
        globalLayout: () => "layout",
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalTransforms: () => "transforms",
        globalFilters: () => "filters",
        globalBorders: () => "borders",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderVideo({ props = {}, mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            imageType: "resource",
            image: null,
            imageDark: null,
            imageAlt: "",
            wantsLightbox: false,
            videoLightboxColor: "",
            videoLightboxColorOpacity: "",
            videoLightboxGlobalFiltersBackdropBlur: "",
            overlayColor: "",
            overlayOpacity: "",
            video: null,
            autoplay: "never",
            loop: false,
            mute: true,
            controls: false,
            startAt: 0,
            globalPadding: "",
            aspectRatio: "aspect-[auto]",
            aspectRatioCustom: "aspect-[7/5]",
            objectFit: "object-cover",
            objectPosition: "object-center",
            ...props,
        },
        responsiveProps: {
            imageCustomSource: {},
            imageCustomSourceDark: {},
            imageCmsField: {},
            imageCmsFieldDark: {},
        },
        node: { id: "node-1" },
        project: { mode },
        component: {
            title: "Video",
            assetPath: "/assets/video",
            sharedAssetPath: "/shared",
        },
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

function preloadProperty() {
    const config = JSON.parse(
        fs.readFileSync(`${componentDir}/properties.config.json`, "utf8")
    );
    const videoGroup = config.groups.find((group) => group.title === "Video");
    return videoGroup.properties.find((property) => property.id === "preload");
}

function mp4VideoTags(template) {
    return [...template.matchAll(/<video\b[\s\S]*?<\/video>/g)].map(
        (match) => match[0]
    );
}

function classTokens(classString) {
    return new Set(String(classString).split(/\s+/).filter(Boolean));
}

test("inspector exposes a Preload select with none / metadata / auto", () => {
    const preload = preloadProperty();

    assert.ok(preload, "preload property is missing from properties.config.json");
    assert.equal(preload.title, "Preload");
    assert.equal(preload.responsive, false);
    assert.equal(preload.select.default, "metadata");
    assert.deepEqual(
        preload.select.items.map((item) => item.value),
        ["none", "metadata", "auto"]
    );
});

test("mp4 video templates emit a preload attribute from the inspector value", () => {
    const index = fs.readFileSync(`${componentDir}/templates/index.html`, "utf8");
    const lightbox = fs.readFileSync(
        `${componentDir}/templates/include/lightbox.html`,
        "utf8"
    );

    const indexVideos = mp4VideoTags(index);
    const lightboxVideos = mp4VideoTags(lightbox);
    const indexIframe = index.match(/<iframe\b[\s\S]*?<\/iframe>/)?.[0] ?? "";
    const lightboxIframe = lightbox.match(/<iframe\b[\s\S]*?<\/iframe>/)?.[0] ?? "";

    assert.equal(indexVideos.length, 1);
    assert.equal(lightboxVideos.length, 1);
    assert.match(indexVideos[0], /\bpreload="\{\{preload\}\}"/);
    assert.match(lightboxVideos[0], /\bpreload="\{\{preload\}\}"/);
    assert.doesNotMatch(indexIframe, /\bpreload=/);
    assert.doesNotMatch(lightboxIframe, /\bpreload=/);
});

test("transform hook passes a valid preload hint through to the template", () => {
    for (const value of ["none", "metadata", "auto"]) {
        const rw = renderVideo({
            props: {
                preload: value,
                video: { format: "mp4", path: "/media/hero.mp4" },
            },
        });

        assert.equal(rw.computedProps.preload, value);
        assert.equal(rw.computedProps.isMP4, true);
    }
});

test("transform hook defaults missing or invalid preload to metadata", () => {
    assert.equal(renderVideo().computedProps.preload, "metadata");
    assert.equal(
        renderVideo({ props: { preload: "eager" } }).computedProps.preload,
        "metadata"
    );
    assert.equal(
        renderVideo({ props: { preload: "" } }).computedProps.preload,
        "metadata"
    );
});

test("preload is still emitted for YouTube/Vimeo even though those templates ignore it", () => {
    const rw = renderVideo({
        props: {
            preload: "none",
            video: { format: "youtube", videoId: "abc123" },
        },
    });

    assert.equal(rw.computedProps.isMP4, false);
    assert.equal(rw.computedProps.preload, "none");
});

test("auto aspect keeps 16:9 on the wrapper, inner player, and lightbox", () => {
    const { computedProps, root } = renderVideo();
    const wrapper = classTokens(root.class);
    const video = classTokens(computedProps.classes.video);
    const lightbox = classTokens(computedProps.classes.videoLightbox);

    assert.ok(wrapper.has("aspect-video"));
    assert.ok(video.has("aspect-video"));
    assert.ok(video.has("w-full"));
    assert.ok(video.has("h-auto"));
    assert.ok(lightbox.has("aspect-video"));
    assert.ok(lightbox.has("w-[min(95vw,calc(95vh*16/9))]"));
});

test("tall 4/5 aspect is applied to the inner player, not a hard-coded 16:9", () => {
    const { computedProps, root } = renderVideo({
        props: { aspectRatio: "aspect-[4/5]" },
    });
    const wrapper = classTokens(root.class);
    const video = classTokens(computedProps.classes.video);
    const lightbox = classTokens(computedProps.classes.videoLightbox);

    assert.ok(wrapper.has("aspect-[4/5]"));
    assert.ok(video.has("aspect-[4/5]"));
    assert.ok(lightbox.has("aspect-[4/5]"));
    assert.ok(!video.has("aspect-video"));
    assert.ok(!lightbox.has("aspect-video"));
    assert.ok(lightbox.has("w-[min(95vw,calc(95vh*4/5))]"));
    assert.ok(!lightbox.has("w-[min(95vw,calc(95vh*16/9))]"));
});

test("custom 9/16 aspect follows through to the inner player and lightbox", () => {
    const { computedProps, root } = renderVideo({
        props: {
            aspectRatio: "aspect-[custom]",
            aspectRatioCustom: "aspect-[9/16]",
        },
    });
    const wrapper = classTokens(root.class);
    const video = classTokens(computedProps.classes.video);
    const lightbox = classTokens(computedProps.classes.videoLightbox);

    assert.ok(wrapper.has("aspect-[9/16]"));
    assert.ok(video.has("aspect-[9/16]"));
    assert.ok(lightbox.has("aspect-[9/16]"));
    assert.ok(!video.has("aspect-video"));
    assert.ok(!lightbox.has("aspect-video"));
    assert.ok(lightbox.has("w-[min(95vw,calc(95vh*9/16))]"));
});

test("explicit wide 16/9 uses aspect-[16/9] on the inner player instead of aspect-video", () => {
    const { computedProps, root } = renderVideo({
        props: { aspectRatio: "aspect-[16/9]" },
    });
    const wrapper = classTokens(root.class);
    const video = classTokens(computedProps.classes.video);
    const lightbox = classTokens(computedProps.classes.videoLightbox);

    assert.ok(wrapper.has("aspect-[16/9]"));
    assert.ok(video.has("aspect-[16/9]"));
    assert.ok(lightbox.has("aspect-[16/9]"));
    assert.ok(!video.has("aspect-video"));
    assert.ok(lightbox.has("w-[min(95vw,calc(95vh*16/9))]"));
});
