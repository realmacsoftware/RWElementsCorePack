const transformHook = (rw) => {
    const {
        globalID,
        resources,

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
        navigationNextPreviousButtonOpacityHover,
    } = rw.props;

    const { screens } = rw.theme.breakpoints;
    const { id } = rw.node;

    const hasResources = resources?.resources?.length > 0;

    // const thumbnails = galleryHelpers.thumbnails(rw);

    resources?.resources?.forEach((resource) => {
        resource.srcset = "";
        resource.thumbnail = rw.resizeResource(resource, 400);
        resource.alt = resource.alt || resource.caption || resource.author || "";

        // check if this is a video
        resource.isVideo =
            resource.format === "youtube" ||
            resource.format === "vimeo" ||
            resource.format === "mp4";

        // if it is a video, set booleans for isYoutube and isVimeo and isMP4
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
                    controls: 1,
                };
            }

            if (resource.isVimeo) {
                resource.options = {
                    autoplay: "false",
                    loop: "false",
                    muted: "false",
                    controls: "true",
                };
            }
        }
    });

    const classes = {
        wrapper: classnames([
            `grid place-items-start`,
            columns,
            gap,
            advancedClasses(rw),
        ]).toString(),
        thumbnail: classnames([
            `cursor-pointer`,
            thumbnailAspectRatio,
            thumbnailBorderRadius,
        ]).toString(),
        thumbnailMeta: classnames([
            `flex flex-col`,
            thumbnailAlignment,
            thumbnailMetaMargin,
            thumbnailSpacing,
        ]).toString(),
        thumbnailCaption: classnames([
            thumbnailAlignment,
            thumbnailCaptionColor,
            thumbnailCaptionFont,
            thumbnailCaptionFontSize,
        ]).toString(),
        thumbnailAuthor: classnames([
            thumbnailAlignment,
            thumbnailAuthorColor,
            thumbnailAuthorFont,
            thumbnailAuthorFontSize,
        ]).toString(),
        thumbnailImage: classnames([
            "w-full",
            "h-full",
            "object-cover",
            "object-center",
            thumbnailBorderRadius,
            thumbnailShadow,
        ]).toString(),
        overlay: classnames([
            `absolute inset-0 -z-10`,
            `cursor-zoom-out`,
            overlayColor,
            overlayOpacity,
            overlayBlur,
        ]).toString(),
        slideImageWrapper: [
            `w-full overflow-hidden flex justify-center items-center`,
        ].join(" "),
        lightboxContent: classnames([
            `scrollbar-hide relative w-full h-screen flex items-center snap-x snap-mandatory overflow-x-auto`,
        ]).toString(),
        lightboxItem: classnames([
            `snap-center shrink-0 w-screen h-screen p-3 md:p-20 flex justify-center items-center`,
        ]).toString(),
        lightboxItemMedia: classnames([
            `max-w-full max-h-full object-contain`,
            lightboxMediaBorderRadius,
            lightboxMediaShadow,
        ]).toString(),
        lightboxCloseButton: classnames([
            `cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
            `absolute top-3 right-3 cursor-pointer z-10`,
            navigationRadius,
            navigationPadding,
            navigationCloseButtonBackground,
            navigationCloseButtonBackgroundHover,
            navigationCloseButtonOpacity,
            navigationCloseButtonOpacityHover,
        ]).toString(),
        lightboxCloseButtonIcon: classnames([
            `transition-all duration-300`,
            navigationCloseButtonIconColor,
            navigationCloseButtonIconColorHover,
            navigationSize,
        ]).toString(),
        lightboxButton: classnames([
            `self-center absolute z-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
            navigationRadius,
            navigationPadding,
            navigationNextPreviousButtonBackground,
            navigationNextPreviousButtonBackgroundHover,
            navigationNextPreviousButtonOpacity,
            navigationNextPreviousButtonOpacityHover,
        ]).toString(),
        lightboxButtonIcon: classnames([
            `transition-all duration-300`,
            navigationNextPreviousButtonIconColor,
            navigationNextPreviousButtonIconColorHover,
            navigationSize,
        ]).toString(),
    };

    rw.setRootElement({
        as: globalHTMLTag(rw, "div"),
        class: classes,
        args: {
            id: globalID,
            "x-data": `gallery('${id}')`,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        hasResources,
        classes,
        // thumbnails,
        thumbnailShowCaption: thumbnailShowCaption,
        thumbnailShowAuthor: thumbnailShowAuthor,
        thumbnailWantsMeta: thumbnailShowCaption || thumbnailShowAuthor,
        resources: resources?.resources,
        edit: rw.project.mode === "edit",
        includeLightbox: lightboxPreview || rw.project.mode !== "edit",
        id: rw.node.id,
    });
};

exports.transformHook = transformHook;
