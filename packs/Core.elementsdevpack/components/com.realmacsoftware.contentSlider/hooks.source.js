const PEEK_AMOUNT = 0.25;
const DEVICE_ORDER = ["base", "sm", "md", "lg", "xl", "2xl"];
const DEFAULT_SCREENS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };
const WIDTH_FOR_COUNT = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
    6: "w-1/6",
};

const isTrue = (value) => value === true || value === "true";

const toCount = (value, fallback) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed >= 1 ? parsed : fallback;
};

const applyPeek = (count, peek) => (peek ? count + PEEK_AMOUNT : count);

const hasCount = (value) => value !== undefined && value !== null && value !== "";

const isBreakpointMap = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

// Documented on the rw.getResponsiveValues page as `rw.responsiveProps`:
// https://docs.realmacsoftware.com/elements-docs/elements-language/component/hooks.js/available-data/rw.getresponsivevalues
const getResponsiveValues = (rw) => {
    if (typeof rw.getResponsiveValues === "function") {
        return rw.getResponsiveValues() || {};
    }
    return rw.responsiveProps || rw.responsive || {};
};

const resolveVisibleSlideViews = (visibleSlides, responsiveVisible, theme, peek) => {
    const screens = { ...DEFAULT_SCREENS, ...(theme?.breakpoints?.screens || {}) };
    const raw = isBreakpointMap(responsiveVisible) ? responsiveVisible : {};
    let current = toCount(hasCount(raw.base) ? raw.base : visibleSlides, 3);
    const baseView = applyPeek(current, peek);
    const breakpoints = {};

    DEVICE_ORDER.slice(1).forEach((name) => {
        if (!hasCount(raw[name])) {
            return;
        }
        current = toCount(raw[name], current);
        const minWidth = screens[name];
        if (minWidth) {
            breakpoints[minWidth] = { slidesPerView: applyPeek(current, peek) };
        }
    });

    return {
        baseView,
        breakpoints,
    };
};

const widthClassForCount = (value, fallback) => {
    const count = Math.max(1, Math.min(6, Math.round(toCount(value, fallback))));
    return WIDTH_FOR_COUNT[count];
};

// Same pattern as the docs: Object.entries(rw.responsiveProps.x) → `base` has
// no prefix, other breakpoints become `md:`, `lg:`, …
const cardRowWidthClasses = (responsiveVisible, fallback) => {
    const values = isBreakpointMap(responsiveVisible) ? { ...responsiveVisible } : {};
    if (!hasCount(values.base)) {
        values.base = toCount(fallback, 3);
    }

    const classes = ["shrink-0", "min-w-0"];
    Object.entries(values).forEach(([breakpoint, value]) => {
        if (!hasCount(value)) {
            return;
        }
        const prefix = breakpoint === "base" ? "" : `${breakpoint}:`;
        classes.push(`${prefix}${widthClassForCount(value, 3)}`);
    });
    return classes;
};

const transformHook = (rw) => {
    const {
        globalID,
        layout,
        visibleSlides,
        peekNext,
        slideGap,
        scrollMode,
        transitionEffect,
        autoPlay,
        autoPlayInterval,
        editorActiveSlide,
        showArrows,
        showDots,
        arrowSize,
        arrowBorderRadius,
        arrowBgColor,
        arrowColor,
        arrowBgColorHover,
        arrowColorHover,
        dotSize,
        dotGap,
        dotColor,
        dotColorActive,
    } = rw.props;

    const { visibleSlides: visibleSlidesByBreakpoint } = getResponsiveValues(rw);
    const { mode } = rw.project;
    const { id } = rw.node;
    const edit = mode === "edit";
    const isCardRow = (layout || "single") === "cardRow";
    const peekEnabled = peekNext === undefined ? true : isTrue(peekNext);
    const gap = Math.max(0, parseInt(slideGap, 10) || (isCardRow ? 16 : 0));
    const visibleViews = resolveVisibleSlideViews(
        visibleSlides,
        visibleSlidesByBreakpoint,
        rw.theme,
        isCardRow && peekEnabled,
    );
    const isFreeScroll = !isCardRow ? false : (scrollMode || "free") === "free";

    const collectionSlides = rw.collections.slides || [];
    const count = Math.max(1, collectionSlides.length);
    const isAutoPlay = isTrue(autoPlay);
    const interval = parseInt(autoPlayInterval) || 3000;
    const isLoop = !isCardRow;

    const activeSlideIndex = edit
        ? Math.max(0, Math.min((parseInt(editorActiveSlide) || 1) - 1, count - 1))
        : 0;

    const slides = collectionSlides.map((slide, index) => ({
        ...slide,
        index,
        number: index + 1,
        isActive: index === activeSlideIndex,
        hideInEditor: edit && !isCardRow && index !== activeSlideIndex,
    }));

    const cardRowTrackStyle = edit && isCardRow ? `gap: ${gap}px;` : "";

    const classes = {
        wrapper: classnames([
            `group/${id}`,
            "relative",
            globalSizing(rw),
            globalSpacing(rw),
            globalBackground(rw),
            globalBorders(rw),
            advancedClasses(rw),
        ]).toString(),
        swiper: classnames([
            "swiper",
            edit && isCardRow ? "overflow-x-auto w-full" : "",
        ]).toString(),
        swiperWrapper: classnames([
            "swiper-wrapper",
            edit && isCardRow ? "flex flex-nowrap items-stretch w-full" : "",
        ]).toString(),
        slide: classnames([
            "swiper-slide",
            "min-h-[100px]",
            ...(edit && isCardRow
                ? cardRowWidthClasses(visibleSlidesByBreakpoint, visibleSlides)
                : []),
        ]).toString(),
        arrows: classnames([
            "absolute inset-0 flex items-center justify-between pointer-events-none px-2 z-10",
        ]).toString(),
        arrowButton: classnames([
            "pointer-events-auto flex items-center justify-center cursor-pointer transition-all",
            arrowSize,
            arrowBorderRadius,
            arrowBgColor,
            arrowColor,
            arrowBgColorHover,
            arrowColorHover,
        ]).toString(),
        pagination: classnames([
            "swiper-pagination",
            "!relative flex items-center justify-center mt-4",
            dotGap,
        ]).toString(),
        paginationBullet: classnames([
            "rounded-full cursor-pointer transition-all",
            dotSize,
        ]).toString(),
        paginationBulletNormal: dotColor,
        paginationBulletActive: dotColorActive,
    };

    const effect = isCardRow ? "slide" : (transitionEffect || "slide");

    const swiperOptions = {
        loop: isLoop,
        rewind: !isLoop,
        slidesPerView: isCardRow ? visibleViews.baseView : 1,
        spaceBetween: isCardRow ? gap : 0,
        speed: 400,
        effect: effect,
        autoplay: isAutoPlay ? { delay: interval, disableOnInteraction: false } : false,
    };

    if (isCardRow) {
        swiperOptions.grabCursor = true;
        swiperOptions.watchOverflow = true;
        swiperOptions.freeMode = isFreeScroll ? { enabled: true, momentum: true } : false;
        if (Object.keys(visibleViews.breakpoints).length > 0) {
            swiperOptions.breakpoints = visibleViews.breakpoints;
        }
    }

    if (effect === "fade") {
        swiperOptions.fadeEffect = { crossFade: true };
    }

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            id: globalID || id,
        },
    });

    if (globalID && globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        id,
        classes,
        slides,
        edit,
        showArrows: isTrue(showArrows),
        showDots: isTrue(showDots),
        swiperOptions: JSON.stringify(swiperOptions).replace(/"/g, "'"),
        cardRowTrackStyle,
        isCardRow,
        activeSlideIndex,
        isAutoPlay,
        isLoop,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
