/**
 * rw-element-tools
 * 
 * Build tools for RapidWeaver element packs.
 * 
 * @module rw-element-tools
 */

// Re-export controls and properties for programmatic access
export * as Controls from './controls/index.js';
export * as Properties from './properties/index.js';

// Export configuration utilities
export { resolveConfig, getPackagePath } from './config.js';

// Export build functions for programmatic use
export { buildProperties, startWatch as watchProperties } from './build-properties.js';
export { buildAll as buildHooks, startWatch as watchHooks } from './build-shared-hooks.js';

