module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    /** 懒加载引入动态文件 */
    '@babel/plugin-syntax-dynamic-import',
    /** antd提供了按需引入，而babel-plugin-import能够帮助我们在引入组件的时候自动加载相关样式。 */
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    /** 解决全局对象等编译不足,不会污染全局API
     * babel 在转译的过程中，对 syntax 的处理会使用到 helper 函数，对 api 的处理会引入 polyfill。
     * 默认情况下，babel 在每个需要使用 helper 的地方都会定义一个 helper，导致最终的产物里有大量重复的 helper；
     * 引入 polyfill 时会直接修改全局变量及其原型，造成原型污染,故使用此插件解决。
     * api 从之前的直接修改原型改为了从一个统一的模块中引入，避免了对全局变量及其原型的污染
     * helpers 从之前的原地定义改为了从一个统一的模块中引入，使得打包的结果中每个 helper 只会存在一个
     */
    '@babel/plugin-transform-runtime',
  ],
};
