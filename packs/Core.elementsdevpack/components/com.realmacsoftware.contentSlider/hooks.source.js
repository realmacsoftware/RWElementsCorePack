const transformHook = (rw) => {
    const {
        globalID,
        slideCount,
        slidesPerView,
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
    const perView = parseInt(slidesPerView) || 1;
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
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            globalBackground(rw),
            globalBorders(rw),
            advancedClasses(rw),
        ]).toString(),
        glide: "glide",
        track: "glide__track",
        slides: "glide__slides",
        slide: classnames([
            "glide__slide",
            "min-h-[100px]",
        ]).toString(),
        arrows: classnames([
            "glide__arrows",
            "absolute inset-0 flex items-center justify-between pointer-events-none px-2",
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
        bullets: classnames([
            "glide__bullets",
            "flex items-center justify-center mt-4",
            dotGap,
        ]).toString(),
        bullet: classnames([
            "glide__bullet",
            "rounded-full cursor-pointer transition-all",
            dotSize,
        ]).toString(),
        bulletNormal: dotColor,
        bulletActive: dotColorActive,
    };

    // Glide.js options to pass to Alpine
    const glideOptions = {
        type: isLoop ? "carousel" : "slider",
        perView: perView,
        gap: 0,
        rewind: !isLoop,
    };

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
        glideOptions: JSON.stringify(glideOptions).replace(/"/g, "'"),
        activeSlideIndex,
        perView,
        isLoop,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
