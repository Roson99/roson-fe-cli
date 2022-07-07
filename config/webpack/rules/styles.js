const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { STATUS: { __PROD__, __DEV__ }} = require('../../infoConf');

const plugins = [
    'postcss-flexbugs-fixes',
    ['postcss-pxtorem', {
        rootValue: 192,
        propList: ["*"],
        replace: true,
        minPixelValue: 1,
        unitPrecision: 5,
    }]
]

const lessUse = [{
    loader: 'css-loader',
    options: {
        importLoaders: 1,
    },
}, {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins,
        }
    },
}, {
    loader: 'less-loader',
}];

const less = {
    test: /\.less$/,
    use: (__PROD__ ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: __DEV__,
        },
    }] : [{
        loader: 'style-loader',
    }]).concat(lessUse),
};

const css = {
    test: /\.css$/,
    use: (__PROD__ ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: __DEV__,
        },
    }] : [{
        loader: 'style-loader',
    }]).concat([
        'css-loader',
    ]),
};

module.exports = [
    less,
    css,
];
