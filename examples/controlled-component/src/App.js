import React from 'react';
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter
} from 'react-svg-pan-zoom';

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

  fitToViewer_1() {
    this.setState(state => ({value: fitToViewer(state.value)}))
  }

  fitToViewer_2() {
    this.Viewer.fitToViewer()
  }

  fitSelection_1() {
    this.setState(state => ({value: fitSelection(state.value, 40, 40, 200, 200)}))
  }

  fitSelection_2() {
    this.Viewer.fitSelection(40, 40, 200, 200)
  }

  zoomOnViewerCenter_1() {
    this.setState(state => ({value: zoomOnViewerCenter(state.value, 1.1)}))
  }

  zoomOnViewerCenter_2() {
    this.Viewer.zoomOnViewerCenter(1.1)
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={() => this.zoomOnViewerCenter_1()}>Zoom in</button>
        <button className="btn" onClick={() => this.fitSelection_1()}>Zoom area 200x200</button>
        <button className="btn" onClick={() => this.fitToViewer_1()}>Fit</button>

        <strong>OR</strong>
        {/* keep attention in this way onZoom and onPan cb aren't called */}
        <button className="btn" onClick={() => this.zoomOnViewerCenter_2()}>Zoom in</button>
        <button className="btn" onClick={() => this.fitSelection_2()}>Zoom area 200x200</button>
        <button className="btn" onClick={() => this.fitToViewer_2()}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          width={500} height={500}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value} onChangeValue={value => this.changeValue(value)}

          onZoom={e => console.log('zoom')}
          onPan={e => console.log('pan')}

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
