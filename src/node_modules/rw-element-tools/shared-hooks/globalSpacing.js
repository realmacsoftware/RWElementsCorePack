const globalSpacing = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin,
    globalPadding: padding,
  } = app.props;

  if (enabled == 'false') {
    return false;
  }

  return classnames([margin, padding]).toString();
}

const globalSpacingPadding = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalPadding: padding,
  } = app.props;

  return enabled == 'false'
    ? false
    : padding;
}

const globalSpacingMargin = (app) => {
  const {
    globalSpacingEnabled: enabled,
    globalMargin: margin,
  } = app.props;

  return enabled == 'false'
    ? false
    : margin;
}
