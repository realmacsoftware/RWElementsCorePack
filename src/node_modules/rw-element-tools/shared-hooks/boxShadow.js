/**
 * Generates border classes based on props.
 *
 * @param {Object} props - The properties object containing style definitions.
 * @returns {string} The generated class string.
 */
const boxShadow = (app) => {
  const { globalBoxShadow, globalBoxShadowHover } = app.props;

  return classnames().add([globalBoxShadow, globalBoxShadowHover]).toString();
};
