export const Image = [
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Image",
    id: "globalOverlayImageResource",
    resource: {},
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Position",
    heading: {},
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Horizontal",
    id: "globalOverlayImagePositionX",
    segmented: {
      default: "center",
      items: [
        {
          value: "left",
          title: "Left",
        },
        {
          value: "center",
          title: "Center",
        },
        {
          value: "right",
          title: "Right",
        },
      ],
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Vertical",
    id: "globalOverlayImagePositionY",
    segmented: {
      default: "center",
      items: [
        {
          value: "top",
          title: "Top",
        },
        {
          value: "center",
          title: "Middle",
          default: true,
        },
        {
          value: "bottom",
          title: "Bottom",
        },
      ],
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Sizing",
    heading: {},
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Size",
    id: "globalOverlayImageSize",
    format: "bg-{{value}}",
    select: {
      default: "cover",
      items: [
        {
          title: "Auto",
          value: "auto",
        },
        {
          title: "Cover",
          value: "cover",
        },
        {
          title: "Contain",
          value: "contain",
        },
      ],
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'image' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'image')",
    title: "Repeat",
    id: "globalOverlayImageRepeat",
    format: "bg-{{value}}",
    select: {
      default: "no-repeat",
      items: [
        {
          title: "No Repeat",
          value: "no-repeat",
        },
        {
          title: "Repeat",
          value: "repeat",
        },
        {
          title: "Repeat Horizontal",
          value: "repeat-x",
        },
        {
          title: "Repeat Vertical",
          value: "repeat-y",
        },
      ],
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Image",
    id: "globalOverlayImageResourceEnd",
    resource: {},
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Position",
    heading: {},
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Horizontal",
    id: "globalOverlayImagePositionXEnd",
    segmented: {
      default: "center",
      items: [
        {
          value: "left",
          title: "Left",
        },
        {
          value: "center",
          title: "Center",
        },
        {
          value: "right",
          title: "Right",
        },
      ],
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Vertical",
    id: "globalOverlayImagePositionYEnd",
    segmented: {
      default: "center",
      items: [
        {
          value: "top",
          title: "Top",
        },
        {
          value: "center",
          title: "Middle",
          default: true,
        },
        {
          value: "bottom",
          title: "Bottom",
        },
      ],
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Sizing",
    heading: {},
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Size",
    id: "globalOverlayImageSizeEnd",
    format: "bg-{{value}}",
    select: {
      default: "cover",
      items: [
        {
          title: "Auto",
          value: "auto",
        },
        {
          title: "Cover",
          value: "cover",
        },
        {
          title: "Contain",
          value: "contain",
        },
      ],
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'image')",
    title: "Repeat",
    id: "globalOverlayImageRepeatEnd",
    format: "bg-{{value}}",
    select: {
      default: "no-repeat",
      items: [
        {
          title: "No Repeat",
          value: "no-repeat",
        },
        {
          title: "Repeat",
          value: "repeat",
        },
        {
          title: "Repeat Horizontal",
          value: "repeat-x",
        },
        {
          title: "Repeat Vertical",
          value: "repeat-y",
        },
      ],
    },
  },
];

export default Image;
