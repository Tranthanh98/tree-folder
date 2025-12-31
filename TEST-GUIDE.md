# Hướng dẫn test thử tree-folder

## Cách 1: Test local với npm link (Đã được link rồi)

Bạn đã link package, giờ có thể chạy ngay:

```bash
# Test cơ bản - tạo FOLDER.md
tree-folder

# Test với tất cả files
tree-folder -f

# Test và hiển thị ra console
tree-folder -log

# Test kết hợp cả 2 options
tree-folder -f -log

# Test với folder khác
tree-folder ./src -log

# Test với custom ignore
tree-folder --ignore "dist" --ignore "*.map" -log
```

## Cách 2: Test trực tiếp với node

```bash
# Test CLI
node dist\cli.js -log

# Test với options
node dist\cli.js -f -log

# Test programmatic API
node -e "const { generateFolderTree } = require('./dist/index.js'); generateFolderTree('.', { includeFiles: true, logToConsole: true });"
```

## Cách 3: Tạo folder test riêng

```bash
# Tạo folder test
mkdir test-tree
cd test-tree

# Tạo cấu trúc folder mẫu
mkdir src public components
echo "test" > README.md
echo "test" > src\index.js
echo "test" > src\utils.js
echo "test" > public\style.css

# Chạy tree-folder
tree-folder -f -log

# Xem kết quả trong FOLDER.md
type FOLDER.md
```

## Cách 4: Test trước khi publish lên npm

```bash
# Build lại để chắc chắn
npm run build

# Test pack (tạo file .tgz như khi publish)
npm pack

# Install file .tgz vào project khác
cd ../another-project
npm install ../f-tree/tree-folder-1.0.0.tgz

# Test sau khi install
npx tree-folder -log
```

## Kiểm tra kết quả

Sau khi chạy, kiểm tra:

1. File `FOLDER.md` đã được tạo
2. Nội dung hiển thị đúng cấu trúc folder với ASCII art
3. Options `-f` và `-log` hoạt động đúng
4. Các folder như `node_modules`, `.git` bị ignore

## Ví dụ output mong đợi

```
f-tree/
├─ .github/
│  └─ prompts/
├─ src/
│  ├─ cli.ts
│  ├─ index.ts
│  └─ types.ts
├─ package.json
├─ README.md
└─ tsconfig.json
```
