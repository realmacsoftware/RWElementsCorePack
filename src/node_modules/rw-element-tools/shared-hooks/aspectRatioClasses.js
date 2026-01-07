/**
 * Generates aspect ratio classes based on props.
 *
 * @param {Object} props - The properties object containing aspect ratio definitions.
 * @param {string} [modifier=""] - Optional CSS modifier (e.g., 'hover', 'focus').
 * @returns {string} The generated class string.
 */
const aspectRatioClasses = (rw) => {
    const { aspectRatio, aspectRatioCustom } = rw.props;

    const aspectRatioClasses = {
        "aspect-[auto]":
            rw.component.title == "Video" ? "aspect-video" : "aspect-[auto]",
        "aspect-[custom]": aspectRatioCustom,
    };

    return classnames()
        .add(aspectRatioClasses[aspectRatio] || aspectRatio)
        .toString();
};

const objectClasses = (rw) => {
    const { aspectRatio, objectFit, objectPosition } = rw.props;

    return classnames([
        aspectRatio !== "aspect-[auto]" ? objectFit : "",
        objectPosition,
    ]).toString();
};
