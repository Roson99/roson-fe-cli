const { REACT_APP_ENVKEY = 'dev' } = process.env;
const url = `https://app-${REACT_APP_ENVKEY}.quickcep.com`;
const proxy = {
  '/api': {
    target: url,
    pathRewrite: { '^/api': '' },
    secure: false,
  },
  '/robot-configuration': {
    target: url,
    changeOrigin: true,
  },
  '/ma': {
    target: url,
    changeOrigin: true,
  },
  '/cdp-analysis': {
    target: url,
    changeOrigin: true,
  },
  '/im': {
    target: url,
    ws: false,
    changeOrigin: true,
  },
  '/store': {
    target: url,
    ws: false,
    changeOrigin: true,
  },
  '/socket.io': {
    target: url,
    ws: true,
    changeOrigin: true,
  },
  '/integration-data': {
    target: url,
    ws: true,
    changeOrigin: true,
  },
  '/mockJS': {
    target: 'http://localhost:8080',
    ws: true,
    changeOrigin: true,
  },
  '/bill': {
    target: url,
    ws: false,
    changeOrigin: true,
  },
};

/** devServer */
module.exports = {
  hot: true,
  port: process.env.port || 3000,
  host: 'localhost',
  compress: true,
  open: true,
  proxy,
};
