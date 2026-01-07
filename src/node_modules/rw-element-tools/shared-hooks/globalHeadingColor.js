const globalHeadingTextColor = (rw, type, prefix) => {
    const {
        globalTextColor: color,
        globalTextColorOpacity: opacity,
        globalTextColorHover: colorHover,
        globalTextColorOpacityHover: opacityHover,
    } = rw.props;

    return classnames([
        color,
        opacity,
        ...(type == "hover"
            ? [
                  addPrefixToTailwindClasses(colorHover, prefix),
                  addPrefixToTailwindClasses(opacityHover, prefix),
              ]
            : []),
    ]).toString();
};

const globalHeadingColor = (rw) => {
    const {
        globalBgType,
        globalControlTypeBg: type,
        globalHoverGroupBg: hoverGroup,
        globalHoverGroupCustomIdBg: customId,
    } = rw.props;
    const { mode } = rw.project;
    const { node } = rw;

    const prefix = getHoverPrefix(node, "", hoverGroup, customId);

    let classes = classnames([]);
    switch (globalBgType) {
        case "color":
            classes.add(globalHeadingTextColor(rw, type, prefix));
            break;
        case "gradient":
            classes
                .add([
                    "bg-clip-text",
                    "text-[transparent]",
                    ...globalBgGradient(rw, {
                        prefix: prefix,
                        prefixCallback: addPrefixToTailwindClasses,
                    })
                        .split(" ")
                        .filter(Boolean),
                ])
                .modifier(mode == "edit" ? "[&_span]" : "");
            break;
        case "image":
            classes
                .add([
                    "bg-clip-text",
                    "text-[transparent]",
                    ...globalBgImage(rw, {
                        prefix: prefix,
                        prefixCallback: addPrefixToTailwindClasses,
                    })
                        .split(" ")
                        .filter(Boolean),
                ])
                .modifier(mode == "edit" ? "[&_span]" : "");
            break;
    }

    return classes.toString();
};
