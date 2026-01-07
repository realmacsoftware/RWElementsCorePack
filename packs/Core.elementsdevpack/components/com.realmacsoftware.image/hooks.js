// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
const globalHTMLTag = (app, fallback = "div") => {
  const { globalHTMLTag: globalHTMLTag2, globalHTMLTagCustom } = app.props;
  return globalHTMLTag2 === "custom" ? globalHTMLTagCustom.replace(/</g, "").replace(/>/g, "").replace(/[^a-zA-Z0-9]/g, "") : globalHTMLTag2 == "default" ? fallback : globalHTMLTag2 || fallback;
}, generateImageAttributes = (entries, getMedia, getWidthClass, rw, image2) => {
  const sources = [], widthClasses = [];
  return entries.forEach(([device, value]) => {
    if (!value) return;
    sources.push({
      src: rw.resizeResource(image2, value * 2),
      media: getMedia(device, value)
    });
    const widthClassQuery = device === "base" ? "" : `${device}:`;
    widthClasses.push(getWidthClass(device, value, widthClassQuery));
  }), { sources, widthClasses };
}, imageResizeHandlers = {
  none: (rw, image2) => ({
    sources: [{ srcset: image2.image, media: "(min-width: 0px)" }],
    widthClasses: []
  }),
  devices: (rw, image2) => generateImageAttributes(
    Object.entries(rw.theme.breakpoints.screens),
    (_, breakpoint) => `(max-width: ${breakpoint}px)`,
    (device, breakpoint, query) => `${query}max-w-[${breakpoint}px]`,
    rw,
    image2
  ),
  custom: (rw, image2) => generateImageAttributes(
    Object.entries(rw.responsiveProps.customWidth),
    (device) => device === "base" ? "(min-width: 0px)" : `(min-width: ${rw.theme.breakpoints.screens[device]}px)`,
    (device, deviceWidth, query) => `${query}max-w-[${deviceWidth}px]`,
    rw,
    image2
  ),
  default: (rw, image2) => (console.error(`Unknown resizeType: ${rw.props.resizeType}`), { sources: [], widthClasses: [] })
}, imageSrcsetGenerators = {
  none: (rw, image2) => ({
    sources: [{ srcset: image2.image, media: "0w" }],
    widthClasses: []
  }),
  devices: (rw, image2) => generateImageAttributes(
    Object.entries(rw.theme.breakpoints.screens),
    (_, breakpoint) => `${breakpoint}w`,
    (device, breakpoint, query) => `${query}max-w-[${breakpoint}px]`,
    rw,
    image2
  ),
  custom: (rw, image2) => generateImageAttributes(
    Object.entries(rw.responsiveProps.customWidth),
    (_, value) => `${value}w`,
    (device, deviceWidth, query) => `${query}max-w-[${deviceWidth}px]`,
    rw,
    image2
  ),
  default: (rw, image2) => (console.error(`Unknown resizeType: ${rw.props.resizeType}`), "nope")
}, imageSrcset = (rw, image2) => {
  if (!image2) return { srcset: [], defaultSrc: "" };
  const { resizeType } = rw.props, { breakpoints } = rw.theme, { names, screens } = breakpoints, { isInternalResource } = image2;
  if (isInternalResource)
    return {
      srcset: [],
      defaultSrc: image2.image
    };
  const generateSrcset = (sizes) => names.map(
    (name) => sizes[name] && `${rw.resizeResource(image2, sizes[name] * 2)} ${sizes[name]}w`
  ).filter(Boolean).join(", ");
  let defaultSrc = rw.resizeResource(image2, (screens.sm || 640) * 2);
  if (resizeType === "devices")
    return {
      srcset: generateSrcset(screens),
      defaultSrc
    };
  if (resizeType === "custom") {
    const { customWidth } = rw.responsiveProps;
    return defaultSrc = rw.resizeResource(image2, customWidth.base * 2), {
      srcset: generateSrcset(customWidth),
      defaultSrc
    };
  }
  return resizeType === "none" ? {
    srcset: [],
    defaultSrc: image2.image
  } : {
    srcset: [],
    defaultSrc
  };
}, imageSizesArray = (rw) => {
  const { resizeType } = rw.props, { breakpoints } = rw.theme, { names, screens } = breakpoints;
  if (resizeType === "devices")
    return Object.entries(screens).map(([_, value]) => `(max-width: ${value}px) ${value}px`).join(", ");
  if (resizeType === "custom") {
    const { customWidth } = rw.responsiveProps, sizes = [];
    return names.forEach((name) => {
      const value = customWidth[name];
      value && sizes.push(
        screens[name] ? `(min-width: ${screens[name]}px) ${value}px` : `${value}px`
      );
    }), sizes.reverse().join(", ");
  }
  return "100vw";
}, RWAnimations = {
  "fade-in": {
    enter: {
      start: ["opacity-0"],
      end: ["opacity-100"]
    },
    leave: {
      start: ["opacity-100"],
      end: ["opacity-0"]
    }
  },
  "fade-in-up": {
    enter: {
      start: ["opacity-0", "translate-y-10"],
      end: ["opacity-100", "translate-y-0"]
    },
    leave: {
      start: ["opacity-100", "translate-y-0"],
      end: ["opacity-0", "translate-y-10"]
    }
  },
  "fade-in-down": {
    enter: {
      start: ["opacity-0", "-translate-y-10"],
      end: ["opacity-100", "translate-y-0"]
    },
    leave: {
      start: ["opacity-100", "translate-y-0"],
      end: ["opacity-0", "-translate-y-10"]
    }
  },
  "fade-in-left": {
    enter: {
      start: ["opacity-0", "-translate-x-10"],
      end: ["opacity-100", "translate-x-0"]
    },
    leave: {
      start: ["opacity-100", "translate-x-0"],
      end: ["opacity-0", "-translate-x-10"]
    }
  },
  "fade-in-right": {
    enter: {
      start: ["opacity-0", "translate-x-10"],
      end: ["opacity-100", "translate-x-0"]
    },
    leave: {
      start: ["opacity-100", "translate-x-0"],
      end: ["opacity-0", "translate-x-10"]
    }
  },
  "zoom-in": {
    enter: {
      start: ["opacity-0", "scale-50"],
      end: ["opacity-100", "scale-100"]
    },
    leave: {
      start: ["opacity-100", "scale-100"],
      end: ["opacity-0", "scale-50"]
    }
  },
  "zoom-in-up": {
    enter: {
      start: ["opacity-0", "scale-50", "translate-y-20"],
      end: ["opacity-100", "scale-100", "translate-y-0"]
    },
    leave: {
      start: ["opacity-100", "scale-100", "translate-y-0"],
      end: ["opacity-0", "scale-50", "translate-y-20"]
    }
  },
  "zoom-in-down": {
    enter: {
      start: ["opacity-0", "scale-50", "-translate-y-20"],
      end: ["opacity-100", "scale-100", "translate-y-0"]
    },
    leave: {
      start: ["opacity-100", "scale-100", "translate-y-0"],
      end: ["opacity-0", "scale-50", "-translate-y-20"]
    }
  }
}, alpineTransitionsMobile = {
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
}, alpineTransitionsDesktop = {
  ...alpineTransitionsMobile,
  slideDown: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-y-3",
    enterEnd: "opacity-100 translate-y-0",
    leave: "transition ease-in duration-300",
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
  slideLeft: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  },
  slideRight: {
    enter: "transition ease-out duration-300",
    enterStart: "opacity-0 -translate-x-3",
    enterEnd: "opacity-100 translate-x-0",
    leave: "transition ease-in duration-300",
    leaveStart: "opacity-100 translate-x-0",
    leaveEnd: "opacity-0 -translate-x-3"
  }
}, getAlpineTransitionAttributesMobile = (transitionName) => {
  const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } = alpineTransitionsMobile[transitionName] || alpineTransitionsMobile.fade;
  return Object.entries({
    "x-transition:enter": enter,
    "x-transition:enter-start": enterStart,
    "x-transition:enter-end": enterEnd,
    "x-transition:leave": leave,
    "x-transition:leave-start": leaveStart,
    "x-transition:leave-end": leaveEnd
  }).filter(([key, value]) => value).map(([key, value]) => `${key}="${value}"`).join(" ");
}, getAlpineTransitionAttributesDesktop = (transitionName) => {
  const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } = alpineTransitionsDesktop[transitionName] || alpineTransitionsDesktop.fade;
  return Object.entries({
    "x-transition:enter": enter,
    "x-transition:enter-start": enterStart,
    "x-transition:enter-end": enterEnd,
    "x-transition:leave": leave,
    "x-transition:leave-start": leaveStart,
    "x-transition:leave-end": leaveEnd
  }).filter(([key, value]) => value).map(([key, value]) => `${key}="${value}"`).join(" ");
}, getHoverPrefix = (node = {}, applyTo = "", hoverGroup = "self", customId = "") => {
  const needsPeerPrefix = node.isContainer && ["background", "content"].includes(applyTo);
  return hoverGroup === "parent" ? `group-hover/${node.parent.id}` : hoverGroup === "custom" ? `group-hover/${customId}` : needsPeerPrefix && hoverGroup === "self" ? `group-hover/${node.id}` : hoverGroup === "self" ? needsPeerPrefix ? "peer-hover" : "hover" : `group-hover/${hoverGroup}`;
}, injectPrefixOnDarkModeColors = (prefix2, classes) => classes.replace(/dark:(.*)/g, `dark:${prefix2}:$1`);
function addPrefixToTailwindClasses(classString, prefix2) {
  return classString.split(/\s+/).map((cls) => {
    if (cls = cls.replace(/hover:/g, ""), cls.includes(`${prefix2}:`)) return cls;
    const match = cls.match(/^([a-z0-9]+:)(.+)$/i);
    return match ? `${match[1]}${prefix2}:${match[2]}` : `${prefix2}:${cls}`;
  }).join(" ");
}
const advancedClasses = (rw) => {
  const { display, cssClasses, overflow, zIndex } = rw.props;
  return classnames([display, cssClasses, overflow, zIndex]).toString();
}, alpineTransitions = (name = "fade") => {
  const transitions = {
    dim: {
      enter: "transition-all duration-300",
      enterStart: "opacity-25",
      enterEnd: "opacity-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100",
      leaveEnd: "opacity-25"
    },
    // Basic transitions
    fade: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0",
      enterEnd: "opacity-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100",
      leaveEnd: "opacity-0"
    },
    // Slide transitions
    slideDown: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 -translate-y-4",
      enterEnd: "opacity-100 translate-y-0",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-y-0",
      leaveEnd: "opacity-0 -translate-y-4"
    },
    slideUp: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 translate-y-4",
      enterEnd: "opacity-100 translate-y-0",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-y-0",
      leaveEnd: "opacity-0 translate-y-4"
    },
    slideRight: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 -translate-x-4",
      enterEnd: "opacity-100 translate-x-0",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-x-0",
      leaveEnd: "opacity-0 -translate-x-4"
    },
    slideLeft: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 translate-x-4",
      enterEnd: "opacity-100 translate-x-0",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-x-0",
      leaveEnd: "opacity-0 translate-x-4"
    },
    // Scale transitions
    scale: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 scale-95",
      enterEnd: "opacity-100 scale-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 scale-100",
      leaveEnd: "opacity-0 scale-95"
    },
    scaleUp: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 scale-75",
      enterEnd: "opacity-100 scale-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 scale-100",
      leaveEnd: "opacity-0 scale-75"
    },
    scaleDown: {
      enter: "transition-all !duration-[2s]",
      enterStart: "opacity-0 scale-125 rotate-45",
      enterEnd: "opacity-100 scale-100 rotate-0",
      leave: "transition-all !duration-[2s]",
      leaveStart: "opacity-100 scale-100 rotate-0",
      leaveEnd: "opacity-0 scale-125 rotate-45"
    },
    // Combined transitions
    slideDownScale: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 -translate-y-4 scale-95",
      enterEnd: "opacity-100 translate-y-0 scale-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-y-0 scale-100",
      leaveEnd: "opacity-0 -translate-y-4 scale-95"
    },
    slideUpScale: {
      enter: "transition-all duration-300",
      enterStart: "opacity-0 translate-y-4 scale-95",
      enterEnd: "opacity-100 translate-y-0 scale-100",
      leave: "transition-all duration-300",
      leaveStart: "opacity-100 translate-y-0 scale-100",
      leaveEnd: "opacity-0 translate-y-4 scale-95"
    },
    // Special effects
    pop: {
      enter: "transition-all duration-200",
      enterStart: "opacity-0 scale-90",
      enterEnd: "opacity-100 scale-105",
      leave: "transition-all duration-200",
      leaveStart: "opacity-100 scale-105",
      leaveEnd: "opacity-0 scale-90"
    },
    flip: {
      enter: "transition-all duration-300 ease-out",
      enterStart: "opacity-0 -rotate-45",
      enterEnd: "opacity-100 rotate-0",
      leave: "transition-all duration-300 ease-in",
      leaveStart: "opacity-100 rotate-0",
      leaveEnd: "opacity-0 -rotate-45"
    },
    drawer: {
      enter: "transition-all duration-300 ease-out",
      enterStart: "opacity-0 max-h-0 overflow-hidden",
      enterEnd: "opacity-100 max-h-screen",
      leave: "transition-all duration-300 ease-in",
      leaveStart: "opacity-100 max-h-screen",
      leaveEnd: "opacity-0 max-h-0 overflow-hidden"
    },
    collapse: {
      enter: "transition-all duration-300 ease-out",
      enterStart: "opacity-0 max-h-0 overflow-hidden",
      enterEnd: "opacity-100 max-h-96",
      leave: "transition-all duration-300 ease-in",
      leaveStart: "opacity-100 max-h-96",
      leaveEnd: "opacity-0 max-h-0 overflow-hidden"
    }
  }, transition = transitions[name] || transitions.fade;
  return `{${Object.keys(transition).map((prop) => {
    const escaped = (transition[prop] || "").replace(/'/g, "\\'");
    return `
    ${prop}: '${escaped}'`;
  }).join(",")}
}`;
}, aspectRatioClasses = (rw) => {
  const { aspectRatio, aspectRatioCustom } = rw.props, aspectRatioClasses2 = {
    "aspect-[auto]": rw.component.title == "Video" ? "aspect-video" : "aspect-[auto]",
    "aspect-[custom]": aspectRatioCustom
  };
  return classnames().add(aspectRatioClasses2[aspectRatio] || aspectRatio).toString();
}, objectClasses = (rw) => {
  const { aspectRatio, objectFit, objectPosition } = rw.props;
  return classnames([
    aspectRatio !== "aspect-[auto]" ? objectFit : "",
    objectPosition
  ]).toString();
}, bgColorClasses = (rw) => {
  const { bgColor, bgColorOpacity, bgColorHover, bgColorOpacityHover } = rw.props, classes = classnames();
  return bgColor && classes.add([bgColor, bgColorOpacity]), bgColorHover && classes.add([bgColorHover, `hover:${bgColorOpacityHover}`]), classes.toString();
}, bgGradient = (rw) => {
  const {
    bgGradientDirection: direction2,
    gradientFromColor: fromColor,
    gradientFromOpacity: fromOpacity2,
    gradientFromPosition: fromPosition2,
    gradientToColor: toColor,
    gradientToOpacity: toOpacity2,
    gradientToPosition: toPosition2,
    wantsGradientVia: wantsVia2,
    gradientViaColor: viaColor,
    gradientViaOpacity: viaOpacity2,
    gradientViaPosition: viaPosition2,
    bgGradientDirectionHover: directionHover,
    gradientFromColorHover: fromColorHover,
    gradientFromOpacityHover: fromOpacityHover,
    gradientFromPositionHover: fromPositionHover,
    gradientToColorHover: toColorHover,
    gradientToOpacityHover: toOpacityHover,
    gradientToPositionHover: toPositionHover,
    wantsGradientViaHover: wantsViaHover,
    gradientViaColorHover: viaColorHover,
    gradientViaOpacityHover: viaOpacityHover,
    gradientViaPositionHover: viaPositionHover
  } = rw.props;
  return classnames().add([
    direction2,
    `${fromColor}/${fromOpacity2}`,
    `${fromPosition2}`,
    `${toColor}/${toOpacity2}`,
    `${toPosition2}`,
    wantsVia2 === "true" && `${viaColor}/${viaOpacity2}`,
    wantsVia2 === "true" && `${viaPosition2}`,
    directionHover,
    fromColorHover && `${fromColorHover}/${fromOpacityHover}`,
    fromPositionHover && `${fromPositionHover}`,
    toColorHover && `${toColorHover}/${toOpacityHover}`,
    toPositionHover && `${toPositionHover}`,
    wantsViaHover === "true" && `${viaColorHover}/${viaOpacityHover}`,
    wantsViaHover === "true" && `${viaPositionHover}`
  ]).toString();
}, bgImage = (rw) => {
  const {
    bgImage: bgImage2,
    bgImagePositionX,
    bgImagePositionY,
    bgImageSize,
    bgImageRepeat,
    bgImageHover,
    bgImagePositionXHover,
    bgImagePositionYHover,
    bgImageSizeHover,
    bgImageRepeatHover
  } = rw.props;
  validateProps(
    [
      "bgImage",
      "bgImagePositionX",
      "bgImagePositionY",
      "bgImageSize",
      "bgImageRepeat",
      "bgImageHover",
      "bgImagePositionXHover",
      "bgImagePositionYHover",
      "bgImageSizeHover",
      "bgImageRepeatHover"
    ],
    rw.props
  );
  const hoverBg = bgImageHover ? `hover:bg-[url(${rw.getResource(bgImageHover, 1200)})]` : "", classes = classnames().add([
    `bg-[url(${rw.getResource(bgImage2, 1200)})]`,
    getBackgroundPosition(bgImagePositionX, bgImagePositionY),
    `bg-${bgImageSize}`,
    bgImageRepeat
  ]);
  return hoverBg && classes.add([
    hoverBg,
    `hover:${getBackgroundPosition(
      bgImagePositionXHover,
      bgImagePositionYHover
    )}`,
    `hover:bg-${bgImageSizeHover}`,
    `hover:${bgImageRepeatHover}`
  ]), classes.toString();
}, bgVideo = (rw) => {
  const { bgVideo: bgVideo2 } = rw.props;
  return validateProps(["bgVideo"], rw.props), classnames().add([
    `bg-[url(${rw.getResource(bgVideo2, 1200)})]`,
    "bg-center",
    "bg-cover"
  ]).toString();
}, getBackgroundPosition = (x, y) => {
  const mappings = {
    "center-top": "bg-top",
    "center-bottom": "bg-bottom",
    "left-center": "bg-left",
    "right-center": "bg-right",
    "center-center": "bg-center"
  }, key = `${x}-${y}`;
  return mappings[key] || `bg-${key}`;
}, backgroundClasses = (rw, modifier = "") => {
  const { bgType } = rw.props;
  if (!bgType)
    return console.error("backgroundClasses(): props.bgType is required."), "";
  switch (bgType) {
    case "color":
      return bgColorClasses(rw, modifier);
    case "gradient":
      return bgGradient(rw, modifier);
    case "image":
      return bgImage(rw, modifier);
    case "video":
      return bgVideo(rw, modifier);
    case "none":
      return "";
    default:
      return console.error("Invalid background type:", bgType), "";
  }
}, backgroundSimple = (rw) => {
  const { bgColor, bgColorOpacity, bgBlur, bgBoxShadow } = rw.props;
  return validateProps(
    ["bgColor", "bgColorOpacity", "bgBlur", "bgBoxShadow"],
    rw.props
  ), classnames().add([bgColor, bgColorOpacity, bgBlur, bgBoxShadow]).toString();
}, border = (rw, modifier) => globalBorder(rw, modifier), globalBorder = (rw) => {
  const {
    borderStyle,
    borderColor,
    borderColorOpacity,
    borderWidth,
    borderColorHover,
    borderColorOpacityHover,
    borderWidthHover
  } = rw.props;
  if (borderStyle === "border-none")
    return borderStyle;
  const borderClasses = [
    borderStyle,
    borderWidth,
    `${borderColor}/${borderColorOpacity}`
  ];
  return borderColorHover && borderClasses.push(`${borderColorHover}/${borderColorOpacityHover}`), borderWidthHover && borderClasses.push(borderWidthHover), classnames(borderClasses).toString();
}, boxShadow = (app) => {
  const { globalBoxShadow, globalBoxShadowHover } = app.props;
  return classnames().add([globalBoxShadow, globalBoxShadowHover]).toString();
}, globalButtonFontAndTextStyles = (rw, args = {}) => {
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
  } = rw.props, wantsFocus = args.focus || !1, wantsActive = args.active || !1, classes = classnames([
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
  return wantsFocus && classes.add([
    globalButtonFontAndTextStylesColorHover.replace("hover:", "focus:"),
    globalButtonFontAndTextStylesColorOpacityHover.replace("hover:", "focus:"),
    globalButtonFontAndTextStylesTextShadowHover.replace("hover:", "focus:")
  ]), wantsActive && classes.add([
    globalButtonFontAndTextStylesColorHover.replace("hover:", "data-[active=true]:"),
    globalButtonFontAndTextStylesColorOpacityHover.replace("hover:", "data-[active=true]:"),
    globalButtonFontAndTextStylesTextShadowHover.replace("hover:", "data-[active=true]:")
  ]), classes.toString();
}, buttonSimple = (rw) => {
  const {
    buttonSimpleSize,
    buttonSimpleFonts,
    buttonSimpleTextColor,
    buttonSimpleTextColorOpacity,
    buttonSimpleBgColor,
    buttonSimpleBgColorOpacity,
    buttonSimpleBoxShadow,
    buttonSimpleTextColorHover,
    buttonSimpleTextColorOpacityHover,
    buttonSimpleBgColorHover,
    buttonSimpleBgOpacityHover,
    buttonSimpleBoxShadowHover,
    buttonSimpleBorderRadius,
    buttonSimpleStyle,
    buttonSimpleStyleHover
  } = rw.props;
  validateProps(
    [
      "buttonSimpleSize",
      "buttonSimpleFonts",
      "buttonSimpleTextColor",
      "buttonSimpleTextColorOpacity",
      "buttonSimpleBgColor",
      "buttonSimpleBgColorOpacity",
      "buttonSimpleBoxShadow",
      "buttonSimpleTextColorHover",
      "buttonSimpleTextColorOpacityHover",
      "buttonSimpleBgColorHover",
      "buttonSimpleBgOpacityHover",
      "buttonSimpleBoxShadowHover",
      "buttonSimpleBorderRadius",
      "buttonSimpleStyle",
      "buttonSimpleStyleHover"
    ],
    rw.props
  );
  const buttonSizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }, isSolid = buttonSimpleStyle === "solid", isSolidHover = buttonSimpleStyleHover === "solid";
  return classnames().add([
    "flex items-center justify-center leading-none",
    "transition-all duration-200 ease-in-out cursor-pointer border-2",
    `border-${buttonSimpleBgColor}/${buttonSimpleBgColorOpacity}`,
    isSolid ? `bg-${buttonSimpleBgColor}/${buttonSimpleBgColorOpacity}` : "bg-transparent",
    buttonSizes[buttonSimpleSize] || buttonSizes.md,
    buttonSimpleFonts,
    `${buttonSimpleTextColor}/${buttonSimpleTextColorOpacity}`,
    buttonSimpleBoxShadow,
    `hover:${buttonSimpleTextColorHover}/${buttonSimpleTextColorOpacityHover}`,
    `hover:border-${buttonSimpleBgColorHover}/${buttonSimpleBgOpacityHover}`,
    isSolidHover ? `hover:bg-${buttonSimpleBgColorHover}/${buttonSimpleBgOpacityHover}` : "hover:bg-transparent",
    buttonSimpleBoxShadowHover,
    buttonSimpleBorderRadius
  ]).toString();
}, buttonSecondarySimple = (rw) => {
  const {
    buttonSecondarySimpleSize,
    buttonSecondarySimpleFonts,
    buttonSecondarySimpleStyle,
    buttonSecondarySimpleTextColor,
    buttonSecondarySimpleTextColorOpacity,
    buttonSecondarySimpleBgColor,
    buttonSecondarySimpleBgColorOpacity,
    buttonSecondarySimpleBoxShadow,
    buttonSecondarySimpleStyleHover,
    buttonSecondarySimpleTextColorHover,
    buttonSecondarySimpleTextColorOpacityHover,
    buttonSecondarySimpleBgColorHover,
    buttonSecondarySimpleBgOpacityHover,
    buttonSecondarySimpleBoxShadowHover,
    buttonSecondarySimpleBorderRadius
  } = rw.props;
  validateProps(
    [
      "buttonSecondarySimpleSize",
      "buttonSecondarySimpleFonts",
      "buttonSecondarySimpleStyle",
      "buttonSecondarySimpleTextColor",
      "buttonSecondarySimpleTextColorOpacity",
      "buttonSecondarySimpleBgColor",
      "buttonSecondarySimpleBgColorOpacity",
      "buttonSecondarySimpleBoxShadow",
      "buttonSecondarySimpleStyleHover",
      "buttonSecondarySimpleTextColorHover",
      "buttonSecondarySimpleTextColorOpacityHover",
      "buttonSecondarySimpleBgColorHover",
      "buttonSecondarySimpleBgOpacityHover",
      "buttonSecondarySimpleBoxShadowHover",
      "buttonSecondarySimpleBorderRadius"
    ],
    rw.props
  );
  const buttonSizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }, isSolid = buttonSecondarySimpleStyle === "solid", isSolidHover = buttonSecondarySimpleStyleHover === "solid";
  return classnames().add([
    "transition-all duration-200 ease-in-out",
    buttonSizes[buttonSecondarySimpleSize] || buttonSizes.md,
    buttonSecondarySimpleFonts,
    "flex items-center justify-center leading-none",
    "cursor-pointer border-2",
    `border-${buttonSecondarySimpleBgColor}/${buttonSecondarySimpleBgColorOpacity}`,
    isSolid ? `bg-${buttonSecondarySimpleBgColor}/${buttonSecondarySimpleBgColorOpacity}` : "bg-transparent",
    `${buttonSecondarySimpleTextColor}/${buttonSecondarySimpleTextColorOpacity}`,
    buttonSecondarySimpleBoxShadow,
    `hover:border-${buttonSecondarySimpleBgColorHover}/${buttonSecondarySimpleBgOpacityHover}`,
    isSolidHover ? `hover:bg-${buttonSecondarySimpleBgColorHover}/${buttonSecondarySimpleBgOpacityHover}` : "hover:bg-transparent",
    `${buttonSecondarySimpleTextColorHover}/${buttonSecondarySimpleTextColorOpacityHover}`,
    buttonSecondarySimpleBoxShadowHover,
    buttonSecondarySimpleBorderRadius
  ]).toString();
}, classnames = (initialClasses = "") => {
  let initialClassArray = Array.isArray(initialClasses) ? initialClasses : initialClasses.split(" ").filter(Boolean), classes = new Set(initialClassArray), currentModifier = "";
  return {
    /**
     * Adds one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to add.
     * @returns {Object} The classnames instance for chaining.
     */
    add(className) {
      return (Array.isArray(className) ? className : [className]).forEach((cls) => classes.add(cls)), this;
    },
    /**
     * Removes one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to remove.
     * @returns {Object} The classnames instance for chaining.
     */
    remove(className) {
      return (Array.isArray(className) ? className : [className]).forEach((cls) => classes.delete(cls)), this;
    },
    /**
     * Toggles one or more class names.
     *
     * @param {string|string[]} classToToggle - A single class name or an array of class names to toggle.
     * @returns {Object} The classnames instance for chaining.
     */
    toggle(className) {
      return (Array.isArray(className) ? className : [className]).forEach((cls) => {
        classes.has(cls) ? classes.delete(cls) : classes.add(cls);
      }), this;
    },
    /**
     * Sets a CSS modifier (e.g., 'hover', 'focus').
     *
     * @param {string} modifier - The modifier to set, with or without a trailing colon.
     * @returns {Object} The classnames instance for chaining.
     */
    modifier(modifier) {
      return modifier ? (currentModifier = modifier.replace(/:$/, "").trim(), this) : this;
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
}, contentAlignment = (rw) => {
  const {
    contentAlignmentVertical,
    contentAlignmentHorizontal,
    contentAlignmentTextAlign
  } = rw.props;
  return validateProps(
    [
      "contentAlignmentVertical",
      "contentAlignmentHorizontal",
      "contentAlignmentTextAlign"
    ],
    rw.props
  ), classnames().add([
    contentAlignmentVertical,
    contentAlignmentHorizontal,
    contentAlignmentTextAlign
  ]).toString();
}, globalAnimations = (app) => {
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
    globalScrollAnimationRepeat: repeat2,
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
  } = app.props, { mode } = app.project, gsapEase = isSpring ? `elastic.out(${springAmplitude}, ${springStrength})` : ease, gsapMargin = (value) => value < 0 ? `-=${Math.abs(value)}` : `+=${value}`, scrollTriggerStart = `${triggerElementPositionEnter}${gsapMargin(marginTop)} ${triggerViewportPositionEnter}${gsapMargin(marginBottom)}`, scrollTriggerEnd = `${triggerElementPositionExit}${gsapMargin(marginTop)} ${triggerViewportPositionExit}${gsapMargin(marginBottom)}`, gsapRepeat = triggerType == "instant" && repeat2 != "false" ? {
    repeat: repeat2 == "infinite" ? -1 : repeatTimes,
    yoyo: !!repeatYoyo,
    repeatDelay: repeatDelay / 1e3
  } : !1, onEnterFrom = {
    opacity: opacityEnterStart / 100,
    rotation: rotateEnterStart,
    scale: scaleEnterStart / 100,
    x: `${translateXEnterStart}%`,
    y: `${translateYEnterStart}%`,
    autoAlpha: 0,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  }, onEnterTo = {
    opacity: opacityEnterEnd / 100,
    rotation: rotateEnterEnd,
    scale: scaleEnterEnd / 100,
    x: `${translateXEnterEnd}%`,
    y: `${translateYEnterEnd}%`,
    autoAlpha: 1,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  }, onLeaveTo = {
    opacity: opacityExitEnd / 100,
    rotation: rotateExitEnd,
    scale: scaleExitEnd / 100,
    x: `${translateXExitEnd}%`,
    y: `${translateYExitEnd}%`,
    autoAlpha: 0,
    duration: duration / 1e3,
    ease: gsapEase,
    transformOrigin: origin.replace("-", " ")
  }, cssVarsFrom = Object.entries(onEnterFrom).map(([key, value]) => `[--scroll-animation-from-${key}:${value}]`).join(" "), cssVarsTo = Object.entries(onEnterTo).map(([key, value]) => `[--scroll-animation-to-${key}:${value}]`).join(" ");
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
      "data-animation-repeat": gsapRepeat ? JSON.stringify(gsapRepeat).replace(/"/g, "&quot;") : !1
    }
  };
}, globalBgColor = (app, args = {}) => {
  const {
    globalControlTypeBg: controlType,
    globalBgColor: color4,
    globalBgColorOpacity: opacity4,
    globalBgColorEnd: colorEnd,
    globalBgColorOpacityEnd: opacityEnd
  } = app.props, wantsPeer = (args == null ? void 0 : args.peer) || !1, wantsActive = (args == null ? void 0 : args.active) || !1, wantsFocus = (args == null ? void 0 : args.focus) || !1, classes = classnames([color4, opacity4, `dark:${opacity4}`]);
  return controlType == "hover" && (wantsPeer ? classes.add([
    colorEnd.replace(/hover:/g, "peer-hover:"),
    opacityEnd.replace(/hover:/g, "peer-hover:"),
    `dark:${opacityEnd.replace(/hover:/g, "peer-hover:")}`
  ]) : classes.add([colorEnd, opacityEnd, `dark:${opacityEnd}`]), wantsActive && classes.add([
    colorEnd.replace(/hover:/g, "data-[active=true]:"),
    opacityEnd.replace(/hover:/g, "data-[active=true]:"),
    `dark:${opacityEnd.replace(/hover:/g, "data-[active=true]:")}`
  ]), wantsFocus && classes.add([
    colorEnd.replace(/hover:/g, "focus:"),
    opacityEnd.replace(/hover:/g, "focus:"),
    `dark:${opacityEnd.replace(/hover:/g, "focus:")}`
  ])), classes.toString();
}, globalBgGradient = (app, args) => {
  const {
    globalControlTypeBg: controlType,
    globalBgGradientDirection: direction2,
    globalBgGradientDirectionEnd: directionEnd,
    globalBgGradientFromColor: fromColor,
    globalBgGradientFromOpacity: fromOpacity2,
    globalBgGradientFromPosition: fromPosition2,
    globalBgGradientViaEnabled: viaEnabled,
    globalBgGradientViaColor: viaColor,
    globalBgGradientViaOpacity: viaOpacity2,
    globalBgGradientViaPosition: viaPosition2,
    globalBgGradientToColor: toColor,
    globalBgGradientToOpacity: toOpacity2,
    globalBgGradientToPosition: toPosition2,
    globalBgGradientFromColorEnd: fromColorEnd,
    globalBgGradientFromOpacityEnd: fromOpacityEnd,
    globalBgGradientViaEnabledEnd: viaEnabledEnd,
    globalBgGradientViaColorEnd: viaColorEnd,
    globalBgGradientViaOpacityEnd: viaOpacityEnd,
    globalBgGradientToColorEnd: toColorEnd,
    globalBgGradientToOpacityEnd: toOpacityEnd
  } = app.props, wantsPeer = (args == null ? void 0 : args.peer) || !1, wantsActive = (args == null ? void 0 : args.active) || !1, wantsFocus = (args == null ? void 0 : args.focus) || !1, hasPrefix = (args == null ? void 0 : args.prefix) && (args == null ? void 0 : args.prefixCallback) || !1, prefixCallback = (args == null ? void 0 : args.prefixCallback) || (() => {
  }), classes = classnames([
    direction2,
    fromColor,
    fromOpacity2,
    fromPosition2,
    toColor,
    toOpacity2,
    toPosition2
  ]);
  return viaEnabled == "true" && classes.add([viaColor, viaOpacity2, viaPosition2]), controlType == "hover" && (wantsPeer ? classes.add([
    directionEnd.replace(/hover:/g, "peer-hover:"),
    fromColorEnd.replace(/hover:/g, "peer-hover:"),
    fromOpacityEnd.replace(/hover:/g, "peer-hover:"),
    toColorEnd.replace(/hover:/g, "peer-hover:"),
    toOpacityEnd.replace(/hover:/g, "peer-hover:")
  ]) : hasPrefix ? classes.add([
    prefixCallback(
      directionEnd.replace(/hover:/g, ""),
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
  ]) : classes.add([
    directionEnd,
    fromColorEnd,
    fromOpacityEnd,
    toColorEnd,
    toOpacityEnd
  ]), wantsActive && classes.add([
    directionEnd.replace(/hover:/g, "data-[active=true]:"),
    fromColorEnd.replace(/hover:/g, "data-[active=true]:"),
    fromOpacityEnd.replace(/hover:/g, "data-[active=true]:"),
    toColorEnd.replace(/hover:/g, "data-[active=true]:"),
    toOpacityEnd.replace(/hover:/g, "data-[active=true]:")
  ]), wantsFocus && classes.add([
    directionEnd.replace(/hover:/g, "focus:"),
    fromColorEnd.replace(/hover:/g, "focus:"),
    fromOpacityEnd.replace(/hover:/g, "focus:"),
    toColorEnd.replace(/hover:/g, "focus:"),
    toOpacityEnd.replace(/hover:/g, "focus:")
  ]), viaEnabledEnd == "true" && (wantsPeer ? classes.add([
    viaColorEnd.replace(/hover:/g, "peer-hover:"),
    viaOpacityEnd.replace(/hover:/g, "peer-hover:")
  ]) : hasPrefix ? classes.add([
    prefixCallback(
      viaColorEnd.replace(/hover:/g, ""),
      args.prefix
    ),
    prefixCallback(
      viaOpacityEnd.replace(/hover:/g, ""),
      args.prefix
    )
  ]) : classes.add([viaColorEnd, viaOpacityEnd]), wantsActive && classes.add([
    viaColorEnd.replace(/hover:/g, "data-[active=true]:"),
    viaOpacityEnd.replace(/hover:/g, "data-[active=true]:")
  ]), wantsFocus && classes.add([
    viaColorEnd.replace(/hover:/g, "focus:"),
    viaOpacityEnd.replace(/hover:/g, "focus:")
  ]))), classes.toString();
}, globalBgImage = (app, args) => {
  const {
    globalControlTypeBg: controlType,
    globalBgImageType: type2,
    globalBgImageCmsField: cmsField,
    globalBgImageResource: resource,
    globalBgImagePosition: position4,
    globalBgImageSize: size2,
    globalBgImageRepeat: repeat2,
    globalBgImageResourceEnd: resourceEnd,
    globalBgImagePositionEnd: positionEnd,
    globalBgImageSizeEnd: sizeEnd,
    globalBgImageRepeatEnd: repeatEnd
  } = app.props;
  if (type2 === "cms")
    return classnames([size2, repeat2, position4]).toString();
  const wantsPeer = (args == null ? void 0 : args.peer) || !1, wantsActive = (args == null ? void 0 : args.active) || !1, wantsFocus = (args == null ? void 0 : args.focus) || !1, hasPrefix = (args == null ? void 0 : args.prefix) && (args == null ? void 0 : args.prefixCallback) || !1, prefixCallback = (args == null ? void 0 : args.prefixCallback) || (() => {
  }), classes = classnames().add([
    `bg-[url(${resource == null ? void 0 : resource.image})]`,
    size2,
    repeat2,
    position4
  ]);
  return controlType == "hover" && (wantsPeer ? classes.add([
    `peer-hover:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
    sizeEnd.replace(/hover:/g, "peer-hover:"),
    repeatEnd.replace(/hover:/g, "peer-hover:"),
    positionEnd.replace(/hover:/g, "peer-hover:")
  ]) : hasPrefix ? classes.add([
    prefixCallback(`bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`, args.prefix),
    prefixCallback(sizeEnd.replace(/hover:/g, ""), args.prefix),
    prefixCallback(repeatEnd.replace(/hover:/g, ""), args.prefix),
    prefixCallback(positionEnd.replace(/hover:/g, ""), args.prefix)
  ]) : classes.add([
    `hover:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
    sizeEnd,
    repeatEnd,
    positionEnd
  ]), wantsActive && classes.add([
    `data-[active=true]:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
    sizeEnd.replace(/hover:/g, "data-[active=true]:"),
    repeatEnd.replace(/hover:/g, "data-[active=true]:"),
    positionEnd.replace(/hover:/g, "data-[active=true]:")
  ]), wantsFocus && classes.add([
    `focus:bg-[url(${resourceEnd == null ? void 0 : resourceEnd.image})]`,
    sizeEnd.replace(/hover:/g, "focus:"),
    repeatEnd.replace(/hover:/g, "focus:"),
    positionEnd.replace(/hover:/g, "focus:")
  ])), classes.toString();
}, globalBgVideoThumbnail = (app, args) => {
  const { globalBgVideo: video } = app.props;
  return classnames([
    `bg-[url(${video == null ? void 0 : video.image})] bg-cover bg-center`
  ]).toString();
}, globalBackground = (app, args = {}) => {
  const { globalControlTypeBg: controlType, globalBgType: type2 } = app.props;
  if (controlType == "none")
    return "";
  switch (type2) {
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
      return console.error("Invalid background type:", type2), "";
  }
}, globalBgImageFetchPriority = (rw) => {
  const {
    globalBgImageFetchPriority: globalBgImageFetchPriority2,
    globalBgType,
    globalBgImageResource,
    globalBgImageResourceEnd
  } = rw.props;
  if (globalBgType != "image")
    return {
      wantsFetchPriority: !1,
      linkElement: "",
      linkElementEnd: ""
    };
  const globalBgImageFetchPriorityEnabled = globalBgImageFetchPriority2 != "auto";
  let globalBgImageFetchPriorityLinkElement = "";
  globalBgImageResource != null && globalBgImageResource.image && (globalBgImageFetchPriorityLinkElement = `<link rel='preload' href='${globalBgImageResource == null ? void 0 : globalBgImageResource.image}' as='image' fetchpriority='${globalBgImageFetchPriority2}' />`);
  let globalBgImageFetchPriorityLinkElementEnd = "";
  return globalBgImageResourceEnd != null && globalBgImageResourceEnd.image && (globalBgImageFetchPriorityLinkElementEnd = `<link rel='preload' href='${globalBgImageResourceEnd == null ? void 0 : globalBgImageResourceEnd.image}' as='image' fetchpriority='${globalBgImageFetchPriority2}' />`), {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd
  };
}, globalBorders = (app, args = {}) => {
  const {
    globalControlTypeBorders: type2,
    globalBordersColor: color4,
    globalBordersColorOpacity: colorOpacity,
    globalBordersWidth: width,
    globalBordersRadius: radius,
    globalBordersStyle: style,
    globalBordersColorEnd: colorEnd,
    globalBordersColorOpacityEnd: colorOpacityEnd,
    globalBordersWidthEnd: widthEnd,
    globalBordersRadiusEnd: radiusEnd,
    globalBordersStyleEnd: styleEnd
  } = app.props, classes = [], { node } = app;
  node.isContainer = args.isContainer || !1;
  const wantsActive = args.active || !1, wantsFocus = args.focus || !1;
  if (type2 == "none")
    return "";
  classes.push(
    width,
    style,
    radius,
    color4.split(" ").filter(Boolean).map((c) => `${c.trim()}/${colorOpacity}`).join(" ")
  );
  const prefix2 = getHoverPrefix(node, "background", "self");
  if (type2 == "hover" && classes.push(
    widthEnd,
    radiusEnd,
    `${prefix2}:${styleEnd}`,
    colorEnd.split(" ").filter(Boolean).map((c) => `${prefix2}:${c.trim()}/${colorOpacityEnd}`).join(" ")
  ), wantsActive) {
    const endColor = type2 == "hover" ? colorEnd : color4, endWidth = type2 == "hover" ? widthEnd : width, endRadius = type2 == "hover" ? radiusEnd : radius, endStyle = type2 == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "data-[active=true]"),
      endRadius.replace(/hover/g, "data-[active=true]"),
      `data-[active=true]:${endStyle}`,
      endColor.split(" ").filter(Boolean).map((c) => `data-[active=true]:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  if (wantsFocus) {
    const endColor = type2 == "hover" ? colorEnd : color4, endWidth = type2 == "hover" ? widthEnd : width, endRadius = type2 == "hover" ? radiusEnd : radius, endStyle = type2 == "hover" ? styleEnd : style;
    classes.push(
      endWidth.replace(/hover/g, "focus"),
      endRadius.replace(/hover/g, "focus"),
      `${prefix2.replace(/hover/g, "focus")}:${endStyle}`,
      endColor.split(" ").filter(Boolean).map((c) => `${prefix2.replace(/hover/g, "focus")}:${c.trim()}/${colorOpacityEnd}`).join(" ")
    );
  }
  return classnames(classes).toString();
}, globalEffects = (app, args = {}) => {
  const {
    globalEffectsApplyTo: applyTo,
    globalControlTypeEffects: type2,
    globalHoverGroupEffects: hoverGroup,
    globalHoverGroupCustomIdEffects: customId,
    globalBoxShadow: boxShadow2,
    globalOpacity: opacity4,
    globalBoxShadowEnd: boxShadowEnd,
    globalOpacityEnd: opacityEnd
  } = app.props, { node } = app;
  node.isContainer = args.isContainer || !1;
  const wantsActive = args.active || !1, wantsFocus = args.focus || !1, prefix2 = getHoverPrefix(node, applyTo, hoverGroup, customId), classes = [];
  return type2 != "none" && classes.push(boxShadow2, opacity4), type2 == "hover" && (classes.push(`${prefix2}:${boxShadowEnd}`, `${prefix2}:${opacityEnd}`), wantsActive && classes.push(
    `data-[active=true]:${boxShadowEnd}`,
    `data-[active=true]:${opacityEnd}`
  ), wantsFocus && classes.push(
    `${prefix2.replace(/hover/g, "focus")}:${boxShadowEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${opacityEnd}`
  )), classnames(classes).toString();
}, globalFilter = (rw) => {
  const {
    globalFilterEnable: wantsFilter,
    globalFilterGroup: group,
    globalFilterCustomGroupId: groupId,
    globalFilterTransition: transition = null
  } = rw.props, { parent } = rw.node, filterGroupId = group == "parent" ? parent.id : groupId;
  return {
    wantsFilter,
    filterGroupId,
    transition,
    args: wantsFilter ? {
      "data-filter-group": filterGroupId,
      "data-filter-transition": transition
    } : {}
  };
}, globalFilters = (app, args = {}) => {
  const {
    globalControlTypeFilters: type2,
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
  } = app.props, { node } = app;
  node.isContainer = args.isContainer || !1;
  const wantsActive = args.active || !1, wantsFocus = args.focus || !1, prefix2 = getHoverPrefix(node, applyTo, hoverGroup, customId);
  if (type2 == "none")
    return "";
  const wantsBlur = !blur.endsWith("[0px]") || !blurEnd.endsWith("[0px]"), wantsBackdropBlur = !backdropBlur.endsWith("[0px]") || !backdropBlurEnd.endsWith("[0px]"), classes = [
    wantsBlur ? blur : "",
    brightness,
    dropShadow,
    saturate,
    wantsBackdropBlur ? backdropBlur : ""
  ];
  return type2 == "hover" && (classes.push(
    wantsBlur ? `${prefix2}:${blurEnd}` : "",
    `${prefix2}:${brightnessEnd}`,
    `${prefix2}:${dropShadowEnd}`,
    `${prefix2}:${saturateEnd}`,
    wantsBackdropBlur ? `${prefix2}:${backdropBlurEnd}` : ""
  ), wantsActive && classes.push(
    `data-[active=true]:${blurEnd}`,
    `data-[active=true]:${brightnessEnd}`,
    `data-[active=true]:${dropShadowEnd}`,
    `data-[active=true]:${saturateEnd}`,
    `data-[active=true]:${backdropBlurEnd}`
  ), wantsFocus && classes.push(
    `${prefix2.replace(/hover/g, "focus")}:${blurEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${brightnessEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${dropShadowEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${saturateEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${backdropBlurEnd}`
  )), classnames(classes).toString();
}, globalActAsGridOrFlexItem = (app) => {
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
    globalGridOrFlexItemJustifySelf: justifySelf,
    globalGridOrFlexItemOrder: order,
    globalGridOrFlexItemOrderCustom: orderCustom
  } = app.props;
  if (displayAs == "default")
    return !1;
  const classes = [];
  return displayAs == "flex" && classes.push(
    alignSelf,
    justifySelf,
    ...settingsType === "advanced" ? [
      flex,
      shrink,
      grow,
      basis == "custom" ? basisCustom : basis,
      order == "custom" ? orderCustom : order
    ] : []
  ), displayAs == "grid" && classes.push(
    colSpan,
    rowSpan,
    ...settingsType === "advanced" ? [
      colStart !== "col-start-auto" ? colStart : void 0,
      colEnd !== "col-end-auto" ? colEnd : void 0,
      rowStart !== "row-start-auto" ? rowStart : void 0,
      rowEnd !== "row-end-auto" ? rowEnd : void 0,
      alignSelf,
      justifySelf,
      order == "custom" ? orderCustom : order
    ] : []
  ), classnames(classes).toString();
}, globalHeadingTextColor = (rw, type2, prefix2) => {
  const {
    globalTextColor: color4,
    globalTextColorOpacity: opacity4,
    globalTextColorHover: colorHover,
    globalTextColorOpacityHover: opacityHover
  } = rw.props;
  return classnames([
    color4,
    opacity4,
    ...type2 == "hover" ? [
      addPrefixToTailwindClasses(colorHover, prefix2),
      addPrefixToTailwindClasses(opacityHover, prefix2)
    ] : []
  ]).toString();
}, globalHeadingColor = (rw) => {
  const {
    globalBgType,
    globalControlTypeBg: type2,
    globalHoverGroupBg: hoverGroup,
    globalHoverGroupCustomIdBg: customId
  } = rw.props, { mode } = rw.project, { node } = rw, prefix2 = getHoverPrefix(node, "", hoverGroup, customId);
  let classes = classnames([]);
  switch (globalBgType) {
    case "color":
      classes.add(globalHeadingTextColor(rw, type2, prefix2));
      break;
    case "gradient":
      classes.add([
        "bg-clip-text",
        "text-[transparent]",
        ...globalBgGradient(rw, {
          prefix: prefix2,
          prefixCallback: addPrefixToTailwindClasses
        }).split(" ").filter(Boolean)
      ]).modifier(mode == "edit" ? "[&_span]" : "");
      break;
    case "image":
      classes.add([
        "bg-clip-text",
        "text-[transparent]",
        ...globalBgImage(rw, {
          prefix: prefix2,
          prefixCallback: addPrefixToTailwindClasses
        }).split(" ").filter(Boolean)
      ]).modifier(mode == "edit" ? "[&_span]" : "");
      break;
  }
  return classes.toString();
}, globalInputFontAndTextStyles = (rw) => {
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
  return classnames([
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
  ]).toString();
}, getHiddenClasses = (hidden = {}, defaultDisplay = "block") => Object.keys(hidden).length === 0 ? defaultDisplay : Object.entries(hidden).reduce((classes, [breakpoint, isHidden]) => {
  const modifier = breakpoint === "base" ? "" : `${breakpoint}:`, className = isHidden ? `${modifier}hidden` : `${modifier}${defaultDisplay}`;
  return classes ? `${classes} ${className}` : className;
}, ""), globalLayout = (app, args = {}) => {
  const {
    globalLayoutPosition: position4,
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
  } = app.props, { globalLayoutHidden } = app.responsiveProps, { defaultDisplay } = args, hidden = getHiddenClasses(globalLayoutHidden, defaultDisplay);
  return classnames([
    position4,
    zIndexType !== "custom" ? zIndexType : zIndex,
    topRightBottomLeftType === "uniform" && inset,
    ...topRightBottomLeftType === "individual" ? [top, right, bottom, left].filter(Boolean) : [],
    overflow,
    isolation,
    visibility,
    hidden
  ]).toString();
}, globalLink = (app) => {
  var _a;
  const { globalLink: link = null } = app.props, hasLink = typeof link == "object" && Object.keys(link).length > 0 && link.href.length > 0;
  let linkAttributes = {
    hasLink,
    args: {}
  };
  if (!hasLink) return linkAttributes;
  const { href, title, target } = link, attrs = (_a = link.attributes) == null ? void 0 : _a.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
  return linkAttributes.args = {
    ...attrs,
    href,
    title,
    target
  }, linkAttributes;
}, globalMenuItem = (rw) => {
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
}, globalNavItems = (rw, isActive = !1) => {
  const {
    globalNavItemsTextColor: textColor2,
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
    textColor: textColor2,
    textColorOpacity,
    font,
    fontSize,
    textShadow,
    fontWeight,
    letterSpacing,
    italic,
    underline
  }, activeStyles = {
    ...inactiveStyles,
    textColor: textColorHover,
    textColorOpacity: textColorOpacityHover,
    textShadow: textShadowHover,
    underline: underlineHover
  }, activeStylesFormatted = Object.fromEntries(
    Object.entries(activeStyles).map(([key, value]) => [key, value.replace(/hover:/g, "")])
  ), hoverStyles = {
    textColorHover,
    textColorOpacityHover,
    textShadowHover,
    underlineHover
  };
  return classnames([
    ...Object.values(isActive ? activeStylesFormatted : inactiveStyles),
    ...Object.values(hoverStyles)
  ]).toString();
}, globalNavTitle = (rw) => {
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
}, globalOutline = (rw) => {
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
  } = rw.props, classes = classnames();
  return globalControlTypeOutline == "none" ? "" : (globalControlTypeOutline != "none" && classes.add([
    `${globalOutlineStyle}`,
    `${globalOutlineColor}/${globalOutlineColorOpacity}`,
    globalOutlineWidth,
    globalOutlineOffset
  ]), globalControlTypeOutline == "focus" && classes.add([
    `${globalOutlineColorFocus}/${globalOutlineColorOpacityFocus}`,
    globalOutlineWidthFocus,
    globalOutlineOffsetFocus
  ]), classes.toString());
}, globalOverlayColor = (app, prefix2) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayColor: color4,
    globalOverlayColorOpacity: opacity4,
    globalOverlayColorEnd: colorEnd,
    globalOverlayColorOpacityEnd: opacityEnd
  } = app.props, classes = classnames([color4, `${opacity4} dark:${opacity4}`]);
  return controlType == "hover" && classes.add([
    injectPrefixOnDarkModeColors(prefix2, `${prefix2}:${colorEnd}`),
    `${prefix2}:${opacityEnd}`,
    `dark:${prefix2}:${opacityEnd}`
  ]), classes.toString();
}, globalOverlayGradient = (app, prefix2) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayGradientDirection: direction2,
    globalOverlayGradientDirectionEnd: directionEnd,
    globalOverlayGradientFromColor: fromColor,
    globalOverlayGradientFromOpacity: fromOpacity2,
    globalOverlayGradientFromPosition: fromPosition2,
    globalOverlayGradientViaEnabled: viaEnabled,
    globalOverlayGradientViaColor: viaColor,
    globalOverlayGradientViaOpacity: viaOpacity2,
    globalOverlayGradientViaPosition: viaPosition2,
    globalOverlayGradientToColor: toColor,
    globalOverlayGradientToOpacity: toOpacity2,
    globalOverlayGradientToPosition: toPosition2,
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
  } = app.props, classes = classnames([
    direction2,
    `${fromColor}/${fromOpacity2}`,
    fromPosition2,
    `${toColor}/${toOpacity2}`,
    toPosition2
  ]);
  return viaEnabled == "true" && classes.add([
    `${viaColor}/${viaOpacity2}`,
    viaPosition2
  ]), controlType == "hover" && (classes.add([
    `${prefix2}:${directionEnd}`,
    `${prefix2}:${fromColorEnd}/${fromOpacityEnd}`,
    `${prefix2}:${fromPositionEnd}`,
    `${prefix2}:${toColorEnd}/${toOpacityEnd}`,
    `${prefix2}:${toPositionEnd}`
  ]), viaEnabledEnd == "true" && classes.add([
    `${prefix2}:${viaColorEnd}/${viaOpacityEnd}`,
    `${prefix2}:${viaPositionEnd}`
  ])), classes.toString();
}, globalOverlayImage = (app, prefix2) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayImageResource: resource,
    globalOverlayImagePositionX: x,
    globalOverlayImagePositionY: y,
    globalOverlayImageSize: size2,
    globalOverlayImageRepeat: repeat2,
    globalOverlayImageResourceEnd: resourceEnd,
    globalOverlayImagePositionXEnd: xEnd,
    globalOverlayImagePositionYEnd: yEnd,
    globalOverlayImageSizeEnd: sizeEnd,
    globalOverlayImageRepeatEnd: repeatEnd
  } = app.props, bgPosition2 = (horizontal, vertical) => {
    const mappings = {
      "center-top": "bg-top",
      "center-bottom": "bg-bottom",
      "left-center": "bg-left",
      "right-center": "bg-right",
      "center-center": "bg-center"
    }, key = `${horizontal}-${vertical}`;
    return mappings[key] || `bg-${key}`;
  }, classes = classnames().add([
    `bg-[url(${app.getResource(resource, 1200)})]`,
    size2,
    repeat2,
    bgPosition2(x, y)
  ]);
  return controlType == "hover" && classes.add([
    `${prefix2}:bg-[url(${app.getResource(resourceEnd, 1200)})]`,
    `${prefix2}:${sizeEnd}`,
    `${prefix2}:${repeatEnd}`,
    `${prefix2}:${bgPosition2(xEnd, yEnd)}`
  ]), classes.toString();
}, globalOverlay = (app, isContainer = !1) => {
  const { globalControlTypeOverlay: controlType, globalOverlayType: type2 } = app.props, { node } = app;
  node.isContainer = isContainer;
  const prefix2 = getHoverPrefix(node, "background", "self");
  if (controlType == "none")
    return "";
  switch (type2) {
    case "color":
      return globalOverlayColor(app, prefix2);
    case "gradient":
      return globalOverlayGradient(app, prefix2);
    case "image":
      return globalOverlayImage(app, prefix2);
    case "none":
      return "";
    default:
      return console.error("Invalid background type:", type2), "";
  }
}, globalReveal = (rw) => {
  const {
    revealAnimationName: name,
    revealAnimationDirection: direction2,
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
  } = rw.props, { title } = rw.node, revealID = `reveal-${title.replace(/\s+/g, "-").toLowerCase()}`, gsapTriggerPoints = {
    "entering-screen": "top bottom",
    "middle-of-screen": "top center",
    "exiting-screen": "top top"
  }, animationName = `${name}${direction2.charAt(0).toUpperCase() + direction2.slice(1)}In`, exitAnimationName = animationName.replace("In", "Out");
  return {
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
    "data-reveal-scrub": scrub || !1,
    "data-reveal-debug": debug || !1
  };
}, globalSizing = (app) => {
  const {
    globalHeight: height,
    globalWidth: width,
    globalSizingMinMaxEnabled: minMaxEnabled,
    globalMinWidth: minWidth,
    globalMaxWidth: maxWidth,
    globalMinHeight: minHeight,
    globalMaxHeight: maxHeight
  } = app.props, classes = classnames([width, height]);
  return minMaxEnabled == "true" && classes.add([minWidth, minHeight, maxWidth, maxHeight]), classes.toString();
}, globalSizingContainer = (app) => {
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
  } = app.props, widthClasses = {
    auto: "w-auto",
    full: "w-full",
    screen: "w-screen",
    container: "container w-full",
    theme: width
  }, heightClasses = {
    auto: "h-auto",
    full: "h-full",
    screen: "h-screen",
    theme: height
  }, classes = classnames([
    widthClasses[widthType],
    heightClasses[heightType]
  ]);
  return minMaxEnabled == "true" && classes.add([minWidth, minHeight, maxWidth, maxHeight]), classes.toString();
}, globalSpacing = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin,
    globalPadding: padding
  } = app.props;
  return enabled == "false" ? !1 : classnames([margin, padding]).toString();
}, globalSpacingPadding = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalPadding: padding
  } = app.props;
  return enabled == "false" ? !1 : padding;
}, globalSpacingMargin = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin
  } = app.props;
  return enabled == "false" ? !1 : margin;
}, globalTransforms = (app, args = {}) => {
  const {
    globalControlTypeTransforms: type2,
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
  } = app.props, { node } = app;
  node.isContainer = args.isContainer || !1;
  const wantsActive = args.active || !1, wantsFocus = args.focus || !1, prefix2 = getHoverPrefix(node, applyTo, hoverGroup, customId), classes = classnames();
  return type2 != "none" && classes.add([
    "transform",
    origin,
    scale,
    rotate,
    skewX,
    skewY,
    translateX,
    translateY
  ]), type2 == "hover" && (classes.add([
    addPrefixToTailwindClasses(scaleEnd, prefix2),
    addPrefixToTailwindClasses(rotateEnd, prefix2),
    addPrefixToTailwindClasses(skewXEnd, prefix2),
    addPrefixToTailwindClasses(skewYEnd, prefix2),
    addPrefixToTailwindClasses(translateXEnd, prefix2),
    addPrefixToTailwindClasses(translateYEnd, prefix2)
  ]), wantsActive && classes.add([
    `data-[active=true]:${scaleEnd}`,
    `data-[active=true]:${rotateEnd}`,
    `data-[active=true]:${skewXEnd}`,
    `data-[active=true]:${skewYEnd}`,
    `data-[active=true]:${translateXEnd}`,
    `data-[active=true]:${translateYEnd}`
  ]), wantsFocus && classes.add([
    `${prefix2.replace(/hover/g, "focus")}:${scaleEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${rotateEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${skewXEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${skewYEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${translateXEnd}`,
    `${prefix2.replace(/hover/g, "focus")}:${translateYEnd}`
  ])), classes.toString();
}, globalTransitions = (app, alwaysWantsHover = !1) => {
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
    globalTransitionsProperty: property,
    globalTransitionsDuration: duration,
    globalTransitionsDelay: delay,
    globalTransitionsTimingFunction: timingFunction,
    globalTransitionsTimingFunctionCustom: customTimingFunction
  } = app.props, customTimingFunctionFormatted = customTimingFunction == null ? void 0 : customTimingFunction.replace(/,\s/g, ",_");
  return alwaysWantsHover || globalFilterEnable || [
    globalControlTypeTransforms,
    globalControlTypeEffects,
    globalControlTypeFilters,
    globalControlTypeBorders,
    globalControlTypeBg,
    globalControlTypeSVGFill,
    globalControlTypeSVGStroke,
    globalControlTypeOverlay,
    globalControlTypeOutline
  ].some((prop) => !["none", "static", "", void 0, null].includes(prop)) ? classnames([
    // `transform-gpu will-change-transform`,
    property === "transition-default" ? "transition" : property,
    duration,
    delay,
    timingFunction === "custom" ? customTimingFunctionFormatted : timingFunction
  ]).toString() : "";
}, headingColorGradient = (rw) => {
  const {
    headingColorBgGradientDirection: bgGradientDirection,
    headingColorGradientFromColor: gradientFromColor,
    headingColorGradientFromOpacity: gradientFromOpacity,
    headingColorGradientFromPosition: gradientFromPosition,
    headingColorGradientToColor: gradientToColor,
    headingColorGradientToOpacity: gradientToOpacity,
    headingColorGradientToPosition: gradientToPosition,
    headingColorWantsGradientVia: wantsGradientVia,
    headingColorGradientViaColor: gradientViaColor,
    headingColorGradientViaOpacity: gradientViaOpacity,
    headingColorGradientViaPosition: gradientViaPosition,
    ...restProps
  } = rw.props, props = {
    props: {
      bgGradientDirection,
      gradientFromColor,
      gradientFromOpacity,
      gradientFromPosition,
      gradientToColor,
      gradientToOpacity,
      gradientToPosition,
      wantsGradientVia,
      gradientViaColor,
      gradientViaOpacity,
      gradientViaPosition,
      ...restProps
    },
    ...rw
  }, bgGradientClasses = bgGradient(props);
  return classnames(bgGradientClasses).add(["bg-clip-text", "text-[transparent]"]).modifier(rw.project.mode == "edit" ? "[&_p]" : "").toString();
}, headingColorImage = (rw) => {
  const {
    headingColorBgImage: bgImage2,
    headingColorBgImagePositionX: bgImagePositionX,
    headingColorBgImagePositionY: bgImagePositionY,
    headingColorBgImageSize: bgImageSize,
    headingColorBgImageRepeat: bgImageRepeat
  } = rw.props;
  return classnames().add(["bg-clip-text", "text-[transparent]"]).add([
    `bg-[url(${rw.getResource(bgImage2, 1200)})]`,
    getBackgroundPosition(bgImagePositionX, bgImagePositionY),
    `bg-${bgImageSize}`,
    bgImageRepeat
  ]).modifier(rw.project.mode == "edit" ? "[&_p]" : "").toString();
}, headingColor = (rw) => {
  const { headingColorType } = rw.props;
  if (!headingColorType)
    return console.error("props.headingColorType is required."), "";
  switch (headingColorType) {
    case "color":
      return textColor({
        props: {
          textColor: rw.props.headingColorTextColor,
          textColorOpacity: rw.props.headingColorTextColorOpacity,
          ...rw.props
        },
        ...rw
      });
    case "gradient":
      return headingColorGradient(rw);
    case "image":
      return headingColorImage(rw);
    default:
      return console.error(`Invalid headingColorType ${headingColorType}.`), "";
  }
}, headingFontsAndTextStyles = (rw, modifier) => {
  const {
    headingTextAlign,
    headingFonts,
    headingTextStyles,
    headingTextStylesFontWeight,
    headingTextStylesLetterSpacing,
    headingTextStylesLineHeight,
    headingItalic,
    headingTextShadow,
    headingTextTransform,
    headingTextDecoration,
    headingTextDecorationOffset,
    headingTextDecorationStyle,
    headingTextDecorationColor,
    headingTextDecorationOpacity
  } = rw.props;
  return classnames().add([
    headingTextAlign,
    headingFonts,
    headingTextStyles,
    headingTextStylesFontWeight,
    headingTextStylesLetterSpacing,
    headingTextStylesLineHeight,
    headingItalic,
    headingTextShadow,
    headingTextTransform
  ]).add(
    headingTextDecoration !== "no-underline" ? [
      headingTextDecoration,
      headingTextDecorationOffset,
      headingTextDecorationStyle,
      `${headingTextDecorationColor}/${headingTextDecorationOpacity}`
    ] : []
  ).modifier(modifier).toString();
}, headingSimple = (rw) => {
  const {
    headingSimpleTextAlign,
    headingSimpleTextColor,
    headingSimpleTextColorOpacity,
    headingSimpleFonts,
    headingSimpleTextStyles
  } = rw.props;
  return validateProps(
    [
      "headingSimpleTextAlign",
      "headingSimpleTextColor",
      "headingSimpleTextColorOpacity",
      "headingSimpleFonts",
      "headingSimpleTextStyles"
    ],
    rw.props
  ), classnames().add([
    headingSimpleTextAlign,
    `${headingSimpleTextColor}/${headingSimpleTextColorOpacity}`,
    headingSimpleFonts,
    headingSimpleTextStyles
  ]).toString();
}, _bgPosition = (x, y) => {
  const mappings = {
    "center-top": "bg-top",
    "center-bottom": "bg-bottom",
    "left-center": "bg-left",
    "right-center": "bg-right",
    "center-center": "bg-center"
  }, key = `${x}-${y}`;
  return mappings[key] || `bg-${key}`;
}, _bgColorClasses = (props = {}, state = null) => {
  const prefix2 = state === "hover" ? "hover:" : "";
  let color4, opacity4;
  return state === "hover" ? { bgColorHover: color4, bgColorOpacity: opacity4 } = props : { bgColor: color4, bgColorOpacity: opacity4 } = props, !color4 || !opacity4 ? (console.warn(
    "getBackgroundColorClasses(): One or more required properties are missing",
    { color: color4, opacity: opacity4, state }
  ), "") : `${prefix2}bg-${color4}/${opacity4}`;
}, _bgGradient = (props = {}, prefix2 = null) => !props.bgType || props.bgType !== "gradient" ? (console.warn("bgGradient(): bgType is not set to 'gradient'"), "") : (prefix2 === "hover:" ? {
  bgGradientDirection: direction,
  bgGradientStops: stops,
  bgColor: color,
  bgColorOpacity: opacity,
  bgColorPosition: position,
  bgColor2: color2,
  bgColor2Opacity: opacity2,
  bgColor2Position: position2,
  bgColor3: color3,
  bgColor3Opacity: opacity3,
  bgColor3Position: position3
} = props : {
  bgType: type,
  bgGradientDirection: direction,
  gradientFromColor: from,
  gradientFromOpacity: fromOpacity,
  gradientFromPosition: fromPosition,
  gradientToColor: to,
  gradientToOpacity: toOpacity,
  gradientToPosition: toPosition,
  wantsGradientVia: wantsVia,
  gradientViaColor: via,
  gradientViaOpacity: viaOpacity,
  gradientViaPosition: viaPosition
} = props, !direction || !from || !fromOpacity || !fromPosition || !to || !toOpacity || !toPosition || wantsVia && (!via || !viaOpacity || !viaPosition) ? (console.warn(
  "helpers.bgGradient(): One or more required properties are missing",
  {
    direction,
    from,
    fromOpacity,
    fromPosition,
    to,
    toOpacity,
    toPosition,
    wantsVia,
    via,
    viaOpacity,
    viaPosition
  }
), "") : [
  `${prefix2}${direction}`,
  `${prefix2}${from}/${fromOpacity} ${prefix2}${fromPosition}`,
  wantsVia == "true" ? `${prefix2}${via}/${viaOpacity} ${prefix2}${viaPosition}` : "",
  `${prefix2}${to}/${toOpacity} ${prefix2}${toPosition}`
].filter(Boolean).join(" ")), _bgImageClasses = (props = {}, state = null) => (state === "hover:" ? {
  bgImageHover: image,
  bgImagePositionX: positionX,
  bgImagePositionY: positionY,
  bgImageSize: size,
  bgImageRepeat: repeat
} = props : {
  bgImage: image,
  bgImagePositionX: positionX,
  bgImagePositionY: positionY,
  bgImageSize: size,
  bgImageRepeat: repeat
} = props, !image || !positionX || !positionY || !size || !repeat ? (console.warn(
  "bgImageClasses(): One or more required properties are missing",
  { image, positionX, positionY, size, repeat }
), "") : [
  `${prefix}bg-[url(${image.image})]`,
  `${prefix}${bgPosition(positionX, positionY)}`,
  `${prefix}bg-${size}`,
  `${prefix}${repeat}`
].filter(Boolean).join(" ")), getHTMLTag = (props = {}, fallback = "div") => {
  const { HTMLTag, HTMLTagCustom } = props;
  if (HTMLTag === "custom") {
    const regex = /[^a-zA-Z]/g, safeTag = HTMLTagCustom.replace(regex, "").toLowerCase();
    return safeTag !== "" ? safeTag : fallback;
  }
  return !HTMLTag || HTMLTag == "default" ? fallback : HTMLTag;
}, helpers = {
  bgColorClasses: _bgColorClasses,
  bgGradient: _bgGradient,
  bgPosition: _bgPosition,
  bgImageClasses: _bgImageClasses,
  getHTMLTag
}, galleryHelpers = {};
galleryHelpers.thumbnails = (app) => {
  var _a;
  const { resources: images } = app.props, { columns: cols } = app.responsiveProps, { screens, names } = app.theme.breakpoints;
  return (_a = images == null ? void 0 : images.resources) == null ? void 0 : _a.map((resource) => {
    const srcset = Object.entries(cols).map(([device, colNumber]) => {
      let deviceWidth = screens[device];
      if (device === "base") {
        const firstKey = names[0];
        deviceWidth = screens[firstKey] / colNumber;
      }
      return `${app.resizeResource(
        resource,
        deviceWidth / colNumber * 3
      )} ${deviceWidth}w`;
    }).join(", "), sizes = Object.entries(cols).map(([device, colNumber]) => {
      const deviceWidth = screens[device];
      if (device === "base")
        return `(max-width: ${screens[names[0]]}px) 100vw`;
      const sizePercent = Math.floor(1 / colNumber * 100);
      return `(min-width: ${deviceWidth}px) ${sizePercent}vw`;
    }).join(", ") + ", 100vw", fallback = app.resizeResource(resource, 800), alt = resource.caption || resource.author || "";
    return {
      ...resource,
      srcset,
      sizes,
      // Updated sizes attribute with fallback
      fallback,
      alt
    };
  });
};
const overlay = (rw) => {
  const { overlayColor, overlayOpacity, overlayBlur } = rw.props;
  return validateProps(["overlayColor", "overlayOpacity", "overlayBlur"], rw.props), classnames().add([overlayColor, overlayOpacity, overlayBlur]).toString();
}, extractBackgroundProps = (props, prefix2, keyMap) => Object.entries(keyMap).reduce((acc, [finalKey, suffix]) => {
  const propName = `${prefix2}${suffix}`;
  return props.hasOwnProperty(propName) && (acc[finalKey] = props[propName]), acc;
}, {}), mapPropsToBackground = (app, prefix2) => {
  if (!prefix2)
    return console.warn("mapPropsToBackground: prefix is required"), {};
  const { props } = app;
  return extractBackgroundProps(props, prefix2, {
    bgColor: "Color",
    bgColorOpacity: "ColorOpacity",
    bgGradientDirection: "GradientDirection",
    gradientFromColor: "GradientFromColor",
    gradientFromOpacity: "GradientFromOpacity",
    gradientFromPosition: "GradientFromPosition",
    gradientToColor: "GradientToColor",
    gradientToOpacity: "GradientToOpacity",
    gradientToPosition: "GradientToPosition",
    wantsGradientVia: "WantsGradientVia",
    gradientViaColor: "GradientViaColor",
    gradientViaOpacity: "GradientViaOpacity",
    gradientViaPosition: "GradientViaPosition"
  });
}, overlayClasses = (app) => {
  const overlayProps = mapPropsToBackground(app, "overlay"), { overlayBlur, overlayType } = app.props, bgColorClasses2 = () => {
    const { bgColor, bgColorOpacity, bgColorHover, bgColorOpacityHover } = overlayProps, classes2 = classnames();
    return bgColor && classes2.add([bgColor, bgColorOpacity]), bgColorHover && classes2.add([bgColorHover, `hover:${bgColorOpacityHover}`]), classes2.toString();
  }, bgGradient2 = () => {
    const {
      bgGradientDirection: direction2,
      gradientFromColor: fromColor,
      gradientFromOpacity: fromOpacity2,
      gradientFromPosition: fromPosition2,
      gradientToColor: toColor,
      gradientToOpacity: toOpacity2,
      gradientToPosition: toPosition2,
      wantsGradientVia: wantsVia2,
      gradientViaColor: viaColor,
      gradientViaOpacity: viaOpacity2,
      gradientViaPosition: viaPosition2,
      bgGradientDirectionHover: directionHover,
      gradientFromColorHover: fromColorHover,
      gradientFromOpacityHover: fromOpacityHover,
      gradientFromPositionHover: fromPositionHover,
      gradientToColorHover: toColorHover,
      gradientToOpacityHover: toOpacityHover,
      gradientToPositionHover: toPositionHover,
      wantsGradientViaHover: wantsViaHover,
      gradientViaColorHover: viaColorHover,
      gradientViaOpacityHover: viaOpacityHover,
      gradientViaPositionHover: viaPositionHover
    } = overlayProps;
    return classnames().add([
      direction2,
      `${fromColor}/${fromOpacity2}`,
      `${fromPosition2}`,
      `${toColor}/${toOpacity2}`,
      `${toPosition2}`,
      wantsVia2 === "true" && `${viaColor}/${viaOpacity2}`,
      wantsVia2 === "true" && `${viaPosition2}`,
      directionHover,
      fromColorHover && `${fromColorHover}/${fromOpacityHover}`,
      fromPositionHover && `${fromPositionHover}`,
      toColorHover && `${toColorHover}/${toOpacityHover}`,
      toPositionHover && `${toPositionHover}`,
      wantsViaHover === "true" && `${viaColorHover}/${viaOpacityHover}`,
      wantsViaHover === "true" && `${viaPositionHover}`
    ]).toString();
  }, classes = classnames([overlayBlur]);
  switch (overlayType) {
    case "color":
      classes.add([bgColorClasses2()]);
      break;
    case "gradient":
      classes.add([bgGradient2()]);
      break;
    default:
      console.error("Invalid background type:", overlayType);
  }
  return classes.toString();
}, revealConfig = (app) => {
  const {
    revealsEnabled: enabled,
    revealsMarkers: markers,
    revealsTimingDuration: duration,
    revealsTimingDelay: delay,
    revealsTimingFunction: timingFunction,
    revealsOrigin: origin,
    revealsScrub: scrub,
    revealsStartTriggerElement: startTriggerElement,
    revealsStartTriggerViewport: startTriggerViewport,
    revealsOnEnterAction: onEnterAction,
    revealsOnLeaveAction: onLeaveAction,
    revealsOnEnterBackAction: onEnterBackAction,
    revealsOnLeaveBackAction: onLeaveBackAction,
    revealsTranslateX: translateX,
    revealsTranslateY: translateY,
    revealsOpacity: opacity4,
    revealsRotate: rotate,
    revealsScale: scale,
    revealsBlur: blur,
    revealsSaturation: saturation,
    revealsTranslateXEnd: translateXEnd,
    revealsTranslateYEnd: translateYEnd,
    revealsOpacityEnd: opacityEnd,
    revealsRotateEnd: rotateEnd,
    revealsScaleEnd: scaleEnd,
    revealsBlurEnd: blurEnd,
    revealsSaturationEnd: saturationEnd
  } = app.props, { id } = app.node, { title: name } = app.component, { mode } = app.project, setConfig = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacity4) / 100)),
    x: translateX,
    y: translateY,
    rotation: rotate,
    scale: parseFloat(scale) / 100,
    filter: `blur(${parseFloat(blur) || 0}px) saturate(${parseFloat(saturation) || 0}%)`,
    transformOrigin: origin
  }, config = {
    trigger: `.${id}`,
    start: `${startTriggerElement} ${startTriggerViewport}`
  }, scrollTrigger = {
    start: `${startTriggerElement} ${startTriggerViewport}`,
    end: scrub == "true" ? "center center" : null,
    toggleActions: `${onEnterAction} ${onLeaveAction} ${onEnterBackAction} ${onLeaveBackAction}`,
    scrub,
    id: `${name}-${id.slice(0, 5)}`,
    markers: markers && mode != "publish"
  }, onEnter = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacityEnd) / 100)),
    x: translateXEnd,
    y: translateYEnd,
    rotation: rotateEnd,
    scale: parseFloat(scaleEnd) / 100,
    filter: `blur(${blurEnd}px) saturate(${saturationEnd}%)`,
    ease: timingFunction,
    duration: Math.max(0, parseFloat(duration) / 1e3),
    delay: Math.max(0, parseFloat(delay) / 1e3)
  }, onLeaveBack = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacity4) / 100)),
    x: parseFloat(translateX) || 0,
    y: parseFloat(translateY) || 0,
    rotation: parseFloat(rotate) || 0,
    scale: parseFloat(scale) / 100 || 1,
    filter: `blur(${parseFloat(blur) || 0}px) saturate(${parseFloat(saturation) || 0}%)`,
    ease: timingFunction,
    duration: (parseFloat(duration) || 0) / 1e3,
    delay: (parseFloat(delay) || 0) / 1e3
  }, rootElementArgs = enabled ? {
    "data-reveal": "",
    "data-reveal-name": name,
    "data-reveal-target": `reveal-${id}`,
    "data-reveal-set-config": JSON.stringify(setConfig).replace(/"/g, "'"),
    // "data-reveal-config": JSON.stringify(config).replace(/"/g, "'"),
    "data-reveal-on-enter": JSON.stringify(onEnter).replace(/"/g, "'"),
    "data-reveal-on-leave-back": JSON.stringify(onLeaveBack).replace(/"/g, "'"),
    "data-reveal-scroll-trigger": JSON.stringify(scrollTrigger).replace(/"/g, "'")
  } : {}, classes = {
    revealWrapper: enabled ? `reveal-${id}` : null
  };
  return {
    isEnabled: enabled,
    rootElementArgs,
    setConfig: JSON.stringify(setConfig).replace(/"/g, "'"),
    config: JSON.stringify(config).replace(/"/g, "'"),
    scrollTrigger: JSON.stringify(scrollTrigger).replace(/"/g, "'"),
    onEnter: JSON.stringify(onEnter).replace(/"/g, "'"),
    onLeaveBack: JSON.stringify(onLeaveBack).replace(/"/g, "'"),
    classes
  };
}, revealsSimpleAnimations = {
  fade: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  slideLeft: {
    from: {
      x: "-100%"
    },
    to: {
      x: 0
    }
  },
  slideRight: {
    from: {
      x: "100%"
    },
    to: {
      x: 0
    }
  },
  slideUp: {
    from: {
      y: "100%"
    },
    to: {
      y: 0
    }
  },
  slideDown: {
    from: {
      y: "-100%"
    },
    to: {
      y: 0
    }
  },
  grow: {
    from: {
      scale: 0
    },
    to: {
      scale: 1
    }
  }
}, revealsSimple = (app) => {
  const {
    revealsSimpleEnabled,
    revealsSimpleTimingDuration,
    revealsSimpleTimingDelay,
    revealsSimpleEffect,
    revealsSimpleTimingFunction,
    revealsSimpleScrub
  } = app.props, { id } = app.node, { name } = app.component, scrollTriggerConfig = {
    trigger: `.reveal-${id}`,
    start: "bottom 100%",
    end: "bottom 20%",
    toggleActions: "play none none none",
    duration: revealsSimpleTimingDuration / 1e3 || 1,
    delay: revealsSimpleTimingDelay / 1e3 || 0,
    ease: revealsSimpleTimingFunction || "linear",
    scrub: revealsSimpleScrub || !1
  }, rootElementArgs = {
    "data-reveal": "true",
    "data-reveal-name": `${name}-${id.slice(-4)}`,
    "data-reveal-target": `reveal-${id}`,
    "data-reveal-set-config": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].from).replace(/"/g, "'"),
    "data-reveal-on-enter": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].to).replace(/"/g, "'"),
    "data-reveal-on-exit": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].to).replace(/"/g, "'"),
    "data-reveal-scroll-trigger": JSON.stringify(scrollTriggerConfig).replace(/"/g, "'")
  };
  return {
    trigger: `reveal-${id}`,
    enabled: revealsSimpleEnabled,
    rootElementArgs
  };
}, size = (rw) => {
  const { width, widthCustom, height, heightCustom } = rw.props;
  return validateProps(["width", "widthCustom", "height", "heightCustom"], rw.props), classnames().add([
    width === "custom" ? widthCustom : width,
    height === "custom" ? heightCustom : height
  ]).toString();
}, subHeadingClasses = (rw, modifier) => {
  const {
    subHeadingColor,
    subHeadingColorOpacity,
    subHeadingFonts,
    subHeadingTextStyles,
    subHeadingTextStylesOverride,
    subHeadingTextStylesFontWeight,
    subHeadingTextStylesLetterSpacing,
    subHeadingTextStylesLineHeight
  } = rw.props;
  return validateProps(
    [
      "subHeadingColor",
      "subHeadingColorOpacity",
      "subHeadingFonts",
      "subHeadingTextStyles",
      "subHeadingTextStylesOverride",
      "subHeadingTextStylesFontWeight",
      "subHeadingTextStylesLetterSpacing",
      "subHeadingTextStylesLineHeight"
    ],
    rw.props
  ), classnames().add([
    subHeadingColor,
    subHeadingColorOpacity,
    subHeadingFonts,
    subHeadingTextStyles,
    subHeadingTextStylesOverride,
    subHeadingTextStylesFontWeight,
    subHeadingTextStylesLetterSpacing,
    subHeadingTextStylesLineHeight
  ]).modifier(modifier).toString();
}, textColor = (rw, modifier = "") => {
  const {
    textColor: textColor2,
    textColorOpacity,
    textColorHover,
    textColorOpacityHover
  } = rw.props;
  validateProps(
    [
      "textColor",
      "textColorOpacity",
      "textColorHover",
      "textColorOpacityHover"
    ],
    rw.props
  );
  const classes = classnames();
  return classes.add(`${textColor2}/${textColorOpacity}`), textColorHover && textColorOpacityHover && classes.add(`hover:${textColorHover}/${textColorOpacityHover}`), classes.modifier(modifier).toString();
}, textDecorationClasses = (rw, modifier = "") => {
  const {
    textTextDecoration,
    textTextDecorationOffset,
    textTextDecorationStyle,
    textTextDecorationColor
  } = rw.props;
  return validateProps(
    [
      "textTextDecoration",
      "textTextDecorationOffset",
      "textTextDecorationStyle",
      "textTextDecorationColor"
    ],
    rw.props
  ), classnames().add([
    textTextDecoration,
    textTextDecoration != "no-underline" && textTextDecorationOffset,
    textTextDecoration != "no-underline" && textTextDecorationStyle,
    textTextDecoration != "no-underline" && textTextDecorationColor
  ]).modifier(modifier).toString();
}, globalTextFontsAndTextStyles = (app) => {
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
}, textSimple = (rw) => {
  const {
    textSimpleTextAlign,
    textSimpleTextColor,
    textSimpleTextColorOpacity = "[100%]",
    textSimpleFonts,
    textSimpleTextStyles
  } = rw.props;
  return validateProps(
    [
      "textSimpleTextAlign",
      "textSimpleTextColor",
      "textSimpleTextColorOpacity",
      "textSimpleFonts",
      "textSimpleTextStyles"
    ],
    rw.props
  ), classnames().add([
    textSimpleTextAlign,
    `${textSimpleTextColor}/${textSimpleTextColorOpacity}`,
    textSimpleFonts,
    textSimpleTextStyles
  ]).toString();
}, textStylesClasses = (rw, modifier = "") => {
  const { props } = rw, {
    textStyles,
    textStylesOverride,
    textStylesFontWeight,
    textStylesLetterSpacing,
    textStylesLineHeight,
    textStylesHover
  } = props, classes = classnames();
  return validateProps(
    [
      "textStyles",
      "textStylesOverride",
      "textStylesFontWeight",
      "textStylesLetterSpacing",
      "textStylesLineHeight"
    ],
    props
  ), classes.add([textStyles, textStylesHover]).modifier(modifier), textStylesOverride === "true" && classes.add([
    textStylesFontWeight,
    textStylesLetterSpacing,
    textStylesLineHeight
  ]), classes.toString();
}, transformsClasses = (app) => {
  const {
    transformsWantsEffectsInEditor: wantsEffectsInEditor,
    transformsEnabled: enabled,
    transformsTimingDuration: duration,
    transformsTimingDelay: delay,
    transformsTimingFunction: timingFunction,
    transformsOrigin: origin,
    transformsApplyTo: applyTo,
    transformsMode: mode,
    transformsTriggerElement: modeElement,
    transformsTriggerOnce: triggerOnce,
    transformsThreshold: threshold,
    transformsTranslateX: translateX,
    transformsTranslateY: translateY,
    transformsSkewX: skewX,
    transformsSkewY: skewY,
    transformsOpacity: opacity4,
    transformsRotate: rotate,
    transformsScale: scale,
    transformsBlur: blur,
    transformsBrightness: brightness,
    transformsSaturation: saturation,
    transformsTranslateXActive: translateXActive,
    transformsTranslateYActive: translateYActive,
    transformsSkewXActive: skewXActive,
    transformsSkewYActive: skewYActive,
    transformsOpacityActive: opacityActive,
    transformsRotateActive: rotateActive,
    transformsScaleActive: scaleActive,
    transformsBlurActive: blurActive,
    transformsBrightnessActive: brightnessActive,
    transformsSaturationActive: saturationActive
  } = app.props;
  if (!enabled)
    return {
      classes: {
        general: "",
        from: "",
        to: ""
      },
      rootElementArgs: {}
    };
  const { mode: projectMode } = app.project, { id } = app.node, addEffects = projectMode !== "edit" || wantsEffectsInEditor, triggerElement = !applyTo || applyTo === "everything" ? modeElement : modeElement === "self" ? app.node.id : modeElement, hoverPrefix = triggerElement === "self" || !triggerElement ? "hover:" : `group-hover/${triggerElement}:`, prefix2 = mode === "hover" ? hoverPrefix : "", motionClass = "transform-gpu transition-all reduce-motion:transition-none", effectClasses = addEffects ? [translateX, translateY, skewX, skewY, opacity4, rotate, scale, blur, brightness, saturation] : [], hoverEffectClasses = addEffects && mode === "hover" ? [
    `${prefix2}${translateXActive}`,
    `${prefix2}${translateYActive}`,
    `${prefix2}${skewXActive}`,
    `${prefix2}${skewYActive}`,
    `${prefix2}${opacityActive}`,
    `${prefix2}${rotateActive}`,
    `${prefix2}${scaleActive}`,
    `${prefix2}${blurActive}`,
    `${prefix2}${brightnessActive}`,
    `${prefix2}${saturationActive}`
  ] : [], general = classnames([
    ...[motionClass, duration, delay, timingFunction, origin],
    ...effectClasses,
    ...hoverEffectClasses
  ]).toString(), from2 = classnames([
    translateX,
    translateY,
    skewX,
    skewY,
    opacity4,
    rotate,
    scale,
    blur,
    brightness,
    saturation
  ]).toString(), to2 = classnames([
    translateXActive,
    translateYActive,
    skewXActive,
    skewYActive,
    opacityActive,
    rotateActive,
    scaleActive,
    blurActive,
    brightnessActive,
    saturationActive
  ]).toString();
  return {
    classes: {
      general,
      from: from2,
      to: to2
    },
    rootElementArgs: mode !== "click" ? {} : {
      "x-data": `effectsTransforms('${modeElement}')`,
      "x-bind": "item",
      "data-from": from2,
      "data-to": to2
    }
  };
}, validateProps = (requiredKeys, props) => {
  const missingKeys = requiredKeys.filter((key) => !props[key]);
  return missingKeys.length > 0 ? (console.warn(`Missing properties: ${missingKeys.join(", ")}`), !1) : !0;
}, transformHook = (rw) => {
  var _a, _b;
  const {
    globalID,
    imageType,
    imageIntrinsicWidth,
    imageIntrinsicHeight,
    image: image2,
    imageDark,
    imageAlt,
    imageSizingType,
    imageProtection,
    imageFetchPriority,
    wantsLightbox,
    imageLightboxColor,
    imageLightboxColorOpacity,
    imageLightboxGlobalFiltersBackdropBlur
  } = rw.props, {
    imageFileSize,
    imageCmsField: responsiveImageCmsField,
    imageCmsFieldDark: responsiveImageCmsFieldDark,
    imageCustomSource,
    imageCustomSourceDark
  } = rw.responsiveProps, { breakpoints } = rw.theme, { names, screens } = breakpoints, { mode } = rw.project, { assetPath, sharedAssetPath } = rw.component, link = globalLink(rw), wantsCustomSizing = imageSizingType == "custom", wantsFetchPriority = imageFetchPriority != "auto", isEditMode = mode == "edit", isCMSImage = imageType == "cms", isCustomImage = imageType == "custom", isResourceImage = imageType == "resource", generateResponsiveImageData = (resourceObject) => resourceObject ? {
    sources: names.filter((name) => resourceObject[name] && screens[name]).sort((a, b) => screens[b] - screens[a]).map((name) => ({
      media: `(min-width: ${screens[name]}px)`,
      srcset: resourceObject[name],
      breakpoint: name,
      minWidth: screens[name]
    })),
    fallbackSrc: resourceObject.base,
    baseSrc: resourceObject.base
  } : null, generateResourceSources = (resource) => wantsCustomSizing ? {
    sources: names.filter((name) => imageFileSize[name]).sort((a, b) => screens[b] - screens[a]).map((name) => ({
      media: `(min-width: ${screens[name]}px)`,
      srcset: rw.resizeResource(resource, imageFileSize[name] * 2),
      breakpoint: name,
      minWidth: screens[name]
    })),
    fallbackSrc: resource,
    baseSrc: resource
  } : resource, generateDefaultSrc = (resource) => wantsCustomSizing ? {
    ...resource,
    image: rw.resizeResource(resource, imageFileSize.base * 2)
  } : resource, responsiveImageData = generateResponsiveImageData(
    isCMSImage ? responsiveImageCmsField : imageCustomSource
  ), responsiveImageDataDark = generateResponsiveImageData(
    isCMSImage ? responsiveImageCmsFieldDark : imageCustomSourceDark
  ), imageCustomSrc = isEditMode && isCMSImage ? `${sharedAssetPath}/images/image-square.png` : (responsiveImageData == null ? void 0 : responsiveImageData.baseSrc) || `${sharedAssetPath}/images/image-square.png`, imageCustomSrcDark = isEditMode && isCMSImage ? `${sharedAssetPath}/images/image-square.png` : (responsiveImageDataDark == null ? void 0 : responsiveImageDataDark.baseSrc) || `${sharedAssetPath}/images/image-square.png`, lightImage = isResourceImage ? {
    resource: generateDefaultSrc(image2),
    ...generateResourceSources(image2)
  } : {
    resource: {
      image: imageCustomSrc
    },
    ...responsiveImageData
  }, darkImage = isResourceImage ? {
    resource: generateDefaultSrc(imageDark),
    ...generateResourceSources(imageDark)
  } : {
    resource: {
      image: imageCustomSrcDark
    },
    ...responsiveImageDataDark
  }, classes = {
    wrapper: classnames([
      "transform-gpu",
      globalLayout(rw),
      globalSizing(rw),
      globalSpacing(rw),
      advancedClasses(rw)
    ]).toString(),
    img: classnames([
      wantsLightbox && "cursor-zoom-in",
      "max-w-[100%] w-full",
      globalTransitions(rw),
      globalEffects(rw),
      globalTransforms(rw),
      globalFilters(rw),
      globalBorders(rw),
      // displaySize(),
      objectClasses(rw),
      rw.props.aspectRatio == "aspect-[auto]" ? `aspect-[${image2 == null ? void 0 : image2.aspect}]` : aspectRatioClasses(rw)
    ]).toString(),
    lightbox: {
      overlay: classnames([
        "fixed inset-0",
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
  }), globalID.length > 0 && rw.addAnchor(globalID), rw.setProps({
    isCMSImage,
    isCustomImage,
    isResourceImage,
    isEditMode,
    lightImage,
    hasDarkImage: ((_a = darkImage.resource) == null ? void 0 : _a.image) || !1,
    darkImage,
    hasImage: ((_b = lightImage.resource) == null ? void 0 : _b.image) || !1,
    imageProtection,
    defaultSrc: image2,
    alt: imageAlt,
    classes,
    imageWidth: isResourceImage ? image2 == null ? void 0 : image2.width : imageIntrinsicWidth,
    imageHeight: isResourceImage ? image2 == null ? void 0 : image2.height : imageIntrinsicHeight,
    assetPath,
    sharedAssetPath,
    wantsLightbox: wantsLightbox && mode != "edit",
    id: rw.node.id,
    wantsFetchPriority
  });
};
exports.transformHook = transformHook;