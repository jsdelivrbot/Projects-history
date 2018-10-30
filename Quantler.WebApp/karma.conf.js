var webpack = require('webpack')
var path = require('path')

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: false,

    frameworks: ['jasmine'],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack']
    },

    reporters: ['mocha', 'clear-screen'],

    mochaReporter: {
      output: 'minimal'
    },

    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.js(x)?$/,
            loader: 'babel',
            exclude: [
              path.resolve(__dirname, 'node_modules')
            ]
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          {
            test: /\.css$/,
            loader: 'style!css'
          }
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
}
