const transformHook = (rw) => {
    const {
        globalID,
        svg,
        stripSize,
        stripFill,
        stripStroke,
        stripStyles,
        globalControlTypeSVGFill,
        fillColorHoverElement,
        fillColor,
        fillColorEnd,
        fillColorOpacity,
        fillColorOpacityEnd,
        globalControlTypeSVGStroke,
        strokeColorHoverElement,
        strokeColor,
        strokeColorEnd,
        strokeWidth,
        strokeWidthEnd,
        strokeColorOpacity,
        strokeColorOpacityEnd,
    } = rw.props;
    const link = globalLink(rw);

    const hasSVG = svg?.image;

    const classes = classnames([
        globalSizing(rw),
        globalLayout(rw),
        globalSpacing(rw),
        globalTransitions(rw),
        globalEffects(rw),
        globalTransforms(rw),
        globalFilters(rw),
        advancedClasses(rw),
    ]).toString();

    const { id: parentID } = rw.node.parent;
    const fillColorPrefix =
        fillColorHoverElement == "self" ? "hover" : `group-hover/${parentID}`;
    const strokeColorPrefix =
        strokeColorHoverElement == "self" ? "hover" : `group-hover/${parentID}`;

    const svgClasses = classnames([
        globalSizing(rw),
        globalTransitions(rw),
        globalControlTypeSVGFill != "none" ? `${fillColor}` : null,
        globalControlTypeSVGFill != "none" ? fillColorOpacity : null,
        globalControlTypeSVGStroke != "none"
            ? `${strokeColor} ${strokeWidth}`
            : null,
        globalControlTypeSVGStroke != "none" ? strokeColorOpacity : null,
        globalControlTypeSVGFill == "hover"
            ? fillColorEnd.replaceAll("hover", fillColorPrefix)
            : null,
        globalControlTypeSVGFill == "hover"
            ? fillColorOpacityEnd.replaceAll("hover", fillColorPrefix)
            : null,
        globalControlTypeSVGStroke == "hover"
            ? `${strokeColorEnd.replaceAll(
                  "hover",
                  strokeColorPrefix
              )} ${strokeWidthEnd.replaceAll("hover", strokeColorPrefix)}`
            : null,
        globalControlTypeSVGStroke == "hover"
            ? strokeColorOpacityEnd.replaceAll("hover", strokeColorPrefix)
            : null,
    ]);

    // const cleanSvg = () => {
    //     if (!svg.image || typeof svg.image !== "string") {
    //         return "";
    //     }

    //     // Basic check to see if the string looks like an SVG
    //     if (!svg.image.includes("<svg")) {
    //         return svg.image;
    //     }

    //     // First clean up all attributes we want to remove or standardize
    //     let cleaned = svg.image
    //         .replace(/fill="(?!none")[^"]*"/g, 'fill="currentColor"')
    //         .replace(/width="[^"]*"/g, "")
    //         .replace(/height="[^"]*"/g, "")
    //         .replace(/stroke-width="[^"]*"/g, "")
    //         .replace(/style="[^"]*"/g, "");

    //     // Then add our classes to the svg tag
    //     cleaned = cleaned.includes("<svg")
    //         ? cleaned.replace(/<svg([^>]*)>/g, (match, attributes) => {
    //               const existingClass = attributes.match(/class="([^"]*)"/);
    //               const existingClasses = existingClass
    //                   ? existingClass[1] + " "
    //                   : "";
    //               return match
    //                   .replace(/class="[^"]*"/, "")
    //                   .replace(
    //                       "<svg",
    //                       `<svg class="${existingClasses}${svgClasses}"`
    //                   );
    //           })
    //         : cleaned;

    //     return cleaned;
    // };

    const cleanSvg = () => {
        if (!svg.image || typeof svg.image !== "string") {
            return "";
        }

        // Basic check to see if the string looks like an SVG
        if (!svg.image.includes("<svg")) {
            return svg.image;
        }

        // First clean up all attributes we want to remove or standardize
        let cleaned = svg.image;

        // Only strip fill if enabled
        if (stripFill) {
            cleaned = cleaned.replace(
                /fill="(?!none")[^"]*"/g,
                'fill="currentColor"'
            );
        }

        // Only strip stroke attributes if enabled - do this BEFORE size stripping
        if (stripStroke) {
            cleaned = cleaned.replace(/stroke-width="[^"]*"/g, "");
        }

        // Only strip size attributes if enabled
        if (stripSize) {
            cleaned = cleaned
                .replace(/(?<!stroke-)width="[^"]*"/g, "") // Don't match width if preceded by stroke-
                .replace(/\bheight="[^"]*"/g, "");
        }

        // Only strip style attributes if enabled
        if (stripStyles) {
            cleaned = cleaned.replace(/style="[^"]*"/g, "");
        }

        // Then add our classes to the svg tag
        cleaned = cleaned.includes("<svg")
            ? cleaned.replace(/<svg([^>]*)>/g, (match, attributes) => {
                  const existingClass = attributes.match(/class="([^"]*)"/);
                  const existingClasses = existingClass
                      ? existingClass[1] + " "
                      : "";
                  return match
                      .replace(/class="[^"]*"/, "")
                      .replace(
                          "<svg",
                          `<svg class="${existingClasses}${svgClasses}"`
                      );
              })
            : cleaned;

        return cleaned;
    };

    const placeHolderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${svgClasses}">
  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
</svg>`;

    rw.setRootElement({
        as: link.hasLink ? "a" : "div",
        class: classes,
        args: {
            rwResourceDropZone: "svg",
            ...link.args,
            id: globalID,
        },
    });

    if (globalID.length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({
        svg: hasSVG ? cleanSvg(svg.image, svgClasses) : placeHolderSvg,
    });
};

exports.transformHook = transformHook;
