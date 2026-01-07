const BackgroundGadient = [
    {
        visible: "bgType == 'gradient'",
        title: "Direction",
        id: "bgGradientDirection",
        select: {
            use: "GradientDirection",
        },
    },
    {
        visible: "bgType == 'gradient'",
        heading: {},
        title: "From",
    },
    {
        visible: "bgType == 'gradient'",
        title: "Color",
        id: "gradientFromColor",
        format: "from-{{value}}",
        themeColor: {
            default: {
                name: "brand",
                brightness: 200,
            },
        },
    },
    {
        visible: "bgType == 'gradient'",
        title: "Opacity",
        id: "gradientFromOpacity",
        format: "[{{value}}%]",
        responsive: false,
        slider: {
            use: "Slider",
            units: "%",
            default: 100,
        },
    },
    {
        visible: "bgType == 'gradient'",
        title: "Position",
        id: "gradientFromPosition",
        format: "from-[{{value}}%]",
        responsive: false,
        slider: {
            use: "Slider",
            units: "%",
            default: 0,
        },
    },
    {
        visible: "bgType == 'gradient'",
        divider: {},
    },
    {
        visible: "bgType == 'gradient'",
        title: "Add Via",
        id: "wantsGradientVia",
        switch: {},
    },
    {
        visible: "bgType == 'gradient' && wantsGradientVia == 'true'",
        heading: {},
        title: "Via",
    },
    {
        visible: "bgType == 'gradient' && wantsGradientVia == 'true'",
        title: "Color",
        id: "gradientViaColor",
        format: "via-{{value}}",
        themeColor: {
            default: {
                name: "brand",
                brightness: 400,
            },
        },
    },
    {
        visible: "bgType == 'gradient' && wantsGradientVia == 'true'",
        title: "Opacity",
        id: "gradientViaOpacity",
        format: "[{{value}}%]",
        responsive: false,
        slider: {
            use: "Slider",
            units: "%",
            default: 100,
        },
    },
    {
        visible: "bgType == 'gradient' && wantsGradientVia == 'true'",
        title: "Position",
        id: "gradientViaPosition",
        format: "via-[{{value}}%]",
        responsive: false,
        slider: {
            default: 50,
            use: "Slider",
            units: "%",
        },
    },
    {
        visible: "bgType == 'gradient'",
        divider: {},
    },
    {
        visible: "bgType == 'gradient'",
        heading: {},
        title: "To",
    },
    {
        visible: "bgType == 'gradient'",
        title: "Color",
        id: "gradientToColor",
        format: "to-{{value}}",
        themeColor: {
            default: {
                name: "brand",
                brightness: 500,
            },
        },
    },
    {
        visible: "bgType == 'gradient'",
        title: "Opacity",
        id: "gradientToOpacity",
        format: "[{{value}}%]",
        responsive: false,
        slider: {
            use: "Slider",
            units: "%",
            default: 100,
        },
    },
    {
        visible: "bgType == 'gradient'",
        title: "Position",
        id: "gradientToPosition",
        format: "to-[{{value}}%]",
        responsive: false,
        slider: {
            use: "Slider",
            units: "%",
            default: 100,
        },
    },
];

export default BackgroundGadient;
