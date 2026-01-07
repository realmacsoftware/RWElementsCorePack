const Effects = [
    {
        globalControl: "ControlType",
        id: "{{value}}Effects",
    },
    {
        visible: "globalControlTypeEffects == 'hover'",
        globalControl: "HoverGroup",
        id: "{{value}}Effects",
    },
    {
        visible:
            "globalControlTypeEffects == 'hover' && globalHoverGroupEffects == 'custom'",
        title: "ID",
        id: "globalHoverGroupCustomIdEffects",
        text: {},
    },
    {
        visible: "globalHoverGroupEffects == 'custom'",
        title: "The ID of the parent element to trigger the effects.",
        information: {},
    },
    {
        visible:
            "globalControlTypeEffects != 'none' && globalControlTypeEffects != 'static'",
        title: "State",
        id: "globalEffectsState",
        responsive: false,
        segmented: {
            default: "start",
            items: [
                {
                    title: "Start",
                    value: "start",
                },
                {
                    title: "End",
                    value: "end",
                },
            ],
        },
    },
    {
        visible: "globalControlTypeEffects != 'none'",
        divider: {},
    },
    {
        visible:
            "globalControlTypeEffects == 'static' || (globalControlTypeEffects == 'hover' && globalEffectsState == 'start')",
        globalControl: "BoxShadow",
    },
    {
        visible:
            "globalControlTypeEffects == 'static' || (globalControlTypeEffects == 'hover' && globalEffectsState == 'start')",
        globalControl: "Opacity",
    },
    {
        visible:
            "(globalControlTypeEffects == 'hover' && globalEffectsState == 'end')",
        globalControl: "BoxShadow",
        id: "{{value}}End",
    },
    {
        visible:
            "(globalControlTypeEffects == 'hover' && globalEffectsState == 'end')",
        globalControl: "Opacity",
        id: "{{value}}End",
    },
];

export default Effects;
