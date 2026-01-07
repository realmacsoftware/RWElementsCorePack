/**
 * Validates that the required properties exist in the props object.
 *
 * @param {string[]} requiredKeys - Array of required property keys.
 * @param {Object} props - The properties object to validate.
 * @returns {boolean} True if all required properties are present, false otherwise.
 */
const validateProps = (requiredKeys, props) => {
    const missingKeys = requiredKeys.filter((key) => !props[key]);
    if (missingKeys.length > 0) {
        console.warn(`Missing properties: ${missingKeys.join(", ")}`);
        return false;
    }
    return true;
};
