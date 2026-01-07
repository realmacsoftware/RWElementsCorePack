/**
 * Generates background gradient classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @param {string} [modifier=""] - Optional CSS modifier (e.g., 'hover', 'focus').
 * @returns {string} The generated class string.
 */
const headingColorGradient = (rw) => {
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
  } = rw.props;

  const props = {
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
      ...restProps,
    },
    ...rw,
  };

  const bgGradientClasses = bgGradient(props);

  return classnames(bgGradientClasses)
    .add(["bg-clip-text", "text-[transparent]"])
    .modifier(rw.project.mode == "edit" ? "[&_p]" : "")
    .toString();
};

/**
 * Generates background image classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @param {string} [modifier=""] - Optional CSS modifier (e.g., 'hover', 'focus').
 * @param {Object} rw - The resource wrapper object for handling images.
 * @returns {string} The generated class string.
 */
const headingColorImage = (rw) => {
  const {
    headingColorBgImage: bgImage,
    headingColorBgImagePositionX: bgImagePositionX,
    headingColorBgImagePositionY: bgImagePositionY,
    headingColorBgImageSize: bgImageSize,
    headingColorBgImageRepeat: bgImageRepeat,
  } = rw.props;

  // @TODO: add responsive image support
  // loop over breakpoints, resize image, and add {breakpoint}:bg-[url()] classes

  return classnames()
    .add(["bg-clip-text", "text-[transparent]"])
    .add([
      `bg-[url(${rw.getResource(bgImage, 1200)})]`,
      getBackgroundPosition(bgImagePositionX, bgImagePositionY),
      `bg-${bgImageSize}`,
      bgImageRepeat,
    ])
    .modifier(rw.project.mode == "edit" ? "[&_p]" : "")
    .toString();
};

/**
 * Generates background classes based on props and an optional modifier.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @param {Object} [rw=null] - The resource wrapper object for handling images.
 * @returns {string} The generated class string.
 */
const headingColor = (rw) => {
  const { headingColorType } = rw.props;

  if (!headingColorType) {
    console.error("props.headingColorType is required.");
    return "";
  }

  switch (headingColorType) {
    case "color":
      return textColor({
        props: {
          textColor: rw.props.headingColorTextColor,
          textColorOpacity: rw.props.headingColorTextColorOpacity,
          ...rw.props,
        },
        ...rw,
      });
    case "gradient":
      return headingColorGradient(rw);
    case "image":
      return headingColorImage(rw);
    default:
      console.error(`Invalid headingColorType ${headingColorType}.`);
      return "";
  }
};
