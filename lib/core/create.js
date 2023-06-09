const program = require('commander');
const { createProjectAction, addComponentAction } = require('./actions');

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);

  program
    .command('addcpn <name>')
    .description(
      'add vue component, 例如: luren addcpn HelloWorld [-d src/components]'
    )
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components');
    });

  program
    .command('addpage <page>')
    .description(
      'add vue page and router config, 例如: luren addpage Home [-d src/pages]'
    )
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages');
    });

  program
    .command('addstore <store>')
    .description(
      'add vue store and types, 例如: luren addstore Home [-d src/store/modules]'
    )
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules');
    });
};

module.exports = { createCommands };
