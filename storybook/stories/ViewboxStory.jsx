import React, {StrictMode} from 'react';
import {action} from '@storybook/addon-actions';
import {noArgsDecorator, viewerMouseEventDecorator} from './actions-decorator';

import {UncontrolledReactSVGPanZoom} from '../../src/index';
import {boolean} from "@storybook/addon-knobs";

export default class ViewboxStory extends React.Component {
  constructor(props) {
    super(props)
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <StrictMode>

        <UncontrolledReactSVGPanZoom
          width={400} height={400}

          ref={Viewer => this.Viewer = Viewer}

          onClick={viewerMouseEventDecorator('onClick')}

          onChangeValue={noArgsDecorator('onChangeValue')}
          onChangeTool={action('onChangeTool')}

          detectAutoPan={boolean('detectAutoPan', false)}
          detectWheel={boolean('detectWheel', false)}
          detectPinchGesture={boolean('detectPinchGesture', false)}
        >

          <svg
            width={100} height={100}
            viewBox="10 10 80 80"
          >

            <rect x="20" y="20" width="60" height="60" fill="yellow"/>
            <circle cx="20" cy="20" r="4" fill="red"/>
            <circle cx="80" cy="80" r="4" fill="red"/>

            <circle cx="0" cy="0" r="4" fill="blue"/>
            <circle cx="100" cy="100" r="4" fill="blue"/>

            <circle cx="50" cy="50" r="2" fill="black"/>
          </svg>
        </UncontrolledReactSVGPanZoom>
      </StrictMode>
    )
  }
}
