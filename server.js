const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const webpackConfig = require('./config/webpack/webpack.dev');
const compiler = webpack(webpackConfig);

const { PORT = 8080, PROXY } = process.env;
console.log('*********************************');
console.log(webpackConfig);
console.log('*********************************');
console.log(process);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }),
);
// 挂载HMR热更新中间件
app.use(
  webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    timeout: 20000,
    log: false,
    overlay: false,
  }),
);
// 设置代理
if (webpackConfig?.devServer?.proxy) {
  const { createProxyMiddleware } = require('http-proxy-middleware');
  const proxy = webpackConfig.devServer.proxy;
  Object.entries(proxy).map(([context, proxyOptions]) => {
    const proxyMiddleware = createProxyMiddleware(proxyOptions);
    app.use(context, proxyMiddleware);
  });
}
// 将文件 serve 到 port
app.listen(PORT, function () {
  console.log('App listening on port PORT。\n');
});
