const STATUS = require('./status');
const SERVER = require('./server');
const PATH_INFO = require('./path');
const BABELRC = require('./babelrc');

const viewportWidth = 1920;
const flexibleCfInfo = {
    viewportWidth,
    baseFontSize: viewportWidth / 10,
}

module.exports = {
    SERVER,
    STATUS,
    BABELRC,
    PATH: PATH_INFO,
    flexibleCfInfo,
}
