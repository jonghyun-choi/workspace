const path = require('path');

// https://webpack.kr/concepts/entry-points/
module.exports = {
  entry: './src/start/index.js',
  output: {
    filename: 'start.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
  },
};