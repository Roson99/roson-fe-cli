'use strict';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  sideEffects: true,
  minimize: true,
  minimizer: [
    new CssMinimizerPlugin(),
    new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        warnings: false,
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: false,
          // 要删除的console列表
          pure_funcs: ['console.log'],
          drop_debugger: true,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
    }),
  ],
  splitChunks: {
    automaticNameDelimiter: '.',
    minSize: 20000,
    maxSize: 800000,
  },
};
