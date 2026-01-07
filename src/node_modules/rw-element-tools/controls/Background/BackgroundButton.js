const BackgroundButton = [
  {
    globalControl: "ControlType",
    id: "{{value}}Bg",
    segmented: {
      default: "hover",
    },
  },
  {
    title: "Style",
    id: "globalBgType",
    responsive: false,
    segmented: {
      default: "color",
      items: [
        {
          icon: "paintbrush",
          value: "color",
        },
        {
          icon: "photo",
          value: "image",
        },
        {
          icon: "swatchpalette",
          value: "gradient",
        },
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
    default: {
      name: "brand",
      brightness: 500,
    }
  },
  {
    globalControl: "Background_Gradient",
  },
  {
    globalControl: "Background_Image",
  },
];

export default BackgroundButton;
