#!/usr/bin/env node
/**
 * Shared Hooks Builder (with dead code elimination)
 *
 * - Reads shared hooks from src/shared-hooks/*.js (alphabetical)
 * - For each component hooks.source.js in packs/, concatenates shared + component
 * - Uses esbuild DCE to remove unused code (anything not reachable from transformHook)
 * - Output: plain static JS with const/let preserved
 * - If a component has no hooks.source.js, it is skipped
 * - Supports --watch to regenerate on changes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const SOURCE_FILENAME = 'hooks.source.js';
const OUTPUT_FILENAME = 'hooks.js';

/**
 * Gets the shared hooks directory (always in the package)
 */
function getSharedDir() {
  return path.join(__dirname, 'shared-hooks');
}

/**
 * Lists all shared hook files
 * @returns {Promise<string[]>} Array of absolute paths to shared hook files
 */
async function listSharedFiles() {
  const sharedDir = getSharedDir();
  try {
    const entries = await fs.promises.readdir(sharedDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith('.js'))
      .map((e) => path.join(sharedDir, e.name))
      .sort();
  } catch (err) {
    console.error(`[hooks] Failed to read shared dir: ${err.message}`);
    return [];
  }
}

/**
 * Recursively finds all hooks.source.js files in a directory
 * @param {string} startDir - Directory to search
 * @returns {Promise<string[]>} Array of absolute paths to source files
 */
async function findHookSources(startDir) {
  const results = [];
  
  async function walk(dir) {
    let entries;
    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true });
    } catch {
      return; // Directory doesn't exist or can't be read
    }
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        await walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name === SOURCE_FILENAME) {
        results.push(fullPath);
      }
    }
  }
  
  await walk(startDir);
  return results;
}

/**
 * Builds a single hooks.js file from shared hooks + component source
 * @param {string[]} sharedFiles - Array of shared hook file paths
 * @param {string} sourcePath - Path to the hooks.source.js file
 * @param {string} projectRoot - Project root for relative path display
 */
async function buildOne(sharedFiles, sourcePath, projectRoot) {
  const componentDir = path.dirname(sourcePath);
  const outputPath = path.join(componentDir, OUTPUT_FILENAME);

  // Read all shared hook files
  const sharedPieces = [];
  for (const file of sharedFiles) {
    const content = await fs.promises.readFile(file, 'utf8');
    sharedPieces.push(content.trim());
  }

  // Read the component source
  let componentContent = await fs.promises.readFile(sourcePath, 'utf8');

  // Remove any existing exports.transformHook line (we'll add our own export marker)
  componentContent = componentContent.replace(/^\s*exports\.transformHook\s*=.*$/gm, '').trim();

  // Concatenate everything and add an ESM export marker for DCE
  // esbuild will keep transformHook and anything it references, drop the rest
  const combinedSource = `
${sharedPieces.join('\n\n')}

${componentContent}

export { transformHook };
`;

  // Use esbuild transform with DCE
  // minifySyntax: true enables dead code elimination
  // We keep identifiers and whitespace for readable output
  const result = await transform(combinedSource, {
    loader: 'js',
    target: 'es2018',
    minifySyntax: true,       // Enables DCE
    minifyWhitespace: false,  // Keep formatting readable
    minifyIdentifiers: false, // Keep variable names
    format: 'esm',
    legalComments: 'none',
  });

  let code = result.code;

  // Replace ESM export with CommonJS-style assignment
  code = code.replace(/export\s*\{\s*transformHook\s*(as\s+\w+)?\s*\}\s*;?\s*$/m, 'exports.transformHook = transformHook;');

  const banner = `// AUTO-GENERATED: do not edit. Edit hooks.source.js instead.\n`;

  await fs.promises.writeFile(outputPath, banner + code, 'utf8');

  console.log(`[hooks] Wrote ${path.relative(projectRoot, outputPath)}`);
}

/**
 * Builds all hooks.js files
 * @param {Object} config - Configuration object
 * @param {string} config.packsDir - Absolute path to the packs directory
 * @param {string} [config.projectRoot] - Project root for display purposes
 */
export async function buildAll(config) {
  const packsDir = config.packsDir;
  const projectRoot = config.projectRoot || path.dirname(packsDir);
  
  const sharedFiles = await listSharedFiles();
  const sources = await findHookSources(packsDir);

  console.log(`[hooks] Building ${sources.length} component hook(s); shared files: ${sharedFiles.length}`);

  for (const sourcePath of sources) {
    await buildOne(sharedFiles, sourcePath, projectRoot);
  }
  
  console.log(`[hooks] Build complete`);
}

/**
 * Starts watch mode for continuous building
 * @param {Object} config - Configuration object
 * @param {string} config.packsDir - Absolute path to the packs directory
 * @param {string} [config.projectRoot] - Project root for display purposes
 */
export async function startWatch(config) {
  const packsDir = config.packsDir;
  const sharedDir = getSharedDir();
  
  console.log('[hooks] Watch mode enabled. Listening for changes...');

  let building = false;
  const rebuild = async () => {
    if (building) return;
    building = true;
    try {
      await buildAll(config);
    } catch (err) {
      console.error('[hooks] Build error:', err.message || err);
    } finally {
      building = false;
    }
  };

  // Watch both the shared hooks directory and the packs directory
  const watchDirs = [sharedDir, packsDir];
  
  for (const watchDir of watchDirs) {
    try {
      const watcher = fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
        if (!filename) return;
        const lower = filename.toLowerCase();
        if (lower.endsWith('hooks.source.js') || lower.endsWith('.js')) {
          // Only rebuild for hooks.source.js changes in packs or any .js in shared-hooks
          if (watchDir === sharedDir || lower.endsWith('hooks.source.js')) {
            console.log(`[hooks] Change detected: ${filename} (${eventType})`);
            rebuild();
          }
        }
      });

      watcher.on('error', (err) => {
        console.error('[hooks] Watcher error:', err);
      });
    } catch (err) {
      console.warn(`[hooks] Could not watch ${watchDir}: ${err.message}`);
    }
  }

  await rebuild();
}

// Allow direct execution for backwards compatibility
if (process.argv[1] === __filename) {
  const WATCH = process.argv.includes('--watch') || process.argv.includes('-w');
  const defaultPacksDir = path.resolve(__dirname, '..', 'packs');
  const config = { 
    packsDir: defaultPacksDir,
    projectRoot: path.resolve(__dirname, '..')
  };
  
  (async () => {
    try {
      if (WATCH) {
        await startWatch(config);
      } else {
        await buildAll(config);
      }
    } catch (err) {
      console.error('[hooks] Build failed:', err.message || err);
      process.exit(1);
    }
  })();
}
