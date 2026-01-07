const globalOverlayColor = (app, prefix) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayColor: color,
    globalOverlayColorOpacity: opacity,
    globalOverlayColorEnd: colorEnd,
    globalOverlayColorOpacityEnd: opacityEnd,
  } = app.props;

  const classes = classnames([color, `${opacity} dark:${opacity}`]);

  if (controlType == "hover") {
    classes.add([
      injectPrefixOnDarkModeColors(prefix, `${prefix}:${colorEnd}`),
      `${prefix}:${opacityEnd}`,
      `dark:${prefix}:${opacityEnd}`,
    ]);
  }

  return classes.toString();
}

const globalOverlayGradient = (app, prefix) => {
  const {
    globalControlTypeOverlay: controlType,
    globalOverlayGradientDirection: direction,
    globalOverlayGradientDirectionEnd: directionEnd,

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
    globalOverlayGradientToPositionEnd: toPositionEnd,
  } = app.props;

  const classes = classnames([
    direction,
    `${fromColor}/${fromOpacity}`,
    fromPosition,
    `${toColor}/${toOpacity}`,
    toPosition,
  ])

  if (viaEnabled == 'true') {
    classes.add([
      `${viaColor}/${viaOpacity}`,
      viaPosition,
    ])
  }

  if (controlType == "hover") {
    classes.add([
      `${prefix}:${directionEnd}`,
      `${prefix}:${fromColorEnd}/${fromOpacityEnd}`,
      `${prefix}:${fromPositionEnd}`,
      `${prefix}:${toColorEnd}/${toOpacityEnd}`,
      `${prefix}:${toPositionEnd}`,
    ])

    if (viaEnabledEnd == 'true') {
      classes.add([
        `${prefix}:${viaColorEnd}/${viaOpacityEnd}`,
        `${prefix}:${viaPositionEnd}`,
      ])
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
    globalOverlayImageRepeatEnd: repeatEnd,
  } = app.props;

  // @TODO: add responsive image support
  // loop over breakpoints, resize image, and add {breakpoint}:bg-[url()] classes

  const bgPosition = (horizontal, vertical) => {
    const mappings = {
      "center-top": "bg-top",
      "center-bottom": "bg-bottom",
      "left-center": "bg-left",
      "right-center": "bg-right",
      "center-center": "bg-center",
    };

    const key = `${horizontal}-${vertical}`;
    return mappings[key] || `bg-${key}`;
  };

  const classes = classnames().add([
    `bg-[url(${app.getResource(resource, 1200)})]`,
    size,
    repeat,
    bgPosition(x, y),
  ]);

  if (controlType == "hover") {
    classes.add([
      `${prefix}:bg-[url(${app.getResource(resourceEnd, 1200)})]`,
      `${prefix}:${sizeEnd}`,
      `${prefix}:${repeatEnd}`,
      `${prefix}:${bgPosition(xEnd, yEnd)}`,
    ]);
  }

  return classes.toString();
};

const globalOverlay = (app, isContainer = false) => {
  const { globalControlTypeOverlay: controlType, globalOverlayType: type } = app.props;

  const { node } = app;

  node.isContainer = isContainer;
  const prefix = getHoverPrefix(node, 'background', 'self');
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
}
