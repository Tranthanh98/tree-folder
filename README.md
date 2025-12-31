# tree-folder

A CLI tool to generate folder tree structure as ASCII art in a new file `FOLDER.md`.

## Quick Start 🚀

No installation required! Just run:

```bash
npx tree-folder
# or
npx folder-md
```

## Installation (Optional)

```bash
npm install -g folder-md
```

Then use:

```bash
tree-folder
# or
folder-md
```

## Usage

```bash
# Generate folder tree in current directory
npx tree-folder

# Generate folder tree with all files included
npx tree-folder -f

# Generate folder tree and log to console (with colors!)
npx tree-folder -log

# Generate folder tree for a specific path
npx tree-folder /path/to/directory

# Combine options
npx tree-folder -f -log

# Ignore custom patterns
npx tree-folder --ignore ".cache" --ignore "tmp"
```

## Options

- `-f, --files`: Include all files in the tree (default: only shows README.md, package.json, LICENSE, tsconfig.json, .gitignore)
- `-log, --log`: Print the tree structure to console in addition to saving to file (with colored output!)
- `--ignore <pattern>`: Add custom ignore patterns (in addition to default ignores)

## Colored Output 🎨

When using `-log` option, the output is colorized in the terminal:

- 📁 **Folders**: Bold Blue
- 📄 `.ts/.tsx` files: Cyan
- 📄 `.js/.jsx` files: Yellow
- 📄 `.json` files: Green
- 📄 `.md` files: Magenta
- 📄 Config files (`.gitignore`, etc): Gray

## Default Ignored Folders

The following folders are ignored by default:

- `node_modules`
- `.git`
- `dist`
- `build`
- `venv`
- `__pycache__`
- `.next`
- `.nuxt`
- `coverage`
- `.vscode`
- `.idea`

## Output

The tool generates a `FOLDER.md` file in the target directory with the folder structure in ASCII tree format.

Example output:

```
my-project/
├─ src/
│  ├─ index.ts
│  └─ utils.ts
├─ package.json
└─ README.md
```

## License

ISC
