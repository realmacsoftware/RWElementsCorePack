function getResponsiveColumns(columnsProp, names) {
    const deviceOrder = ["base", "sm", "md", "lg", "xl", "2xl"];
    // Build the columns for each device, falling back as needed
    const deviceColumns = deviceOrder.reduce((acc, key, idx) => {
        const prevKey = deviceOrder[idx - 1];
        acc[key] = columnsProp[key] ?? (prevKey ? acc[prevKey] : 0);
        return acc;
    }, {});

    // For each device, create responsive column data
    const items = deviceOrder.map((key, idx) => {
        const columnCount = deviceColumns[key];

        // Build visibility classes: show at this device, hide at all others
        const visibilityClasses = deviceOrder.map((otherKey, otherIdx) => {
            if (otherKey === key) {
                return otherKey === "base" ? "grid" : `${key}:grid`;
            } else {
                return otherKey === "base" ? "hidden" : `${otherKey}:hidden`;
            }
        });

        // Build grid column class for this device
        const gridClass =
            key === "base"
                ? `grid-cols-${columnCount}`
                : `${key}:grid-cols-${columnCount}`;

        return {
            device: key,
            columnCount: columnCount,
            items: Array.from({ length: columnCount }, (_, i) => i + 1),
            className: visibilityClasses.join(" "),
            gridClass: gridClass,
        };
    });

    return items;
}

function getResponsiveRows(rowsProp, names) {
    const deviceOrder = ["base", "sm", "md", "lg", "xl", "2xl"];
    // Build the rows for each device, falling back as needed
    const deviceRows = deviceOrder.reduce((acc, key, idx) => {
        const prevKey = deviceOrder[idx - 1];
        acc[key] = rowsProp[key] ?? (prevKey ? acc[prevKey] : 0);
        return acc;
    }, {});

    // For each device, create responsive row data
    const items = deviceOrder.map((key, idx) => {
        const rowCount = deviceRows[key];

        // Build visibility classes: show at this device, hide at all others
        const visibilityClasses = deviceOrder.map((otherKey, otherIdx) => {
            if (otherKey === key) {
                return otherKey === "base" ? "grid" : `${key}:grid`;
            } else {
                return otherKey === "base" ? "hidden" : `${otherKey}:hidden`;
            }
        });

        // Build grid row class for this device
        const gridClass =
            key === "base"
                ? `grid-rows-${rowCount}`
                : `${key}:grid-rows-${rowCount}`;

        return {
            device: key,
            rowCount: rowCount,
            items: Array.from({ length: rowCount }, (_, i) => i + 1),
            className: visibilityClasses.join(" "),
            gridClass: gridClass,
        };
    });

    return items;
}

const transformHook = (rw) => {
    const {
        globalID,
        showGrid,

        // Sizing
        columns,
        rows,
        gapX,
        gapY,

        // Layout
        autoFlow,
        autoColumns,
        autoRows,
        justifyItems,
        justifyContent,
        alignItems,
        alignContent,
    } = rw.props;
    const { columns: columnsProp, rows: rowsProp } = rw.responsiveProps;
    const { mode } = rw.project;
    const { id } = rw.node;
    const { names } = rw.theme.breakpoints;

    const wantsHorizontalDropzone = columns > 1;
    const link = globalLink(rw);
    const filter = globalFilter(rw);

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const responsiveColumns = getResponsiveColumns(columnsProp, names);
    const responsiveRows = getResponsiveRows(rowsProp || {}, names);

    const classes = [
        `group/${id} group/grid`,
        globalID && `group/${globalID}`,
        advancedClasses(rw),
        globalLayout(rw, { defaultDisplay: "grid" }),
        globalSizingContainer(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalFilters(rw),
        globalEffects(rw),
        globalTransforms(rw),
        globalBackground(rw),
        globalBorders(rw),

        columns,
        rows,
        gapX,
        gapY,
        autoFlow,
        autoColumns !== "auto-cols-none" && autoColumns,
        autoRows !== "auto-rows-none" && autoRows,
        justifyItems,
        justifyContent,
        alignItems,
        alignContent,
    ]
        .filter(Boolean)
        .join(" ");

    const overlay = {
        wrapper: `grid ${gapX} ${gapY} ${responsiveColumns
            .map((item) => item.gridClass)
            .join(" ")} ${responsiveRows
            .map((item) => item.gridClass)
            .join(
                " "
            )} absolute inset-0 transition duration-200 ease-in-out z-10 pointer-events-none border border-[#f59794]`,
        column: `overlay-column relative pointer-events-none col-span-1 row-span-full border-dashed border-[#f59794] bg-[#f59794]/10`,
        columns: responsiveColumns,
        row: `overlay-row pointer-events-none col-span-full row-span-1 border-dashed border-[#f59794] bg-[#f59794]/10`,
        rows: responsiveRows,
    };

    rw.setRootElement({
        as: link.hasLink ? "a" : globalHTMLTag(rw, "div"),
        class: classes,
        args: {
            id: globalID,
            ...link.args,
            ...filter.args,
            "data-filter-tags":
                rw.collections.tags?.map((tag) => tag.title).join(",") || "",
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        overlay,
        showOverlay: mode == "edit" && showGrid,
        wantsHorizontalDropzone,
        responsiveColumns,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

exports.transformHook = transformHook;
