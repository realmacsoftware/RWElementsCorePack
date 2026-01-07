const transformHook = (rw) => {
    const {
        wantedPages,
        wantedPagesPageLink,
        maxLevels,
        maxLevelsDepth,
        globalTransitionsDuration,
        previewSubMenus,
        icon: svgIcon,
        pageIconDisplay,
        pageIconSize,
        pageIconSpacing,
        topLevelGap,
        topLevelFont,
        topLevelSize,
        topLevelTextColor,
        topLevelTextColorHover,
        topLevelBorderRadius,
        topLevelBgColor,
        topLevelBgColorOpacity,
        topLevelBgColorHover,
        topLevelBgColorOpacityHover,
        topLevelFontWeight,
        topLevelLetterSpacing,
        topLevelLineHeight,
        subMenuIndent,
        subMenuBorderWidth,
        subMenuBorderColor,
        subMenuBorderColorOpacity,
        subMenuItemSpacing,
        itemPadding,
        subMenuItemPadding,
        subMenuItemFont,
        subMenuItemSize,
        subMenuItemBorderRadius,
        subMenuItemTextColor,
        subMenuItemBgColor,
        subMenuItemBgColorOpacity,
        subMenuItemTextColorHover,
        subMenuItemBgColorHover,
        subMenuItemBgColorOpacityHover,
        subMenuItemFontWeight,
        subMenuItemLetterSpacing,
        subMenuItemLineHeight,
        iconSize,
        iconPlacement,
        thirdLevelIndent,
        thirdLevelItemSpacing,
        thirdLevelBorderWidth,
        thirdLevelBorderColor,
        thirdLevelBorderColorOpacity,
        thirdLevelItemPadding,
        thirdLevelItemFont,
        thirdLevelItemSize,
        thirdLevelItemFontWeight,
        thirdLevelItemLetterSpacing,
        thirdLevelItemLineHeight,
        thirdLevelItemBorderRadius,
        thirdLevelItemTextColor,
        thirdLevelItemBgColor,
        thirdLevelItemBgColorOpacity,
        thirdLevelItemBgColorHover,
        thirdLevelItemBgColorOpacityHover,
        thirdLevelItemTextColorHover,
    } = rw.props;

    const hasSvgIcon = svgIcon?.format === "svg";

    // Create a stable slug from a title
    const slugify = (value) =>
        String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const openPages = [];

    // Helper function to recursively find the active page
    const findActivePage = (pages) => {
        if (!Array.isArray(pages)) return null;

        for (const page of pages) {
            if (page.isActive) {
                return page;
            }
            if (page.pages) {
                const activePage = findActivePage(page.pages);
                if (activePage) return activePage;
            }
        }
        return null;
    };

    // Efficient recursive traversal: include node only if it should be shown
    const buildPages = (pages, parentPath = "", relativeLevel = 0) => {
        const result = [];
        if (!Array.isArray(pages) || pages.length === 0) return result;

        // Check if we've reached the maximum depth limit
        const hasReachedMaxDepth =
            maxLevelsDepth === "manual" && maxLevels > 0 && relativeLevel >= maxLevels;

        for (let i = 0; i < pages.length; i += 1) {
            const page = pages[i];
            if (!(page.displayInMenu && !page.isDraft)) continue;

            const slug = slugify(page.title);
            const id = parentPath ? parentPath + "-" + slug : slug;

            // Only build children if we haven't reached the maximum depth
            const children = hasReachedMaxDepth
                ? []
                : buildPages(page.pages || [], id, relativeLevel + 1);

            const hasPages = children.length > 0;
            const hasActiveChild =
                hasPages &&
                children.some((c) => c.isActive || c.hasActiveChild);

            const processedPage = {
                ...page,
                id,
                pages: children,
                hasPages,
                hasActiveChild,
                isTopLevel: relativeLevel === 0,
                isSecondLevel: relativeLevel === 1,
                isThirdLevel: relativeLevel >= 2,
                showPageIcon: pageIconDisplay && relativeLevel === 0,
            };

            if (processedPage.isActive || hasActiveChild) {
                openPages.push(id);
            }

            result.push(processedPage);
        }

        return result;
    };

    const wantsAllPages = wantedPages === "all";
    const wantsActivePages = wantedPages === "active";
    const wantsSelectedPage = wantedPages === "manual";

    // Find folder recursively at any depth
    const findPageByTitle = (pages, targetTitle) => {
        for (const page of pages || []) {
            if (page.title === targetTitle) {
                return page;
            }

            // Search in sub-pages
            if (page.pages?.length > 0) {
                const found = findPageByTitle(page.pages, targetTitle);
                if (found) return found;
            }
        }
        return null;
    };

    const getWantedPages = () => {
        if (wantsAllPages) {
            return rw.pages;
        }

        if (wantsActivePages) {
            const currentPage = findActivePage(rw.pages);
            return currentPage ? currentPage.pages : [];
        }

        if (wantsSelectedPage && wantedPagesPageLink) {
            const folderPage = findPageByTitle(
                rw.pages,
                wantedPagesPageLink?.title
            );
            return folderPage ? folderPage.pages : [];
        }

        return rw.pages;
    };

    const pages = buildPages(getWantedPages());

    const classes = {
        wrapper: classnames([
            globalLayout(rw),
            globalLayout(rw),
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
        list: `flex flex-col ${topLevelGap}`,
        item: classnames([
            `group flex items-center gap-2 outline-none hover:cursor-pointer w-full`,
        ]).toString(),
        pageIcon: classnames([pageIconSize, pageIconSpacing]).toString(),
        iconWrapper: classnames([
            `appearance-none transition-transform`,
            globalTransitionsDuration,
            iconPlacement,
            iconSize,
        ]).toString(),
        topLevel: classnames([
            `transition-colors`,
            globalTransitionsDuration,
            itemPadding,
            topLevelFont,
            topLevelSize,
            topLevelFontWeight,
            topLevelLetterSpacing,
            topLevelLineHeight,
            topLevelTextColor,
            topLevelTextColorHover,
            topLevelBorderRadius,
            topLevelBgColor,
            topLevelBgColorOpacity,
            topLevelBgColorHover,
            topLevelBgColorOpacityHover,
        ]).toString(),
        title: "",
        active: "text-blue-500",
        subMenu: classnames([
            `flex flex-col`,
            subMenuItemSpacing,
            subMenuIndent,
            subMenuBorderWidth,
            subMenuBorderColor,
            subMenuBorderColorOpacity,
        ]).toString(),
        subMenuItem: classnames([
            `transition-colors`,
            globalTransitionsDuration,
            subMenuItemPadding,
            subMenuItemFont,
            subMenuItemSize,
            subMenuItemFontWeight,
            subMenuItemLetterSpacing,
            subMenuItemLineHeight,
            subMenuItemTextColor,
            subMenuItemBgColor,
            subMenuItemBgColorOpacity,
            subMenuItemBgColorHover,
            subMenuItemBgColorOpacityHover,
            subMenuItemTextColorHover,
            subMenuItemBorderRadius,
        ]).toString(),
        thirdLevel: classnames([
            `flex flex-col`,
            thirdLevelItemSpacing,
            thirdLevelIndent,
            thirdLevelBorderWidth,
            thirdLevelBorderColor,
            thirdLevelBorderColorOpacity,
        ]).toString(),
        thirdLevelItem: classnames([
            `transition-colors`,
            globalTransitionsDuration,
            thirdLevelItemPadding,
            thirdLevelItemFont,
            thirdLevelItemSize,
            thirdLevelItemFontWeight,
            thirdLevelItemLetterSpacing,
            thirdLevelItemLineHeight,
            thirdLevelItemBorderRadius,
            thirdLevelItemTextColor,
            thirdLevelItemBgColor,
            thirdLevelItemBgColorOpacity,
            thirdLevelItemBgColorHover,
            thirdLevelItemBgColorOpacityHover,
            thirdLevelItemTextColorHover,
        ]).toString(),
    };

    rw.setRootElement({
        as: "nav",
        class: classes.wrapper,
        attributes: {},
    });

    rw.setProps({
        pages,
        showSubMenus: rw.project.mode !== "edit" ? true : previewSubMenus,
        initialOpen: openPages.map((page) => `'${page}'`).join(","),
        classes,
        hasSvgIcon,
        svgIcon,
    });
};

exports.transformHook = transformHook;
