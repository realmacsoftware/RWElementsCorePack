const parseCSV = (csvString) => {
    const lines = csvString.split('\n').filter((line) => line.trim().length > 0);
    const rows = [];
    const headers = [];

    lines.forEach((line, index) => {
        const cells = line.split(',').map((cell) => cell.trim());
        if (index === 0) {
            headers.push(...cells);
        } else {
            rows.push(cells);
        }
    });

    return { headers, rows };
};

const fetchCSV = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching CSV:', error);
        return '';
    }
};

const transformHook = (rw) => {
    const {
        globalID,
        rowCount,
        showHeader,
        dataSource,
        csvResource,
        csvUrl,
        csvFirstRowHeader,
        // Header styling
        headerBackground,
        // Header cells
        headerCellPadding,
        headerVerticalAlignment,
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
        bodyVerticalAlignment,
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

    let rows = [];
    let processedColumns = [];

    // Handle CSV data source
    if (dataSource === 'csv') {
        let csvData = '';

        // Try to get CSV from resource first
        if (csvResource && csvResource.url) {
            csvData = csvResource.url;
        } else if (csvUrl) {
            csvData = csvUrl;
        }

        if (csvData) {
            const parsed = parseCSV(csvData);
            const usesFirstRowAsHeader = csvFirstRowHeader === true || csvFirstRowHeader === 'true';

            // Set up columns from CSV
            const columnLabels = usesFirstRowAsHeader ? parsed.headers : [];
            processedColumns = columnLabels.map((label, index) => ({
                column: label || `Column ${index + 1}`,
                columnWidth: '',
                widthClass: '',
                index,
            }));

            // Set up rows from CSV data
            rows = (usesFirstRowAsHeader ? parsed.rows : [parsed.headers, ...parsed.rows]).map((rowData, rowIndex) => ({
                index: rowIndex,
                cells: rowData.map((cell, colIndex) => ({
                    text: cell,
                    columnIndex: colIndex,
                })),
            }));
        } else {
            // No CSV data, show empty table
            rows = [];
            processedColumns = [];
        }
    } else {
        // Manual data source - use existing logic
        // Build rows array from rowCount
        const count = Math.max(1, parseInt(rowCount) || 3);
        rows = Array.from({ length: count }, (_, i) => ({ index: i }));

        // Process columns to include per-column width classes (respects collection order)
        processedColumns = columns?.map((col, index) => ({
            ...col,
            widthClass: col.columnWidth || "",
            index,
        })) || [];
    }

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
            globalBordersTable(rw),
        ]).toString(),
        theadRow: classnames([
            headerBackground,
        ]).toString(),
        th: classnames([
            headerCellPadding,
            headerVerticalAlignment,
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
            bodyVerticalAlignment,
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
