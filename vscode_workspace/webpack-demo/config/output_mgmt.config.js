const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/output_mgmt/index.js',
        print: './src/output_mgmt/print.js',
    },
    plugins: [
        // https://github.com/jantimon/html-webpack-plugin#options
        new HtmlWebpackPlugin({
          title: 'Output Management',
          filename : './output_mgmt/index.html'
        }),
    ],
    output: {
        filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        clean: true,
    },
};