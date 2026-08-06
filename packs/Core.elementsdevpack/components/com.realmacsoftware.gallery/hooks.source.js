const transformHook = (rw) => {
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
        thumbnailSize,
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
        navigationNextPreviousButtonOpacityHover,
    } = rw.props;

    const { screens } = rw.theme.breakpoints;
    const { id } = rw.node;

    const edit = rw.project.mode === "edit";
    const isRemote = sourceType === "remote";
    const remotePublished = isRemote && !edit;

    // The first row is above the fold at every breakpoint, so it loads eagerly
    // and everything below it lazy-loads. columns is responsive, so take the
    // widest value — the raw numbers only exist on responsiveProps, since
    // rw.props.columns has already been formatted into "grid-cols-…" classes.
    const columnCounts = Object.values(rw.responsiveProps?.columns || {})
        .map((value) => parseInt(value, 10))
        .filter((value) => Number.isFinite(value));
    const eagerCount = columnCounts.length ? Math.max(...columnCounts) : 3;

    // Thumbnails are served at 2x so they stay sharp on retina displays.
    const thumbnailWidth = (Number(thumbnailSize) || 400) * 2;

    // Suffix for the PHP variables in the remote templates, so two galleries
    // on the same page don't share state.
    const phpId = String(id).replace(/[^a-zA-Z0-9]/g, "_");

    // Baked into single-quoted PHP strings, so quotes, backslashes and line
    // breaks must not survive. Spaces inside a folder name are kept.
    const sanitiseForPhp = (value) =>
        String(value || "")
            .trim()
            .replace(/['"\\\r\n\t]/g, "");

    // The folder can be a path relative to the page ("resources/Instagram"),
    // relative to the site root ("/resources/Instagram") or a full URL on this
    // site — the remote templates resolve whichever it turns out to be.
    const remoteFolder = sanitiseForPhp(remoteFolderURL).replace(/\/+$/, "");

    // Relative path from this page back to the site root ("", "../", …), so
    // the templates can find the site root without relying on DOCUMENT_ROOT
    // (which differs under local preview).
    const pageDocRoot = sanitiseForPhp(rw.page?.docRootPath);

    let galleryResources = resources?.resources;
    let hasResources = galleryResources?.length > 0;

    // const thumbnails = galleryHelpers.thumbnails(rw);

    if (isRemote) {
        if (edit) {
            const placeholder = `${rw.component.sharedAssetPath}/images/image-square.png`;
            galleryResources = remoteFolder
                ? Array.from({ length: 6 }, (_, index) => ({
                      image: placeholder,
                      alt: `Remote image ${index + 1}`,
                      caption: `Image ${index + 1}`,
                      author: "",
                      isVideo: false,
                      lazy: index >= eagerCount,
                  }))
                : [];
            hasResources = galleryResources.length > 0;
        } else {
            // Published: Alpine fetches the folder listing from the backend
            // endpoint and renders the grid client-side.
            galleryResources = [];
            hasResources = true;
        }
    } else {
        resources?.resources?.forEach((resource, index) => {
            resource.thumbnail = rw.resizeResource(resource, thumbnailWidth);
            resource.lazy = index >= eagerCount;
            resource.alt =
                resource.alt || resource.caption || resource.author || "";

            // Gives the lightbox slide a box to occupy before its image has
            // loaded, so lazy slides don't collapse to nothing.
            resource.aspect =
                resource.aspect ||
                (resource.width && resource.height
                    ? `${resource.width}/${resource.height}`
                    : "auto");

            // check if this is a video
            resource.isVideo =
                resource.format === "youtube" ||
                resource.format === "vimeo" ||
                resource.format === "mp4";

            // if it is a video, set booleans for isYoutube and isVimeo and isMP4
            if (resource.isVideo) {
                resource.isYouTube =
                    resource.format === "youtube" ? true : false;
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
    }

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
            `snap-center shrink-0 w-screen h-screen p-3 md:p-20 flex flex-col justify-center items-center`,
        ]).toString(),
        lightboxItemMedia: classnames([
            `max-w-full max-h-full min-h-0 object-contain`,
            lightboxMediaBorderRadius,
            lightboxMediaShadow,
        ]).toString(),
        lightboxMeta: classnames([
            `flex flex-col shrink-0`,
            lightboxMetaAlignment,
            lightboxMetaMargin,
            lightboxMetaSpacing,
        ]).toString(),
        lightboxCaption: classnames([
            lightboxMetaAlignment,
            lightboxCaptionColor,
            lightboxCaptionFont,
            lightboxCaptionFontSize,
        ]).toString(),
        lightboxAuthor: classnames([
            lightboxMetaAlignment,
            lightboxAuthorColor,
            lightboxAuthorFont,
            lightboxAuthorFontSize,
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
        lightboxShowCaption: lightboxShowCaption,
        lightboxShowAuthor: lightboxShowAuthor,
        lightboxWantsMeta: lightboxShowCaption || lightboxShowAuthor,
        resources: galleryResources,
        eagerCount,
        isRemote,
        remotePublished,
        remoteFolder,
        pageDocRoot,
        phpId,
        edit,
        includeLightbox: lightboxPreview || !edit,
        id: rw.node.id,
    });
};

exports.transformHook = transformHook;
