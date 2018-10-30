var ExtractTextPlugin = require('extract-text-webpack-plugin')
var fs = require('fs-extra')
var path = require('path')
var rmdir = require('rimraf')

// -------------------------------------------------------------

var arguments = process.argv
  .slice(2)
  .reduce(function (arguments, argument) {
    var split = argument.split('=')
    arguments[split[0]] = split[1]
    return arguments
  }, {})

// -------------------------------------------------------------

var BUILD = arguments.environment == 'build'
var SOURCEMAP = arguments.withsourcemap
var plugins = [new ExtractTextPlugin('app.css')]
var output = {}
var jsLoader = 'babel'

if (BUILD) {
  jsLoader = 'strip-loader?' +
    'strip[]=window.console.log,' +
    'strip[]=console.log' +
    '!babel'

  var buildNumber = arguments['--build']

  output = {
    path: __dirname + '/Build/Source/',
    filename: 'app_' + buildNumber + '.js'
  }

  function copyOutput (log) {
    return function (error) {
      if (error)
        return console.error(error)
      else
        console.log(log)
    }
  }

  if (fs.existsSync('Build')) {
    rmdir.sync('Build', {}, function (error) {})
  }

  fs.mkdirSync('Build')

  fs.copy(__dirname + '/Files/web.config', __dirname + '/Build/web.config', copyOutput('> Copied web.config'))
  fs.copy(__dirname + '/Art', __dirname + '/Build/Art', copyOutput('> Copied Art folder'))
  fs.copy(__dirname + '/Files', __dirname + '/Build/Files', copyOutput('> Copied Files folder'))
  fs.copy(__dirname + '/Files/mode-csharp.js', __dirname + '/Build/mode-csharp.js', copyOutput('> Copied Ace Mode'))
  fs.copy(__dirname + '/Files/theme-chaos.js', __dirname + '/Build/theme-chaos.js', copyOutput('> Copied Ace Theme'))
  fs.copy(__dirname + '/Art/favicon.ico', __dirname + '/Build/favicon.ico', copyOutput('> Copied Fav Icon'))

  var styles = '<header>\n\t\t<link rel="stylesheet" href="Source/app.css"/>'
  var scripts = '<script src="Source/app_' + buildNumber + '.js"></script>'

  fs.writeFileSync('Build/index.html',
    fs.readFileSync('index.html').toString()
      .replace(/<!--START:WEBPACK-->([\w\W]*)<!--END:WEBPACK-->/igm, scripts)
      .replace('<head>', styles))
}
else {
  output = {
    publicPath: 'http://localhost:8090/assets',
    filename: 'bundle.js'
  }
}

// -------------------------------------------------------------

module.exports = {
  entry: './App/Router.jsx',
  output: output,
  devtool: (!!BUILD ? 'cheap-module-source-map' : 'eval'),
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loader: jsLoader,
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
        loader: ( BUILD ? ExtractTextPlugin.extract('css!sass') : 'style!css!sass' )
      },
      {
        test: /\.css$/,
        loader: ( BUILD ? ExtractTextPlugin.extract('css') : 'style!css' )
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'Art': __dirname + '/Shell/Services/LinksService/art.js',
      'Files': __dirname + '/Shell/Services/LinksService/files.js'
    }
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "react": "React",
    "react-dom": "ReactDOM",
    "jquery": "$",
    "lodash": "_",
    "moment": "moment"
  },
  plugins: plugins
}
