import React, { Component } from 'react';
import {ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';

class App extends Component {
  constructor(props, context) {
    super(props, context);
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
        <button onClick={event => this.setState({value: zoomOnViewerCenter(this.state.value, 1.1)})}>Zoom in
        </button>
        <button onClick={event => this.setState({value: fitSelection(this.state.value, 40, 40, 200, 200)})}>
          Zoom area 200x200
        </button>
        <button onClick={event => this.setState({value: fitToViewer(this.state.value)})}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          width={400} height={400} style={{border: "1px solid black"}}
          ref={Viewer => this.Viewer = Viewer}

          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseUp={event => console.log('up', event.x, event.y)}
          onMouseMove={event => console.log('move', event.x, event.y)}
          onMouseDown={event => console.log('down', event.x, event.y)}

          value={this.state.value} onChangeValue={value => this.setState({value})}
          tool={this.state.tool} onChangeTool={tool=> this.setState({tool})}>

          <svg width={800} height={800}>
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </svg>

        </ReactSVGPanZoom>

      </div>
    );
  }
}

export default App;
