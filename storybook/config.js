import {addParameters, configure} from '@storybook/react';
import {create} from '@storybook/theming';

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'React SVG Pan Zoom',
      brandUrl: 'https://github.com/chrvadala/react-svg-pan-zoom',
    }),
    panelPosition: 'right',
    isToolshown: false,
  },
});

configure(() => require('./stories'), module);
