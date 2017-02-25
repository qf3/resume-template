'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    return {
        entry: {
            index:'./src/index.js',
            vendor:'jquery'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].min.js',
            // publicPath: publicPath,
            sourceMapFilename: '[name].[hash].map'
        },
        module: {
            rules: [{
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use:[
                        'style-loader',
                        'css-loader',
                      /*  {
                            loader:'css-loader',
                            options:{
                                modules:true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }, */
                        'postcss-loader',  
                        'sass-loader'   
                    ],  
            }
            /*{
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }*/
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor','manifest']
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunksSortMode: 'dependency'
            })
        ]
    };
}