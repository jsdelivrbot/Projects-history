const path = require('path');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      containers: path.resolve(ROOT_PATH, './src/containers'),
      components: path.resolve(ROOT_PATH, './src/components'),
      icons: path.resolve(ROOT_PATH, './src/components/Icons'),
      'redux-base': path.resolve(ROOT_PATH, './src/redux-base'),
      utils: path.resolve(ROOT_PATH, './src/utils'),
      routes: path.resolve(ROOT_PATH, './src/routes'),
      config: path.resolve(ROOT_PATH, './src/config'),
      styles: path.resolve(ROOT_PATH, './src/styles'),
      static: path.resolve(ROOT_PATH, './static'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: path.resolve(ROOT_PATH, 'node_modules'),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        query: {
          name: 'images/[name].[ext]'
        }
      },
    ],
  },
  // performance: {
  //   hints: 'warning'
  // }
};
