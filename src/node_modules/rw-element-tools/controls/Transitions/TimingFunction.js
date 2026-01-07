const TimingFunction = [
  {
    visible: "globalTransitionsProperty != 'none'",
    title: "Function",
    id: "globalTransitionsTimingFunction",
    select: {
      default: "ease-in-out",
      items: [
        {
          title: "Custom",
          value: "custom",
        },
        {
          title: "Linear",
          value: "linear",
        },
        {
          title: "Ease-in",
          value: "ease-in",
        },
        {
          title: "Ease-out",
          value: "ease-out",
        },
        {
          title: "Ease-in-out",
          value: "ease-in-out",
        },
      ],
    },
  },
  {
    visible: "globalTransitionsTimingFunction == 'custom'",
    title: "Cubic Bezier",
    id: "globalTransitionsTimingFunctionCustom",
    format: "ease-[cubic-bezier({{value}})]",
    input: {
      default: "0.95,0.05,0.795,0.035",
      subtitle: "x1, y1, x2, y2",
    }
  },
];

export default TimingFunction;
