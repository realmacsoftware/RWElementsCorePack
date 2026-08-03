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

        // The inner div carries the transition and transform classes.
        const target = el.firstElementChild;

        let frame = null;
        let pointer = null;
        let active = false;
        let intro = null;

        const render = (now) => {
            frame = null;
            const rect = surface.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            // While tracking, transforms follow the cursor directly; the
            // configured transition only plays on the ease-back after leave.
            // The entry is eased in JS instead: the variables ramp from 0
            // (the start values) to the cursor over the configured duration.
            if (!active) {
                active = true;
                const duration = target
                    ? parseFloat(getComputedStyle(target).transitionDuration)
                    : 0;
                intro = { start: now, duration: (duration || 0) * 1000 };
                if (target) {
                    target.style.setProperty("transition-duration", "0s");
                    target.style.setProperty("transition-delay", "0s");
                }
            }
            let mix = 1;
            if (intro) {
                const t = intro.duration
                    ? Math.min(1, (now - intro.start) / intro.duration)
                    : 1;
                mix = 1 - Math.pow(1 - t, 3);
                if (t >= 1) intro = null;
            }
            const x = clamp01((pointer.clientX - rect.left) / rect.width);
            const y = clamp01((pointer.clientY - rect.top) / rect.height);
            // 0 at the centre, 1 at every edge and corner
            const r = Math.min(
                1,
                Math.max(Math.abs(x - 0.5), Math.abs(y - 0.5)) * 2
            );
            el.style.setProperty("--rw-m3d-x", `${x * mix}`);
            el.style.setProperty("--rw-m3d-y", `${y * mix}`);
            el.style.setProperty("--rw-m3d-r", `${r * mix}`);
            // Keep animating the entry even while the pointer is still.
            if (intro && !frame) frame = requestAnimationFrame(render);
        };

        // Restoring the class-configured transition and removing the
        // variables in the same tick lets the var(--…, 0) fallbacks take
        // over, so the element eases back to its start values.
        const reset = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = null;
            active = false;
            intro = null;
            if (target) {
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-delay");
            }
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
