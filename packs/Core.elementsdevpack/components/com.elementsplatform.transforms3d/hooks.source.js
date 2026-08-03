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

    const mouse3d = isEdit ? {} : globalMouse3D(rw);

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: { id: globalID, ...mouse3d },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        wantsMouse3d: Object.keys(mouse3d).length > 0,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
