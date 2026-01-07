// @TODO: Delete this when all controls migrated
const border = (rw, modifier) => globalBorder(rw, modifier);

const globalBorder = (rw) => {
  const {
    borderStyle,
    borderColor,
    borderColorOpacity,
    borderWidth,
    borderColorHover,
    borderColorOpacityHover,
    borderWidthHover,
  } = rw.props;

  if (borderStyle === "border-none") {
    return borderStyle;
  }

  const borderClasses = [
    borderStyle,
    borderWidth,
    `${borderColor}/${borderColorOpacity}`,
  ];

  if (borderColorHover) {
    borderClasses.push(`${borderColorHover}/${borderColorOpacityHover}`);
  }

  if (borderWidthHover) {
    borderClasses.push(borderWidthHover);
  }

  return classnames(borderClasses).toString();
};
