const FlexItem = [
  {
    title: "Alignment",
    heading: {},
    visible: "globalGridOrFlexDisplayAs == 'flex'"
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex'",
    globalControl: "AlignSelf"
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex'",
    globalControl: "JustifySelf"
  },
  {
    globalControl: "Order"
  },
  {
    title: "Advanced Settings",
    heading: {},
    visible: "globalGridOrFlexDisplayAs == 'flex' && globalGridOrFlexItemSettings == 'advanced'"
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex' && globalGridOrFlexItemSettings == 'advanced'",
    title: "Flex",
    id: "globalFlexItemFlex",
    format: "flex-{{value}}",
    segmented: {
      default: "none",
      items: [
        {
          value: "auto",
          title: "Auto"
        },
        {
          title: "None",
          value: "none"
        },
        {
          title: "1",
          value: "1"
        },
        {
          title: "Initial",
          value: "initial"
        }
      ]
    }
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex' && globalGridOrFlexItemSettings == 'advanced'",
    title: "Grow",
    id: "globalFlexItemGrow",
    segmented: {
      default: "",
      items: [
        {
          value: "",
          title: "Auto"
        },
        {
          title: "Grow",
          value: "grow"
        },
        {
          title: "No Grow",
          value: "grow-0"
        }
      ]
    }
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex' && globalGridOrFlexItemSettings == 'advanced'",
    title: "Shrink",
    id: "globalFlexItemShrink",
    segmented: {
      default: "",
      items: [
        {
          value: "",
          title: "Auto"
        },
        {
          title: "Shrink",
          value: "shrink"
        },
        {
          title: "No Shrink",
          value: "shrink-0"
        }
      ]
    }
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'flex' && globalGridOrFlexItemSettings == 'advanced'",
    title: "Basis",
    id: "globalFlexItemBasis",
    format: "basis-{{value}}",
    themeSpacing: {
      mode: "single",
      default: "auto"
    }
  },
]

export default FlexItem;
