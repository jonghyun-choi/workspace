const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

// https://webpack.kr/concepts/entry-points/
module.exports = {
  entry: './src/index_with_asset.js',
  output: {
    filename: 'withStyle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      { // 하단의 CSS module 은 README.md 의 # Assests > 1 실행 후 추가
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      { // 이미지 파일 asset 추가
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      { // 폰트 asset 추가
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      { // 하단의 CSS module 은 README.md 의 # Assests > 2 실행 후 추가
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      { // 하단의 CSS module 은 README.md 의 # Assests > 3 실행 후 추가
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};