// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
const globalBgColor = (app, args = {}) => {
  const {
    globalControlTypeBg: controlType,
    globalBgColor: color,
    globalBgColorOpacity: opacity,
    globalBgColorEnd: colorEnd,
    globalBgColorOpacityEnd: opacityEnd
  } = app.props;
  const wantsPeer = (args == null ? void 0 : args.peer) || false;
  const wantsActive = (args == null ? void 0 : args.active) || false;
  const wantsFocus = (args == null ? void 0 : args.focus) || false;
  const classes = classnames([color, opacity]);
  if (controlType == "hover") {
    if (wantsPeer) {
      classes.add([
        colorEnd.replace(/hover:/g, "peer-hover:"),
        opacityEnd.replace(/hover:/g, "peer-hover:")
      ]);
    } else {
      classes.add([colorEnd, opacityEnd]);
    }
    if (wantsActive) {
      classes.add([
        colorEnd.replace(/hover:/g, "data-[active=true]:"),
        opacityEnd.replace(/hover:/g, "data-[active=true]:")
      ]);
    }
    if (wantsFocus) {
      classes.add([
        colorEnd.replace(/hover:/g, "focus:"),
        opacityEnd.replace(/hover:/g, "focus:")
      ]);
    }
  }
  return classes.toString();
};
const globalBgGradient = (app, args) => {
  const {
    globalControlTypeBg: controlType,
    globalBgGradientType: gradientType,
    globalBgGradientDirection: direction,
    globalBgGradientRadialPosition: radialPosition,
    globalBgGradientConicAngle: conicAngle,
    globalBgGradientInterpolation: interpolation,
    globalBgGradientTypeEnd: gradientTypeEnd,
    globalBgGradientDirectionEnd: directionEnd,
    globalBgGradientRadialPositionEnd: radialPositionEnd,
    globalBgGradientConicAngleEnd: conicAngleEnd,
    globalBgGradientInterpolationEnd: interpolationEnd,
    globalBgGradientFromColor: fromColor,
    globalBgGradientFromOpacity: fromOpacity,
    globalBgGradientFromPosition: fromPosition,
    globalBgGradientViaEnabled: viaEnabled,
    globalBgGradientViaColor: viaColor,
    globalBgGradientViaOpacity: viaOpacity,
    globalBgGradientViaPosition: viaPosition,
    globalBgGradientToColor: toColor,
    globalBgGradientToOpacity: toOpacity,
    globalBgGradientToPosition: toPosition,
    globalBgGradientFromColorEnd: fromColorEnd,
    globalBgGradientFromOpacityEnd: fromOpacityEnd,
    globalBgGradientViaEnabledEnd: viaEnabledEnd,
    globalBgGradientViaColorEnd: viaColorEnd,
    globalBgGradientViaOpacityEnd: viaOpacityEnd,
    globalBgGradientToColorEnd: toColorEnd,
    globalBgGradientToOpacityEnd: toOpacityEnd
  } = app.props;
  const wantsPeer = (args == null ? void 0 : args.peer) || false;
  const wantsActive = (args == null ? void 0 : args.active) || false;
  const wantsFocus = (args == null ? void 0 : args.focus) || false;
  const hasPrefix = (args == null ? void 0 : args.prefix) && (args == null ? void 0 : args.prefixCallback) || false;
  const prefixCallback = (args == null ? void 0 : args.prefixCallback) || (() => {
  });
  const directionClass = resolveGradientImageClass(
    gradientType,
    direction,
    radialPosition,
    conicAngle,
    interpolation
  );
  const directionEndClass = resolveGradientImageClass(
    gradientTypeEnd,
    directionEnd,
    radialPositionEnd,
    conicAngleEnd,
    interpolationEnd
  );
  const classes = classnames([
    directionClass,
    fromColor,
    fromOpacity,
    fromPosition,
    toColor,
    toOpacity,
    toPosition
  ]);
  if (switchToBool(viaEnabled) === true) {
    classes.add([viaColor, viaOpacity, viaPosition]);
  }
  if (controlType == "hover") {
    if (wantsPeer) {
      classes.add([
        directionEndClass.replace(/hover:/g, "peer-hover:"),
        fromColorEnd.replace(/hover:/g, "peer-hover:"),
        fromOpacityEnd.replace(/hover:/g, "peer-hover:"),
        toColorEnd.replace(/hover:/g, "peer-hover:"),
        toOpacityEnd.replace(/hover:/g, "peer-hover:")
      ]);
    } else if (hasPrefix) {
      classes.add([
        prefixCallback(
          directionEndClass.replace(/hover:/g, ""),
          args.prefix
        ),
        prefixCallback(
          fromColorEnd.replace(/hover:/g, ""),
          args.prefix
        ),
        prefixCallback(
          fromOpacityEnd.replace(/hover:/g, ""),
          args.prefix
        ),
        prefixCallback(toColorEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(
          toOpacityEnd.replace(/hover:/g, ""),
          args.prefix
        )
      ]);
    } else {
      classes.add([
        directionEndClass,
        fromColorEnd,
        fromOpacityEnd,
        toColorEnd,
        toOpacityEnd
      ]);
    }
    if (wantsActive) {
      classes.add([
        directionEndClass.replace(/hover:/g, "data-[active=true]:"),
        fromColorEnd.replace(/hover:/g, "data-[active=true]:"),
        fromOpacityEnd.replace(/hover:/g, "data-[active=true]:"),
        toColorEnd.replace(/hover:/g, "data-[active=true]:"),
        toOpacityEnd.replace(/hover:/g, "data-[active=true]:")
      ]);
    }
    if (wantsFocus) {
      classes.add([
        directionEndClass.replace(/hover:/g, "focus:"),
        fromColorEnd.replace(/hover:/g, "focus:"),
        fromOpacityEnd.replace(/hover:/g, "focus:"),
        toColorEnd.replace(/hover:/g, "focus:"),
        toOpacityEnd.replace(/hover:/g, "focus:")
      ]);
    }
    if (switchToBool(viaEnabledEnd) === true) {
      if (wantsPeer) {
        classes.add([
          viaColorEnd.replace(/hover:/g, "peer-hover:"),
          viaOpacityEnd.replace(/hover:/g, "peer-hover:")
        ]);
      } else if (hasPrefix) {
        classes.add([
          prefixCallback(
            viaColorEnd.replace(/hover:/g, ""),
            args.prefix
          ),
          prefixCallback(
            viaOpacityEnd.replace(/hover:/g, ""),
            args.prefix
          )
        ]);
      } else {
        classes.add([viaColorEnd, viaOpacityEnd]);
      }
      if (wantsActive) {
        classes.add([
          viaColorEnd.replace(/hover:/g, "data-[active=true]:"),
          viaOpacityEnd.replace(/hover:/g, "data-[active=true]:")
        ]);
      }
      if (wantsFocus) {
        classes.add([
          viaColorEnd.replace(/hover:/g, "focus:"),
          viaOpacityEnd.replace(/hover:/g, "focus:")
        ]);
      }
    }
  }
  return classes.toString();
};
const encodeBgImageUrl = (url) => String(url).replace(/[ '"()]/g, (char) => ({
  " ": "%20",
  "'": "%27",
  '"': "%22",
  "(": "%28",
  ")": "%29"
})[char]);
const globalBgImage = (app, args) => {
  const {
    globalControlTypeBg: controlType,
    globalBgImageType: type,
    globalBgImageCmsField: cmsField,
    globalBgImageResource: resource,
    globalBgImagePosition: position,
    globalBgImageSize: size,
    globalBgImageRepeat: repeat,
    globalBgImageResourceEnd: resourceEnd,
    globalBgImagePositionEnd: positionEnd,
    globalBgImageSizeEnd: sizeEnd,
    globalBgImageRepeatEnd: repeatEnd
  } = app.props;
  const isCms = type === "cms";
  if (isCms) {
    return classnames([size, repeat, position]).toString();
  }
  const wantsPeer = (args == null ? void 0 : args.peer) || false;
  const wantsActive = (args == null ? void 0 : args.active) || false;
  const wantsFocus = (args == null ? void 0 : args.focus) || false;
  const hasPrefix = (args == null ? void 0 : args.prefix) && (args == null ? void 0 : args.prefixCallback) || false;
  const prefixCallback = (args == null ? void 0 : args.prefixCallback) || (() => {
  });
  const hasImage = Boolean(resource == null ? void 0 : resource.image);
  const hasImageEnd = Boolean(resourceEnd == null ? void 0 : resourceEnd.image);
  const classes = classnames().add([
    hasImage ? `bg-[url(${encodeBgImageUrl(resource.image)})]` : "",
    size,
    repeat,
    position
  ]);
  if (controlType == "hover") {
    if (wantsPeer) {
      classes.add([
        hasImageEnd ? `peer-hover:bg-[url(${encodeBgImageUrl(resourceEnd.image)})]` : "",
        sizeEnd.replace(/hover:/g, "peer-hover:"),
        repeatEnd.replace(/hover:/g, "peer-hover:"),
        positionEnd.replace(/hover:/g, "peer-hover:")
      ]);
    } else if (hasPrefix) {
      classes.add([
        hasImageEnd ? prefixCallback(`bg-[url(${encodeBgImageUrl(resourceEnd.image)})]`, args.prefix) : "",
        prefixCallback(sizeEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(repeatEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(positionEnd.replace(/hover:/g, ""), args.prefix)
      ]);
    } else {
      classes.add([
        hasImageEnd ? `hover:bg-[url(${encodeBgImageUrl(resourceEnd.image)})]` : "",
        sizeEnd,
        repeatEnd,
        positionEnd
      ]);
    }
    if (wantsActive) {
      classes.add([
        hasImageEnd ? `data-[active=true]:bg-[url(${encodeBgImageUrl(resourceEnd.image)})]` : "",
        sizeEnd.replace(/hover:/g, "data-[active=true]:"),
        repeatEnd.replace(/hover:/g, "data-[active=true]:"),
        positionEnd.replace(/hover:/g, "data-[active=true]:")
      ]);
    }
    if (wantsFocus) {
      classes.add([
        hasImageEnd ? `focus:bg-[url(${encodeBgImageUrl(resourceEnd.image)})]` : "",
        sizeEnd.replace(/hover:/g, "focus:"),
        repeatEnd.replace(/hover:/g, "focus:"),
        positionEnd.replace(/hover:/g, "focus:")
      ]);
    }
  }
  return classes.toString();
};
const globalBgVideoThumbnail = (app, args) => {
  const { globalBgVideo: video } = app.props;
  return classnames([
    `bg-[url(${encodeBgImageUrl(video == null ? void 0 : video.image)})] bg-cover bg-center`
  ]).toString();
};
const globalBackground = (app, args = {}) => {
  const { globalControlTypeBg: controlType, globalBgType: type } = app.props;
  if (controlType == "none") {
    return "";
  }
  switch (type) {
    case "color":
      return globalBgColor(app, args);
    case "gradient":
      return globalBgGradient(app, args);
    case "image":
      return globalBgImage(app, args);
    case "video":
      return globalBgVideoThumbnail(app, args);
    case "none":
      return "";
    default:
      console.error("Invalid background type:", type);
      return "";
  }
};
const globalBordersTable = (app, args = {}) => {
  const {
    globalControlTypeBorders: type,
    globalBordersColor: color,
    globalBordersColorOpacity: colorOpacity,
    globalBordersWidth: width,
    globalBordersStyle: style,
    globalBordersColorEnd: colorEnd,
    globalBordersColorOpacityEnd: colorOpacityEnd,
    globalBordersWidthEnd: widthEnd,
    globalBordersStyleEnd: styleEnd
  } = app.props;
  const classes = [];
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  if (type == "none") {
    return "";
  }
  classes.push(
    width,
    style,
    color.split(" ").filter(Boolean).map((c) => `${c.trim()}/${colorOpacity}`).join(" ")
  );
  const prefix = getHoverPrefix(node, "background", "self");
  if (type == "hover") {
    classes.push(
      widthEnd,
      `${prefix}:${styleEnd}`,
      colorEnd.split(" ").filter(Boolean).map((c) => `${prefix}:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  if (wantsActive) {
    const endColor = type == "hover" ? colorEnd : color;
    const endWidth = type == "hover" ? widthEnd : width;
    const endStyle = type == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "data-[active=true]"),
      `data-[active=true]:${endStyle}`,
      endColor.split(" ").filter(Boolean).map((c) => `data-[active=true]:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  if (wantsFocus) {
    const endColor = type == "hover" ? colorEnd : color;
    const endWidth = type == "hover" ? widthEnd : width;
    const endStyle = type == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "focus"),
      `${prefix.replace(/hover/g, "focus")}:${endStyle}`,
      endColor.split(" ").filter(Boolean).map((c) => `${prefix.replace(/hover/g, "focus")}:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  return classnames(classes).toString();
};
function addPrefixToTailwindClasses(classString, prefix) {
  if (!classString) return "";
  return classString.split(/\s+/).filter(Boolean).map((cls) => {
    cls = cls.replace(/hover:/g, "");
    if (cls.includes(`${prefix}:`)) return cls;
    const match = cls.match(/^([a-z0-9]+:)(.+)$/i);
    if (match) {
      return `${match[1]}${prefix}:${match[2]}`;
    }
    return `${prefix}:${cls}`;
  }).join(" ");
}
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
const escapeArbitraryWhitespace = (classString) => {
  if (!classString) return classString;
  return String(classString).replace(
    /\[[^\]]*\]/g,
    (segment) => segment.replace(/\s+/g, "_")
  );
};
const getHoverPrefix = (node = {}, applyTo = "", hoverGroup = "self", customId = "") => {
  const needsPeerPrefix = node.isContainer && ["background", "content"].includes(applyTo);
  if (hoverGroup === "parent") return `group-hover/${node.parent.id}`;
  if (hoverGroup === "custom") return `group-hover/${customId}`;
  if (needsPeerPrefix && hoverGroup === "self")
    return `group-hover/${node.id}`;
  return hoverGroup === "self" ? needsPeerPrefix ? `peer-hover` : "hover" : `group-hover/${hoverGroup}`;
};
const HUE_INTERPOLATION_KEYWORDS = [
  "longer",
  "shorter",
  "increasing",
  "decreasing"
];
const resolveArbitraryInterpolation = (interpolation) => {
  if (HUE_INTERPOLATION_KEYWORDS.includes(interpolation)) {
    return `in_oklch_${interpolation}_hue`;
  }
  return `in_${interpolation}`;
};
const normalizeGradientImageClass = (className, interpolation = "") => {
  if (!className) {
    return "";
  }
  const parts = String(className).split(":");
  let baseClass = parts.pop();
  const prefix = parts.length ? `${parts.join(":")}:` : "";
  baseClass = baseClass.replace(/^bg-gradient-to-/, "bg-linear-to-");
  if (interpolation && !baseClass.includes("/") && /^-?bg-(linear|radial|conic)(-|$|\[|\()/.test(baseClass)) {
    if (baseClass.includes("[")) {
      baseClass = baseClass.replace(
        /\]$/,
        `_${resolveArbitraryInterpolation(interpolation)}]`
      );
    } else {
      baseClass = `${baseClass}/${interpolation}`;
    }
  }
  return `${prefix}${baseClass}`;
};
const resolveGradientImageClass = (type, linearDirection, radialPosition, conicAngle, interpolation = "") => {
  let selectedDirection = linearDirection;
  if (type === "radial") {
    selectedDirection = radialPosition || linearDirection;
  } else if (type === "conic") {
    selectedDirection = conicAngle || linearDirection;
  }
  return normalizeGradientImageClass(selectedDirection, interpolation);
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
const globalEffects = (app, args = {}) => {
  const {
    globalEffectsApplyTo: applyTo,
    globalControlTypeEffects: type,
    globalHoverGroupEffects: hoverGroup,
    globalHoverGroupCustomIdEffects: customId,
    globalBoxShadow: boxShadow,
    globalBoxShadowColor: boxShadowColor,
    globalBoxShadowOpacity: boxShadowOpacity,
    globalOpacity: opacity,
    globalBoxShadowEnd: boxShadowEnd,
    globalBoxShadowColorEnd: boxShadowColorEnd,
    globalBoxShadowOpacityEnd: boxShadowOpacityEnd,
    globalOpacityEnd: opacityEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  const classes = [];
  if (type != "none") {
    classes.push(boxShadow, boxShadowColor, boxShadowOpacity, opacity);
  }
  if (type == "hover") {
    classes.push(
      addPrefixToTailwindClasses(boxShadowEnd, prefix),
      addPrefixToTailwindClasses(boxShadowColorEnd, prefix),
      addPrefixToTailwindClasses(boxShadowOpacityEnd, prefix),
      addPrefixToTailwindClasses(opacityEnd, prefix)
    );
    if (wantsActive) {
      classes.push(
        addPrefixToTailwindClasses(boxShadowEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(boxShadowColorEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(boxShadowOpacityEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(opacityEnd, "data-[active=true]")
      );
    }
    if (wantsFocus) {
      const focusPrefix = prefix.replace(/hover/g, "focus");
      classes.push(
        addPrefixToTailwindClasses(boxShadowEnd, focusPrefix),
        addPrefixToTailwindClasses(boxShadowColorEnd, focusPrefix),
        addPrefixToTailwindClasses(boxShadowOpacityEnd, focusPrefix),
        addPrefixToTailwindClasses(opacityEnd, focusPrefix)
      );
    }
  }
  return classnames(classes).toString();
};
const globalFilters = (app, args = {}) => {
  const {
    globalControlTypeFilters: type,
    globalHoverGroupFilters: hoverGroup,
    globalHoverGroupCustomIdFilters: customId,
    globalFiltersApplyTo: applyTo,
    // filters
    globalFiltersBlur: blur,
    globalFiltersBrightness: brightness,
    globalFiltersDropShadow: dropShadow,
    globalFiltersSaturate: saturate,
    // backdrop filters
    globalFiltersBackdropBlur: backdropBlur,
    // end filters
    globalFiltersBlurEnd: blurEnd,
    globalFiltersBrightnessEnd: brightnessEnd,
    globalFiltersDropShadowEnd: dropShadowEnd,
    globalFiltersSaturateEnd: saturateEnd,
    // end backdrop filters
    globalFiltersBackdropBlurEnd: backdropBlurEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  if (type == "none") {
    return "";
  }
  const wantsBlur = !blur.endsWith("[0px]") || !blurEnd.endsWith("[0px]");
  const wantsBackdropBlur = !backdropBlur.endsWith("[0px]") || !backdropBlurEnd.endsWith("[0px]");
  const classes = [
    wantsBlur ? blur : "",
    brightness,
    dropShadow,
    saturate,
    wantsBackdropBlur ? backdropBlur : ""
  ];
  if (type == "hover") {
    classes.push(
      wantsBlur ? addPrefixToTailwindClasses(blurEnd, prefix) : "",
      addPrefixToTailwindClasses(brightnessEnd, prefix),
      addPrefixToTailwindClasses(dropShadowEnd, prefix),
      addPrefixToTailwindClasses(saturateEnd, prefix),
      wantsBackdropBlur ? addPrefixToTailwindClasses(backdropBlurEnd, prefix) : ""
    );
    if (wantsActive) {
      classes.push(
        wantsBlur ? addPrefixToTailwindClasses(blurEnd, "data-[active=true]") : "",
        addPrefixToTailwindClasses(brightnessEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(dropShadowEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(saturateEnd, "data-[active=true]"),
        wantsBackdropBlur ? addPrefixToTailwindClasses(backdropBlurEnd, "data-[active=true]") : ""
      );
    }
    if (wantsFocus) {
      const focusPrefix = prefix.replace(/hover/g, "focus");
      classes.push(
        wantsBlur ? addPrefixToTailwindClasses(blurEnd, focusPrefix) : "",
        addPrefixToTailwindClasses(brightnessEnd, focusPrefix),
        addPrefixToTailwindClasses(dropShadowEnd, focusPrefix),
        addPrefixToTailwindClasses(saturateEnd, focusPrefix),
        wantsBackdropBlur ? addPrefixToTailwindClasses(backdropBlurEnd, focusPrefix) : ""
      );
    }
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
function mirrorScaleXToY(classString) {
  if (!classString) return "";
  return classString.split(/\s+/).filter(Boolean).map(
    (cls) => cls.includes("scale-x-") ? `${cls} ${cls.replace("scale-x-", "scale-y-")}` : cls
  ).join(" ");
}
const globalTransforms = (app, args = {}) => {
  const {
    globalControlTypeTransforms: type,
    globalHoverGroupTransforms: hoverGroup,
    globalHoverGroupCustomIdTransforms: customId,
    globalTransformsApplyTo: applyTo,
    globalTransformOrigin: origin,
    globalTransformScale: scale,
    globalTransformRotate: rotate,
    globalTransformSkewX: skewX,
    globalTransformSkewY: skewY,
    globalTransformTranslateX: translateX,
    globalTransformTranslateY: translateY,
    globalTransformScaleEnd: scaleEnd,
    globalTransformRotateEnd: rotateEnd,
    globalTransformSkewXEnd: skewXEnd,
    globalTransformSkewYEnd: skewYEnd,
    globalTransformTranslateXEnd: translateXEnd,
    globalTransformTranslateYEnd: translateYEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  const classes = classnames();
  const scaleMirrored = mirrorScaleXToY(scale);
  const scaleEndMirrored = mirrorScaleXToY(scaleEnd);
  const translateXSafe = escapeArbitraryWhitespace(translateX);
  const translateYSafe = escapeArbitraryWhitespace(translateY);
  const translateXEndSafe = escapeArbitraryWhitespace(translateXEnd);
  const translateYEndSafe = escapeArbitraryWhitespace(translateYEnd);
  if (type != "none") {
    classes.add([
      "transform",
      origin,
      scaleMirrored,
      rotate,
      skewX,
      skewY,
      translateXSafe,
      translateYSafe
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(scaleEndMirrored, prefix),
      addPrefixToTailwindClasses(rotateEnd, prefix),
      addPrefixToTailwindClasses(skewXEnd, prefix),
      addPrefixToTailwindClasses(skewYEnd, prefix),
      addPrefixToTailwindClasses(translateXEndSafe, prefix),
      addPrefixToTailwindClasses(translateYEndSafe, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        addPrefixToTailwindClasses(scaleEndMirrored, "data-[active=true]"),
        addPrefixToTailwindClasses(rotateEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(skewXEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(skewYEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(translateXEndSafe, "data-[active=true]"),
        addPrefixToTailwindClasses(translateYEndSafe, "data-[active=true]")
      ]);
    }
    if (wantsFocus) {
      const focusPrefix = prefix.replace(/hover/g, "focus");
      classes.add([
        addPrefixToTailwindClasses(scaleEndMirrored, focusPrefix),
        addPrefixToTailwindClasses(rotateEnd, focusPrefix),
        addPrefixToTailwindClasses(skewXEnd, focusPrefix),
        addPrefixToTailwindClasses(skewYEnd, focusPrefix),
        addPrefixToTailwindClasses(translateXEndSafe, focusPrefix),
        addPrefixToTailwindClasses(translateYEndSafe, focusPrefix)
      ]);
    }
  }
  return classes.toString();
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
  const customTimingFunctionFormatted = escapeArbitraryWhitespace(customTimingFunction);
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
const transformHook = (rw) => {
  const {
    globalID,
    // CSV data source
    dataSource,
    csvFile,
    csvUrl,
    csvFirstRowIsHeader,
    // Manual mode
    rowCount,
    showHeader,
    showFooter,
    // Header styling
    headerBackground,
    headerVerticalAlignment,
    // Header cells
    headerCellPadding,
    headerCellBorderStyle,
    headerCellBorderWidth,
    headerCellBorderColor,
    // Header text
    headerTextAlignment,
    headerTextFont,
    headerTextColor,
    headerTextSize,
    headerTextWeight,
    headerTextLetterSpacing,
    // Body cells
    bodyCellPadding,
    bodyVerticalAlignment,
    // Body text
    bodyTextAlignment,
    bodyTextFont,
    bodyTextColor,
    bodyTextSize,
    bodyTextWeight,
    bodyTextLetterSpacing,
    // Body borders
    bodyCellBorderStyle,
    bodyCellBorderWidth,
    bodyCellBorderColor,
    // Row styles
    stripedRows,
    oddRowBackground,
    evenRowBackground,
    enableRowHover,
    rowHoverBackground,
    // Footer styling
    footerBackground,
    footerVerticalAlignment,
    // Footer cells
    footerCellPadding,
    footerCellBorderStyle,
    footerCellBorderWidth,
    footerCellBorderColor,
    // Footer text
    footerTextAlignment,
    footerTextFont,
    footerTextColor,
    footerTextSize,
    footerTextWeight,
    footerTextLetterSpacing,
    // Interactive
    showSearch,
    searchPlaceholder,
    showPagination,
    rowsPerPage,
    showFirstLast,
    paginationPrevLabel,
    paginationNextLabel,
    paginationFirstLabel,
    paginationLastLabel,
    paginationPageText,
    // Search bar styling
    searchPadding,
    searchMarginBottom,
    searchFont,
    searchTextColor,
    searchTextSize,
    searchPlaceholderColor,
    searchBackground,
    searchBorderStyle,
    searchBorderWidth,
    searchBorderColor,
    searchBorderRadius,
    // Pagination styling
    paginationMarginTop,
    paginationAlignment,
    paginationFont,
    paginationTextSize,
    paginationTextColor,
    paginationDisabledColor
  } = rw.props;
  const { mode } = rw.project;
  const { id } = rw.node;
  const { columns } = rw.collections;
  const edit = mode === "edit";
  const isCSVMode = dataSource === "csvFile" || dataSource === "csvUrl";
  let csvSource = "";
  if (dataSource === "csvFile") {
    csvSource = (csvFile == null ? void 0 : csvFile.path) || "";
  } else if (dataSource === "csvUrl") {
    csvSource = csvUrl || "";
  }
  const csvFirstRowHeader = csvFirstRowIsHeader === true || csvFirstRowIsHeader === "true";
  const count = Math.max(1, parseInt(rowCount) || 3);
  const rows = Array.from({ length: count }, (_, i) => ({ index: i }));
  const wantsHeader = showHeader === true || showHeader === "true";
  const wantsFooter = showFooter === true || showFooter === "true";
  const wantsSearch = showSearch === true || showSearch === "true";
  const wantsPagination = showPagination === true || showPagination === "true";
  const wantsFirstLast = showFirstLast === true || showFirstLast === "true";
  const wantsRowHover = enableRowHover === true || enableRowHover === "true";
  const perPage = Math.max(1, parseInt(rowsPerPage) || 10);
  const pageTextFormat = paginationPageText || "Page {{page}} of {{total}}";
  const resolveColumnAlignment = (columnAlignment, fallback) => columnAlignment || fallback || "";
  const processedColumns = (columns == null ? void 0 : columns.map((col, index) => {
    const isDropzone = col.cellMode === "dropzone";
    const isSortable = col.columnSortable === true || col.columnSortable === "true";
    const isHidden = col.columnHidden === true || col.columnHidden === "true";
    return {
      ...col,
      index,
      isDropzone,
      isText: !isDropzone,
      isSortable: isSortable && !edit,
      widthClass: col.columnWidth || "",
      headerAlignmentClass: resolveColumnAlignment(col.columnAlignment, headerTextAlignment),
      bodyAlignmentClass: resolveColumnAlignment(col.columnAlignment, bodyTextAlignment),
      footerAlignmentClass: resolveColumnAlignment(col.columnAlignment, footerTextAlignment),
      hiddenClass: isHidden ? "hidden" : "",
      extraClasses: col.cssClasses || ""
    };
  })) || [];
  const hasCustomWidths = processedColumns.some((col) => {
    const w = col.columnWidth || "";
    return w.includes("[");
  });
  const hasSortableColumns = processedColumns.some((col) => col.isSortable);
  const csvColumnMeta = processedColumns.map((col) => ({
    widthClass: col.widthClass,
    headerAlignmentClass: col.headerAlignmentClass,
    bodyAlignmentClass: col.bodyAlignmentClass,
    hiddenClass: col.hiddenClass,
    extraClasses: col.extraClasses,
    isSortable: col.isSortable
  }));
  const wantsStripes = stripedRows === true || stripedRows === "true";
  const rowBgClasses = wantsStripes ? classnames([oddRowBackground, evenRowBackground]).toString() : classnames([(oddRowBackground == null ? void 0 : oddRowBackground.replace(/odd:/g, "")) || ""]).toString();
  const classes = {
    wrapper: classnames([
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      globalTransitions(rw),
      globalEffects(rw),
      globalFilters(rw),
      globalTransforms(rw),
      globalBackground(rw),
      advancedClasses(rw)
    ]).toString(),
    table: classnames([
      "min-w-full w-full border-collapse",
      hasCustomWidths ? "table-fixed" : "",
      globalBordersTable(rw)
    ]).toString(),
    theadRow: classnames([
      headerBackground
    ]).toString(),
    th: classnames([
      headerCellPadding,
      headerVerticalAlignment,
      headerCellBorderStyle,
      headerCellBorderWidth,
      headerCellBorderColor,
      headerTextFont,
      headerTextColor,
      headerTextSize,
      headerTextWeight,
      headerTextLetterSpacing
    ]).toString(),
    tbody: "",
    tr: classnames([
      rowBgClasses,
      wantsRowHover ? "transition-colors" : "",
      wantsRowHover ? rowHoverBackground : ""
    ]).toString(),
    td: classnames([
      bodyCellPadding,
      bodyVerticalAlignment,
      bodyCellBorderStyle,
      bodyCellBorderWidth,
      bodyCellBorderColor,
      bodyTextFont,
      bodyTextColor,
      bodyTextSize,
      bodyTextWeight,
      bodyTextLetterSpacing
    ]).toString(),
    tfootRow: classnames([
      footerBackground
    ]).toString(),
    tfoot: classnames([
      footerCellPadding,
      footerVerticalAlignment,
      footerCellBorderStyle,
      footerCellBorderWidth,
      footerCellBorderColor,
      footerTextFont,
      footerTextColor,
      footerTextSize,
      footerTextWeight,
      footerTextLetterSpacing
    ]).toString(),
    searchInput: classnames([
      "w-full outline-none",
      searchPadding,
      searchMarginBottom,
      searchFont,
      searchTextColor,
      searchTextSize,
      searchPlaceholderColor,
      searchBackground,
      searchBorderStyle,
      searchBorderWidth,
      searchBorderColor,
      searchBorderRadius
    ]).toString(),
    pagination: classnames([
      "flex items-center gap-4",
      paginationMarginTop,
      paginationAlignment,
      paginationFont,
      paginationTextSize
    ]).toString(),
    paginationText: classnames([
      paginationTextColor
    ]).toString(),
    paginationButton: classnames([
      paginationTextColor,
      "cursor-pointer"
    ]).toString(),
    paginationButtonDisabled: classnames([
      paginationDisabledColor,
      "cursor-not-allowed"
    ]).toString()
  };
  const alpineConfig = {
    search: wantsSearch,
    pagination: wantsPagination,
    rowsPerPage: perPage,
    totalRows: isCSVMode ? 0 : count,
    sortable: hasSortableColumns
  };
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      id: globalID || id
    }
  });
  if (globalID && globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  const previewColumnCount = Math.max(processedColumns.length, 1);
  const previewColumnLabel = (index) => {
    if (index < 26) {
      return `column_${String.fromCharCode(97 + index)}`;
    }
    return `column_${index + 1}`;
  };
  const headerRow = Array.from({ length: previewColumnCount }, (_, index) => ({
    label: previewColumnLabel(index)
  }));
  const headerAsCells = { cells: headerRow.map((h) => ({ value: h.label })) };
  const bodyRows = Array.from({ length: 5 }, (_, rowIndex) => ({
    cells: Array.from({ length: previewColumnCount }, (_2, colIndex) => ({
      value: `row ${rowIndex + 1}, cell ${colIndex + 1}`
    }))
  }));
  const mapHeaderColumnClasses = (col) => ({
    widthClass: col.widthClass,
    alignmentClass: col.headerAlignmentClass,
    hiddenClass: col.hiddenClass,
    extraClasses: col.extraClasses
  });
  const mapBodyColumnClasses = (col) => ({
    widthClass: col.widthClass,
    alignmentClass: col.bodyAlignmentClass,
    hiddenClass: col.hiddenClass,
    extraClasses: col.extraClasses
  });
  const buildPreviewCells = (sourceCells) => processedColumns.map((col, index) => {
    var _a;
    return {
      value: ((_a = sourceCells[index]) == null ? void 0 : _a.value) || "",
      ...mapBodyColumnClasses(col)
    };
  });
  const exampleShowHeader = csvFirstRowHeader && wantsHeader;
  const examplePreviewHeaders = exampleShowHeader ? processedColumns.map((col, index) => {
    var _a;
    return {
      label: ((_a = headerRow[index]) == null ? void 0 : _a.label) || previewColumnLabel(index),
      ...mapHeaderColumnClasses(col)
    };
  }) : [];
  const rawExampleRows = csvFirstRowHeader ? bodyRows : [headerAsCells, ...bodyRows];
  const examplePreviewRows = rawExampleRows.map((row) => ({
    cells: buildPreviewCells(row.cells)
  }));
  rw.setProps({
    // Alpine's sort() looks the wrapper up by id, so this must match the
    // id set on the root element (globalID wins when present)
    id: globalID || id,
    classes,
    columns: processedColumns,
    rows,
    showHeader: wantsHeader,
    showFooter: wantsFooter,
    showSearch: wantsSearch,
    showPagination: wantsPagination,
    showFirstLast: wantsFirstLast,
    searchPlaceholder: searchPlaceholder || "Search...",
    paginationPrevLabel: paginationPrevLabel || "Previous",
    paginationNextLabel: paginationNextLabel || "Next",
    paginationFirstLabel: paginationFirstLabel || "First",
    paginationLastLabel: paginationLastLabel || "Last",
    paginationPageText: pageTextFormat,
    // Pre-substituted variant for the static edit-mode pagination mock
    paginationPageTextStatic: pageTextFormat.replace(/\{\{page\}\}/g, "1").replace(/\{\{total\}\}/g, "1"),
    edit,
    alpineConfig: JSON.stringify(alpineConfig).replace(/"/g, "'"),
    csvColumnMeta: JSON.stringify(csvColumnMeta),
    // CSV mode
    isCSVMode,
    isCSVFile: dataSource === "csvFile",
    isCSVUrl: dataSource === "csvUrl",
    csvSource,
    csvFirstRowIsHeader: csvFirstRowHeader ? "true" : "false",
    // Example data for edit mode
    exampleShowHeader,
    examplePreviewHeaders,
    examplePreviewRows
  });
};
exports.transformHook = transformHook;
