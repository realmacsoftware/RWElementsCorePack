// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
const globalReveal = (rw) => {
  const {
    revealAnimationName: name,
    revealAnimationDirection: direction,
    revealPlay: play,
    revealStart: start,
    revealEnd: end,
    revealDuration: duration,
    revealDelay: delay,
    revealEasing: easing,
    revealDistance: distance,
    revealDegrees: degrees,
    revealScrub: scrub,
    revealDebug: debug
  } = rw.props;
  const { title } = rw.node;
  const revealID = `reveal-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const gsapTriggerPoints = {
    "entering-screen": "top bottom",
    "middle-of-screen": "top center",
    "exiting-screen": "top top"
  };
  const animationName = `${name}${direction.charAt(0).toUpperCase() + direction.slice(1)}In`;
  const exitAnimationName = animationName.replace("In", "Out");
  const data = {
    "data-reveal": "",
    "data-reveal-id": revealID,
    "data-reveal-duration": `${duration / 1e3}`,
    "data-reveal-delay": `${delay / 1e3}`,
    "data-reveal-easing": easing,
    "data-reveal-animation": animationName,
    "data-reveal-exit-animation": exitAnimationName,
    "data-reveal-play": play,
    "data-reveal-start": gsapTriggerPoints[start] || gsapTriggerPoints["entering-screen"],
    "data-reveal-end": gsapTriggerPoints[end] || gsapTriggerPoints["exiting-screen"],
    "data-reveal-distance": distance,
    "data-reveal-degrees": degrees,
    "data-reveal-scrub": scrub || false,
    "data-reveal-debug": debug || false
  };
  return data;
};
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
const globalHTMLTag = (app, fallback = "div") => {
  const { globalHTMLTag: globalHTMLTag2, globalHTMLTagCustom } = app.props;
  if (globalHTMLTag2 === "custom") {
    return globalHTMLTagCustom.replace(/</g, "").replace(/>/g, "").replace(/[^a-zA-Z0-9]/g, "");
  }
  if (globalHTMLTag2 == "default") {
    return fallback;
  }
  return globalHTMLTag2 || fallback;
};
const switchToBool = (value) => {
  if (value === true || value === false) {
    return value;
  }
  if (typeof value === "string") {
    const base = value.trim().split(/\s+/)[0];
    if (base === "true") return true;
    if (base === "false") return false;
  }
  return void 0;
};
const getOrderClasses = (orderByBreakpoint = {}, orderCustomByBreakpoint = {}, breakpointNames = []) => {
  const allBreakpoints = ["base", ...breakpointNames];
  const getCustomValue = (currentBreakpoint) => {
    const currentIndex = allBreakpoints.indexOf(currentBreakpoint);
    for (let i = currentIndex; i >= 0; i--) {
      const bp = allBreakpoints[i];
      if (orderCustomByBreakpoint[bp] !== void 0) {
        return orderCustomByBreakpoint[bp];
      }
    }
    return void 0;
  };
  return allBreakpoints.filter((bp) => orderByBreakpoint[bp] !== void 0).map((breakpoint) => {
    const value = orderByBreakpoint[breakpoint];
    const prefix = breakpoint === "base" ? "" : `${breakpoint}:`;
    const orderValue = value === "custom" ? `order-[${getCustomValue(breakpoint)}]` : `order-${value}`;
    return `${prefix}${orderValue}`;
  }).join(" ");
};
const globalActAsGridOrFlexItem = (app) => {
  const {
    globalGridOrFlexDisplayAs: displayAs,
    globalGridOrFlexItemSettings: settingsType,
    // Grid Item
    globalGridItemColSpan: colSpan,
    globlaGridItemColStart: colStart,
    globalGridItemColEnd: colEnd,
    globalGridItemRowSpan: rowSpan,
    globalGridItemRowStart: rowStart,
    globalGridItemRowEnd: rowEnd,
    // Flex Item
    globalFlexItemFlex: flex,
    globalFlexItemShrink: shrink,
    globalFlexItemGrow: grow,
    globalFlexItemBasis: basis,
    globalFlexItemBasisCustom: basisCustom,
    // General
    globalGridOrFlexItemAlignSelf: alignSelf,
    globalGridOrFlexItemJustifySelf: justifySelf
  } = app.props;
  const {
    globalGridOrFlexItemOrder: orderByBreakpoint,
    globalGridOrFlexItemOrderCustom: orderCustomByBreakpoint
  } = app.responsiveProps;
  const { names: breakpointNames } = app.theme.breakpoints;
  if (displayAs == "default") {
    return false;
  }
  const classes = [];
  if (displayAs == "flex") {
    classes.push(
      alignSelf,
      justifySelf,
      ...settingsType === "advanced" ? [
        flex,
        shrink,
        grow,
        basis == "custom" ? basisCustom : basis,
        getOrderClasses(orderByBreakpoint, orderCustomByBreakpoint, breakpointNames)
      ] : []
    );
  }
  if (displayAs == "grid") {
    classes.push(
      colSpan,
      rowSpan,
      ...settingsType === "advanced" ? [
        colStart !== "col-start-auto" ? colStart : void 0,
        colEnd !== "col-end-auto" ? colEnd : void 0,
        rowStart !== "row-start-auto" ? rowStart : void 0,
        rowEnd !== "row-end-auto" ? rowEnd : void 0,
        alignSelf,
        justifySelf,
        getOrderClasses(orderByBreakpoint, orderCustomByBreakpoint, breakpointNames)
      ] : []
    );
  }
  return classnames(classes).toString();
};
const getHiddenClasses = (hidden = {}, defaultDisplay = "block") => {
  if (Object.keys(hidden).length === 0) {
    return defaultDisplay;
  }
  return Object.entries(hidden).reduce((classes, [breakpoint, isHidden]) => {
    const modifier = breakpoint === "base" ? "" : `${breakpoint}:`;
    const className = isHidden ? `${modifier}hidden` : `${modifier}${defaultDisplay}`;
    return classes ? `${classes} ${className}` : className;
  }, "");
};
const globalLayout = (app, args = {}) => {
  const {
    globalLayoutPosition: position,
    globalLayoutZIndexType: zIndexType,
    globalLayoutZIndex: zIndex,
    globalLayoutTopRightBottomLeftType: topRightBottomLeftType,
    globalLayoutInset: inset,
    globalLayoutTop: top,
    globalLayoutRight: right,
    globalLayoutBottom: bottom,
    globalLayoutLeft: left,
    globalLayoutOverflow: overflow,
    globalLayoutIsolation: isolation,
    globalLayoutVisibility: visibility
  } = app.props;
  const { globalLayoutHidden } = app.responsiveProps;
  const { defaultDisplay } = args;
  const hidden = getHiddenClasses(globalLayoutHidden, defaultDisplay);
  return classnames([
    position,
    zIndexType !== "custom" ? zIndexType : zIndex,
    topRightBottomLeftType === "uniform" && inset,
    ...topRightBottomLeftType === "individual" ? [top, right, bottom, left].filter(Boolean) : [],
    overflow,
    isolation,
    visibility,
    hidden
  ]).toString();
};
const globalSizingContainer = (app) => {
  const {
    globalWidthType: widthType,
    globalWidth: width,
    globalHeightType: heightType,
    globalHeight: height,
    globalSizingMinMaxEnabled: minMaxEnabled,
    globalMinWidth: minWidth,
    globalMaxWidth: maxWidth,
    globalMinHeight: minHeight,
    globalMaxHeight: maxHeight
  } = app.props;
  const widthClasses = {
    "auto": "w-auto",
    "full": "w-full",
    "screen": "w-screen",
    "container": "container w-full",
    "theme": width
  };
  const heightClasses = {
    "auto": "h-auto",
    "full": "h-full",
    "screen": "h-screen",
    "theme": height
  };
  const classes = classnames([
    widthClasses[widthType],
    heightClasses[heightType]
  ]);
  if (switchToBool(minMaxEnabled) === true) {
    classes.add([minWidth, minHeight, maxWidth, maxHeight]);
  }
  return classes.toString();
};
const globalSpacing = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin,
    globalPadding: padding
  } = app.props;
  if (switchToBool(enabled) === false) {
    return false;
  }
  return classnames([margin, padding]).toString();
};
const transformHook = (rw) => {
  const { id } = rw.node;
  const reveal = globalReveal(rw);
  const classes = classnames([
    `group/${id} group/reveal block`,
    globalActAsGridOrFlexItem(rw),
    globalLayout(rw),
    globalSizingContainer(rw),
    globalSpacing(rw),
    advancedClasses(rw)
  ]).toString();
  rw.setRootElement({
    as: globalHTMLTag(rw, "div"),
    class: classes,
    args: {
      ...reveal
    }
  });
  rw.setProps({
    isEdit: rw.project.mode == "edit",
    id,
    componentAssetPath: rw.component.assetPath
  });
};
exports.transformHook = transformHook;
