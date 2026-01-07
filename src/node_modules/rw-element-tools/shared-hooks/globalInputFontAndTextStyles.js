/**
 * Generates border classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const globalInputFontAndTextStyles = (rw) => {
    const {
        globalInputFontAndTextStylesColor,
        globalInputFontAndTextStylesColorOpacity,
        globalInputFontAndTextStylesTextShadow,
        globalInputFontAndTextStylesTextAlign,
        globalInputFontAndTextStylesFont,
        globalInputFontAndTextStylesFontSize,
        globalInputFontAndTextStylesFontWeight,
        globalInputFontAndTextStylesLineHeight,
        globalInputFontAndTextStylesLetterSpacing,
        globalInputFontAndTextStylesTextTransform,
        globalInputFontAndTextStylesItalic,
        globalInputFontAndTextStylesUnderline,
    } = rw.props;
  
    const classes = classnames([
        globalInputFontAndTextStylesColor,
        globalInputFontAndTextStylesColorOpacity,
        globalInputFontAndTextStylesTextShadow,
        globalInputFontAndTextStylesTextAlign,
        globalInputFontAndTextStylesFont,
        globalInputFontAndTextStylesFontSize,
        globalInputFontAndTextStylesFontWeight,
        globalInputFontAndTextStylesLineHeight,
        globalInputFontAndTextStylesLetterSpacing,
        globalInputFontAndTextStylesTextTransform,
        globalInputFontAndTextStylesItalic,
        globalInputFontAndTextStylesUnderline,
    ]);
      
    return classes.toString();
  };
  