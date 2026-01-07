const HTMLTag = [
  {
    heading: {},
    title: "HTML Tag",
  },
  {
    information: {},
    title: "Select the HTML tag that will be used to render this component.",
  },
  {
    title: "Tag",
    id: "globalHTMLTag",
    responsive: false,
    default: "default",
    select: {
      items: [
        {
          value: "default",
          title: "Default (set by the component)",
        },
        {
          value: "div",
          title: "Div",
        },
        {
          value: "span",
          title: "Span",
        },
        {
          value: "section",
          title: "Section",
        },
        {
          value: "article",
          title: "Article",
        },
        {
          value: "aside",
          title: "Aside",
        },
        {
          value: "header",
          title: "Header",
        },
        {
          value: "footer",
          title: "Footer",
        },
        {
          value: "nav",
          title: "Nav",
        },
        {
          value: "main",
          title: "Main",
        },
        {
          value: "custom",
          title: "Custom",
        },
      ],
    },
  },
  {
    visible: "globalHTMLTag == 'custom'",
    title: "",
    id: "globalHTMLTagCustom",
    responsive: false,
    text: {
      default: "div",
    },
  },
  {
    visible: "globalHTMLTag == 'custom'",
    information: {},
    title: 'Enter the custom tag name without the enclosing brackets. E.g. "div".',
  },
];

export default HTMLTag;
