'use strict';

const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
      devServer: {
        port: 3333,
        historyApiFallback: true,
        noInfo: false
    },
    devtool: "inline-source-map"
    })
}