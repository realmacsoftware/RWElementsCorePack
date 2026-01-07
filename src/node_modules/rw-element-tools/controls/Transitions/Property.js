const Property = [
  {
    title: "Apply to",
    id: "globalTransitionsProperty",
    format: "transition-{{value}}",
    select: {
      default: "all",
      items: [
        {
          title: "None",
          value: "none",
        },
        {
          title: "All",
          value: "all",
        },
        {
          title: "Most Common",
          value: "default",
        },
        {
          title: "Colors",
          value: "colors",
        },
        {
          title: "Opacity",
          value: "opacity",
        },
        {
          title: "Shadows",
          value: "shadow",
        },
        {
          title: "Transforms",
          value: "transform",
        },
      ],
    },
  },
];

export default Property;
