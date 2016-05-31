var path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    svgPanZoom: [path.resolve(__dirname, 'index.js')],
    demo: [path.resolve(__dirname, 'examples', 'demo.js')],
    demoResponsive: [path.resolve(__dirname, 'examples', 'demo-responsive.js')]
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].js",
    library: "[name]"
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "../index": "svgPanZoom"
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "examples")
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
