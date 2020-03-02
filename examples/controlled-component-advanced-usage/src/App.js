import React from 'react';
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter
} from 'react-svg-pan-zoom';

/* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
export default class App extends React.PureComponent {

  state = {tool: TOOL_NONE, value: INITIAL_VALUE}
  Viewer = null

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  fitToViewer() {
    this.setState(state => ({value: fitToViewer(state.value)}))
  }

  fitSelection() {
    this.setState(state => ({value: fitSelection(state.value, 40, 40, 200, 200)}))
  }

  zoomOnViewerCenter() {
    this.setState(state => ({value: zoomOnViewerCenter(state.value, 1.1)}))
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={() => this.zoomOnViewerCenter()}>Zoom in</button>
        <button className="btn" onClick={() => this.fitSelection()}>Zoom area 200x200</button>
        <button className="btn" onClick={() => this.fitToViewer()}>Fit</button>
        <hr/>

        <ReactSVGPanZoom
          width={1000} height={700}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value} onChangeValue={value => this.changeValue(value)}
          scroll="auto"
          detectAutoPan={false}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        >
          <svg width={617} height={316}>
            <g fillOpacity=".5" strokeWidth="4">
              <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
              <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
              <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
              <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
