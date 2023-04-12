const { promisify } = require('util');
// 使其支持promise
const download = promisify(require('download-git-repo'));
const { vueRepo } = require('../config/repo-config');

const createProjectAction = async (project) => {
  // clone项目
  await download(vueRepo, project, { clone: true });

  // 执行npm install
  // 运行npm run serve
  // 打开浏览器
};

module.exports = {
  createProjectAction,
};
