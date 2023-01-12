# webpack 사용하여 nodejs 프로젝트에서 JS, CSS Minification 하기
<a href="https://webpack.js.org/guides/getting-started/">reference</a>

# CMDs
1. npm init -y
2. npm install webpack webpack-cli --save-dev
3. npx webpack
> 3번 커멘드 실행 시 /dist directory가 생성됨.
> /dist directory 내부엔 /src/index.js가 default (production mode) 으로 package 되어있음.
4. npm install --save lodash
> /src/index.js 는 index.html의 cdn에서 받아오는 lodash 스크립트에 의존하여 완벽하지 않기에
> lodash를 설치
> 설치 후 index.html에서 cdn 스크립트 주석 처리 한 결과물 : index_without_lodash.html
> 주석 처리 후 /src/index.js 에서 lodash import 한 결과물 : /src/index_with_lodash.js
> 현재 시점에서는 index.js 기준으로 dist의 main.js가 작성됨.
> 현재 시점에서 테스트 하기 위해선 index_with_lodash.js 의 내용를 복사하여 npx webpack 실행시
> cacheable modules 내용에 lodash.js가 포함됨.

# webpack.config.js
1. webpack.config.js 으로 프로젝트 폴더 내 파일 생성
> 해당 내용의 input 을 index_with_lodash.js 으로 변경 후 실행 시 상단에 명시 된 파일의 내용을
> 바꾸지 않고 entry point를 지정할 수 있음.
2. npx webpack --config <config filename>
> npx webpack --config webpack2.config.js
> npx webpack 일시 default webpack.config.js


# npm run build
1. package.json내 script에 webpack 커멘드를 build으로 정의 시 npm run build 으로 npx webpack 실행 가능.
    - npm run build === npx webpack
    - npm run build_lodash === npx webpack --config webpack2.config.js

# Assests
1. npm install --save-dev style-loader css-loader
> Javascript module에 CSS를 포함하기 위해서는 style-loader 와 css-loader 을 사용한다.
> webpack_asset.config.js의 구성은 module임으로 input 항목에 CSS를 추가 하기 위해서 사용한다.

2. npm install --save-dev csv-loader xml-loader
> Javascript module에 CSVs, TSVs, and XML 을 추가하기 위해서 필요한 packages

3. npm install toml yamljs json5 --save-dev
> yaml, json, toml parsers

# Output management
1. npm install --save-dev html-webpack-plugin
> js 기준 output들을 구동하는 html 파일을 자동 생성

- config > output 항목에 clean: true 값 추가 시 build 이전 자료 삭제