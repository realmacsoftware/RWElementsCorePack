const globalNavItems = (rw, isActive = false) => {
  const {
    globalNavItemsTextColor: textColor,
    globalNavItemsTextColorOpacity: textColorOpacity,
    globalNavItemsFont: font,
    globalNavItemsFontSize: fontSize,
    globalNavItemsTextShadow: textShadow,
    globalNavItemsFontWeight: fontWeight,
    globalNavItemsLetterSpacing: letterSpacing,
    globalNavItemsItalic: italic,
    globalNavItemsUnderline: underline,

    globalNavItemsTextColorHover: textColorHover,
    globalNavItemsTextColorOpacityHover: textColorOpacityHover,
    globalNavItemsTextShadowHover: textShadowHover,
    globalNavItemsUnderlineHover: underlineHover,
  } = rw.props;

  console.log({ fontWeight });

  const inactiveStyles = {
    textColor,
    textColorOpacity,
    font,
    fontSize,
    textShadow,
    fontWeight,
    letterSpacing,
    italic,
    underline,
  };

  const activeStyles = {
    ...inactiveStyles,
    textColor: textColorHover,
    textColorOpacity: textColorOpacityHover,
    textShadow: textShadowHover,
    underline: underlineHover,

  };

  // remove hover: prefix from all active styles
  const activeStylesFormatted = Object.fromEntries(
    Object.entries(activeStyles).map(([key, value]) => [key, value.replace(/hover:/g, '')])
  );

  const hoverStyles = {
    textColorHover,
    textColorOpacityHover,
    textShadowHover,
    underlineHover,
  };

  const currentStyles = isActive ? activeStylesFormatted : inactiveStyles;

  return classnames([
    ...Object.values(currentStyles),
    ...Object.values(hoverStyles),
  ]).toString();
};
