const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'simple.js'),
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  output: {
    path: __dirname,
    filename: "simple.dist.js"
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
