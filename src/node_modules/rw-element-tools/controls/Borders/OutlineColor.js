const OutlineColor = [
  {
    title: "Color",
    id: "globalOutlineColor",
    format: "outline-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 500,
      },
    },
  },
  {
    title: "Opacity",
    id: "globalOutlineColorOpacity",
    format: "[{{value}}%]",
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
];

export default OutlineColor;
