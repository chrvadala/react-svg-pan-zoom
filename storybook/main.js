module.exports = {
  staticDirs: ["public"],
  stories: [
    {
      directory: './stories',
      titlePrefix: 'React SVG Pan Zoom',
      files: '*.stories.*',
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  core: {
    "builder": "webpack5"
  }
};