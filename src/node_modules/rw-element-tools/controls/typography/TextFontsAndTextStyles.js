const TextFontsAndTextStyles = [
    {
        title: "Font",
        id: "globalTextFontFamily",
        themeFont: {
            default: {
                base: {
                    name: "body",
                },
            },
        },
    },
    {
        title: "Size",
        id: "globalTextFontSize",
        themeTextStyle: {
            default: {
                base: {
                    name: "base",
                },
            },
        },
    },
    {
        title: "Weight",
        id: "globalTextFontWeight",
        format: "font-[{{value}}]",
        slider: {
            default: "400",
            items: [
                { value: "100", title: "Thin" },
                { value: "200", title: "Extra Light" },
                { value: "300", title: "Light" },
                { value: "400", title: "Normal" },
                { value: "500", title: "Medium" },
                { value: "600", title: "Semi Bold" },
                { value: "700", title: "Bold" },
                { value: "800", title: "Extra Bold" },
                { value: "900", title: "Black" },
            ],
        },
    },
    {
        title: "Spacing",
        id: "globalTextLetterSpacing",
        format: "tracking-{{value}}",
        slider: {
            default: "normal",
            items: [
                { value: "tighter", title: "Tighter" },
                { value: "tight", title: "Tight" },
                { value: "normal", title: "Normal" },
                { value: "wide", title: "Wide" },
                { value: "wider", title: "Wider" },
                { value: "widest", title: "Widest" },
            ],
        },
    },
    {
        title: "Line Height",
        id: "globalTextLineHeight",
        format: "leading-{{value}}",
        slider: {
            default: "normal",
            items: [
                { value: "none", title: "None" },
                { value: "tight", title: "Tight" },
                { value: "snug", title: "Snug" },
                { value: "normal", title: "Normal" },
                { value: "relaxed", title: "Relaxed" },
                { value: "loose", title: "Loose" },
            ],
        },
    },
    {
        divider: {},
    },
    {
        title: "Italic",
        id: "globalTextItalic",
        switch: {
            falseValue: "not-italic",
            trueValue: "italic",
            default: false,
        },
    },
    {
        title: "Text Shadow",
        id: "globalTextTextShadow",
        disabled: {
            id: "bgType",
            value: "image",
        },
        themeShadow: {
            mode: "text",
            default: {
                name: "none",
            },
        },
    },
    {
        title: "Case",
        id: "globalTextTextTransform",
        select: {
            default: "normal-case",
            items: [
                {
                    value: "normal-case",
                    title: "None",
                },
                {
                    value: "uppercase",
                    title: "Uppercase",
                },
                {
                    value: "lowercase",
                    title: "Lowercase",
                },
                {
                    value: "capitalize",
                    title: "Capitalize",
                },
                {
                    title: "Small Caps",
                    value: "[font-variant-caps:small-caps]",
                },
            ],
        },
    },
    {
        title: "Whitespace",
        id: "globalTextWhiteSpace",
        format: "whitespace-{{value}}",
        select: {
            default: "none",
            items: [
                { value: "none", title: "None" },
                { value: "normal", title: "Normal" },
                { value: "nowrap", title: "Nowrap" },
                { value: "pre", title: "Pre" },
                { value: "pre-line", title: "Pre Line" },
                { value: "pre-wrap", title: "Pre Wrap" },
                { value: "break-spaces", title: "Break Spaces" },
            ],
        },
    },
    {
        divider: {},
    },
    {
        title: "Underline",
        id: "globalTextTextDecoration",
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
        visible: "globalTextTextDecoration != 'no-underline'",
        title: "Style",
        id: "globalTextTextDecorationStyle",
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
        visible: "globalTextTextDecoration == 'underline'",
        title: "Offset",
        id: "globalTextTextDecorationOffset",
        format: "underline-offset-[{{value}}px]",
        slider: {
            default: 1,
            use: "Slider",
            max: 30,
        },
    },
    {
        visible: "globalTextTextDecoration != 'no-underline'",
        title: "Color",
        id: "globalTextTextDecorationColor",
        format: "decoration-{{value}}",
        themeColor: {
            default: {
                name: "text",
                brightness: 100,
            },
        },
    },
    {
        visible: "globalTextTextDecoration != 'no-underline'",
        title: "Opacity",
        id: "globalTextTextDecorationOpacity",
        format: "[{{value}}%]",
        responsive: false,
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
];

export default TextFontsAndTextStyles;
