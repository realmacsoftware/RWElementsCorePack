// After RapidWeaver #4452, interpolating a video resource field can resolve
// to the poster PNG instead of the MP4. Compute a plain-string src in the
// hook so the template does not go back through requestResource.
const MP4_FILE_RE = /\.(mp4|m4v)(?:[?#].*)?$/i;
const POSTER_FILE_RE = /\.(png|jpe?g|webp|gif|avif)(?:[?#].*)?$/i;

const isMp4FileUrl = (value) =>
    MP4_FILE_RE.test(String(value || "").split("?")[0]);

const isMp4Resource = (resource) => {
    if (!resource) return false;
    const format = String(resource.format || "").toLowerCase();
    if (format === "mp4" || format === "video/mp4" || format === "m4v") {
        return true;
    }
    return isMp4FileUrl(
        resource.file || resource.path || resource.name || resource.filename
    );
};

const joinUrl = (base, name) => {
    const folder = String(base || "").replace(/\/+$/, "");
    const file = String(name || "").replace(/^\/+/, "");
    if (!folder || !file) return "";
    return `${folder}/${file}`;
};

const mp4SrcFromPoster = (image) => {
    const url = String(image || "");
    if (!POSTER_FILE_RE.test(url.split("?")[0])) return "";
    return url.replace(/\.(png|jpe?g|webp|gif|avif)(?=[?#]|$)/i, ".mp4");
};

const resolveMp4Src = (resource) => {
    if (!resource) return "";
    const name = resource.name || resource.filename || "";
    const withExt = [
        resource.file,
        resource.url,
        resource.path,
        resource.image,
        joinUrl(resource.path, name),
        mp4SrcFromPoster(resource.image),
    ].find(isMp4FileUrl);
    if (withExt) return withExt;
    return resource.file ? String(resource.file) : "";
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

    const isMP4 = isMp4Resource(video);
    // Resolve before replacing image with the generic placeholder, so a poster
    // PNG can still yield sibling Movie.mp4 (RapidWeaver #4452 posterSlug).
    const videoSrc = isMP4 ? resolveMp4Src(video) : "";

    if (isMP4) {
        if (videoSrc) {
            video.path = videoSrc;
        }
        video.image = `${assetPath}/video-placeholder.png`;
    }

    const finalVideo = video || {
        format: "youtube",
        videoId: "r52932MBAYw",
        options: options,
        image: `${assetPath}/video-placeholder.png`,
    };

    const wrapperClasses = classnames([
        `group/${id} group/video relative`,
        rw.props.aspectRatio == "aspect-[auto]"
            ? `aspect-video`
            : aspectRatioClasses(rw),
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
        `aspect-video w-full h-auto`,
        objectClasses(rw),
        globalPadding,
    ]).toString();

    const videoLightboxClasses = classnames([
        `aspect-video w-[min(95vw,calc(95vh*16/9))] max-w-[1920px] max-h-[95vh]`,
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
        isMP4,
        videoSrc,
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
