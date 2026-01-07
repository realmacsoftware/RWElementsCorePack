const backgroundSimple = (rw) => {
    const { bgColor, bgColorOpacity, bgBlur, bgBoxShadow } = rw.props;

    validateProps(
        ["bgColor", "bgColorOpacity", "bgBlur", "bgBoxShadow"],
        rw.props
    );

    return classnames()
        .add([bgColor, bgColorOpacity, bgBlur, bgBoxShadow])
        .toString();
};
