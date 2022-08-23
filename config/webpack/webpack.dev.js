const dotenv = require('dotenv');
dotenv.config();;
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const infoConf = require('../infoConf');
/** * @type {import('webpack').WebpackOptionsNormalized} */

const devServer = infoConf.SERVER;
const devConfig = {
  mode: 'development',
  devServer: devServer,
  devtool: 'eval-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
module.exports = webpackMerge.merge(baseConfig, devConfig);
