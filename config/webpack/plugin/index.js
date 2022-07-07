const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, assetsPath } = require('../../infoConf/path');
const { __PROD__ } = require('../../infoConf/status');
const devPlugins = !__PROD__ ? require('./dev') : [];
const proPlugins = __PROD__ ? require('./prod') : [];

const plugins = [
  new CleanWebpackPlugin(),
  // 在webpack打包完成后会把静态资源复制到dist文件夹下。
  new CopyPlugin({
    patterns: [
      {
        from: resolve('public/resource'),
        to: resolve(`dist/${assetsPath}/resource`),
        noErrorOnMissing: true,
      },
    ],
  }),
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
    title: 'quick-master',
    template: resolve('public/index.html'),
  }),
];

module.exports = plugins;
