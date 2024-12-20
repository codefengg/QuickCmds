#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const open = require('open');

// 获取项目根目录
const projectPath = path.join(__dirname, '..');

// 启动webpack开发服务器
const child = spawn('npm', ['start'], {
  cwd: projectPath,
  stdio: 'inherit',
  shell: true
});

// 等待几秒后自动打开浏览器
setTimeout(() => {
  open('http://localhost:3000');
}, 3000);

// 处理进程退出
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit();
}); 