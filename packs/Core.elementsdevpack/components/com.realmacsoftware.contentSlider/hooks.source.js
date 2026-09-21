const PEEK_AMOUNT = 0.25;
const DEVICE_ORDER = ["base", "sm", "md", "lg", "xl", "2xl"];
const DEFAULT_SCREENS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

const isTrue = (value) => value === true || value === "true";

const toCount = (value, fallback) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed >= 1 ? parsed : fallback;
};

const applyPeek = (count, peek) => (peek ? count + PEEK_AMOUNT : count);

const hasCount = (value) => value !== undefined && value !== null && value !== "";

const resolveVisibleSlideViews = (visibleSlides, responsiveVisible, theme, peek) => {
    const screens = { ...DEFAULT_SCREENS, ...(theme?.breakpoints?.screens || {}) };
    const raw = responsiveVisible && typeof responsiveVisible === "object" ? responsiveVisible : {};
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

const slotCalc = (gap, view) => `calc((100% - ${gap}px * ${view - 1}) / ${view})`;

const slotDeclarations = (gap, view) => {
    const slot = slotCalc(gap, view);
    return `flex: 0 0 ${slot}; width: ${slot}; max-width: ${slot};`;
};

const buildCardRowMediaCss = (cssId, gap, visibleViews) => {
    if (!cssId) {
        return "";
    }
    const selector = `#${cssId} .content-slider-card`;
    let css = `${selector} { ${slotDeclarations(gap, visibleViews.baseView)} }`;
    Object.entries(visibleViews.breakpoints).forEach(([minWidth, options]) => {
        css += ` @media (min-width: ${minWidth}px) { ${selector} { ${slotDeclarations(gap, options.slidesPerView)} } }`;
    });
    return css;
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

    const { mode } = rw.project;
    const { id } = rw.node;
    const edit = mode === "edit";
    const isCardRow = (layout || "single") === "cardRow";
    const peekEnabled = peekNext === undefined ? true : isTrue(peekNext);
    const gap = Math.max(0, parseInt(slideGap, 10) || (isCardRow ? 16 : 0));
    const visibleViews = resolveVisibleSlideViews(
        visibleSlides,
        rw.responsiveProps?.visibleSlides,
        rw.theme,
        isCardRow && peekEnabled,
    );
    const isFreeScroll = !isCardRow ? false : (scrollMode || "free") === "free";

    // Get slides from collection
    const collectionSlides = rw.collections.slides || [];
    const count = Math.max(1, collectionSlides.length);
    const isAutoPlay = isTrue(autoPlay);
    const interval = parseInt(autoPlayInterval) || 3000;
    const isLoop = !isCardRow;

    // Determine which slide to show as active in editor mode
    const activeSlideIndex = edit
        ? Math.max(0, Math.min((parseInt(editorActiveSlide) || 1) - 1, count - 1))
        : 0;

    // Map collection slides to template data
    const slides = collectionSlides.map((slide, index) => ({
        ...slide,
        index,
        number: index + 1,
        isActive: index === activeSlideIndex,
        hideInEditor: edit && !isCardRow && index !== activeSlideIndex,
    }));

    const cssId = globalID || id;
    const cardRowViewportStyle = edit && isCardRow
        ? "overflow-x: auto; width: 100%;"
        : "";
    const cardRowTrackStyle = edit && isCardRow
        ? `display: flex; flex-wrap: nowrap; align-items: stretch; gap: ${gap}px; width: 100%;`
        : "";
    const cardRowSlideStyle = edit && isCardRow
        ? "min-width: 0; box-sizing: border-box; position: relative;"
        : "";
    const cardRowMediaCss = edit && isCardRow
        ? buildCardRowMediaCss(cssId, gap, visibleViews)
        : "";

    // Build classes object
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
        swiper: "swiper",
        swiperWrapper: "swiper-wrapper",
        slide: classnames([
            "swiper-slide",
            "min-h-[100px]",
            edit && isCardRow ? "content-slider-card" : "",
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

    // Fade only works for a single full-width slide
    const effect = isCardRow ? "slide" : (transitionEffect || "slide");

    // Swiper options to pass to Alpine
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

    // Add fade-specific options for smooth crossfade
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
        cardRowViewportStyle,
        cardRowTrackStyle,
        cardRowSlideStyle,
        cardRowMediaCss,
        isCardRow,
        activeSlideIndex,
        isAutoPlay,
        isLoop,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
