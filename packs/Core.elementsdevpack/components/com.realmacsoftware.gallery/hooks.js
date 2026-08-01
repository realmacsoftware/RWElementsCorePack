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
const transformHook = (rw) => {
  var _a;
  const {
    globalID,
    sourceType,
    resources,
    remoteFolderURL,
    columns,
    gap,
    thumbnailAlignment,
    thumbnailMetaMargin,
    thumbnailSpacing,
    thumbnailShowCaption,
    thumbnailCaptionColor,
    thumbnailCaptionFont,
    thumbnailCaptionFontSize,
    thumbnailShowAuthor,
    thumbnailAuthorColor,
    thumbnailAuthorFont,
    thumbnailAuthorFontSize,
    thumbnailAspectRatio,
    thumbnailGlobalBordersRadius: thumbnailBorderRadius,
    thumbnailGlobalBoxShadow: thumbnailShadow,
    lightboxPreview,
    overlayColor,
    overlayOpacity,
    overlayBlur,
    lightboxMediaGlobalBordersRadius: lightboxMediaBorderRadius,
    lightboxMediaGlobalBoxShadow: lightboxMediaShadow,
    lightboxMetaAlignment,
    lightboxMetaMargin,
    lightboxMetaSpacing,
    lightboxShowCaption,
    lightboxCaptionColor,
    lightboxCaptionFont,
    lightboxCaptionFontSize,
    lightboxShowAuthor,
    lightboxAuthorColor,
    lightboxAuthorFont,
    lightboxAuthorFontSize,
    navigationRadius,
    navigationPadding,
    navigationSize,
    navigationState,
    navigationCloseButtonBackground,
    navigationCloseButtonBackgroundHover,
    navigationCloseButtonIconColor,
    navigationCloseButtonIconColorHover,
    navigationCloseButtonOpacity,
    navigationCloseButtonOpacityHover,
    navigationNextPreviousButtonBackground,
    navigationNextPreviousButtonBackgroundHover,
    navigationNextPreviousButtonIconColor,
    navigationNextPreviousButtonIconColorHover,
    navigationNextPreviousButtonOpacity,
    navigationNextPreviousButtonOpacityHover
  } = rw.props;
  const { screens } = rw.theme.breakpoints;
  const { id } = rw.node;
  const edit = rw.project.mode === "edit";
  const isRemote = sourceType === "remote";
  const remotePublished = isRemote && !edit;
  const phpId = String(id).replace(/[^a-zA-Z0-9]/g, "_");
  const remoteFolder = (remoteFolderURL || "").trim().replace(/['"\\\s]/g, "").replace(/\/+$/, "");
  let galleryResources = resources == null ? void 0 : resources.resources;
  let hasResources = (galleryResources == null ? void 0 : galleryResources.length) > 0;
  if (isRemote) {
    if (edit) {
      const placeholder = `${rw.component.sharedAssetPath}/images/image-square.png`;
      galleryResources = remoteFolder ? Array.from({ length: 6 }, (_, index) => ({
        image: placeholder,
        alt: `Remote image ${index + 1}`,
        caption: `Image ${index + 1}`,
        author: "",
        isVideo: false
      })) : [];
      hasResources = galleryResources.length > 0;
    } else {
      galleryResources = [];
      hasResources = true;
    }
  } else {
    (_a = resources == null ? void 0 : resources.resources) == null ? void 0 : _a.forEach((resource) => {
      resource.srcset = "";
      resource.thumbnail = rw.resizeResource(resource, 400);
      resource.alt = resource.alt || resource.caption || resource.author || "";
      resource.isVideo = resource.format === "youtube" || resource.format === "vimeo" || resource.format === "mp4";
      if (resource.isVideo) {
        resource.isYouTube = resource.format === "youtube" ? true : false;
        resource.isVimeo = resource.format === "vimeo" ? true : false;
        resource.isMP4 = resource.format === "mp4" ? true : false;
        resource.options = {};
        resource.caption = resource.name;
        resource.author = resources.name;
        if (resource.isYouTube) {
          resource.options = {
            autoplay: 0,
            loop: 0,
            muted: 0,
            controls: 1
          };
        }
        if (resource.isVimeo) {
          resource.options = {
            autoplay: "false",
            loop: "false",
            muted: "false",
            controls: "true"
          };
        }
      }
    });
  }
  const classes = {
    wrapper: classnames([
      `grid place-items-start`,
      columns,
      gap,
      advancedClasses(rw)
    ]).toString(),
    thumbnail: classnames([
      `cursor-pointer`,
      thumbnailAspectRatio,
      thumbnailBorderRadius
    ]).toString(),
    thumbnailMeta: classnames([
      `flex flex-col`,
      thumbnailAlignment,
      thumbnailMetaMargin,
      thumbnailSpacing
    ]).toString(),
    thumbnailCaption: classnames([
      thumbnailAlignment,
      thumbnailCaptionColor,
      thumbnailCaptionFont,
      thumbnailCaptionFontSize
    ]).toString(),
    thumbnailAuthor: classnames([
      thumbnailAlignment,
      thumbnailAuthorColor,
      thumbnailAuthorFont,
      thumbnailAuthorFontSize
    ]).toString(),
    thumbnailImage: classnames([
      "w-full",
      "h-full",
      "object-cover",
      "object-center",
      thumbnailBorderRadius,
      thumbnailShadow
    ]).toString(),
    overlay: classnames([
      `absolute inset-0 -z-10`,
      `cursor-zoom-out`,
      overlayColor,
      overlayOpacity,
      overlayBlur
    ]).toString(),
    slideImageWrapper: [
      `w-full overflow-hidden flex justify-center items-center`
    ].join(" "),
    lightboxContent: classnames([
      `scrollbar-hide relative w-full h-screen flex items-center snap-x snap-mandatory overflow-x-auto`
    ]).toString(),
    lightboxItem: classnames([
      `snap-center shrink-0 w-screen h-screen p-3 md:p-20 flex flex-col justify-center items-center`
    ]).toString(),
    lightboxItemMedia: classnames([
      `max-w-full max-h-full min-h-0 object-contain`,
      lightboxMediaBorderRadius,
      lightboxMediaShadow
    ]).toString(),
    lightboxMeta: classnames([
      `flex flex-col shrink-0`,
      lightboxMetaAlignment,
      lightboxMetaMargin,
      lightboxMetaSpacing
    ]).toString(),
    lightboxCaption: classnames([
      lightboxMetaAlignment,
      lightboxCaptionColor,
      lightboxCaptionFont,
      lightboxCaptionFontSize
    ]).toString(),
    lightboxAuthor: classnames([
      lightboxMetaAlignment,
      lightboxAuthorColor,
      lightboxAuthorFont,
      lightboxAuthorFontSize
    ]).toString(),
    lightboxCloseButton: classnames([
      `cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
      `absolute top-3 right-3 cursor-pointer z-10`,
      navigationRadius,
      navigationPadding,
      navigationCloseButtonBackground,
      navigationCloseButtonBackgroundHover,
      navigationCloseButtonOpacity,
      navigationCloseButtonOpacityHover
    ]).toString(),
    lightboxCloseButtonIcon: classnames([
      `transition-all duration-300`,
      navigationCloseButtonIconColor,
      navigationCloseButtonIconColorHover,
      navigationSize
    ]).toString(),
    lightboxButton: classnames([
      `self-center absolute z-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
      navigationRadius,
      navigationPadding,
      navigationNextPreviousButtonBackground,
      navigationNextPreviousButtonBackgroundHover,
      navigationNextPreviousButtonOpacity,
      navigationNextPreviousButtonOpacityHover
    ]).toString(),
    lightboxButtonIcon: classnames([
      `transition-all duration-300`,
      navigationNextPreviousButtonIconColor,
      navigationNextPreviousButtonIconColorHover,
      navigationSize
    ]).toString()
  };
  rw.setRootElement({
    as: globalHTMLTag(rw, "div"),
    class: classes,
    args: {
      id: globalID,
      "x-data": `gallery('${id}')`
    }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({
    hasResources,
    classes,
    // thumbnails,
    thumbnailShowCaption,
    thumbnailShowAuthor,
    thumbnailWantsMeta: thumbnailShowCaption || thumbnailShowAuthor,
    lightboxShowCaption,
    lightboxShowAuthor,
    lightboxWantsMeta: lightboxShowCaption || lightboxShowAuthor,
    resources: galleryResources,
    isRemote,
    remotePublished,
    remoteFolder,
    phpId,
    edit,
    includeLightbox: lightboxPreview || !edit,
    id: rw.node.id
  });
};
exports.transformHook = transformHook;
