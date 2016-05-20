var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: __dirname + "/build",
    filename: "svg-pan-zoom.js",
    libraryTarget: "var",
    library: "SvgPanZoom"
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
