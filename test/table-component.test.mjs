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
    assert.equal(col.alignmentClass, "");
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
    assert.equal(col.alignmentClass, "text-center");
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

test("csv url mode passes the source through and stays sortable", () => {
    const rw = renderTable({
        props: { dataSource: "csvUrl", csvUrl: "https://example.com/data.csv" },
    });
    const p = rw.computedProps;

    assert.equal(p.isCSVMode, true);
    assert.equal(p.isCSVUrl, true);
    assert.equal(p.csvSource, "https://example.com/data.csv");
    const config = JSON.parse(p.alpineConfig.replace(/'/g, '"'));
    assert.equal(config.sortable, true);
});

test("custom global id wins for the root element and alpine lookup id", () => {
    const rw = renderTable({ props: { globalID: "my-table" } });

    assert.equal(rw.root.args.id, "my-table");
    assert.equal(rw.computedProps.id, "my-table");
    assert.equal(rw.anchor, "my-table");
});
