const transformHook = (rw) => {
    const {
        globalID,
        slideCount,
        transitionEffect,
        transitionSpeed,
        autoPlay,
        autoPlayInterval,
        loop,
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

    // Parse slide count with bounds
    const count = Math.max(1, Math.min(20, parseInt(slideCount) || 3));
    const isAutoPlay = autoPlay === true || autoPlay === "true";
    const interval = parseInt(autoPlayInterval) || 3000;
    const isLoop = loop === true || loop === "true";

    // Determine which slide to show as active in editor mode
    const activeSlideIndex = edit
        ? Math.max(0, Math.min((parseInt(editorActiveSlide) || 1) - 1, count - 1))
        : 0;

    // Generate slides array based on slideCount
    const slides = Array.from({ length: count }, (_, index) => ({
        index,
        number: index + 1,
        isActive: index === activeSlideIndex,
        hideInEditor: edit && index !== activeSlideIndex,
    }));

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

    // Parse transition settings
    const effect = transitionEffect || 'slide';
    const speed = parseInt(transitionSpeed) || 400;

    // Swiper options to pass to Alpine
    const swiperOptions = {
        loop: isLoop,
        rewind: !isLoop,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: speed,
        effect: effect,
        autoplay: isAutoPlay ? { delay: interval, disableOnInteraction: false } : false,
    };

    // Add fade-specific options for smooth crossfade
    if (effect === 'fade') {
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
        showArrows: showArrows === true || showArrows === "true",
        showDots: showDots === true || showDots === "true",
        swiperOptions: JSON.stringify(swiperOptions).replace(/"/g, "'"),
        activeSlideIndex,
        isAutoPlay,
        isLoop,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
