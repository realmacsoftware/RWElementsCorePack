export const BackgroundImage = [
    {
        title: "Image",
        id: "bgImage",
        resource: {},
    },
    {
        title: "Position",
        heading: {},
    },
    {
        title: "Horizontal",
        id: "bgImagePositionX",
        segmented: {
            default: "center",
            items: [
                {
                    value: "left",
                    title: "Left",
                },
                {
                    value: "center",
                    title: "Center",
                    default: true,
                },
                {
                    value: "right",
                    title: "Right",
                },
            ],
        },
    },
    {
        title: "Vertical",
        id: "bgImagePositionY",
        segmented: {
            default: "center",
            items: [
                {
                    value: "top",
                    title: "Top",
                },
                {
                    value: "center",
                    title: "Middle",
                    default: true,
                },
                {
                    value: "bottom",
                    title: "Bottom",
                },
            ],
        },
    },
    {
        title: "Sizing",
        heading: {},
    },
    {
        title: "Size",
        id: "bgImageSize",
        select: {
            default: "cover",
            items: [
                {
                    title: "Auto",
                    value: "auto",
                },
                {
                    title: "Cover",
                    value: "cover",
                },
                {
                    title: "Contain",
                    value: "contain",
                },
            ],
        },
    },
    {
        title: "Repeat",
        id: "bgImageRepeat",
        format: "bg-{{value}}",
        select: {
            default: "no-repeat",
            items: [
                {
                    title: "No Repeat",
                    value: "no-repeat",
                },
                {
                    title: "Repeat",
                    value: "repeat",
                },
                {
                    title: "Repeat Horizontal",
                    value: "repeat-x",
                },
                {
                    title: "Repeat Vertical",
                    value: "repeat-y",
                },
            ],
        },
    },
];

export default BackgroundImage;
