/**
 * Configuration Resolver for rw-element-tools
 * 
 * Resolves configuration from multiple sources with the following priority:
 * 1. CLI arguments (highest priority)
 * 2. Environment variables
 * 3. package.json "rw-element-tools" field
 * 4. rw-element-tools.config.js file
 * 5. Default values (lowest priority)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Default configuration values
 */
const DEFAULTS = {
  packsDir: './packs',
};

/**
 * Finds the project root by looking for package.json
 * @returns {string} The project root directory
 */
function findProjectRoot() {
  let currentDir = process.cwd();
  
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback to cwd if no package.json found
  return process.cwd();
}

/**
 * Reads the package.json from the project root
 * @param {string} projectRoot - The project root directory
 * @returns {object|null} The package.json contents or null
 */
function readPackageJson(projectRoot) {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Loads the rw-element-tools.config.js file if it exists
 * @param {string} projectRoot - The project root directory
 * @returns {Promise<object|null>} The config file contents or null
 */
async function loadConfigFile(projectRoot) {
  const configPaths = [
    path.join(projectRoot, 'rw-element-tools.config.js'),
    path.join(projectRoot, 'rw-element-tools.config.mjs'),
  ];
  
  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const configUrl = pathToFileURL(configPath).href;
        const configModule = await import(configUrl);
        return configModule.default || configModule;
      } catch (err) {
        console.warn(`[rw-element-tools] Warning: Failed to load config file ${configPath}: ${err.message}`);
      }
    }
  }
  
  return null;
}

/**
 * Resolves the full configuration from all sources
 * @param {object} cliOptions - Options passed via CLI arguments
 * @returns {Promise<object>} The resolved configuration
 */
export async function resolveConfig(cliOptions = {}) {
  const projectRoot = findProjectRoot();
  const packageJson = readPackageJson(projectRoot);
  const configFile = await loadConfigFile(projectRoot);
  
  // Build config with priority chain
  const config = { ...DEFAULTS };
  
  // 5. Default values (already set above)
  
  // 4. Config file (rw-element-tools.config.js)
  if (configFile) {
    if (configFile.packsDir) {
      config.packsDir = configFile.packsDir;
    }
  }
  
  // 3. package.json "rw-element-tools" field
  if (packageJson && packageJson['rw-element-tools']) {
    const pkgConfig = packageJson['rw-element-tools'];
    if (pkgConfig.packsDir) {
      config.packsDir = pkgConfig.packsDir;
    }
  }
  
  // 2. Environment variables
  if (process.env.RW_PACKS_DIR) {
    config.packsDir = process.env.RW_PACKS_DIR;
  }
  
  // 1. CLI arguments (highest priority)
  if (cliOptions.packsDir || cliOptions.packs) {
    config.packsDir = cliOptions.packsDir || cliOptions.packs;
  }
  
  // Resolve packsDir to absolute path from project root
  if (!path.isAbsolute(config.packsDir)) {
    config.packsDir = path.resolve(projectRoot, config.packsDir);
  }
  
  // Add project root and package location to config
  config.projectRoot = projectRoot;
  config.packageRoot = __dirname;
  
  return config;
}

/**
 * Gets the path to a resource within the package
 * @param {...string} segments - Path segments relative to package root
 * @returns {string} Absolute path to the resource
 */
export function getPackagePath(...segments) {
  return path.join(__dirname, ...segments);
}

export default { resolveConfig, getPackagePath };

