const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('../../infoConf/path');
const { __PROD__ } = require('../../infoConf/status');
const devPlugins = !__PROD__ ? require('./dev') : [];
const proPlugins = __PROD__ ? require('./prod') : [];

const plugins = [
  new WebpackBar(),
  ...devPlugins,
  ...proPlugins,
  // resolveClientEnv 可以使用该方法，只注入 以 REACT_APP_ 开头的变量
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
  }),
  new WebpackManifestPlugin({
    publicPath: '',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title: 'roson-app',
    template: resolve('public/index.html'),
  }),
];

module.exports = plugins;
