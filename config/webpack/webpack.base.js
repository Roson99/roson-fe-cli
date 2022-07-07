// webpack.base.js
const path = require('path');
/** * @type {import('webpack').Configuration} */
const rules = require('./rules');
const plugin = require('./plugin');
const { __ENV__ } = require('../infoConf/status');
const { resolve, assetsPath, publicPath } = require('../infoConf/path');
console.log(`########### 当前环境：${__ENV__} ###########`);

module.exports = {
  target: 'web',
  entry: { index: path.resolve(__dirname, '../../src/index.tsx') },
  devtool: 'inline-source-map',
  output: {
    path: resolve('dist'),
    filename: `${assetsPath}/js/main.[contenthash:8].js`,
    chunkFilename: `${assetsPath}/js/[name].[contenthash:8].js`,
    publicPath,
  },
  module: {
    rules,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    alias: { '@': path.resolve('src') },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.less'],
  },
  plugins: plugin,
  cache: {
    type: 'filesystem', // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: 'development-cache',
  },
};
