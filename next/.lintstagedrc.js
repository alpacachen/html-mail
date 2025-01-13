module.exports = {
  // 对 ts,tsx 文件进行 eslint 检查
  "**/*.{ts,tsx}": ["eslint --fix"],
  // 对所有支持的文件进行 prettier 格式化
  "**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
} 