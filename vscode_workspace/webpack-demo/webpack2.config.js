const path = require('path');

module.exports = {
  entry: './src/index_with_lodash.js',
  output: {
    filename: 'withLodash.js',
    path: path.resolve(__dirname, 'dist'),
  },
};