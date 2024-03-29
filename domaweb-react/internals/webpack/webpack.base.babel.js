  /**
 * COMMON WEBPACK CONFIGURATION
 */

  const path = require('path');
  const webpack = require('webpack');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  var bourbon = require('node-bourbon');


  const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
  });

  const checkConfig = require('../scripts/setconfig');

  module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({ // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    }, options.output), // Merge with env dependent settings
    module: {
      loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: options.babelQuery,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      }, {
        test: /\.(eot|jpe?g|png|gif|svg|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=src/assets/images/[name].[ext]',
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader',
        ],
      }, {
        test: /\.modernizrrc\.js$/,
        loader: 'webpack-modernizr-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.xml$/,
        loader: 'xml-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      }],
    },


    plugins: options.plugins.concat([
      new webpack.ProvidePlugin({
        // make fetch available
        fetch: 'exports-loader?self.fetch!whatwg-fetch',
      }),
      extractSass,


      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          CONFIG: JSON.stringify(checkConfig(process.env.NODE_ENV)),
        },
      }),
      new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en-gb|fi)$/),
      new webpack.NamedModulesPlugin(),
    ]),
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
      alias: {
        moment$: 'moment/moment.js',
        modernizr$: path.resolve(__dirname, '../../.modernizrrc.js'),
      },
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
    node: {
      fs: 'empty',
    },
  });
