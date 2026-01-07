export const BordersInput = [
  {
    globalControl: "ControlType",
    id: "{{value}}Borders",
    segmented: {
      default: "static",
    }
  },
  {
    visible: "globalControlTypeBorders == 'hover'",
    title: "State",
    id: "globalBordersState",
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
    divider: {},
    visible: "globalControlTypeBorders != 'none'",
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    globalControl: "BorderStyle",
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    globalControl: "BorderColor",
    default: {
      name: "surface",
      brightness: 900,
    }
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    globalControl: "BorderWidth",
    default: {
      base: {
        top: "Default",
        right: "Default",
        bottom: "Default",
        left: "Default",
      }
    }
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    title: "Radius",
    id: "globalBordersRadius",
    format: "{{value}}",
    themeBorderRadius: {
      default: {
        base: {
          topLeft: "none",
          topRight: "none",
          bottomLeft: "none",
          bottomRight: "none",
        },
      },
    },
  },
  {
    visible: "(globalControlTypeBorders == 'hover' && globalBordersState == 'end')",
    globalControl: "BorderStyle",
    id: "{{value}}End",
    format: "hover:{{value}}",
  },
  {
    visible: "(globalControlTypeBorders == 'hover' && globalBordersState == 'end')",
    globalControl: "BorderColor",
    id: "{{value}}End",
  },
  {
    visible: "(globalControlTypeBorders == 'hover' && globalBordersState == 'end')",
    globalControl: "BorderWidth",
    id: "{{value}}End",
    format: "hover:{{value}}",
  },
  {
    visible: "(globalControlTypeBorders == 'hover' && globalBordersState == 'end')",
    title: "Radius",
    id: "globalBordersRadiusEnd",
    format: "hover:{{value}}",
    themeBorderRadius: {
      default: {
        base: {
          topLeft: "none",
          topRight: "none",
          bottomLeft: "none",
          bottomRight: "none",
        },
      },
    },
  },
];

export default BordersInput;
