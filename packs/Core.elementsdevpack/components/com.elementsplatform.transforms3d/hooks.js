// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.
function addPrefixToTailwindClasses(classString, prefix) {
  return classString.split(/\s+/).map((cls) => {
    cls = cls.replace(/hover:/g, "");
    if (cls.includes(`${prefix}:`)) return cls;
    const match = cls.match(/^([a-z0-9]+:)(.+)$/i);
    if (match) {
      return `${match[1]}${prefix}:${match[2]}`;
    }
    return `${prefix}:${cls}`;
  }).join(" ");
}
const advancedClasses = (rw) => {
  const { display, cssClasses, overflow, zIndex } = rw.props;
  return classnames([display, cssClasses, overflow, zIndex]).toString();
};
const classnames = (initialClasses = "") => {
  let initialClassArray = Array.isArray(initialClasses) ? initialClasses : initialClasses.split(" ").filter(Boolean);
  let classes = new Set(initialClassArray);
  let currentModifier = "";
  return {
    /**
     * Adds one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to add.
     * @returns {Object} The classnames instance for chaining.
     */
    add(className) {
      const classesToAdd = Array.isArray(className) ? className : [className];
      classesToAdd.forEach((cls) => classes.add(cls));
      return this;
    },
    /**
     * Removes one or more class names.
     *
     * @param {string|string[]} className - A single class name or an array of class names to remove.
     * @returns {Object} The classnames instance for chaining.
     */
    remove(className) {
      const classesToRemove = Array.isArray(className) ? className : [className];
      classesToRemove.forEach((cls) => classes.delete(cls));
      return this;
    },
    /**
     * Toggles one or more class names.
     *
     * @param {string|string[]} classToToggle - A single class name or an array of class names to toggle.
     * @returns {Object} The classnames instance for chaining.
     */
    toggle(className) {
      const classesToToggle = Array.isArray(className) ? className : [className];
      classesToToggle.forEach((cls) => {
        classes.has(cls) ? classes.delete(cls) : classes.add(cls);
      });
      return this;
    },
    /**
     * Sets a CSS modifier (e.g., 'hover', 'focus').
     *
     * @param {string} modifier - The modifier to set, with or without a trailing colon.
     * @returns {Object} The classnames instance for chaining.
     */
    modifier(modifier) {
      if (!modifier) {
        return this;
      }
      currentModifier = modifier.replace(/:$/, "").trim();
      return this;
    },
    /**
     * Gets the final class string with the current modifier applied.
     *
     * @returns {string} The final class string.
     */
    getClasses() {
      const classArray = Array.from(classes);
      return currentModifier ? classArray.map((cls) => `${currentModifier}:${cls}`).join(" ") : classArray.filter(Boolean).join(" ");
    },
    /**
     * Returns the class string when the classnames instance is coerced to a string.
     *
     * @returns {string} The final class string.
     */
    toString() {
      return this.getClasses();
    }
  };
};
const getHoverPrefix = (node = {}, applyTo = "", hoverGroup = "self", customId = "") => {
  const needsPeerPrefix = node.isContainer && ["background", "content"].includes(applyTo);
  if (hoverGroup === "parent") return `group-hover/${node.parent.id}`;
  if (hoverGroup === "custom") return `group-hover/${customId}`;
  if (needsPeerPrefix && hoverGroup === "self")
    return `group-hover/${node.id}`;
  return hoverGroup === "self" ? needsPeerPrefix ? `peer-hover` : "hover" : `group-hover/${hoverGroup}`;
};
const globalMouse3D = (app) => {
  const {
    globalControlType3D: type,
    globalHoverGroup3D: hoverGroup,
    globalHoverGroupCustomId3D: customId
  } = app.props;
  if (type != "mouse") return {};
  let over = hoverGroup || "self";
  if (over == "parent") over = app.node.parent && app.node.parent.id || "self";
  if (over == "custom") over = (customId || "").trim() || "self";
  return { "data-m3d-over": over };
};
const globalPerspective3D = (app, args = {}) => {
  const {
    globalControlType3D: type,
    globalTransformPerspective: perspective,
    globalTransformPerspectiveOrigin: perspectiveOrigin
  } = app.props;
  const classes = classnames();
  if (type != "none") {
    classes.add([
      perspective,
      perspectiveOrigin
    ]);
  }
  return classes.toString();
};
const globalTransforms = (app, args = {}) => {
  const {
    globalControlTypeTransforms: type,
    globalHoverGroupTransforms: hoverGroup,
    globalHoverGroupCustomIdTransforms: customId,
    globalTransformsApplyTo: applyTo,
    globalTransformOrigin: origin,
    globalTransformScale: scale,
    globalTransformRotate: rotate,
    globalTransformSkewX: skewX,
    globalTransformSkewY: skewY,
    globalTransformTranslateX: translateX,
    globalTransformTranslateY: translateY,
    globalTransformScaleEnd: scaleEnd,
    globalTransformRotateEnd: rotateEnd,
    globalTransformSkewXEnd: skewXEnd,
    globalTransformSkewYEnd: skewYEnd,
    globalTransformTranslateXEnd: translateXEnd,
    globalTransformTranslateYEnd: translateYEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  const classes = classnames();
  if (type != "none") {
    classes.add([
      "transform",
      origin,
      scale,
      rotate,
      skewX,
      skewY,
      translateX,
      translateY
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(scaleEnd, prefix),
      addPrefixToTailwindClasses(rotateEnd, prefix),
      addPrefixToTailwindClasses(skewXEnd, prefix),
      addPrefixToTailwindClasses(skewYEnd, prefix),
      addPrefixToTailwindClasses(translateXEnd, prefix),
      addPrefixToTailwindClasses(translateYEnd, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        `data-[active=true]:${scaleEnd}`,
        `data-[active=true]:${rotateEnd}`,
        `data-[active=true]:${skewXEnd}`,
        `data-[active=true]:${skewYEnd}`,
        `data-[active=true]:${translateXEnd}`,
        `data-[active=true]:${translateYEnd}`
      ]);
    }
    if (wantsFocus) {
      classes.add([
        `${prefix.replace(/hover/g, "focus")}:${scaleEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${rotateEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${skewXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${skewYEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateYEnd}`
      ]);
    }
  }
  return classes.toString();
};
const mouse3DDeviceOrder = ["base", "sm", "md", "lg", "xl", "2xl"];
const buildMouse3DClass = (utility, start, end, cssVar, prefix = "") => {
  if (start === end) return `${prefix}${utility}-[${start}]`;
  return `${prefix}${utility}-[calc(${start}*(1_-_var(${cssVar},0))_+_${end}*var(${cssVar},0))]`;
};
const mouse3DChannel = (app, { utility, unit, cssVar, startId, endId, fallback }) => {
  const responsiveProps = app.responsiveProps || {};
  const startValues = responsiveProps[startId] || {};
  const endValues = responsiveProps[endId] || {};
  const pick = (value, previous) => value == null || value === "" ? previous : `${value}${unit}`;
  let start = pick(startValues.base, fallback);
  let end = pick(endValues.base, fallback);
  const classes = [buildMouse3DClass(utility, start, end, cssVar)];
  mouse3DDeviceOrder.slice(1).forEach((device) => {
    const nextStart = pick(startValues[device], start);
    const nextEnd = pick(endValues[device], end);
    if (nextStart === start && nextEnd === end) return;
    start = nextStart;
    end = nextEnd;
    classes.push(
      buildMouse3DClass(utility, start, end, cssVar, `${device}:`)
    );
  });
  return classes;
};
const globalTransforms3D = (app, args = {}) => {
  const {
    globalControlType3D: type,
    globalHoverGroup3D: hoverGroup,
    globalHoverGroupCustomId3D: customId,
    globalTransforms3DApplyTo: applyTo,
    globalTransformBackface: backface,
    globalTransformRotateX: rotateX,
    globalTransformRotateY: rotateY,
    globalTransformScaleZ: scaleZ,
    globalTransformTranslateZ: translateZ,
    globalTransformRotateXEnd: rotateXEnd,
    globalTransformRotateYEnd: rotateYEnd,
    globalTransformScaleZEnd: scaleZEnd,
    globalTransformTranslateZEnd: translateZEnd
  } = app.props;
  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;
  const prefix = getHoverPrefix(node, applyTo, hoverGroup, customId);
  const classes = classnames();
  if (type != "none" && type != "mouse") {
    classes.add([
      backface,
      rotateX,
      rotateY,
      scaleZ,
      translateZ
    ]);
  }
  if (type == "mouse") {
    classes.add([
      backface,
      // Cursor Y drives Rotate X, cursor X drives Rotate Y,
      // distance-from-centre drives Scale Z and Depth.
      ...mouse3DChannel(app, {
        utility: "rotate-x",
        unit: "deg",
        cssVar: "--rw-m3d-y",
        startId: "globalTransformRotateX",
        endId: "globalTransformRotateXEnd",
        fallback: "0deg"
      }),
      ...mouse3DChannel(app, {
        utility: "rotate-y",
        unit: "deg",
        cssVar: "--rw-m3d-x",
        startId: "globalTransformRotateY",
        endId: "globalTransformRotateYEnd",
        fallback: "0deg"
      }),
      ...mouse3DChannel(app, {
        utility: "scale-z",
        unit: "%",
        cssVar: "--rw-m3d-r",
        startId: "globalTransformScaleZ",
        endId: "globalTransformScaleZEnd",
        fallback: "100%"
      }),
      ...mouse3DChannel(app, {
        utility: "translate-z",
        unit: "",
        cssVar: "--rw-m3d-r",
        startId: "globalTransformTranslateZ",
        endId: "globalTransformTranslateZEnd",
        fallback: "0px"
      })
    ]);
  }
  if (type == "hover") {
    classes.add([
      addPrefixToTailwindClasses(rotateXEnd, prefix),
      addPrefixToTailwindClasses(rotateYEnd, prefix),
      addPrefixToTailwindClasses(scaleZEnd, prefix),
      addPrefixToTailwindClasses(translateZEnd, prefix)
    ]);
    if (wantsActive) {
      classes.add([
        `data-[active=true]:${rotateXEnd}`,
        `data-[active=true]:${rotateYEnd}`,
        `data-[active=true]:${scaleZEnd}`,
        `data-[active=true]:${translateZEnd}`
      ]);
    }
    if (wantsFocus) {
      classes.add([
        `${prefix.replace(/hover/g, "focus")}:${rotateXEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${rotateYEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${scaleZEnd}`,
        `${prefix.replace(/hover/g, "focus")}:${translateZEnd}`
      ]);
    }
  }
  return classes.toString();
};
const globalTransitions = (app, alwaysWantsHover = false) => {
  const {
    globalControlTypeTransforms,
    globalControlTypeEffects,
    globalControlTypeFilters,
    globalFilterEnable,
    globalControlTypeBorders,
    globalControlTypeBg,
    globalControlTypeOverlay,
    globalControlTypeSVGFill,
    globalControlTypeSVGStroke,
    globalControlTypeOutline,
    globalControlType3D,
    globalTransitionsProperty: property,
    globalTransitionsDuration: duration,
    globalTransitionsDelay: delay,
    globalTransitionsTimingFunction: timingFunction,
    globalTransitionsTimingFunctionCustom: customTimingFunction
  } = app.props;
  const customTimingFunctionFormatted = customTimingFunction == null ? void 0 : customTimingFunction.replace(/,\s/g, ",_");
  const aControlWantsHover = () => {
    return alwaysWantsHover || globalFilterEnable || [
      globalControlTypeTransforms,
      globalControlTypeEffects,
      globalControlTypeFilters,
      globalControlTypeBorders,
      globalControlTypeBg,
      globalControlTypeSVGFill,
      globalControlTypeSVGStroke,
      globalControlTypeOverlay,
      globalControlTypeOutline,
      globalControlType3D
    ].some((prop) => {
      const validValues = ["none", "static", "", void 0, null];
      return !validValues.includes(prop);
    });
  };
  return aControlWantsHover() ? classnames([
    // `transform-gpu will-change-transform`,
    property === "transition-default" ? "transition" : property,
    duration,
    delay,
    timingFunction === "custom" ? customTimingFunctionFormatted : timingFunction
  ]).toString() : "";
};
const transformHook = (rw) => {
  const { globalID } = rw.props;
  const { id } = rw.node;
  const isEdit = rw.project.mode == "edit";
  const classes = {
    wrapper: classnames([
      `group/${id} group/transforms3d`,
      globalID && `group/${globalID}`,
      advancedClasses(rw),
      globalPerspective3D(rw)
    ]).toString(),
    transform: classnames([
      "transform",
      globalTransitions(rw),
      globalTransforms(rw),
      globalTransforms3D(rw)
    ]).toString()
  };
  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: { id: globalID, ...isEdit ? {} : globalMouse3D(rw) }
  });
  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }
  rw.setProps({ classes });
};
exports.transformHook = transformHook;
