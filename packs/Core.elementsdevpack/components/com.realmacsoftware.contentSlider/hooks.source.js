const PEEK_AMOUNT = 0.25;
const CARD_ROW_BREAKPOINT = 768;

const isTrue = (value) => value === true || value === "true";

const toCount = (value, fallback) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed >= 1 ? parsed : fallback;
};

const applyPeek = (count, peek) => (peek ? count + PEEK_AMOUNT : count);

const transformHook = (rw) => {
    const {
        globalID,
        layout,
        visibleSlides,
        visibleSlidesMobile,
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
    const desktopCount = toCount(visibleSlides, 3);
    const mobileCount = toCount(visibleSlidesMobile, 1);
    const gap = Math.max(0, parseInt(slideGap, 10) || (isCardRow ? 16 : 0));
    const desktopView = applyPeek(desktopCount, isCardRow && peekEnabled);
    const mobileView = applyPeek(mobileCount, isCardRow && peekEnabled);
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

    const cardRowSlideStyle = edit && isCardRow
        ? `width: calc((100% - ${gap * (desktopView - 1)}px) / ${desktopView}); margin-right: ${gap}px;`
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
        swiper: classnames([
            "swiper",
            edit && isCardRow ? "overflow-x-auto" : "",
        ]).toString(),
        swiperWrapper: "swiper-wrapper",
        slide: classnames([
            "swiper-slide",
            "min-h-[100px]",
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
        slidesPerView: isCardRow ? mobileView : 1,
        spaceBetween: isCardRow ? gap : 0,
        speed: 400,
        effect: effect,
        autoplay: isAutoPlay ? { delay: interval, disableOnInteraction: false } : false,
    };

    if (isCardRow) {
        swiperOptions.grabCursor = true;
        swiperOptions.watchOverflow = true;
        swiperOptions.freeMode = isFreeScroll ? { enabled: true, momentum: true } : false;
        swiperOptions.breakpoints = {
            [CARD_ROW_BREAKPOINT]: {
                slidesPerView: desktopView,
            },
        };
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
        cardRowSlideStyle,
        isCardRow,
        activeSlideIndex,
        isAutoPlay,
        isLoop,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
