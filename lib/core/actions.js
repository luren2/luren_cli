const { promisify } = require('util');

const downloads = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');

const createProjectAction = async (project) => {
  console.log('luren helps you create your project~');
  // clone项目
  await downloads(vueRepo, project, { clone: true });
  // 执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` });
  // 运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  // 打开浏览器
  open('http://localhost:8080/');
};

module.exports = {
  createProjectAction,
};
