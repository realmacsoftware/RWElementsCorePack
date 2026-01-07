const globalEffects = (app, args = {}) => {
    const {
        globalEffectsApplyTo: applyTo,
        globalControlTypeEffects: type,
        globalHoverGroupEffects: hoverGroup,
        globalHoverGroupCustomIdEffects: customId,
        globalBoxShadow: boxShadow,
        globalOpacity: opacity,
        globalBoxShadowEnd: boxShadowEnd,
        globalOpacityEnd: opacityEnd,
    } = app.props;

    const { node } = app;

    node.isContainer = args.isContainer || false;
    const wantsActive = args.active || false;
    const wantsFocus = args.focus || false;
    const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);

    const classes = [];

    if (type != "none") {
        classes.push(boxShadow, opacity);
    }

    if (type == "hover") {
        classes.push(`${prefix}:${boxShadowEnd}`, `${prefix}:${opacityEnd}`);

        if (wantsActive) {
            classes.push(
                `data-[active=true]:${boxShadowEnd}`,
                `data-[active=true]:${opacityEnd}`
            );
        }

        if (wantsFocus) {
            classes.push(
                `${prefix.replace(/hover/g, "focus")}:${boxShadowEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${opacityEnd}`
            );
        }
    }

    return classnames(classes).toString();
};
