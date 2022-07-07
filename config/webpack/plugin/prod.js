const MiniCssExactPlugin = require('mini-css-extract-plugin');
const { assetsPath } = require('../../infoConf/path');

module.exports = [
  new MiniCssExactPlugin({
    filename: `${assetsPath}/css/[name]-[contenthash:8].css`,
    chunkFilename: `${assetsPath}/css/[name]-[contenthash:8].css`,
    ignoreOrder: true,
  }),
];
