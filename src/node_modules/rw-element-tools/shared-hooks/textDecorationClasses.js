/**
 * Generates text style classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const textDecorationClasses = (rw, modifier = "") => {
    const {
        textTextDecoration,
        textTextDecorationOffset,
        textTextDecorationStyle,
        textTextDecorationColor,
    } = rw.props;

    validateProps(
        [
            "textTextDecoration",
            "textTextDecorationOffset",
            "textTextDecorationStyle",
            "textTextDecorationColor",
        ],
        rw.props
    );

    return classnames()
        .add([
            textTextDecoration,
            textTextDecoration != "no-underline" && textTextDecorationOffset,
            textTextDecoration != "no-underline" && textTextDecorationStyle,
            textTextDecoration != "no-underline" && textTextDecorationColor,
        ])
        .modifier(modifier)
        .toString();
};
