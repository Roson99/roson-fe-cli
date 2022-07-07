const { resolve, assetsPath, includeDir, publicDir } = require('../../infoConf/path');
const { __DEV__ } = require('../../infoConf/status');

module.exports = [
  {
    test: /\.(png|jpe?g|gif|svg|ico)$/i,
    include: [includeDir, publicDir],
    type: 'javascript/auto',
    use: [
      {
        // 使用 asset/resource 资源无法呈现
        loader: 'url-loader',
        options: {
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          name: __DEV__ ? `${assetsPath}/images/[name].[ext]` : `${assetsPath}/images/[hash].[ext][query]`,
          // 将小于8KB的图片转换成base64的格式
          limit: 8192,
          // 超过大小，时使用 file-loader
          fallback: resolve('file-loader'),
        },
      },
    ],
  },
  {
    test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/i,
    include: [includeDir, publicDir],
    type: 'asset/resource',
    generator: {
      filename: __DEV__ ? `${assetsPath}/fonts/[name][ext]` : `${assetsPath}/fonts/[hash][ext][query]`,
    },
  },
  {
    test: /\.(csv|pdf|xlsx|doc|ppt)(\?|$)/i,
    include: [includeDir, publicDir],
    type: 'asset/resource',
    generator: {
      filename: __DEV__ ? `${assetsPath}/assets/[name][ext]` : `${assetsPath}/assets/[hash][ext][query]`,
    },
  },
  {
    test: /\.html$/,
    // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
    loader: 'html-loader',
  },
];
