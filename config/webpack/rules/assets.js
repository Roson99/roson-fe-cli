const { assetsPath, includeDir, publicDir, resolve } = require('../../infoConf/path');
const { __DEV__ } = require('../../infoConf/status');
const svgr = resolve('src/assets/svgr');

module.exports = [
  {
    test: /\.svg$/i,
    include: [svgr],
    type: 'asset',
    resourceQuery: /url/, // *.svg?url
  },
  {
    test: /\.svg$/i,
    include: [svgr],
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ['@svgr/webpack'],
  },
  {
    test: /\.(png|svg|jpe?g|gif|ico)$/i,
    include: [includeDir, publicDir],
    exclude: [svgr],
    type: 'javascript/auto',
    use: [
      {
        // 使用 asset/resource 资源无法呈现
        loader: 'url-loader',
        options: {
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          name: __DEV__
            ? `${assetsPath}/images/[name].[ext]`
            : `${assetsPath}/images/[name]-[hash:6].[ext][query]`,
          // 将小于8KB的图片转换成base64的格式
          limit: 8192,
          // 超过大小，时使用 file-loader
          fallback: require.resolve('file-loader'),
        },
      },
    ],
  },
  {
    test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/i,
    include: [includeDir, publicDir],
    type: 'asset/resource',
    generator: {
      filename: __DEV__
        ? `${assetsPath}/fonts/[name].[ext]`
        : `${assetsPath}/fonts/[name]-[hash:6].[ext][query]`,
    },
  },
  {
    test: /\.(csv|pdf|xlsx|doc|ppt)(\?|$)/i,
    include: [includeDir, publicDir],
    type: 'asset/resource',
    generator: {
      filename: __DEV__
        ? `${assetsPath}/assets/[name].[ext]`
        : `${assetsPath}/assets/[name]-[hash:6].[ext][query]`,
    },
  },
  {
    test: /\.html$/,
    // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
    loader: 'html-loader',
  },
];
