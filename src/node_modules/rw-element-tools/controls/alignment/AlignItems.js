const AlignItems = {
    id: "alignItems",
    format: "items-{{value}}",
    title: "Items",
    select: {
        default: "[normal]",
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
                value: "baseline",
                title: "Baseline",
            },
            {
                value: "stretch",
                title: "Stretch",
            },
        ],
    },
};

const AlignItemsBasic = {
    title: "Align",
    id: "alignItems",
    format: "items-{{value}}",
    segmented: {
        default: "stretch",
        items: [
            {
                value: "stretch",
                icon: "rectangle.inset.filled",
            },
            {
                value: "start",
                icon: "arrow.left.to.line.compact",
            },
            {
                value: "center",
                icon: "arrow.right.and.line.vertical.and.arrow.left",
            },
            {
                value: "end",
                icon: "arrow.right.to.line.compact",
            },
        ],
    },
};

export { AlignItemsBasic };
export default AlignItems;
