const size = (rw) => {
    const { width, widthCustom, height, heightCustom } = rw.props;

    validateProps(["width", "widthCustom", "height", "heightCustom"], rw.props);

    return classnames()
        .add([
            width === "custom" ? widthCustom : width,
            height === "custom" ? heightCustom : height,
        ])
        .toString();
};
