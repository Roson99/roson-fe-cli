const webpack = require('webpack');
const { resolve } = require('../../infoConf/path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = [
  new webpack.HotModuleReplacementPlugin(),
  // 热更新 react 组件
//   new ReactRefreshWebpackPlugin({
//     forceEnable: true,
//     exclude: /node_modules/,
//     include: [resolve('src')],
//     overlay: false,
//   }),
];
