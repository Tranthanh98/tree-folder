import fs = require("fs");
import path = require("path");
import { TreeNode, TreeOptions } from "./types";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  // Folders
  folder: "\x1b[1;34m", // Bold Blue
  // Files by type
  js: "\x1b[33m", // Yellow
  ts: "\x1b[36m", // Cyan
  json: "\x1b[32m", // Green
  md: "\x1b[35m", // Magenta
  config: "\x1b[90m", // Gray
  default: "\x1b[37m", // White
  // Tree structure
  tree: "\x1b[90m", // Gray for tree lines
};

function getFileColor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const name = filename.toLowerCase();

  // Config files
  if (name.startsWith(".") || name.includes("config") || name === "license") {
    return colors.config;
  }

  switch (ext) {
    case "js":
    case "jsx":
    case "mjs":
    case "cjs":
      return colors.js;
    case "ts":
    case "tsx":
      return colors.ts;
    case "json":
      return colors.json;
    case "md":
    case "markdown":
      return colors.md;
    default:
      return colors.default;
  }
}

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

  // Plain text output for file
  let output = `${rootName}/\n`;
  output += buildTree(absolutePath, "", opts, false);

  // Colored output for console
  if (opts.logToConsole) {
    let coloredOutput = `${colors.folder}${rootName}/${colors.reset}\n`;
    coloredOutput += buildTree(absolutePath, "", opts, true);
    console.log(coloredOutput);
  }

  const outputPath = path.join(absolutePath, "FOLDER.md");
  fs.writeFileSync(outputPath, output, "utf-8");

  return output;
}

function buildTree(
  dirPath: string,
  prefix: string,
  options: TreeOptions,
  useColors: boolean = false
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

      if (useColors) {
        const coloredPrefix = `${colors.tree}${prefix}${connector}${colors.reset}`;
        const coloredChildPrefix = `${colors.tree}${childPrefix}${colors.reset}`;

        if (entry.isDirectory()) {
          result += `${colors.tree}${prefix}${connector}${colors.folder}${entry.name}/${colors.reset}\n`;
          const subDirPath = path.join(dirPath, entry.name);
          result += buildTree(subDirPath, childPrefix, options, true);
        } else {
          const fileColor = getFileColor(entry.name);
          result += `${colors.tree}${prefix}${connector}${fileColor}${entry.name}${colors.reset}\n`;
        }
      } else {
        if (entry.isDirectory()) {
          result += `${prefix}${connector}${entry.name}/\n`;
          const subDirPath = path.join(dirPath, entry.name);
          result += buildTree(subDirPath, childPrefix, options, false);
        } else {
          result += `${prefix}${connector}${entry.name}\n`;
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return result;
}

export type { TreeNode, TreeOptions };
