const Overlay = [
  {
    globalControl: "ControlType",
    id: "{{value}}Overlay",
    segmented: {
      default: "none",
    },
  },
  {
    visible: "globalControlTypeOverlay != 'none'",
    title: "Style",
    id: "globalOverlayType",
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
    visible: "globalControlTypeOverlay != 'none' && globalControlTypeOverlay != 'static'",
    title: "State",
    id: "globalOverlayState",
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
    visible: "globalControlTypeOverlay != 'none'",
    divider: {},
  },
  {
    globalControl: "Overlay_Color",
  },
  {
    globalControl: "Overlay_Gradient",
  },
  {
    globalControl: "Overlay_Image",
  }
];

export default Overlay;
