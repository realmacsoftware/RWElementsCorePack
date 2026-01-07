const BorderColor = [
  {
    title: "Color",
    id: "globalBordersColor",
    format: "border-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 500,
      },
    },
  },
  {
    title: "Opacity",
    id: "globalBordersColorOpacity",
    format: "[{{value}}%]",
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
];

export default BorderColor;
