#!/usr/bin/env node
const program = require('commander');
const helpOption = require('./lib/core/help');
const { createCommands } = require('./lib/core/create');

program.version(require('./package.json').version);

// 可选信息
helpOption();

// 创建其他指令
createCommands();

program.parse(process.argv);
