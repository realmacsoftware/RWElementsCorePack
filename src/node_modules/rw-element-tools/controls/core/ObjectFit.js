const ObjectFit = {
    title: "Object Fit",
    id: "objectFit",
    format: "object-{{value}}",
    select: {
        default: "cover",
        items: [
            {
                title: "Fill",
                value: "fill",
            },
            {
                title: "Contain",
                value: "contain",
            },
            {
                title: "Cover",
                value: "cover",
            },
            {
                title: "None",
                value: "none",
            },
            {
                title: "Scale Down",
                value: "scale-down",
            },
        ],
    },
};

export default ObjectFit;
