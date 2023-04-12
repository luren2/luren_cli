const program = require('commander');

const helpOption = () => {
  program.option('-l --luren', 'a luren cli');
  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如: -d /src/components'
  );
};
// console.log(program.dest);
module.exports = helpOption;
