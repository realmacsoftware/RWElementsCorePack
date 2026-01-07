const globalFilters = (app, args = {}) => {
    const {
        globalControlTypeFilters: type,
        globalHoverGroupFilters: hoverGroup,
        globalHoverGroupCustomIdFilters: customId,
        globalFiltersApplyTo: applyTo,
        // filters
        globalFiltersBlur: blur,
        globalFiltersBrightness: brightness,
        globalFiltersDropShadow: dropShadow,
        globalFiltersSaturate: saturate,

        // backdrop filters
        globalFiltersBackdropBlur: backdropBlur,

        // end filters
        globalFiltersBlurEnd: blurEnd,
        globalFiltersBrightnessEnd: brightnessEnd,
        globalFiltersDropShadowEnd: dropShadowEnd,
        globalFiltersSaturateEnd: saturateEnd,

        // end backdrop filters
        globalFiltersBackdropBlurEnd: backdropBlurEnd,
    } = app.props;

    const { node } = app;

    node.isContainer = args.isContainer || false;
    const wantsActive = args.active || false;
    const wantsFocus = args.focus || false;
    const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);

    if (type == "none") {
        return "";
    }

    const wantsBlur = !blur.endsWith("[0px]") || !blurEnd.endsWith("[0px]");
    const wantsBackdropBlur =
        !backdropBlur.endsWith("[0px]") || !backdropBlurEnd.endsWith("[0px]");

    const classes = [
        wantsBlur ? blur : "",
        brightness,
        dropShadow,
        saturate,
        wantsBackdropBlur ? backdropBlur : "",
    ];

    if (type == "hover") {
        classes.push(
            wantsBlur ? `${prefix}:${blurEnd}` : "",
            `${prefix}:${brightnessEnd}`,
            `${prefix}:${dropShadowEnd}`,
            `${prefix}:${saturateEnd}`,
            wantsBackdropBlur ? `${prefix}:${backdropBlurEnd}` : ""
        );

        if (wantsActive) {
            classes.push(
                `data-[active=true]:${blurEnd}`,
                `data-[active=true]:${brightnessEnd}`,
                `data-[active=true]:${dropShadowEnd}`,
                `data-[active=true]:${saturateEnd}`,
                `data-[active=true]:${backdropBlurEnd}`
            );
        }

        if (wantsFocus) {
            classes.push(
                `${prefix.replace(/hover/g, "focus")}:${blurEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${brightnessEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${dropShadowEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${saturateEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${backdropBlurEnd}`
            );
        }
    }

    return classnames(classes).toString();
};
