const LayoutTopRightBottomLeft = [
  {
    title: "Top / Right / Bottom / Left",
    heading: {}
  },
  {
    title: "Type",
    id: "globalLayoutTopRightBottomLeftType",
    segmented: {
      default: "none",
      items: [
        {
          title: "None",
          value: "none",
        },
        {
          title: "Uniform",
          value: "uniform",
        },
        {
          title: "Individual",
          value: "individual",
        },
      ],
    },
  },
  {
    visible: "globalLayoutTopRightBottomLeftType == 'uniform'",
    title: "Inset",
    globalControl: "Inset",
  },
  {
    visible: "globalLayoutTopRightBottomLeftType == 'individual'",
    title: "Top",
    id: "globalLayoutTop",
    format: "top-{{value}}",
    themeSpacing: {
      mode: "single",
      default: {
        base: {
          value: 0,
        }
      },
    }
  },
  {
    visible: "globalLayoutTopRightBottomLeftType == 'individual'",
    title: "Right",
    id: "globalLayoutRight",
    format: "right-{{value}}",
    themeSpacing: {
      mode: "single",
      default: {
        base: {
          value: 0,
        }
      },
    }
  },
  {
    visible: "globalLayoutTopRightBottomLeftType == 'individual'",
    title: "Bottom",
    id: "globalLayoutBottom",
    format: "bottom-{{value}}",
    themeSpacing: {
      mode: "single",
      default: {
        base: {
          value: 0,
        }
      },
    }
  },
  {
    visible: "globalLayoutTopRightBottomLeftType == 'individual'",
    title: "Left",
    id: "globalLayoutLeft",
    format: "left-{{value}}",
    themeSpacing: {
      mode: "single",
      default: {
        base: {
          value: 0,
        }
      },
    }
  },
];

export default LayoutTopRightBottomLeft;
