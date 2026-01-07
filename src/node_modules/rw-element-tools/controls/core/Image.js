export const Image = [
    {
        title: "Type",
        id: "imageType",
        segmented: {
            default: "resource",
            items: [
                {
                    title: "Resource",
                    value: "resource",
                },
                {
                    title: "Custom",
                    value: "custom",
                },
                {
                    title: "CMS",
                    value: "cms",
                },
            ],
        },
    },
    {
        title: "Mode",
        id: "imageMode",
        segmented: {
            default: "light",
            items: [
                {
                    icon: "sun.max",
                    value: "light",
                },
                {
                    icon: "moon",
                    value: "dark",
                },
            ],
        },
    },
    {
        visible: "imageType == 'custom' && imageMode == 'light'",
        title: "Source",
        id: "imageCustomSource",
        text: {
            default: "",
        },
    },
    {
        visible: "imageType == 'custom' && imageMode == 'dark'",
        title: "Source",
        id: "imageCustomSourceDark",
        text: {
            default: "",
        },
    },
    {
        visible: "imageType == 'cms' && imageMode == 'light'",
        title: "Field",
        id: "imageCmsField",
        text: {
            default: "{{item.image.src}}"
        },
    },
    {
        visible: "imageType == 'cms' && imageMode == 'dark'",
        title: "Field",
        id: "imageCmsFieldDark",
        text: {
            default: "{{item.image.src}}"
        },
    },
    {
        visible: "imageType == 'resource' && imageMode == 'light'",
        title: "Image",
        id: "image",
        resource: {},
    },
    {
        visible: "imageType == 'resource' && imageMode == 'dark'",
        title: "Image",
        id: "imageDark",
        resource: {},
    },
    {
        title: "Alt",
        id: "imageAlt",
        responsive: false,
        text: {
            subtitle: "Used for SEO and accessibility",
            default: "",
        },
    },
];

export default Image;
