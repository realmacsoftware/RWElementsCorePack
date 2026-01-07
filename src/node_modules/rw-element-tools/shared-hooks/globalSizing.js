const globalSizing = (app) => {
  const {
    globalHeight: height,
    globalWidth: width,
    globalSizingMinMaxEnabled: minMaxEnabled,
    globalMinWidth: minWidth,
    globalMaxWidth: maxWidth,
    globalMinHeight: minHeight,
    globalMaxHeight: maxHeight,
  } = app.props;

  const classes = classnames([width, height]);

  if (minMaxEnabled == 'true') {
    classes.add([minWidth, minHeight, maxWidth, maxHeight]);
  }

  return classes.toString();
}
