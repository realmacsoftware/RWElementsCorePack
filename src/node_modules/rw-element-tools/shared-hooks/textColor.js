const textColor = (rw, modifier = "") => {
    const {
        textColor,
        textColorOpacity,
        textColorHover,
        textColorOpacityHover,
    } = rw.props;

    validateProps(
        [
            "textColor",
            "textColorOpacity",
            "textColorHover",
            "textColorOpacityHover",
        ],
        rw.props
    );

    const classes = classnames();
    classes.add(`${textColor}/${textColorOpacity}`);

    // make hover classes optional
    if (textColorHover && textColorOpacityHover) {
        classes.add(`hover:${textColorHover}/${textColorOpacityHover}`);
    }

    return classes.modifier(modifier).toString();
};
