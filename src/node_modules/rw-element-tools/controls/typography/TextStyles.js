const TextStyles = [
    {
        title: "Weight",
        id: "textStylesFontWeight",
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
        title: "Letter Spacing",
        id: "textStylesLetterSpacing",
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
        id: "textStylesLineHeight",
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
];

export default TextStyles;
