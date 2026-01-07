const Color = [
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'color' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'color')",
    title: "Color",
    id: "globalBgColor",
    format: "bg-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 50,
      },
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'color' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'color')",
    title: "Opacity",
    id: "globalBgColorOpacity",
    format: "bg-opacity-[{{value}}%]",
    responsive: false,
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'color')",
    title: "Color",
    id: "globalBgColorEnd",
    format: "hover:bg-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 50,
      },
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'color')",
    title: "Opacity",
    id: "globalBgColorOpacityEnd",
    format: "hover:bg-opacity-[{{value}}%]",
    responsive: false,
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
];

export default Color;
