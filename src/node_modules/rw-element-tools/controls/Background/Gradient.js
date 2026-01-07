const Gradient = [
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Direction",
    id: "globalBgGradientDirection",
    select: {
      use: "GradientDirection",
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    heading: {},
    title: "From",
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Color",
    id: "globalBgGradientFromColor",
    format: "from-{{value}}/[--bgGradientFromOpacity]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 200,
      },
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Opacity",
    id: "globalBgGradientFromOpacity",
    format: "[--bgGradientFromOpacity:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Position",
    id: "globalBgGradientFromPosition",
    format: "from-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 0,
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    divider: {},
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Add Via",
    id: "globalBgGradientViaEnabled",
    switch: {
      default: false,
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient') && globalBgGradientViaEnabled == true",
    heading: {},
    title: "Via",
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient') && globalBgGradientViaEnabled == true",
    title: "Color",
    id: "globalBgGradientViaColor",
    format: "via-{{value}}/[--bgGradientViaOpacity]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 400,
      },
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient') && globalBgGradientViaEnabled == true",
    title: "Opacity",
    id: "globalBgGradientViaOpacity",
    format: "[--bgGradientViaOpacity:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient') && globalBgGradientViaEnabled == true",
    title: "Position",
    id: "globalBgGradientViaPosition",
    format: "via-[{{value}}%]",
    responsive: false,
    slider: {
      default: 50,
      use: "Slider",
      units: "%",
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    divider: {},
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    heading: {},
    title: "To",
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Color",
    id: "globalBgGradientToColor",
    format: "to-{{value}}/[--bgGradientToOpacity]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 500,
      },
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Opacity",
    id: "globalBgGradientToOpacity",
    format: "[--bgGradientToOpacity:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "globalControlTypeBg == 'static' && globalBgType == 'gradient' || (globalControlTypeBg == 'hover' && globalBgState == 'start' && globalBgType == 'gradient')",
    title: "Position",
    id: "globalBgGradientToPosition",
    format: "to-[{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Direction",
    id: "globalBgGradientDirectionEnd",
    format: "hover:{{value}}",
    select: {
      use: "GradientDirection",
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "From",
    heading: {}
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Color",
    id: "globalBgGradientFromColorEnd",
    format: "hover:from-{{value}}/[--bgGradientFromOpacityEnd]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 200,
      },
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Opacity",
    id: "globalBgGradientFromOpacityEnd",
    format: "hover:[--bgGradientFromOpacityEnd:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    divider: {},
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Add Via",
    id: "globalBgGradientViaEnabledEnd",
    switch: {
      default: false,
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient') && globalBgGradientViaEnabledEnd == true",
    heading: {},
    title: "Via",
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient') && globalBgGradientViaEnabledEnd == true",
    title: "Color",
    id: "globalBgGradientViaColorEnd",
    format: "hover:via-{{value}}/[--bgGradientViaOpacityEnd]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 400,
      },
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient') && globalBgGradientViaEnabledEnd == true",
    title: "Opacity",
    id: "globalBgGradientViaOpacityEnd",
    format: "hover:[--bgGradientViaOpacityEnd:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    divider: {},
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    heading: {},
    title: "To",
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Color",
    id: "globalBgGradientToColorEnd",
    format: "hover:to-{{value}}/[--bgGradientToOpacityEnd]",
    themeColor: {
      default: {
        name: "brand",
        brightness: 500,
      },
    },
  },
  {
    visible: "(globalControlTypeBg == 'hover' && globalBgState == 'end' && globalBgType == 'gradient')",
    title: "Opacity",
    id: "globalBgGradientToOpacityEnd",
    format: "hover:[--bgGradientToOpacityEnd:{{value}}%]",
    responsive: false,
    slider: {
      use: "Slider",
      units: "%",
      default: 100,
    },
  },
];

export default Gradient;
