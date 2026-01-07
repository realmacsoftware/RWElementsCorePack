const Order = [
  {
    visible: "globalGridOrFlexDisplayAs != 'default' && globalGridOrFlexItemSettings == 'advanced'",
    title: "Order",
    id: "globalGridOrFlexItemOrder",
    format: "order-{{value}}",
    segmented: {
      default: "none",
      items: [
        {
          value: "none",
          title: "Auto"
        },
        {
          value: "first",
          title: "First"
        },
        {
          value: "last",
          title: "Last"
        },
        {
          value: "custom",
          title: "Custom"
        }
      ]
    }
  },
  {
    visible: "globalGridOrFlexDisplayAs != 'default' && globalGridOrFlexItemSettings == 'advanced' && globalGridOrFlexItemOrder == 'custom'",
    title: "Custom",
    id: "globalGridOrFlexItemOrderCustom",
    format: "order-[{{value}}]",
    number: {
      default: 1
    }
  },
  {
    title: "Requires other grid items to have an order value set.",
    information: {},
    visible: "globalGridOrFlexDisplayAs != 'default' && globalGridOrFlexItemSettings == 'advanced' && globalGridOrFlexItemOrder == 'custom'"
  }
]

export default Order;
