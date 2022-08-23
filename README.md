## webpack5 + [ webpack-dev-server | express ]
基于 webpack5 的 Web 应用框架。
.env文件内容在使用express时生效。

## 目录结构
Roson-App
  ├── .vscode   // 编译器统一配置，目前包含[国际化插件]&[Prettier]
  |   └── settings.json
  ├── config    // webpack相关配置内容
  |   ├── infoConf
  |   |   └── ...
  |   ├── webpack
  |   |   └── ...
  |   └── ...
  ├── public
  ├── src
  |   ├── assets  
  |   |   └── svgr          // 该文件夹下存放以JSX调用的svg文件，编译资源时被过滤处理
  |   ├── component // 项目通用组件
  |   ├── constants // 公用枚举常量
  |   ├── i18n      // 国际化配置以及语言包
  |   ├── layouts   // 视图层
  |   |   ├── ContentWrap   // 内容区域
  |   |   ├── SideMenu      // 菜单
  |   |   ├── PrimaryLayout // 视图集合
  |   |   └── global.less   // 公共样式 'oo'前缀命名
  |   ├── pages     // 页面内容
  |   ├── routers   // 路由
  |   ├── servers   // 基于后段api文档目录的http请求
  |   ├── types     // 类型
  |   ├── utils     // 公共工具、方法
  |   └── ...
  ├── package.json
  ├── README.md
  └── ...

## 单个业务模块目录结构
  page
  ├── component // 业务模块组件
  ├── index.tsx // 业务模块页面
  ├── index.module.less // 样式文件
  └── model.ts // 业务模块持久化数据

## git 提交规范:
所有的提交建议使用 标识：内容 的形式，说明此次提交的目的，使每次提交都有价值。
全局安装：npm install -g commitizen
使用'git cz'命令即可按要求提交
```
标识        说明
feature	    新功能
fix	        修补 bug
docs	    文档（documentation）
style	    样式更改
format	    代码格式化不影响运行
refactor	重构（即不是新增功能，也不是修改 bug 的代码变动）
test	    增加测试
chore	    构建过程或辅助工具的变动
```

## 国际化
使用【i18next + react-i18next + i18next-browser-languagedetector】处理国际化。
语言环境文件中的键样式：nested( {"a": {"b": {"c": "..."}}})。
格式化内容时，重点关注 import { useTranslation } from 'react-i18next' 的内容，该hook返回{t: 格式化方法, i18n: 其他国际化相关api对象 }。

vscode搜索并安装插件⬇️
名称: i18n Ally
ID: lokalise.i18n-ally
说明: 🌍 All in one i18n extension for VS Code
发布者: Lokalise
VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally

该插件可使国际化key按设置的zh-CN中文展示，提升开发体验及效率，目前已配置实时刷新读取国际化键值用于展示。配置国际化可在文件中直接书写（如：t('app.newKey')），点击✏️铅笔按钮可直接书写对应中英文，并指定写入文件的路径。使用国际化内容时，编译器也会自动展示当前语言环境的内容。