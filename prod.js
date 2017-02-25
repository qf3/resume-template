'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
       /* module: {
         rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ 
                        'css-loader',
                        'postcss-loader', 
                        'sass-loader'
                    ]
                })
            }]
        },*/
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('prod')
                }
            }),
           /* new ExtractTextPlugin({
                filename:'[name].[hash].min.css',
                disable:false,
                allChunks: true
            }),*/
            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings:false
                },
                comments: false
            })
        ]
    })
}