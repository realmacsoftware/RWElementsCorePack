const Gradient = [
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Direction",
    id: "globalOverlayGradientDirection",
    select: {
      use: "GradientDirection",
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    heading: {},
    title: "From",
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Color",
    id: "globalOverlayGradientFromColor",
    format: "from-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 200,
      },
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Opacity",
    id: "globalOverlayGradientFromOpacity",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Position",
    id: "globalOverlayGradientFromPosition",
    format: "from-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 0,
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    divider: {},
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Add Via",
    id: "globalOverlayGradientViaEnabled",
    switch: {
      default: false,
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabled == true",
    heading: {},
    title: "Via",
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabled == true",
    title: "Color",
    id: "globalOverlayGradientViaColor",
    format: "via-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 400,
      },
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabled == true",
    title: "Opacity",
    id: "globalOverlayGradientViaOpacity",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabled == true",
    title: "Position",
    id: "globalOverlayGradientViaPosition",
    format: "via-[{{value}}%]",
    responsive: false,
    slider: {
      default: 50,
      use: "Slider",
      units: "%",
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    divider: {},
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    heading: {},
    title: "To",
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Color",
    id: "globalOverlayGradientToColor",
    format: "to-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 500,
      },
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Opacity",
    id: "globalOverlayGradientToOpacity",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeOverlay == 'static' && globalOverlayType == 'gradient' || (globalControlTypeOverlay == 'hover' && globalOverlayState == 'start' && globalOverlayType == 'gradient')",
    title: "Position",
    id: "globalOverlayGradientToPosition",
    format: "to-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Direction",
    id: "globalOverlayGradientDirectionEnd",
    select: {
      use: "GradientDirection",
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "From",
    heading: {}
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Color",
    id: "globalOverlayGradientFromColorEnd",
    format: "from-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 200,
      },
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Opacity",
    id: "globalOverlayGradientFromOpacityEnd",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Position",
    id: "globalOverlayGradientFromPositionEnd",
    format: "from-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 0,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    divider: {},
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Add Via",
    id: "globalOverlayGradientViaEnabledEnd",
    switch: {
      default: false,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabledEnd == true",
    heading: {},
    title: "Via",
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabledEnd == true",
    title: "Color",
    id: "globalOverlayGradientViaColorEnd",
    format: "via-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 400,
      },
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabledEnd == true",
    title: "Opacity",
    id: "globalOverlayGradientViaOpacityEnd",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient') && globalOverlayGradientViaEnabledEnd == true",
    title: "Position",
    id: "globalOverlayGradientViaPositionEnd",
    format: "via-[{{value}}%]",
    responsive: false,
    slider: {
      default: 50,
      use: "Slider",
      units: "%",
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    divider: {},
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    heading: {},
    title: "To",
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Color",
    id: "globalOverlayGradientToColorEnd",
    format: "to-{{value}}",
    themeColor: {
      default: {
        name: "brand",
        brightness: 500,
      },
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Opacity",
    id: "globalOverlayGradientToOpacityEnd",
    format: "[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeOverlay == 'hover' && globalOverlayState == 'end' && globalOverlayType == 'gradient')",
    title: "Position",
    id: "globalOverlayGradientToPositionEnd",
    format: "to-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
];

export default Gradient;
