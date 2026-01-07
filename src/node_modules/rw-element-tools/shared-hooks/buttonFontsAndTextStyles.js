/**
 * Generates border classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const globalButtonFontAndTextStyles = (rw, args = {}) => {
  const {
    globalButtonFontAndTextStylesTextAlign,
    globalButtonFontAndTextStylesColor,
    globalButtonFontAndTextStylesColorOpacity,
    globalButtonFontAndTextStylesFont,
    globalButtonFontAndTextStylesFontSize,
    globalButtonFontAndTextStylesTextShadow,
    globalButtonFontAndTextStylesFontWeight,
    globalButtonFontAndTextStylesLineHeight,
    globalButtonFontAndTextStylesLetterSpacing,
    globalButtonFontAndTextStylesItalic,
    globalButtonFontAndTextStylesUnderline,
    globalButtonFontAndTextStylesTextTransform,
    globalButtonFontAndTextStylesColorHover,
    globalButtonFontAndTextStylesColorOpacityHover,
    globalButtonFontAndTextStylesTextShadowHover,
  } = rw.props;

  const wantsFocus = args.focus || false;
  const wantsActive = args.active || false;

  const classes = classnames([
    globalButtonFontAndTextStylesTextAlign,
    globalButtonFontAndTextStylesColor,
    globalButtonFontAndTextStylesColorOpacity,
    globalButtonFontAndTextStylesFont,
    globalButtonFontAndTextStylesFontSize,
    globalButtonFontAndTextStylesTextShadow,
    globalButtonFontAndTextStylesFontWeight,
    globalButtonFontAndTextStylesLineHeight,
    globalButtonFontAndTextStylesLetterSpacing,
    globalButtonFontAndTextStylesItalic,
    globalButtonFontAndTextStylesUnderline,
    globalButtonFontAndTextStylesTextTransform,
    globalButtonFontAndTextStylesColorHover,
    globalButtonFontAndTextStylesColorOpacityHover,
    globalButtonFontAndTextStylesTextShadowHover,
  ]);

  if (wantsFocus) {
    classes.add([
      globalButtonFontAndTextStylesColorHover.replace('hover:', 'focus:'),
      globalButtonFontAndTextStylesColorOpacityHover.replace('hover:', 'focus:'),
      globalButtonFontAndTextStylesTextShadowHover.replace('hover:', 'focus:'),
    ]);
  }

  if (wantsActive) {
    classes.add([
      globalButtonFontAndTextStylesColorHover.replace('hover:', 'data-[active=true]:'),
      globalButtonFontAndTextStylesColorOpacityHover.replace('hover:', 'data-[active=true]:'),
      globalButtonFontAndTextStylesTextShadowHover.replace('hover:', 'data-[active=true]:'),
    ]);
  }
    
  return classes.toString();
};
