const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {

  let minimize = env && env.hasOwnProperty('minimize');

  let config = {
    entry: {
      ReactSVGPanZoom: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'build-umd'),
      filename: `react-svg-pan-zoom${minimize ? '.min' : ''}.js`,
      library: "ReactSVGPanZoom",
      libraryTarget: "umd"
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
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
            loader: 'babel-loader'
          }
        ]
      }]
    },
    plugins: [],
  };

  if (minimize) config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  return config;
};
