const transformHook = (rw) => {
    const { globalID } = rw.props;
    const { id } = rw.node;
    const isEdit = rw.project.mode == "edit";

    const classes = {
        wrapper: classnames([
            `group/${id} group/transforms3d`,
            globalID && `group/${globalID}`,
            advancedClasses(rw),
            globalPerspective3D(rw),
        ]).toString(),
        transform: classnames([
            "transform",
            globalTransitions(rw),
            globalTransforms(rw),
            globalTransforms3D(rw),
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: { id: globalID, ...(isEdit ? {} : globalMouse3D(rw)) },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({ classes });
};

exports.transformHook = transformHook;
