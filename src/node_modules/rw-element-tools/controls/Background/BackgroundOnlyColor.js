const BackgroundOnlyColor = [
    {
        globalControl: "ControlType",
        id: "{{value}}Bg",
        segmented: {
          default: "static",
        },
    },
    {
        enable: "false",
        visible: "false",
        title: "Style",
        id: "globalBgType",
        responsive: false,
        segmented: {
          default: "color",
          items: [
            {
              icon: "paintbrush",
              value: "color",
            }
          ],
        },
    },
    {
        visible: "globalControlTypeBg != 'none' && globalControlTypeBg != 'static'",
        title: "State",
        id: "globalBgState",
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
          ]
        }
    },
    {
        visible: "globalControlTypeBg != 'none'",
        divider: {},
    },
    {
        globalControl: "Background_Color",
    },
];

export default BackgroundOnlyColor;