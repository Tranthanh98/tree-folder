export interface TreeOptions {
  includeFiles: boolean;
  logToConsole: boolean;
  ignorePaths: string[];
}

export interface TreeNode {
  name: string;
  type: "file" | "directory";
  children?: TreeNode[];
}
