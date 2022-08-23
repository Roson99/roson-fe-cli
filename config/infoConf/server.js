const { REACT_APP_ENVKEY = 'dev' } = process.env;
const url = `https://app-${REACT_APP_ENVKEY}.domain.com`;
const proxy = {
  '/api': {
    target: url,
    changeOrigin: true,
  },
};

/** devServer */
module.exports = {
  hot: true,
  port: process.env.PORT || 3000,
  host: 'localhost',
  compress: true,
  open: true,
  proxy,
  historyApiFallback: {
    rewrites: [{ from: /^\/$/, to: 'index.html' }],
  },
  // static: {
  //   directory: path.join(__dirname, './'),
  //   watch: true
  // }
};
