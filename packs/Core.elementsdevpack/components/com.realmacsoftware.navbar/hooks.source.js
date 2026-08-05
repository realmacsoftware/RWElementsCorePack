const transformHook = (rw) => {
    const {
        globalID,
        logoType,
        logoWidth,
        logoLink,
        logoMargin,

        contentWidthType,
        contentWidthTheme,
        contentHeightType,
        contentHeightTheme,

        itemsAlignment,
        contentGap,

        globalNavItemsBackgroundType,
        globalNavItemsBackgroundColor,
        globalNavItemsBackgroundOpacity,
        globalNavItemsBackgroundTypeHover,
        globalNavItemsBackgroundColorHover,
        globalNavItemsBackgroundOpacityHover,
        globalNavItemsBackgroundPadding,
        globalNavItemsBackgroundRadius,

        mobileTriggerDisplay,
        mobileTriggerPosition,
        mobileTriggerType,
        mobileTriggerColor,
        mobileTriggerColorHover,
        mobileCloseColor,
        mobileCloseColorHover,
        mobileCloseTop,
        mobileCloseRight,
        mobileCloseLeft,

        menuAnimation,
        mobileMenuBackground,
        mobileMenuBackgroundOpacity,
        mobileMenuBlur,
        mobileMenuPreview,
        mobileMenuPositionType,
        mobileMenuPositionTop,
        mobileMenuPositionRight,
        mobileMenuPositionBottom,
        mobileMenuPositionLeft,
        mobileMenuInset,
        mobileMenuShadow,
        mobileMenuBorder,
        mobileMenuBorderColor,
        mobileMenuRounded,
        mobileBackdropColor,
        mobileBackdropOpacity,
        mobileBackdropBlur,
        desktopSubmenuPadding,
        submenuItemSpacing,
    } = rw.props;
    const { project } = rw;
    const { logo, title } = project;
    const { id } = rw.node;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const hasLogoLink = logoLink?.href?.length > 0;

    // Checks the raw page tree so an active page hidden from the menu
    // (displayInMenu == false) still highlights its ancestor folders
    const hasActiveDescendant = (page) =>
        (page.pages || []).some(
            (child) => child.isActive || hasActiveDescendant(child)
        );

    // Recursive function to filter pages
    const filterPages = (pages) => {
        return pages
            .filter((page) => page.displayInMenu && !page.isDraft)
            .map((page) => {
                const filteredPages = page.pages
                    ? filterPages(page.pages)
                    : null;
                return {
                    ...page,
                    pages: filteredPages,
                    hasPages: filteredPages ? filteredPages.length > 0 : false,
                    hasActiveChild: hasActiveDescendant(page),
                };
            });
    };

    // Apply the recursive filter to the top-level pages
    const pages = filterPages(rw.pages);

    const hasLogo = !!logo.url;
    const wantsLogo = logoType == "logo";
    const wantsTitle = logoType == "title";
    const contentWidthProps = {
        props: {
            ...rw.props,
            globalWidthType: contentWidthType,
            globalWidth: contentWidthTheme,
            globalHeightType: contentHeightType,
            globalHeight: contentHeightTheme,

            globalSizingMinMaxEnabled: false,
            globalMinWidth: false,
            globalMaxWidth: false,
            globalMinHeight: false,
            globalMaxHeight: false,
        },
        ...rw.props,
    };

    // Ensure the logoLink has an href, title, and target
    if (!logoLink.href) logoLink.href = project.siteUrl || "/";
    if (!logoLink.title) logoLink.title = project.title;
    if (!logoLink.target) logoLink.target = "_self";

    const deviceModifierForMobileTrigger = mobileTriggerDisplay
        ? `${mobileTriggerDisplay}:`
        : "";
    console.log({ deviceModifierForMobileTrigger });

    const menuItemBackgroundClasses = classnames([
        globalNavItemsBackgroundType == "color" && globalNavItemsBackgroundColor,
        globalNavItemsBackgroundType == "color" && globalNavItemsBackgroundOpacity,
        globalNavItemsBackgroundTypeHover == "color" &&
        globalNavItemsBackgroundColorHover,
        globalNavItemsBackgroundTypeHover == "color" &&
        globalNavItemsBackgroundOpacityHover,
        globalNavItemsBackgroundPadding,
        globalNavItemsBackgroundRadius,
    ]).toString();

    const classes = {
        wrapper: classnames([
            `group/${id} group/navbar items-center`,
            globalLayout(rw, { defaultDisplay: "flex" }),
            globalSizingContainer(rw),
            globalSpacingMargin(rw),
            globalTransitions(rw),
            globalBackground(rw),
            globalBorders(rw),
            globalFilters(rw),
            globalEffects(rw),
            globalTransforms(rw),
            advancedClasses(rw),
        ]).toString(),
        logoWrapper: classnames([
            `flex`,
            mobileTriggerPosition == "first" &&
            `order-last ${deviceModifierForMobileTrigger}order-first`,
            itemsAlignment != "start" &&
            `${deviceModifierForMobileTrigger}flex-1`,
            logoMargin,
        ]).toString(),
        logo: `${logoWidth} h-auto`,
        title: classnames([globalNavTitle(rw)]).toString(),
        desktop: {
            nav: classnames([
                `mx-auto flex items-center justify-between`,
                globalSizingContainer(contentWidthProps),
                globalSpacingPadding(rw),
            ]).toString(),
            items: classnames([
                `hidden ${deviceModifierForMobileTrigger}flex`,
                contentGap,
            ]).toString(),
            item: classnames([
                // `text-sm font-semibold leading-6 text-gray-900`,
                globalNavItems(rw),
                menuItemBackgroundClasses,
                globalTransitions(rw, { isContainer: true }),
            ]).toString(),
            logo: classnames([`h-8 w-auto`]).toString(),
            rightItems: classnames([
                `hidden ${deviceModifierForMobileTrigger}flex ${deviceModifierForMobileTrigger}justify-end`,
                itemsAlignment != "end" &&
                `${deviceModifierForMobileTrigger}flex-1`,
            ]).toString(),
            subMenu: classnames([
                `w-max`,
                mobileMenuBackground,
                mobileMenuBackgroundOpacity,
                mobileMenuBlur,
                mobileMenuShadow,
                mobileMenuRounded,
                mobileMenuBorder,
                mobileMenuBorderColor,
            ]).toString(),
            subMenuPadding: classnames([desktopSubmenuPadding]).toString(),
            dropdownItem: classnames([
                `block px-4`,
                submenuItemSpacing,
                globalNavItems(rw),
                menuItemBackgroundClasses,
                globalTransitions(rw, { isContainer: true }),
            ]).toString(),
        },
        mobile: {
            menuButton: classnames([
                "flex",
                deviceModifierForMobileTrigger.length
                    ? `${deviceModifierForMobileTrigger}hidden`
                    : "",
            ]).toString(),
            trigger: classnames([
                `cursor-pointer`,
                mobileTriggerColor,
                mobileTriggerColorHover,
            ]).toString(),
            closeTrigger: classnames([
                globalTransitions(rw, { isContainer: true }),
                `absolute inline-flex items-center justify-center rounded-md p-2.5`,
                `cursor-pointer`,
                mobileTriggerColor,
                mobileTriggerColorHover,
                mobileTriggerPosition == "first" &&
                `order-first ${deviceModifierForMobileTrigger}order-last`,
                mobileCloseTop,
                mobileCloseRight,
                mobileCloseLeft,
            ]).toString(),
            closeSvg: classnames([
                `size-6 transition-colors duration-300`,
                mobileCloseColor,
                mobileCloseColorHover,
            ]).toString(),
            nav: classnames([`-my-6 divide-y divide-gray-500/10`]).toString(),
            items: classnames([]).toString(),
            item: classnames([
                `block`,
                submenuItemSpacing,
                globalNavItems(rw),
                menuItemBackgroundClasses,
                globalTransitions(rw, { isContainer: true }),
            ]).toString(),
            backdrop: classnames([
                `fixed inset-0 z-50 duration-150 pointer-events-none`,
                mobileBackdropColor,
                mobileBackdropOpacity,
                mobileBackdropBlur,
            ]).toString(),
            menu: classnames([
                `fixed z-50 origin-top p-8 ring-1 ring-zinc-900/5 duration-150`,
                `overflow-y-auto`,
                mobileMenuBackground,
                mobileMenuBackgroundOpacity,
                mobileMenuBlur,
                mobileMenuShadow,
                mobileMenuRounded,
                mobileMenuBorder,
                mobileMenuBorderColor,
                mobileMenuPositionType == "uniform" && mobileMenuInset,
                mobileMenuPositionType == "individual" &&
                `${mobileMenuPositionTop} ${mobileMenuPositionRight} ${mobileMenuPositionBottom} ${mobileMenuPositionLeft}`,
                // With bottom at "auto" the fixed panel sizes to its content
                // and can extend past the viewport, where the body scroll
                // lock makes items unreachable — clamp the height so
                // overflow-y-auto engages (3rem ≈ the default top-6 offset
                // plus matching breathing room below)
                mobileMenuPositionType == "individual" &&
                mobileMenuPositionBottom.includes("bottom-auto") &&
                `max-h-[calc(100dvh-3rem)]`,
            ]).toString(),
        },
    };

    rw.setRootElement({
        as: globalHTMLTag(rw, "header"),
        class: classes.wrapper,
        args: {
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        pages,
        wantsLogo,
        wantsTitle,
        hasLogo,
        wantsMobileTrigger: mobileTriggerType == "hamburger",
        hasLogoLink,
        logoLink,
        project,
        mobileBackdropTransitionAttributes:
            getAlpineTransitionAttributesMobile("fade"),
        mobileTransitionAttributes:
            getAlpineTransitionAttributesMobile(menuAnimation),
        desktopTransitionAttributes:
            getAlpineTransitionAttributesDesktop(menuAnimation),
        mobileMenuId: `mobile-menu-${id}`,
        mobileMenuPreview:
            mobileMenuPreview == "true" || mobileMenuPreview == "true",
        includeMobileMenu:
            mobileMenuPreview == "true" || rw.project.mode != "edit",
        includeDesktopSubmenu: rw.project.mode != "edit",
        edit: rw.project.mode == "edit",
        deviceModifierForMobileTrigger,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
