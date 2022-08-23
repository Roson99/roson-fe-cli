const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const optimization = require('../infoConf/optimization');

const prodConfig = {
  mode: 'production',
  devtool: false,
  optimization,
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
