const LayoutZIndex = [
  {
    title: "Z-Index",
    id: "globalLayoutZIndexType",
    responsive: false,
    segmented: {
      default: "",
      items: [
        {
          title: "None",
          value: "",
        },
        {
          title: "Auto",
          value: "z-auto",
        },
        {
          title: "Custom",
          value: "custom",
        },
      ],
    },
  },
  {
    visible: "globalLayoutZIndexType == 'custom'",
    title: "",
    id: "globalLayoutZIndex",
    format: "z-[{{value}}]",
    number: {
      default: 0,
      subtitle: "Can be positive or negative.",
    },
  },
];

export default LayoutZIndex;
