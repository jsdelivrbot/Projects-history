const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
            'resolve-url-loader',
            'sass-loader',
        ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      },
      {
        test: /\.(eot|jpe?g|png|gif|svg|ttf|woff|woff2)$/i,
        loader: "file-loader?name=src/assets/images/[name].[ext]",
      },
    ]
  }
}
