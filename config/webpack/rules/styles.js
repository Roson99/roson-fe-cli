const fs = require('fs');
const strip = require('strip-comments');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lessModuleRegex = /\.module.less$/;

const {
  STATUS: { __PROD__ },
  PATH: { resolve, includeDir, publicDir, nodeModulesDir },
} = require('../../infoConf');

/** 处理less变量转换为对象 */
const getModifyVars = (resource) => {
  const content = strip(fs.readFileSync(resource).toString('utf-8'));
  const output = {};
  content
    .split(/\r?\n/)
    .filter((value) => !!value)
    .forEach((value) => {
      const [key, val] = value.split(':');
      output[key] = val.trim();
    });
  return output;
};

// 匹配css的 xx.module
const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    // 0 => no loaders (default);
    // 1 => postcss-loader;
    // 2 => postcss-loader, sass-loader
    modules: {
      // 匹配 modules
      // classname_hash
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};

/** 注入主题变量 */
const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      sourceMap: true,
      modifyVars: getModifyVars(resolve('src/assets/less/variables.less')),
      javascriptEnabled: true,
      // 此处指定为兼容 less-loader 3.x 的默认选项
      math: 'always',
      // 关闭严格模式
      strictMath: false,
    },
  },
};

const styleLoader = __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = [
  {
    test: /\.css$/i,
    include: [includeDir, publicDir, nodeModulesDir],
    use: [styleLoader, cssLoader, 'postcss-loader'],
    sideEffects: true,
  },
  {
    test: /\.less$/i,
    include: [includeDir, nodeModulesDir],
    exclude: lessModuleRegex,
    use: [styleLoader, 'css-loader', 'postcss-loader', lessLoader],
  },
  {
    test: lessModuleRegex,
    include: [includeDir],
    use: [styleLoader, cssLoader, 'postcss-loader', lessLoader],
  },
];
