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
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
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
const OPAQUE_RASTER_FORMATS = /* @__PURE__ */ new Set(["jpeg", "jpg", "bmp"]);
const shapeMarginLength = (formatted) => {
  var _a, _b;
  const value = (_b = (_a = `${formatted || ""}`.match(/\[shape-margin:(.+?)\]/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim();
  if (!value) {
    return null;
  }
  if (value === "0") {
    return "0";
  }
  if (value === "px") {
    return "1px";
  }
  if (/[a-z%]$/i.test(value)) {
    return value;
  }
  const token = Number(value);
  if (!Number.isNaN(token)) {
    return `${token * 0.25}rem`;
  }
  return value;
};
const extensionOf = (url) => {
  var _a;
  return ((_a = `${url || ""}`.split(/[?#]/)[0].match(/\.([a-z0-9]+)$/i)) == null ? void 0 : _a[1]) || "";
};
const isOpaqueRaster = (media, isRasterImage) => {
  if (!isRasterImage) {
    return false;
  }
  return OPAQUE_RASTER_FORMATS.has(`${(media == null ? void 0 : media.format) || ""}`.toLowerCase());
};
const marginRawToken = (raw) => {
  if (raw == null || raw === "") {
    return null;
  }
  return `${raw}`.trim();
};
const marginTokenToClass = (side, rawValue) => {
  const value = marginRawToken(rawValue);
  if (!value) {
    return null;
  }
  if (value === "0") {
    return `${side}-0`;
  }
  if (value === "px") {
    return `${side}-[1px]`;
  }
  if (/[a-z%]$/i.test(value)) {
    return `${side}-[${value}]`;
  }
  const token = Number(value);
  if (!Number.isNaN(token)) {
    return `${side}-${value}`;
  }
  return `${side}-[${value}]`;
};
const resolveResponsiveValue = (breakpoints, values, bp, fallback) => {
  const index = breakpoints.indexOf(bp);
  for (let i = index; i >= 0; i--) {
    const value = values[breakpoints[i]];
    if (value !== void 0 && value !== null) {
      return value;
    }
  }
  return fallback;
};
const withBreakpointPrefix = (breakpoint, className) => {
  if (!className) {
    return "";
  }
  return breakpoint === "base" ? className : `${breakpoint}:${className}`;
};
const getFloatMarginClasses = (floatByBp, marginByBp, breakpointNames) => {
  const breakpoints = ["base", ...breakpointNames];
  const classes = [];
  let prevFloat = null;
  let prevMarginToken = null;
  const resolveFloat = (bp) => resolveResponsiveValue(breakpoints, floatByBp, bp, "left");
  const resolveMargin = (bp) => resolveResponsiveValue(breakpoints, marginByBp, bp, "4");
  for (const bp of breakpoints) {
    const float = resolveFloat(bp);
    const margin = resolveMargin(bp);
    const marginToken = marginRawToken(margin);
    if (bp !== "base" && float === prevFloat && marginToken === prevMarginToken) {
      continue;
    }
    const mbClass = marginTokenToClass("mb", margin);
    if (mbClass) {
      classes.push(withBreakpointPrefix(bp, mbClass));
    }
    if (float === "left") {
      const mrClass = marginTokenToClass("mr", margin);
      if (mrClass) {
        classes.push(withBreakpointPrefix(bp, mrClass));
      }
      if (prevFloat === "right") {
        classes.push(withBreakpointPrefix(bp, "ml-0"));
      }
    } else if (float === "right") {
      const mlClass = marginTokenToClass("ml", margin);
      if (mlClass) {
        classes.push(withBreakpointPrefix(bp, mlClass));
      }
      if (prevFloat === "left") {
        classes.push(withBreakpointPrefix(bp, "mr-0"));
      }
    } else {
      if (prevFloat === "left") {
        classes.push(withBreakpointPrefix(bp, "mr-0"));
      }
      if (prevFloat === "right") {
        classes.push(withBreakpointPrefix(bp, "ml-0"));
      }
    }
    prevFloat = float;
    prevMarginToken = marginToken;
  }
  return classes.filter(Boolean).join(" ");
};
const marginByBreakpointFromFormatted = (formatted) => {
  const values = {};
  for (const [, bp, value] of `${formatted || ""}`.matchAll(/(?:([a-z0-9]+):)?\[shape-margin:([^\]]+)\]/g)) {
    values[bp || "base"] = value.trim();
  }
  return values;
};
const isInlineSvgMarkup = (value) => {
  return typeof value === "string" && value.includes("<svg");
};
const prepareSvgForShape = (svgString) => {
  if (!isInlineSvgMarkup(svgString)) {
    return svgString || "";
  }
  let cleaned = svgString.trim();
  if (!/\sxmlns=/.test(cleaned)) {
    cleaned = cleaned.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/);
  const hasWidth = /\swidth="/.test(cleaned);
  const hasHeight = /\sheight="/.test(cleaned);
  if (viewBoxMatch && (!hasWidth || !hasHeight)) {
    const [, , , width, height] = viewBoxMatch[1].trim().split(/\s+/);
    if (!hasWidth && width) {
      cleaned = cleaned.replace(/<svg/, `<svg width="${width}"`);
    }
    if (!hasHeight && height) {
      cleaned = cleaned.replace(/<svg/, `<svg height="${height}"`);
    }
  }
  return cleaned;
};
const svgShapeUrl = (image) => {
  if (!image) {
    return "";
  }
  if (!isInlineSvgMarkup(image)) {
    return image;
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(prepareSvgForShape(image))}`;
};
const transformHook = (rw) => {
  var _a;
  const {
    globalID,
    media,
    mediaType,
    mediaCustomSource,
    mediaCmsField,
    mediaAlt,
    mediaFloat,
    mediaWidth,
    shapeMargin,
    shapeImageThreshold
  } = rw.props;
  const { id } = rw.node;
  const { sharedAssetPath } = rw.component;
  const edit = rw.project.mode === "edit";
  const type = mediaType || "resource";
  const isResourceMedia = type === "resource";
  const isCustomMedia = type === "custom";
  const isCmsMedia = type === "cms";
  const cmsPlaceholder = `${sharedAssetPath}/images/image-square.png`;
  const externalSrc = isCustomMedia ? `${mediaCustomSource || ""}`.trim() : isCmsMedia ? edit ? cmsPlaceholder : `${mediaCmsField || ""}`.trim() : "";
  const hasMedia = isResourceMedia ? !!media : !!externalSrc;
  const isYouTube = isResourceMedia && (media == null ? void 0 : media.format) === "youtube";
  const isVimeo = isResourceMedia && (media == null ? void 0 : media.format) === "vimeo";
  const isMP4 = isResourceMedia && (media == null ? void 0 : media.format) === "mp4";
  const isEmbed = isYouTube || isVimeo;
  const isSvg = isResourceMedia && (media == null ? void 0 : media.format) === "svg";
  const isRasterImage = hasMedia && !isMP4 && !isEmbed && !isSvg;
  const isImage = isRasterImage || isSvg;
  const opaqueRaster = isResourceMedia ? isOpaqueRaster(media, isRasterImage) : isCustomMedia ? OPAQUE_RASTER_FORMATS.has(extensionOf(externalSrc).toLowerCase()) : isCmsMedia && edit;
  const svgImageUrl = isSvg && (media == null ? void 0 : media.image) ? svgShapeUrl(media.image) : "";
  const styles = [];
  const shapeSourceUrl = isResourceMedia ? isSvg ? svgImageUrl : media == null ? void 0 : media.image : externalSrc;
  if (isImage && shapeSourceUrl && !opaqueRaster) {
    const threshold = (Number(shapeImageThreshold) || 0) / 100;
    const cacheKey = shapeSourceUrl.includes("#") ? `-rwt${threshold}` : `#rwt=${threshold}`;
    styles.push(`shape-outside: url('${shapeSourceUrl}${cacheKey}')`);
    styles.push(`shape-image-threshold: ${threshold}`);
  }
  const shapeMarginValue = shapeMarginLength(shapeMargin);
  if (styles.length > 0 && shapeMarginValue) {
    styles.push(`shape-margin: ${shapeMarginValue}`);
  }
  const mediaStyle = styles.length > 0 ? `${styles.join("; ")};` : "";
  const floatClasses = [mediaFloat, mediaWidth];
  const { mediaFloat: floatByBp } = rw.responsiveProps || {};
  const { names: breakpointNames = [] } = ((_a = rw.theme) == null ? void 0 : _a.breakpoints) || {};
  const floatMarginClasses = getFloatMarginClasses(
    floatByBp || {},
    marginByBreakpointFromFormatted(shapeMargin),
    breakpointNames
  );
  const classes = {
    wrapper: classnames([
      `group/${id} group/shapes`,
      globalID && `group/${globalID}`,
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      advancedClasses(rw)
    ]).toString(),
    shape: classnames([
      "block w-full flow-root",
      globalTransitions(rw)
    ]).toString(),
    media: classnames([
      ...floatClasses,
      floatMarginClasses,
      "h-auto max-w-full"
    ]).toString(),
    embedFrame: classnames([
      ...floatClasses,
      floatMarginClasses,
      "aspect-video"
    ]).toString()
  };
  const embedUrl = isYouTube ? `https://www.youtube.com/embed/${media == null ? void 0 : media.videoId}` : isVimeo ? `https://player.vimeo.com/video/${media == null ? void 0 : media.videoId}` : "";
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      id: globalID,
      ...isResourceMedia ? { rwResourceDropZone: "media" } : {}
    }
  });
  if ((globalID || "").length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    classes,
    hasMedia,
    isImage,
    isRasterImage,
    isSvg,
    isMP4,
    isEmbed,
    embedUrl,
    mediaSrc: isMP4 ? media == null ? void 0 : media.path : isRasterImage ? isResourceMedia ? media == null ? void 0 : media.image : externalSrc : "",
    svgImageUrl,
    mediaAlt: (media == null ? void 0 : media.alt) || mediaAlt || "",
    mediaStyle,
    edit,
    showDropZone: edit && isResourceMedia && !hasMedia
  });
};
exports.transformHook = transformHook;
