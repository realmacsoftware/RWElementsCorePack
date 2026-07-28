// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
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
const aspectRatioClasses = (rw) => {
  const { aspectRatio, aspectRatioCustom } = rw.props;
  const aspectRatioClasses2 = {
    "aspect-[auto]": rw.component.title == "Video" ? "aspect-video" : "aspect-[auto]",
    "aspect-[custom]": aspectRatioCustom
  };
  return classnames().add(aspectRatioClasses2[aspectRatio] || aspectRatio).toString();
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
const objectClasses = (rw) => {
  const { aspectRatio, objectFit, objectPosition } = rw.props;
  return classnames([
    aspectRatio !== "aspect-[auto]" ? objectFit : "",
    objectPosition
  ]).toString();
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
    image: thumbnail,
    imageDark: thumbnailDark,
    imageAlt: thumbnailAlt,
    wantsLightbox,
    videoLightboxColor,
    videoLightboxColorOpacity,
    videoLightboxGlobalFiltersBackdropBlur,
    overlayColor,
    overlayOpacity,
    video,
    autoplay,
    loop,
    mute: muted,
    controls,
    startAt,
    globalPadding
  } = rw.props;
  const { id } = rw.node;
  const { assetPath } = rw.component;
  const hasThumbnail = thumbnail;
  const hasDarkThumbnail = thumbnailDark;
  const options = {
    autoplay,
    loop,
    muted,
    controls,
    wantsLightbox,
    startAt: startAt || 0
  };
  if ((video == null ? void 0 : video.format) == "mp4") {
    video.image = `${assetPath}/video-placeholder.png`;
  }
  const finalVideo = video || {
    format: "youtube",
    videoId: "r52932MBAYw",
    options,
    image: `${assetPath}/video-placeholder.png`
  };
  const wrapperClasses = classnames([
    `group/${id} group/video relative`,
    rw.props.aspectRatio == "aspect-[auto]" ? `aspect-video` : aspectRatioClasses(rw),
    advancedClasses(rw),
    globalLayout(rw),
    globalSizing(rw),
    globalSpacing(rw),
    globalTransitions(rw),
    globalEffects(rw),
    globalTransforms(rw),
    globalFilters(rw),
    globalBorders(rw)
  ]).toString();
  const videoClasses = classnames([
    `aspect-video w-full h-auto`,
    objectClasses(rw),
    globalPadding
  ]).toString();
  const videoLightboxClasses = classnames([
    `aspect-video w-[min(95vw,calc(95vh*16/9))] max-w-[1920px] max-h-[95vh]`,
    objectClasses(rw),
    globalPadding
  ]).toString();
  const posterClasess = classnames([
    `absolute inset-0 z-0 cursor-pointer w-full h-full`,
    globalPadding,
    !video ? "object-cover" : "",
    objectClasses(rw)
  ]).toString();
  const overlayClasses = classnames([
    `absolute inset-0 z-10 cursor-pointer w-full h-full grid place-content-center`,
    overlayColor,
    overlayOpacity
  ]).toString();
  const classes = {
    wrapper: wrapperClasses,
    video: videoClasses,
    poster: posterClasess,
    overlay: overlayClasses,
    videoLightbox: videoLightboxClasses,
    lightbox: {
      overlay: classnames([
        videoLightboxColor,
        videoLightboxColorOpacity,
        videoLightboxGlobalFiltersBackdropBlur
      ]).toString()
    }
  };
  const getOptions = () => {
    return JSON.stringify(options).replace(/"/g, "'");
  };
  const getXData = () => {
    return `videoPlayer('${id}', '${finalVideo.format}', '${finalVideo.videoId}', ${getOptions()})`;
  };
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      "x-data": getXData(),
      rwResourceDropZone: "video",
      id: globalID
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    video: finalVideo,
    options: getOptions(),
    classes,
    hasVideo: !!video,
    isYouTube: (video == null ? void 0 : video.format) == "youtube",
    isVimeo: (video == null ? void 0 : video.format) == "vimeo",
    isMP4: (video == null ? void 0 : video.format) == "mp4",
    shouldAutoPlay: autoplay != "never",
    edit: rw.project.mode === "edit",
    id,
    hasThumbnail,
    hasDarkThumbnail,
    thumbnail,
    thumbnailDark,
    thumbnailAlt: (video == null ? void 0 : video.alt) || thumbnailAlt || "",
    wantsLightbox: wantsLightbox && rw.project.mode != "edit"
  });
};
exports.transformHook = transformHook;
