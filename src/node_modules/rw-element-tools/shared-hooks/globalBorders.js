const globalBorders = (app, args = {}) => {
  const {
    globalControlTypeBorders: type,
    globalBordersColor: color,
    globalBordersColorOpacity: colorOpacity,
    globalBordersWidth: width,
    globalBordersRadius: radius,
    globalBordersStyle: style,
    globalBordersColorEnd: colorEnd,
    globalBordersColorOpacityEnd: colorOpacityEnd,
    globalBordersWidthEnd: widthEnd,
    globalBordersRadiusEnd: radiusEnd,
    globalBordersStyleEnd: styleEnd,
  } = app.props;

  const classes = [];

  const { node } = app;
  node.isContainer = args.isContainer || false;
  const wantsActive = args.active || false;
  const wantsFocus = args.focus || false;

  if (type == 'none') {
    return '';
  }

  classes.push(
    width,
    style,
    radius,
    color.split(' ')
        .filter(Boolean)  // Remove empty strings
        .map(c => `${c.trim()}/${colorOpacity}`)
        .join(' '),
  );

  const prefix = getHoverPrefix(node, 'background', 'self');
  if (type == 'hover') {
    classes.push(
      widthEnd,
      radiusEnd,
      `${prefix}:${styleEnd}`,
      colorEnd.split(' ')
          .filter(Boolean)
          .map(c => `${prefix}:${c.trim()}/${colorOpacityEnd}`)
          .join(' '),
    );
  }

  if (wantsActive) {
    const endColor = type == 'hover' ? colorEnd : color;
    const endWidth = type == 'hover' ? widthEnd : width;
    const endRadius = type == 'hover' ? radiusEnd : radius;
    const endStyle = type == 'hover' ? styleEnd : style;

    classes.push(
      endWidth.replace(/hover/g, 'data-[active=true]'),
      endRadius.replace(/hover/g, 'data-[active=true]'),
      `data-[active=true]:${endStyle}`,
      endColor.split(' ')
          .filter(Boolean)
          .map(c => `data-[active=true]:${c.trim()}/${colorOpacityEnd}`)
          .join(' '),
    );
  }

  if (wantsFocus) {
    const endColor = type == 'hover' ? colorEnd : color;
    const endWidth = type == 'hover' ? widthEnd : width;
    const endRadius = type == 'hover' ? radiusEnd : radius;
    const endStyle = type == 'hover' ? styleEnd : style;

    classes.push(
      endWidth.replace(/hover/g, 'focus'),
      endRadius.replace(/hover/g, 'focus'),
      `${prefix.replace(/hover/g, "focus")}:${endStyle}`,
      endColor.split(' ')
          .filter(Boolean)
          .map(c => `${prefix.replace(/hover/g, "focus")}:${c.trim()}/${colorOpacityEnd}`)
          .join(' '),
    );
  }

  return classnames(classes).toString();
}
