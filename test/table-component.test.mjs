import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.realmacsoftware.table/hooks.source.js";

function classnames(initialClasses = "") {
    const initialClassArray = Array.isArray(initialClasses)
        ? initialClasses
        : initialClasses.split(" ").filter(Boolean);
    const classes = new Set(initialClassArray.filter(Boolean));

    return {
        add(className) {
            (Array.isArray(className) ? className : [className]).forEach((cls) => {
                if (cls) classes.add(cls);
            });
            return this;
        },
        toString() {
            return Array.from(classes).join(" ");
        },
    };
}

function loadTransformHook() {
    const source = fs.readFileSync(hookPath, "utf8");
    const sandbox = {
        exports: {},
        JSON,
        Array,
        Math,
        parseInt,
        classnames,
        globalLayout: () => "layout",
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalFilters: () => "filters",
        globalTransforms: () => "transforms",
        globalBackground: () => "background",
        globalBordersTable: () => "borders-table",
        advancedClasses: () => "advanced",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderTable({ props = {}, columns, mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: {
            globalID: "",
            rowCount: 3,
            showHeader: true,
            oddRowBackground: "odd:bg-surface-50",
            stripedRows: false,
            evenRowBackground: "even:bg-surface-100",
            bodyCellPadding: "p-2",
            ...props,
        },
        node: { id: "node-1" },
        project: { mode },
        collections: {
            columns: columns ?? [{ columnWidth: "" }, { columnWidth: "" }, { columnWidth: "" }],
        },
        setRootElement(root) {
            this.root = root;
        },
        setProps(computed) {
            this.computedProps = computed;
        },
        addAnchor(id) {
            this.anchor = id;
        },
    };

    transformHook(rw);
    return rw;
}

test("defaults keep legacy manual-mode behaviour", () => {
    const rw = renderTable();
    const p = rw.computedProps;

    assert.equal(p.isCSVMode, false);
    assert.equal(p.isCSVFile, false);
    assert.equal(p.isCSVUrl, false);
    assert.equal(p.showHeader, true);
    assert.equal(p.showFooter, false);
    assert.equal(p.showSearch, false);
    assert.equal(p.showPagination, false);
    assert.equal(p.rows.length, 3);
    assert.equal(rw.root.as, "div");
    assert.equal(rw.root.args.id, "node-1");
});

test("default row classes match the pre-port output", () => {
    const rw = renderTable();

    // No hover, no stripes: only the odd background with the odd: prefix stripped
    assert.equal(rw.computedProps.classes.tr, "bg-surface-50");
});

test("striped rows keep odd and even backgrounds", () => {
    const rw = renderTable({ props: { stripedRows: true } });

    assert.equal(rw.computedProps.classes.tr, "odd:bg-surface-50 even:bg-surface-100");
});

test("row hover adds transition and hover background", () => {
    const rw = renderTable({
        props: { enableRowHover: true, rowHoverBackground: "hover:bg-surface-200" },
    });

    assert.match(rw.computedProps.classes.tr, /transition-colors/);
    assert.match(rw.computedProps.classes.tr, /hover:bg-surface-200/);
});

test("columns default to text cells that are not sortable or hidden", () => {
    const rw = renderTable();
    const [col] = rw.computedProps.columns;

    assert.equal(col.isDropzone, false);
    assert.equal(col.isText, true);
    assert.equal(col.isSortable, false);
    assert.equal(col.hiddenClass, "");
    assert.equal(col.headerAlignmentClass, "");
    assert.equal(col.bodyAlignmentClass, "");
});

test("column options map to dropzone, sortable, hidden, and alignment", () => {
    const rw = renderTable({
        columns: [
            { cellMode: "dropzone", columnSortable: true, columnHidden: true, columnAlignment: "text-center" },
        ],
    });
    const [col] = rw.computedProps.columns;

    assert.equal(col.isDropzone, true);
    assert.equal(col.isSortable, true);
    assert.equal(col.hiddenClass, "hidden");
    assert.equal(col.headerAlignmentClass, "text-center");
    assert.equal(col.bodyAlignmentClass, "text-center");
});

test("global text alignment applies per column when column alignment is unset", () => {
    const rw = renderTable({
        props: { headerTextAlignment: "text-left", bodyTextAlignment: "text-right" },
        columns: [{ columnWidth: "" }],
    });

    assert.doesNotMatch(rw.computedProps.classes.th, /text-(left|center|right)/);
    assert.doesNotMatch(rw.computedProps.classes.td, /text-(left|center|right)/);
    assert.equal(rw.computedProps.columns[0].headerAlignmentClass, "text-left");
    assert.equal(rw.computedProps.columns[0].bodyAlignmentClass, "text-right");
});

test("column alignment overrides global text alignment", () => {
    const rw = renderTable({
        props: { headerTextAlignment: "text-left", bodyTextAlignment: "text-left" },
        columns: [{ columnAlignment: "text-center" }],
    });

    assert.equal(rw.computedProps.columns[0].headerAlignmentClass, "text-center");
    assert.equal(rw.computedProps.columns[0].bodyAlignmentClass, "text-center");
});

test("sortable columns are disabled in edit mode", () => {
    const rw = renderTable({
        columns: [{ columnSortable: true }],
        mode: "edit",
    });

    assert.equal(rw.computedProps.columns[0].isSortable, false);
    assert.equal(rw.computedProps.edit, true);
});

test("alpine config reflects search, pagination, and sortability", () => {
    const rw = renderTable({
        props: { showSearch: true, showPagination: true, rowsPerPage: 5, rowCount: 12 },
        columns: [{ columnSortable: true }],
    });
    const config = JSON.parse(rw.computedProps.alpineConfig.replace(/'/g, '"'));

    assert.deepEqual(config, {
        search: true,
        pagination: true,
        rowsPerPage: 5,
        totalRows: 12,
        sortable: true,
    });
});

test("pagination labels fall back to English defaults", () => {
    const rw = renderTable();
    const p = rw.computedProps;

    assert.equal(p.showFirstLast, false);
    assert.equal(p.paginationPrevLabel, "Previous");
    assert.equal(p.paginationNextLabel, "Next");
    assert.equal(p.paginationFirstLabel, "First");
    assert.equal(p.paginationLastLabel, "Last");
    assert.equal(p.paginationPageText, "Page {{page}} of {{total}}");
    assert.equal(p.paginationPageTextStatic, "Page 1 of 1");
});

test("custom pagination labels pass through for localization", () => {
    const rw = renderTable({
        props: {
            showPagination: true,
            showFirstLast: true,
            paginationPrevLabel: "Vorige",
            paginationNextLabel: "Volgende",
            paginationFirstLabel: "Eerste",
            paginationLastLabel: "Laatste",
            paginationPageText: "Pagina {{page}} van {{total}}",
        },
    });
    const p = rw.computedProps;

    assert.equal(p.showFirstLast, true);
    assert.equal(p.paginationPrevLabel, "Vorige");
    assert.equal(p.paginationNextLabel, "Volgende");
    assert.equal(p.paginationFirstLabel, "Eerste");
    assert.equal(p.paginationLastLabel, "Laatste");
    assert.equal(p.paginationPageText, "Pagina {{page}} van {{total}}");
    assert.equal(p.paginationPageTextStatic, "Pagina 1 van 1");
});

test("showFirstLast accepts the string form of the switch value", () => {
    const rw = renderTable({ props: { showPagination: true, showFirstLast: "true" } });

    assert.equal(rw.computedProps.showFirstLast, true);
});

test("new pagination props stay out of the alpine config", () => {
    const rw = renderTable({
        props: { showPagination: true, showFirstLast: true, paginationPageText: "Pagina {{page}} van {{total}}" },
    });
    const config = JSON.parse(rw.computedProps.alpineConfig.replace(/'/g, '"'));

    assert.deepEqual(Object.keys(config).sort(), ["pagination", "rowsPerPage", "search", "sortable", "totalRows"]);
});

test("csv url mode passes the source through and stays sortable", () => {
    const rw = renderTable({
        props: { dataSource: "csvUrl", csvUrl: "https://example.com/data.csv" },
        columns: [{ columnSortable: true }],
    });
    const p = rw.computedProps;

    assert.equal(p.isCSVMode, true);
    assert.equal(p.isCSVUrl, true);
    assert.equal(p.csvSource, "https://example.com/data.csv");
    const config = JSON.parse(p.alpineConfig.replace(/'/g, '"'));
    assert.equal(config.sortable, true);
});

test("csv mode emits csvColumnMeta with per-column settings", () => {
    const rw = renderTable({
        props: { dataSource: "csvFile", csvFile: { path: "/data.csv" } },
        columns: [
            { columnWidth: "w-[100px]", columnAlignment: "text-center", columnSortable: true },
            { columnHidden: true },
        ],
    });
    const meta = JSON.parse(rw.computedProps.csvColumnMeta);

    assert.equal(meta.length, 2);
    assert.equal(meta[0].widthClass, "w-[100px]");
    assert.equal(meta[0].headerAlignmentClass, "text-center");
    assert.equal(meta[0].bodyAlignmentClass, "text-center");
    assert.equal(meta[0].isSortable, true);
    assert.equal(meta[1].hiddenClass, "hidden");
    assert.equal(meta[1].isSortable, false);
});

test("csv mode sortable flag follows collection when no columns are sortable", () => {
    const rw = renderTable({
        props: { dataSource: "csvUrl", csvUrl: "https://example.com/data.csv" },
    });
    const config = JSON.parse(rw.computedProps.alpineConfig.replace(/'/g, '"'));

    assert.equal(config.sortable, false);
});

test("csv edit preview generates placeholder data for every column", () => {
    const rw = renderTable({
        props: {
            dataSource: "csvFile",
            csvFile: { path: "/data.csv" },
            csvFirstRowIsHeader: true,
            showHeader: true,
        },
        columns: Array.from({ length: 5 }, () => ({ columnWidth: "" })),
    });
    const p = rw.computedProps;

    assert.equal(p.examplePreviewHeaders.length, 5);
    assert.equal(p.examplePreviewHeaders[4].label, "column_e");
    assert.equal(p.examplePreviewRows[0].cells[4].value, "row 1, cell 5");
    assert.equal(p.examplePreviewRows[4].cells[4].value, "row 5, cell 5");
});

test("custom global id wins for the root element and alpine lookup id", () => {
    const rw = renderTable({ props: { globalID: "my-table" } });

    assert.equal(rw.root.args.id, "my-table");
    assert.equal(rw.computedProps.id, "my-table");
    assert.equal(rw.anchor, "my-table");
});
