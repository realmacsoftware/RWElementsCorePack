// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
const globalAnimations = (app) => {
  const {
    globalScrollAnimationPreviewInEditor: previewInEditor,
    globalScrollAnimationTrigger: triggerType,
    // none, instant, inView, scroll
    globalScrollAnimationEase: ease,
    globalScrollAnimationEaseCustom: easeCustom,
    globalScrollAnimationEaseSteps: easeSteps,
    globalScrollAnimationOrigin: origin,
    globalScrollAnimationDuration: duration,
    globalScrollAnimationDelay: delay,
    // inView
    globalScrollAnimationAmount: amount,
    // spring
    globalScrollAnimationIsSpring: isSpring,
    globalScrollAnimationSpringStrength: springStrength,
    globalScrollAnimationSpringAmplitude: springAmplitude,
    // trigger positions
    globalScrollAnimationTriggerElementPositionEnter: triggerElementPositionEnter,
    globalScrollAnimationTriggerViewportPositionEnter: triggerViewportPositionEnter,
    globalScrollAnimationTriggerElementPositionExit: triggerElementPositionExit,
    globalScrollAnimationTriggerViewportPositionExit: triggerViewportPositionExit,
    // margin
    globalScrollAnimationMarginTop: marginTop,
    globalScrollAnimationMarginBottom: marginBottom,
    // repeat
    globalScrollAnimationRepeat: repeat,
    globalScrollAnimationRepeatTimes: repeatTimes,
    globalScrollAnimationRepeatYoyo: repeatYoyo,
    globalScrollAnimationRepeatDelay: repeatDelay,
    // Effects
    // - start
    globalScrollAnimationEnterState: enterState,
    globalScrollAnimationOpacityEnterStart: opacityEnterStart,
    globalScrollAnimationRotateEnterStart: rotateEnterStart,
    globalScrollAnimationScaleEnterStart: scaleEnterStart,
    globalScrollAnimationTranslateXEnterStart: translateXEnterStart,
    globalScrollAnimationTranslateYEnterStart: translateYEnterStart,
    // - end
    globalScrollAnimationOpacityEnterEnd: opacityEnterEnd,
    globalScrollAnimationRotateEnterEnd: rotateEnterEnd,
    globalScrollAnimationScaleEnterEnd: scaleEnterEnd,
    globalScrollAnimationTranslateXEnterEnd: translateXEnterEnd,
    globalScrollAnimationTranslateYEnterEnd: translateYEnterEnd,
    // exit
    globalScrollAnimationExitEnabled: exitEnabled,
    globalScrollAnimationOpacityExitEnd: opacityExitEnd,
    globalScrollAnimationRotateExitEnd: rotateExitEnd,
    globalScrollAnimationScaleExitEnd: scaleExitEnd,
    globalScrollAnimationTranslateXExitEnd: translateXExitEnd,
    globalScrollAnimationTranslateYExitEnd: translateYExitEnd
  } = app.props;
  const { mode } = app.project;
  const gsapEase = isSpring ? `elastic.out(${springAmplitude}, ${springStrength})` : ease;
  const gsapMargin = (value) => value < 0 ? `-=${Math.abs(value)}` : `+=${value}`;
  const scrollTriggerStart = `${triggerElementPositionEnter}${gsapMargin(marginTop)} ${triggerViewportPositionEnter}${gsapMargin(marginBottom)}`;
  const scrollTriggerEnd = `${triggerElementPositionExit}${gsapMargin(marginTop)} ${triggerViewportPositionExit}${gsapMargin(marginBottom)}`;
  const wantsRepeat = triggerType == "instant" && repeat != "false";
  const gsapRepeat = !wantsRepeat ? false : {
    repeat: repeat == "infinite" ? -1 : repeatTimes,
    yoyo: repeatYoyo ? true : false,
    repeatDelay: repeatDelay / 1e3
  };
  const onEnterFrom = {
    opacity: opacityEnterStart / 100,
    rotation: rotateEnterStart,
    scale: scaleEnterStart / 100,
    x: `${translateXEnterStart}%`,
    y: `${translateYEnterStart}%`,
    autoAlpha: 0,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  };
  const onEnterTo = {
    opacity: opacityEnterEnd / 100,
    rotation: rotateEnterEnd,
    scale: scaleEnterEnd / 100,
    x: `${translateXEnterEnd}%`,
    y: `${translateYEnterEnd}%`,
    autoAlpha: 1,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  };
  const onLeaveTo = {
    opacity: opacityExitEnd / 100,
    rotation: rotateExitEnd,
    scale: scaleExitEnd / 100,
    x: `${translateXExitEnd}%`,
    y: `${translateYExitEnd}%`,
    autoAlpha: 0,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  };
  const cssVarsFrom = Object.entries(onEnterFrom).map(([key, value]) => `[--scroll-animation-from-${key}:${value}]`).join(" ");
  const cssVarsTo = Object.entries(onEnterTo).map(([key, value]) => `[--scroll-animation-to-${key}:${value}]`).join(" ");
  return {
    isEnabled: triggerType != "none",
    isScroll: triggerType == "scroll",
    isInView: triggerType == "inView",
    isInstant: triggerType == "instant",
    isExitEnabled: exitEnabled,
    previewInEditor: previewInEditor && mode == "edit",
    editorPreviewCSSVars: {
      from: cssVarsFrom,
      to: cssVarsTo,
      duration: `${duration / 1e3}s`,
      delay: `${delay / 1e3}s`
    },
    data: {
      "data-animation": "true",
      "data-animation-trigger-type": triggerType,
      "data-animation-enter-from": JSON.stringify(onEnterFrom).replace(/"/g, "&quot;"),
      "data-animation-enter-to": JSON.stringify(onEnterTo).replace(/"/g, "&quot;"),
      "data-animation-exit-to": JSON.stringify(onLeaveTo).replace(/"/g, "&quot;"),
      "data-animation-trigger-start": scrollTriggerStart,
      "data-animation-trigger-end": scrollTriggerEnd,
      "data-animation-repeat": gsapRepeat ? JSON.stringify(gsapRepeat).replace(/"/g, "&quot;") : false
    }
  };
};
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
const globalOutline = (rw) => {
  const {
    globalControlTypeOutline,
    globalOutlineStyle,
    globalOutlineColor,
    globalOutlineColorOpacity,
    globalOutlineWidth,
    globalOutlineOffset,
    globalOutlineColorFocus,
    globalOutlineColorOpacityFocus,
    globalOutlineWidthFocus,
    globalOutlineOffsetFocus
  } = rw.props;
  const classes = classnames();
  if (globalControlTypeOutline == "none") {
    return "";
  }
  if (globalControlTypeOutline != "none") {
    classes.add([
      `${globalOutlineStyle}`,
      `${globalOutlineColor}/${globalOutlineColorOpacity}`,
      globalOutlineWidth,
      globalOutlineOffset
    ]);
  }
  if (globalControlTypeOutline == "focus") {
    classes.add([
      `${globalOutlineColorFocus}/${globalOutlineColorOpacityFocus}`,
      globalOutlineWidthFocus,
      globalOutlineOffsetFocus
    ]);
  }
  return classes.toString();
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
const globalMenuItem = (rw) => {
  const {
    globalMenuItemFontFamily,
    globalMenuItemTextStyles,
    globalMenuItemFontWeight,
    globalMenuItemLetterSpacing,
    globalMenuItemItalic,
    globalMenuItemState,
    globalMenuItemColor,
    globalMenuItemOpacity,
    globalMenuItemTextShadow,
    globalMenuItemUnderline,
    globalMenuItemHoverColor,
    globalMenuItemHoverOpacity,
    globalMenuItemHoverTextShadow,
    globalMenuItemHoverUnderline
  } = rw.props;
  return classnames([
    globalMenuItemFontFamily,
    globalMenuItemTextStyles,
    globalMenuItemFontWeight,
    globalMenuItemLetterSpacing,
    globalMenuItemItalic,
    globalMenuItemState,
    globalMenuItemColor,
    globalMenuItemOpacity,
    globalMenuItemTextShadow,
    globalMenuItemUnderline,
    globalMenuItemHoverColor,
    globalMenuItemHoverOpacity,
    globalMenuItemHoverTextShadow,
    globalMenuItemHoverUnderline
  ]).toString();
};
const globalNavItems = (rw, isActive = false) => {
  const {
    globalNavItemsTextColor: textColor,
    globalNavItemsTextColorOpacity: textColorOpacity,
    globalNavItemsFont: font,
    globalNavItemsFontSize: fontSize,
    globalNavItemsTextShadow: textShadow,
    globalNavItemsFontWeight: fontWeight,
    globalNavItemsLetterSpacing: letterSpacing,
    globalNavItemsItalic: italic,
    globalNavItemsUnderline: underline,
    globalNavItemsTextColorHover: textColorHover,
    globalNavItemsTextColorOpacityHover: textColorOpacityHover,
    globalNavItemsTextShadowHover: textShadowHover,
    globalNavItemsUnderlineHover: underlineHover
  } = rw.props;
  console.log({ fontWeight });
  const inactiveStyles = {
    textColor,
    textColorOpacity,
    font,
    fontSize,
    textShadow,
    fontWeight,
    letterSpacing,
    italic,
    underline
  };
  const activeStyles = {
    ...inactiveStyles,
    textColor: textColorHover,
    textColorOpacity: textColorOpacityHover,
    textShadow: textShadowHover,
    underline: underlineHover
  };
  const activeStylesFormatted = Object.fromEntries(
    Object.entries(activeStyles).map(([key, value]) => [key, value.replace(/hover:/g, "")])
  );
  const hoverStyles = {
    textColorHover,
    textColorOpacityHover,
    textShadowHover,
    underlineHover
  };
  const currentStyles = isActive ? activeStylesFormatted : inactiveStyles;
  return classnames([
    ...Object.values(currentStyles),
    ...Object.values(hoverStyles)
  ]).toString();
};
const globalNavTitle = (rw) => {
  const {
    globalNavTitleTextColor,
    globalNavTitleTextColorOpacity,
    globalNavTitleFont,
    globalNavTitleFontSize,
    globalNavTitleTextShadow,
    globalNavTitleFontWeight,
    globalNavTitleFontLetterSpacing,
    globalNavTitleItalic,
    globalNavTitleUnderline
  } = rw.props;
  return classnames([
    `${globalNavTitleTextColor}/${globalNavTitleTextColorOpacity}`,
    globalNavTitleFont,
    globalNavTitleFontSize,
    globalNavTitleTextShadow,
    globalNavTitleFontWeight,
    globalNavTitleFontLetterSpacing,
    globalNavTitleItalic,
    globalNavTitleUnderline
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
const globalSpacingMargin = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin
  } = app.props;
  return enabled == "false" ? false : margin;
};
const globalSpacingPadding = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalPadding: padding
  } = app.props;
  return enabled == "false" ? false : padding;
};
const globalMouse3D = (app) => {
  const {
    globalControlType3D: type,
    globalHoverGroup3D: hoverGroup,
    globalHoverGroupCustomId3D: customId
  } = app.props;
  if (type != "mouse") return {};
  let over = hoverGroup || "self";
  if (over == "parent") over = app.node.parent && app.node.parent.id || "self";
  if (over == "custom") over = (customId || "").trim() || "self";
  return { "data-m3d-over": over };
};
const globalPerspective3D = (app, args = {}) => {
  const {
    globalControlType3D: type,
    globalTransformPerspective: perspective,
    globalTransformPerspectiveOrigin: perspectiveOrigin
  } = app.props;
  const classes = classnames();
  if (type != "none") {
    classes.add([
      perspective,
      perspectiveOrigin
    ]);
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
const mouse3DDeviceOrder = ["base", "sm", "md", "lg", "xl", "2xl"];
const buildMouse3DClass = (utility, start, end, cssVar, prefix = "") => {
  if (start === end) return `${prefix}${utility}-[${start}]`;
  return `${prefix}${utility}-[calc(${start}*(1_-_var(${cssVar},0))_+_${end}*var(${cssVar},0))]`;
};
const mouse3DChannel = (app, { utility, unit, cssVar, startId, endId, fallback }) => {
  const responsiveProps = app.responsiveProps || {};
  const startValues = responsiveProps[startId] || {};
  const endValues = responsiveProps[endId] || {};
  const pick = (value, previous) => value == null || value === "" ? previous : `${value}${unit}`;
  let start = pick(startValues.base, fallback);
  let end = pick(endValues.base, fallback);
  const classes = [buildMouse3DClass(utility, start, end, cssVar)];
  mouse3DDeviceOrder.slice(1).forEach((device) => {
    const nextStart = pick(startValues[device], start);
    const nextEnd = pick(endValues[device], end);
    if (nextStart === start && nextEnd === end) return;
    start = nextStart;
    end = nextEnd;
    classes.push(
      buildMouse3DClass(utility, start, end, cssVar, `${device}:`)
    );
  });
  return classes;
};
const globalTransforms3D = (app, args = {}) => {
  const {
    globalControlType3D: type,
    globalHoverGroup3D: hoverGroup,
    globalHoverGroupCustomId3D: customId,
    globalTransforms3DApplyTo: applyTo,
    globalTransformBackface: backface,
    globalTransformRotateX: rotateX,
    globalTransformRotateY: rotateY,
    globalTransformScaleZ: scaleZ,
    globalTransformTranslateZ: translateZ,
    globalTransformRotateXEnd: rotateXEnd,
    globalTransformRotateYEnd: rotateYEnd,
    globalTransformScaleZEnd: scaleZEnd,
    globalTransformTranslateZEnd: translateZEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  const classes = classnames();
  if (type != "none" && type != "mouse") {
    classes.add([
      backface,
      rotateX,
      rotateY,
      scaleZ,
      translateZ
    ]);
  }
  if (type == "mouse") {
    classes.add([
      backface,
      // Cursor Y drives Rotate X, cursor X drives Rotate Y,
      // distance-from-centre drives Scale Z and Depth.
      ...mouse3DChannel(app, {
        utility: "rotate-x",
        unit: "deg",
        cssVar: "--rw-m3d-y",
        startId: "globalTransformRotateX",
        endId: "globalTransformRotateXEnd",
        fallback: "0deg"
      }),
      ...mouse3DChannel(app, {
        utility: "rotate-y",
        unit: "deg",
        cssVar: "--rw-m3d-x",
        startId: "globalTransformRotateY",
        endId: "globalTransformRotateYEnd",
        fallback: "0deg"
      }),
      ...mouse3DChannel(app, {
        utility: "scale-z",
        unit: "%",
        cssVar: "--rw-m3d-r",
        startId: "globalTransformScaleZ",
        endId: "globalTransformScaleZEnd",
        fallback: "100%"
      }),
      ...mouse3DChannel(app, {
        utility: "translate-z",
        unit: "",
        cssVar: "--rw-m3d-r",
        startId: "globalTransformTranslateZ",
        endId: "globalTransformTranslateZEnd",
        fallback: "0px"
      })
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(rotateXEnd, prefix),
      addPrefixToTailwindClasses(rotateYEnd, prefix),
      addPrefixToTailwindClasses(scaleZEnd, prefix),
      addPrefixToTailwindClasses(translateZEnd, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        `data-[active=true]:${rotateXEnd}`,
        `data-[active=true]:${rotateYEnd}`,
        `data-[active=true]:${scaleZEnd}`,
        `data-[active=true]:${translateZEnd}`
      ]);
    }
    if (wantsFocus) {
      classes.add([
        `${prefix.replace(/hover/g, "focus")}:${rotateXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${rotateYEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${scaleZEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateZEnd}`
      ]);
    }
  }
  return classes.toString();
};
const alpineTransitionsDesktop = {
  fade: {
    enter: "transition ease-out",
    enterStart: "opacity-0",
    enterEnd: "opacity-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100",
    leaveEnd: "opacity-0"
  },
  slideDown: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-3"
  },
  slideDownShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-3"
  },
  slideUp: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-3"
  },
  slideUpShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-3"
  },
  slideLeft: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  slideLeftShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 translate-x-3"
  },
  slideRight: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  slideRightShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  zoom: {
    enter: "transition ease-out",
    enterStart: "opacity-0 scale-95",
    enterEnd: "opacity-100 scale-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100 scale-100",
    leaveEnd: "opacity-0 scale-95"
  },
  none: {
    enter: "duration-0",
    enterStart: "",
    enterEnd: "",
    leave: "duration-0",
    leaveStart: "",
    leaveEnd: ""
  }
};
const getAlpineTransitionAttributesDesktop = (transitionName) => {
  const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } = alpineTransitionsDesktop[transitionName] || alpineTransitionsDesktop.fade;
  const attributes = {
    "x-transition:enter": enter,
    "x-transition:enter-start": enterStart,
    "x-transition:enter-end": enterEnd,
    "x-transition:leave": leave,
    "x-transition:leave-start": leaveStart,
    "x-transition:leave-end": leaveEnd
  };
  return Object.entries(attributes).filter(([key, value]) => value).map(([key, value]) => `${key}="${value}"`).join(" ");
};
const alpineTransitionsMobile = {
  fade: {
    enter: "transition ease-out",
    enterStart: "opacity-0",
    enterEnd: "opacity-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100",
    leaveEnd: "opacity-0"
  },
  slideDown: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-y-full",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-full"
  },
  slideDownShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 -translate-y-3"
  },
  slideUp: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-y-full",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-full"
  },
  slideUpShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-y-0",
    leaveEnd: "opacity-0 translate-y-3"
  },
  slideLeft: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-x-full",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 translate-x-full"
  },
  slideLeftShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 translate-x-3"
  },
  slideRight: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-x-full",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-full"
  },
  slideRightShort: {
    enter: "transition ease-out",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  zoom: {
    enter: "transition ease-out",
    enterStart: "opacity-0 scale-95",
    enterEnd: "opacity-100 scale-100",
    leave: "transition ease-in",
    leaveStart: "opacity-100 scale-100",
    leaveEnd: "opacity-0 scale-95"
  },
  none: {
    enter: "duration-0",
    enterStart: "",
    enterEnd: "",
    leave: "duration-0",
    leaveStart: "",
    leaveEnd: ""
  }
};
const getAlpineTransitionAttributesMobile = (transitionName) => {
  const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } = alpineTransitionsMobile[transitionName] || alpineTransitionsMobile.fade;
  const attributes = {
    "x-transition:enter": enter,
    "x-transition:enter-start": enterStart,
    "x-transition:enter-end": enterEnd,
    "x-transition:leave": leave,
    "x-transition:leave-start": leaveStart,
    "x-transition:leave-end": leaveEnd
  };
  return Object.entries(attributes).filter(([key, value]) => value).map(([key, value]) => `${key}="${value}"`).join(" ");
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
const globalButtonFontAndTextStyles = (rw, args = {}) => {
  const {
    globalButtonFontAndTextStylesTextAlign,
    globalButtonFontAndTextStylesColor,
    globalButtonFontAndTextStylesColorOpacity,
    globalButtonFontAndTextStylesFont,
    globalButtonFontAndTextStylesFontSize,
    globalButtonFontAndTextStylesTextShadow,
    globalButtonFontAndTextStylesFontWeight,
    globalButtonFontAndTextStylesLineHeight,
    globalButtonFontAndTextStylesLetterSpacing,
    globalButtonFontAndTextStylesItalic,
    globalButtonFontAndTextStylesUnderline,
    globalButtonFontAndTextStylesTextTransform,
    globalButtonFontAndTextStylesColorHover,
    globalButtonFontAndTextStylesColorOpacityHover,
    globalButtonFontAndTextStylesTextShadowHover
  } = rw.props;
  const wantsFocus = args.focus || false;
  const wantsActive = args.active || false;
  const classes = classnames([
    globalButtonFontAndTextStylesTextAlign,
    globalButtonFontAndTextStylesColor,
    globalButtonFontAndTextStylesColorOpacity,
    globalButtonFontAndTextStylesFont,
    globalButtonFontAndTextStylesFontSize,
    globalButtonFontAndTextStylesTextShadow,
    globalButtonFontAndTextStylesFontWeight,
    globalButtonFontAndTextStylesLineHeight,
    globalButtonFontAndTextStylesLetterSpacing,
    globalButtonFontAndTextStylesItalic,
    globalButtonFontAndTextStylesUnderline,
    globalButtonFontAndTextStylesTextTransform,
    globalButtonFontAndTextStylesColorHover,
    globalButtonFontAndTextStylesColorOpacityHover,
    globalButtonFontAndTextStylesTextShadowHover
  ]);
  if (wantsFocus) {
    classes.add([
      globalButtonFontAndTextStylesColorHover.replace("hover:", "focus:"),
      globalButtonFontAndTextStylesColorOpacityHover.replace("hover:", "focus:"),
      globalButtonFontAndTextStylesTextShadowHover.replace("hover:", "focus:")
    ]);
  }
  if (wantsActive) {
    classes.add([
      globalButtonFontAndTextStylesColorHover.replace("hover:", "data-[active=true]:"),
      globalButtonFontAndTextStylesColorOpacityHover.replace("hover:", "data-[active=true]:"),
      globalButtonFontAndTextStylesTextShadowHover.replace("hover:", "data-[active=true]:")
    ]);
  }
  return classes.toString();
};
const globalHeadingTextColor = (rw, type, prefix) => {
  const {
    globalTextColor: color,
    globalTextColorOpacity: opacity,
    globalTextColorHover: colorHover,
    globalTextColorOpacityHover: opacityHover
  } = rw.props;
  return classnames([
    color,
    opacity,
    ...type == "hover" ? [
      addPrefixToTailwindClasses(colorHover, prefix),
      addPrefixToTailwindClasses(opacityHover, prefix)
    ] : []
  ]).toString();
};
const globalHeadingColor = (rw) => {
  const {
    globalBgType,
    globalControlTypeBg: type,
    globalHoverGroupBg: hoverGroup,
    globalHoverGroupCustomIdBg: customId
  } = rw.props;
  const { mode } = rw.project;
  const { node } = rw;
  const prefix = getHoverPrefix(node, "", hoverGroup, customId);
  let classes = classnames([]);
  switch (globalBgType) {
    case "color":
      classes.add(globalHeadingTextColor(rw, type, prefix));
      break;
    case "gradient":
      classes.add([
        "bg-clip-text",
        "text-[transparent]",
        ...globalBgGradient(rw, {
          prefix,
          prefixCallback: addPrefixToTailwindClasses
        }).split(" ").filter(Boolean)
      ]).modifier(mode == "edit" ? "[&_span]" : "");
      break;
    case "image":
      classes.add([
        "bg-clip-text",
        "text-[transparent]",
        ...globalBgImage(rw, {
          prefix,
          prefixCallback: addPrefixToTailwindClasses
        }).split(" ").filter(Boolean)
      ]).modifier(mode == "edit" ? "[&_span]" : "");
      break;
  }
  return classes.toString();
};
const globalInputFontAndTextStyles = (rw) => {
  const {
    globalInputFontAndTextStylesColor,
    globalInputFontAndTextStylesColorOpacity,
    globalInputFontAndTextStylesTextShadow,
    globalInputFontAndTextStylesTextAlign,
    globalInputFontAndTextStylesFont,
    globalInputFontAndTextStylesFontSize,
    globalInputFontAndTextStylesFontWeight,
    globalInputFontAndTextStylesLineHeight,
    globalInputFontAndTextStylesLetterSpacing,
    globalInputFontAndTextStylesTextTransform,
    globalInputFontAndTextStylesItalic,
    globalInputFontAndTextStylesUnderline
  } = rw.props;
  const classes = classnames([
    globalInputFontAndTextStylesColor,
    globalInputFontAndTextStylesColorOpacity,
    globalInputFontAndTextStylesTextShadow,
    globalInputFontAndTextStylesTextAlign,
    globalInputFontAndTextStylesFont,
    globalInputFontAndTextStylesFontSize,
    globalInputFontAndTextStylesFontWeight,
    globalInputFontAndTextStylesLineHeight,
    globalInputFontAndTextStylesLetterSpacing,
    globalInputFontAndTextStylesTextTransform,
    globalInputFontAndTextStylesItalic,
    globalInputFontAndTextStylesUnderline
  ]);
  return classes.toString();
};
const globalTextFontsAndTextStyles = (app) => {
  const {
    globalTextFontFamily,
    globalTextFontSize,
    globalTextFontWeight,
    globalTextLetterSpacing,
    globalTextLineHeight,
    globalTextItalic,
    globalTextTextShadow,
    globalTextTextTransform,
    globalTextWhiteSpace,
    globalTextTextDecoration,
    globalTextTextDecorationStyle,
    globalTextTextDecorationOffset,
    globalTextTextDecorationColor,
    globalTextTextDecorationOpacity
  } = app.props;
  return classnames().add([
    globalTextFontFamily,
    globalTextFontSize,
    globalTextFontWeight,
    globalTextLetterSpacing,
    globalTextLineHeight,
    globalTextItalic,
    globalTextTextShadow,
    globalTextTextTransform,
    globalTextWhiteSpace
  ]).add(
    globalTextTextDecoration !== "no-underline" ? [
      globalTextTextDecoration,
      globalTextTextDecorationOffset,
      globalTextTextDecorationStyle,
      `${globalTextTextDecorationColor}/${globalTextTextDecorationOpacity}`
    ] : []
  ).toString();
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
    audioSource: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  };
  const hasMultipleTracks = (tracks == null ? void 0 : tracks.length) > 1;
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
        nowPlayingLayout,
        nowPlayingGap,
        nowPlayingPadding
      ]).toString(),
      artwork: classnames([
        "object-cover",
        nowPlayingArtworkSize,
        nowPlayingArtworkShadow,
        nowPlayingArtworkBorderRadius
      ]).toString(),
      title: classnames([
        `font-semibold font-body`,
        nowPlayingTitleTextColor,
        nowPlayingTitleFontSize
      ]).toString(),
      artist: classnames([
        `font-body`,
        nowPlayingArtistTextColor,
        nowPlayingArtistFontSize
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
          "absolute top-0 aspect-square rounded-full transition duration-[0ms]"
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
        "group/track flex items-center gap-4 px-4 py-3 cursor-pointer transition",
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
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      "x-data": "elementsAudioPlaylist()",
      "x-init": "init"
    }
  });
  rw.setProps({
    id: rw.node.id,
    edit: mode === "edit",
    tracks,
    firstTrack,
    classes,
    hasMultipleTracks,
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
