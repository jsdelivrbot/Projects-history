/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.config');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = merge(common, {
  entry: {
    bundle: [
      'babel-polyfill',
      'babel-register',
      './src/index',
    ]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist', 'gzip'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/indexProd.html' }
    ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      sourceMap: false,
      compress: {
        warnings: false, // do not show warnings in the console
      },
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new CompressionPlugin({
      asset: '/[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),

    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract(
          { fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
            }, {
              loader: 'sass-loader'
            }]
          }
        ),
        exclude: path.resolve(ROOT_PATH, 'node_modules')
      },
      {
        test: /(\.css|\.scss)$/,
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
        include: path.resolve(ROOT_PATH, 'node_modules'),
      }
    ],
  },
});
