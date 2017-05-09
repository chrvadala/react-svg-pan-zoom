import React from 'react';
import {configure, addDecorator} from '@kadira/storybook';
import ribbon from './ribbon'

addDecorator(ribbon);

configure(() => {
  require('./stories/home.stories');
  require('./stories/with-toolbar.stories');
  require('./stories/methods.stories');
  require('./stories/auto-mode.stories');
}, module);
