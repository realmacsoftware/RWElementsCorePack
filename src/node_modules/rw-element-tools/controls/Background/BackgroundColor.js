const BackgroundColor = [
    {
        visible: "bgType == 'color'",
        title: "Color",
        id: "bgColor",
        format: "bg-{{value}}",
        themeColor: {
            default: {
                name: "surface",
                brightness: 900,
            },
        },
    },
    {
        visible: "bgType == 'color'",
        title: "Opacity",
        id: "bgColorOpacity",
        format: "bg-opacity-[{{value}}%]",
        responsive: false,
        slider: {
            default: 100,
            use: "Slider",
            units: "%",
        },
    },
];

export default BackgroundColor;
