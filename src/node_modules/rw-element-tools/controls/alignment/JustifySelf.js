const JustifySelf = [
  {
    title: "Justify Self",
    id: "globalGridOrFlexItemJustifySelf",
    format: "justify-self-{{value}}",
    select: {
      default: "auto",
      items: [
        {
          value: "auto",
          title: "Auto"
        },
        {
          value: "start",
          title: "Start"
        },
        {
          value: "end",
          title: "End"
        },
        {
          value: "center",
          title: "Center"
        },
        {
          value: "stretch",
          title: "Stretch"
        },
      ]
    }
  }
];

export default JustifySelf;
