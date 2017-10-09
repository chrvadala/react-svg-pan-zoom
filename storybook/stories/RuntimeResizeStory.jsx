import React, {Component} from 'react';

import {ReactSVGPanZoom,} from '../../src/index';

export default class DifferentSizesStory extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
    this.state = {
      viewerWidth: 500,
      viewerHeight: 250,
      imageWidth: 800,
      imageHeight: 400,
    }
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    this.Viewer.fitToViewer()
  }

  resize(){
    this.setState({
      viewerWidth: 250,
      viewerHeight: 500,
      imageWidth: 400,
      imageHeight: 800,
    })
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.resize}>Resize</button>

        <ReactSVGPanZoom
          width={this.state.viewerWidth} height={this.state.viewerHeight}
          detectAutoPan={false}
          ref={Viewer => this.Viewer = Viewer}>
          <svg width={this.state.imageWidth} height={this.state.imageHeight}>
            <text x="20" y="15">{this.state.viewerWidth}x{this.state.viewerHeight}</text>
            <text x="20" y="35">{this.state.imageWidth}x{this.state.imageHeight}</text>
          </svg>
        </ReactSVGPanZoom>
      </div>
    )
  }
}
