const genShape = require('./shapes');

class SVG {
  constructor(text, textColor, shape, bgColor){
    this.text = text;
    this.textColor = textColor; 
    this.shape = shape;
    this.bgColor = bgColor;
  }

  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    ${genShape(this.shape, this.bgColor)}
  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
  
  </svg>`;
  }
}

module.exports = SVG;

