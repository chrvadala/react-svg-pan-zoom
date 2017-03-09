import React, {PropTypes} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

export function App({state, actions}) {

  let viewerValue = state.get('viewerValue') ? state.get('viewerValue').toJS() : null;
  let viewerTool = state.get('viewerTool');

  return (
    <div style={{margin: "20px"}}>
      <button onClick={e => actions.zoomOnViewerCenter(1.1)}>Zoom in</button>
      <button onClick={e => actions.zoomOnViewerCenter(0.9)}>Zoom out</button>
      <button onClick={e => actions.fitToViewer()}>Fit to viewer</button>
      <br/>
      <button onClick={e => actions.pan(0, -20)}>Up</button>
      <button onClick={e => actions.pan(20, 0)}>Right</button>
      <button onClick={e => actions.pan(0, 20)}>Down</button>
      <button onClick={e => actions.pan(-20, 0)}>Left</button>
      <br/>
      <button onClick={e => actions.selectToolNone()}>Select tool none</button>
      <button onClick={e => actions.selectToolPan()}>Select tool pan</button>
      <button onClick={e => actions.selectToolZoomIn()}>Select tool zoom in</button>
      <button onClick={e => actions.selectToolZoomOut()}>Select tool zoom out</button>
      <br/>

      <ReactSVGPanZoom
        width={500} height={500}
        value={viewerValue} onChangeValue={value => actions.setValue(value)}
        tool={viewerTool} onChangeTool={tool => actions.selectTool(tool)}
        style={{outline: "1px solid black"}}>

        <svg width={800} height={800}>
          <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
          <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
          <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
          <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
        </svg>

      </ReactSVGPanZoom>
    </div>
  )
}


App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default App;
