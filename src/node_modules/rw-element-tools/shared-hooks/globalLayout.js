const getHiddenClasses = (hidden = {}, defaultDisplay = "block") => {
    if (Object.keys(hidden).length === 0) {
        return defaultDisplay;
    }

    return Object.entries(hidden).reduce((classes, [breakpoint, isHidden]) => {
        const modifier = breakpoint === "base" ? "" : `${breakpoint}:`;
        const className = isHidden
            ? `${modifier}hidden`
            : `${modifier}${defaultDisplay}`;
        return classes ? `${classes} ${className}` : className;
    }, "");
};

const globalLayout = (app, args = {}) => {
    const {
        globalLayoutPosition: position,
        globalLayoutZIndexType: zIndexType,
        globalLayoutZIndex: zIndex,

        globalLayoutTopRightBottomLeftType: topRightBottomLeftType,
        globalLayoutInset: inset,
        globalLayoutTop: top,
        globalLayoutRight: right,
        globalLayoutBottom: bottom,
        globalLayoutLeft: left,

        globalLayoutOverflow: overflow,
        globalLayoutIsolation: isolation,
        globalLayoutVisibility: visibility,
    } = app.props;

    const { globalLayoutHidden } = app.responsiveProps;
    const { defaultDisplay } = args;

    const hidden = getHiddenClasses(globalLayoutHidden, defaultDisplay);

    return classnames([
        position,
        zIndexType !== "custom" ? zIndexType : zIndex,
        topRightBottomLeftType === "uniform" && inset,
        ...(topRightBottomLeftType === "individual"
            ? [top, right, bottom, left].filter(Boolean)
            : []),
        overflow,
        isolation,
        visibility,
        hidden,
    ]).toString();
};
