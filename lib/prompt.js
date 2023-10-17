const inquirer = require('inquirer');

class Prompt {
  init() {
    return inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter up to three character',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Please enter a color (or hexadecimal number) for the text',
        name: 'textColor',
      },
      {
        type: 'checkbox',
        message: 'Please choose a shape:',
        choices: ['circle', 'Triangle', 'Square'],
        name: 'name',
      },
      {
        type: 'input',
        message: 'Please enter a color (or hexadecimal number) for the background',
        name: 'bgColor',
      },
    ])
    .then((res) => console.log(res))
  }
}

module.exports = Prompt;