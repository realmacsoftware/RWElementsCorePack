export const Border = [
    {
        title: "Style",
        id: "borderStyle",
        format: "border-{{value}}",
        segmented: {
            default: "none",
            items: [
                {
                    icon: "square.slash",
                    value: "none",
                },
                {
                    icon: "square",
                    value: "solid",
                },
                {
                    icon: "square.dashed",
                    value: "dashed",
                },
                {
                    icon: "square.dotted",
                    value: "dotted",
                },
            ],
        },
    },
    {
        visible: "borderStyle != 'none'",
        title: "Color",
        id: "borderColor",
        format: "border-{{value}}",
        themeColor: {
            default: {
                name: "surface",
                brightness: 500,
            },
        },
    },
    {
        visible: "borderStyle != 'none'",
        title: "Opacity",
        id: "borderColorOpacity",
        format: "[{{value}}%]",
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
    {
        visible: "borderStyle != 'none'",
        title: "Width",
        id: "borderWidth",
        themeBorderWidth: {
            default: {
                base: {
                    top: "2",
                    right: "2",
                    bottom: "2",
                    left: "2",
                    linkHorizontal: true,
                    linkVertical: true,
                },
            },
        },
    },
];

export const BorderHover = [
    {
        visible: "borderStyle != 'none'",
        title: "Color",
        id: "borderColorHover",
        format: "hover:border-{{value}}",
        themeColor: {
            base: {
                name: "gray",
                brightness: 500,
            },
        },
    },
    {
        visible: "borderStyle != 'none'",
        title: "Opacity",
        id: "borderColorOpacityHover",
        format: "[{{value}}%]",
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
    {
        visible: "borderStyle != 'none'",
        title: "Width",
        id: "borderWidthHover",
        format: "hover:{{value}}",
        themeBorderWidth: {
            default: {
                base: {
                    top: "2",
                    right: "2",
                    bottom: "2",
                    left: "2",
                    linkHorizontal: true,
                    linkVertical: true,
                },
            },
        },
    },
];

export default Border;
