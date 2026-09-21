import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const componentDir =
    "packs/Core.elementsdevpack/components/com.realmacsoftware.contentSlider";
const hookPath = `${componentDir}/hooks.source.js`;
const alpinePath = `${componentDir}/templates/alpine.html`;
const configPath = `${componentDir}/properties.config.json`;

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
        parseInt,
        parseFloat,
        Number,
        classnames,
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalBackground: () => "background",
        globalBorders: () => "borders",
        advancedClasses: () => "advanced",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function defaultSlides(count = 3) {
    return Array.from({ length: count }, (_, index) => ({
        title: `Slide ${index + 1}`,
    }));
}

function renderSlider({ props = {}, slides, mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            ...props,
        },
        node: { id: "node-1" },
        project: { mode },
        collections: { slides: slides ?? defaultSlides() },
        component: { assetPath: "/assets/content-slider" },
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

function swiperOptions(rw) {
    return JSON.parse(rw.computedProps.swiperOptions.replace(/'/g, '"'));
}

function playbackProperties() {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const playback = config.groups.find((group) => group.title === "Playback");
    assert.ok(playback, "Playback group exists");
    return playback.properties;
}

test("single layout stays one slide at a time without free scroll", () => {
    const options = swiperOptions(renderSlider());

    assert.equal(options.slidesPerView, 1);
    assert.equal(options.spaceBetween, 0);
    assert.equal(options.loop, true);
    assert.equal(options.effect, "slide");
    assert.equal(options.freeMode, undefined);
    assert.equal(options.breakpoints, undefined);
});

test("card row shows a desktop peek and free-scrolls from mobile", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                visibleSlides: "3",
                visibleSlidesMobile: "1",
                peekNext: true,
                slideGap: 16,
                scrollMode: "free",
            },
        }),
    );

    assert.equal(options.slidesPerView, 1.25);
    assert.equal(options.spaceBetween, 16);
    assert.equal(options.loop, false);
    assert.equal(options.rewind, true);
    assert.equal(options.grabCursor, true);
    assert.equal(options.watchOverflow, true);
    assert.deepEqual(options.freeMode, { enabled: true, momentum: true });
    assert.equal(options.breakpoints[768].slidesPerView, 3.25);
    assert.equal(options.effect, "slide");
});

test("card row without peek uses whole-card slidesPerView", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                visibleSlides: "4",
                visibleSlidesMobile: "2",
                peekNext: false,
                slideGap: "24",
                scrollMode: "snap",
            },
        }),
    );

    assert.equal(options.slidesPerView, 2);
    assert.equal(options.spaceBetween, 24);
    assert.equal(options.freeMode, false);
    assert.equal(options.breakpoints[768].slidesPerView, 4);
});

test("card row forces slide effect even when fade is selected", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                transitionEffect: "fade",
                peekNext: true,
                visibleSlides: "3",
                visibleSlidesMobile: "1",
            },
        }),
    );

    assert.equal(options.effect, "slide");
    assert.equal(options.fadeEffect, undefined);
});

test("card row editor keeps every slide visible so cards can be edited", () => {
    const rw = renderSlider({
        props: {
            layout: "cardRow",
            editorActiveSlide: 2,
            visibleSlides: "3",
            peekNext: true,
        },
        mode: "edit",
        slides: defaultSlides(5),
    });

    assert.equal(rw.computedProps.slides.length, 5);
    assert.equal(
        rw.computedProps.slides.every((slide) => slide.hideInEditor === false),
        true,
    );
    assert.match(rw.computedProps.cardRowSlideStyle, /width:/);
    assert.match(rw.computedProps.cardRowSlideStyle, /16px|margin-right/);
});

test("single layout still hides inactive slides in the editor", () => {
    const rw = renderSlider({
        props: { editorActiveSlide: 2 },
        mode: "edit",
        slides: defaultSlides(3),
    });

    assert.deepEqual(
        rw.computedProps.slides.map((slide) => slide.hideInEditor),
        [true, false, true],
    );
    assert.equal(rw.computedProps.cardRowSlideStyle, "");
});

test("inspector exposes card-row layout, peek, gap, and scroll controls", () => {
    const properties = playbackProperties();
    const ids = properties.map((property) => property.id).filter(Boolean);

    assert.deepEqual(
        ["layout", "visibleSlides", "visibleSlidesMobile", "peekNext", "slideGap", "scrollMode"].every(
            (id) => ids.includes(id),
        ),
        true,
    );

    const layout = properties.find((property) => property.id === "layout");
    assert.equal(layout.segmented.default, "single");
    assert.deepEqual(
        layout.segmented.items.map((item) => item.value),
        ["single", "cardRow"],
    );

    const effect = properties.find((property) => property.id === "transitionEffect");
    assert.match(String(effect.enable || effect.visible || ""), /layout/);
});

test("card-row slide style is not named with a reserved edit prefix", () => {
    const template = fs.readFileSync(`${componentDir}/templates/index.html`, "utf8");

    assert.match(template, /cardRowSlideStyle/);
    assert.equal(template.includes("editorSlideStyle"), false);
});

test("alpine forwards freeMode, breakpoints, and grabCursor to Swiper", () => {
    const alpine = fs.readFileSync(alpinePath, "utf8");

    assert.match(alpine, /config\.freeMode/);
    assert.match(alpine, /config\.breakpoints/);
    assert.match(alpine, /config\.grabCursor/);
    assert.match(alpine, /config\.watchOverflow/);
});
