(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp01 = (value) => Math.min(1, Math.max(0, value));

    const init = (el) => {
        const over = el.dataset.m3dOver || "self";
        const surface =
            over === "self"
                ? el
                : el.closest("." + CSS.escape(`group/${over}`)) || el;

        let frame = null;
        let pointer = null;

        const render = () => {
            frame = null;
            const rect = surface.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = clamp01((pointer.clientX - rect.left) / rect.width);
            const y = clamp01((pointer.clientY - rect.top) / rect.height);
            // 0 at the centre, 1 at every edge and corner
            const r = Math.min(
                1,
                Math.max(Math.abs(x - 0.5), Math.abs(y - 0.5)) * 2
            );
            el.style.setProperty("--rw-m3d-x", `${x}`);
            el.style.setProperty("--rw-m3d-y", `${y}`);
            el.style.setProperty("--rw-m3d-r", `${r}`);
        };

        // Removing the variables lets the var(--…, 0) fallbacks take over,
        // so the CSS transition eases the element back to its start values.
        const reset = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = null;
            el.style.removeProperty("--rw-m3d-x");
            el.style.removeProperty("--rw-m3d-y");
            el.style.removeProperty("--rw-m3d-r");
        };

        surface.addEventListener("pointermove", (event) => {
            if (event.pointerType !== "mouse") return;
            pointer = event;
            if (!frame) frame = requestAnimationFrame(render);
        });
        surface.addEventListener("pointerleave", reset);
        surface.addEventListener("pointercancel", reset);
    };

    document.addEventListener("DOMContentLoaded", () => {
        if (!finePointer.matches || reducedMotion.matches) return;
        document.querySelectorAll("[data-m3d-over]").forEach(init);
    });
})();
