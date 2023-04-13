const { promisify } = require('util');

const downloads = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils');

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

// 创建组件
const addComponentAction = async (name, dest) => {
  // 编译ejs模板 result(代码)
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  });
  // 写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
};

const addPageAndRouteAction = async (name, dest) => {
  // 编译ejs模板 result(代码)
  const pageResult = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  });
  const routerResult = await compile('vue-router.ejs', {
    name,
    lowerName: name.toLowerCase(),
  });
  // 写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const pageTargetPath = path.resolve(dest, `${name}.vue`);
    const routerTargetPath = path.resolve(dest, 'router.js');
    writeToFile(pageTargetPath, pageResult);
    writeToFile(routerTargetPath, routerResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
};
