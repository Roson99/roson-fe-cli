const MiniCssExactPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { assetsPath, resolve } = require('../../infoConf/path');

module.exports = [
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
  new MiniCssExactPlugin({
    filename: `${assetsPath}/css/[name]-[contenthash:6].css`,
    chunkFilename: `${assetsPath}/css/[name]-[contenthash:6].css`,
    ignoreOrder: true,
  }),
  {
    apply: (compiler) => {
      compiler.hooks.done.tap('DonePlugin', (stats) => {
        console.log('编译已结束。');
        setTimeout(() => process.exit(0), 0);
      });
      compiler.hooks.failed.tap('DonePlugin', (error) => {
        console.error('编译出错...');
        process.exit(-1);
      });
    },
  },
];
