const transformHook = (rw) => {
    const {
        globalID,
        separatorIcon,
        separatorColor,
        separatorSize,
        showHome,
        homeLabel,
        gap,
        flexAlignItems,
    } = rw.props;

    const { project } = rw;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    // Build breadcrumb trail by walking the page tree
    const buildBreadcrumbs = (pages, trail = []) => {
        for (const page of pages) {
            if (page.isActive) {
                return [...trail, page];
            }
            if (page.hasActiveChild && page.pages) {
                const result = buildBreadcrumbs(page.pages, [
                    ...trail,
                    page,
                ]);
                if (result) return result;
            }
        }
        return null;
    };

    const trail = buildBreadcrumbs(rw.pages) || [];

    // Optionally prepend a Home item.
    // If the user is already on the home page (trail has a single top-level
    // active page with pageDepth 0), replace it with the home crumb rather
    // than prepending a duplicate.
    const wantsHome = showHome === true || showHome === "true";
    const homeCrumb = {
        title: homeLabel || "Home",
        url: project.siteUrl || "/",
        isActive: false,
        isHome: true,
    };

    // Detect whether the active page is the home page by checking its URL.
    // The home page typically has a root-relative URL like "./", "/", or "".
    const isHomePage = (page) => {
        const url = (page.url || "").replace(/\/+$/, "").replace(/^\.?\/?/, "");
        return url === "";
    };

    let breadcrumbs;
    if (!wantsHome) {
        breadcrumbs = trail;
    } else if (trail.length >= 1 && isHomePage(trail[0])) {
        // The first item in the trail IS the home page — replace it with
        // the home crumb (using the custom label) to avoid duplication.
        breadcrumbs = [
            { ...homeCrumb, isActive: trail[0].isActive },
            ...trail.slice(1),
        ];
    } else {
        breadcrumbs = [homeCrumb, ...trail];
    }

    // Mark each item with positional flags
    const items = breadcrumbs.map((crumb, index) => ({
        ...crumb,
        isFirst: index === 0,
        isLast: index === breadcrumbs.length - 1,
        showSeparator: index < breadcrumbs.length - 1,
    }));

    // Default chevron SVG used when no custom separator icon is provided
    const defaultChevron =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>';

    // Parse the size value from the format "size-{value}" — the raw prop
    // comes through as a formatted string like "size-4". We just need the
    // Tailwind size value (e.g. "4") to build w-/h- classes.
    const sizeValue = separatorSize
        ? separatorSize.replace("size-", "")
        : "4";

    const svgSizeClasses = `w-${sizeValue} h-${sizeValue}`;

    // Determine separator content: use custom resource SVG or fall back to
    // the default chevron. Inject size classes into whichever SVG is used.
    const hasCustomSeparator = separatorIcon?.image && separatorIcon.image.includes("<svg");

    const injectSvgClasses = (svgString) => {
        if (svgString.includes('class="')) {
            return svgString.replace(
                /class="[^"]*"/,
                `class="${svgSizeClasses}"`
            );
        }
        return svgString.replace(/<svg/, `<svg class="${svgSizeClasses}"`);
    };

    const separatorContent = hasCustomSeparator
        ? injectSvgClasses(separatorIcon.image)
        : injectSvgClasses(defaultChevron);

    // Classes
    const classes = {
        wrapper: classnames([
            "flex flex-wrap",
            flexAlignItems,
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
        list: classnames([
            "flex flex-wrap",
            flexAlignItems,
            gap,
            "list-none m-0 p-0",
        ]).toString(),
        item: classnames([
            "flex",
            flexAlignItems,
            gap,
        ]).toString(),
        link: classnames([
            globalTransitions(rw, true),
            globalMenuItem(rw),
        ]).toString(),
        current: classnames([
            globalMenuItem(rw),
        ]).toString(),
        separator: classnames([
            separatorColor,
            "flex-shrink-0",
        ]).toString(),
    };

    rw.setRootElement({
        as: globalHTMLTag(rw, "nav"),
        class: classes.wrapper,
        args: {
            "aria-label": "Breadcrumb",
            id: globalID,
        },
    });

    if (globalID && globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        items,
        classes,
        separatorContent,
        hasBreadcrumbs: items.length > 0,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
