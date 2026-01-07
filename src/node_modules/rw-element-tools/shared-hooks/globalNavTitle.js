const globalNavTitle = (rw) => {
  const {
    globalNavTitleTextColor,
    globalNavTitleTextColorOpacity,
    globalNavTitleFont,
    globalNavTitleFontSize,
    globalNavTitleTextShadow,
    globalNavTitleFontWeight,
    globalNavTitleFontLetterSpacing,
    globalNavTitleItalic,
    globalNavTitleUnderline,
  } = rw.props;
  return classnames([
    `${globalNavTitleTextColor}/${globalNavTitleTextColorOpacity}`,
    globalNavTitleFont,
    globalNavTitleFontSize,
    globalNavTitleTextShadow,
    globalNavTitleFontWeight,
    globalNavTitleFontLetterSpacing,
    globalNavTitleItalic,
    globalNavTitleUnderline,
  ]).toString();
};
