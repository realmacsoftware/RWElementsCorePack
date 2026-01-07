/**
 * Generates text style classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const textStylesClasses = (rw, modifier = "") => {
    const { props } = rw;
    const {
        textStyles,
        textStylesOverride,
        textStylesFontWeight,
        textStylesLetterSpacing,
        textStylesLineHeight,

        textStylesHover,
    } = props;

    const classes = classnames();

    validateProps(
        [
            "textStyles",
            "textStylesOverride",
            "textStylesFontWeight",
            "textStylesLetterSpacing",
            "textStylesLineHeight",
        ],
        props
    );

    classes.add([textStyles, textStylesHover]).modifier(modifier);

    if (textStylesOverride === "true") {
        classes.add([
            textStylesFontWeight,
            textStylesLetterSpacing,
            textStylesLineHeight,
        ]);
    }

    return classes.toString();
};
