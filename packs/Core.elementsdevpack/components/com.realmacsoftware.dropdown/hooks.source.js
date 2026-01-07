const transformHook = (rw) => {
    const {
        globalID,
        panelShowInEdit,
        panelPositionVertical,
        panelPositionHorizontal,
        dropdownTransitionStyle,
        dropdownTransitionDuration,
    } = rw.props;
    const { mode } = rw.project;
    const { id } = rw.node;

    const transitionAttributes = getAlpineTransitionAttributesMobile(
        dropdownTransitionStyle
    );

    const classes = {
        wrapper: classnames(["relative"]).toString(),
        panel: classnames([
            "absolute",
            panelPositionVertical,
            panelPositionHorizontal,
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": `dropdown('${id}')`,
            "x-bind": "wrapper",
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
        panelShowInEdit,
        includePanel: mode !== "edit" || panelShowInEdit,
    });
};

exports.transformHook = transformHook;
