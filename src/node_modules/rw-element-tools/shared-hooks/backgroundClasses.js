/**
 * Generates background color classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const bgColorClasses = (rw) => {
    const { bgColor, bgColorOpacity, bgColorHover, bgColorOpacityHover } =
        rw.props;

    const classes = classnames();

    if (bgColor) {
        classes.add([bgColor, bgColorOpacity]);
    }

    if (bgColorHover) {
        classes.add([bgColorHover, `hover:${bgColorOpacityHover}`]);
    }

    return classes.toString();
};

/**
 * Generates background gradient classes
 *
 * @param {Object} rw - The rw context object containing.
 * @returns {string} The generated class string.
 */
const bgGradient = (rw) => {
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
    } = rw.props;

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
            wantsViaHover === "true" && `${viaColorHover}/${viaOpacityHover}`,
            wantsViaHover === "true" && `${viaPositionHover}`,
        ])
        .toString();
};

/**
 * Generates background image classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @param {Object} rw - The resource wrapper object for handling images.
 * @returns {string} The generated class string.
 */
const bgImage = (rw) => {
    const {
        bgImage,
        bgImagePositionX,
        bgImagePositionY,
        bgImageSize,
        bgImageRepeat,

        bgImageHover,
        bgImagePositionXHover,
        bgImagePositionYHover,
        bgImageSizeHover,
        bgImageRepeatHover,
    } = rw.props;

    validateProps(
        [
            "bgImage",
            "bgImagePositionX",
            "bgImagePositionY",
            "bgImageSize",
            "bgImageRepeat",
            "bgImageHover",
            "bgImagePositionXHover",
            "bgImagePositionYHover",
            "bgImageSizeHover",
            "bgImageRepeatHover",
        ],
        rw.props
    );

    // @TODO: add responsive image support
    // loop over breakpoints, resize image, and add {breakpoint}:bg-[url()] classes

    const hoverBg = bgImageHover
        ? `hover:bg-[url(${rw.getResource(bgImageHover, 1200)})]`
        : "";

    const classes = classnames().add([
        `bg-[url(${rw.getResource(bgImage, 1200)})]`,
        getBackgroundPosition(bgImagePositionX, bgImagePositionY),
        `bg-${bgImageSize}`,
        bgImageRepeat,
    ]);

    if (hoverBg) {
        classes.add([
            hoverBg,
            `hover:${getBackgroundPosition(
                bgImagePositionXHover,
                bgImagePositionYHover
            )}`,
            `hover:bg-${bgImageSizeHover}`,
            `hover:${bgImageRepeatHover}`,
        ]);
    }

    return classes.toString();
};

const bgVideo = (rw) => {
    const { bgVideo } = rw.props;

    validateProps(["bgVideo"], rw.props);

    const classes = classnames().add([
        `bg-[url(${rw.getResource(bgVideo, 1200)})]`,
        `bg-center`,
        `bg-cover`,
    ]);

    return classes.toString();
};

/**
 * Gets the background position class based on x and y coordinates.
 *
 * @param {string} x - The x-coordinate for background position.
 * @param {string} y - The y-coordinate for background position.
 * @returns {string} The background position class.
 */
const getBackgroundPosition = (x, y) => {
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

/**
 * Generates background classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @param {string} [modifier=""] - Optional CSS modifier (e.g., 'hover', 'focus').
 * @param {Object} [rw=null] - The resource wrapper object for handling images.
 * @returns {string} The generated class string.
 */
const backgroundClasses = (rw, modifier = "") => {
    const { bgType } = rw.props;

    if (!bgType) {
        console.error("backgroundClasses(): props.bgType is required.");
        return "";
    }

    switch (bgType) {
        case "color":
            return bgColorClasses(rw, modifier);
        case "gradient":
            return bgGradient(rw, modifier);
        case "image":
            return bgImage(rw, modifier);
        case "video":
            return bgVideo(rw, modifier);
        case "none":
            return "";
        default:
            console.error("Invalid background type:", bgType);
            return "";
    }
};
