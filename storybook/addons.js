import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import addonAPI from '@storybook/addons';

let width = window.innerWidth;

addonAPI.register('chrvadala/options', (storybookAPI) => {
  storybookAPI.setOptions({
    name: 'React SVG Pan Zoom',
    url: 'https://github.com/chrvadala/react-svg-pan-zoom',
    downPanelInRight: width > 1100,
  });

  let fullscreen = false;
  window.toggleFullscreen = function () {
    fullscreen = !fullscreen;
    storybookAPI.setOptions({goFullScreen: fullscreen})
  }
});
