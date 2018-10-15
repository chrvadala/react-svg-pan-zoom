import {addDecorator, configure} from '@storybook/react';
import {withOptions} from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'React SVG Pan Zoom',
    url: 'https://github.com/chrvadala/react-svg-pan-zoom',
    // addonPanelInRight: window.innerWidth > 1100,
  })
);

configure(() => require('./stories'), module);
