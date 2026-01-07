const Skew = [
  {
    title: "Skew",
    heading: {}
  },
  {
    title: "Horizontal",
    id: "globalTransformSkewX",
    format: "skew-x-[{{value}}deg]",
    number: {
      default: 0,
    },
  },
  {
    title: "Vertical",
    id: "globalTransformSkewY",
    format: "skew-y-[{{value}}deg]",
    number: {
      default: 0,
      subtitle: "in degrees",
    },
  },
];

export default Skew;
