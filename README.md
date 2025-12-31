# tree-folder

A CLI tool to generate folder tree structure as ASCII art in a new file `FOLDER.md`.

## Installation

```bash
npm install -g tree-folder
```

## Usage

```bash
# Generate folder tree in current directory
tree-folder

# Generate folder tree with all files included
tree-folder -f

# Generate folder tree and log to console
tree-folder -log

# Generate folder tree for a specific path
tree-folder /path/to/directory

# Combine options
tree-folder -f -log

# Ignore custom patterns
tree-folder --ignore ".cache" --ignore "tmp"
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
