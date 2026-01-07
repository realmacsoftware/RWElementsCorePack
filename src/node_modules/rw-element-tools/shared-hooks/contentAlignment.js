const contentAlignment = (rw) => {
    const {
        contentAlignmentVertical,
        contentAlignmentHorizontal,
        contentAlignmentTextAlign,
    } = rw.props;

    validateProps(
        [
            "contentAlignmentVertical",
            "contentAlignmentHorizontal",
            "contentAlignmentTextAlign",
        ],
        rw.props
    );

    return classnames()
        .add([
            contentAlignmentVertical,
            contentAlignmentHorizontal,
            contentAlignmentTextAlign,
        ])
        .toString();
};
