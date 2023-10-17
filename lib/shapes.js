function genShape(shape, color) {
  switch (shape) {
    case 'triangle':
      return `<polygon points="150, 18 244, 182 56, 182" fill="${color}" />`
    case 'circle':
      return `<circle cx="150" cy="100" r="80" fill="${color}" />`;
    default:
      return `<rect x="90" y="40" width="120" height="120" fill="${color}" />`;
  }
}

module.exports = genShape;