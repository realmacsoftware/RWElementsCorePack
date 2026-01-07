/**
 * @param {Object} app - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const globalTextFontsAndTextStyles = (app) => {
    const {
        globalTextFontFamily,
        globalTextFontSize,
        globalTextFontWeight,
        globalTextLetterSpacing,
        globalTextLineHeight,
        globalTextItalic,
        globalTextTextShadow,
        globalTextTextTransform,
        globalTextWhiteSpace,
        globalTextTextDecoration,
        globalTextTextDecorationStyle,
        globalTextTextDecorationOffset,
        globalTextTextDecorationColor,
        globalTextTextDecorationOpacity,
    } = app.props;

    return classnames()
        .add([
            globalTextFontFamily,
            globalTextFontSize,
            globalTextFontWeight,
            globalTextLetterSpacing,
            globalTextLineHeight,
            globalTextItalic,
            globalTextTextShadow,
            globalTextTextTransform,
            globalTextWhiteSpace,
        ])
        .add(
            globalTextTextDecoration !== "no-underline"
                ? [
                      globalTextTextDecoration,
                      globalTextTextDecorationOffset,
                      globalTextTextDecorationStyle,
                      `${globalTextTextDecorationColor}/${globalTextTextDecorationOpacity}`,
                  ]
                : []
        )
        .toString();
};
