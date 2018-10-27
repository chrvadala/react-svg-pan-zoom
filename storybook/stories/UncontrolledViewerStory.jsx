import React from 'react';

import {UncontrolledReactSVGPanZoom} from '../../src/index';
import Snake from './snake.svg';

const HAS_LOCAL_STORAGE = window.localStorage !== undefined;

export default class UncontrolledViewerStory extends React.Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <UncontrolledReactSVGPanZoom
        width={400} height={400}
        ref={Viewer => this.Viewer = Viewer}
      >

        <svg width={1440} height={1440}>
          <Snake/>
        </svg>
      </UncontrolledReactSVGPanZoom>
    )
  }
}
