const OPAQUE_RASTER_FORMATS = new Set(["jpeg", "jpg", "bmp"]);

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

const extensionOf = (url) => {
    return `${url || ""}`.split(/[?#]/)[0].match(/\.([a-z0-9]+)$/i)?.[1] || "";
};

const isOpaqueRaster = (media, isRasterImage) => {
    if (!isRasterImage) {
        return false;
    }

    return OPAQUE_RASTER_FORMATS.has(`${media?.format || ""}`.toLowerCase());
};

const marginRawToken = (raw) => {
    if (raw == null || raw === "") {
        return null;
    }

    return `${raw}`.trim();
};

const marginTokenToClass = (side, rawValue) => {
    const value = marginRawToken(rawValue);
    if (!value) {
        return null;
    }

    if (value === "0") {
        return `${side}-0`;
    }

    if (value === "px") {
        return `${side}-[1px]`;
    }

    if (/[a-z%]$/i.test(value)) {
        return `${side}-[${value}]`;
    }

    const token = Number(value);
    if (!Number.isNaN(token)) {
        return `${side}-${value}`;
    }

    return `${side}-[${value}]`;
};

const resolveResponsiveValue = (breakpoints, values, bp, fallback) => {
    const index = breakpoints.indexOf(bp);

    for (let i = index; i >= 0; i--) {
        const value = values[breakpoints[i]];
        if (value !== undefined && value !== null) {
            return value;
        }
    }

    return fallback;
};

const withBreakpointPrefix = (breakpoint, className) => {
    if (!className) {
        return "";
    }

    return breakpoint === "base" ? className : `${breakpoint}:${className}`;
};

const getOpaqueFloatMarginClasses = (floatByBp, marginByBp, breakpointNames) => {
    const breakpoints = ["base", ...breakpointNames];
    const classes = [];
    let prevFloat = null;
    let prevMarginToken = null;

    const resolveFloat = (bp) => resolveResponsiveValue(breakpoints, floatByBp, bp, "left");
    const resolveMargin = (bp) => resolveResponsiveValue(breakpoints, marginByBp, bp, "4");

    for (const bp of breakpoints) {
        const float = resolveFloat(bp);
        const margin = resolveMargin(bp);
        const marginToken = marginRawToken(margin);

        if (bp !== "base" && float === prevFloat && marginToken === prevMarginToken) {
            continue;
        }

        const mbClass = marginTokenToClass("mb", margin);
        if (mbClass) {
            classes.push(withBreakpointPrefix(bp, mbClass));
        }

        if (float === "left") {
            const mrClass = marginTokenToClass("mr", margin);
            if (mrClass) {
                classes.push(withBreakpointPrefix(bp, mrClass));
            }
            if (prevFloat === "right") {
                classes.push(withBreakpointPrefix(bp, "ml-0"));
            }
        } else if (float === "right") {
            const mlClass = marginTokenToClass("ml", margin);
            if (mlClass) {
                classes.push(withBreakpointPrefix(bp, mlClass));
            }
            if (prevFloat === "left") {
                classes.push(withBreakpointPrefix(bp, "mr-0"));
            }
        } else {
            if (prevFloat === "left") {
                classes.push(withBreakpointPrefix(bp, "mr-0"));
            }
            if (prevFloat === "right") {
                classes.push(withBreakpointPrefix(bp, "ml-0"));
            }
        }

        prevFloat = float;
        prevMarginToken = marginToken;
    }

    return classes.filter(Boolean).join(" ");
};

// themeSpacing raw values arrive as empty objects in rw.responsiveProps, so the
// formatted prop string (e.g. "[shape-margin:8] md:[shape-margin:6]") is the
// only source of the per-breakpoint margin values
const marginByBreakpointFromFormatted = (formatted) => {
    const values = {};

    for (const [, bp, value] of `${formatted || ""}`.matchAll(/(?:([a-z0-9]+):)?\[shape-margin:([^\]]+)\]/g)) {
        values[bp || "base"] = value.trim();
    }

    return values;
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
        mediaType,
        mediaCustomSource,
        mediaCmsField,
        mediaAlt,
        mediaFloat,
        mediaWidth,
        shapeMargin,
        shapeImageThreshold,
    } = rw.props;
    const { id } = rw.node;
    const { sharedAssetPath } = rw.component;

    const edit = rw.project.mode === "edit";

    const type = mediaType || "resource";
    const isResourceMedia = type === "resource";
    const isCustomMedia = type === "custom";
    const isCmsMedia = type === "cms";

    // CMS field tokens can't resolve in edit mode, so show a placeholder there
    const cmsPlaceholder = `${sharedAssetPath}/images/image-square.png`;
    const externalSrc = isCustomMedia
        ? `${mediaCustomSource || ""}`.trim()
        : isCmsMedia
            ? (edit ? cmsPlaceholder : `${mediaCmsField || ""}`.trim())
            : "";

    const hasMedia = isResourceMedia ? !!media : !!externalSrc;
    const isYouTube = isResourceMedia && media?.format === "youtube";
    const isVimeo = isResourceMedia && media?.format === "vimeo";
    const isMP4 = isResourceMedia && media?.format === "mp4";
    const isEmbed = isYouTube || isVimeo;
    const isSvg = isResourceMedia && media?.format === "svg";
    const isRasterImage = hasMedia && !isMP4 && !isEmbed && !isSvg;
    const isImage = isRasterImage || isSvg;
    const opaqueRaster = isResourceMedia
        ? isOpaqueRaster(media, isRasterImage)
        : isCustomMedia
            ? OPAQUE_RASTER_FORMATS.has(extensionOf(externalSrc).toLowerCase())
            // the edit-mode CMS placeholder is an opaque square, so shape-margin
            // would be clipped away — use real margin classes instead
            : isCmsMedia && edit;

    const svgImageUrl = isSvg && media?.image ? svgShapeUrl(media.image) : "";

    // Shape values (url(), polygon(), etc.) are unsafe as Tailwind class names
    // and won't exist in the compiled CSS, so all shape CSS goes inline
    const styles = [];

    const shapeSourceUrl = isResourceMedia
        ? (isSvg ? svgImageUrl : media?.image)
        : externalSrc;

    if (isImage && shapeSourceUrl && !opaqueRaster) {
        styles.push(`shape-outside: url('${shapeSourceUrl}')`);
        styles.push(`shape-image-threshold: ${(Number(shapeImageThreshold) || 0) / 100}`);
    }

    const shapeMarginValue = shapeMarginLength(shapeMargin);
    if (styles.length > 0 && shapeMarginValue) {
        styles.push(`shape-margin: ${shapeMarginValue}`);
    }

    const mediaStyle = styles.length > 0 ? `${styles.join("; ")};` : "";

    const floatClasses = [mediaFloat, mediaWidth];

    const { mediaFloat: floatByBp } = rw.responsiveProps || {};
    const { names: breakpointNames = [] } = rw.theme?.breakpoints || {};
    const opaqueMarginClasses = opaqueRaster
        ? getOpaqueFloatMarginClasses(floatByBp || {}, marginByBreakpointFromFormatted(shapeMargin), breakpointNames)
        : "";

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
            opaqueMarginClasses,
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
            ...(isResourceMedia ? { rwResourceDropZone: "media" } : {}),
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
        mediaSrc: isMP4
            ? media?.path
            : isRasterImage
                ? (isResourceMedia ? media?.image : externalSrc)
                : "",
        svgImageUrl,
        mediaAlt: media?.alt || mediaAlt || "",
        mediaStyle,
        edit,
        showDropZone: edit && isResourceMedia && !hasMedia,
    });
};

exports.transformHook = transformHook;
