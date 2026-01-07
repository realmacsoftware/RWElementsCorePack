const globalOutline = (rw) => {
    const {
        globalControlTypeOutline,
        globalOutlineStyle,
        globalOutlineColor,
        globalOutlineColorOpacity,
        globalOutlineWidth,
        globalOutlineOffset,

        globalOutlineColorFocus,
        globalOutlineColorOpacityFocus,
        globalOutlineWidthFocus,
        globalOutlineOffsetFocus,
    } = rw.props;
    
    const classes = classnames();
    if (globalControlTypeOutline == 'none') {
        return '';
    }

    if (globalControlTypeOutline != 'none') {
        classes.add([
            `${globalOutlineStyle}`,
            `${globalOutlineColor}/${globalOutlineColorOpacity}`,
            globalOutlineWidth,
            globalOutlineOffset,
        ]);
    }

    if (globalControlTypeOutline == 'focus') {
        classes.add([
            `${globalOutlineColorFocus}/${globalOutlineColorOpacityFocus}`,
            globalOutlineWidthFocus,
            globalOutlineOffsetFocus,
        ]);
    }
    
    return classes.toString();
}