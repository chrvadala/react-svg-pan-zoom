import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

setOptions({
  name: 'React SVG Pan Zoom',
  url: 'https://github.com/chrvadala/react-svg-pan-zoom',
  downPanelInRight: window.innerWidth > 1100
});

configure(() => {
  require('./stories/index');
}, module);
