const path = require('path');
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'renderer.js')
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
