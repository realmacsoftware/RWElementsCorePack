const transformHook = (rw) => {
    const {
        globalID,
        imageType,
        imageIntrinsicWidth,
        imageIntrinsicHeight,
        image,
        imageDark,
        imageAlt,
        imageSizingType,
        imageProtection,
        imageFetchPriority,

        wantsLightbox,
        imageLightboxColor,
        imageLightboxColorOpacity,
        imageLightboxGlobalFiltersBackdropBlur,

        imageMaskResource,
        imageMaskSize,
    } = rw.props;

    const {
        imageFileSize,
        imageCmsField: responsiveImageCmsField,
        imageCmsFieldDark: responsiveImageCmsFieldDark,
        imageCustomSource,
        imageCustomSourceDark,
    } = rw.responsiveProps;
    const { breakpoints } = rw.theme;
    const { names, screens } = breakpoints;
    const { mode } = rw.project;
    const { assetPath, sharedAssetPath } = rw.component;

    const link = globalLink(rw);
    const wantsCustomSizing = imageSizingType == "custom";
    const wantsFetchPriority = imageFetchPriority != "auto";
    const isEditMode = mode == "edit";
    const isCMSImage = imageType == "cms";
    const isCustomImage = imageType == "custom";
    const isResourceImage = imageType == "resource";

    // generate responsive image data for picture element
    const generateResponsiveImageData = (resourceObject) => {
        if (!resourceObject) return null;

        // Generate sources for each breakpoint (largest to smallest)
        const sources = names
            .filter((name) => resourceObject[name] && screens[name])
            .sort((a, b) => screens[b] - screens[a]) // Sort by screen size descending
            .map((name) => ({
                media: `(min-width: ${screens[name]}px)`,
                srcset: resourceObject[name],
                breakpoint: name,
                minWidth: screens[name],
            }));

        return {
            sources,
            fallbackSrc: resourceObject["base"],
            baseSrc: resourceObject["base"],
        };
    };

    const generateResourceSources = (resource) => {
        if (!wantsCustomSizing) return resource;

        const sources = names
            .filter((name) => imageFileSize[name])
            .sort((a, b) => screens[b] - screens[a])
            .map((name) => ({
                media: `(min-width: ${screens[name]}px)`,
                srcset: rw.resizeResource(resource, imageFileSize[name] * 2),
                breakpoint: name,
                minWidth: screens[name],
            }));

        return {
            sources,
            fallbackSrc: resource,
            baseSrc: resource,
        };
    };

    const generateDefaultSrc = (resource) => {
        if (!wantsCustomSizing) return resource;
        return {
            ...resource,
            image: rw.resizeResource(resource, imageFileSize.base * 2),
        };
    };

    const responsiveImageData = generateResponsiveImageData(
        isCMSImage ? responsiveImageCmsField : imageCustomSource
    );

    const responsiveImageDataDark = generateResponsiveImageData(
        isCMSImage ? responsiveImageCmsFieldDark : imageCustomSourceDark
    );

    const imageCustomSrc =
        isEditMode && isCMSImage
            ? `${sharedAssetPath}/images/image-square.png`
            : responsiveImageData?.baseSrc ||
              `${sharedAssetPath}/images/image-square.png`;

    const imageCustomSrcDark =
        isEditMode && isCMSImage
            ? `${sharedAssetPath}/images/image-square.png`
            : responsiveImageDataDark?.baseSrc ||
              `${sharedAssetPath}/images/image-square.png`;

    const lightImage = isResourceImage
        ? {
              resource: generateDefaultSrc(image),
              ...generateResourceSources(image),
          }
        : {
              resource: {
                  image: imageCustomSrc,
              },
              ...responsiveImageData,
          };

    const darkImage = isResourceImage
        ? {
              resource: generateDefaultSrc(imageDark),
              ...generateResourceSources(imageDark),
          }
        : {
              resource: {
                  image: imageCustomSrcDark,
              },
              ...responsiveImageDataDark,
          };

    // Generate mask classes if SVG resource is present
    const wantsMask = !!imageMaskResource?.image;
    console.log("wantsMask", imageMaskResource);
    const maskClasses = [];
    if (wantsMask) {
        const svgContent = imageMaskResource.image;
        const encodedSvg = encodeURIComponent(svgContent);
        const maskUrl = `url('data:image/svg+xml,${encodedSvg}')`;
        
        maskClasses.push(
            `[-webkit-mask-image:${maskUrl}]`,
            `[mask-image:${maskUrl}]`,
            `[-webkit-mask-size:${imageMaskSize}]`,
            `[mask-size:${imageMaskSize}]`,
            `[-webkit-mask-repeat:no-repeat]`,
            `[mask-repeat:no-repeat]`,
            `[-webkit-mask-position:center]`,
            `[mask-position:center]`
        );
    }

    console.log("maskClasses", maskClasses);

    const classes = {
        wrapper: classnames([
            `transform-gpu`,
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            advancedClasses(rw),
        ]).toString(),
        img: classnames([
            wantsLightbox && "cursor-zoom-in",
            `max-w-[100%] w-full`,
            globalTransitions(rw),
            globalEffects(rw),
            globalTransforms(rw),
            globalFilters(rw),
            globalBorders(rw),
            // displaySize(),
            objectClasses(rw),
            rw.props.aspectRatio == "aspect-[auto]"
                ? `aspect-[${image?.aspect}]`
                : aspectRatioClasses(rw),
            ...maskClasses,
        ]).toString(),
        lightbox: {
            overlay: classnames([
                `fixed inset-0`,
                imageLightboxColor,
                imageLightboxColorOpacity,
                imageLightboxGlobalFiltersBackdropBlur,
            ]).toString(),
        },
    };

    rw.setRootElement({
        as: link.hasLink ? "a" : "div",
        class: classes.wrapper,
        args: {
            ...link.args,
            rwResourceDropZone: "image",
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        isCMSImage,
        isCustomImage,
        isResourceImage,
        isEditMode,
        lightImage,
        hasDarkImage: darkImage.resource?.image || false,
        darkImage,
        hasImage: lightImage.resource?.image || false,
        imageProtection,
        defaultSrc: image,
        alt: imageAlt,
        classes,
        imageWidth: !isResourceImage ? imageIntrinsicWidth : image?.width,
        imageHeight: !isResourceImage ? imageIntrinsicHeight : image?.height,
        assetPath,
        sharedAssetPath,
        wantsLightbox: wantsLightbox && mode != "edit",
        id: rw.node.id,
        wantsFetchPriority,
    });
};

exports.transformHook = transformHook;
