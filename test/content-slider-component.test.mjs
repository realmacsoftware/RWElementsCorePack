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

function renderSlider({
    props = {},
    slides,
    mode = "preview",
    responsiveProps = {},
    screens = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
} = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            ...props,
        },
        responsiveProps,
        theme: {
            breakpoints: {
                names: ["sm", "md", "lg", "xl", "2xl"],
                screens,
            },
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

test("card row shows a peek and free-scrolls at the base visible count", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                visibleSlides: "3",
                peekNext: true,
                slideGap: 16,
                scrollMode: "free",
            },
        }),
    );

    assert.equal(options.slidesPerView, 3.25);
    assert.equal(options.spaceBetween, 16);
    assert.equal(options.loop, false);
    assert.equal(options.rewind, true);
    assert.equal(options.grabCursor, true);
    assert.equal(options.watchOverflow, true);
    assert.deepEqual(options.freeMode, { enabled: true, momentum: true });
    assert.equal(options.breakpoints, undefined);
    assert.equal(options.effect, "slide");
});

test("card row maps responsive visibleSlides onto Swiper breakpoints", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                visibleSlides: "1",
                peekNext: true,
                slideGap: 16,
                scrollMode: "free",
            },
            responsiveProps: {
                visibleSlides: { base: "1", md: "2", lg: "3", xl: "4" },
            },
        }),
    );

    assert.equal(options.slidesPerView, 1.25);
    assert.equal(options.breakpoints[768].slidesPerView, 2.25);
    assert.equal(options.breakpoints[1024].slidesPerView, 3.25);
    assert.equal(options.breakpoints[1280].slidesPerView, 4.25);
    assert.equal(options.breakpoints[640], undefined);
});

test("card row without peek uses whole-card slidesPerView", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                visibleSlides: "4",
                peekNext: false,
                slideGap: "24",
                scrollMode: "snap",
            },
        }),
    );

    assert.equal(options.slidesPerView, 4);
    assert.equal(options.spaceBetween, 24);
    assert.equal(options.freeMode, false);
    assert.equal(options.breakpoints, undefined);
});

test("card row forces slide effect even when fade is selected", () => {
    const options = swiperOptions(
        renderSlider({
            props: {
                layout: "cardRow",
                transitionEffect: "fade",
                peekNext: true,
                visibleSlides: "3",
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
});

test("card row editor lays slides in a horizontal scrolling row", () => {
    const rw = renderSlider({
        props: {
            layout: "cardRow",
            visibleSlides: "3",
            peekNext: true,
            slideGap: 16,
        },
        mode: "edit",
        slides: defaultSlides(5),
    });

    assert.match(rw.computedProps.cardRowViewportStyle, /overflow-x:\s*auto/);
    assert.match(rw.computedProps.cardRowTrackStyle, /display:\s*flex/);
    assert.match(rw.computedProps.cardRowTrackStyle, /nowrap/);
    assert.match(rw.computedProps.cardRowTrackStyle, /16px/);
    assert.match(rw.computedProps.classes.slide, /shrink-0/);
    assert.match(rw.computedProps.classes.slide, /3\.25/);
    assert.match(rw.computedProps.cardRowSlideStyle, /flex:\s*0 0/);
    assert.match(rw.computedProps.cardRowSlideStyle, /3\.25/);

    const template = fs.readFileSync(`${componentDir}/templates/index.html`, "utf8");
    assert.match(template, /cardRowViewportStyle/);
    assert.match(template, /cardRowTrackStyle/);
    assert.equal(template.includes("cardRowMediaCss"), false);
});

test("card row editor applies larger-breakpoint visibleSlides overrides", () => {
    const rw = renderSlider({
        props: {
            layout: "cardRow",
            visibleSlides: "1",
            peekNext: true,
            slideGap: 16,
        },
        responsiveProps: {
            visibleSlides: { base: "2", md: "1" },
        },
        mode: "edit",
        slides: defaultSlides(5),
    });

    assert.match(rw.computedProps.classes.slide, /2\.25/);
    assert.match(rw.computedProps.classes.slide, /md:!w-\[calc/);
    assert.match(rw.computedProps.classes.slide, /1\.25/);
    assert.match(rw.computedProps.cardRowSlideStyle, /1\.25/);
    assert.doesNotMatch(rw.computedProps.cardRowSlideStyle, /2\.25/);
});

test("preview card row leaves layout to Swiper instead of editor row styles", () => {
    const rw = renderSlider({
        props: { layout: "cardRow", peekNext: true, visibleSlides: "3" },
        mode: "preview",
    });

    assert.equal(rw.computedProps.cardRowViewportStyle, "");
    assert.equal(rw.computedProps.cardRowTrackStyle, "");
    assert.equal(rw.computedProps.cardRowSlideStyle, "");
    assert.doesNotMatch(rw.computedProps.classes.slide, /!w-\[/);
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
        ["layout", "visibleSlides", "peekNext", "slideGap", "scrollMode"].every(
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

    const visibleSlides = properties.find((property) => property.id === "visibleSlides");
    assert.equal(visibleSlides.responsive, true);
    assert.equal(
        properties.some((property) => property.id === "visibleSlidesMobile"),
        false,
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
