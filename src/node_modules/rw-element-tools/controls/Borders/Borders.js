export const Borders = [
  {
    globalControl: "ControlType",
    id: "{{value}}Borders",
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
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    globalControl: "BorderWidth",
  },
  {
    visible: "globalControlTypeBorders == 'static' || (globalControlTypeBorders == 'hover' && globalBordersState == 'start')",
    globalControl: "BorderRadius",
  },
  {
    visible: "(globalControlTypeBorders == 'hover' && globalBordersState == 'end')",
    globalControl: "BorderStyle",
    id: "{{value}}End",
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
    globalControl: "BorderRadius",
    format: "hover:{{value}}",
    id: "{{value}}End",
  },
];

export default Borders;
