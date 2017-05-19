module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {loader: "raw-loader"}
        ]
      }
    ]
  }
};
