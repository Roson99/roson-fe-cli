module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    'syntax-dynamic-import',
    'dynamic-import-webpack',
    '@babel/plugin-proposal-class-properties',
    // 解决全局对象等编译不足,不会污染全局 API。
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
