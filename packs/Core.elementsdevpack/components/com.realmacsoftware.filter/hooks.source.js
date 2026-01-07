const transformHook = (rw) => {
    const {
        inputColor,
        placeholder,
        placeholderColor,
        globalSpacingEnabled,
        globalMargin,
        globalPadding,
    } = rw.props;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const classes = {
        wrapper: classnames([
            globalSpacingEnabled == "true" && globalMargin,
            globalLayout(rw),
            globalSizing(rw),
            advancedClasses(rw),
        ]).toString(),
        input: classnames([
            "appearance-none w-full ring-0 focus:ring-0",
            inputColor,
            globalSpacingEnabled == "true" && globalPadding,
            globalTransitions(rw),
            globalEffects(rw, { focus: true }),
            globalFilters(rw, { focus: true }),
            globalTransforms(rw, { focus: true }),
            globalBackground(rw, { focus: true }),
            globalBorders(rw, { focus: true }),
            globalInputFontAndTextStyles(rw),
            globalOutline(rw),
            placeholderColor,
        ]).toString(),
    };

    const filter = globalFilter(rw);

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": `filter('${filter.filterGroupId}')`,
            ...filter.args,
        },
    });

    rw.setProps({
        classes,
        placeholder,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
