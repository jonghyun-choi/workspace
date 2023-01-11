const path = require('path');

// https://webpack.kr/concepts/entry-points/
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};