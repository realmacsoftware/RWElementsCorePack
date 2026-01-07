const TextSimple = [
    {
        title: "Align",
        id: "textSimpleTextAlign",
        segmented: {
            use: "TextAlign",
        },
    },
    {
        title: "Color",
        id: "textSimpleTextColor",
        format: "text-{{value}}",
        themeColor: {
            default: {
                name: "text",
                brightness: 100,
            },
        },
    },
    {
        title: "Opacity",
        id: "textSimpleTextColorOpacity",
        format: "[{{value}}%]",
        responsive: false,
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
    {
        title: "Font Family",
        id: "textSimpleFonts",
        themeFont: {
            default: {
                base: {
                    name: "body",
                },
            },
        },
    },
    {
        title: "Text Style",
        id: "textSimpleTextStyles",
        themeTextStyle: {
            default: {
                base: {
                    name: "base",
                },
            },
        },
    },
];

export default TextSimple;
