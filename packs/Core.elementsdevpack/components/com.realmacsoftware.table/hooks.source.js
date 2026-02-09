const transformHook = (rw) => {
    const {
        globalID,
        rowCount,
        showHeader,
        // Header styling
        headerBackground,
        // Header cells
        headerCellPadding,
        headerCellBorderStyle,
        headerCellBorderWidth,
        headerCellBorderColor,
        // Header text
        headerTextAlignment,
        headerTextFont,
        headerTextColor,
        headerTextSize,
        headerTextWeight,
        headerTextLetterSpacing,
        // Body styling
        stripedRows,
        oddRowBackground,
        evenRowBackground,
        // Body cells
        bodyCellPadding,
        // Body text
        bodyTextAlignment,
        bodyTextFont,
        bodyTextColor,
        bodyTextSize,
        bodyTextWeight,
        bodyTextLetterSpacing,
        // Borders
        bodyCellBorders,
        bodyCellBorderWidth,
        bodyCellBorderColor,
    } = rw.props;

    const { id } = rw.node;
    const { columns } = rw.collections;

    // Build rows array from rowCount
    const count = Math.max(1, parseInt(rowCount) || 3);
    const rows = Array.from({ length: count }, (_, i) => ({ index: i }));

    // Process columns to include per-column width classes (respects collection order)
    const processedColumns = columns?.map((col, index) => ({
        ...col,
        widthClass: col.columnWidth || "",
        index,
    })) || [];

    // Use table-fixed layout when any column has a custom (non-auto) width
    const hasCustomWidths = processedColumns.some((col) => {
        const w = col.columnWidth || "";
        return w.includes("[");
    });

    // Row background classes
    const wantsStripes = stripedRows === true || stripedRows === "true";
    const rowBgClasses = wantsStripes
        ? classnames([oddRowBackground, evenRowBackground]).toString()
        : classnames([oddRowBackground?.replace(/odd:/g, "") || ""]).toString();

    // Build classes object
    const classes = {
        wrapper: classnames([
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            globalTransitions(rw),
            globalEffects(rw),
            globalFilters(rw),
            globalTransforms(rw),
            globalBackground(rw),
            advancedClasses(rw),
        ]).toString(),
        table: classnames([
            "min-w-full w-full border-collapse",
            hasCustomWidths ? "table-fixed" : "",
            globalBorders(rw),
        ]).toString(),
        theadRow: classnames([
            headerBackground,
        ]).toString(),
        th: classnames([
            headerCellPadding,
            headerCellBorderStyle,
            headerCellBorderWidth,
            headerCellBorderColor,
            headerTextAlignment,
            headerTextFont,
            headerTextColor,
            headerTextSize,
            headerTextWeight,
            headerTextLetterSpacing,
        ]).toString(),
        tbody: "",
        tr: classnames([
            rowBgClasses,
        ]).toString(),
        td: classnames([
            bodyCellPadding,
            bodyCellBorderWidth,
            bodyCellBorderColor,
            bodyCellBorders,
            bodyTextAlignment,
            bodyTextFont,
            bodyTextColor,
            bodyTextSize,
            bodyTextWeight,
            bodyTextLetterSpacing,
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            id: globalID || id,
        },
    });

    if (globalID && globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    const wantsHeader = showHeader === true || showHeader === "true";

    rw.setProps({
        classes,
        columns: processedColumns,
        rows,
        showHeader: wantsHeader,
    });
};

exports.transformHook = transformHook;
