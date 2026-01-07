const HeadingColor = [
  {
    globalControl: "ControlType",
    id: "{{value}}Bg",
    segmented: {
      default: "static",
      items: [
        {
          title: "Static",
          value: "static",
        },
        {
          title: "Hover",
          value: "hover",
        },
      ],
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
    visible: "globalControlTypeBg != 'none'",
    divider: {},
  },
  {
    visible: "globalControlTypeBg == 'hover'",
    globalControl: "HoverGroup",
    id: "{{value}}Bg",
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
    visible: "globalControlTypeBg == 'static' && globalBgType == 'color' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'color')",
    globalControl: "TextColor",
    default: {
      name: "text",
      brightness: 50,
    }
  },
  {
    visible: "globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'color'",
    title: "Color",
    id: "globalTextColorHover",
    format: "text-{{value}}",
    themeColor: {
      default: {
        name: "text",
        brightness: 200
      }
    },
  },
  {
    visible: "globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'color'",
    title: "Opacity",
    id: "globalTextColorOpacityHover",
    responsive: false,
    format: "text-opacity-[{{value}}%] dark:text-opacity-[{{value}}%]",
    slider: {
      default: 100,
      min: 0,
      max: 100,
      round: true,
      snap: true,
      units: "%"
    },
  },
  {
    globalControl: "Background_Gradient",
  },
  {
    globalControl: "Background_Image",
  },
];

export default HeadingColor;
