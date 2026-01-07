const InputFontAndTextStyles = [
    {
      title: "Color",
      id: "globalInputFontAndTextStylesColor",
      format: "text-{{value}}",
      themeColor: {
        default: {
          name: "text",
          brightness: 50
        }
      }
    },
    {
      title: "Opacity",
      id: "globalInputFontAndTextStylesColorOpacity",
      format: "text-opacity-[{{value}}%] dark:text-opacity-[{{value}}%]",
      slider: {
        use: "Slider",
        default: 100,
        units: "%",
      }
    },
    {
      title: "Text Shadow",
      id: "globalInputFontAndTextStylesTextShadow",
      themeShadow: {
        mode: "text",
        default: {
            base: {
                name: "none"
            }
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
      id: "globalInputFontAndTextStylesTextAlign",
      format: "text-{{value}}",
      segmented: {
        default: "start",
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
      id: "globalInputFontAndTextStylesFont",
      themeFont: {
        default: {
          base: "body"
        }
      }
    },
    {
      title: "Size",
      id: "globalInputFontAndTextStylesFontSize",
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
      id: "globalInputFontAndTextStylesFontWeight",
      format: "font-[{{value}}]",
      slider: {
        use: "FontWeight",
      }
    },
    {
      title: "Line Height",
      id: "globalInputFontAndTextStylesLineHeight",
      format: "leading-{{value}}",
      slider: {
        use: "LineHeight",
      }
    },
    {
      title: "Letter Spacing",
      id: "globalInputFontAndTextStylesLetterSpacing",
      format: "tracking-{{value}}",
      slider: {
        use: "LetterSpacing",
      }
    },
    {
      title: "Case",
      id: "globalInputFontAndTextStylesTextTransform",
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
      id: "globalInputFontAndTextStylesItalic",
      switch: {
        default: false,
        trueValue: "italic",
        falseValue: "",
      }
    },
    {
      title: "Underline",
      id: "globalInputFontAndTextStylesUnderline",
      switch: {
        default: false,
        trueValue: "underline",
        falseValue: "",
      }
    },
  ];
  
  export default InputFontAndTextStyles;
  