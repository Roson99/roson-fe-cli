const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const optimization = require('./optimization');

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: 'https://app-s3.quickcep.com/',
  },
  optimization,
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
