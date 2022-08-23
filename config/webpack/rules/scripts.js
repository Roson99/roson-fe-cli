const threadLoader = require('thread-loader');
const infoConf = require('../../infoConf');
const osSize = require('os').cpus().length;
const { __PROD__ } = infoConf.STATUS;
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
  /**
   * 允许重新生成一个僵死的 work 池
   * 这个过程会降低整体编译速度
   * 并且开发环境应该设置为 false
   */
  poolRespawn: false,
  /**
   * 池(pool)分配给 worker 的工作数量
   * 默认为 200
   * 降低这个数值会降低总体的效率，但是会提升工作分布更均一
   */
  poolParallelJobs: 50,
  /** 池(pool)的名称 可以修改名称来创建其余选项都一样的池 */
  name: 'scripts-pool',
};

/** 通过预热启动池内最大数量的 worker 并把指定的模块载入 node.js 的模块缓存中。 */
threadLoader.warmup(threadLoaderOpts, [
  'babel-loader',
  'style-loader',
  'css-loader',
  'postcss-loader',
  'less-loader',
  'url-loader',
  'file-loader',
]);

module.exports = [
  {
    test: /\.(jsx|js|ts|tsx)?$/,
    include: [includeDir],
    exclude: [nodeModulesDir],
    use: [
      {
        loader: 'thread-loader',
        options: threadLoaderOpts,
      },
      {
        loader: 'babel-loader',
        options: infoConf.BABELRC,
      },
    ],
  },
];
