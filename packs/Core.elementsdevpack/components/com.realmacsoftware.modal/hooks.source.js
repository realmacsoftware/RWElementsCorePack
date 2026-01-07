const transformHook = (rw) => {
    const {
        globalID,
        triggerCursor,
        modalShowInEdit,
        modalJustify,
        modalAlign,
        globalFiltersBackdropBlur,
        modalOverlayColor,
        modalOverlayOpacity,
        modalTransitionStyle,
        modalTransitionDuration,
        modalAutoOpen,
        modalAutoOpenTime,
    } = rw.props;
    const { mode } = rw.project;
    const { id } = rw.node;

    const transitionAttributes =
        getAlpineTransitionAttributesMobile(modalTransitionStyle);

    const classes = {
        wrapper: classnames([advancedClasses(rw)]).toString(),
        trigger: classnames([triggerCursor]).toString(),
        dialog: classnames([
            "fixed z-50 inset-0 overflow-y-auto",
            !modalShowInEdit && mode === "edit" && "hidden",
        ]).toString(),
        panel: classnames([
            "relative flex min-h-screen cursor-pointer",
            modalJustify,
            modalAlign,
        ]).toString(),
        panelInner: classnames([
            "relative cursor-auto",
            modalTransitionDuration,
        ]).toString(),
        overlay: classnames([
            "fixed inset-0 bg-black/25",
            `${modalOverlayColor}/${modalOverlayOpacity}`,
            modalOverlayOpacity,
            globalFiltersBackdropBlur,
            modalTransitionDuration,
            mode === "edit" && "pointer-events-none",
        ]).toString(),
    };

    const openOnExitIntent = modalAutoOpen === "exitIntent" ? true : false;
    const autoOpen =
        modalAutoOpen === "delay" || modalAutoOpen === "onload" ? true : false;
    const autoOpenTime =
        modalAutoOpen === "delay" ? modalAutoOpenTime * 1000 : 0;

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": `{ open: false, openModal: () => $dispatch('open-modal', { id: '${id}' }) }`,
            "x-init": `${
                autoOpen
                    ? `setTimeout(() => openModal(), ${autoOpenTime})`
                    : null
            }`,
            "x-exit-intent": openOnExitIntent ? "openModal" : null,
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        id,
        transitionAttributes,
    });
};

exports.transformHook = transformHook;
