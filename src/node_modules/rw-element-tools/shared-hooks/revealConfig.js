const revealConfig = (app) => {
  const {
    revealsEnabled: enabled,
    revealsMarkers: markers,

    revealsTimingDuration: duration,
    revealsTimingDelay: delay,
    revealsTimingFunction: timingFunction,
    revealsOrigin: origin,
    revealsScrub: scrub,
    revealsStartTriggerElement: startTriggerElement,
    revealsStartTriggerViewport: startTriggerViewport,
    revealsOnEnterAction: onEnterAction,
    revealsOnLeaveAction: onLeaveAction,
    revealsOnEnterBackAction: onEnterBackAction,
    revealsOnLeaveBackAction: onLeaveBackAction,

    revealsTranslateX: translateX,
    revealsTranslateY: translateY,
    revealsOpacity: opacity,
    revealsRotate: rotate,
    revealsScale: scale,
    revealsBlur: blur,
    revealsSaturation: saturation,

    revealsTranslateXEnd: translateXEnd,
    revealsTranslateYEnd: translateYEnd,
    revealsOpacityEnd: opacityEnd,
    revealsRotateEnd: rotateEnd,
    revealsScaleEnd: scaleEnd,
    revealsBlurEnd: blurEnd,
    revealsSaturationEnd: saturationEnd,
  } = app.props;

  const { id } = app.node;
  const { title: name } = app.component;
  const { mode } = app.project;

  const setConfig = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacity) / 100)),
    x: translateX,
    y: translateY,
    rotation: rotate,
    scale: parseFloat(scale) / 100,
    filter: `blur(${parseFloat(blur) || 0}px) saturate(${parseFloat(saturation) || 0}%)`,
    transformOrigin: origin,
  };

  const config = {
    trigger: `.${id}`,
    start: `${startTriggerElement} ${startTriggerViewport}`,
  };

  const scrollTrigger = {
    start: `${startTriggerElement} ${startTriggerViewport}`,
    end: scrub == 'true' ? "center center" : null,
    toggleActions: `${onEnterAction} ${onLeaveAction} ${onEnterBackAction} ${onLeaveBackAction}`,
    scrub: scrub,
    id: `${name}-${id.slice(0, 5)}`,
    markers: markers && mode != 'publish',
  };

  const onEnter = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacityEnd) / 100)),
    x: translateXEnd,
    y: translateYEnd,
    rotation: rotateEnd,
    scale: parseFloat(scaleEnd) / 100,
    filter: `blur(${blurEnd}px) saturate(${saturationEnd}%)`,
    ease: timingFunction,
    duration: Math.max(0, parseFloat(duration) / 1000),
    delay: Math.max(0, parseFloat(delay) / 1000),
  };

  const onLeaveBack = {
    opacity: Math.max(0, Math.min(1, parseFloat(opacity) / 100)),
    x: parseFloat(translateX) || 0,
    y: parseFloat(translateY) || 0,
    rotation: parseFloat(rotate) || 0,
    scale: parseFloat(scale) / 100 || 1,
    filter: `blur(${parseFloat(blur) || 0}px) saturate(${parseFloat(saturation) || 0}%)`,
    ease: timingFunction,
    duration: (parseFloat(duration) || 0) / 1000,
    delay: (parseFloat(delay) || 0) / 1000,
  };

  const rootElementArgs = enabled
    ? {
      "data-reveal": "",
      "data-reveal-name": name,
      "data-reveal-target": `reveal-${id}`,
      "data-reveal-set-config": JSON.stringify(setConfig).replace(/"/g, "'"),
      // "data-reveal-config": JSON.stringify(config).replace(/"/g, "'"),
      "data-reveal-on-enter": JSON.stringify(onEnter).replace(/"/g, "'"),
      "data-reveal-on-leave-back": JSON.stringify(onLeaveBack).replace(/"/g, "'"),
      "data-reveal-scroll-trigger": JSON.stringify(scrollTrigger).replace(/"/g, "'"),
    }
    : {};

  const classes = {
    revealWrapper: enabled ? `reveal-${id}` : null,
  }

  return {
    isEnabled: enabled,
    rootElementArgs,
    setConfig: JSON.stringify(setConfig).replace(/"/g, "'"),
    config: JSON.stringify(config).replace(/"/g, "'"),
    scrollTrigger: JSON.stringify(scrollTrigger).replace(/"/g, "'"),
    onEnter: JSON.stringify(onEnter).replace(/"/g, "'"),
    onLeaveBack: JSON.stringify(onLeaveBack).replace(/"/g, "'"),
    classes,
  };
};
