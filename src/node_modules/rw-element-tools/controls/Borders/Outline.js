export const Outline = [
  {
    title: "Type",
    id: "globalControlTypeOutline",
    responsive: false,
    segmented: {
      default: "none",
      items: [
        {
          title: "None",
          value: "none",
        },
        {
          title: "Static",
          value: "static",
        },
        {
          title: "Focus",
          value: "focus",
        },
      ]
    }
  },
  {
    visible: "globalControlTypeOutline != 'none'",
    globalControl: "OutlineStyle",
  },
  {
    visible: "globalControlTypeOutline == 'focus'",
    title: "State",
    id: "globalOutlineState",
    responsive: false,
    segmented: {
      default: "unfocused",
      items: [
        {
          title: "Unfocused",
          value: "unfocused",
        },
        {
          title: "Focused",
          value: "focused",
        },
      ]
    }
  },
  {
    divider: {},
    visible: "globalControlTypeOutline != 'none'",
  },
  {
    visible: "globalControlTypeOutline == 'static' || (globalControlTypeOutline == 'focus' && globalOutlineState == 'unfocused')",
    globalControl: "OutlineColor",
  },
  {
    visible: "globalControlTypeOutline == 'static' || (globalControlTypeOutline == 'focus' && globalOutlineState == 'unfocused')",
    globalControl: "OutlineWidth",
  },
  {
    visible: "globalControlTypeOutline == 'static' || (globalControlTypeOutline == 'focus' && globalOutlineState == 'unfocused')",
    globalControl: "OutlineOffset",
  },
  {
    visible: "(globalControlTypeOutline == 'focus' && globalOutlineState == 'focused')",
    title: "Color",
    id: "globalOutlineColorFocus",
    format: "focus:outline-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 500,
      },
    },
  },
  {
    visible: "(globalControlTypeOutline == 'focus' && globalOutlineState == 'focused')",
    title: "Opacity",
    id: "globalOutlineColorOpacityFocus",
    format: "[{{value}}%]",
    slider: {
      default: 100,
      use: "Slider",
      units: "%",
    },
  },
  {
    visible: "(globalControlTypeOutline == 'focus' && globalOutlineState == 'focused')",
    globalControl: "OutlineWidth",
    id: "{{value}}Focus",
    format: "focus:outline-[{{value}}px]",
  },
  {
    visible: "(globalControlTypeOutline == 'focus' && globalOutlineState == 'focused')",
    globalControl: "OutlineOffset",
    format: "focus:outline-offset-[{{value}}px]",
    id: "{{value}}Focus",
  },
];

export default Outline;
