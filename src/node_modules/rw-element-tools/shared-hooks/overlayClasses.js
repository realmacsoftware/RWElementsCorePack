const extractBackgroundProps = (props, prefix, keyMap) => {
    return Object.entries(keyMap).reduce((acc, [finalKey, suffix]) => {
        const propName = `${prefix}${suffix}`;
        if (props.hasOwnProperty(propName)) {
            acc[finalKey] = props[propName];
        }
        return acc;
    }, {});
};

const mapPropsToBackground = (app, prefix) => {
    if (!prefix) {
        console.warn("mapPropsToBackground: prefix is required");
        return {};
    }

    const { props } = app;

    const backgroundKeyMap = {
        bgColor: "Color",
        bgColorOpacity: "ColorOpacity",
        bgGradientDirection: "GradientDirection",
        gradientFromColor: "GradientFromColor",
        gradientFromOpacity: "GradientFromOpacity",
        gradientFromPosition: "GradientFromPosition",
        gradientToColor: "GradientToColor",
        gradientToOpacity: "GradientToOpacity",
        gradientToPosition: "GradientToPosition",
        wantsGradientVia: "WantsGradientVia",
        gradientViaColor: "GradientViaColor",
        gradientViaOpacity: "GradientViaOpacity",
        gradientViaPosition: "GradientViaPosition",
    };

    return extractBackgroundProps(props, prefix, backgroundKeyMap);
};

const overlayClasses = (app) => {
    const overlayProps = mapPropsToBackground(app, "overlay");
    const { overlayBlur, overlayType } = app.props;

    const bgColorClasses = () => {
        const { bgColor, bgColorOpacity, bgColorHover, bgColorOpacityHover } =
            overlayProps;

        const classes = classnames();

        if (bgColor) {
            classes.add([bgColor, bgColorOpacity]);
        }

        if (bgColorHover) {
            classes.add([bgColorHover, `hover:${bgColorOpacityHover}`]);
        }

        return classes.toString();
    };

    const bgGradient = () => {
        const {
            bgGradientDirection: direction,
            gradientFromColor: fromColor,
            gradientFromOpacity: fromOpacity,
            gradientFromPosition: fromPosition,
            gradientToColor: toColor,
            gradientToOpacity: toOpacity,
            gradientToPosition: toPosition,
            wantsGradientVia: wantsVia,
            gradientViaColor: viaColor,
            gradientViaOpacity: viaOpacity,
            gradientViaPosition: viaPosition,

            bgGradientDirectionHover: directionHover,
            gradientFromColorHover: fromColorHover,
            gradientFromOpacityHover: fromOpacityHover,
            gradientFromPositionHover: fromPositionHover,
            gradientToColorHover: toColorHover,
            gradientToOpacityHover: toOpacityHover,
            gradientToPositionHover: toPositionHover,
            wantsGradientViaHover: wantsViaHover,
            gradientViaColorHover: viaColorHover,
            gradientViaOpacityHover: viaOpacityHover,
            gradientViaPositionHover: viaPositionHover,
        } = overlayProps;

        return classnames()
            .add([
                direction,
                `${fromColor}/${fromOpacity}`,
                `${fromPosition}`,
                `${toColor}/${toOpacity}`,
                `${toPosition}`,
                wantsVia === "true" && `${viaColor}/${viaOpacity}`,
                wantsVia === "true" && `${viaPosition}`,

                directionHover,
                fromColorHover && `${fromColorHover}/${fromOpacityHover}`,
                fromPositionHover && `${fromPositionHover}`,
                toColorHover && `${toColorHover}/${toOpacityHover}`,
                toPositionHover && `${toPositionHover}`,
                wantsViaHover === "true" &&
                    `${viaColorHover}/${viaOpacityHover}`,
                wantsViaHover === "true" && `${viaPositionHover}`,
            ])
            .toString();
    };

    const classes = classnames([overlayBlur]);

    switch (overlayType) {
        case "color":
            classes.add([bgColorClasses()]);
            break;
        case "gradient":
            classes.add([bgGradient()]);
            break;
        default:
            console.error("Invalid background type:", overlayType);
    }

    // const bgClasses = backgroundClasses(props);

    return classes.toString();
};
