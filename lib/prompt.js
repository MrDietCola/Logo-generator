// variables to communicate with other files
const inquirer = require('inquirer');
const SVG = require('./svg');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./shapes');
// promt class
class Prompt {
  constructor() {
    this.text = '';
    this.textColor = ''; 
    this.shape = '';
    this.bgColor = '';
  }
  // initiate prompt function and asks for svg name
  init() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter up to three character',
          name: 'text'
        }
      ])
      // checks if name is longer than 3 characters and starts next prompt
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
    // prompt to get text color and then next prompt
  getTextColor() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter a color (or hexadecimal number) for the text',
          name: 'textColor'
        }
      ])
      // check to make sure a color was inputed
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
// prompt to get a shape input
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
      // makes sure only one shape is selected
      .then(({shape}) => {
        if (shape.length !== 1) {
          console.log('Please choose one shape');
          this.getShape()
        } else {
        this.shape = shape[0];
        return this.getBgColor()
        }
      })
  }
// prompt for svg background color
  getBgColor() {
    return inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter a color (or hexadecimal number) for the background',
          name: 'bgColor'
        }
      ])
      // makes sure a color was chosen and then generates svg
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


  // function to generate svg
  generateSvg() {
    const svg = new SVG ();
    svg.setText(this.text.toUpperCase(), this.textColor)
    // switch to create shape class based off what the user chose
    switch (this.shape) {
      case 'triangle':
        const triangle = new Triangle()
        triangle.setColor(this.bgColor)
        svg.setShape(triangle)
        break;
      case 'circle':
        const circle = new Circle()
        circle.setColor(this.bgColor)
        svg.setShape(circle)
        break;
      default:
          const square = new Square()
          square.setColor(this.bgColor)
          svg.setShape(square)
    }
// writes fille and calls svg render function to generate the text for svg
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




