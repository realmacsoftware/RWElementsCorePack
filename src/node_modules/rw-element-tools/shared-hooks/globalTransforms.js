const globalTransforms = (app, args = {}) => {
    const {
        globalControlTypeTransforms: type,
        globalHoverGroupTransforms: hoverGroup,
        globalHoverGroupCustomIdTransforms: customId,
        globalTransformsApplyTo: applyTo,
        globalTransformOrigin: origin,
        globalTransformScale: scale,
        globalTransformRotate: rotate,
        globalTransformSkewX: skewX,
        globalTransformSkewY: skewY,
        globalTransformTranslateX: translateX,
        globalTransformTranslateY: translateY,
        globalTransformScaleEnd: scaleEnd,
        globalTransformRotateEnd: rotateEnd,
        globalTransformSkewXEnd: skewXEnd,
        globalTransformSkewYEnd: skewYEnd,
        globalTransformTranslateXEnd: translateXEnd,
        globalTransformTranslateYEnd: translateYEnd,
    } = app.props;

    const { node } = app;

    node.isContainer = args.isContainer || false;
    const wantsActive = args.active || false;
    const wantsFocus = args.focus || false;

    const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
    const classes = classnames();

    if (type != "none") {
        classes.add([
            "transform",
            origin,
            scale,
            rotate,
            skewX,
            skewY,
            translateX,
            translateY,
        ]);
    }

    if (type == "hover") {
        classes.add([
            addPrefixToTailwindClasses(scaleEnd, prefix),
            addPrefixToTailwindClasses(rotateEnd, prefix),
            addPrefixToTailwindClasses(skewXEnd, prefix),
            addPrefixToTailwindClasses(skewYEnd, prefix),
            addPrefixToTailwindClasses(translateXEnd, prefix),
            addPrefixToTailwindClasses(translateYEnd, prefix),
        ]);

        if (wantsActive) {
            classes.add([
                `data-[active=true]:${scaleEnd}`,
                `data-[active=true]:${rotateEnd}`,
                `data-[active=true]:${skewXEnd}`,
                `data-[active=true]:${skewYEnd}`,
                `data-[active=true]:${translateXEnd}`,
                `data-[active=true]:${translateYEnd}`,
            ]);
        }

        if (wantsFocus) {
            classes.add([
                `${prefix.replace(/hover/g, "focus")}:${scaleEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${rotateEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${skewXEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${skewYEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${translateXEnd}`,
                `${prefix.replace(/hover/g, "focus")}:${translateYEnd}`,
            ]);
        }
    }

    return classes.toString();
};
