const JustifyItems = {
    title: "Items",
    format: "justify-items-{{value}}",
    id: "justifyItems",
    select: {
        default: "normal",
        items: [
            {
                value: "[normal]",
                title: "Normal",
            },
            {
                value: "start",
                title: "Start",
            },
            {
                value: "end",
                title: "End",
            },
            {
                value: "center",
                title: "Center",
            },
            {
                value: "stretch",
                title: "Stretch",
            },
        ],
    },
};

export default JustifyItems;
