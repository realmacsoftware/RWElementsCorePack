const transformHook = (rw) => {
    const {
        globalID,
        // CSV data source
        dataSource,
        csvFile,
        csvUrl,
        csvFirstRowIsHeader,
        // Manual mode
        rowCount,
        showHeader,
        showFooter,
        // Header styling
        headerBackground,
        headerVerticalAlignment,
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
        // Body borders
        bodyCellBorderStyle,
        bodyCellBorderWidth,
        bodyCellBorderColor,
        // Row styles
        stripedRows,
        oddRowBackground,
        evenRowBackground,
        enableRowHover,
        rowHoverBackground,
        // Footer styling
        footerBackground,
        footerVerticalAlignment,
        // Footer cells
        footerCellPadding,
        footerCellBorderStyle,
        footerCellBorderWidth,
        footerCellBorderColor,
        // Footer text
        footerTextAlignment,
        footerTextFont,
        footerTextColor,
        footerTextSize,
        footerTextWeight,
        footerTextLetterSpacing,
        // Interactive
        showSearch,
        searchPlaceholder,
        showPagination,
        rowsPerPage,
        showFirstLast,
        paginationPrevLabel,
        paginationNextLabel,
        paginationFirstLabel,
        paginationLastLabel,
        paginationPageText,
        // Search bar styling
        searchPadding,
        searchMarginBottom,
        searchFont,
        searchTextColor,
        searchTextSize,
        searchPlaceholderColor,
        searchBackground,
        searchBorderStyle,
        searchBorderWidth,
        searchBorderColor,
        searchBorderRadius,
        // Pagination styling
        paginationMarginTop,
        paginationAlignment,
        paginationFont,
        paginationTextSize,
        paginationTextColor,
        paginationDisabledColor,
    } = rw.props;

    const { mode } = rw.project;
    const { id } = rw.node;
    const { columns } = rw.collections;
    const edit = mode === "edit";

    // CSV data source
    const isCSVMode = dataSource === "csvFile" || dataSource === "csvUrl";
    let csvSource = "";
    if (dataSource === "csvFile") {
        csvSource = csvFile?.path || "";
    } else if (dataSource === "csvUrl") {
        csvSource = csvUrl || "";
    }
    const csvFirstRowHeader = csvFirstRowIsHeader === true || csvFirstRowIsHeader === "true";

    // Build rows array from rowCount
    const count = Math.max(1, parseInt(rowCount) || 3);
    const rows = Array.from({ length: count }, (_, i) => ({ index: i }));

    const wantsHeader = showHeader === true || showHeader === "true";
    const wantsFooter = showFooter === true || showFooter === "true";
    const wantsSearch = showSearch === true || showSearch === "true";
    const wantsPagination = showPagination === true || showPagination === "true";
    const wantsFirstLast = showFirstLast === true || showFirstLast === "true";
    const wantsRowHover = enableRowHover === true || enableRowHover === "true";
    const perPage = Math.max(1, parseInt(rowsPerPage) || 10);
    const pageTextFormat = paginationPageText || "Page {{page}} of {{total}}";

    // Process columns to include per-column classes (respects collection order)
    const resolveColumnAlignment = (columnAlignment, fallback) => columnAlignment || fallback || "";

    const processedColumns = columns?.map((col, index) => {
        const isDropzone = col.cellMode === "dropzone";
        const isSortable = col.columnSortable === true || col.columnSortable === "true";
        const isHidden = col.columnHidden === true || col.columnHidden === "true";

        return {
            ...col,
            index,
            isDropzone,
            isText: !isDropzone,
            isSortable: isSortable && !edit,
            widthClass: col.columnWidth || "",
            headerAlignmentClass: resolveColumnAlignment(col.columnAlignment, headerTextAlignment),
            bodyAlignmentClass: resolveColumnAlignment(col.columnAlignment, bodyTextAlignment),
            footerAlignmentClass: resolveColumnAlignment(col.columnAlignment, footerTextAlignment),
            hiddenClass: isHidden ? "hidden" : "",
            extraClasses: col.cssClasses || "",
        };
    }) || [];

    // Use table-fixed layout when any column has a custom (non-auto) width
    const hasCustomWidths = processedColumns.some((col) => {
        const w = col.columnWidth || "";
        return w.includes("[");
    });

    // Check if any column is sortable
    const hasSortableColumns = processedColumns.some((col) => col.isSortable);

    const csvColumnMeta = processedColumns.map((col) => ({
        widthClass: col.widthClass,
        headerAlignmentClass: col.headerAlignmentClass,
        bodyAlignmentClass: col.bodyAlignmentClass,
        hiddenClass: col.hiddenClass,
        extraClasses: col.extraClasses,
        isSortable: col.isSortable,
    }));

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
            headerTextFont,
            headerTextColor,
            headerTextSize,
            headerTextWeight,
            headerTextLetterSpacing,
        ]).toString(),
        tbody: "",
        tr: classnames([
            rowBgClasses,
            wantsRowHover ? "transition-colors" : "",
            wantsRowHover ? rowHoverBackground : "",
        ]).toString(),
        td: classnames([
            bodyCellPadding,
            bodyVerticalAlignment,
            bodyCellBorderStyle,
            bodyCellBorderWidth,
            bodyCellBorderColor,
            bodyTextFont,
            bodyTextColor,
            bodyTextSize,
            bodyTextWeight,
            bodyTextLetterSpacing,
        ]).toString(),
        tfootRow: classnames([
            footerBackground,
        ]).toString(),
        tfoot: classnames([
            footerCellPadding,
            footerVerticalAlignment,
            footerCellBorderStyle,
            footerCellBorderWidth,
            footerCellBorderColor,
            footerTextFont,
            footerTextColor,
            footerTextSize,
            footerTextWeight,
            footerTextLetterSpacing,
        ]).toString(),
        searchInput: classnames([
            "w-full outline-none",
            searchPadding,
            searchMarginBottom,
            searchFont,
            searchTextColor,
            searchTextSize,
            searchPlaceholderColor,
            searchBackground,
            searchBorderStyle,
            searchBorderWidth,
            searchBorderColor,
            searchBorderRadius,
        ]).toString(),
        pagination: classnames([
            "flex items-center gap-4",
            paginationMarginTop,
            paginationAlignment,
            paginationFont,
            paginationTextSize,
        ]).toString(),
        paginationText: classnames([
            paginationTextColor,
        ]).toString(),
        paginationButton: classnames([
            paginationTextColor,
            "cursor-pointer",
        ]).toString(),
        paginationButtonDisabled: classnames([
            paginationDisabledColor,
            "cursor-not-allowed",
        ]).toString(),
    };

    // Alpine config (passed as JSON to the template)
    const alpineConfig = {
        search: wantsSearch,
        pagination: wantsPagination,
        rowsPerPage: perPage,
        totalRows: isCSVMode ? 0 : count,
        sortable: hasSortableColumns,
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

    // Example data for edit mode preview when using CSV sources
    const previewColumnCount = Math.max(processedColumns.length, 1);
    const previewColumnLabel = (index) => {
        if (index < 26) {
            return `column_${String.fromCharCode(97 + index)}`;
        }
        return `column_${index + 1}`;
    };

    const headerRow = Array.from({ length: previewColumnCount }, (_, index) => ({
        label: previewColumnLabel(index),
    }));
    const headerAsCells = { cells: headerRow.map((h) => ({ value: h.label })) };
    const bodyRows = Array.from({ length: 5 }, (_, rowIndex) => ({
        cells: Array.from({ length: previewColumnCount }, (_, colIndex) => ({
            value: `row ${rowIndex + 1}, cell ${colIndex + 1}`,
        })),
    }));

    const mapHeaderColumnClasses = (col) => ({
        widthClass: col.widthClass,
        alignmentClass: col.headerAlignmentClass,
        hiddenClass: col.hiddenClass,
        extraClasses: col.extraClasses,
    });

    const mapBodyColumnClasses = (col) => ({
        widthClass: col.widthClass,
        alignmentClass: col.bodyAlignmentClass,
        hiddenClass: col.hiddenClass,
        extraClasses: col.extraClasses,
    });

    const buildPreviewCells = (sourceCells) => processedColumns.map((col, index) => ({
        value: sourceCells[index]?.value || "",
        ...mapBodyColumnClasses(col),
    }));

    // When first row is header: show header labels in thead, data in tbody
    // When it's not: header labels become the first body row (no thead)
    const exampleShowHeader = csvFirstRowHeader && wantsHeader;
    const examplePreviewHeaders = exampleShowHeader
        ? processedColumns.map((col, index) => ({
            label: headerRow[index]?.label || previewColumnLabel(index),
            ...mapHeaderColumnClasses(col),
        }))
        : [];
    const rawExampleRows = csvFirstRowHeader ? bodyRows : [headerAsCells, ...bodyRows];
    const examplePreviewRows = rawExampleRows.map((row) => ({
        cells: buildPreviewCells(row.cells),
    }));

    rw.setProps({
        // Alpine's sort() looks the wrapper up by id, so this must match the
        // id set on the root element (globalID wins when present)
        id: globalID || id,
        classes,
        columns: processedColumns,
        rows,
        showHeader: wantsHeader,
        showFooter: wantsFooter,
        showSearch: wantsSearch,
        showPagination: wantsPagination,
        showFirstLast: wantsFirstLast,
        searchPlaceholder: searchPlaceholder || "Search...",
        paginationPrevLabel: paginationPrevLabel || "Previous",
        paginationNextLabel: paginationNextLabel || "Next",
        paginationFirstLabel: paginationFirstLabel || "First",
        paginationLastLabel: paginationLastLabel || "Last",
        paginationPageText: pageTextFormat,
        // Pre-substituted variant for the static edit-mode pagination mock
        paginationPageTextStatic: pageTextFormat.split("{{page}}").join("1").split("{{total}}").join("1"),
        edit,
        alpineConfig: JSON.stringify(alpineConfig).replace(/"/g, "'"),
        csvColumnMeta: JSON.stringify(csvColumnMeta),
        // CSV mode
        isCSVMode,
        isCSVFile: dataSource === "csvFile",
        isCSVUrl: dataSource === "csvUrl",
        csvSource,
        csvFirstRowIsHeader: csvFirstRowHeader ? "true" : "false",
        // Example data for edit mode
        exampleShowHeader,
        examplePreviewHeaders,
        examplePreviewRows,
    });
};

exports.transformHook = transformHook;
