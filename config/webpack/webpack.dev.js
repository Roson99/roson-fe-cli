const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const infoConf = require('../infoConf');
/** * @type {import('webpack').WebpackOptionsNormalized} */

const devServer = infoConf.SERVER;
const devConfig = {
  mode: 'development',
  devServer: devServer,
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
module.exports = webpackMerge.merge(baseConfig, devConfig);
