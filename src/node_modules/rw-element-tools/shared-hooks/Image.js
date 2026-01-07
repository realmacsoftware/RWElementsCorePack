const generateImageAttributes = (
  entries,
  getMedia,
  getWidthClass,
  rw,
  image
) => {
  const sources = [];
  const widthClasses = [];

  entries.forEach(([device, value]) => {
    if (!value) return;

    sources.push({
      src: rw.resizeResource(image, value * 2),
      media: getMedia(device, value),
    });

    const widthClassQuery = device === "base" ? "" : `${device}:`;
    widthClasses.push(getWidthClass(device, value, widthClassQuery));
  });

  return { sources, widthClasses };
};

// generates the sources and width classes for the image
// used for <picture> elements
// e.g:
// const resizeType = "devices" | "custom" | "none";
// const { sources, widthClasses } = (
//     imageResizeHandlers[resizeType] || imageResizeHandlers.default
// )(rw, image);
const imageResizeHandlers = {
  none: (rw, image) => ({
    sources: [{ srcset: image.image, media: "(min-width: 0px)" }],
    widthClasses: [],
  }),
  devices: (rw, image) =>
    generateImageAttributes(
      Object.entries(rw.theme.breakpoints.screens),
      (_, breakpoint) => `(max-width: ${breakpoint}px)`,
      (device, breakpoint, query) => `${query}max-w-[${breakpoint}px]`,
      rw,
      image
    ),
  custom: (rw, image) =>
    generateImageAttributes(
      Object.entries(rw.responsiveProps.customWidth),
      (device) =>
        device === "base"
          ? "(min-width: 0px)"
          : `(min-width: ${rw.theme.breakpoints.screens[device]}px)`,
      (device, deviceWidth, query) => `${query}max-w-[${deviceWidth}px]`,
      rw,
      image
    ),
  default: (rw, image) => {
    console.error(`Unknown resizeType: ${rw.props.resizeType}`);
    return { sources: [], widthClasses: [] };
  },
};

const imageSrcsetGenerators = {
  none: (rw, image) => ({
    sources: [{ srcset: image.image, media: "0w" }],
    widthClasses: [],
  }),
  devices: (rw, image) =>
    generateImageAttributes(
      Object.entries(rw.theme.breakpoints.screens),
      (_, breakpoint) => `${breakpoint}w`,
      (device, breakpoint, query) => `${query}max-w-[${breakpoint}px]`,
      rw,
      image
    ),
  custom: (rw, image) =>
    generateImageAttributes(
      Object.entries(rw.responsiveProps.customWidth),
      (_, value) => `${value}w`,
      (device, deviceWidth, query) => `${query}max-w-[${deviceWidth}px]`,
      rw,
      image
    ),
  default: (rw, image) => {
    console.error(`Unknown resizeType: ${rw.props.resizeType}`);
    return "nope";
  },
};

const imageSrcset = (rw, image) => {

  if (!image) return { srcset: [], defaultSrc: "" };
  const { resizeType } = rw.props;
  const { breakpoints } = rw.theme;
  const { names, screens } = breakpoints;
  const { isInternalResource } = image;
  
  if (isInternalResource) {
    return {
      srcset: [],
      defaultSrc: image.image,
    };
  }

  const generateSrcset = (sizes) =>
    names
      .map(
        (name) =>
          sizes[name] &&
          `${rw.resizeResource(image, sizes[name] * 2)} ${sizes[name]
          }w`
      )
      .filter(Boolean)
      .join(", ");

  let defaultSrc = rw.resizeResource(image, (screens.sm || 640) * 2);

  if (resizeType === "devices") {
    return {
      srcset: generateSrcset(screens),
      defaultSrc,
    };
  }

  if (resizeType === "custom") {
    const { customWidth } = rw.responsiveProps;
    defaultSrc = rw.resizeResource(image, customWidth.base * 2);

    return {
      srcset: generateSrcset(customWidth),
      defaultSrc,
    };
  }

  if (resizeType === "none") {
    return {
      srcset: [],
      defaultSrc: image.image,
    };
  }

  return {
    srcset: [],
    defaultSrc,
  };
};

const imageSizesArray = (rw) => {
  const { resizeType } = rw.props;
  const { breakpoints } = rw.theme;
  const { names, screens } = breakpoints;

  if (resizeType === "devices") {
    return Object.entries(screens)
      .map(([_, value]) => `(max-width: ${value}px) ${value}px`)
      .join(", ");
  }

  if (resizeType === "custom") {
    const { customWidth } = rw.responsiveProps;
    const sizes = [];

    names.forEach((name) => {
      const value = customWidth[name];
      if (!value) return;

      sizes.push(
        !screens[name]
          ? `${value}px`
          : `(min-width: ${screens[name]}px) ${value}px`
      );
    });

    return sizes.reverse().join(", ");
  }

  return "100vw";
};
