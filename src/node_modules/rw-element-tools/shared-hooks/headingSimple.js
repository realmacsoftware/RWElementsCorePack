const headingSimple = (rw) => {
    const {
        headingSimpleTextAlign,
        headingSimpleTextColor,
        headingSimpleTextColorOpacity,
        headingSimpleFonts,
        headingSimpleTextStyles,
    } = rw.props;

    validateProps(
        [
            "headingSimpleTextAlign",
            "headingSimpleTextColor",
            "headingSimpleTextColorOpacity",
            "headingSimpleFonts",
            "headingSimpleTextStyles",
        ],
        rw.props
    );

    return classnames()
        .add([
            headingSimpleTextAlign,
            `${headingSimpleTextColor}/${headingSimpleTextColorOpacity}`,
            headingSimpleFonts,
            headingSimpleTextStyles,
        ])
        .toString();
};
