import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

import Welcome from './Welcome';
import MainStory from './MainStory';
import MethodsStory from './MethodsStory'
import AutosizerViewer from './AutosizerViewer'

storiesOf('React SVG Pan Zoom', module)
  .addDecorator(withKnobs)
  .add('README', () => <Welcome/>)
  .add('Viewer', () => <MainStory/>)
  .add('Call methods', () => <MethodsStory/>)
  .add('Autosizer viewer', () => <AutosizerViewer />)


