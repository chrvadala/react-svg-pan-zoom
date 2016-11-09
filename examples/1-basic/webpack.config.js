const path = require('path');
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'example1.jsx'),
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  devtool: "eval",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
