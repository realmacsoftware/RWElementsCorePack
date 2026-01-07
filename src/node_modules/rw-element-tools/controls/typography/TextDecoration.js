const TextDecoration = [
    {
        title: "Underline",
        id: "textDecoration",
        select: {
            default: "no-underline",
            items: [
                {
                    value: "no-underline",
                    title: "No Underline",
                },
                {
                    value: "underline",
                    title: "Underline",
                },
                {
                    value: "overline",
                    title: "Overline",
                },
                {
                    value: "line-through",
                    title: "Line Through",
                },
            ],
        },
    },
    {
        visible: "textDecoration != 'no-underline'",
        title: "Thickness",
        id: "textDecorationThickness",
        format: "decoration-[{{value}}px]",
        slider: {
            default: 1,
            use: "Slider",
            max: 30,
        },
    },
    {
        visible: "textDecoration == 'underline'",
        information: {},
        title: "Thickness is currently applied in preview only.",
    },
    {
        visible: "textDecoration == 'underline'",
        title: "Offset",
        id: "textDecorationOffset",
        format: "underline-offset-[{{value}}px]",
        slider: {
            default: 1,
            use: "Slider",
            max: 30,
        },
    },
    {
        visible: "textDecoration != 'no-underline'",
        title: "Style",
        id: "textDecorationStyle",
        format: "decoration-{{value}}",
        select: {
            default: "solid",
            items: [
                {
                    value: "solid",
                    title: "Solid",
                },
                {
                    value: "double",
                    title: "Double",
                },
                {
                    value: "dotted",
                    title: "Dotted",
                },
                {
                    value: "dashed",
                    title: "Dashed",
                },
                {
                    value: "wavy",
                    title: "Wavy",
                },
            ],
        },
    },
    {
        visible: "textDecoration != 'no-underline'",
        title: "Color",
        id: "textDecorationColor",
        format: "decoration-{{value}}",
        themeColor: {
            default: {
                name: "gray",
                brightness: 800,
            },
        },
    },
];

export default TextDecoration;
