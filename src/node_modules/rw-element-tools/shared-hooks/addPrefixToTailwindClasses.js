/**
 * Adds a prefix (like "hover:" or "group-hover:") to Tailwind classes.
 * Handles classes that already have modifiers by inserting the prefix after the existing modifier.
 */
function addPrefixToTailwindClasses(classString, prefix) {
    return classString
        .split(/\s+/)
        .map((cls) => {
            // Remove "hover:" from the class string to avoid duplication
            cls = cls.replace(/hover:/g, "");

            // If already has prefix after modifier, skip
            if (cls.includes(`${prefix}:`)) return cls;
            // If has modifier (e.g. md:), insert prefix after modifier
            const match = cls.match(/^([a-z0-9]+:)(.+)$/i);
            if (match) {
                return `${match[1]}${prefix}:${match[2]}`;
            }
            // Otherwise, just add prefix at start
            return `${prefix}:${cls}`;
        })
        .join(" ");
}

