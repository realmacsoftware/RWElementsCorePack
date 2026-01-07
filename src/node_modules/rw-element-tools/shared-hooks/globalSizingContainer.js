const globalSizingContainer = (app) => {
  const {
    globalWidthType: widthType,
    globalWidth: width,
    globalHeightType: heightType,
    globalHeight: height,

    globalSizingMinMaxEnabled: minMaxEnabled,
    globalMinWidth: minWidth,
    globalMaxWidth: maxWidth,
    globalMinHeight: minHeight,
    globalMaxHeight: maxHeight,
  } = app.props

  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    'screen': 'w-screen',
    'container': 'container w-full',
    'theme': width
  };

  const heightClasses = {
    'auto': 'h-auto',
    'full': 'h-full',
    'screen': 'h-screen',
    'theme': height
  };

  const classes = classnames([
    widthClasses[widthType],
    heightClasses[heightType]
  ]);

  if (minMaxEnabled == 'true') {
    classes.add([minWidth, minHeight, maxWidth, maxHeight]);
  }

  return classes.toString();
}
