import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-options/register';
import addonAPI from '@storybook/addons';

addonAPI.register('chrvadala/options', (storybookAPI) => {
  let fullscreen = false;
  window.toggleFullscreen = function () {
    fullscreen = !fullscreen;
    storybookAPI.setOptions({goFullScreen: fullscreen})
  }
});
