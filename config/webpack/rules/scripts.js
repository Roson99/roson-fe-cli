const path = require('path');
const threadLoader = require('thread-loader');

const infoConf = require('../../infoConf');
const osSize = require('os').cpus().length;

const { __PROD__, __DEV__ } = infoConf.STATUS;
const { nodeModulesDir, includeDir } = infoConf.PATH;

const threadLoaderOpts = {
  /** 产生的 worker 的数量，默认是 cpu 的核心数 */
  workers: __PROD__ ? osSize : osSize - 1,
  /** 一个 worker 进程中并行执行工作的数量，默认为 20 */
  workerParallelJobs: 50,
  /** 额外的 node.js 参数 */
  workerNodeArgs: ['--max-old-space-size=1024'],
  /**
   * 闲置时定时删除 worker 进程
   * 默认为 500ms
   * 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
   */
  poolTimeout: __PROD__ ? 500 : Infinity,
  poolRespawn: false,
  /**
   * 池(pool)分配给 worker 的工作数量
   * 默认为 200
   * 降低这个数值会降低总体的效率，但是会提升工作分布更均一
   */
  poolParallelJobs: 50,
  /** 池(pool)的名称 可以修改名称来创建其余选项都一样的池 */
  name: 'tsx-pool',
};

/** 通过预热启动池内最大数量的 worker 并把指定的模块载入 node.js 的模块缓存中。 */
threadLoader.warmup(threadLoaderOpts, [
  'babel-loader',
  'ts-loader',
  'css-loader',
  'less-loader',
  'style-loader',
  'postcss-loader',
]);

module.exports = [
  {
    test: [/\.(ts|tsx)$/],
    use: [
      {
        loader: 'thread-loader',
        options: threadLoaderOpts,
      },
      {
        loader: 'babel-loader',
        options: Object.assign(
          {
            cacheDirectory: true,
            babelrc: false,
            plugins: [
              // 处理antd样式
              ['import', { libraryName: 'antd', style: 'css' }, 'antd'],
            ],
          },
          infoConf.BABELRC,
        ),
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: __DEV__,
          happyPackMode: true,
          ignoreDiagnostics: [],
        },
      },
    ],
    include: [includeDir],
    exclude: [nodeModulesDir],
  },
  {
    test: [/\.(js|jsx)$/],
    use: {
      loader: 'babel-loader?cacheDirectory=true',
      options: Object.assign(
        {
          cacheDirectory: true,
          babelrc: false,
        },
        infoConf.BABELRC,
      ),
    },
    include: [includeDir],
    exclude: [nodeModulesDir],
  },
];
