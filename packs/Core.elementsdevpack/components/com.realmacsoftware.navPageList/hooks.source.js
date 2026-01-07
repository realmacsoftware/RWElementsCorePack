const transformHook = (rw) => {
    const {
        show,
        folderLink,
        flexDirection,
        flexAlignItems,
        flexJustify,
        gap,
        showIcons,
        iconSize,
        iconSpacing,
        iconLayout,
        iconAlignment,
        showPageTitles = true,
    } = rw.props;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const classes = {
        wrapper: classnames([
            `flex`,
            flexDirection,
            flexAlignItems,
            flexJustify,
            gap,
            globalLayout(rw, { defaultDisplay: "flex" }),
            globalSizing(rw),
            globalSpacing(rw),
            globalTransitions(rw),
            globalEffects(rw),
            globalFilters(rw),
            globalTransforms(rw),
            globalBackground(rw),
            globalBorders(rw),
            advancedClasses(rw),
        ]).toString(),
        item: classnames([
            `flex`,
            showIcons ? iconAlignment : "items-center",
            showIcons ? iconSpacing : "",
            showIcons ? iconLayout : "",
            globalTransitions(rw, true),
            globalMenuItem(rw),
        ]).toString(),
        icon: classnames([iconSize, iconSpacing]).toString(),
    };

    // Process and filter pages recursively
    const processPages = (pages) => {
        return pages
            .filter(
                (page) => page.displayInMenu && !page.isDraft && !page.isFolder
            )
            .map((page) => {
                // Process sub-pages recursively
                const processedSubPages = page.pages
                    ? processPages(page.pages)
                    : null;

                // Process icon
                const { icon } = page;
                const isSvgIcon = icon?.format === "svg";
                const hasIcon = Boolean(icon?.format);
                const shouldShowIcon = showIcons && hasIcon;

                // Add CSS classes to SVG icons
                const processedIconSvg =
                    isSvgIcon && icon.image
                        ? icon.image.includes('class="')
                            ? icon.image.replace(
                                  /class="[^"]*"/g,
                                  `class="${classes.icon}"`
                              )
                            : icon.image.replace(
                                  /<svg/,
                                  `<svg class="${classes.icon}"`
                              )
                        : null;

                return {
                    ...page,
                    pages: processedSubPages,
                    hasPages: Boolean(processedSubPages?.length),
                    iconIsSvg: isSvgIcon,
                    hasIcon,
                    showIcon: shouldShowIcon,
                    iconSvg: processedIconSvg,
                };
            });
    };

    // Get pages based on show mode and folder selection
    const getWantedPages = () => {
        if (show === "all") {
            return rw.pages;
        }

        if (!folderLink?.title) {
            return [];
        }

        // Find folder recursively at any depth
        const findFolder = (pages, targetTitle) => {
            for (const page of pages || []) {
                if (page.title === targetTitle && page.isFolder) {
                    return page;
                }

                // Search in sub-pages
                if (page.pages?.length > 0) {
                    const found = findFolder(page.pages, targetTitle);
                    if (found) return found;
                }
            }
            return null;
        };

        const targetFolder = findFolder(rw.pages, folderLink.title);
        return targetFolder?.pages || [];
    };

    const wantedPages = getWantedPages();
    const pages = processPages(wantedPages);

    rw.setRootElement({
        as: globalHTMLTag(rw, "nav"),
        class: classes.wrapper,
        args: {},
    });

    rw.setProps({
        pages,
        showPageTitles,
        classes,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
