import React, {Component, StrictMode} from 'react';

import {UncontrolledReactSVGPanZoom} from '../../src/index';

const MODE1 = {
  viewerWidth: 500,
  viewerHeight: 250,
  imageWidth: 800,
  imageHeight: 400,
}

const MODE2 = {
  viewerWidth: 250,
  viewerHeight: 500,
  imageWidth: 400,
  imageHeight: 800,
}

export default class DifferentSizesStory extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
    this.state = {mode1: true}
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    this.Viewer.fitToViewer()
  }

  resize() {
    this.setState(state => ({mode1: !state.mode1}))
  }

  render() {
    const {
      viewerWidth,
      viewerHeight,
      imageWidth,
      imageHeight,
    } = this.state.mode1 ? MODE1 : MODE2

    return (
      <StrictMode>
        <button type="button" onClick={this.resize}>Runtime Resize</button>

        <UncontrolledReactSVGPanZoom
          width={viewerWidth} height={viewerHeight}
          detectAutoPan={false}
          ref={Viewer => this.Viewer = Viewer}>
          <svg width={imageWidth} height={imageHeight}>
            <text x="20" y="15">{viewerWidth}x{viewerHeight}</text>
            <text x="20" y="35">{imageWidth}x{imageHeight}</text>
          </svg>
        </UncontrolledReactSVGPanZoom>
      </StrictMode>
    )
  }
}
