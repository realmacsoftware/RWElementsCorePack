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
const globalSizing = (app) => {
  const {
    globalHeight: height,
    globalWidth: width,
    globalSizingMinMaxEnabled: minMaxEnabled,
    globalMinWidth: minWidth,
    globalMaxWidth: maxWidth,
    globalMinHeight: minHeight,
    globalMaxHeight: maxHeight
  } = app.props;
  const classes = classnames([width, height]);
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
const globalTransitions = (app, alwaysWantsHover = false) => {
  const {
    globalControlTypeTransforms,
    globalControlTypeEffects,
    globalControlTypeFilters,
    globalFilterEnable,
    globalControlTypeBorders,
    globalControlTypeBg,
    globalControlTypeOverlay,
    globalControlTypeSVGFill,
    globalControlTypeSVGStroke,
    globalControlTypeOutline,
    globalControlType3D,
    globalTransitionsProperty: property,
    globalTransitionsDuration: duration,
    globalTransitionsDelay: delay,
    globalTransitionsTimingFunction: timingFunction,
    globalTransitionsTimingFunctionCustom: customTimingFunction
  } = app.props;
  const customTimingFunctionFormatted = customTimingFunction == null ? void 0 : customTimingFunction.replace(/,\s/g, ",_");
  const aControlWantsHover = () => {
    return alwaysWantsHover || globalFilterEnable || [
      globalControlTypeTransforms,
      globalControlTypeEffects,
      globalControlTypeFilters,
      globalControlTypeBorders,
      globalControlTypeBg,
      globalControlTypeSVGFill,
      globalControlTypeSVGStroke,
      globalControlTypeOverlay,
      globalControlTypeOutline,
      globalControlType3D
    ].some((prop) => {
      const validValues = ["none", "static", "", void 0, null];
      return !validValues.includes(prop);
    });
  };
  return aControlWantsHover() ? classnames([
    property === "transition-default" ? "transition" : property,
    duration,
    delay,
    timingFunction === "custom" ? customTimingFunctionFormatted : timingFunction
  ]).toString() : "";
};
const asPercent = (value) => {
  const formattedValue = `${value != null ? value : 0}`.trim();
  return formattedValue.endsWith("%") ? formattedValue : `${formattedValue}%`;
};
const asDegrees = (value) => {
  const formattedValue = `${value != null ? value : 0}`.trim();
  return formattedValue.endsWith("deg") ? formattedValue : `${formattedValue}deg`;
};
const arbitraryValue = (value, fallback) => `${value || fallback}`.trim().replace(/\s+/g, "_");
const maskSizeClass = (size, customSize) => {
  return size === "custom" ? `mask-size-[${arbitraryValue(customSize, "100%_100%")}]` : size;
};
const maskClasses = (rw) => {
  const {
    maskType,
    maskResource,
    maskMode,
    maskSize,
    maskCustomSize,
    maskPosition,
    maskRepeat,
    maskEdgeSide,
    maskEdgeFrom,
    maskEdgeTo,
    maskLinearAngle,
    maskLinearFrom,
    maskLinearTo,
    maskRadialSize,
    maskRadialPosition,
    maskRadialFrom,
    maskRadialTo
  } = rw.props;
  switch (maskType) {
    case "svg": {
      if (!(maskResource == null ? void 0 : maskResource.image)) return ["mask-none"];
      const encodedSvg = encodeURIComponent(maskResource.image).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
      return [
        `mask-[url('data:image/svg+xml,${encodedSvg}')]`,
        maskMode,
        maskSizeClass(maskSize, maskCustomSize),
        maskPosition,
        maskRepeat
      ];
    }
    case "edge":
      return [
        `mask-${maskEdgeSide}-from-[${asPercent(maskEdgeFrom)}]`,
        `mask-${maskEdgeSide}-to-[${asPercent(maskEdgeTo)}]`
      ];
    case "linear":
      return [
        `mask-linear-[${asDegrees(maskLinearAngle)}]`,
        `mask-linear-from-[${asPercent(maskLinearFrom)}]`,
        `mask-linear-to-[${asPercent(maskLinearTo)}]`
      ];
    case "radial":
      return [
        maskRadialSize,
        maskRadialPosition,
        `mask-radial-from-[${asPercent(maskRadialFrom)}]`,
        `mask-radial-to-[${asPercent(maskRadialTo)}]`
      ];
    case "none":
    default:
      return ["mask-none"];
  }
};
const transformHook = (rw) => {
  const { globalID } = rw.props;
  const { id } = rw.node;
  const classes = {
    wrapper: classnames([
      `group/${id} group/mask`,
      globalID && `group/${globalID}`,
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      advancedClasses(rw)
    ]).toString(),
    mask: classnames([
      "block w-full h-full",
      globalTransitions(rw),
      ...maskClasses(rw)
    ]).toString()
  };
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: { id: globalID }
  });
  if ((globalID || "").length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({ classes });
};
exports.transformHook = transformHook;
