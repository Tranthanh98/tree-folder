import fs = require("fs");
import path = require("path");
import { TreeNode, TreeOptions } from "./types";

const DEFAULT_IGNORE_PATTERNS = [
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
];

const DEFAULT_INCLUDE_FILES = [
  "README.md",
  "package.json",
  "LICENSE",
  "tsconfig.json",
  ".gitignore",
];

export function generateFolderTree(
  rootPath: string = ".",
  options: Partial<TreeOptions> = {}
): string {
  const opts: TreeOptions = {
    includeFiles: options.includeFiles ?? false,
    logToConsole: options.logToConsole ?? false,
    ignorePaths: options.ignorePaths ?? DEFAULT_IGNORE_PATTERNS,
  };

  const absolutePath = path.resolve(rootPath);
  const rootName = path.basename(absolutePath);

  let output = `${rootName}/\n`;
  output += buildTree(absolutePath, "", opts);

  if (opts.logToConsole) {
    console.log(output);
  }

  const outputPath = path.join(absolutePath, "FOLDER.md");
  fs.writeFileSync(outputPath, output, "utf-8");

  return output;
}

function buildTree(
  dirPath: string,
  prefix: string,
  options: TreeOptions
): string {
  let result = "";

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    const filteredEntries = entries.filter((entry) => {
      if (options.ignorePaths.includes(entry.name)) {
        return false;
      }

      if (entry.isFile() && !options.includeFiles) {
        return DEFAULT_INCLUDE_FILES.includes(entry.name);
      }

      return true;
    });

    filteredEntries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    filteredEntries.forEach((entry, index) => {
      const isLast = index === filteredEntries.length - 1;
      const connector = isLast ? "└─ " : "├─ ";
      const childPrefix = prefix + (isLast ? "   " : "│  ");

      if (entry.isDirectory()) {
        result += `${prefix}${connector}${entry.name}/\n`;
        const subDirPath = path.join(dirPath, entry.name);
        result += buildTree(subDirPath, childPrefix, options);
      } else {
        result += `${prefix}${connector}${entry.name}\n`;
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return result;
}

export type { TreeNode, TreeOptions };
