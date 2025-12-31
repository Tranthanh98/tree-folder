#!/usr/bin/env node

import { generateFolderTree } from "./index";
import { TreeOptions } from "./types";

function parseArgs(): { path: string; options: Partial<TreeOptions> } {
  const args = process.argv.slice(2);
  const options: Partial<TreeOptions> = {
    includeFiles: false,
    logToConsole: false,
  };
  let targetPath = ".";
  const customIgnore: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-f" || arg === "--files") {
      options.includeFiles = true;
    } else if (arg === "-log" || arg === "--log") {
      options.logToConsole = true;
    } else if (arg === "--ignore") {
      const nextArg = args[++i];
      if (nextArg) {
        customIgnore.push(nextArg);
      }
    } else if (arg && !arg.startsWith("-")) {
      targetPath = arg;
    }
  }

  if (customIgnore.length > 0) {
    options.ignorePaths = [
      "node_modules",
      ".git",
      "dist",
      "build",
      "venv",
      "__pycache__",
      ".next",
      ".nuxt",
      "coverage",
      ".vscode",
      ".idea",
      ...customIgnore,
    ];
  }

  return { path: targetPath, options };
}

function main() {
  const { path, options } = parseArgs();

  try {
    generateFolderTree(path, options);
    console.log(`✓ FOLDER.md generated successfully in ${path}`);
  } catch (error) {
    console.error("Error generating folder tree:", error);
    process.exit(1);
  }
}

main();
