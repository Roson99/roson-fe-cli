// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** * @type {import('webpack').Configuration} */
const isDev = process.env.NODE_ENV === 'development';
const rules = require('./rules');

module.exports = {
  target: 'web',
  entry: { app: './src/index.tsx' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'roson-fe-cli',
      template: path.resolve(__dirname, '../../public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].[hash].css' }),
  ],
  cache: {
    type: 'filesystem', // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: 'development-cache',
  },
};
