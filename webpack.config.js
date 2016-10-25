var path = require('path');

module.exports = {
  entry: {
    ReactSVGPanZoom: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: __dirname + "/dist",
    filename: "react-svg-pan-zoom.js",
    library: "ReactSVGPanZoom"
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devtool: "eval",
  resolve: {
    extensions: ['', '.js', '.jsx']
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
