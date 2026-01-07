export const Columns = [
  {
    visible: "globalGridOrFlexDisplayAs == 'grid'",
    title: "Columns",
    id: "globalGridItemColSpan",
    format: "col-span-{{value}}",
    slider: {
      default: {
        base: "6",
      },
      items: [
        { value: "auto", title: "Auto" },
        { value: "1", title: "1" },
        { value: "2", title: "2" },
        { value: "3", title: "3" },
        { value: "4", title: "4" },
        { value: "5", title: "5" },
        { value: "6", title: "6" },
        { value: "7", title: "7" },
        { value: "8", title: "8" },
        { value: "9", title: "9" },
        { value: "10", title: "10" },
        { value: "11", title: "11" },
        { value: "12", title: "12" },
      ],
    },
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'grid' && globalGridOrFlexItemSettings == 'advanced'",
    globalControl: "ColStart"
  },
  {
    visible: "globalGridOrFlexDisplayAs == 'grid' && globalGridOrFlexItemSettings == 'advanced'",
    globalControl: "ColEnd"
  }
];

export default Columns;
