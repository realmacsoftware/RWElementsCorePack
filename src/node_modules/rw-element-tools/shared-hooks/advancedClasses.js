const advancedClasses = (rw) => {
    const { display, cssClasses, overflow, zIndex } = rw.props;

    return classnames([display, cssClasses, overflow, zIndex]).toString();
};
