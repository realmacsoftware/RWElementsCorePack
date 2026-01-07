const JustifyContent = {
    title: "Content",
    format: "justify-{{value}}",
    id: "justifyContent",
    select: {
        default: "normal",
        items: [
            {
                value: "normal",
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
                value: "between",
                title: "Between",
            },
            {
                value: "around",
                title: "Around",
            },
            {
                value: "evenly",
                title: "Evenly",
            },
            {
                value: "stretch",
                title: "Stretch",
            },
        ],
    },
};

export default JustifyContent;
