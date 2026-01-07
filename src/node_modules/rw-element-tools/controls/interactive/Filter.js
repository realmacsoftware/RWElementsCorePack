const Filter = [
    {
      title: "Filtering",
      heading: {}
    },
    {
        title: "Enable",
        id: "globalFilterEnable",
        responsive: false,
        switch: {
            default: false,
        }
    },
    {
        visible: "globalFilterEnable == true",
        title: "Group",
        id: "globalFilterGroup",
        responsive: false,
        segmented: {
            default: "parent",
            items: [
                {
                    title: "Parent",
                    value: "parent"
                },
                {
                    title: "Custom",
                    value: "custom"
                }
            ]
        }
    },
    {
        visible: "globalFilterEnable == true && globalFilterGroup == 'custom'",
        title: "Group ID",
        id: "globalFilterCustomGroupId",
        responsive: false,
        text: {
            default: "unique-group-id"
        }
    },
    {
        visible: "globalFilterEnable == true",
        title: "Transition",
        id: "globalFilterTransition",
        responsive: false,
        select: {
            use: "TransitionNames"
        }
    }
  ];
  
  export default Filter;
  