const transformHook = (rw) => {
    const {
        placeholder,
        placeholderColor,
        minChars,
        maxResults,
        includeHiddenPages,
        emptyText,
        resultsBackground,
        resultsBorderRadius,
        resultsShadow,
        resultsMaxHeight,
        resultsDivider,
        itemPadding,
        itemHoverBackground,
        globalSpacingEnabled,
        globalMargin,
        globalPadding,
    } = rw.props;

    const { id } = rw.node;
    const edit = rw.project.mode === "edit";

    // The index is instance-independent: it always contains every published
    // page (with a `menu` flag), so the includeOnce portal blob is identical
    // no matter which Site Search instance on the page emits it. Per-instance
    // filtering happens client-side.
    const buildIndex = (pages, out = []) => {
        for (const page of pages || []) {
            if (page.isDraft) continue;
            if (!page.isFolder) {
                out.push({
                    title: page.title,
                    url: page.url,
                    menu: Boolean(page.displayInMenu),
                    newWindow: Boolean(page.openInNewWindow),
                });
            }
            if (page.pages) {
                buildIndex(page.pages, out);
            }
        }
        return out;
    };

    // < keeps the blob valid JSON while neutralising </script> and <!--
    const searchIndexJson = JSON.stringify(buildIndex(rw.pages)).replace(
        /</g,
        "\\u003c"
    );

    const showDivider = resultsDivider === true || resultsDivider === "true";

    const classes = {
        wrapper: classnames([
            "relative",
            globalSpacingEnabled == "true" && globalMargin,
            globalLayout(rw),
            globalSizing(rw),
            advancedClasses(rw),
        ]).toString(),
        input: classnames([
            "appearance-none w-full ring-0 focus:ring-0",
            globalSpacingEnabled == "true" && globalPadding,
            globalTransitions(rw),
            globalEffects(rw, { focus: true }),
            globalFilters(rw, { focus: true }),
            globalTransforms(rw, { focus: true }),
            globalBackground(rw, { focus: true }),
            globalBorders(rw, { focus: true }),
            globalInputFontAndTextStyles(rw),
            globalOutline(rw),
            placeholderColor,
        ]).toString(),
        panel: classnames([
            edit
                ? "relative mt-2"
                : "absolute z-50 mt-2 w-full overflow-y-auto",
            !edit && resultsMaxHeight,
            resultsBackground,
            resultsBorderRadius,
            resultsShadow,
            showDivider && "divide-y",
        ]).toString(),
        item: classnames([
            "block cursor-pointer",
            itemPadding,
            itemHoverBackground,
        ]).toString(),
        empty: classnames([itemPadding]).toString(),
    };

    const minCharsNum = parseInt(minChars, 10) || 2;
    const maxResultsNum = parseInt(maxResults, 10) || 10;
    const includeHidden =
        includeHiddenPages === true || includeHiddenPages === "true";

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: edit
            ? {}
            : {
                  "x-data": `siteSearch(${minCharsNum}, ${maxResultsNum}, ${includeHidden})`,
              },
    });

    rw.setProps({
        classes,
        placeholder,
        emptyText,
        edit,
        id,
        searchIndexJson,
        componentAssetPath: rw.component.assetPath,
    });
};

exports.transformHook = transformHook;
