// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
const advancedClasses = (rw) => {
  const { display, cssClasses, overflow, zIndex } = rw.props;
  return classnames([display, cssClasses, overflow, zIndex]).toString();
};
const classnames = (initialClasses = "") => {
  let initialClassArray = Array.isArray(initialClasses) ? initialClasses : initialClasses.split(" ").filter(Boolean);
  let classes = new Set(initialClassArray);
  let currentModifier = "";
  return {
    /**
     * Adds one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to add.
     * @returns {Object} The classnames instance for chaining.
     */
    add(className) {
      const classesToAdd = Array.isArray(className) ? className : [className];
      classesToAdd.forEach((cls) => classes.add(cls));
      return this;
    },
    /**
     * Removes one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to remove.
     * @returns {Object} The classnames instance for chaining.
     */
    remove(className) {
      const classesToRemove = Array.isArray(className) ? className : [className];
      classesToRemove.forEach((cls) => classes.delete(cls));
      return this;
    },
    /**
     * Toggles one or more class names.
     *
     * @param {string|string[]} classToToggle - A single class name or an array of class names to toggle.
     * @returns {Object} The classnames instance for chaining.
     */
    toggle(className) {
      const classesToToggle = Array.isArray(className) ? className : [className];
      classesToToggle.forEach((cls) => {
        classes.has(cls) ? classes.delete(cls) : classes.add(cls);
      });
      return this;
    },
    /**
     * Sets a CSS modifier (e.g., 'hover', 'focus').
     *
     * @param {string} modifier - The modifier to set, with or without a trailing colon.
     * @returns {Object} The classnames instance for chaining.
     */
    modifier(modifier) {
      if (!modifier) {
        return this;
      }
      currentModifier = modifier.replace(/:$/, "").trim();
      return this;
    },
    /**
     * Gets the final class string with the current modifier applied.
     *
     * @returns {string} The final class string.
     */
    getClasses() {
      const classArray = Array.from(classes);
      return currentModifier ? classArray.map((cls) => `${currentModifier}:${cls}`).join(" ") : classArray.filter(Boolean).join(" ");
    },
    /**
     * Returns the class string when the classnames instance is coerced to a string.
     *
     * @returns {string} The final class string.
     */
    toString() {
      return this.getClasses();
    }
  };
};
const alpineTransitionsMobile = {
  fade: {
    enter: "transition ease-out",
    enterStart: "opacity-0",
    enterEnd: "opacity-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100",
    leaveEnd: "opacity-0"
  },
  slideDown: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-y-full",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-full"
  },
  slideDownShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-3"
  },
  slideUp: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-y-full",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-full"
  },
  slideUpShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-3"
  },
  slideLeft: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-x-full",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 translate-x-full"
  },
  slideLeftShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 translate-x-3"
  },
  slideRight: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-x-full",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-full"
  },
  slideRightShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  zoom: {
    enter: "transition ease-out",
    enterStart: "opacity-0 scale-95",
    enterEnd: "opacity-100 scale-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100 scale-100",
    leaveEnd: "opacity-0 scale-95"
  },
  none: {
    enter: "duration-0",
    enterStart: "",
    enterEnd: "",
    leave: "duration-0",
    leaveStart: "",
    leaveEnd: ""
  }
};
const getAlpineTransitionAttributesMobile = (transitionName) => {
  const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } = alpineTransitionsMobile[transitionName] || alpineTransitionsMobile.fade;
  const attributes = {
    "x-transition:enter": enter,
    "x-transition:enter-start": enterStart,
    "x-transition:enter-end": enterEnd,
    "x-transition:leave": leave,
    "x-transition:leave-start": leaveStart,
    "x-transition:leave-end": leaveEnd
  };
  return Object.entries(attributes).filter(([key, value]) => value).map(([key, value]) => `${key}="${value}"`).join(" ");
};
const applyOpacityToTailwindBgClasses = (classes, opacity) => {
  if (!classes || !opacity) return classes || "";
  return classes.split(/\s+/).filter(Boolean).map((token) => {
    if (!/(^|:)bg-/.test(token)) return token;
    const tokenWithoutOpacity = token.replace(/\/(\[[^\]]+\]|\d+)$/, "");
    return `${tokenWithoutOpacity}/${opacity}`;
  }).join(" ");
};
const transformHook = (rw) => {
  const {
    globalID,
    triggerCursor,
    modalShowInEdit,
    modalJustify,
    modalAlign,
    globalFiltersBackdropBlur,
    modalOverlayColor,
    modalOverlayOpacity,
    modalTransitionStyle,
    modalTransitionDuration,
    modalAutoOpen,
    modalAutoOpenTime
  } = rw.props;
  const { mode } = rw.project;
  const { id } = rw.node;
  const transitionAttributes = getAlpineTransitionAttributesMobile(modalTransitionStyle);
  const classes = {
    wrapper: classnames([advancedClasses(rw)]).toString(),
    trigger: classnames([triggerCursor]).toString(),
    dialog: classnames([
      "fixed z-50 inset-0 overflow-y-auto",
      !modalShowInEdit && mode === "edit" && "hidden"
    ]).toString(),
    panel: classnames([
      "relative flex min-h-screen cursor-pointer",
      modalJustify,
      modalAlign
    ]).toString(),
    panelInner: classnames([
      "relative cursor-auto",
      modalTransitionDuration
    ]).toString(),
    overlay: classnames([
      "fixed inset-0 bg-black/25",
      applyOpacityToTailwindBgClasses(modalOverlayColor, modalOverlayOpacity),
      globalFiltersBackdropBlur,
      modalTransitionDuration,
      mode === "edit" && "pointer-events-none"
    ]).toString()
  };
  const openOnExitIntent = modalAutoOpen === "exitIntent" ? true : false;
  const autoOpen = modalAutoOpen === "delay" || modalAutoOpen === "onload" ? true : false;
  const autoOpenTime = modalAutoOpen === "delay" ? modalAutoOpenTime * 1e3 : 0;
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      "x-data": `{ open: false, openModal: () => $dispatch('open-modal', { id: '${id}' }) }`,
      "x-init": `${autoOpen ? `setTimeout(() => openModal(), ${autoOpenTime})` : null}`,
      "x-exit-intent": openOnExitIntent ? "openModal" : null,
      id: globalID
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    classes,
    id,
    transitionAttributes
  });
};
exports.transformHook = transformHook;
