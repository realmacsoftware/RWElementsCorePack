const SpacingInput = [
  {
    title: "Margin & Padding",
    heading: {}
  },
  {
    title: "Enable",
    id: "globalSpacingEnabled",
    switch: {
      default: true
    }
  },
  {
    visible: "globalSpacingEnabled == true",
    globalControl: "Margin",
    default: {
      base: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        linkHorizontal: true,
      }
    }
  },
  {
    visible: "globalSpacingEnabled == true",
    globalControl: "Padding",
    default: {
      base: {
        top: "2",
        right: "3.5",
        bottom: "2",
        left: "3.5",
        linkHorizontal: true,
        linkVertical: true,
      }
    }
  }
];

export default SpacingInput;
