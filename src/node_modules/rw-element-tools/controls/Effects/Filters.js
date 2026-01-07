const Filters = [
    {
        globalControl: "ControlType",
        id: "{{value}}Filters",
    },
    {
        visible: "globalControlTypeFilters == 'hover'",
        globalControl: "HoverGroup",
        id: "{{value}}Filters",
    },
    {
        visible:
            "globalControlTypeFilters == 'hover' && globalHoverGroupFilters == 'custom'",
        title: "ID",
        id: "globalHoverGroupCustomIdFilters",
        text: {},
    },
    {
        visible: "globalHoverGroupFilters == 'custom'",
        title: "The ID of the parent element to trigger the filters.",
        information: {},
    },
    {
        visible:
            "globalControlTypeFilters != 'none' && globalControlTypeFilters != 'static'",
        title: "State",
        id: "globalFiltersState",
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
        visible: "globalControlTypeFilters != 'none'",
        divider: {},
    },
    {
        visible: "globalControlTypeFilters != 'none'",
        title: "Filters",
        heading: {},
    },
    {
        visible:
            "globalControlTypeFilters == 'static' || (globalControlTypeFilters == 'hover' && globalFiltersState == 'start')",
        globalControl: "Blur",
    },
    {
        visible:
            "globalControlTypeFilters == 'static' || (globalControlTypeFilters == 'hover' && globalFiltersState == 'start')",
        globalControl: "Brightness",
    },
    {
        visible:
            "globalControlTypeFilters == 'static' || (globalControlTypeFilters == 'hover' && globalFiltersState == 'start')",
        globalControl: "Saturate",
    },
    {
        visible:
            "globalControlTypeFilters == 'static' || (globalControlTypeFilters == 'hover' && globalFiltersState == 'start')",
        globalControl: "DropShadow",
    },
    {
        visible:
            "(globalControlTypeFilters == 'hover' && globalFiltersState == 'end')",
        globalControl: "Blur",
        id: "{{value}}End",
    },
    {
        visible:
            "(globalControlTypeFilters == 'hover' && globalFiltersState == 'end')",
        globalControl: "Brightness",
        id: "{{value}}End",
    },
    {
        visible:
            "(globalControlTypeFilters == 'hover' && globalFiltersState == 'end')",
        globalControl: "Saturate",
        id: "{{value}}End",
    },
    {
        visible:
            "(globalControlTypeFilters == 'hover' && globalFiltersState == 'end')",
        globalControl: "DropShadow",
        id: "{{value}}End",
    },
    {
        visible: "globalControlTypeFilters != 'none'",
        title: "Backdrop Filters",
        heading: {},
    },
    {
        visible:
            "globalControlTypeFilters == 'static' || (globalControlTypeFilters == 'hover' && globalFiltersState == 'start')",
        globalControl: "BackdropBlur",
    },
    {
        visible:
            "(globalControlTypeFilters == 'hover' && globalFiltersState == 'end')",
        globalControl: "BackdropBlur",
        id: "{{value}}End",
    },
];

export default Filters;
