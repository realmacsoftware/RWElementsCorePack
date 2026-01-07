const Sizing = [
  {
    title: "Size",
    heading: {}
  },
  {
    globalControl: "Width"
  },
  {
    globalControl: "Height"
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
    divider: {}
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

export default Sizing;
