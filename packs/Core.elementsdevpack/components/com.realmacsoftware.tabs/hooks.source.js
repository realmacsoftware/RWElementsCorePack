const transformHook = (rw) => {
    const {
        globalID,
        defaultActiveTab,
        editorActiveTab,
        tabListAlignment,
        tabListGap,
        tabListPadding,
        tabListBackground,
        tabListBorderRadius,
        tabButtonBackground,
        tabButtonTextColor,
        tabButtonBackgroundActive,
        tabButtonTextColorActive,
        tabButtonBackgroundHover,
        tabButtonTextColorHover,
        tabButtonShadow,
        tabButtonShadowActive,
        tabButtonShadowHover,
        tabButtonPadding,
        tabButtonBorderRadius,
        tabButtonBorderRadiusActive,
        tabButtonBorderRadiusHover,
        // Title styling
        tabTitleFont,
        // Font size per state
        tabTitleFontSize,
        tabTitleFontSizeActive,
        tabTitleFontSizeHover,
        // Font weight per state
        tabTitleFontWeight,
        tabTitleFontWeightActive,
        tabTitleFontWeightHover,
        // Letter spacing per state
        tabTitleLetterSpacing,
        tabTitleLetterSpacingActive,
        tabTitleLetterSpacingHover,
        // Line height per state
        tabTitleLineHeight,
        tabTitleLineHeightActive,
        tabTitleLineHeightHover,
        // Underline per state
        tabTitleUnderline,
        tabTitleUnderlineActive,
        tabTitleUnderlineHover,
        // Icon styling
        showIcon,
        iconPosition,
        iconGap,
        // Strip attributes
        iconStripSize,
        iconStripFill,
        iconStripStroke,
        iconStripStyles,
        // Icon size
        iconSize,
        iconSizeActive,
        iconSizeHover,
        // Icon fill
        iconFillColor,
        iconFillOpacity,
        iconFillColorActive,
        iconFillOpacityActive,
        iconFillColorHover,
        iconFillOpacityHover,
        // Icon stroke
        iconStrokeColor,
        iconStrokeOpacity,
        iconStrokeWidth,
        iconStrokeColorActive,
        iconStrokeOpacityActive,
        iconStrokeWidthActive,
        iconStrokeColorHover,
        iconStrokeOpacityHover,
        iconStrokeWidthHover,
        // Content
        tabContentPadding,
        tabContentBackground,
        tabContentBorderRadius,
    } = rw.props;

    const { mode } = rw.project;
    const { id } = rw.node;
    const { tabs } = rw.collections;
    const edit = mode === "edit";

    // Determine which tab to show as active in editor mode
    const activeTabIndex = edit
        ? Math.max(0, Math.min((parseInt(editorActiveTab) || 1) - 1, (tabs?.length || 1) - 1))
        : Math.max(0, Math.min((parseInt(defaultActiveTab) || 1) - 1, (tabs?.length || 1) - 1));

    // Icon position layout
    const wantsIcon = showIcon;
    const iconPositionClass = {
        left: "flex-row",
        right: "flex-row-reverse",
        top: "flex-col items-center",
    }[iconPosition] || "flex-row";

    // Base button classes (shared, no state-specific styles)
    const tabButtonBase = classnames([
        "flex items-center cursor-pointer transition-all",
        wantsIcon ? iconPositionClass : "items-center",
        wantsIcon && iconGap,
        tabButtonPadding,
        tabButtonBackgroundHover,
        tabButtonTextColorHover,
        tabButtonShadowHover,
        tabButtonBorderRadiusHover,
    ]).toString();

    // Inactive state classes (button)
    const tabButtonInactiveClasses = classnames([
        tabButtonBackground,
        tabButtonTextColor,
        tabButtonShadow,
        tabButtonBorderRadius,
    ]).toString();

    // Active state classes (button)
    const tabButtonActiveClasses = classnames([
        tabButtonBackgroundActive,
        tabButtonTextColorActive,
        tabButtonShadowActive,
        tabButtonBorderRadiusActive,
    ]).toString();

    // Title base classes (shared font + hover states)
    const titleBaseClasses = classnames([
        tabTitleFont,
        tabTitleFontSizeHover,
        tabTitleFontWeightHover,
        tabTitleLetterSpacingHover,
        tabTitleLineHeightHover,
        tabTitleUnderlineHover,
    ]).toString();

    // Title inactive state classes
    const titleInactiveClasses = classnames([
        tabTitleFontSize,
        tabTitleFontWeight,
        tabTitleLetterSpacing,
        tabTitleLineHeight,
        tabTitleUnderline,
    ]).toString();

    // Title active state classes
    const titleActiveClasses = classnames([
        tabTitleFontSizeActive,
        tabTitleFontWeightActive,
        tabTitleLetterSpacingActive,
        tabTitleLineHeightActive,
        tabTitleUnderlineActive,
    ]).toString();

    // Icon base classes (shared)
    const iconBaseClasses = classnames([
        "[&_svg]:shrink-0 [&_svg]:transition-all",
        iconSizeHover,
        iconFillColorHover,
        iconFillOpacityHover,
        iconStrokeColorHover,
        iconStrokeOpacityHover,
        iconStrokeWidthHover,
    ]).toString();

    // Icon state classes
    const iconInactiveClasses = classnames([
        iconSize,
        iconFillColor,
        iconFillOpacity,
        iconStrokeColor,
        iconStrokeOpacity,
        iconStrokeWidth,
    ]).toString();

    const iconActiveClasses = classnames([
        iconSizeActive,
        iconFillColorActive,
        iconFillOpacityActive,
        iconStrokeColorActive,
        iconStrokeOpacityActive,
        iconStrokeWidthActive,
    ]).toString();

    // Helper to strip SVG attributes
    const stripSvgAttributes = (svg) => {
        if (!svg || typeof svg !== "string") return svg;
        let result = svg;
        if (iconStripSize === "true") {
            result = result.replace(/\s*(width|height)="[^"]*"/gi, "");
        }
        if (iconStripFill === "true") {
            result = result.replace(/\s*fill="[^"]*"/gi, "");
        }
        if (iconStripStroke === "true") {
            result = result.replace(/\s*stroke="[^"]*"/gi, "");
        }
        if (iconStripStyles === "true") {
            result = result.replace(/\s*style="[^"]*"/gi, "");
        }
        return result;
    };

    // Process tabs from collection
    const tabItems = tabs?.map((tab, index) => {
        const isActive = index === activeTabIndex;
        const buttonStateClass = isActive ? tabButtonActiveClasses : tabButtonInactiveClasses;
        const titleStateClass = isActive ? titleActiveClasses : titleInactiveClasses;
        const iconStateClass = isActive ? iconActiveClasses : iconInactiveClasses;
        const hasIcon = tab.icon && tab.icon.format === "svg";
        const processedIcon = hasIcon ? stripSvgAttributes(tab.icon.image) : null;

        return {
            id: `tab-${id}-${index}`,
            title: tab.title || `Tab ${index + 1}`,
            icon: processedIcon,
            hasIcon,
            showIcon: wantsIcon && hasIcon,
            index: index,
            isActive,
            // In edit mode: base + state. In runtime: base only (Alpine controls state)
            buttonClass: edit ? `${tabButtonBase} ${buttonStateClass}` : tabButtonBase,
            titleClass: edit ? `${titleBaseClasses} ${titleStateClass}` : titleBaseClasses,
            iconClass: edit ? `${iconBaseClasses} ${iconStateClass}` : iconBaseClasses,
            // Pre-computed for template: hide panel in editor if not active
            hideInEditor: edit && !isActive,
        };
    }) || [
            { id: `tab-${id}-0`, title: "Tab 1", icon: null, hasIcon: false, showIcon: false, index: 0, isActive: true, buttonClass: edit ? `${tabButtonBase} ${tabButtonActiveClasses}` : tabButtonBase, titleClass: edit ? `${titleBaseClasses} ${titleActiveClasses}` : titleBaseClasses, iconClass: edit ? `${iconBaseClasses} ${iconActiveClasses}` : iconBaseClasses, hideInEditor: false },
            { id: `tab-${id}-1`, title: "Tab 2", icon: null, hasIcon: false, showIcon: false, index: 1, isActive: false, buttonClass: edit ? `${tabButtonBase} ${tabButtonInactiveClasses}` : tabButtonBase, titleClass: edit ? `${titleBaseClasses} ${titleInactiveClasses}` : titleBaseClasses, iconClass: edit ? `${iconBaseClasses} ${iconInactiveClasses}` : iconBaseClasses, hideInEditor: edit },
            { id: `tab-${id}-2`, title: "Tab 3", icon: null, hasIcon: false, showIcon: false, index: 2, isActive: false, buttonClass: edit ? `${tabButtonBase} ${tabButtonInactiveClasses}` : tabButtonBase, titleClass: edit ? `${titleBaseClasses} ${titleInactiveClasses}` : titleBaseClasses, iconClass: edit ? `${iconBaseClasses} ${iconInactiveClasses}` : iconBaseClasses, hideInEditor: edit },
        ];

    // Tab list layout classes
    const tabListAlignmentClass = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
    }[tabListAlignment] || "justify-start";

    // Build classes object
    const classes = {
        wrapper: classnames([
            `group/${id}`,
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
        tabList: classnames([
            "flex flex-row",
            tabListAlignmentClass,
            tabListGap,
            tabListPadding,
            tabListBackground,
            tabListBorderRadius,
        ]).toString(),
        tabButtonBase,
        tabButtonInactive: tabButtonInactiveClasses,
        tabButtonActive: tabButtonActiveClasses,
        titleBase: titleBaseClasses,
        titleInactive: titleInactiveClasses,
        titleActive: titleActiveClasses,
        iconBase: iconBaseClasses,
        iconInactive: iconInactiveClasses,
        iconActive: iconActiveClasses,
        tabPanelsWrapper: classnames([
            "grid [&>*]:col-start-1 [&>*]:row-start-1 overflow-hidden",
            tabContentBorderRadius,
        ]).toString(),
        tabPanel: classnames([
            tabContentPadding,
            tabContentBackground,
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": `elementsTabs('${id}', ${activeTabIndex})`,
            id: globalID || id,
        },
    });

    if (globalID && globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        id,
        classes,
        tabItems,
        edit,
        editorActiveTabIndex: activeTabIndex,
    });
};


exports.transformHook = transformHook;
