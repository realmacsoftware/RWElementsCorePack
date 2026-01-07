const SizingContainer = [
  {
    title: "Size",
    heading: {}
  },
  {
    title: "Width",
    id: "globalWidthType",
    responsive: false,
    select: {
      default: "full",
      items: [
        {
          title: "Auto",
          value: "auto"
        },
        {
          title: "Full",
          value: "full"
        },
        {
          title: "Screen",
          value: "screen"
        },
        {
          title: "Breakpoint",
          value: "container"
        },
        {
          title: "Theme Spacing",
          value: "theme"
        }
      ]
    }
  },
  {
    visible: "globalWidthType == 'theme'",
    globalControl: "Width",
    title: ""
  },
  {
    title: "Height",
    id: "globalHeightType",
    responsive: false,
    select: {
      default: "auto",
      items: [
        {
          title: "Auto",
          value: "auto"
        },
        {
          title: "Full",
          value: "full"
        },
        {
          title: "Screen",
          value: "screen"
        },
        {
          title: "Theme",
          value: "theme"
        }
      ]
    }
  },
  {
    visible: "globalHeightType == 'theme'",
    globalControl: "Height",
    title: ""
  },
  {
    divider: {}
  },
  {
    title: "Min & Max Settings",
    heading: {}
  },
  {
    information: {},
    title: "Enable this to set both min and max height and width settings."
  },
  {
    title: "Enable",
    id: "globalSizingMinMaxEnabled",
    switch: {
      default: false
    }
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Width",
    heading: {}
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Min",
    globalControl: "MinWidth"
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Max",
    globalControl: "MaxWidth"
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Height",
    heading: {}
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Min",
    globalControl: "MinHeight"
  },
  {
    visible: "globalSizingMinMaxEnabled == true",
    title: "Max",
    globalControl: "MaxHeight"
  }
]

export default SizingContainer;
