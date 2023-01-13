const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // (production mode)
    // Uncaught ReferenceError: conole is not defined at HTMLButtonElement.e (index.bundle.js:2:70201)
    // (development mode)
    // Uncaught ReferenceError: conole is not defined at HTMLButtonElement.printMe (VM190 print.js:6:5)
    devtool: 'inline-source-map', 
    // (development mode + devtool)
    // print.js:2 Uncaught ReferenceError: conole is not defined at HTMLButtonElement.printMe (print.js:2:1)
    entry: {
        index: './src/dev/index.js',
        print: './src/dev/print.js',
    },
    devServer: { static: './dist', },
    optimization: { runtimeChunk: 'single', },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'Development',
            filename : 'index.html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        clean: true,
        publicPath: '/',
    },
};