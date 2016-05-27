var path = require('path');

module.exports = {
  entry: {
    svgPanZoom: [path.resolve(__dirname, 'index.js')]
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].js",
    library: "[name]"
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
