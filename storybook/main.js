module.exports = {
  staticDirs: ["public"],
  stories: [
    './stories/Welcome.stories.mdx',
    {
      directory: './stories',
      titlePrefix: 'React SVG Pan Zoom',
      files: '*.stories.jsx',
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