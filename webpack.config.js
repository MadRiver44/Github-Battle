const path = require('path'); // a bunch of utilities for working with file directory in node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), // dirname resolves to a specific directory that we specify, here
    // it's 'build'.
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  );
}

module.exports = config;
