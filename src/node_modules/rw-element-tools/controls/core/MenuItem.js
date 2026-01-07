const MenuItem = [
    {
        title: "Font",
        id: "globalMenuItemFontFamily",
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
        id: "globalMenuItemTextStyles",
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
        id: "globalMenuItemFontWeight",
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
        id: "globalMenuItemLetterSpacing",
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
        title: "Italic",
        id: "globalMenuItemItalic",
        switch: {
            default: false,
            trueValue: "italic",
            falseValue: "normal",
        },
    },
    {
        divider: {},
    },
    {
        title: "State",
        id: "globalMenuItemState",
        responsive: false,
        segmented: {
            default: "default",
            items: [
                {
                    title: "Default",
                    value: "default",
                },
                {
                    title: "Active",
                    value: "hover",
                },
            ],
        },
    },
    {
        visible: "globalMenuItemState == 'default'",
        title: "Color",
        id: "globalMenuItemColor",
        format: "text-{{value}}/[var(--text-opacity)]",
        themeColor: {
            default: {
                name: "text",
                brightness: 50,
            },
        },
    },
    {
        visible: "globalMenuItemState == 'default'",
        title: "Opacity",
        id: "globalMenuItemOpacity",
        responsive: false,
        format: "[--text-opacity:{{value}}%]",
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
    {
        visible: "globalMenuItemState == 'default'",
        title: "Shadow",
        id: "globalMenuItemTextShadow",
        themeShadow: {
            mode: "text",
            default: {
                base: {
                    name: "none",
                },
            },
        },
    },
    {
        visible: "globalMenuItemState == 'default'",
        title: "Underline",
        id: "globalMenuItemUnderline",
        switch: {
            default: false,
            trueValue: "underline",
            falseValue: "none",
        },
    },
    {
        visible: "globalMenuItemState == 'hover'",
        title: "Color",
        id: "globalMenuItemHoverColor",
        format: "hover:text-{{value}}/[var(--text-opacity)] data-[state=active]:text-{{value}}/[var(--text-opacity)]",
        themeColor: {
            hover: {
                name: "brand",
                brightness: 500,
            },
        },
    },
    {
        visible: "globalMenuItemState == 'hover'",
        title: "Opacity",
        id: "globalMenuItemHoverOpacity",
        responsive: false,
        format: "hover:[--text-opacity:{{value}}%] data-[state=active]:[--text-opacity:{{value}}%]",
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
    {
        visible: "globalMenuItemState == 'hover'",
        title: "Shadow",
        id: "globalMenuItemHoverTextShadow",
        format: "hover:{{value}} data-[state=active]:{{value}}",
        themeShadow: {
            mode: "text",
            default: {
                base: {
                    name: "none",
                },
            },
        },
    },
    {
        visible: "globalMenuItemState == 'hover'",
        title: "Underline",
        id: "globalMenuItemHoverUnderline",
        format: "hover:{{value}} data-[state=active]:{{value}}",
        switch: {
            default: false,
            trueValue: "underline",
            falseValue: "none",
        },
    },
];

export default MenuItem;
