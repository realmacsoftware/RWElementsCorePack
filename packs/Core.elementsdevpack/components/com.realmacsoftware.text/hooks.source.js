const transformHook = (rw) => {
    const {
        globalID,
        tag,
        customTag,
        headingTextAlign,
        linkColor,
        linkUnderline,
        linkFontWeight,
        linkColorHover,
        linkUnderlineHover,
        linkFontWeightHover,
        linkColorVisited,
        linkUnderlineVisited,
        linkFontWeightVisited,
    } = rw.props;

    const { mode } = rw.project;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    // add a function that loops over the link properties and adds a [&_a] modifier for each one
    const linkModifiers = Object.entries({
        linkColor,
        linkUnderline,
        linkFontWeight,
    })
        .map(([, value]) => injectPrefixOnDarkModeColors("[&_a]", `[&_a]:${value}`))
        .join(" ");

    const linkModifiersHover = Object.entries({
        linkColorHover,
        linkUnderlineHover,
        linkFontWeightHover,
    })
        .map(([, value]) =>
            injectPrefixOnDarkModeColors("[&_a:hover]", `[&_a:hover]:${value}`)
        )
        .join(" ");

    const linkModifiersVisited = Object.entries({
        linkColorVisited,
        linkUnderlineVisited,
        linkFontWeightVisited,
    })
        .map(([, value]) =>
            injectPrefixOnDarkModeColors("[&_a:visited]", `[&_a:visited]:${value}`)
        )
        .join(" ");

    const classes = classnames([
        linkModifiers,
        linkModifiersHover,
        linkModifiersVisited,
        advancedClasses(rw),
        globalLayout(rw),
        globalSizing(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalHeadingColor(rw),
        globalFilters(rw),
        globalEffects(rw),
        globalTransforms(rw),
        mode === "edit"
            ? classnames(
                  globalTextFontsAndTextStyles(rw).split(" ").filter(Boolean)
              )
                  .modifier("[&_[data-slate-node]]")
                  .toString()
            : globalTextFontsAndTextStyles(rw),
        globalBorders(rw),
        headingTextAlign,
    ]);

    const editClasses = classnames(classes.toString()).modifier("").toString();
    const rootElementTag =
        typeof tag === "string"
            ? tag === "custom"
                ? customTag
                : tag
            : "p";

    rw.setRootElement({
        as: rootElementTag,
        class:
            mode === "edit"
                ? classnames([editClasses]).toString()
                : classes.toString(),
        args: {
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
