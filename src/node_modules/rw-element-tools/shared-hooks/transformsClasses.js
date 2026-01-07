const transformsClasses = (app) => {
  const {
    transformsWantsEffectsInEditor: wantsEffectsInEditor,
    transformsEnabled: enabled,

    transformsTimingDuration: duration,
    transformsTimingDelay: delay,
    transformsTimingFunction: timingFunction,
    transformsOrigin: origin,

    transformsApplyTo: applyTo,
    transformsMode: mode,
    transformsTriggerElement: modeElement,
    transformsTriggerOnce: triggerOnce,
    transformsThreshold: threshold,

    transformsTranslateX: translateX,
    transformsTranslateY: translateY,
    transformsSkewX: skewX,
    transformsSkewY: skewY,
    transformsOpacity: opacity,
    transformsRotate: rotate,
    transformsScale: scale,
    transformsBlur: blur,
    transformsBrightness: brightness,
    transformsSaturation: saturation,

    transformsTranslateXActive: translateXActive,
    transformsTranslateYActive: translateYActive,
    transformsSkewXActive: skewXActive,
    transformsSkewYActive: skewYActive,
    transformsOpacityActive: opacityActive,
    transformsRotateActive: rotateActive,
    transformsScaleActive: scaleActive,
    transformsBlurActive: blurActive,
    transformsBrightnessActive: brightnessActive,
    transformsSaturationActive: saturationActive,
  } = app.props;

  if (!enabled) {
    return {
      classes: {
        general: "",
        from: "",
        to: "",
      },
      rootElementArgs: {},
    };
  }

  const { mode: projectMode } = app.project;
  const { id } = app.node;

  const addEffects = projectMode !== "edit" || wantsEffectsInEditor;

  // Determine the trigger element based on the mode
  const triggerElement = (() => {
    if (!applyTo || applyTo === "everything") return modeElement;
    if (modeElement === "self") return app.node.id;
    return modeElement;
  })();

  // Determine the hover prefix based on the trigger element
  const hoverPrefix =
    triggerElement === "self" || !triggerElement
      ? "hover:"
      : `group-hover/${triggerElement}:`;

  const prefix = mode === "hover" ? hoverPrefix : "";

  const motionClass =
    "transform-gpu transition-all reduce-motion:transition-none";

  const effectClasses =
    addEffects
      ? [translateX, translateY, skewX, skewY, opacity, rotate, scale, blur, brightness, saturation]
      : [];

  const hoverEffectClasses =
    addEffects && mode === "hover"
      ? [
        `${prefix}${translateXActive}`,
        `${prefix}${translateYActive}`,
        `${prefix}${skewXActive}`,
        `${prefix}${skewYActive}`,
        `${prefix}${opacityActive}`,
        `${prefix}${rotateActive}`,
        `${prefix}${scaleActive}`,
        `${prefix}${blurActive}`,
        `${prefix}${brightnessActive}`,
        `${prefix}${saturationActive}`,
      ]
      : [];

  const baseClasses = [motionClass, duration, delay, timingFunction, origin];

  const general = classnames([
    ...baseClasses,
    ...effectClasses,
    ...hoverEffectClasses,
  ]).toString();

  const from = classnames([
    translateX,
    translateY,
    skewX,
    skewY,
    opacity,
    rotate,
    scale,
    blur,
    brightness,
    saturation,
  ]).toString();

  const to = classnames([
    translateXActive,
    translateYActive,
    skewXActive,
    skewYActive,
    opacityActive,
    rotateActive,
    scaleActive,
    blurActive,
    brightnessActive,
    saturationActive,
  ]).toString();

  const getArgs = () => {
    return mode !== "click" ? {} : {
      "x-data": `effectsTransforms('${modeElement}')`,
      "x-bind": "item",
      "data-from": from,
      "data-to": to,
    };
  };

  return {
    classes: {
      general,
      from,
      to,
    },
    rootElementArgs: getArgs(),
  };
};
