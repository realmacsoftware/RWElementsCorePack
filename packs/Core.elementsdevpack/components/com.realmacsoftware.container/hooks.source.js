const transformHook = (rw) => {
    const {
        globalID,
        globalSpacingEnabled: spacingEnabled,
        globalMargin: margin,
        globalPadding: padding,

        globalControlTypeBorders,
        globalBordersRadius,
        globalBgType,
        globalBgVideo,
        globalBgVideoAspectRatio,
        globalEffectsApplyTo,
        globalFiltersApplyTo,
        globalTransformsApplyTo,

        contentWidthType,
        contentWidthTheme,
        contentHeightType,
        contentHeightTheme,

        contentAlignSelf,
        contentJustifySelf,
        contentGap,

        globalControlTypeOverlay,
    } = rw.props;

    console.log(spacingEnabled, typeof spacingEnabled);

    const { mode } = rw.project;
    const { id } = rw.node;
    const { tags, attributes } = rw.collections;
    const dataTags = tags?.map((tag) => tag.title).join(",") || "";
    const customAttributes = attributes?.reduce((acc, { attribute, value }) => {
        if (attribute) acc[attribute] = value || "";
        return acc;
    }, {}) || {};
    const link = globalLink(rw);
    const filter = globalFilter(rw);
    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const bgVideo =
        globalBgType == "video" && globalBgVideo
            ? {
                isYoutube: globalBgVideo.format == "youtube",
                isVimeo: globalBgVideo.format == "vimeo",
                isMP4: globalBgVideo.format == "mp4",
                video: globalBgVideo,
            }
            : false;

    const contentWidthProps = {
        props: {
            ...rw.props,
            globalWidthType: contentWidthType,
            globalWidth: contentWidthTheme,
            globalHeightType: contentHeightType,
            globalHeight: contentHeightTheme,

            globalSizingMinMaxEnabled: false,
            globalMinWidth: false,
            globalMaxWidth: false,
            globalMinHeight: false,
            globalMaxHeight: false,
        },
        ...rw.props,
    };

    const classes = {
        wrapper: classnames([
            id,
            `group/container group/${id} grid-cols-1 [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0`,
            globalID && `group/${globalID}`,
            globalActAsGridOrFlexItem(rw),
            globalLayout(rw, { defaultDisplay: "grid" }),
            globalSizingContainer(rw),
            globalTransitions(rw),
            globalEffectsApplyTo === "everything" &&
            globalEffects(rw, { isContainer: true }),
            globalTransformsApplyTo === "everything" &&
            globalTransforms(rw, { isContainer: true }),
            globalFiltersApplyTo === "everything" &&
            globalFilters(rw, { isContainer: true }),
            switchToBool(spacingEnabled) && margin,
            globalControlTypeBorders != "none" && globalBordersRadius,
            advancedClasses(rw),
            globalBgType == "video" &&
            globalBgVideo &&
            globalBgVideoAspectRatio &&
            "aspect-video",
        ]).toString(),
        background: classnames([
            `z-0 transform-gpu`,
            globalTransitions(rw),
            globalBorders(rw, { isContainer: true }),
            globalEffectsApplyTo === "background" &&
            globalEffects(rw, { isContainer: true }),
            globalTransformsApplyTo === "background" &&
            globalTransforms(rw, { isContainer: true }),
            globalFiltersApplyTo === "background" &&
            globalFilters(rw, { isContainer: true }),
            globalBackground(rw, { peer: true }),
            globalBackground(rw),
            `overflow-hidden`,
        ]).toString(),
        content: classnames([
            `relative z-30 flex flex-col peer`,
            globalTransitions(rw),
            globalEffectsApplyTo === "content" &&
            globalEffects(rw, { isContainer: true }),
            globalTransformsApplyTo === "content" &&
            globalTransforms(rw, { isContainer: true }),
            globalFiltersApplyTo === "content" &&
            globalFilters(rw, { isContainer: true }),
            globalSizingContainer(contentWidthProps),
            contentAlignSelf,
            contentJustifySelf,
            contentGap,
            switchToBool(spacingEnabled) && padding,
        ]).toString(),
        overlay: `relative z-20 ${globalControlTypeBorders != "none" && globalBordersRadius
            } ${globalTransitions(rw)} ${globalOverlay(rw, { isContainer: true })}`,
    };

    rw.setRootElement({
        as: link.hasLink ? "a" : globalHTMLTag(rw, "div"),
        class: classes.wrapper,
        args: {
            id: globalID,
            ...link.args,
            ...filter.args,
            "data-filter-tags": dataTags,
            ...customAttributes,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        id: rw.node.id,
        classes,
        edit: mode === "edit",
        wantsOverlay: globalControlTypeOverlay != "none",
        bgVideo,
        hasBgVideo: bgVideo ? true : false,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
