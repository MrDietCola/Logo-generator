const inquirer = require('inquirer');
const SVG = require('./svg');
const fs = require('fs');

class Prompt {
  init() {
    return inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter up to three character',
        name: 'text',
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
        name: 'shape',
      },
      {
        type: 'input',
        message: 'Please enter a color (or hexadecimal number) for the background',
        name: 'bgColor',
      },
    ])
    .then(({text, textColor, shape, bgColor}) => {
      const svg = new SVG (text.toUpperCase(), textColor, shape[0], bgColor);
      console.log(svg.render());
      fs.writeFile('logo.svg', svg.render(), (err) => {
  if (err) {
    console.error('Error writing the file: ', err);
  } else {
    console.log('File has been written successfully.');
  }
});

    })
  }
}

module.exports = Prompt;