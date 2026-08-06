const transformHook = (rw) => {
    const {
        globalID,
        showText,
        dropzoneType,
        dropzoneSpacing,
        globalButtonFontAndTextStylesTextAlign,

        globalButtonFontAndTextStylesColor,
        globalButtonFontAndTextStylesColorOpacity,
        globalButtonFontAndTextStylesFont,
        globalButtonFontAndTextStylesFontSize,
        globalButtonFontAndTextStylesTextShadow,
        globalButtonFontAndTextStylesFontWeight,
        globalButtonFontAndTextStylesLineHeight,
        globalButtonFontAndTextStylesLetterSpacing,
        globalButtonFontAndTextStylesItalic,
        globalButtonFontAndTextStylesUnderline,
        globalButtonFontAndTextStylesTextTransform,
        globalButtonFontAndTextStylesColorHover,
        globalButtonFontAndTextStylesColorOpacityHover,
        globalButtonFontAndTextStylesTextShadowHover,
    } = rw.props;

    const link = globalLink(rw);
    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const { id } = rw.node;

    const wantsDropzone = dropzoneType == "left" || dropzoneType == "right";
    const dropzoneSide = dropzoneType == "right" ? "order-last" : "order-first";

    const classes = classnames([
        `group/button group/${id}`,
        `flex items-center cursor-pointer`,
        wantsDropzone && dropzoneSpacing,
        globalLayout(rw, { defaultDisplay: "flex" }),
        globalSizing(rw),
        globalSpacing(rw),
        globalTransitions(rw, true),
        globalEffects(rw),
        globalFilters(rw),
        globalTransforms(rw),
        globalBackground(rw),
        globalBorders(rw),

        globalButtonFontAndTextStylesTextAlign,
        globalButtonFontAndTextStylesTextAlign.replace(/justify-/g, "text-"),

        globalButtonFontAndTextStylesColor,
        globalButtonFontAndTextStylesColorOpacity,
        globalButtonFontAndTextStylesFont,
        globalButtonFontAndTextStylesFontSize,
        globalButtonFontAndTextStylesTextShadow,
        globalButtonFontAndTextStylesFontWeight,
        globalButtonFontAndTextStylesLineHeight,
        globalButtonFontAndTextStylesLetterSpacing,
        globalButtonFontAndTextStylesItalic,
        globalButtonFontAndTextStylesUnderline,
        globalButtonFontAndTextStylesTextTransform,
        globalButtonFontAndTextStylesColorHover,
        globalButtonFontAndTextStylesColorOpacityHover,
        globalButtonFontAndTextStylesTextShadowHover,

        advancedClasses(rw),
    ]).toString();

    rw.setRootElement({
        as: link.hasLink ? "a" : "button",
        class: classes,
        args: {
            ...link.args,
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        dropzoneSide,
        wantsDropzone,
        showText: showText === true || showText === "true",
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
