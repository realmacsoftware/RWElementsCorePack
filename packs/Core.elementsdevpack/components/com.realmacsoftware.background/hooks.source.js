const transformHook = (rw) => {
    const {
        globalID,
        globalBgImageType,
        globalBgImageCmsField,
        globalLayoutPosition: position,
        bgFixed,
        enableAngle,
        angleMode = "vertical",
        angleTopLeft,
        angleTopRight,
        angleBottomLeft,
        angleBottomRight,
        angleLeftTop,
        angleLeftBottom,
        angleRightTop,
        angleRightBottom,
        globalBgType,
        globalBgSVGResource,
        globalBgSVGMaxWidth,
        globalBgSVGMinWidth,
        globalBgSVGMaxHeight,
        globalBgSVGMinHeight,
        globalBgSVGFixedWidth,
        globalBgSVGFixedHeight,
        globalBgSVGPositionTop,
        globalBgSVGPositionRight,
        globalBgSVGPositionBottom,
        globalBgSVGPositionLeft,
        globalBgSVGTranslateX,
        globalBgSVGTranslateY,
        globalBgSVGColor,
        globalBgSVGOpacity,
    } = rw.props;

    const { mode } = rw.project;
    const { sharedAssetPath } = rw.component;

    const {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    } = globalBgImageFetchPriority(rw);

    const isEdit = mode == "edit";
    const isSvg = globalBgType === "svg";
    const isCms = globalBgType === "image" && globalBgImageType === "cms";
    const cmsField = isCms
        ? isEdit
            ? `${sharedAssetPath}/images/image-square.jpg`
            : globalBgImageCmsField
        : null;

    const angleClass = !enableAngle
        ? ""
        : angleMode === "horizontal"
        ? `[clip-path:_polygon(${angleLeftTop ?? 100}%_0,${
              angleRightTop ?? 0
          }%_0,${angleRightBottom ?? 0}%_100%,${angleLeftBottom ?? 100}%_100%)]`
        : `[clip-path:_polygon(0_${angleTopLeft ?? 0}%,100%_${
              angleTopRight ?? 0
          }%,100%_${angleBottomRight ?? 0}%,0_${angleBottomLeft ?? 0}%)]`;

    const classes = {
        wrapper: classnames([
            "overflow-hidden",
            !position && "relative",
            globalLayout(rw),
            globalSizingContainer(rw),
            globalSpacing(rw),
            advancedClasses(rw),
        ]).toString(),
        bgWrapper: classnames([
            `[clip:rect(0,_auto,_auto,_0)] absolute top-0 left-0 w-full h-full -z-10`,
        ]).toString(),
        background: classnames([
            `block w-full h-full top-0 left-0`,
            `-z-10`,
            ...(isSvg
                ? [
                      `[&>svg]:absolute`,
                      globalBgSVGFixedWidth,
                      globalBgSVGMaxWidth,
                      globalBgSVGMinWidth,
                      globalBgSVGFixedHeight,
                      globalBgSVGMaxHeight,
                      globalBgSVGMinHeight,
                      globalBgSVGPositionTop,
                      globalBgSVGPositionRight,
                      globalBgSVGPositionBottom,
                      globalBgSVGPositionLeft,
                      globalBgSVGTranslateX,
                      globalBgSVGTranslateY,
                      globalBgSVGColor,
                      globalBgSVGOpacity,
                  ]
                : []),
            angleClass,
            bgFixed &&
                `fixed [will-change:transform] [transform:translateZ(0)]`,
            !bgFixed && `absolute`,
            globalBackground(rw),
        ]).toString(),
    };

    if (globalID.length > 0) {
        console.log("adding anchor", globalID);
        rw.addAnchor(globalID);
    }

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            id: globalID.length > 0 ? globalID : rw.node.id,
        },
    });

    rw.setProps({
        classes,
        edit: mode === "edit",
        bgFixed,
        isSvg,
        isCms,
        cmsField,
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    });
};

function setSVGClass(svgString, newClassValue) {
    if (!svgString) return svgString;
    // If class exists, replace it
    if (svgString.match(/class="[^"]*"/)) {
        return svgString.replace(/class="[^"]*"/, `class="${newClassValue}"`);
    }
    // Otherwise, add class attribute to the <svg ...> tag
    return svgString.replace(/<svg([^>]*)/, `<svg$1 class="${newClassValue}"`);
}

exports.transformHook = transformHook;
