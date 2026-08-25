import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const scriptPath =
    "packs/Core.elementsdevpack/components/com.realmacsoftware.modal/assets/page/modal-anchor-links.js";

const source = fs.readFileSync(scriptPath, "utf8");

function makeElement(spec = {}) {
    return {
        tagName: (spec.tagName || "div").toUpperCase(),
        id: spec.id || "",
        href: spec.href,
        target: spec.target || "",
        parent: null,
        attributes: { ...(spec.attributes || {}) },
        style: {},
        scrollCalls: [],
        hasAttribute(name) {
            return name in this.attributes;
        },
        scrollIntoView(options) {
            this.scrollCalls.push(options);
        },
        matches(selector) {
            if (selector === "a[href]") {
                return this.tagName === "A" && this.href !== undefined;
            }
            if (selector === "[data-modal-id]") {
                return "data-modal-id" in this.attributes;
            }
            throw new Error(`unsupported selector: ${selector}`);
        },
        closest(selector) {
            let node = this;
            while (node) {
                if (node.matches(selector)) return node;
                node = node.parent;
            }
            return null;
        },
    };
}

function makePage({
    href = "#section",
    targetId = "section",
    open = true,
    linkTarget = "",
    withAlpine = true,
    locked = true,
} = {}) {
    const documentElement = makeElement({ tagName: "html" });
    documentElement.style.overflow = locked ? "hidden" : "";

    const modal = makeElement({ attributes: { "data-modal-id": "modal-1" } });
    const link = makeElement({ tagName: "a", href, target: linkTarget });
    link.parent = modal;

    const target = targetId ? makeElement({ id: targetId }) : null;
    const alpineData = { open };
    const listeners = {};
    const captureFlags = {};
    const rafQueue = [];
    const timeoutQueue = [];

    const sandbox = {
        URL,
        decodeURIComponent,
        console,
        requestAnimationFrame: (fn) => rafQueue.push(fn),
        setTimeout: (fn) => timeoutQueue.push(fn),
        document: {
            documentElement,
            addEventListener(type, handler, capture) {
                (listeners[type] = listeners[type] || []).push(handler);
                captureFlags[type] = capture;
            },
            removeEventListener(type, handler) {
                listeners[type] = (listeners[type] || []).filter(
                    (entry) => entry !== handler
                );
            },
            getElementById(id) {
                return target && target.id === id ? target : null;
            },
            getElementsByName() {
                return [];
            },
        },
        window: {
            location: new URL("https://example.com/about/"),
            Alpine: withAlpine
                ? { $data: (el) => (el === modal ? alpineData : null) }
                : undefined,
        },
    };
    sandbox.window.window = sandbox.window;

    vm.runInNewContext(source, sandbox, { filename: scriptPath });

    const click = (overrides = {}) => {
        listeners.click[0]({
            defaultPrevented: false,
            button: 0,
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            target: link,
            ...overrides,
        });
    };

    // Drains rAF callbacks first, then timeout callbacks — mirrors the
    // real browser order the script relies on (rAF → setTimeout(0)).
    const flush = () => {
        while (rafQueue.length) rafQueue.shift()();
        while (timeoutQueue.length) timeoutQueue.shift()();
    };

    return {
        listeners,
        captureFlags,
        modal,
        link,
        target,
        alpineData,
        documentElement,
        click,
        flush,
        rafQueue,
        timeoutQueue,
    };
}

test("registers its click listener on the capture phase", () => {
    const page = makePage();
    assert.equal(page.listeners.click.length, 1);
    assert.equal(page.captureFlags.click, true);
});

test("closes the modal and scrolls the target into view", () => {
    const page = makePage();

    page.click();
    assert.equal(page.alpineData.open, false, "modal should close");

    page.flush();
    assert.equal(page.target.scrollCalls.length, 1);
    assert.equal(page.target.scrollCalls[0].block, "start");
});

test("does not scroll until the rAF + timeout flush", () => {
    const page = makePage();

    page.click();
    assert.equal(
        page.target.scrollCalls.length,
        0,
        "nothing should scroll before flush"
    );

    page.flush();
    assert.equal(page.target.scrollCalls.length, 1);
});

test("ignores links outside a modal", () => {
    const page = makePage();
    page.link.parent = null;

    page.click();

    assert.equal(page.alpineData.open, true);
    assert.equal(page.rafQueue.length, 0);
});

test("ignores links to another page", () => {
    for (const href of [
        "/contact/#team",
        "https://example.org/about/#team",
        "?q=1#team",
    ]) {
        const page = makePage({ href });
        page.click();
        assert.equal(page.alpineData.open, true, `${href} should be left alone`);
    }
});

test("ignores links with no usable hash", () => {
    for (const href of ["#", "/about/", ""]) {
        const page = makePage({ href });
        page.click();
        assert.equal(page.alpineData.open, true, `${href} should be left alone`);
    }
});

test("ignores anchors whose target is missing", () => {
    const page = makePage({ href: "#nowhere" });

    page.click();

    assert.equal(page.alpineData.open, true);
});

test("ignores links that open in a new tab", () => {
    const page = makePage({ linkTarget: "_blank" });

    page.click();

    assert.equal(page.alpineData.open, true);
});

test("ignores modified and non-primary clicks", () => {
    for (const overrides of [
        { button: 1 },
        { metaKey: true },
        { ctrlKey: true },
        { shiftKey: true },
        { altKey: true },
        { defaultPrevented: true },
    ]) {
        const page = makePage();
        page.click(overrides);
        assert.equal(
            page.alpineData.open,
            true,
            `${JSON.stringify(overrides)} should be left to the browser`
        );
    }
});

test("does nothing when there is no open dialog to close", () => {
    const closed = makePage({ open: false, locked: false });
    closed.click();
    assert.equal(closed.rafQueue.length, 0);

    const withoutAlpine = makePage({ withAlpine: false, locked: false });
    withoutAlpine.click();
    assert.equal(withoutAlpine.rafQueue.length, 0);
});

test("resolves percent-encoded anchor ids", () => {
    const page = makePage({ href: "#caf%C3%A9", targetId: "café" });

    page.click();
    page.flush();

    assert.equal(page.target.scrollCalls.length, 1);
});

test("survives a malformed percent escape", () => {
    const page = makePage({ href: "#100%", targetId: "100%" });

    page.click();
    page.flush();

    assert.equal(page.target.scrollCalls.length, 1);
});

test("the modal loads the script alongside its other page assets", () => {
    const template = fs.readFileSync(
        "packs/Core.elementsdevpack/components/com.realmacsoftware.modal/templates/alpine-plugins.html",
        "utf8"
    );

    assert.match(
        template,
        /componentAssetPath\}\}\/modal-anchor-links\.js/,
        "alpine-plugins.html should include modal-anchor-links.js"
    );
});
