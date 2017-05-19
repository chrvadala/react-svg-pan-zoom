import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

import Welcome from './Welcome';
import AutoModeStory from './AutoModeStory'
import MethodsStory from './MethodsStory'
import AutosizerViewer from './AutosizerViewer'
import WithToolbar from './WithToolbar'

storiesOf('<ReactSVGPanZoom' + '>', module)
  .addDecorator(withKnobs)
  .add('README', () => <Welcome/>)
  .add('Viewer with tool auto', () => <AutoModeStory/>)
  .add('Call methods', () => <MethodsStory/>)
  .add('Viewer with toolbar', () => <WithToolbar/>)
  .add('Autosizer viewer', () => <AutosizerViewer />)


