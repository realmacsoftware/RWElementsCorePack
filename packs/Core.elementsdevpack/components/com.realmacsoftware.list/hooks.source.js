const transformHook = (rw) => {
    const {
        globalID,
        numberOfItems,
        listType,
        listStyleSize,
        listStyleType,
        listStylePosition,
        markerColor,
        itemGap,
        itemPadding,
    } = rw.props;

    const { mode } = rw.project;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const items = Array.from({ length: numberOfItems }, (_, index) => ({
        index: index + 1,
        title: `Item ${index + 1}`,
    }));

    // List wrapper classes
    const listClasses = classnames([
        "flex flex-col",
        itemGap,
        listStyleType,
        listStylePosition,
        markerColor,
        globalLayout(rw),
        globalSizing(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalEffects(rw),
        globalFilters(rw),
        globalTransforms(rw),
        globalBackground(rw),
        globalBorders(rw),
        advancedClasses(rw),
    ]).toString();

    // List item classes — apply the text line-height directly on the <li> so the
    // ::marker inherits it (line-height can't be set on ::marker directly in WebKit)
    const itemClasses = classnames([
        itemPadding,
        listStyleSize,
        globalHeadingTextColor(rw),
        mode === "edit" ? "[&>[data-slate-editor=true]]:align-top [&>[data-slate-editor=true]]:-translate-y-[2px]" : "",
        mode === "edit"
            ? classnames(
                globalTextFontsAndTextStyles(rw).split(" ").filter(Boolean)
            )
                .modifier("[&_[data-slate-node]]")
                .toString()
            : globalTextFontsAndTextStyles(rw),
    ]).toString();

    const classes = {
        list: listClasses,
        item: itemClasses,
    };

    // Set the root element to ul or ol based on listType
    const tag = listType === "ol" ? "ol" : "ul";

    rw.setRootElement({
        as: tag,
        class: classes.list,
        args: {
            id: globalID,
        },
    });

    if (globalID && globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        items,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
