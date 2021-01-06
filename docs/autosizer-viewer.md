# React SVG Pan Zoom - Autosizer viewer

**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly.
If you need to automatically adapt the viewer size on the parent size you can use the hook [useWindowSize](https://www.npmjs.com/package/@react-hook/window-size).
This component is able to extract `width` and `height` from the parent box and pass them to a children component.

## Example
```jsx harmony
import {useWindowSize} from '@react-hook/window-size'

export const Resizable = (args) => {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState(INITIAL_VALUE)
  const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})

  useLayoutEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ReactSVGPanZoom
        width={width} height={height}
        ref={Viewer}
        value={value} onChangeValue={onChangeValue}
        tool={tool} onChangeTool={onChangeTool}
      >
        <svg width={500} height={500}>
          <g>
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  )
}
```
