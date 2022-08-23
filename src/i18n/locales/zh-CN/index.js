const context = require.context('./', true, /\.(ts|js)$/);
const content = context.keys().reduce((modules, path) => {
  const module = context(path).default;
  return Object.assign(modules, module);
}, {});

module.exports = content;
