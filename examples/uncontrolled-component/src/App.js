import React, {useRef, useEffect} from 'react';
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';


export default function App() {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  /* Read all the available methods in the documentation */
  const _zoomOnViewerCenter = () => Viewer.current.zoomOnViewerCenter(1.1)
  const _fitSelection = () => Viewer.current.fitSelection(40, 40, 200, 200)
  const _fitToViewer = () => Viewer.current.fitToViewer()

  return (
    <div>
      <h1>UncontrolledReactSVGPanZoom</h1>
      <hr/>

      <button className="btn" onClick={() => _zoomOnViewerCenter()}>Zoom on center</button>
      <button className="btn" onClick={() => _fitSelection()}>Zoom area 200x200</button>
      <button className="btn" onClick={() => _fitToViewer()}>Fit</button>
      <hr/>

      <UncontrolledReactSVGPanZoom
        ref={Viewer}
        width={500} height={500}
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
      </UncontrolledReactSVGPanZoom>
    </div>
  )
}
