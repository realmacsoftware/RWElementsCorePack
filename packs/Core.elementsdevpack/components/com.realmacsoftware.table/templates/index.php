@include("alpine")

@if(isCSVMode)

@if(edit)
<div>
    <table class="{{classes.table}}">
        @if(exampleShowHeader)
        <thead>
            <tr class="{{classes.theadRow}}">
                @each(header in exampleHeaders)
                <th class="{{classes.th}}">{{header.label}}</th>
                @endeach
            </tr>
        </thead>
        @endif
        <tbody>
            @each(row in exampleRows)
            <tr class="{{classes.tr}}">
                @each(cell in row.cells)
                <td class="{{classes.td}}">{{cell.value}}</td>
                @endeach
            </tr>
            @endeach
        </tbody>
    </table>
    <p style="opacity: 0.35; font-size: 0.85em; margin-top: 0.5rem; text-align: center;">
        @if(isCSVFile)
        Example data &mdash; CSV file will be loaded on the published site.
        @elseif(isCSVUrl)
        Example data &mdash; CSV URL will be loaded on the published site.
        @endif
    </p>
</div>

@else

<div x-data="elementsTable('{{id}}', {{alpineConfig}})">

    @if(showSearch)
    <div>
        <input
            type="text"
            class="{{classes.searchInput}}"
            placeholder="{{searchPlaceholder}}"
            x-model="search"
            @input="onSearchInput()"
        />
    </div>
    @endif

    <?php
    $csvSource = '{{csvSource}}';
    $rawFirstRow = '{{csvFirstRowIsHeader}}';
    $firstRowIsHeader = in_array($rawFirstRow, ['true', '1', 'yes'], true);
    $rawShowHeader = '{{showHeader}}';
    $showHeader = in_array($rawShowHeader, ['true', '1', 'yes'], true);

    // Auto-detect Google Sheets URLs and convert to CSV export URL
    // Skip if URL already returns CSV (published CSV or export URL)
    $isGoogleSheets = strpos($csvSource, 'docs.google.com/spreadsheets') !== false;
    $alreadyCSV = strpos($csvSource, 'output=csv') !== false || strpos($csvSource, 'format=csv') !== false;

    if ($isGoogleSheets && !$alreadyCSV) {
        // Published URL: /d/e/{PUBLISHED_ID}/pubhtml → pub?output=csv
        if (preg_match('#/spreadsheets/d/e/([a-zA-Z0-9_-]+)/#', $csvSource, $pm)) {
            $csvSource = "https://docs.google.com/spreadsheets/d/e/{$pm[1]}/pub?output=csv";
            // Preserve gid if present
            if (preg_match('#gid=(\d+)#', $csvSource, $gm)) {
                $csvSource .= "&gid={$gm[1]}";
            }
        }
        // Standard edit/share URL: /d/{SHEET_ID}/edit → export?format=csv
        elseif (preg_match('#/spreadsheets/d/([a-zA-Z0-9_-]+)#', $csvSource, $sm)) {
            $gid = '0';
            if (preg_match('#gid=(\d+)#', $csvSource, $gm)) {
                $gid = $gm[1];
            }
            $csvSource = "https://docs.google.com/spreadsheets/d/{$sm[1]}/export?format=csv&gid={$gid}";
        }
    }

    // Fetch CSV content (try file_get_contents first, fall back to curl)
    $csvContent = false;
    if (!empty($csvSource)) {
        // Try file_get_contents first (works for local files and URLs if allow_url_fopen is on)
        $csvContent = @file_get_contents($csvSource);

        // Fall back to curl for remote URLs
        if ($csvContent === false && function_exists('curl_init') && preg_match('#^https?://#i', $csvSource)) {
            $ch = curl_init($csvSource);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
            curl_setopt($ch, CURLOPT_TIMEOUT, 15);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
            $csvContent = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($httpCode < 200 || $httpCode >= 400) {
                $csvContent = false;
            }
        }
    }
    $csvError = ($csvContent === false);
    $csvHeaders = [];
    $csvRows = [];

    if (!$csvError) {
        // Parse CSV content
        $allRows = [];
        $lines = str_getcsv($csvContent, "\n");
        foreach ($lines as $line) {
            $parsed = str_getcsv($line);
            if ($parsed !== [null]) {
                $allRows[] = $parsed;
            }
        }

        if ($firstRowIsHeader && count($allRows) > 0) {
            $csvHeaders = array_shift($allRows);
        }
        $csvRows = $allRows;
    }
    ?>

    <?php if ($csvError): ?>
    <table class="{{classes.table}}">
        <tbody>
            <tr class="{{classes.tr}}">
                <td class="{{classes.td}}" style="text-align: center; padding: 2rem; opacity: 0.5;">
                    Unable to load CSV data from the provided source.
                </td>
            </tr>
        </tbody>
    </table>
    <?php else: ?>
    <table class="{{classes.table}}">
        <?php if ($firstRowIsHeader && $showHeader && !empty($csvHeaders)): ?>
        <thead>
            <tr class="{{classes.theadRow}}">
                <?php foreach ($csvHeaders as $colIdx => $header): ?>
                <th class="{{classes.th}}"
                    @click="sort(<?php echo $colIdx; ?>)"
                    style="cursor: pointer; user-select: none;"
                >
                    <span class="inline-flex items-center gap-1">
                        <?php echo htmlspecialchars($header); ?>
                        <span
                            x-show="sortCol === <?php echo $colIdx; ?>"
                            x-text="sortDir === 'asc' ? '↑' : '↓'"
                            class="inline-block"
                        ></span>
                    </span>
                </th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <?php endif; ?>

        <tbody>
            <?php foreach ($csvRows as $rowIdx => $row): ?>
            <tr class="{{classes.tr}}"
                x-ref="row<?php echo $rowIdx; ?>"
                x-show="isRowVisible($el)"
            >
                <?php foreach ($row as $cell): ?>
                <td class="{{classes.td}}"><?php echo htmlspecialchars($cell); ?></td>
                <?php endforeach; ?>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    @if(showPagination)
    <div class="{{classes.pagination}}">
        <button
            class="{{classes.paginationButton}}"
            :class="page <= 1 ? '{{classes.paginationButtonDisabled}}' : '{{classes.paginationButton}}'"
            :disabled="page <= 1"
            @click="prevPage()"
        >
            &larr; Previous
        </button>
        <span class="{{classes.paginationText}}" x-text="'Page ' + page + ' of ' + totalPages"></span>
        <button
            class="{{classes.paginationButton}}"
            :class="page >= totalPages ? '{{classes.paginationButtonDisabled}}' : '{{classes.paginationButton}}'"
            :disabled="page >= totalPages"
            @click="nextPage()"
        >
            Next &rarr;
        </button>
    </div>
    @endif

</div>

@endif

@else

<div
    @if(!edit)
    x-data="elementsTable('{{id}}', {{alpineConfig}})"
    @endif
>
    @if(showSearch)
    <div>
        @if(edit)
        <input
            type="text"
            class="{{classes.searchInput}}"
            placeholder="{{searchPlaceholder}}"
            disabled
        />
        @else
        <input
            type="text"
            class="{{classes.searchInput}}"
            placeholder="{{searchPlaceholder}}"
            x-model="search"
            @input="onSearchInput()"
        />
        @endif
    </div>
    @endif

    <table class="{{classes.table}}">
        @if(showHeader)
        <thead>
            <tr class="{{classes.theadRow}}">
                @each(column in columns)
                @if(column.isSortable)
                <th class="{{classes.th}} {{column.widthClass}} {{column.alignmentClass}} {{column.hiddenClass}} {{column.extraClasses}}"
                    @click="sort({{column.index}})"
                    style="cursor: pointer; user-select: none;"
                >
                    <span class="inline-flex items-center gap-1">
                        @text("column", default: "Column")
                        <span
                            x-show="sortCol === {{column.index}}"
                            x-text="sortDir === 'asc' ? '↑' : '↓'"
                            class="inline-block"
                        ></span>
                    </span>
                </th>
                @else
                <th class="{{classes.th}} {{column.widthClass}} {{column.alignmentClass}} {{column.hiddenClass}} {{column.extraClasses}}">
                    @text("column", default: "Column")
                </th>
                @endif
                @endeach
            </tr>
        </thead>
        @endif

        <tbody class="{{classes.tbody}}">
            @each(row in rows)
            <tr class="{{classes.tr}}"
                @if(!edit)
                x-ref="row{{row.index}}"
                x-show="isRowVisible($el)"
                @endif
            >
                @each(column in columns)
                <td class="{{classes.td}} {{column.widthClass}} {{column.alignmentClass}} {{column.hiddenClass}} {{column.extraClasses}}">
                    @if(column.isDropzone)
                        @dropzone("cell", title: "Cell")
                    @else
                        @text("cell", default: "Cell")
                    @endif
                </td>
                @endeach
            </tr>
            @endeach
        </tbody>

        @if(showFooter)
        <tfoot>
            <tr class="{{classes.tfootRow}}">
                @each(column in columns)
                <td class="{{classes.tfoot}} {{column.widthClass}} {{column.alignmentClass}} {{column.hiddenClass}} {{column.extraClasses}}">
                    @if(column.isDropzone)
                        @dropzone("footerCell", title: "Footer")
                    @else
                        @text("footerCell", default: "Footer")
                    @endif
                </td>
                @endeach
            </tr>
        </tfoot>
        @endif
    </table>

    @if(showPagination)
    @if(!edit)
    <div class="{{classes.pagination}}">
        <button
            class="{{classes.paginationButton}}"
            :class="page <= 1 ? '{{classes.paginationButtonDisabled}}' : '{{classes.paginationButton}}'"
            :disabled="page <= 1"
            @click="prevPage()"
        >
            &larr; Previous
        </button>
        <span class="{{classes.paginationText}}" x-text="'Page ' + page + ' of ' + totalPages"></span>
        <button
            class="{{classes.paginationButton}}"
            :class="page >= totalPages ? '{{classes.paginationButtonDisabled}}' : '{{classes.paginationButton}}'"
            :disabled="page >= totalPages"
            @click="nextPage()"
        >
            Next &rarr;
        </button>
    </div>
    @else
    <div class="{{classes.pagination}}">
        <span class="{{classes.paginationText}}">&larr; Previous</span>
        <span class="{{classes.paginationText}}">Page 1 of 1</span>
        <span class="{{classes.paginationText}}">Next &rarr;</span>
    </div>
    @endif
    @endif
</div>

@endif
