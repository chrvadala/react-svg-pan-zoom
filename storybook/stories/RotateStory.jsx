import React, { Component } from 'react';
import { ReactSVGPanZoom, TOOL_NONE, rotateOnCenter } from '../../src/index';

export default class RotateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      tool: TOOL_NONE
    };
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={event => this.setState({ value: rotateOnCenter(this.state.value, Math.PI / 2) })}>Rotate 90°
        </button>

        <hr />

        <ReactSVGPanZoom
          width={400} height={400} style={{ border: "1px solid black" }}
          ref={Viewer => this.Viewer = Viewer}
          detectAutoPan={false}

          value={this.state.value} onChangeValue={value => this.setState({ value })}
          tool={this.state.tool} onChangeTool={tool => this.setState({ tool })}>

          <svg width={800} height={800}>
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142" />
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff" />
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0" />
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f" />
          </svg>

        </ReactSVGPanZoom>

      </div>
    );
  }
}