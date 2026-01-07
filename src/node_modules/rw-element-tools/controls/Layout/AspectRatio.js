export const AspectRatio = [
    {
        title: "Aspect Ratio",
        id: "aspectRatio",
        format: "aspect-[{{value}}]",
        segmented: {
            default: "auto",
            items: [
                {
                    title: "Auto",
                    value: "auto",
                    default: true,
                },
                {
                    title: "Wide",
                    value: "16/9",
                },
                {
                    title: "Tall",
                    value: "4/5",
                },
                {
                    icon: "slider.horizontal.3",
                    value: "custom",
                },
            ],
        },
    },
    {
        visible: "aspectRatio == 'custom'",
        title: "Custom Ratio",
        id: "aspectRatioCustom",
        format: "aspect-[{{value}}]",
        text: {
            default: "7/5",
        },
    },
    {
        visible: "aspectRatio == 'custom'",
        title: "An 'x/y' value such as 1/1 or 5/7.",
        information: {},
    },
    {
        visible: "aspectRatio != 'auto'",
        globalControl: "ObjectFit",
    },
    {
        visible: "aspectRatio != 'auto'",
        globalControl: "ObjectPosition",
    },
];

export default AspectRatio;
