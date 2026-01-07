const _bgPosition = (x, y) => {
    const mappings = {
        "center-top": "bg-top",
        "center-bottom": "bg-bottom",
        "left-center": "bg-left",
        "right-center": "bg-right",
        "center-center": "bg-center",
    };

    const key = `${x}-${y}`;
    return mappings[key] || `bg-${key}`;
};

const _bgColorClasses = (props = {}, state = null) => {
    const prefix = state === "hover" ? "hover:" : "";
    let color, opacity; // Declare variables outside if-else statement

    if (state === "hover") {
        ({ bgColorHover: color, bgColorOpacity: opacity } = props); // Destructure inside if block
    } else {
        ({ bgColor: color, bgColorOpacity: opacity } = props); // Destructure inside else block
    }

    if (!color || !opacity) {
        console.warn(
            "getBackgroundColorClasses(): One or more required properties are missing",
            { color, opacity, state }
        );
        return "";
    }

    return `${prefix}bg-${color}/${opacity}`;
};

const _bgGradient = (props = {}, prefix = null) => {
    if (!props.bgType || props.bgType !== "gradient") {
        console.warn("bgGradient(): bgType is not set to 'gradient'");
        return "";
    }

    if (prefix === "hover:") {
        // @TODO: Fix hover state
        ({
            bgGradientDirection: direction,
            bgGradientStops: stops,
            bgColor: color,
            bgColorOpacity: opacity,
            bgColorPosition: position,
            bgColor2: color2,
            bgColor2Opacity: opacity2,
            bgColor2Position: position2,
            bgColor3: color3,
            bgColor3Opacity: opacity3,
            bgColor3Position: position3,
        } = props);
    } else {
        ({
            bgType: type,
            bgGradientDirection: direction,
            gradientFromColor: from,
            gradientFromOpacity: fromOpacity,
            gradientFromPosition: fromPosition,
            gradientToColor: to,
            gradientToOpacity: toOpacity,
            gradientToPosition: toPosition,
            wantsGradientVia: wantsVia,
            gradientViaColor: via,
            gradientViaOpacity: viaOpacity,
            gradientViaPosition: viaPosition,
        } = props);
    }

    // check that all values are present, if not log a warning
    if (
        !direction ||
        !from ||
        !fromOpacity ||
        !fromPosition ||
        !to ||
        !toOpacity ||
        !toPosition ||
        (wantsVia && (!via || !viaOpacity || !viaPosition))
    ) {
        console.warn(
            "helpers.bgGradient(): One or more required properties are missing",
            {
                direction,
                from,
                fromOpacity,
                fromPosition,
                to,
                toOpacity,
                toPosition,
                wantsVia,
                via,
                viaOpacity,
                viaPosition,
            }
        );
        return "";
    }

    return [
        `${prefix}${direction}`,
        `${prefix}${from}/${fromOpacity} ${prefix}${fromPosition}`,
        wantsVia == "true"
            ? `${prefix}${via}/${viaOpacity} ${prefix}${viaPosition}`
            : "",
        `${prefix}${to}/${toOpacity} ${prefix}${toPosition}`,
    ]
        .filter(Boolean)
        .join(" ");
};

const _bgImageClasses = (props = {}, state = null) => {
    if (state === "hover:") {
        ({
            bgImageHover: image,
            bgImagePositionX: positionX,
            bgImagePositionY: positionY,
            bgImageSize: size,
            bgImageRepeat: repeat,
        } = props);
    } else {
        ({
            bgImage: image,
            bgImagePositionX: positionX,
            bgImagePositionY: positionY,
            bgImageSize: size,
            bgImageRepeat: repeat,
        } = props);
    }

    if (!image || !positionX || !positionY || !size || !repeat) {
        console.warn(
            "bgImageClasses(): One or more required properties are missing",
            { image, positionX, positionY, size, repeat }
        );
        return "";
    }

    return [
        `${prefix}bg-[url(${image.image})]`,
        `${prefix}${bgPosition(positionX, positionY)}`,
        `${prefix}bg-${size}`,
        `${prefix}${repeat}`,
    ]
        .filter(Boolean)
        .join(" ");
};

const getHTMLTag = (props = {}, fallback = "div") => {
    const { HTMLTag, HTMLTagCustom } = props;

    if (HTMLTag === "custom") {
        //strip out any non- a to z characters from the custom tag
        const regex = /[^a-zA-Z]/g;
        const safeTag = HTMLTagCustom.replace(regex, "").toLowerCase();
        return safeTag !== "" ? safeTag : fallback;
    }

    return !HTMLTag || HTMLTag == "default" ? fallback : HTMLTag;
};

const helpers = {
    bgColorClasses: _bgColorClasses,
    bgGradient: _bgGradient,
    bgPosition: _bgPosition,
    bgImageClasses: _bgImageClasses,
    getHTMLTag,
};
