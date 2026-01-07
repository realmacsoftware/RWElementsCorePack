export const SVG = [
    {
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'svg' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'svg')",
        title: "SVG",
        id: "globalBgSVGResource",
        resource: {},
    },
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'svg')",
        title: "SVG",
        id: "globalBgSVGResourceEnd",
        resource: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Color",
        id: "globalBgSVGColor",
        format: "text-{{value}} [&>svg]:fill-current",
        themeColor: {
            default: {
                name: "surface",
                brightness: 500,
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Opacity",
        id: "globalBgSVGOpacity",
        format: "opacity-[{{value}}%]",
        slider: {
            use: "Slider",
            units: "%",
            default: 100,
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Width",
        heading: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Fixed",
        id: "globalBgSVGFixedWidth",
        format: "[&>svg]:w-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    custom: true,
                    value: "100%",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Max",
        id: "globalBgSVGMaxWidth",
        format: "[&>svg]:max-w-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    custom: true,
                    value: "100%",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Min",
        id: "globalBgSVGMinWidth",
        format: "[&>svg]:min-w-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Height",
        heading: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Fixed",
        id: "globalBgSVGFixedHeight",
        format: "[&>svg]:h-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Max",
        id: "globalBgSVGMaxHeight",
        format: "[&>svg]:max-h-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Min",
        id: "globalBgSVGMinHeight",
        format: "[&>svg]:min-h-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        divider: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Position",
        heading: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Top",
        id: "globalBgSVGPositionTop",
        format: "[&>svg]:top-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "0",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Right",
        id: "globalBgSVGPositionRight",
        format: "[&>svg]:right-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Bottom",
        id: "globalBgSVGPositionBottom",
        format: "[&>svg]:bottom-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "auto",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Left",
        id: "globalBgSVGPositionLeft",
        format: "[&>svg]:left-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "0",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Translate",
        heading: {},
    },
    {
        visible: "globalBgType == 'svg'",
        title: "X",
        id: "globalBgSVGTranslateX",
        format: "[&>svg]:translate-x-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "0",
                },
            },
        },
    },
    {
        visible: "globalBgType == 'svg'",
        title: "Y",
        id: "globalBgSVGTranslateY",
        format: "[&>svg]:translate-y-{{value}}",
        themeSpacing: {
            mode: "single",
            default: {
                base: {
                    value: "0",
                },
            },
        },
    },
];

export default SVG;
