const transformHook = (rw) => {
    const { closeCursor } = rw.props;
    const { mode } = rw.project;
    const { id } = rw.node;

    const classes = classnames([
        `relative z-50 cursor-pointer`,
        closeCursor,
    ]).toString();

    rw.setRootElement({
        as: "div",
        class: classes,
        args: {
            "@click": "$dialog.close()",
        },
    });

    rw.setProps({
        classes,
        id,
    });
};

exports.transformHook = transformHook;
