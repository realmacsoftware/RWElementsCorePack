const asPercent = (value) => {
    const formattedValue = `${value ?? 0}`.trim();
    return formattedValue.endsWith("%") ? formattedValue : `${formattedValue}%`;
};

const arbitraryValue = (value, fallback) => `${value || fallback}`.trim().replace(/\s+/g, "_");

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
    const isImage = hasMedia && !isMP4 && !isEmbed;

    // Auto needs image transparency; videos degrade to a plain rectangular wrap
    const effectiveSource = shapeSource === "auto" && !isImage ? "none" : shapeSource;

    // url() values are unsafe as Tailwind class names, so auto mode uses an inline style
    const mediaStyle = effectiveSource === "auto" && media?.image
        ? `shape-outside: url('${media.image}'); shape-image-threshold: ${(Number(shapeImageThreshold) || 0) / 100};`
        : "";

    const shapeValue = shapeValueFor(rw);
    const shapeClasses = shapeValue
        ? [
            `[shape-outside:${arbitraryValue(shapeValue)}]`,
            clipMedia && `[clip-path:${arbitraryValue(shapeValue)}]`,
        ]
        : [];

    const floatClasses = [mediaFloat, mediaWidth, shapeMargin];

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
            ...shapeClasses,
        ]).toString(),
        embedFrame: classnames([
            ...floatClasses,
            "aspect-video",
            ...shapeClasses,
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
        isMP4,
        isEmbed,
        embedUrl,
        mediaSrc: isMP4 ? media?.path : media?.image,
        mediaAlt: media?.alt || mediaAlt || "",
        mediaStyle,
        edit: rw.project.mode === "edit",
    });
};

exports.transformHook = transformHook;
