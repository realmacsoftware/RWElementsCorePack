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

    // Frames without a focus change before we treat the close as settled. The
    // dialog hands focus back a frame or so after it closes.
    const QUIET_FRAMES = 3;

    // Ceiling on the wait, so a modal that never unlocks (a second one still
    // open, say) or a page that keeps stealing focus can't strand the jump.
    const MAX_SETTLE_FRAMES = 40;

    const isPlainLeftClick = (event) =>
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;

    // Returns the hash for a link that points somewhere in the current document,
    // or null for anything the browser should handle on its own.
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

    // Returns true only when there was an open dialog to close -- if there
    // wasn't, nothing is holding the scroll lock and the browser needs no help.
    const closeModal = (modal) => {
        const Alpine = window.Alpine;

        if (!Alpine || typeof Alpine.$data !== "function") return false;

        const data = Alpine.$data(modal);

        if (!data || !("open" in data) || !data.open) return false;

        data.open = false;

        return true;
    };

    // Waits for the scroll lock to come off and for the dialog's focus handover
    // to finish, then re-runs the jump. Doing it any earlier just gets undone by
    // the focus restore.
    const scrollWhenSettled = (target) => {
        let frames = 0;
        let quiet = 0;

        const onFocusIn = () => {
            quiet = 0;
        };

        document.addEventListener("focusin", onFocusIn, true);

        const tick = () => {
            frames += 1;
            quiet += 1;

            const locked =
                document.documentElement.style.overflow === "hidden";

            if ((locked || quiet < QUIET_FRAMES) && frames < MAX_SETTLE_FRAMES) {
                requestAnimationFrame(tick);
                return;
            }

            document.removeEventListener("focusin", onFocusIn, true);

            target.scrollIntoView({ block: "start" });
        };

        requestAnimationFrame(tick);
    };

    // Capture phase: the modal panel stops click propagation, so a listener on
    // the bubble phase would never see these taps.
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

            scrollWhenSettled(target);
        },
        true
    );
})();
