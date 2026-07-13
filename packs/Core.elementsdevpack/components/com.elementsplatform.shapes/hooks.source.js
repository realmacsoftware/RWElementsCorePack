const shapeMarginLength = (formatted) => {
    const value = `${formatted || ""}`.match(/\[shape-margin:(.+?)\]/)?.[1]?.trim();
    if (!value) {
        return null;
    }

    if (value === "0") {
        return "0";
    }

    if (value === "px") {
        return "1px";
    }

    if (/[a-z%]$/i.test(value)) {
        return value;
    }

    const token = Number(value);
    if (!Number.isNaN(token)) {
        return `${token * 0.25}rem`;
    }

    return value;
};

const isInlineSvgMarkup = (value) => {
    return typeof value === "string" && value.includes("<svg");
};

const prepareSvgForShape = (svgString) => {
    if (!isInlineSvgMarkup(svgString)) {
        return svgString || "";
    }

    let cleaned = svgString.trim();

    if (!/\sxmlns=/.test(cleaned)) {
        cleaned = cleaned.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/);
    const hasWidth = /\swidth="/.test(cleaned);
    const hasHeight = /\sheight="/.test(cleaned);

    if (viewBoxMatch && (!hasWidth || !hasHeight)) {
        const [, , , width, height] = viewBoxMatch[1].trim().split(/\s+/);

        if (!hasWidth && width) {
            cleaned = cleaned.replace(/<svg/, `<svg width="${width}"`);
        }

        if (!hasHeight && height) {
            cleaned = cleaned.replace(/<svg/, `<svg height="${height}"`);
        }
    }

    return cleaned;
};

const svgShapeUrl = (image) => {
    if (!image) {
        return "";
    }

    if (!isInlineSvgMarkup(image)) {
        return image;
    }

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(prepareSvgForShape(image))}`;
};

const transformHook = (rw) => {
    const {
        globalID,
        media,
        mediaAlt,
        mediaFloat,
        mediaWidth,
        shapeMargin,
        shapeImageThreshold,
    } = rw.props;
    const { id } = rw.node;

    const hasMedia = !!media;
    const isYouTube = media?.format === "youtube";
    const isVimeo = media?.format === "vimeo";
    const isMP4 = media?.format === "mp4";
    const isEmbed = isYouTube || isVimeo;
    const isSvg = media?.format === "svg";
    const isRasterImage = hasMedia && !isMP4 && !isEmbed && !isSvg;
    const isImage = isRasterImage || isSvg;

    const svgImageUrl = isSvg && media?.image ? svgShapeUrl(media.image) : "";

    // Shape values (url(), polygon(), etc.) are unsafe as Tailwind class names
    // and won't exist in the compiled CSS, so all shape CSS goes inline
    const styles = [];

    if (isImage && media?.image) {
        const shapeOutsideUrl = isSvg ? svgImageUrl : media.image;
        styles.push(`shape-outside: url('${shapeOutsideUrl}')`);
        styles.push(`shape-image-threshold: ${(Number(shapeImageThreshold) || 0) / 100}`);
    }

    const shapeMarginValue = shapeMarginLength(shapeMargin);
    if (styles.length > 0 && shapeMarginValue) {
        styles.push(`shape-margin: ${shapeMarginValue}`);
    }

    const mediaStyle = styles.length > 0 ? `${styles.join("; ")};` : "";

    const floatClasses = [mediaFloat, mediaWidth];

    const classes = {
        wrapper: classnames([
            `group/${id} group/shapes`,
            globalID && `group/${globalID}`,
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            advancedClasses(rw),
        ]).toString(),
        shape: classnames([
            "block w-full flow-root",
            globalTransitions(rw),
        ]).toString(),
        media: classnames([
            ...floatClasses,
            "h-auto max-w-full",
        ]).toString(),
        embedFrame: classnames([
            ...floatClasses,
            "aspect-video",
        ]).toString(),
    };

    const embedUrl = isYouTube
        ? `https://www.youtube.com/embed/${media?.videoId}`
        : isVimeo
            ? `https://player.vimeo.com/video/${media?.videoId}`
            : "";

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            id: globalID,
            rwResourceDropZone: "media",
        },
    });

    if ((globalID || "").length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        classes,
        hasMedia,
        isImage,
        isRasterImage,
        isSvg,
        isMP4,
        isEmbed,
        embedUrl,
        mediaSrc: isMP4 ? media?.path : isRasterImage ? media?.image : "",
        svgImageUrl,
        mediaAlt: media?.alt || mediaAlt || "",
        mediaStyle,
        edit: rw.project.mode === "edit",
    });
};

exports.transformHook = transformHook;
