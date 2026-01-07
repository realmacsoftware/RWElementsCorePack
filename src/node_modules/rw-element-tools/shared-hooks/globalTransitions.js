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
    globalTransitionsProperty: property,
    globalTransitionsDuration: duration,
    globalTransitionsDelay: delay,
    globalTransitionsTimingFunction: timingFunction,
    globalTransitionsTimingFunctionCustom: customTimingFunction,
  } = app.props;

  const customTimingFunctionFormatted = customTimingFunction?.replace(/,\s/g, ',_');

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
    ].some(prop => {
        const validValues = ['none', 'static', '', undefined, null];
        return !validValues.includes(prop);
    });
  }

  return aControlWantsHover()
    ? classnames([
      // `transform-gpu will-change-transform`,
      property === 'transition-default' ? 'transition' : property,
      duration,
      delay,
      timingFunction === 'custom' ? customTimingFunctionFormatted : timingFunction,
    ]).toString()
    : '';
};
