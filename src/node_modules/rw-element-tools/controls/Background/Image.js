export const Image = [
    {
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'image' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'image')",
        title: "Image",
        id: "globalBgImageResource",
        resource: {},
    },
    {
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'image' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'image')",
        title: "Position",
        id: "globalBgImagePosition",
        format: "bg-{{value}}",
        select: {
            default: "center",
            items: [
                {
                    value: "bottom",
                    title: "Bottom",
                },
                {
                    value: "center",
                    title: "Center",
                },
                {
                    value: "left",
                    title: "Left",
                },
                {
                    value: "left-bottom",
                    title: "Left Bottom",
                },
                {
                    value: "left-top",
                    title: "Left Top",
                },
                {
                    value: "right",
                    title: "Right",
                },
                {
                    value: "right-bottom",
                    title: "Right Bottom",
                },
                {
                    value: "right-top",
                    title: "Right Top",
                },
                {
                    value: "top",
                    title: "Top",
                },
            ],
        },
    },
    {
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'image' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'image')",
        title: "Sizing",
        heading: {},
    },
    {
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'image' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'image')",
        title: "Size",
        id: "globalBgImageSize",
        format: "bg-{{value}}",
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
        visible:
            "globalControlTypeBg == 'static' && globalBgType == 'image' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'image')",
        title: "Repeat",
        id: "globalBgImageRepeat",
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
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Image",
        id: "globalBgImageResourceEnd",
        resource: {},
    },
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Position",
        heading: {},
    },
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Position",
        id: "globalBgImagePositionEnd",
        format: "hover:bg-{{value}}",
        select: {
            default: "center",
            items: [
                {
                    value: "bottom",
                    title: "Bottom",
                },
                {
                    value: "center",
                    title: "Center",
                },
                {
                    value: "left",
                    title: "Left",
                },
                {
                    value: "left-bottom",
                    title: "Left Bottom",
                },
                {
                    value: "left-top",
                    title: "Left Top",
                },
                {
                    value: "right",
                    title: "Right",
                },
                {
                    value: "right-bottom",
                    title: "Right Bottom",
                },
                {
                    value: "right-top",
                    title: "Right Top",
                },
                {
                    value: "top",
                    title: "Top",
                },
            ],
        },
    },
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Sizing",
        heading: {},
    },
    {
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Size",
        id: "globalBgImageSizeEnd",
        format: "hover:bg-{{value}}",
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
        visible:
            "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'image')",
        title: "Repeat",
        id: "globalBgImageRepeatEnd",
        format: "hover:bg-{{value}}",
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
    ,
    {
        visible: "globalBgType == 'image'",
        divider: {},
    },
    {
        visible: "globalBgType == 'image'",
        title: "Fetch Priority",
        heading: {},
    },
    {
        visible: "globalBgType == 'image'",
        title: "Value",
        id: "globalBgImageFetchPriority",
        responsive: false,
        segmented: {
            default: "auto",
            items: [
                {
                    title: "Auto",
                    value: "auto",
                },
                {
                    title: "High",
                    value: "high",
                },
                {
                    title: "Low",
                    value: "low",
                },
            ],
        },
    },
];

export default Image;
