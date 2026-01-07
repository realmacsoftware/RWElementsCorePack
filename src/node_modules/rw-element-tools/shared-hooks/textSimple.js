const textSimple = (rw) => {
    const {
        textSimpleTextAlign,
        textSimpleTextColor,
        textSimpleTextColorOpacity = "[100%]",
        textSimpleFonts,
        textSimpleTextStyles,
    } = rw.props;

    validateProps(
        [
            "textSimpleTextAlign",
            "textSimpleTextColor",
            "textSimpleTextColorOpacity",
            "textSimpleFonts",
            "textSimpleTextStyles",
        ],
        rw.props
    );

    return classnames()
        .add([
            textSimpleTextAlign,
            `${textSimpleTextColor}/${textSimpleTextColorOpacity}`,
            textSimpleFonts,
            textSimpleTextStyles,
        ])
        .toString();
};
