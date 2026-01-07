/**
 * Generates border classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const subHeadingClasses = (rw, modifier) => {
    const {
        subHeadingColor,
        subHeadingColorOpacity,
        subHeadingFonts,
        subHeadingTextStyles,
        subHeadingTextStylesOverride,
        subHeadingTextStylesFontWeight,
        subHeadingTextStylesLetterSpacing,
        subHeadingTextStylesLineHeight,
    } = rw.props;

    validateProps(
        [
            "subHeadingColor",
            "subHeadingColorOpacity",
            "subHeadingFonts",
            "subHeadingTextStyles",
            "subHeadingTextStylesOverride",
            "subHeadingTextStylesFontWeight",
            "subHeadingTextStylesLetterSpacing",
            "subHeadingTextStylesLineHeight",
        ],
        rw.props
    );

    return classnames()
        .add([
            subHeadingColor,
            subHeadingColorOpacity,
            subHeadingFonts,
            subHeadingTextStyles,
            subHeadingTextStylesOverride,
            subHeadingTextStylesFontWeight,
            subHeadingTextStylesLetterSpacing,
            subHeadingTextStylesLineHeight,
        ])
        .modifier(modifier)
        .toString();
};
