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
const globalBgImageFetchPriority = (rw) => {
  const {
    globalBgImageFetchPriority: globalBgImageFetchPriority2,
    globalBgType,
    globalBgImageResource,
    globalBgImageResourceEnd
  } = rw.props;
  if (globalBgType != "image") {
    return {
      wantsFetchPriority: false,
      linkElement: "",
      linkElementEnd: ""
    };
  }
  const globalBgImageFetchPriorityEnabled = globalBgImageFetchPriority2 != "auto";
  let globalBgImageFetchPriorityLinkElement = "";
  if (globalBgImageResource == null ? void 0 : globalBgImageResource.image) {
    globalBgImageFetchPriorityLinkElement = `<link rel='preload' href='${globalBgImageResource == null ? void 0 : globalBgImageResource.image}' as='image' fetchpriority='${globalBgImageFetchPriority2}' />`;
  }
  let globalBgImageFetchPriorityLinkElementEnd = "";
  if (globalBgImageResourceEnd == null ? void 0 : globalBgImageResourceEnd.image) {
    globalBgImageFetchPriorityLinkElementEnd = `<link rel='preload' href='${globalBgImageResourceEnd == null ? void 0 : globalBgImageResourceEnd.image}' as='image' fetchpriority='${globalBgImageFetchPriority2}' />`;
  }
  return {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  };
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
const injectPrefixOnDarkModeColors = (prefix, classes) => {
  return classes.replace(/dark:(.*)/g, `dark:${prefix}:$1`);
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
const globalOverlayColor = (app, prefix) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayColor: color,
    globalOverlayColorOpacity: opacity,
    globalOverlayColorEnd: colorEnd,
    globalOverlayColorOpacityEnd: opacityEnd
  } = app.props;
  const classes = classnames([color, opacity]);
  if (controlType == "hover") {
    classes.add([
      injectPrefixOnDarkModeColors(prefix, `${prefix}:${colorEnd}`),
      `${prefix}:${opacityEnd}`
    ]);
  }
  return classes.toString();
};
const globalOverlayGradient = (app, prefix) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayGradientType: gradientType,
    globalOverlayGradientDirection: direction,
    globalOverlayGradientRadialPosition: radialPosition,
    globalOverlayGradientConicAngle: conicAngle,
    globalOverlayGradientInterpolation: interpolation,
    globalOverlayGradientTypeEnd: gradientTypeEnd,
    globalOverlayGradientDirectionEnd: directionEnd,
    globalOverlayGradientRadialPositionEnd: radialPositionEnd,
    globalOverlayGradientConicAngleEnd: conicAngleEnd,
    globalOverlayGradientInterpolationEnd: interpolationEnd,
    globalOverlayGradientFromColor: fromColor,
    globalOverlayGradientFromOpacity: fromOpacity,
    globalOverlayGradientFromPosition: fromPosition,
    globalOverlayGradientViaEnabled: viaEnabled,
    globalOverlayGradientViaColor: viaColor,
    globalOverlayGradientViaOpacity: viaOpacity,
    globalOverlayGradientViaPosition: viaPosition,
    globalOverlayGradientToColor: toColor,
    globalOverlayGradientToOpacity: toOpacity,
    globalOverlayGradientToPosition: toPosition,
    globalOverlayGradientFromColorEnd: fromColorEnd,
    globalOverlayGradientFromOpacityEnd: fromOpacityEnd,
    globalOverlayGradientFromPositionEnd: fromPositionEnd,
    globalOverlayGradientViaEnabledEnd: viaEnabledEnd,
    globalOverlayGradientViaColorEnd: viaColorEnd,
    globalOverlayGradientViaOpacityEnd: viaOpacityEnd,
    globalOverlayGradientViaPositionEnd: viaPositionEnd,
    globalOverlayGradientToColorEnd: toColorEnd,
    globalOverlayGradientToOpacityEnd: toOpacityEnd,
    globalOverlayGradientToPositionEnd: toPositionEnd
  } = app.props;
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
    `${fromColor}/${fromOpacity}`,
    fromPosition,
    `${toColor}/${toOpacity}`,
    toPosition
  ]);
  if (viaEnabled == "true") {
    classes.add([
      `${viaColor}/${viaOpacity}`,
      viaPosition
    ]);
  }
  if (controlType == "hover") {
    classes.add([
      `${prefix}:${directionEndClass}`,
      `${prefix}:${fromColorEnd}/${fromOpacityEnd}`,
      `${prefix}:${fromPositionEnd}`,
      `${prefix}:${toColorEnd}/${toOpacityEnd}`,
      `${prefix}:${toPositionEnd}`
    ]);
    if (viaEnabledEnd == "true") {
      classes.add([
        `${prefix}:${viaColorEnd}/${viaOpacityEnd}`,
        `${prefix}:${viaPositionEnd}`
      ]);
    }
  }
  return classes.toString();
};
const globalOverlayImage = (app, prefix) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayImageResource: resource,
    globalOverlayImagePositionX: x,
    globalOverlayImagePositionY: y,
    globalOverlayImageSize: size,
    globalOverlayImageRepeat: repeat,
    globalOverlayImageResourceEnd: resourceEnd,
    globalOverlayImagePositionXEnd: xEnd,
    globalOverlayImagePositionYEnd: yEnd,
    globalOverlayImageSizeEnd: sizeEnd,
    globalOverlayImageRepeatEnd: repeatEnd
  } = app.props;
  const bgPosition = (horizontal, vertical) => {
    const mappings = {
      "center-top": "bg-top",
      "center-bottom": "bg-bottom",
      "left-center": "bg-left",
      "right-center": "bg-right",
      "center-center": "bg-center"
    };
    const key = `${horizontal}-${vertical}`;
    return mappings[key] || `bg-${key}`;
  };
  const classes = classnames().add([
    `bg-[url(${app.getResource(resource, 1200)})]`,
    size,
    repeat,
    bgPosition(x, y)
  ]);
  if (controlType == "hover") {
    classes.add([
      `${prefix}:bg-[url(${app.getResource(resourceEnd, 1200)})]`,
      `${prefix}:${sizeEnd}`,
      `${prefix}:${repeatEnd}`,
      `${prefix}:${bgPosition(xEnd, yEnd)}`
    ]);
  }
  return classes.toString();
};
const globalOverlay = (app, isContainer = false) => {
  const { globalControlTypeOverlay: controlType, globalOverlayType: type } = app.props;
  const { node } = app;
  node.isContainer = isContainer;
  const prefix = getHoverPrefix(node, "background", "self");
  if (controlType == "none") {
    return "";
  }
  switch (type) {
    case "color":
      return globalOverlayColor(app, prefix);
    case "gradient":
      return globalOverlayGradient(app, prefix);
    case "image":
      return globalOverlayImage(app, prefix);
    case "none":
      return "";
    default:
      console.error("Invalid background type:", type);
      return "";
  }
};
const globalFilter = (rw) => {
  const {
    globalFilterEnable: wantsFilter,
    globalFilterGroup: group,
    globalFilterCustomGroupId: groupId,
    globalFilterTransition: transition = null
  } = rw.props;
  const { parent } = rw.node;
  const filterGroupId = group == "parent" ? parent.id : groupId;
  return {
    wantsFilter,
    filterGroupId,
    transition,
    args: wantsFilter ? {
      "data-filter-group": filterGroupId,
      "data-filter-transition": transition
    } : {}
  };
};
const globalLink = (app) => {
  var _a;
  const { globalLink: link = null } = app.props;
  const hasLink = typeof link === "object" && Object.keys(link).length > 0 && link.href.length > 0;
  let linkAttributes = {
    hasLink,
    args: {}
  };
  if (!hasLink) return linkAttributes;
  const { href, title, target } = link;
  const attrs = (_a = link.attributes) == null ? void 0 : _a.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
  linkAttributes.args = {
    ...attrs,
    href,
    title,
    target
  };
  return linkAttributes;
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
  if (minMaxEnabled == "true") {
    classes.add([minWidth, minHeight, maxWidth, maxHeight]);
  }
  return classes.toString();
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
    globalSpacingEnabled: spacingEnabled,
    globalMargin: margin,
    globalPadding: padding,
    globalControlTypeBorders,
    globalBordersRadius,
    globalBgType,
    globalBgVideo,
    globalBgVideoAspectRatio,
    globalEffectsApplyTo,
    globalFiltersApplyTo,
    globalTransformsApplyTo,
    contentWidthType,
    contentWidthTheme,
    contentHeightType,
    contentHeightTheme,
    contentAlignSelf,
    contentJustifySelf,
    contentGap,
    globalControlTypeOverlay
  } = rw.props;
  const { mode } = rw.project;
  const { id } = rw.node;
  const { tags, attributes } = rw.collections;
  const dataTags = (tags == null ? void 0 : tags.map((tag) => tag.title).join(",")) || "";
  const customAttributes = (attributes == null ? void 0 : attributes.reduce((acc, { attribute, value }) => {
    if (attribute) acc[attribute] = value || "";
    return acc;
  }, {})) || {};
  const link = globalLink(rw);
  const filter = globalFilter(rw);
  const {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  } = globalBgImageFetchPriority(rw);
  const bgVideo = globalBgType == "video" && globalBgVideo ? {
    isYoutube: globalBgVideo.format == "youtube",
    isVimeo: globalBgVideo.format == "vimeo",
    isMP4: globalBgVideo.format == "mp4",
    video: globalBgVideo
  } : false;
  const contentWidthProps = {
    props: {
      ...rw.props,
      globalWidthType: contentWidthType,
      globalWidth: contentWidthTheme,
      globalHeightType: contentHeightType,
      globalHeight: contentHeightTheme,
      globalSizingMinMaxEnabled: false,
      globalMinWidth: false,
      globalMaxWidth: false,
      globalMinHeight: false,
      globalMaxHeight: false
    },
    ...rw.props
  };
  const classes = {
    wrapper: classnames([
      id,
      `group/container group/${id} grid-cols-1 [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0`,
      globalID && `group/${globalID}`,
      globalActAsGridOrFlexItem(rw),
      globalLayout(rw, { defaultDisplay: "grid" }),
      globalSizingContainer(rw),
      globalTransitions(rw),
      globalEffectsApplyTo === "everything" && globalEffects(rw, { isContainer: true }),
      globalTransformsApplyTo === "everything" && globalTransforms(rw, { isContainer: true }),
      globalFiltersApplyTo === "everything" && globalFilters(rw, { isContainer: true }),
      spacingEnabled == "true" && margin,
      globalControlTypeBorders != "none" && globalBordersRadius,
      advancedClasses(rw),
      globalBgType == "video" && globalBgVideo && globalBgVideoAspectRatio && "aspect-video"
    ]).toString(),
    background: classnames([
      `z-0 transform-gpu`,
      globalTransitions(rw),
      globalBorders(rw, { isContainer: true }),
      globalEffectsApplyTo === "background" && globalEffects(rw, { isContainer: true }),
      globalTransformsApplyTo === "background" && globalTransforms(rw, { isContainer: true }),
      globalFiltersApplyTo === "background" && globalFilters(rw, { isContainer: true }),
      globalBackground(rw, { peer: true }),
      globalBackground(rw),
      `overflow-hidden`
    ]).toString(),
    content: classnames([
      `relative z-30 flex flex-col peer`,
      globalTransitions(rw),
      globalEffectsApplyTo === "content" && globalEffects(rw, { isContainer: true }),
      globalTransformsApplyTo === "content" && globalTransforms(rw, { isContainer: true }),
      globalFiltersApplyTo === "content" && globalFilters(rw, { isContainer: true }),
      globalSizingContainer(contentWidthProps),
      contentAlignSelf,
      contentJustifySelf,
      contentGap,
      spacingEnabled == "true" && padding
    ]).toString(),
    overlay: `relative z-20 ${globalControlTypeBorders != "none" && globalBordersRadius} ${globalTransitions(rw)} ${globalOverlay(rw, { isContainer: true })}`
  };
  rw.setRootElement({
    as: link.hasLink ? "a" : globalHTMLTag(rw, "div"),
    class: classes.wrapper,
    args: {
      id: globalID,
      ...link.args,
      ...filter.args,
      "data-filter-tags": dataTags,
      ...customAttributes
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    id: rw.node.id,
    classes,
    edit: mode === "edit",
    wantsOverlay: globalControlTypeOverlay != "none",
    bgVideo,
    hasBgVideo: bgVideo ? true : false,
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  });
};
exports.transformHook = transformHook;
