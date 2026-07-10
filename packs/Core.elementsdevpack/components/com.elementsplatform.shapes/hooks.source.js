const asPercent = (value) => {
    const formattedValue = `${value ?? 0}`.trim();
    return formattedValue.endsWith("%") ? formattedValue : `${formattedValue}%`;
};

const shapePresets = {
    "triangle": "polygon(50% 0%,0% 100%,100% 100%)",
    "triangle-down": "polygon(0% 0%,100% 0%,50% 100%)",
    "trapezoid": "polygon(20% 0%,80% 0%,100% 100%,0% 100%)",
    "parallelogram": "polygon(25% 0%,100% 0%,75% 100%,0% 100%)",
    "rhombus": "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
    "pentagon": "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)",
    "hexagon": "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
    "octagon": "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
    "star": "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
    "arrow-left": "polygon(40% 0%,40% 20%,100% 20%,100% 80%,40% 80%,40% 100%,0% 50%)",
    "arrow-right": "polygon(0% 20%,60% 20%,60% 0%,100% 50%,60% 100%,60% 80%,0% 80%)",
    "chevron": "polygon(75% 0%,100% 50%,75% 100%,0% 100%,25% 50%,0% 0%)",
    "message": "polygon(0% 0%,100% 0%,100% 75%,75% 75%,75% 100%,50% 75%,0% 75%)",
    "frame": "polygon(0% 0%,0% 100%,25% 100%,25% 25%,75% 25%,75% 75%,25% 75%,25% 100%,100% 100%,100% 0%)",
};

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

const prepareSvgMarkup = (svgString) => {
    if (!isInlineSvgMarkup(svgString)) {
        return svgString || "";
    }

    const sizingClasses = "w-full h-auto";
    let cleaned = svgString
        .replace(/(?<!stroke-)width="[^"]*"/g, "")
        .replace(/\bheight="[^"]*"/g, "");

    if (cleaned.includes('class="')) {
        cleaned = cleaned.replace(/class="[^"]*"/, `class="${sizingClasses}"`);
    } else {
        cleaned = cleaned.replace(/<svg/, `<svg class="${sizingClasses}"`);
    }

    return cleaned;
};

const shapeValueFor = (rw) => {
    const {
        shapeSource,
        shapePreset,
        shapeCircleRadius,
        shapeCirclePosition,
        shapeEllipseRadiusX,
        shapeEllipseRadiusY,
        shapeEllipsePosition,
        shapeCustom,
    } = rw.props;

    switch (shapeSource) {
        case "preset":
            return shapePresets[shapePreset] || shapePresets.triangle;
        case "circle":
            return `circle(${asPercent(shapeCircleRadius)} at ${shapeCirclePosition || "center"})`;
        case "ellipse":
            return `ellipse(${asPercent(shapeEllipseRadiusX)} ${asPercent(shapeEllipseRadiusY)} at ${shapeEllipsePosition || "center"})`;
        case "custom":
            return `${shapeCustom || ""}`.trim() || null;
        case "auto":
        case "none":
        default:
            return null;
    }
};

const transformHook = (rw) => {
    const {
        globalID,
        media,
        mediaAlt,
        mediaFloat,
        mediaWidth,
        shapeMargin,
        shapeSource,
        shapeImageThreshold,
        clipMedia,
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

    // Auto needs image transparency; videos degrade to a plain rectangular wrap
    const effectiveSource = shapeSource === "auto" && !isImage ? "none" : shapeSource;
    const svgAsImage = effectiveSource === "auto" && isSvg && !!media?.image;
    const svgImageUrl = svgAsImage ? svgShapeUrl(media.image) : "";

    // Shape values (url(), polygon(), etc.) are unsafe as Tailwind class names
    // and won't exist in the compiled CSS, so all shape CSS goes inline
    const shapeValue = shapeValueFor(rw);
    const styles = [];

    if (effectiveSource === "auto" && media?.image) {
        const shapeOutsideUrl = isSvg ? svgImageUrl : media.image;
        styles.push(`shape-outside: url('${shapeOutsideUrl}')`);
        styles.push(`shape-image-threshold: ${(Number(shapeImageThreshold) || 0) / 100}`);
    } else if (shapeValue) {
        styles.push(`shape-outside: ${shapeValue}`);
        if (clipMedia) {
            styles.push(`clip-path: ${shapeValue}`);
        }
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
        mediaSvg: isSvg && !svgAsImage ? prepareSvgMarkup(media?.image) : "",
        svgAsImage,
        svgImageUrl,
        mediaAlt: media?.alt || mediaAlt || "",
        mediaStyle,
        edit: rw.project.mode === "edit",
    });
};

exports.transformHook = transformHook;
