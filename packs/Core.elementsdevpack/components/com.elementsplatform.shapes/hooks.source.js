const asPercent = (value) => {
    const formattedValue = `${value ?? 0}`.trim();
    return formattedValue.endsWith("%") ? formattedValue : `${formattedValue}%`;
};

const arbitraryValue = (value, fallback) => `${value || fallback}`.trim().replace(/\s+/g, "_");

const clipPathClass = (value) => `[clip-path:${arbitraryValue(value, "none")}]`;

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

const shapeClasses = (rw) => {
    const {
        shapeType,
        shapePreset,
        shapeCircleRadius,
        shapeCirclePosition,
        shapeEllipseRadiusX,
        shapeEllipseRadiusY,
        shapeEllipsePosition,
        shapeInsetTop,
        shapeInsetRight,
        shapeInsetBottom,
        shapeInsetLeft,
        shapeInsetRadius,
        shapeCustom,
    } = rw.props;

    switch (shapeType) {
        case "preset":
            return [clipPathClass(shapePresets[shapePreset] || shapePresets.triangle)];
        case "circle":
            return [
                clipPathClass(`circle(${asPercent(shapeCircleRadius)} at ${shapeCirclePosition || "center"})`),
            ];
        case "ellipse":
            return [
                clipPathClass(
                    `ellipse(${asPercent(shapeEllipseRadiusX)} ${asPercent(shapeEllipseRadiusY)} at ${shapeEllipsePosition || "center"})`
                ),
            ];
        case "inset": {
            const edges = [shapeInsetTop, shapeInsetRight, shapeInsetBottom, shapeInsetLeft]
                .map(asPercent)
                .join(" ");
            const radius = Number(shapeInsetRadius) > 0 ? ` round ${asPercent(shapeInsetRadius)}` : "";
            return [clipPathClass(`inset(${edges}${radius})`)];
        }
        case "custom":
            return [clipPathClass(shapeCustom)];
        case "none":
        default:
            return [];
    }
};

const transformHook = (rw) => {
    const { globalID } = rw.props;
    const { id } = rw.node;

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
            "block w-full h-full",
            globalTransitions(rw),
            ...shapeClasses(rw),
        ]).toString(),
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: { id: globalID },
    });

    if ((globalID || "").length > 0) {
        rw.addAnchor(globalID);
    }

    rw.setProps({ classes });
};

exports.transformHook = transformHook;
