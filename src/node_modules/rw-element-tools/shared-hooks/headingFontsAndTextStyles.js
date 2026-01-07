/**
 * Generates border classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const headingFontsAndTextStyles = (rw, modifier) => {
  const {
    headingTextAlign,
    headingFonts,
    headingTextStyles,
    headingTextStylesFontWeight,
    headingTextStylesLetterSpacing,
    headingTextStylesLineHeight,
    headingItalic,
    headingTextShadow,
    headingTextTransform,
    headingTextDecoration,
    headingTextDecorationOffset,
    headingTextDecorationStyle,
    headingTextDecorationColor,
    headingTextDecorationOpacity,
  } = rw.props;

  return classnames()
    .add([
      headingTextAlign,
      headingFonts,
      headingTextStyles,
      headingTextStylesFontWeight,
      headingTextStylesLetterSpacing,
      headingTextStylesLineHeight,
      headingItalic,
      headingTextShadow,
      headingTextTransform,
    ])
    .add(
      headingTextDecoration !== "no-underline"
        ? [
          headingTextDecoration,
          headingTextDecorationOffset,
          headingTextDecorationStyle,
          `${headingTextDecorationColor}/${headingTextDecorationOpacity}`,
        ]
        : []
    )
    .modifier(modifier)
    .toString();
};
