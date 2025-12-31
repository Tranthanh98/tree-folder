## Plan: Build npm library for folder tree ASCII generator

Xây dựng thư viện npm CLI có tên `tree-folder` để quét cấu trúc thư mục và tạo file FOLDER.md với output dạng ASCII art. Hỗ trợ options `-f` (bao gồm files) và `-log` (in ra console).

### Steps

1. **Cập nhật package.json:** Thêm `bin` entry cho CLI command (`ftree` hoặc `tree-folder`), thêm dependency `@types/node`, và thêm shebang script entry point.

2. **Tạo src/index.ts:** Viết core logic để đệ quy quét folder structure sử dụng `fs` và `path`, tạo ASCII tree format với các ký tự `├─`, `│`, `└─`.

3. **Tạo src/cli.ts:** Xử lý CLI arguments (`-f`, `-log`), parse options từ `process.argv`, và gọi core function tương ứng.

4. **Tạo src/types.ts:** Định nghĩa interfaces cho options config (`includeFiles`, `logToConsole`, `ignorePaths`).

5. **Thêm logic ignore:** Mặc định ignore `node_modules`, `.git`, và các folder phổ biến khác, có thể đọc từ `.gitignore`.

### Further Considerations

1. **CLI command name?** Recommend: `ftree` (ngắn gọn) hoặc `tree-folder` (theo tên package)?

- ftree đã tồn tại trên npm, nên chọn `tree-folder`.

2. **Ignore patterns:** Nên hardcode ignore `node_modules/.git` hay đọc từ `.gitignore`? Recommend: Hardcode các folder phổ biến + option `--ignore <pattern>`.

- Chọn hardcode các folder phổ biến + option `--ignore <pattern>`. Nên ignore các folder như `node_modules`, `.git`, `dist`, `build`, `venv`, `__pycache__`. và mặc định bao gồm các file như `README.md`, `package.json`, `LICENSE`.

3. **Output filename:** Cố định `FOLDER.md` hay cho phép custom qua option `-o <filename>`?

- Cố định là `FOLDER.md` để đơn giản.
