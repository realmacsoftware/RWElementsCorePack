const TextColor = [
  {
    title: "Color",
    id: "globalTextColor",
    format: "text-{{value}}",
    themeColor: {
      default: {
        name: "text",
        brightness: 100,
      },
    },
  },
  {
    title: "Opacity",
    id: "globalTextColorOpacity",
    responsive: false,
    format: "text-opacity-[{{value}}%] dark:text-opacity-[{{value}}%]",
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
];

export const TextColorHover = [
  {
    title: "Color",
    id: "globalTextColorHover",
    format: "hover:text-{{value}}",
    themeColor: {
      default: {
        name: "text",
        brightness: 300,
      },
    },
  },
  {
    title: "Opacity",
    id: "globalTextColorOpacityHover",
    responsive: false,
    format: "hover:text-opacity-[{{value}}%] dark:hover:text-opacity-[{{value}}%]",
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
];

export default TextColor;
