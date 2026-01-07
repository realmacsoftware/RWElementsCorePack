const buttonSimple = (rw) => {
    const {
        buttonSimpleSize,
        buttonSimpleFonts,
        buttonSimpleTextColor,
        buttonSimpleTextColorOpacity,
        buttonSimpleBgColor,
        buttonSimpleBgColorOpacity,
        buttonSimpleBoxShadow,

        buttonSimpleTextColorHover,
        buttonSimpleTextColorOpacityHover,
        buttonSimpleBgColorHover,
        buttonSimpleBgOpacityHover,
        buttonSimpleBoxShadowHover,
        buttonSimpleBorderRadius,

        buttonSimpleStyle,
        buttonSimpleStyleHover,
    } = rw.props;

    validateProps(
        [
            "buttonSimpleSize",
            "buttonSimpleFonts",
            "buttonSimpleTextColor",
            "buttonSimpleTextColorOpacity",
            "buttonSimpleBgColor",
            "buttonSimpleBgColorOpacity",
            "buttonSimpleBoxShadow",

            "buttonSimpleTextColorHover",
            "buttonSimpleTextColorOpacityHover",
            "buttonSimpleBgColorHover",
            "buttonSimpleBgOpacityHover",
            "buttonSimpleBoxShadowHover",
            "buttonSimpleBorderRadius",
            "buttonSimpleStyle",
            "buttonSimpleStyleHover",
        ],
        rw.props
    );

    const buttonSizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const isSolid = buttonSimpleStyle === "solid";
    const isSolidHover = buttonSimpleStyleHover === "solid";

    return classnames()
        .add([
            `flex items-center justify-center leading-none`,
            `transition-all duration-200 ease-in-out cursor-pointer border-2`,
            `border-${buttonSimpleBgColor}/${buttonSimpleBgColorOpacity}`,
            isSolid
                ? `bg-${buttonSimpleBgColor}/${buttonSimpleBgColorOpacity}`
                : "bg-transparent",
            buttonSizes[buttonSimpleSize] || buttonSizes.md,
            buttonSimpleFonts,
            `${buttonSimpleTextColor}/${buttonSimpleTextColorOpacity}`,
            buttonSimpleBoxShadow,
            `hover:${buttonSimpleTextColorHover}/${buttonSimpleTextColorOpacityHover}`,
            `hover:border-${buttonSimpleBgColorHover}/${buttonSimpleBgOpacityHover}`,
            isSolidHover
                ? `hover:bg-${buttonSimpleBgColorHover}/${buttonSimpleBgOpacityHover}`
                : "hover:bg-transparent",
            buttonSimpleBoxShadowHover,
            buttonSimpleBorderRadius,
        ])
        .toString();
};

const buttonSecondarySimple = (rw) => {
    const {
        buttonSecondarySimpleSize,
        buttonSecondarySimpleFonts,
        buttonSecondarySimpleStyle,

        buttonSecondarySimpleTextColor,
        buttonSecondarySimpleTextColorOpacity,
        buttonSecondarySimpleBgColor,
        buttonSecondarySimpleBgColorOpacity,
        buttonSecondarySimpleBoxShadow,

        buttonSecondarySimpleStyleHover,
        buttonSecondarySimpleTextColorHover,
        buttonSecondarySimpleTextColorOpacityHover,
        buttonSecondarySimpleBgColorHover,
        buttonSecondarySimpleBgOpacityHover,
        buttonSecondarySimpleBoxShadowHover,
        buttonSecondarySimpleBorderRadius,
    } = rw.props;

    validateProps(
        [
            "buttonSecondarySimpleSize",
            "buttonSecondarySimpleFonts",
            "buttonSecondarySimpleStyle",
            "buttonSecondarySimpleTextColor",
            "buttonSecondarySimpleTextColorOpacity",
            "buttonSecondarySimpleBgColor",
            "buttonSecondarySimpleBgColorOpacity",
            "buttonSecondarySimpleBoxShadow",

            "buttonSecondarySimpleStyleHover",
            "buttonSecondarySimpleTextColorHover",
            "buttonSecondarySimpleTextColorOpacityHover",
            "buttonSecondarySimpleBgColorHover",
            "buttonSecondarySimpleBgOpacityHover",
            "buttonSecondarySimpleBoxShadowHover",
            "buttonSecondarySimpleBorderRadius",
        ],
        rw.props
    );

    const buttonSizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const isSolid = buttonSecondarySimpleStyle === "solid";
    const isSolidHover = buttonSecondarySimpleStyleHover === "solid";

    return classnames()
        .add([
            `transition-all duration-200 ease-in-out`,
            buttonSizes[buttonSecondarySimpleSize] || buttonSizes.md,
            buttonSecondarySimpleFonts,

            `flex items-center justify-center leading-none`,
            `cursor-pointer border-2`,
            `border-${buttonSecondarySimpleBgColor}/${buttonSecondarySimpleBgColorOpacity}`,
            isSolid
                ? `bg-${buttonSecondarySimpleBgColor}/${buttonSecondarySimpleBgColorOpacity}`
                : "bg-transparent",
            `${buttonSecondarySimpleTextColor}/${buttonSecondarySimpleTextColorOpacity}`,
            buttonSecondarySimpleBoxShadow,

            `hover:border-${buttonSecondarySimpleBgColorHover}/${buttonSecondarySimpleBgOpacityHover}`,
            isSolidHover
                ? `hover:bg-${buttonSecondarySimpleBgColorHover}/${buttonSecondarySimpleBgOpacityHover}`
                : "hover:bg-transparent",
            `${buttonSecondarySimpleTextColorHover}/${buttonSecondarySimpleTextColorOpacityHover}`,
            buttonSecondarySimpleBoxShadowHover,

            buttonSecondarySimpleBorderRadius,
        ])
        .toString();
};
