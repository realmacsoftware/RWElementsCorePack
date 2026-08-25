/**
 * Modal -> in-page anchor links.
 *
 * A modal dialog traps focus and locks the page with `html { overflow: hidden }`.
 * When a link inside the dialog points at an anchor on the same page, two things
 * get in the way of the jump:
 *
 *   1. Nothing closes the dialog, so the scroll lock stays in place. Safari lets
 *      the resulting scroll through anyway; Chrome on Android does not -- the URL
 *      and `window.scrollY` update, but the viewport never moves.
 *   2. Closing the dialog hands focus back to whatever was focused when it
 *      opened, and focusing that element scrolls it into view -- which drags the
 *      page away from the anchor again.
 *
 * So: close the dialog on tap, then re-run the jump once the scroll lock is off
 * and focus has stopped moving. The browser's own hash navigation is left alone,
 * so the URL, history, `:target` and the focus starting point all keep working.
 */
(() => {
    const MODAL_SELECTOR = "[data-modal-id]";

    const isPlainLeftClick = (event) =>
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;

    const sameDocumentHash = (link) => {
        let url;

        try {
            url = new URL(link.href, window.location.href);
        } catch (error) {
            return null;
        }

        if (!url.hash || url.hash === "#") return null;
        if (url.host !== window.location.host) return null;
        if (url.pathname !== window.location.pathname) return null;
        if (url.search !== window.location.search) return null;

        return url.hash;
    };

    const findTarget = (hash) => {
        let id = hash.slice(1);

        try {
            id = decodeURIComponent(id);
        } catch (error) {
            // Leave the raw id in place for malformed escapes.
        }

        return (
            document.getElementById(id) ||
            document.getElementsByName(id)[0] ||
            null
        );
    };

    const closeModal = (modal) => {
        const Alpine = window.Alpine;

        if (!Alpine || typeof Alpine.$data !== "function") return false;

        const data = Alpine.$data(modal);

        if (!data || !("open" in data) || !data.open) return false;

        data.open = false;

        return true;
    };

    // Alpine's focus-trap deactivate restores focus via setTimeout(fn, 0).
    // Scheduling our scroll inside rAF → setTimeout(0) puts it after that
    // restore in typical event-loop order, without any frame-counting machine.
    const scrollAfterFocusRestore = (target) => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                target.scrollIntoView({ block: "start" });
            }, 0);
        });
    };

    document.addEventListener(
        "click",
        (event) => {
            if (!isPlainLeftClick(event)) return;

            const link =
                event.target &&
                typeof event.target.closest === "function" &&
                event.target.closest("a[href]");

            if (!link) return;
            if (link.target && link.target !== "_self") return;

            const modal = link.closest(MODAL_SELECTOR);
            if (!modal) return;

            const hash = sameDocumentHash(link);
            if (!hash) return;

            const target = findTarget(hash);
            if (!target) return;

            if (!closeModal(modal)) return;

            scrollAfterFocusRestore(target);
        },
        true
    );
})();
