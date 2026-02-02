const transformHook = (rw) => {
    const {
        globalID,
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

    // Get slides from collection
    const collectionSlides = rw.collections.slides || [];
    const count = Math.max(1, collectionSlides.length);
    const isAutoPlay = autoPlay === true || autoPlay === "true";
    const interval = parseInt(autoPlayInterval) || 3000;
    const isLoop = true;

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

    // Swiper options to pass to Alpine
    const swiperOptions = {
        loop: isLoop,
        rewind: !isLoop,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 400,
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
