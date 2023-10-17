const inquirer = require('inquirer');
const SVG = require('./svg');
const fs = require('fs');

// class Prompt {
//   init() {
//     return inquirer
//     .prompt([
//       {
//         type: 'input',
//         message: 'Please enter up to three character',
//         name: 'text',
//       },
//       {
//         type: 'input',
//         message: 'Please enter a color (or hexadecimal number) for the text',
//         name: 'textColor',
//       },
//       {
//         type: 'checkbox',
//         message: 'Please choose a shape:',
//         choices: ['circle', 'Triangle', 'Square'],
//         name: 'shape',
//       },
//       {
//         type: 'input',
//         message: 'Please enter a color (or hexadecimal number) for the background',
//         name: 'bgColor',
//       },
//     ])
//     .then(({text, textColor, shape, bgColor}) => {
//       const svg = new SVG (text.toUpperCase(), textColor, shape[0], bgColor);
//       console.log(svg.render());
//       fs.writeFile('logo.svg', svg.render(), (err) => {
//   if (err) {
//     console.error('Error writing the file: ', err);
//   } else {
//     console.log('File has been written successfully.');
//   }
// });

//     })
//   }
// }


class Prompt {
  constructor(text, textColor, shape, bgColor) {
    this.text = text;
    this.textColor = textColor; 
    this.shape = shape;
    this.bgColor = bgColor;
  }
  init() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter up to three character',
          name: 'text'
        }
      ])
      .then(({text}) => {
        if (text.length > 3 || text.length === 0) {
          console.log('text must be between 1-3 characters');
          this.init()
        } else {
          this.text = text;
          return this.getTextColor()
        }
      })
  }
    
  getTextColor() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter a color (or hexadecimal number) for the text',
          name: 'textColor'
        }
      ])
      .then(({textColor}) => {
        if (textColor === '') {
          console.log('Please choose a color');
          this.getTextColor()
        } else {
          this.textColor = textColor;
          return this.getShape()
        }
      })
  }

  getShape() {
    return inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'Please choose a shape:',
          choices: ['circle', 'Triangle', 'Square'],
          name: 'shape'
        }
      ])
      .then(({shape}) => {
        if (shape.length !== 1) {
          console.log('Please choose one shape');
          this.getShape()
        } else {
        this.shape = shape;
        return this.getBgColor()
        }
      })
  }

  getBgColor() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter a color (or hexadecimal number) for the background',
          name: 'bgColor'
        }
      ])
      .then(({bgColor}) => {
        if (bgColor === '') {
          console.log('Please choose a color');
          this.getBgColor()
        } else {
        this.bgColor = bgColor;
        return this.generateSvg()
        }
      })
  }

  generateSvg() {
    const svg = new SVG (this.text.toUpperCase(), this.textColor, this.shape[0], this.bgColor);
    fs.writeFile('logo.svg', svg.render(), (err) => {
      if (err) {
        console.error('Error writing the file: ', err);
      } else {
        console.log('File has been written successfully.');
      }
    })
  }
}

module.exports = Prompt;