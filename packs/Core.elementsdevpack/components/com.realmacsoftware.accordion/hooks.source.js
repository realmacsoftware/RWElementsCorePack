const transformHook = (rw) => {
    const {
        showContentInEdit,
        openOnLoad,
        globalID,
        accordionGroup,
        accordionCustomGroupId,
        summaryPadding,
        summaryBackground,
        summaryBackgroundClosed,
        showIcon,
        icon,
        iconAlignment,
        iconSize,
        iconRotation,
        iconColor,
        iconRotationClosed,
        iconColorClosed,
        globalFilterGroup,
    } = rw.props;
    
    const { id, parent } = rw.node;
    const { tags } = rw.collections;
    const dataTags = tags?.map((tag) => tag.title).join(",") || "";

    const hasAnIcon = icon && icon.format === "svg";
    const showContent = rw.project.mode != "edit"
        ? true
        : showContentInEdit;

    const filter = globalFilter(rw);
    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);
    const wantsGrouping = accordionGroup != "none";
    const groupId =
        accordionGroup == "custom" ? accordionCustomGroupId : parent.id;

    const classes = {
        details: classnames([
            `group transform`,
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
        ]).toString(),
        summary: classnames([
            "flex justify-between items-center text-left font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",
            globalTransitions(rw, true),
            summaryPadding,
            summaryBackground,
            summaryBackgroundClosed,
        ]).toString(),
        content: classnames([``]).toString(),
        icon: classnames([
            `[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300`,
            iconSize,
            iconAlignment,
            iconRotation,
            iconColor,
            iconRotationClosed,
            iconColorClosed,
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.details,
        args: {
            "x-data": `() => accordion($id('accordion'), ${JSON.stringify({
                groupId: wantsGrouping ? groupId : null,
                openOnLoad: openOnLoad == "true",
            }).replace(/"/g, "'")})`,
            "x-id": "['accordion']",
            ":id": "$id('accordion')",
            "x-bind": "details",
            "data-open": "false",
            role: "group",
            "aria-roledescription": "accordion",
            ":aria-label": `'Accordion section ${id}'`,
            id: globalID,
            ...filter.args,
            "data-filter-tags": dataTags,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        hasAnIcon,
        edit: rw.project.mode == "edit",
        showIcon,
        globalFilterGroup,
        filter,
        filterGroup: filter.args["data-filter-group"],
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
        showContent,
    });
};

exports.transformHook = transformHook;
