import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

import Welcome from './Welcome';
import ViewerStory from './ViewerStory';
import MethodsStory from './MethodsStory'
import AutosizerViewer from './AutosizerViewer'
import DifferentSizesStory from './DifferentSizesStory';
import RuntimeResizeStory from "./RuntimeResizeStory";
import RotateStory from './RotateStory';

storiesOf('React SVG Pan Zoom', module)
  .addDecorator(withKnobs)
  .add('README', () => <Welcome/>)
  .add('Viewer', () => <ViewerStory/>)
  .add('Call methods', () => <MethodsStory/>)
  .add('Autosizer viewer', () => <AutosizerViewer />)
  .add('Different Sizes', () => <DifferentSizesStory />)
  .add('Runtime Resize', () =>  <RuntimeResizeStory />)
  .add('Rotate', () => <RotateStory/>)


