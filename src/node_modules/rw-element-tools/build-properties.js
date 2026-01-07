/**
 * Properties Build Script
 * 
 * Processes properties.config.json files and generates properties.json files
 * for RapidWeaver element components.
 */

import { sync as globSync } from "glob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import * as Controls from "./controls/index.js";
import * as Properties from "./properties/index.js";
import pkg from "lodash";
const { cloneDeep } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * List of theme-related property keys that can be overridden in config files.
 * These are extracted from the property config and applied to the control.
 */
const THEME_PROPERTY_KEYS = [
  "themeColor",
  "themeFont",
  "themeBorderRadius",
  "themeBorderWidth",
  "themeSpacing",
  "themeShadow",
  "themeTextStyle",
];

/**
 * Controls automatically injected into the Advanced group.
 */
const ADVANCED_GROUP_CONTROLS = [Controls.CSSClasses, Controls.ID];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Capitalizes the first character of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The string with first character capitalized.
 */
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Lowercases the first character of a string.
 * @param {string} str - The string to lowercase.
 * @returns {string} The string with first character lowercased.
 */
function lowercaseFirst(str) {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Normalizes a control to always be an array.
 * @param {Object|Array} control - A control object or array of controls.
 * @returns {Array} Array of control objects.
 */
function normalizeToArray(control) {
  return Array.isArray(control) ? control : [control];
}

/**
 * Filters an object to only include entries with non-null values.
 * @param {Object} obj - The object to filter.
 * @returns {Object} Object with only non-null values.
 */
function filterNullValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
}

// =============================================================================
// ID TRANSFORMATION
// =============================================================================

/**
 * Transforms an ID template by replacing {{value}} with the control's ID.
 * Handles camelCase conventions:
 * - If {{value}} is at the start, keeps original casing
 * - If {{value}} is in the middle, capitalizes the control ID
 * - Parts after {{value}} are capitalized
 *
 * @example
 * // "prefix{{value}}Suffix" with controlId "margin" => "prefixMarginSuffix"
 * // "{{value}}Suffix" with controlId "margin" => "marginSuffix"
 *
 * @param {string} template - The ID template containing {{value}}.
 * @param {string} controlId - The control's original ID.
 * @returns {string} The transformed ID.
 */
function transformIdTemplate(template, controlId) {
  if (!template?.includes("{{value}}") || !controlId) {
    return controlId;
  }

  const placeholder = "{{value}}";
  const valueIndex = template.indexOf(placeholder);
  const beforeValue = template.slice(0, valueIndex);
  const afterValue = template.slice(valueIndex + placeholder.length);

  // Capitalize controlId only if placeholder is not at the start
  const transformedId = valueIndex === 0 ? controlId : capitalize(controlId);

  // Build the new ID
  let newId = beforeValue + transformedId + afterValue;

  // Ensure proper camelCase: lowercase first char if there's a prefix
  if (beforeValue) {
    newId = lowercaseFirst(newId);
  }

  // Capitalize the part after {{value}} if it exists
  if (afterValue) {
    const insertPosition = beforeValue.length + transformedId.length;
    newId =
      newId.slice(0, insertPosition) +
      capitalize(newId.slice(insertPosition));
  }

  return newId;
}

/**
 * Creates a transformer function for applying ID patterns to nested controls.
 * @param {string} pattern - The ID pattern (may contain {{value}}).
 * @returns {Function} A function that transforms ID strings.
 */
function createIdTransformer(pattern) {
  return (originalId) => {
    if (pattern?.includes("{{value}}")) {
      return pattern.replace("{{value}}", originalId);
    }
    return pattern || originalId;
  };
}

/**
 * Recursively transforms all 'id' keys in a control structure.
 * @param {*} control - The control object or array to transform.
 * @param {Function} transformer - The ID transformer function.
 * @returns {*} The control with transformed IDs.
 */
function transformIdsRecursively(control, transformer) {
  if (Array.isArray(control)) {
    return control.map((item) => transformIdsRecursively(item, transformer));
  }

  if (typeof control === "object" && control !== null) {
    const result = {};
    for (const [key, value] of Object.entries(control)) {
      if (key === "id" && typeof value === "string") {
        result[key] = transformer(value);
      } else {
        result[key] = transformIdsRecursively(value, transformer);
      }
    }
    return result;
  }

  return control;
}

// =============================================================================
// OVERRIDE & DEFAULT APPLICATION
// =============================================================================

/**
 * Merges override properties into a control.
 * For existing keys: strings replace, objects are shallow merged.
 * New keys are added directly.
 *
 * @param {Object} control - The control to merge into.
 * @param {Object} overrides - The override properties.
 * @returns {Object} The control with overrides applied.
 */
function mergeOverrides(control, overrides) {
  const result = { ...control };
  const remainingOverrides = { ...overrides };

  for (const key of Object.keys(overrides)) {
    if (key in result) {
      if (typeof overrides[key] === "string") {
        result[key] = overrides[key];
      } else {
        result[key] = { ...result[key], ...overrides[key] };
      }
      delete remainingOverrides[key];
    }
  }

  // Add any remaining overrides as new properties
  return { ...result, ...remainingOverrides };
}

/**
 * Applies theme defaults to a control.
 * Theme defaults override the corresponding theme property on the control.
 *
 * @param {Object} control - The control to apply theme defaults to.
 * @param {Object} themeDefaults - Object containing theme property overrides.
 * @returns {Object} The control with theme defaults applied.
 */
function applyThemeDefaults(control, themeDefaults) {
  if (!themeDefaults || Object.keys(themeDefaults).length === 0) {
    return control;
  }

  const result = { ...control };
  for (const [key, value] of Object.entries(themeDefaults)) {
    if (key in result) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Applies a default value to a control.
 *
 * For primitive defaults:
 * - Sets control.default if it exists
 * - Transforms item IDs if control has an items array
 *
 * For object defaults:
 * - Merges into theme properties (themeColor, etc.)
 * - Merges into control.default if it exists
 *
 * @param {Object} control - The control to apply defaults to.
 * @param {*} defaultVal - The default value (primitive or object).
 * @returns {Object} The control with defaults applied.
 */
function applyDefaultValue(control, defaultVal) {
  if (defaultVal === undefined) {
    return control;
  }

  const result = { ...control };

  if (typeof defaultVal !== "object") {
    // Primitive default: set directly and transform item IDs
    if (result.default !== undefined) {
      result.default = defaultVal;
    }

    // Transform item IDs using the default value as a pattern
    if (result.items && Array.isArray(result.items)) {
      const transformer = createIdTransformer(defaultVal);
      result.items = result.items.map((item) => {
        if (item.id && typeof item.id === "string") {
          return { ...item, id: transformer(item.id) };
        }
        return item;
      });
    }
  } else {
    // Object default: apply to theme properties and control.default
    for (const key of Object.keys(result)) {
      if (key.startsWith("theme") && typeof result[key] === "object") {
        result[key] = { ...result[key], default: defaultVal };
      }
    }

    if (result.default !== undefined) {
      result.default = { ...result.default, ...defaultVal };
    }
  }

  return result;
}

// =============================================================================
// GLOBAL CONTROL PROCESSING
// =============================================================================

/**
 * Recursively processes nested globalControl references within a control.
 * @param {*} control - The control or array to process.
 * @returns {*} The control with all globalControls expanded.
 */
function processNestedGlobalControls(control) {
  if (Array.isArray(control)) {
    return control.map(processNestedGlobalControls);
  }

  if (typeof control === "object" && control !== null && control.globalControl) {
    return processProperty(control);
  }

  return control;
}

/**
 * Processes 'use' key references in a property, replacing them with
 * the referenced Property definition from src/properties/.
 *
 * @param {Object|Array} property - The property object or array to process.
 * @returns {Object|Array} The property with 'use' keys resolved.
 */
function resolveUseReferences(property) {
  // Handle arrays by recursively processing each element
  if (Array.isArray(property)) {
    return property.map(resolveUseReferences);
  }

  const result = { ...property };

  for (const [key, value] of Object.entries(result)) {
    if (value && typeof value === "object" && value.use) {
      const referencedProperty = Properties[value.use];

      if (!referencedProperty) {
        console.warn(`Property '${value.use}' not found in Properties.`);
        continue;
      }

      // Merge: referenced property as base, then override with local values
      const { use: _, ...localOverrides } = value;
      result[key] = { ...referencedProperty, ...localOverrides };
    }
  }

  return result;
}

/**
 * Processes a single control with all transformations:
 * 1. Deep clone to avoid mutations
 * 2. Apply overrides
 * 3. Apply default values
 * 4. Apply theme defaults
 * 5. Transform ID using template
 * 6. Process nested globalControls
 * 7. Apply ID transformation to nested IDs
 * 8. Resolve 'use' references
 *
 * @param {Object} control - The base control definition.
 * @param {string} idTemplate - ID template with {{value}} placeholder.
 * @param {Object} overrides - Property overrides to apply.
 * @param {*} defaultVal - Default value to apply.
 * @param {Object} themeDefaults - Theme property overrides.
 * @returns {Object|Array} The fully processed control(s).
 */
function processControl(control, idTemplate, overrides, defaultVal, themeDefaults) {
  // 1. Deep clone to avoid mutating the original
  let result = cloneDeep(control);

  // 2. Apply property overrides
  result = mergeOverrides(result, overrides);

  // 3. Apply default value
  result = applyDefaultValue(result, defaultVal);

  // 4. Apply theme defaults
  result = applyThemeDefaults(result, themeDefaults);

  // 5. Transform the control's ID using the template
  if (idTemplate?.includes("{{value}}") && result.id) {
    result.id = transformIdTemplate(idTemplate, result.id);
  }

  // 6. Process any nested globalControls
  result = processNestedGlobalControls(result);

  // 7. Apply ID transformation to all nested IDs
  const idTransformer = createIdTransformer(result.id || "");
  result = transformIdsRecursively(result, idTransformer);

  // 8. Resolve 'use' references
  return resolveUseReferences(result);
}

/**
 * Extracts theme defaults from a property configuration.
 * @param {Object} property - The property config object.
 * @returns {Object} Object containing only defined theme properties.
 */
function extractThemeDefaults(property) {
  const themeProps = {};
  for (const key of THEME_PROPERTY_KEYS) {
    if (property[key] != null) {
      themeProps[key] = property[key];
    }
  }
  return themeProps;
}

/**
 * Processes a property from the config file.
 * If the property has a globalControl, expands it with overrides.
 * Otherwise, just resolves 'use' references.
 *
 * @param {Object} property - The property configuration object.
 * @returns {Array} Array of processed property objects.
 */
function processProperty(property) {
  // No globalControl: just resolve 'use' references
  if (!property.globalControl) {
    return [resolveUseReferences(property)];
  }

  const globalControlName = property.globalControl;
  const globalControl = Controls[globalControlName];

  if (!globalControl) {
    console.warn(`Global control '${globalControlName}' not found.`);
    return [];
  }

  // Extract special properties from the config
  const {
    globalControl: _,
    default: defaultVal,
    id: idTemplate,
    ...rest
  } = property;

  // Separate theme defaults from other overrides
  const themeDefaults = extractThemeDefaults(rest);
  const overrides = {};

  for (const [key, value] of Object.entries(rest)) {
    if (!THEME_PROPERTY_KEYS.includes(key)) {
      overrides[key] = value;
    }
  }

  // Process each control in the globalControl (may be array)
  const controls = normalizeToArray(globalControl);
  const processed = controls.map((ctrl) =>
    processControl(ctrl, idTemplate, overrides, defaultVal, themeDefaults)
  );

  // Flatten in case processControl returns arrays (from nested globalControls)
  return processed.flat();
}

// =============================================================================
// ADVANCED GROUP HANDLING
// =============================================================================

/**
 * Ensures the config has a properly structured Advanced group at the end.
 * Injects standard controls (CSSClasses, ID) at the beginning of the group.
 *
 * @param {Object} config - The configuration object with groups array.
 * @returns {Object} The config with Advanced group properly set up.
 */
function setupAdvancedGroup(config) {
  const advancedControls = ADVANCED_GROUP_CONTROLS.flatMap(normalizeToArray);

  const existingIndex = config.groups.findIndex(
    (group) => group.title === "Advanced"
  );

  if (existingIndex !== -1) {
    // Move existing Advanced group to end with injected controls
    const [advancedGroup] = config.groups.splice(existingIndex, 1);
    config.groups.push({
      ...advancedGroup,
      icon: "gearshape",
      properties: [...advancedControls, ...advancedGroup.properties],
    });
  } else {
    // Create new Advanced group
    config.groups.push({
      title: "Advanced",
      icon: "gearshape",
      properties: advancedControls,
    });
  }

  return config;
}

// =============================================================================
// FILE PROCESSING
// =============================================================================

/**
 * Reads and processes a properties.config.json file, generating properties.json.
 *
 * @param {string} configPath - Path to the properties.config.json file.
 */
async function processConfigFile(configPath) {
  try {
    const fileDir = path.dirname(configPath);
    const configContent = await fs.readFile(configPath, "utf8");
    let config = JSON.parse(configContent);

    // Set up the Advanced group with standard controls
    config = setupAdvancedGroup(config);

    // Process all properties in each group
    config.groups = config.groups.map((group) => ({
      ...group,
      properties: group.properties.flatMap(processProperty),
    }));

    // Write the processed config
    const outputPath = path.join(fileDir, "properties.json");
    await fs.writeFile(outputPath, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error(`Error processing file ${configPath}:`, error);
  }
}

/**
 * Checks if a properties.config.json exists in a directory and processes it.
 *
 * @param {string} dirPath - The directory path to check.
 */
async function processDirectoryIfConfigExists(dirPath) {
  try {
    const configPath = path.join(dirPath, "properties.config.json");

    try {
      await fs.access(configPath);
      await processConfigFile(configPath);
    } catch {
      // Config file doesn't exist, skip silently
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

/**
 * Finds all directories matching a glob pattern and processes their configs.
 *
 * @param {string} packsDir - The packs directory to search.
 */
async function processAllConfigs(packsDir) {
  try {
    const pattern = path.join(packsDir, "**/*.elementsdevpack/components/com.**/**");
    const directories = globSync(pattern, { absolute: true });

    console.log(`[properties] Found ${directories.length} component directories`);

    let processed = 0;
    for (const dir of directories) {
      const configPath = path.join(dir, "properties.config.json");
      try {
        await fs.access(configPath);
        await processConfigFile(configPath);
        processed++;
      } catch {
        // Config file doesn't exist, skip silently
      }
    }

    console.log(`[properties] Processed ${processed} properties.config.json files`);
  } catch (error) {
    console.error("[properties] Error reading directories:", error);
    throw error;
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * Main entry point for building properties.
 * 
 * @param {Object} config - Configuration object from resolveConfig()
 * @param {string} config.packsDir - Absolute path to the packs directory
 */
export async function buildProperties(config) {
  console.log(`[properties] Building properties...`);
  await processAllConfigs(config.packsDir);
  console.log(`[properties] Build complete`);
}

/**
 * Starts watch mode for continuous building of properties
 * @param {Object} config - Configuration object
 * @param {string} config.packsDir - Absolute path to the packs directory
 */
export async function startWatch(config) {
  const packsDir = config.packsDir;
  
  console.log('[properties] Watch mode enabled. Listening for changes...');

  let building = false;
  const rebuild = async () => {
    if (building) return;
    building = true;
    try {
      await buildProperties(config);
    } catch (err) {
      console.error('[properties] Build error:', err.message || err);
    } finally {
      building = false;
    }
  };

  // Watch the packs directory for properties.config.json changes
  try {
    const { default: fsModule } = await import('fs');
    const watcher = fsModule.watch(packsDir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      const lower = filename.toLowerCase();
      if (lower.endsWith('properties.config.json')) {
        console.log(`[properties] Change detected: ${filename} (${eventType})`);
        rebuild();
      }
    });

    watcher.on('error', (err) => {
      console.error('[properties] Watcher error:', err);
    });
  } catch (err) {
    console.warn(`[properties] Could not watch ${packsDir}: ${err.message}`);
  }

  await rebuild();
}

// Allow direct execution for backwards compatibility
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Direct execution: use default path
  const WATCH = process.argv.includes('--watch') || process.argv.includes('-w');
  const defaultPacksDir = path.resolve(__dirname, "..", "packs");
  const config = { packsDir: defaultPacksDir };
  
  (async () => {
    try {
      if (WATCH) {
        await startWatch(config);
      } else {
        await buildProperties(config);
      }
    } catch (err) {
      console.error("[properties] Build failed:", err);
      process.exit(1);
    }
  })();
}

