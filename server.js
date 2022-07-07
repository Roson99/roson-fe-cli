const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chalk = require('react-dev-utils/chalk');
const openBrowser = require('react-dev-utils/openBrowser');

const app = express();
const webpackConfig = require('./config/webpack/webpack.dev');
const compiler = webpack(webpackConfig);
const { PORT = 3000 } = process.env;

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    // noInfo: true,
    publicPath: webpackConfig?.output?.publicPath,
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
app.listen(PORT, initFun);

function initFun() {
  // 本机项目的url地址
  const url = `http://localhost:${PORT}/`;
  console.log(`App listening on port PORT:${PORT}.`);
  console.log(chalk.white('服务已经启动，等待Webpack构建完成即可访问!'));
  console.log(`Network: ${chalk.yellow(url)}`);
  openBrowser(url);
}
