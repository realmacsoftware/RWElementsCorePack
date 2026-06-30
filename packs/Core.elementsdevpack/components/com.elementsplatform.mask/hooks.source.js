const asPercent = (value) => {
    const formattedValue = `${value ?? 0}`.trim();
    return formattedValue.endsWith("%") ? formattedValue : `${formattedValue}%`;
};

const asDegrees = (value) => {
    const formattedValue = `${value ?? 0}`.trim();
    return formattedValue.endsWith("deg") ? formattedValue : `${formattedValue}deg`;
};

const arbitraryValue = (value, fallback) => `${value || fallback}`.trim().replace(/\s+/g, "_");

const maskSizeClass = (size, customSize) => {
    return size === "custom" ? `mask-size-[${arbitraryValue(customSize, "100%_100%")}]` : size;
};

const maskClasses = (rw) => {
    const {
        maskType,
        maskResource,
        maskMode,
        maskSize,
        maskCustomSize,
        maskPosition,
        maskRepeat,
        maskEdgeSide,
        maskEdgeFrom,
        maskEdgeTo,
        maskLinearAngle,
        maskLinearFrom,
        maskLinearTo,
        maskRadialSize,
        maskRadialPosition,
        maskRadialFrom,
        maskRadialTo,
        maskConicAngle,
        maskConicFrom,
        maskConicTo,
    } = rw.props;

    switch (maskType) {
        case "svg": {
            if (!maskResource?.image) return ["mask-none"];

            const encodedSvg = encodeURIComponent(maskResource.image);
            return [
                `mask-[url('data:image/svg+xml,${encodedSvg}')]`,
                maskMode,
                maskSizeClass(maskSize, maskCustomSize),
                maskPosition,
                maskRepeat,
            ];
        }
        case "edge":
            return [
                `mask-${maskEdgeSide}-from-[${asPercent(maskEdgeFrom)}]`,
                `mask-${maskEdgeSide}-to-[${asPercent(maskEdgeTo)}]`,
            ];
        case "linear":
            return [
                `mask-linear-[${asDegrees(maskLinearAngle)}]`,
                `mask-linear-from-[${asPercent(maskLinearFrom)}]`,
                `mask-linear-to-[${asPercent(maskLinearTo)}]`,
            ];
        case "radial":
            return [
                maskRadialSize,
                maskRadialPosition,
                `mask-radial-from-[${asPercent(maskRadialFrom)}]`,
                `mask-radial-to-[${asPercent(maskRadialTo)}]`,
            ];
        case "conic":
            return [
                `mask-conic-[${asDegrees(maskConicAngle)}]`,
                `mask-conic-from-[${asPercent(maskConicFrom)}]`,
                `mask-conic-to-[${asPercent(maskConicTo)}]`,
            ];
        case "none":
        default:
            return ["mask-none"];
    }
};

const transformHook = (rw) => {
    const { globalID } = rw.props;
    const { id } = rw.node;

    const classes = {
        wrapper: classnames([
            `group/${id} group/mask`,
            globalID && `group/${globalID}`,
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            advancedClasses(rw),
        ]).toString(),
        mask: classnames([
            "block w-full h-full",
            globalTransitions(rw),
            maskClasses(rw),
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: { id: globalID },
    });

    if ((globalID || "").length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({ classes });
};

exports.transformHook = transformHook;
