const transformHook = (rw) => {
    const { globalID, width, height } = rw.props;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const classes = classnames([
        width,
        height,
        globalSpacing(rw),
        globalBackground(rw),
        globalBorders(rw),
        advancedClasses(rw),
    ]).toString();

    rw.setRootElement({
        as: globalHTMLTag(rw, "div"),
        class: classes,
        args: {
            role: "separator",
            "aria-orientation": "horizontal",
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
