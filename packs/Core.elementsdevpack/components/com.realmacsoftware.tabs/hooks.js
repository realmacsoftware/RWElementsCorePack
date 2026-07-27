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
  if (viaEnabled == "true") {
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
    if (viaEnabledEnd == "true") {
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
  const classes = classnames().add([
    `bg-[url(${resource == null ? void 0 : resource.image})]`,
    size,
    repeat,
    position
  ]);
  if (controlType == "hover") {
    if (wantsPeer) {
      classes.add([
        `peer-hover:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
        sizeEnd.replace(/hover:/g, "peer-hover:"),
        repeatEnd.replace(/hover:/g, "peer-hover:"),
        positionEnd.replace(/hover:/g, "peer-hover:")
      ]);
    } else if (hasPrefix) {
      classes.add([
        prefixCallback(`bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`, args.prefix),
        prefixCallback(sizeEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(repeatEnd.replace(/hover:/g, ""), args.prefix),
        prefixCallback(positionEnd.replace(/hover:/g, ""), args.prefix)
      ]);
    } else {
      classes.add([
        `hover:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
        sizeEnd,
        repeatEnd,
        positionEnd
      ]);
    }
    if (wantsActive) {
      classes.add([
        `data-[active=true]:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
        sizeEnd.replace(/hover:/g, "data-[active=true]:"),
        repeatEnd.replace(/hover:/g, "data-[active=true]:"),
        positionEnd.replace(/hover:/g, "data-[active=true]:")
      ]);
    }
    if (wantsFocus) {
      classes.add([
        `focus:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
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
  return classString.split(/\s+/).map((cls) => {
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
      wantsBlur ? `${prefix}:${blurEnd}` : "",
      `${prefix}:${brightnessEnd}`,
      `${prefix}:${dropShadowEnd}`,
      `${prefix}:${saturateEnd}`,
      wantsBackdropBlur ? `${prefix}:${backdropBlurEnd}` : ""
    );
    if (wantsActive) {
      classes.push(
        `data-[active=true]:${blurEnd}`,
        `data-[active=true]:${brightnessEnd}`,
        `data-[active=true]:${dropShadowEnd}`,
        `data-[active=true]:${saturateEnd}`,
        `data-[active=true]:${backdropBlurEnd}`
      );
    }
    if (wantsFocus) {
      classes.push(
        `${prefix.replace(/hover/g, "focus")}:${blurEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${brightnessEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${dropShadowEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${saturateEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${backdropBlurEnd}`
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
  if (minMaxEnabled == "true") {
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
  if (enabled == "false") {
    return false;
  }
  return classnames([margin, padding]).toString();
};
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
  if (type != "none") {
    classes.add([
      "transform",
      origin,
      scale,
      rotate,
      skewX,
      skewY,
      translateX,
      translateY
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(scaleEnd, prefix),
      addPrefixToTailwindClasses(rotateEnd, prefix),
      addPrefixToTailwindClasses(skewXEnd, prefix),
      addPrefixToTailwindClasses(skewYEnd, prefix),
      addPrefixToTailwindClasses(translateXEnd, prefix),
      addPrefixToTailwindClasses(translateYEnd, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        `data-[active=true]:${scaleEnd}`,
        `data-[active=true]:${rotateEnd}`,
        `data-[active=true]:${skewXEnd}`,
        `data-[active=true]:${skewYEnd}`,
        `data-[active=true]:${translateXEnd}`,
        `data-[active=true]:${translateYEnd}`
      ]);
    }
    if (wantsFocus) {
      classes.add([
        `${prefix.replace(/hover/g, "focus")}:${scaleEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${rotateEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${skewXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${skewYEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateYEnd}`
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
    // `transform-gpu will-change-transform`,
    property === "transition-default" ? "transition" : property,
    duration,
    delay,
    timingFunction === "custom" ? customTimingFunctionFormatted : timingFunction
  ]).toString() : "";
};
const transformHook = (rw) => {
  const {
    globalID,
    defaultActiveTab,
    editorActiveTab,
    tabListAlignment,
    tabListGap,
    tabListPadding,
    tabListBackground,
    tabListBorderRadius,
    tabButtonBackground,
    tabButtonTextColor,
    tabButtonBackgroundActive,
    tabButtonTextColorActive,
    tabButtonBackgroundHover,
    tabButtonTextColorHover,
    tabButtonShadow,
    tabButtonShadowActive,
    tabButtonShadowHover,
    tabButtonBorderWidth,
    tabButtonBorderWidthActive,
    tabButtonBorderWidthHover,
    tabButtonBorderColor,
    tabButtonBorderColorActive,
    tabButtonBorderColorHover,
    tabButtonPadding,
    tabButtonBorderRadius,
    tabButtonBorderRadiusActive,
    tabButtonBorderRadiusHover,
    // Title styling
    tabTitleFont,
    // Font size per state
    tabTitleFontSize,
    tabTitleFontSizeActive,
    tabTitleFontSizeHover,
    // Font weight per state
    tabTitleFontWeight,
    tabTitleFontWeightActive,
    tabTitleFontWeightHover,
    // Letter spacing per state
    tabTitleLetterSpacing,
    tabTitleLetterSpacingActive,
    tabTitleLetterSpacingHover,
    // Line height per state
    tabTitleLineHeight,
    tabTitleLineHeightActive,
    tabTitleLineHeightHover,
    // Underline per state
    tabTitleUnderline,
    tabTitleUnderlineActive,
    tabTitleUnderlineHover,
    // Icon styling
    showIcon,
    iconPosition,
    iconGap,
    // Strip attributes
    iconStripSize,
    iconStripFill,
    iconStripStroke,
    iconStripStyles,
    // Icon size
    iconSize,
    iconSizeActive,
    iconSizeHover,
    // Icon fill
    iconFillColor,
    iconFillOpacity,
    iconFillColorActive,
    iconFillOpacityActive,
    iconFillColorHover,
    iconFillOpacityHover,
    // Icon stroke
    iconStrokeColor,
    iconStrokeOpacity,
    iconStrokeWidth,
    iconStrokeColorActive,
    iconStrokeOpacityActive,
    iconStrokeWidthActive,
    iconStrokeColorHover,
    iconStrokeOpacityHover,
    iconStrokeWidthHover,
    // Content
    tabContentPadding,
    tabContentBackground,
    tabContentBorderWidth,
    tabContentBorderColor,
    tabContentBorderRadius,
    // Top content (above)
    showAboveContent,
    topContentPadding,
    topContentBackground,
    topContentBorderWidth,
    topContentBorderColor,
    topContentBorderRadius
  } = rw.props;
  const { mode } = rw.project;
  const { id } = rw.node;
  const { tabs } = rw.collections;
  const edit = mode === "edit";
  const activeTabIndex = edit ? Math.max(0, Math.min((parseInt(editorActiveTab) || 1) - 1, ((tabs == null ? void 0 : tabs.length) || 1) - 1)) : Math.max(0, Math.min((parseInt(defaultActiveTab) || 1) - 1, ((tabs == null ? void 0 : tabs.length) || 1) - 1));
  const wantsIcon = showIcon;
  const iconPositionClass = {
    left: "flex-row",
    right: "flex-row-reverse",
    top: "flex-col items-center"
  }[iconPosition] || "flex-row";
  const tabButtonBase = classnames([
    "group/tab-button flex items-center cursor-pointer transition-all",
    wantsIcon ? iconPositionClass : "items-center",
    wantsIcon && iconGap,
    tabButtonPadding,
    tabButtonBackgroundHover,
    tabButtonTextColorHover,
    tabButtonShadowHover,
    tabButtonBorderWidthHover,
    tabButtonBorderColorHover,
    tabButtonBorderRadiusHover
  ]).toString();
  const tabButtonInactiveClasses = classnames([
    tabButtonBackground,
    tabButtonTextColor,
    tabButtonShadow,
    tabButtonBorderWidth,
    tabButtonBorderColor,
    tabButtonBorderRadius
  ]).toString();
  const tabButtonActiveClasses = classnames([
    tabButtonBackgroundActive,
    tabButtonTextColorActive,
    tabButtonShadowActive,
    tabButtonBorderWidthActive,
    tabButtonBorderColorActive,
    tabButtonBorderRadiusActive
  ]).toString();
  const titleBaseClasses = classnames([
    tabTitleFont,
    tabTitleFontSizeHover,
    tabTitleFontWeightHover,
    tabTitleLetterSpacingHover,
    tabTitleLineHeightHover,
    tabTitleUnderlineHover
  ]).toString();
  const titleInactiveClasses = classnames([
    tabTitleFontSize,
    tabTitleFontWeight,
    tabTitleLetterSpacing,
    tabTitleLineHeight,
    tabTitleUnderline
  ]).toString();
  const titleActiveClasses = classnames([
    tabTitleFontSizeActive,
    tabTitleFontWeightActive,
    tabTitleLetterSpacingActive,
    tabTitleLineHeightActive,
    tabTitleUnderlineActive
  ]).toString();
  const iconBaseClasses = classnames([
    "[&_svg]:shrink-0 [&_svg]:transition-all",
    iconSizeHover,
    iconFillColorHover,
    iconFillOpacityHover,
    iconStrokeColorHover,
    iconStrokeOpacityHover,
    iconStrokeWidthHover
  ]).toString();
  const iconInactiveClasses = classnames([
    iconSize,
    iconFillColor,
    iconFillOpacity,
    iconStrokeColor,
    iconStrokeOpacity,
    iconStrokeWidth
  ]).toString();
  const iconActiveClasses = classnames([
    iconSizeActive,
    iconFillColorActive,
    iconFillOpacityActive,
    iconStrokeColorActive,
    iconStrokeOpacityActive,
    iconStrokeWidthActive
  ]).toString();
  const stripSvgAttributes = (svg) => {
    if (!svg || typeof svg !== "string") return svg;
    let result = svg;
    if (iconStripSize === "true") {
      result = result.replace(/\s*(width|height)="[^"]*"/gi, "");
    }
    if (iconStripFill === "true") {
      result = result.replace(/\s*fill="[^"]*"/gi, "");
    }
    if (iconStripStroke === "true") {
      result = result.replace(/\s*stroke="[^"]*"/gi, "");
    }
    if (iconStripStyles === "true") {
      result = result.replace(/\s*style="[^"]*"/gi, "");
    }
    return result;
  };
  const tabItems = (tabs == null ? void 0 : tabs.map((tab, index) => {
    const isActive = index === activeTabIndex;
    const buttonStateClass = isActive ? tabButtonActiveClasses : tabButtonInactiveClasses;
    const titleStateClass = isActive ? titleActiveClasses : titleInactiveClasses;
    const iconStateClass = isActive ? iconActiveClasses : iconInactiveClasses;
    const hasIcon = tab.icon && tab.icon.format === "svg";
    const processedIcon = hasIcon ? stripSvgAttributes(tab.icon.image) : null;
    return {
      id: `tab-${id}-${index}`,
      title: tab.title || `Tab ${index + 1}`,
      icon: processedIcon,
      hasIcon,
      showIcon: wantsIcon && hasIcon,
      index,
      isActive,
      // In edit mode: base + state. In runtime: base only (Alpine controls state)
      buttonClass: edit ? `${tabButtonBase} ${buttonStateClass}` : tabButtonBase,
      titleClass: edit ? `${titleBaseClasses} ${titleStateClass}` : titleBaseClasses,
      iconClass: edit ? `${iconBaseClasses} ${iconStateClass}` : iconBaseClasses,
      // Pre-computed for template: hide panel in editor if not active
      hideInEditor: edit && !isActive
    };
  })) || [];
  const tabListAlignmentClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end"
  }[tabListAlignment] || "justify-start";
  const classes = {
    wrapper: classnames([
      `group/${id}`,
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      globalTransitions(rw),
      globalEffects(rw),
      globalFilters(rw),
      globalTransforms(rw),
      globalBackground(rw),
      globalBorders(rw),
      advancedClasses(rw)
    ]).toString(),
    tabList: classnames([
      "flex flex-row flex-wrap",
      tabListAlignmentClass,
      tabListGap,
      tabListPadding,
      tabListBackground,
      tabListBorderRadius
    ]).toString(),
    tabButtonBase,
    tabButtonInactive: tabButtonInactiveClasses,
    tabButtonActive: tabButtonActiveClasses,
    titleBase: titleBaseClasses,
    titleInactive: titleInactiveClasses,
    titleActive: titleActiveClasses,
    iconBase: iconBaseClasses,
    iconInactive: iconInactiveClasses,
    iconActive: iconActiveClasses,
    tabPanelsWrapper: classnames([
      "grid [&>*]:col-start-1 [&>*]:row-start-1 overflow-hidden",
      tabContentBorderRadius
    ]).toString(),
    tabPanel: classnames([
      tabContentPadding,
      tabContentBackground,
      tabContentBorderWidth,
      tabContentBorderColor
    ]).toString(),
    abovePanelsWrapper: classnames([
      "grid [&>*]:col-start-1 [&>*]:row-start-1 overflow-hidden",
      topContentBorderRadius
    ]).toString(),
    abovePanel: classnames([
      topContentPadding,
      topContentBackground,
      topContentBorderWidth,
      topContentBorderColor
    ]).toString()
  };
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      "x-data": `elementsTabs('${id}', ${activeTabIndex})`,
      id: globalID || id
    }
  });
  if (globalID && globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    id,
    classes,
    tabItems,
    edit,
    editorActiveTabIndex: activeTabIndex,
    showAboveContent: showAboveContent === true || showAboveContent === "true"
  });
};
exports.transformHook = transformHook;
