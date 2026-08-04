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
  var _a, _b, _c, _d;
  const {
    globalID,
    imageType,
    imageIntrinsicWidth,
    imageIntrinsicHeight,
    image,
    imageDark,
    imageAlt,
    imageSizingType,
    imageProtection,
    imageFetchPriority,
    imageLightboxColor,
    imageLightboxColorOpacity,
    imageLightboxGlobalFiltersBackdropBlur,
    imageMaskResource,
    imageMaskSize
  } = rw.props;
  const {
    imageFileSize,
    imageCmsField: responsiveImageCmsField,
    imageCmsFieldDark: responsiveImageCmsFieldDark,
    imageCustomSource,
    imageCustomSourceDark,
    wantsLightbox
  } = rw.responsiveProps;
  const { breakpoints } = rw.theme;
  const { names, screens } = breakpoints;
  const { mode } = rw.project;
  const { assetPath, sharedAssetPath } = rw.component;
  const link = globalLink(rw);
  const wantsCustomSizing = imageSizingType == "custom";
  const wantsFetchPriority = imageFetchPriority != "auto";
  const isEditMode = mode == "edit";
  const isCMSImage = imageType == "cms";
  const isCustomImage = imageType == "custom";
  const isResourceImage = imageType == "resource";
  const wantsLightboxAtAnyBreakpoint = Object.values(wantsLightbox).some((v) => v === true);
  const lightboxCursorClasses = Object.entries(wantsLightbox).map(([breakpoint, enabled]) => {
    const prefix = breakpoint === "base" ? "" : `${breakpoint}:`;
    return enabled ? `${prefix}cursor-zoom-in` : `${prefix}cursor-default`;
  }).join(" ");
  const lightboxBreakpoints = Object.entries(wantsLightbox).map(([breakpoint, enabled]) => ({
    minWidth: breakpoint === "base" ? 0 : screens[breakpoint] || 0,
    enabled
  })).sort((a, b) => a.minWidth - b.minWidth);
  const generateResponsiveImageData = (resourceObject) => {
    if (!resourceObject) return null;
    const sources = names.filter((name) => resourceObject[name] && screens[name]).sort((a, b) => screens[b] - screens[a]).map((name) => ({
      media: `(min-width: ${screens[name]}px)`,
      srcset: resourceObject[name],
      breakpoint: name,
      minWidth: screens[name]
    }));
    return {
      sources,
      fallbackSrc: resourceObject["base"],
      baseSrc: resourceObject["base"]
    };
  };
  const generateResourceSources = (resource) => {
    if (!wantsCustomSizing) return resource;
    const sources = names.filter((name) => imageFileSize[name]).sort((a, b) => screens[b] - screens[a]).map((name) => {
      const displayWidth = Math.min(imageFileSize[name], (resource == null ? void 0 : resource.width) || Infinity);
      const source = {
        media: `(min-width: ${screens[name]}px)`,
        srcset: rw.resizeResource(resource, imageFileSize[name] * 2),
        breakpoint: name,
        minWidth: screens[name]
      };
      if ((resource == null ? void 0 : resource.width) && (resource == null ? void 0 : resource.height)) {
        source.width = displayWidth;
        source.height = Math.round(displayWidth * resource.height / resource.width);
      }
      return source;
    });
    return {
      sources,
      fallbackSrc: resource,
      baseSrc: resource
    };
  };
  const generateDefaultSrc = (resource) => {
    if (!wantsCustomSizing) return resource;
    const displayWidth = Math.min(imageFileSize.base, (resource == null ? void 0 : resource.width) || Infinity);
    const resized = {
      ...resource,
      image: rw.resizeResource(resource, imageFileSize.base * 2)
    };
    if ((resource == null ? void 0 : resource.width) && (resource == null ? void 0 : resource.height)) {
      resized.width = displayWidth;
      resized.height = Math.round(displayWidth * resource.height / resource.width);
    }
    return resized;
  };
  const responsiveImageData = generateResponsiveImageData(
    isCMSImage ? responsiveImageCmsField : imageCustomSource
  );
  const responsiveImageDataDark = generateResponsiveImageData(
    isCMSImage ? responsiveImageCmsFieldDark : imageCustomSourceDark
  );
  const imageCustomSrc = isEditMode && isCMSImage ? `${sharedAssetPath}/images/image-square.png` : (responsiveImageData == null ? void 0 : responsiveImageData.baseSrc) || `${sharedAssetPath}/images/image-square.png`;
  const imageCustomSrcDark = isEditMode && isCMSImage ? `${sharedAssetPath}/images/image-square.png` : (responsiveImageDataDark == null ? void 0 : responsiveImageDataDark.baseSrc) || null;
  const lightboxResource = isResourceImage ? image : null;
  const lightboxResourceDark = isResourceImage ? imageDark : null;
  const lightImage = isResourceImage ? {
    resource: generateDefaultSrc(image),
    ...generateResourceSources(image)
  } : {
    resource: {
      image: imageCustomSrc
    },
    ...responsiveImageData
  };
  const darkImage = isResourceImage ? {
    resource: generateDefaultSrc(imageDark),
    ...generateResourceSources(imageDark)
  } : {
    resource: {
      image: imageCustomSrcDark
    },
    ...responsiveImageDataDark
  };
  const wantsMask = !!(imageMaskResource == null ? void 0 : imageMaskResource.image);
  const maskClasses = [];
  if (wantsMask) {
    const svgContent = imageMaskResource.image;
    const encodedSvg = encodeURIComponent(svgContent);
    const maskUrl = `url('data:image/svg+xml,${encodedSvg}')`;
    const maskSize = `${imageMaskSize}`.trim().replace(/\s+/g, "_");
    maskClasses.push(
      `[-webkit-mask-image:${maskUrl}]`,
      `[mask-image:${maskUrl}]`,
      `[-webkit-mask-size:${maskSize}]`,
      `[mask-size:${maskSize}]`,
      `[-webkit-mask-repeat:no-repeat]`,
      `[mask-repeat:no-repeat]`,
      `[-webkit-mask-position:center]`,
      `[mask-position:center]`
    );
  }
  const classes = {
    wrapper: classnames([
      `transform-gpu`,
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      advancedClasses(rw)
    ]).toString(),
    picture: classnames([
      "block"
    ]).toString(),
    img: classnames([
      wantsLightboxAtAnyBreakpoint && lightboxCursorClasses,
      `max-w-[100%] w-full`,
      globalTransitions(rw),
      globalEffects(rw),
      globalTransforms(rw),
      globalFilters(rw),
      globalBorders(rw),
      // displaySize(),
      objectClasses(rw),
      rw.props.aspectRatio == "aspect-[auto]" ? isResourceImage && (image == null ? void 0 : image.aspect) ? `aspect-[${image.aspect}]` : null : aspectRatioClasses(rw),
      ...maskClasses
    ]).toString(),
    lightbox: {
      overlay: classnames([
        `fixed inset-0`,
        imageLightboxColor,
        imageLightboxColorOpacity,
        imageLightboxGlobalFiltersBackdropBlur
      ]).toString()
    }
  };
  rw.setRootElement({
    as: link.hasLink ? "a" : "div",
    class: classes.wrapper,
    args: {
      ...link.args,
      rwResourceDropZone: "image",
      id: globalID
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    isCMSImage,
    isCustomImage,
    isResourceImage,
    isEditMode,
    lightImage,
    hasDarkImage: ((_a = darkImage.resource) == null ? void 0 : _a.image) || false,
    darkImage,
    hasImage: ((_b = lightImage.resource) == null ? void 0 : _b.image) || false,
    imageProtection,
    defaultSrc: image,
    alt: isResourceImage ? (image == null ? void 0 : image.alt) || (imageDark == null ? void 0 : imageDark.alt) : imageAlt,
    classes,
    imageWidth: !isResourceImage ? imageIntrinsicWidth : (_c = lightImage.resource) == null ? void 0 : _c.width,
    imageHeight: !isResourceImage ? imageIntrinsicHeight : (_d = lightImage.resource) == null ? void 0 : _d.height,
    assetPath,
    sharedAssetPath,
    wantsLightbox: wantsLightboxAtAnyBreakpoint && mode != "edit",
    lightboxBreakpointsJSON: JSON.stringify(lightboxBreakpoints),
    lightboxResource,
    lightboxResourceDark,
    id: rw.node.id,
    wantsFetchPriority
  });
};
exports.transformHook = transformHook;
