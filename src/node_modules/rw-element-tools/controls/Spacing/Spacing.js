const Spacing = [
  {
    title: "Margin & Padding",
    heading: {}
  },
  {
    title: "Enable",
    id: "globalSpacingEnabled",
    switch: {
      default: false
    }
  },
  {
    visible: "globalSpacingEnabled == true",
    globalControl: "Margin"
  },
  {
    visible: "globalSpacingEnabled == true",
    globalControl: "Padding"
  }
];

export default Spacing;
