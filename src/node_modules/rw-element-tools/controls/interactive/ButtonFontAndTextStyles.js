const ButtonFontAndTextStyles = [
  {
    title: "State",
    id: "globalButtonFontAndTextStylesState",
    segmented: {
      default: "normal",
      items: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Hover",
          value: "hover",
        },
      ],
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'normal'",
    title: "Color",
    id: "globalButtonFontAndTextStylesColor",
    format: "text-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 50
      }
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'normal'",
    title: "Opacity",
    id: "globalButtonFontAndTextStylesColorOpacity",
    format: "text-opacity-[{{value}}%] dark:text-opacity-[{{value}}%]",
    slider: {
      use: "Slider",
      default: 100,
      units: "%",
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'hover'",
    title: "Color",
    id: "globalButtonFontAndTextStylesColorHover",
    format: "hover:text-{{value}}",
    themeColor: {
      default: {
        name: "surface",
        brightness: 50
      }
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'hover'",
    title: "Opacity",
    id: "globalButtonFontAndTextStylesColorOpacityHover",
    format: "hover:text-opacity-[{{value}}%] dark:hover:text-opacity-[{{value}}%]",
    slider: {
      use: "Slider",
      default: 100,
      units: "%",
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'normal'",
    title: "Text Shadow",
    id: "globalButtonFontAndTextStylesTextShadow",
    themeShadow: {
      mode: "text",
      default: {
        name: "none",
      }
    }
  },
  {
    visible: "globalButtonFontAndTextStylesState == 'hover'",
    title: "Text Shadow",
    id: "globalButtonFontAndTextStylesTextShadowHover",
    format: "hover:{{value}}",
    themeShadow: {
      mode: "text",
      default: {
        name: "none",
      }
    }
  },
  {
    divider: {},
  },
  {
    title: "General",
    heading: {}
  },
  {
    title: "Align",
    id: "globalButtonFontAndTextStylesTextAlign",
    format: "justify-{{value}}",
    segmented: {
      default: "center",
      items: [
        {
          value: "start",
          icon: "text.alignleft",
        },
        {
          value: "center",
          icon: "text.aligncenter"
        },
        {
          value: "end",
          icon: "text.alignright"
        },
      ]
    },
  },
  {
    title: "Family",
    id: "globalButtonFontAndTextStylesFont",
    themeFont: {
      default: {
        base: "body"
      }
    }
  },
  {
    title: "Size",
    id: "globalButtonFontAndTextStylesFontSize",
    themeTextStyle: {
      default: {
        base: { name: "base" }
      }
    }
  },
  {
    title: "Font Settings",
    heading: {}
  },
  {
    title: "Weight",
    id: "globalButtonFontAndTextStylesFontWeight",
    format: "font-[{{value}}]",
    slider: {
      use: "FontWeight",
    }
  },
  {
    title: "Line Height",
    id: "globalButtonFontAndTextStylesLineHeight",
    format: "leading-{{value}}",
    slider: {
      use: "LineHeight",
    }
  },
  {
    title: "Letter Spacing",
    id: "globalButtonFontAndTextStylesLetterSpacing",
    format: "tracking-{{value}}",
    slider: {
      use: "LetterSpacing",
    }
  },
  {
    title: "Case",
    id: "globalButtonFontAndTextStylesTextTransform",
    select: {
      default: "normal-case",
      items: [
        {
          value: "normal-case",
          title: "None",
        },
        {
          value: "uppercase",
          title: "Uppercase",
        },
        {
          value: "lowercase",
          title: "Lowercase",
        },
        {
          value: "capitalize",
          title: "Capitalize",
        },
      ],
    },
  },
  {
    title: "Italic",
    id: "globalButtonFontAndTextStylesItalic",
    switch: {
      default: false,
      trueValue: "italic",
      falseValue: "",
    }
  },
  {
    title: "Underline",
    id: "globalButtonFontAndTextStylesUnderline",
    switch: {
      default: false,
      trueValue: "underline",
      falseValue: "",
    }
  },
];

export default ButtonFontAndTextStyles;
