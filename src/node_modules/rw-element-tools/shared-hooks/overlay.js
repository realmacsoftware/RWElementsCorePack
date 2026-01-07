const overlay = (rw) => {
    const { overlayColor, overlayOpacity, overlayBlur } = rw.props;

    validateProps(["overlayColor", "overlayOpacity", "overlayBlur"], rw.props);

    return classnames()
        .add([overlayColor, overlayOpacity, overlayBlur])
        .toString();
};
