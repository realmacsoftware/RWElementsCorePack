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
  if (viaEnabled === true) {
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
    if (viaEnabledEnd === true) {
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
    hasImage ? `bg-[url(${resource.image})]` : "",
    size,
    repeat,
    position
  ]);
  if (controlType == "hover") {
    if (wantsPeer) {
      classes.add([
        hasImageEnd ? `peer-hover:bg-[url(${resourceEnd.image})]` : "",
        sizeEnd.replace(/hover:/g, "peer-hover:"),
        repeatEnd.replace(/hover:/g, "peer-hover:"),
        positionEnd.replace(/hover:/g, "peer-hover:")
      ]);
    } else if (hasPrefix) {
      classes.add([
        hasImageEnd ? prefixCallback(`bg-[url(${resourceEnd.image})]`, args.prefix) : "",
        prefixCallback(sizeEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(repeatEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(positionEnd.replace(/hover:/g, ""), args.prefix)
      ]);
    } else {
      classes.add([
        hasImageEnd ? `hover:bg-[url(${resourceEnd.image})]` : "",
        sizeEnd,
        repeatEnd,
        positionEnd
      ]);
    }
    if (wantsActive) {
      classes.add([
        hasImageEnd ? `data-[active=true]:bg-[url(${resourceEnd.image})]` : "",
        sizeEnd.replace(/hover:/g, "data-[active=true]:"),
        repeatEnd.replace(/hover:/g, "data-[active=true]:"),
        positionEnd.replace(/hover:/g, "data-[active=true]:")
      ]);
    }
    if (wantsFocus) {
      classes.add([
        hasImageEnd ? `focus:bg-[url(${resourceEnd.image})]` : "",
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
    `bg-[url(${video == null ? void 0 : video.image})] bg-cover bg-center`
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
const globalBorders = (app, args = {}) => {
  const {
    globalControlTypeBorders: type,
    globalBordersColor: color,
    globalBordersColorOpacity: colorOpacity,
    globalBordersWidth: width,
    globalBordersRadius: radius,
    globalBordersStyle: style,
    globalBordersColorEnd: colorEnd,
    globalBordersColorOpacityEnd: colorOpacityEnd,
    globalBordersWidthEnd: widthEnd,
    globalBordersRadiusEnd: radiusEnd,
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
    radius,
    color.split(" ").filter(Boolean).map((c) => `${c.trim()}/${colorOpacity}`).join(" ")
  );
  const prefix = getHoverPrefix(node, "background", "self");
  if (type == "hover") {
    classes.push(
      widthEnd,
      radiusEnd,
      `${prefix}:${styleEnd}`,
      colorEnd.split(" ").filter(Boolean).map((c) => `${prefix}:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  if (wantsActive) {
    const endColor = type == "hover" ? colorEnd : color;
    const endWidth = type == "hover" ? widthEnd : width;
    const endRadius = type == "hover" ? radiusEnd : radius;
    const endStyle = type == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "data-[active=true]"),
      endRadius.replace(/hover/g, "data-[active=true]"),
      `data-[active=true]:${endStyle}`,
      endColor.split(" ").filter(Boolean).map((c) => `data-[active=true]:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  if (wantsFocus) {
    const endColor = type == "hover" ? colorEnd : color;
    const endWidth = type == "hover" ? widthEnd : width;
    const endRadius = type == "hover" ? radiusEnd : radius;
    const endStyle = type == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "focus"),
      endRadius.replace(/hover/g, "focus"),
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
  if (minMaxEnabled === true) {
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
  if (enabled === false) {
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
  if (type != "none") {
    classes.add([
      "transform",
      origin,
      scaleMirrored,
      rotate,
      skewX,
      skewY,
      translateX,
      translateY
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(scaleEndMirrored, prefix),
      addPrefixToTailwindClasses(rotateEnd, prefix),
      addPrefixToTailwindClasses(skewXEnd, prefix),
      addPrefixToTailwindClasses(skewYEnd, prefix),
      addPrefixToTailwindClasses(translateXEnd, prefix),
      addPrefixToTailwindClasses(translateYEnd, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        addPrefixToTailwindClasses(scaleEndMirrored, "data-[active=true]"),
        addPrefixToTailwindClasses(rotateEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(skewXEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(skewYEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(translateXEnd, "data-[active=true]"),
        addPrefixToTailwindClasses(translateYEnd, "data-[active=true]")
      ]);
    }
    if (wantsFocus) {
      const focusPrefix = prefix.replace(/hover/g, "focus");
      classes.add([
        addPrefixToTailwindClasses(scaleEndMirrored, focusPrefix),
        addPrefixToTailwindClasses(rotateEnd, focusPrefix),
        addPrefixToTailwindClasses(skewXEnd, focusPrefix),
        addPrefixToTailwindClasses(skewYEnd, focusPrefix),
        addPrefixToTailwindClasses(translateXEnd, focusPrefix),
        addPrefixToTailwindClasses(translateYEnd, focusPrefix)
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
const transformHook = (rw) => {
  const {
    iconPlay,
    iconPause,
    iconNext,
    iconPrevious,
    iconSkipBack,
    iconSkipForward,
    iconSpacing,
    iconPlayPauseColor,
    iconPlayPauseColorHover,
    iconPlayPauseSize,
    iconNextPrevColor,
    iconNextPrevColorHover,
    iconNextPrevSize,
    iconSkipSize,
    iconSkipColor,
    iconSkipColorHover,
    trackListMaxHeight,
    trackListPadding,
    trackListGap,
    trackItemPadding,
    trackItemGap,
    trackItemBorderRadius,
    trackListArtworkSize,
    trackListArtworkShadow,
    trackListArtworkBorderRadius,
    trackListTitleFontSize,
    trackListArtistFontSize,
    trackTitleTextColor,
    trackTitleTextColorHover,
    trackArtistTextColor,
    trackArtistTextColorHover,
    trackBg,
    trackBgOpacity,
    trackBgHover,
    trackBgOpacityHover,
    trackDividersColor,
    trackDividersThickness,
    showTrackDurations,
    trackDurationColor,
    trackDurationSize,
    appearance,
    nowPlayingLayout,
    nowPlayingPadding,
    nowPlayingGap,
    nowPlayingArtworkSize,
    nowPlayingArtworkShadow,
    nowPlayingArtworkBorderRadius,
    nowPlayingTitleTextColor,
    nowPlayingArtistTextColor,
    nowPlayingArtistFontSize,
    nowPlayingTitleFontSize,
    nowPlayingProgressBarBgColor,
    nowPlayingProgressBarForegroundColor,
    nowPlayingProgressBarSize,
    showPlaybackTime,
    playbackTimeColor,
    playbackTimeSize,
    pauseWhenOutOfView,
    initialVolume,
    volumeBarBgColor,
    volumeBarFgColor,
    volumeBarSize,
    volumeBarWidth,
    iconVolumeColor,
    iconVolumeColorHover,
    iconVolumeSize,
    iconVolume,
    iconMuted
  } = rw.props;
  const { mode } = rw.project;
  const { tracks } = rw.collections;
  const { sharedAssetPath } = rw.component;
  const firstTrack = (tracks == null ? void 0 : tracks[0]) || {
    title: "Placeholder Title",
    artist: "Placeholder Artist",
    coverImage: `${sharedAssetPath}/images/image-square.jpg`,
    audioSource: {
      path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
  };
  const hasMultipleTracks = (tracks == null ? void 0 : tracks.length) > 1;
  const isCompact = appearance === "compact";
  const pauseOutOfView = pauseWhenOutOfView === true || pauseWhenOutOfView === "true";
  const classes = {
    wrapper: classnames([
      "text-white",
      advancedClasses(rw),
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      globalTransitions(rw),
      globalFilters(rw),
      globalEffects(rw),
      globalTransforms(rw),
      globalBackground(rw),
      globalBorders(rw),
      advancedClasses(rw)
    ]).toString(),
    nowPlaying: {
      wrapper: classnames([
        `flex items-center flex-wrap`,
        isCompact ? "flex-row text-left" : nowPlayingLayout,
        nowPlayingGap,
        nowPlayingPadding
      ]).toString(),
      artwork: classnames([
        "object-cover",
        isCompact ? "size-14 shrink-0" : nowPlayingArtworkSize,
        nowPlayingArtworkShadow,
        nowPlayingArtworkBorderRadius
      ]).toString(),
      content: isCompact ? "flex flex-1 min-w-0 items-center justify-between gap-4" : "",
      meta: isCompact ? "min-w-0" : "mb-4",
      title: classnames([
        `font-semibold font-body`,
        nowPlayingTitleTextColor,
        nowPlayingTitleFontSize,
        isCompact && "truncate"
      ]).toString(),
      artist: classnames([
        `font-body`,
        nowPlayingArtistTextColor,
        nowPlayingArtistFontSize,
        isCompact && "truncate"
      ]).toString(),
      time: classnames([
        "font-body tabular-nums shrink-0",
        playbackTimeColor,
        playbackTimeSize
      ]).toString(),
      progressRow: classnames([
        "flex items-center gap-3 w-full"
      ]).toString(),
      progressBar: {
        wrapper: classnames([
          nowPlayingProgressBarSize,
          nowPlayingProgressBarBgColor,
          `relative overflow-hidden flex-1 min-w-0 rounded-full cursor-pointer select-none`
        ]).toString(),
        foreground: classnames([
          "absolute top-0 left-0 rounded-full",
          nowPlayingProgressBarSize,
          nowPlayingProgressBarForegroundColor
        ]).toString(),
        thumb: classnames([
          nowPlayingProgressBarSize,
          nowPlayingProgressBarForegroundColor,
          "absolute top-0 aspect-square rounded-full"
        ]).toString()
      },
      volume: {
        wrapper: classnames([
          "flex items-center gap-2 shrink-0"
        ]).toString(),
        muteButton: classnames([
          iconVolumeColor,
          iconVolumeColorHover,
          iconVolumeSize,
          "focus:outline-none transition [&_svg]:size-full"
        ]).toString(),
        bar: classnames([
          volumeBarSize,
          volumeBarWidth,
          volumeBarBgColor,
          "relative overflow-hidden rounded-full cursor-pointer select-none"
        ]).toString(),
        fill: classnames([
          "absolute top-0 left-0 h-full rounded-full",
          volumeBarFgColor
        ]).toString()
      }
    },
    list: classnames([
      `flex flex-col overflow-y-auto`,
      !hasMultipleTracks && `hidden`,
      trackListMaxHeight,
      trackListPadding,
      trackListGap,
      trackDividersColor,
      trackDividersThickness
    ]).toString(),
    track: {
      wrapper: classnames([
        "group/track flex items-center cursor-pointer transition",
        trackItemGap,
        trackItemPadding,
        trackItemBorderRadius,
        trackBg,
        trackBgOpacity,
        trackBgHover,
        trackBgOpacityHover
      ]).toString(),
      artwork: classnames([
        trackListArtworkSize,
        trackListArtworkShadow,
        trackListArtworkBorderRadius
      ]).toString(),
      title: classnames([
        `font-body`,
        trackTitleTextColor,
        trackTitleTextColorHover,
        trackListTitleFontSize
      ]).toString(),
      artist: classnames([
        `font-body`,
        trackArtistTextColor,
        trackArtistTextColorHover,
        trackListArtistFontSize
      ]).toString(),
      duration: classnames([
        "font-body tabular-nums shrink-0",
        trackDurationColor,
        trackDurationSize
      ]).toString()
    },
    icons: {
      wrapper: `flex items-center justify-center ${iconSpacing}`,
      skip: `${iconSkipColor} ${iconSkipColorHover} ${iconSkipSize} focus:outline-none transition`,
      track: `${iconNextPrevColor} ${iconNextPrevColorHover} ${iconNextPrevSize} focus:outline-none transition`,
      playButton: ``,
      play: `${iconPlayPauseColor} ${iconPlayPauseColorHover} ${iconPlayPauseSize} transition`
    }
  };
  const rootArgs = {
    "x-data": "elementsAudioPlaylist()",
    "x-init": "init"
  };
  if (pauseOutOfView) {
    rootArgs["x-bind"] = "pauseWhenHidden";
  }
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: rootArgs
  });
  rw.setProps({
    id: rw.node.id,
    edit: mode === "edit",
    tracks,
    firstTrack,
    classes,
    hasMultipleTracks,
    showPlaybackTime: showPlaybackTime === true || showPlaybackTime === "true",
    showTrackDurations: showTrackDurations === true || showTrackDurations === "true",
    pauseWhenOutOfView: pauseOutOfView,
    initialVolume: Math.min(100, Math.max(0, parseFloat(initialVolume != null ? initialVolume : 100) || 0)),
    iconVolume: iconVolume || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`,
    iconMuted: iconMuted || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>`,
    iconPlay: iconPlay || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg>`,
    iconPause: iconPause || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path></svg>`,
    iconNext: iconNext || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path></svg>`,
    iconPrevious: iconPrevious || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"></path></svg>`,
    iconSkipBack: iconSkipBack || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 5V2.21c0-.45-.54-.67-.85-.35L7.35 5.65c-.2.2-.2.51 0 .71l3.79 3.79c.31.31.85.09.85-.35V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.06-.48-.48-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24.99-5.13-2.9-9.61-7.85-9.61zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z"></path></svg>`,
    iconSkipForward: iconSkipForward || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 13c-.5 0-.91.37-.98.86-.48 3.37-3.77 5.84-7.42 4.96-2.25-.54-3.91-2.27-4.39-4.53C5.32 10.42 8.27 7 12 7v2.79c0 .45.54.67.85.35l3.79-3.79c.2-.2.2-.51 0-.71l-3.79-3.79c-.31-.31-.85-.09-.85.36V5c-4.94 0-8.84 4.48-7.84 9.6.6 3.11 2.9 5.5 5.99 6.19 4.83 1.08 9.15-2.2 9.77-6.67.09-.59-.4-1.12-1-1.12zm-8.02 3v-4.27h-.09l-1.77.63v.69l1.01-.31V16zm3.42-4.22c-.18-.07-.37-.1-.59-.1s-.41.03-.59.1-.33.18-.45.33-.23.34-.29.57-.1.5-.1.82v.74c0 .32.04.6.11.82s.17.42.3.57.28.26.46.33.37.1.59.1.41-.03.59-.1.33-.18.45-.33.22-.34.29-.57.1-.5.1-.82v-.74c0-.32-.04-.6-.11-.82s-.17-.42-.3-.57-.29-.26-.46-.33zm.01 2.57c0 .19-.01.35-.04.48s-.06.24-.11.32-.11.14-.19.17-.16.05-.25.05-.18-.02-.25-.05-.14-.09-.19-.17-.09-.19-.12-.32-.04-.29-.04-.48v-.97c0-.19.01-.35.04-.48s.06-.23.12-.31.11-.14.19-.17.16-.05.25-.05.18.02.25.05.14.09.19.17.09.18.12.31.04.29.04.48v.97z"></path></svg>`
  });
};
exports.transformHook = transformHook;
