# React SVG Pan Zoom - Autosizer viewer

**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. 
If you need to automatically adapt the viewer size on the parent size you can use the component [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md).
This component is able to extract `width` and `height` from the parent box and pass them to a children component. 

## Example
```jsx harmony
import {AutoSizer} from 'react-virtualized';

<div style={{width: "100%", height: "100%"}}>
    <AutoSizer>
      {(({width, height}) => width === 0 || height === 0 ? null : (
        <ReactSVGPanZoom  width={width} height={height}>
          <svg width={1440} height={1440}>
            <g>
              <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
              <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
              <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
              <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
            </g>
          </svg>
        </ReactSVGPanZoom>
      ))}
    </AutoSizer>
  </div>
```
