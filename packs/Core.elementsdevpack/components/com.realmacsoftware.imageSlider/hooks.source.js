const transformHook = (rw) => {
    const {
        imageType,
        imageCmsField,
        imageCmsCustomField,
        images,
        autoPlay,
        autoPlayInterval: autoPlayDelay,
        pauseOnHover,
        visibleSlides: rawVisibleSlides,
        transitionType,
        transitionDuration,
        padding,
        aspectRatio,
        globalBordersRadius,
        globalBoxShadow,
        customAspectRatio,
        enablePaginationArrows,
        enablePaginationDots,
        paginationArrowSize,
        paginationArrowBgColor,
        paginationArrowColor,
        paginationArrowBgColorHover,
        paginationArrowColorHover,
        paginationDotColor,
        paginationDotColorActive,
        paginationDotSize,
        paginationDotGap,
    } = rw.props;

    // Force visibleSlides to 1 when using fade transition
    const visibleSlides = transitionType === "fade" ? "1" : rawVisibleSlides;

    const { id } = rw.node;
    const isCms = imageType === "cms";
    const cmsField =
        imageCmsField === "custom" ? imageCmsCustomField : imageCmsField;
    const { assetPath } = rw.component;
    const hasImages = isCms || images?.resourceCount > 0;

    const resources = !isCms
        ? images
        : {
              resources: [
                  {
                      image: `${assetPath}/image-square.png`,
                      alt: "Image 1",
                      width: 500,
                      height: 500,
                  },
                  {
                      image: `${assetPath}/image-square.png`,
                      alt: "Image 2",
                      width: 500,
                      height: 500,
                  },
                  {
                      image: `${assetPath}/image-square.png`,
                      alt: "Image 3",
                      width: 500,
                      height: 500,
                  },
              ],
          };

    const gridColumns = enablePaginationArrows
        ? "grid-cols-[auto_1fr_auto]"
        : "grid-cols-1";
    const gridRows = enablePaginationDots
        ? "grid-rows-[1fr_auto]"
        : "grid-rows-1";

    const widths = {
        1: "w-full",
        2: "w-1/2",
        3: "w-1/3",
        4: "w-1/4",
        5: "w-1/5",
        6: "w-1/6",
        7: "w-[14.285714%]",
        8: "w-[12.5%]",
        9: "w-[11.111111%]",
        10: "w-[10%]",
        11: "w-[9.090909%]",
        12: "w-[8.333333%]",
    };

    const isFade = transitionType === "fade";

    // Build aspect ratio class for image wrappers
    const aspectRatioClass =
        aspectRatio === "aspect-[custom]" ? customAspectRatio : aspectRatio;

    // Determine if we have a fixed aspect ratio (not auto)
    const hasFixedAspectRatio = aspectRatio !== "aspect-[auto]";

    const classes = {
        wrapper: `relative w-full overflow-hidden grid ${gridColumns} ${gridRows} ${advancedClasses(
            rw
        )}`,
        container: "overflow-hidden relative",
        slider: isFade
            ? "grid w-full"
            : "flex w-full cursor-grab active:cursor-grabbing",
        slide: isFade
            ? `[grid-area:1/1] w-full transition-opacity ${
                  transitionDuration || "duration-[500ms]"
              } ${padding}`
            : `shrink-0 min-w-0 snap-start ${widths[visibleSlides]} ${padding}`,
        // Edit mode slide class - no transitions, immediate opacity
        slideEdit: isFade
            ? `[grid-area:1/1] w-full ${padding}`
            : `shrink-0 min-w-0 snap-start ${widths[visibleSlides]} ${padding}`,
        slideFirstEdit: isFade ? "z-10 opacity-100" : "",
        slideOtherEdit: isFade ? "opacity-0" : "",
        slideImageWrapper: [
            `w-full overflow-hidden bg-gray-200`,
            aspectRatioClass,
            globalBordersRadius,
            globalBoxShadow,
        ]
            .join(" ")
            .replace(/\s+/g, " ")
            .trim(),
        // When aspect ratio is fixed, use h-full to fill wrapper
        // When aspect ratio is auto, use h-auto to size naturally
        slideImage: hasFixedAspectRatio
            ? "w-full h-full object-cover pointer-events-none select-none"
            : "w-full h-auto pointer-events-none select-none",
        paginationButton: [
            `transition duration-200 self-center p-2 rounded-full`,
            paginationArrowBgColor,
            paginationArrowBgColorHover,
        ].join(" "),
        paginationButtonSvg: [
            `transition duration-200`,
            paginationArrowColor,
            paginationArrowColorHover,
            paginationArrowSize,
        ].join(" "),
        paginationDots: `col-span-full flex justify-center ${paginationDotGap}`,
        paginationDot: [
            `rounded-full focus:outline-none`,
            paginationDotColor,
            paginationDotColorActive,
            paginationDotSize,
        ].join(" "),
    };

    const sliderOptions = JSON.stringify({
        visibleSlides: parseInt(visibleSlides),
        autoplay: autoPlay,
        autoplayDelay: autoPlayDelay,
        transitionType: transitionType || "slide",
        transitionDuration: transitionDuration || "duration-[500ms]",
    }).replace(/"/g, `'`);

    const slides = resources?.resources
        ?.map((resource) => `'${resource.image}'`)
        .join(",");

    // Build root element args conditionally based on pauseOnHover
    const rootArgs = {
        "x-data": `imageSlider('${id}', ${sliderOptions})`,
        "data-total-images": images?.resourceCount,
        "x-on:keydown.right": "next",
        "x-on:keydown.left": "prev",
        tabindex: "0",
        role: "region",
    };

    // Only add hover handlers if pauseOnHover is enabled
    if (pauseOnHover) {
        rootArgs["x-on:mouseenter"] = "stopAutoplay";
        rootArgs["x-on:mouseleave"] = "options.autoplay && startAutoplay()";
    }

    rw.setRootElement({
        as: globalHTMLTag(rw, "div"),
        class: classes.wrapper,
        args: rootArgs,
    });

    rw.setProps({
        classes,
        images: resources,
        isResources: !isCms,
        isCms,
        cmsField,
        hasImages,
    });
};

exports.transformHook = transformHook;
