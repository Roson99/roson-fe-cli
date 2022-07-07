const path = require('path');
const { __PROD__ } = require('./status');
const cwd = process.cwd();
const localResolve = (pathURI) => path.join(cwd, pathURI);
const root = path.resolve(__dirname, '../../');

module.exports = {
  root,
  dist: path.join(root, 'dist'),
  src: path.join(root, 'src'),
  entryIndex: path.join(root, 'src/index.tsx'),
  /** 路径转换到到项目根路径 */
  resolve: localResolve,
  /** 代理路径 */
  assetsPath: 'static',
  /** 打包路径 */
  publicPath: __PROD__ ? 'https://app-s3.quickcep.com/' : '/',
  includeDir: localResolve('src'),
  publicDir: localResolve('public'),
  nodeModulesDir: localResolve('node_modules'),
};
