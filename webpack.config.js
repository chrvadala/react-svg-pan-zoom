const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {

  let minimize = env && env.hasOwnProperty('minimize');

  let config = {
    entry: {
      ReactSVGPanZoom: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `react-svg-pan-zoom${minimize ? '.min' : ''}.js`,
      library: "ReactSVGPanZoom",
      libraryTarget: "var"
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "compact": false,
              "plugins": [
                "transform-object-rest-spread"
              ],
              "presets": [
                "es2015-webpack2",
                "react"
              ]
            }
          }
        ]
      }]
    },
    plugins: [],
  };

  if (minimize) config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  return config;
};
