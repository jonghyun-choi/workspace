const path = require('path');

module.exports = {
  entry: './src/start_with_lodash/index_with_lodash.js',
  output: {
    filename: 'withLodash.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
  },
};