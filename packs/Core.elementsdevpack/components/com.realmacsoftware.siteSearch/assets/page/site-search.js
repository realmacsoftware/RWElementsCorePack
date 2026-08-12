(function () {
    var TITLE_TOKEN = /\{\{\s*item\.title\s*\}\}/g;
    var URL_TOKEN = /\{\{\s*item\.url\s*\}\}/g;
    var ACTIVE_CLASSES = ["ring-2", "ring-inset", "ring-current"];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    document.addEventListener("alpine:init", function () {
        Alpine.data("siteSearch", function (minChars, maxResults, includeHidden) {
            return {
                query: "",
                results: [],
                open: false,
                activeIndex: -1,
                index: [],
                itemHTML: "",

                init() {
                    var blob = document.querySelector(
                        "script[data-site-search-index]"
                    );
                    var all = [];
                    if (blob) {
                        try {
                            all = JSON.parse(blob.textContent);
                        } catch (e) {
                            all = [];
                        }
                    }
                    this.index = includeHidden
                        ? all
                        : all.filter(function (item) {
                              return item.menu;
                          });
                    this.itemHTML = this.$refs.itemTemplate
                        ? this.$refs.itemTemplate.innerHTML
                        : "";
                    var timer;
                    this.$watch("query", (value) => {
                        clearTimeout(timer);
                        timer = setTimeout(() => this.search(value), 150);
                    });
                },

                get showEmpty() {
                    return (
                        this.open &&
                        this.query.trim().length >= minChars &&
                        this.results.length === 0
                    );
                },

                fillTokens(html, item) {
                    return html
                        .replace(TITLE_TOKEN, escapeHtml(item.title))
                        .replace(URL_TOKEN, escapeHtml(item.url));
                },

                search(raw) {
                    var q = raw.trim().toLowerCase();
                    if (q.length < minChars) {
                        this.results = [];
                        this.activeIndex = -1;
                        this.open = false;
                        this.render();
                        return;
                    }
                    var rank = function (item) {
                        var title = (item.title || "").toLowerCase();
                        var url = (item.url || "").toLowerCase();
                        if (title.indexOf(q) === 0) return 0;
                        if (title.indexOf(q) !== -1) return 1;
                        if (url.indexOf(q) !== -1) return 2;
                        return -1;
                    };
                    this.results = this.index
                        .map(function (item) {
                            return { item: item, rank: rank(item) };
                        })
                        .filter(function (entry) {
                            return entry.rank >= 0;
                        })
                        .sort(function (a, b) {
                            return (
                                a.rank - b.rank ||
                                a.item.title.length - b.item.title.length
                            );
                        })
                        .slice(0, maxResults)
                        .map(function (entry) {
                            return entry.item;
                        });
                    this.activeIndex = -1;
                    this.open = true;
                    this.render();
                },

                render() {
                    var box = this.$refs.results;
                    if (!box) return;
                    box.textContent = "";
                    var itemClass = box.dataset.itemClass || "";
                    var self = this;
                    this.results.forEach(function (item, i) {
                        var link = document.createElement("a");
                        link.href = item.url;
                        if (item.newWindow) {
                            link.target = "_blank";
                            link.rel = "noopener";
                        }
                        if (itemClass) link.className = itemClass;
                        link.setAttribute("role", "option");
                        if (box.id) link.id = box.id + "-option-" + i;
                        link.innerHTML = self.fillTokens(self.itemHTML, item);
                        box.appendChild(link);
                    });
                },

                move(delta) {
                    if (!this.results.length) return;
                    this.open = true;
                    var count = this.results.length;
                    this.activeIndex =
                        (this.activeIndex + delta + count) % count;
                    this.highlight();
                },

                highlight() {
                    var box = this.$refs.results;
                    if (!box) return;
                    var self = this;
                    Array.prototype.forEach.call(
                        box.children,
                        function (el, i) {
                            if (i === self.activeIndex) {
                                el.setAttribute("aria-selected", "true");
                                ACTIVE_CLASSES.forEach(function (cls) {
                                    el.classList.add(cls);
                                });
                                el.scrollIntoView({ block: "nearest" });
                            } else {
                                el.removeAttribute("aria-selected");
                                ACTIVE_CLASSES.forEach(function (cls) {
                                    el.classList.remove(cls);
                                });
                            }
                        }
                    );
                },

                close() {
                    this.open = false;
                    this.activeIndex = -1;
                },

                searchInput: {
                    ["x-on:focus"]() {
                        if (this.results.length) this.open = true;
                    },
                    ["x-on:keydown.escape.prevent"]() {
                        this.close();
                        this.$refs.input.blur();
                    },
                    ["x-on:keydown.arrow-down.prevent"]() {
                        this.move(1);
                    },
                    ["x-on:keydown.arrow-up.prevent"]() {
                        this.move(-1);
                    },
                    ["x-on:keydown.enter.prevent"]() {
                        var item =
                            this.results[this.activeIndex] || this.results[0];
                        if (item) window.location.assign(item.url);
                    },
                    ["x-bind:aria-activedescendant"]() {
                        var box = this.$refs.results;
                        if (!box || !box.id || this.activeIndex < 0) return null;
                        return box.id + "-option-" + this.activeIndex;
                    },
                },

                searchPanel: {
                    ["x-on:click.outside"]() {
                        this.close();
                    },
                },
            };
        });
    });
})();
