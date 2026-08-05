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
const escapeBgImageFetchPriorityAttribute = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&#39;");
const globalBgImageFetchPriority = (rw) => {
  const {
    globalControlTypeBg,
    globalBgImageFetchPriority: globalBgImageFetchPriority2,
    globalBgType,
    globalBgImageResource,
    globalBgImageResourceEnd
  } = rw.props;
  if (globalControlTypeBg == "none" || globalBgType != "image") {
    return {
      globalBgImageFetchPriorityEnabled: false,
      globalBgImageFetchPriorityLinkElement: "",
      globalBgImageFetchPriorityLinkElementEnd: ""
    };
  }
  const globalBgImageFetchPriorityEnabled = globalBgImageFetchPriority2 != "auto";
  let globalBgImageFetchPriorityLinkElement = "";
  if (globalBgImageResource == null ? void 0 : globalBgImageResource.image) {
    globalBgImageFetchPriorityLinkElement = `<link rel='preload' href='${escapeBgImageFetchPriorityAttribute(globalBgImageResource.image)}' as='image' fetchpriority='${escapeBgImageFetchPriorityAttribute(globalBgImageFetchPriority2)}' />`;
  }
  let globalBgImageFetchPriorityLinkElementEnd = "";
  if (globalControlTypeBg == "hover" && (globalBgImageResourceEnd == null ? void 0 : globalBgImageResourceEnd.image)) {
    globalBgImageFetchPriorityLinkElementEnd = `<link rel='preload' href='${escapeBgImageFetchPriorityAttribute(globalBgImageResourceEnd.image)}' as='image' fetchpriority='${escapeBgImageFetchPriorityAttribute(globalBgImageFetchPriority2)}' />`;
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
const switchToBool = (value) => {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === "string") {
    const base = value.trim().split(/\s+/)[0];
    if (base === "true") return true;
    if (base === "false") return false;
  }
  return void 0;
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
  const { globalID, width, height } = rw.props;
  const {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  } = globalBgImageFetchPriority(rw);
  const classes = classnames([
    width,
    height,
    globalSpacing(rw),
    globalBackground(rw),
    globalBorders(rw),
    advancedClasses(rw)
  ]).toString();
  rw.setRootElement({
    as: globalHTMLTag(rw, "div"),
    class: classes,
    args: {
      role: "separator",
      "aria-orientation": "horizontal",
      id: globalID
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    classes,
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  });
};
exports.transformHook = transformHook;
