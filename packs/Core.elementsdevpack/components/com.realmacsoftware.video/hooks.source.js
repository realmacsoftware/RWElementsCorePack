const DEFAULT_VIDEO_ASPECT = "16/9";

const resolveVideoAspectClass = (rw) =>
    rw.props.aspectRatio == "aspect-[auto]"
        ? "aspect-video"
        : aspectRatioClasses(rw);

const aspectRatioCssPair = (aspectClass) => {
    if (aspectClass === "aspect-video") return DEFAULT_VIDEO_ASPECT;
    const match = String(aspectClass).match(
        /aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/
    );
    return match ? `${match[1]}/${match[2]}` : DEFAULT_VIDEO_ASPECT;
};

const transformHook = (rw) => {
    const {
        globalID,
        imageType,
        image: thumbnailResource,
        imageDark: thumbnailResourceDark,
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
        preload,

        globalPadding,
    } = rw.props;

    const {
        imageCustomSource,
        imageCustomSourceDark,
        imageCmsField,
        imageCmsFieldDark,
    } = rw.responsiveProps;

    const { id } = rw.node;
    const { assetPath, sharedAssetPath } = rw.component;
    const isEditMode = rw.project.mode === "edit";
    const isCMSThumbnail = imageType == "cms";
    const isResourceThumbnail = imageType == "resource";

    // Custom and CMS thumbnails are plain strings rather than resources; take the base
    // breakpoint value and normalise it to the { image } shape the templates read.
    const customThumbnailSrc =
        isEditMode && isCMSThumbnail
            ? `${sharedAssetPath}/images/image-square.png`
            : (isCMSThumbnail ? imageCmsField : imageCustomSource)?.base;

    const customThumbnailSrcDark =
        isEditMode && isCMSThumbnail
            ? `${sharedAssetPath}/images/image-square.png`
            : (isCMSThumbnail ? imageCmsFieldDark : imageCustomSourceDark)?.base;

    const thumbnail = isResourceThumbnail
        ? thumbnailResource
        : customThumbnailSrc
            ? { image: customThumbnailSrc }
            : null;

    const thumbnailDark = isResourceThumbnail
        ? thumbnailResourceDark
        : customThumbnailSrcDark
            ? { image: customThumbnailSrcDark }
            : null;

    const hasThumbnail = thumbnail;
    const hasDarkThumbnail = thumbnailDark;

    const preloadHint = ["none", "metadata", "auto"].includes(preload)
        ? preload
        : "metadata";

    const options = {
        autoplay,
        loop,
        muted,
        controls,
        wantsLightbox,
        startAt: startAt || 0,
    };

    if (video?.format == "mp4") {
        video.image = `${assetPath}/video-placeholder.png`;
    }

    const finalVideo = video || {
        format: "youtube",
        videoId: "r52932MBAYw",
        options: options,
        image: `${assetPath}/video-placeholder.png`,
    };

    const videoAspectClass = resolveVideoAspectClass(rw);
    const videoAspectCss = aspectRatioCssPair(videoAspectClass);

    const wrapperClasses = classnames([
        `group/${id} group/video relative`,
        videoAspectClass,
        advancedClasses(rw),
        globalLayout(rw),
        globalSizing(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalEffects(rw),
        globalTransforms(rw),
        globalFilters(rw),
        globalBorders(rw),
    ]).toString();

    const videoClasses = classnames([
        `${videoAspectClass} w-full h-auto`,
        objectClasses(rw),
        globalPadding,
    ]).toString();

    const videoLightboxClasses = classnames([
        `${videoAspectClass} w-[min(95vw,calc(95vh*${videoAspectCss}))] max-w-[1920px] max-h-[95vh]`,
        objectClasses(rw),
        globalPadding,
    ]).toString();

    const posterClasess = classnames([
        `absolute inset-0 z-0 cursor-pointer w-full h-full`,
        globalPadding,
        !video ? "object-cover" : "",
        objectClasses(rw),
    ]).toString();

    const overlayClasses = classnames([
        `absolute inset-0 z-10 cursor-pointer w-full h-full grid place-content-center`,
        overlayColor,
        overlayOpacity,
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
                videoLightboxGlobalFiltersBackdropBlur,
            ]).toString(),
        },
    };

    const getOptions = () => {
        return JSON.stringify(options).replace(/"/g, "'");
    };

    // Single-quoted JS string literal, safe to sit inside a double-quoted HTML attribute.
    // Matches getOptions()'s convention of keeping double quotes out of the attribute.
    const jsString = (value) =>
        `'${String(value ?? "")
            .replace(/\\/g, "\\\\")
            .replace(/'/g, "\\'")}'`;

    const getXData = () => {
        return `videoPlayer(${jsString(id)}, ${jsString(finalVideo.format)}, ${jsString(
            finalVideo.videoId
        )}, ${getOptions()})`;
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": getXData(),
            rwResourceDropZone: "video",
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        video: finalVideo,
        options: getOptions(),
        classes,
        isMP4: video?.format == "mp4",
        shouldAutoPlay: autoplay != "never",
        edit: isEditMode,
        id,
        hasThumbnail,
        hasDarkThumbnail,
        thumbnail,
        thumbnailDark,
        thumbnailAlt: video?.alt || thumbnailAlt || "",
        wantsLightbox: wantsLightbox && !isEditMode,
        preload: preloadHint,
    });
};

exports.transformHook = transformHook;
