module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ios >= 8', 'android >= 4.0'],
        },
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-webpack',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['import', { libraryName: 'antd-mobile', style: 'css' }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
      },
    ],
  ],
};
