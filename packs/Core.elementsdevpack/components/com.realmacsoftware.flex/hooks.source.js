const transformHook = (rw) => {
    const {
        globalID,
        gapX,
        gapY,
        flexDirection,
        wrap,
        alignItems,
        justifyItems,
        alignContent,
        justifyContent,
    } = rw.props;
    const { id } = rw.node;

    const wantsHorizontalDropzone = flexDirection.includes("row");
    const link = globalLink(rw);
    const filter = globalFilter(rw);
    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const classNames = classnames([
        `group/${id} group/flex transform`,
        globalID && `group/${globalID}`,
        advancedClasses(rw),
        globalLayout(rw, { defaultDisplay: "flex" }),
        globalSizingContainer(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalFilters(rw),
        globalEffects(rw),
        globalTransforms(rw),
        globalBackground(rw),
        globalBorders(rw),
        advancedClasses(rw),
        gapX,
        gapY,
        flexDirection,
        wrap,
        alignItems,
        justifyItems,
        alignContent,
        justifyContent,
    ]).toString();

    rw.setRootElement({
        as: link.hasLink ? "a" : globalHTMLTag(rw, "div"),
        class: classNames,
        args: {
            id: globalID,
            ...link.args,
            ...filter.args,
            "data-filter-tags":
                rw.collections.tags?.map((tag) => tag.title).join(",") || "",
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        wantsHorizontalDropzone,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
