# React SVG Pan Zoom - Migrate from V2 to V1

## Some props are now required.

This new version library contains two different viewer: `ReactSVGPanZoom` and `UncontrolledReactSVGPanZoom`.

*ReactSVGPanZoom* is the preferred way to use this component. It works as a stateless component and, unlike the previous version, the following props are now required.

`tool` - The tool actually used.
`onChangeTool(tool)` - An handler called when there's a tool change request.
`value` - The actual camera view on the image (observer point of view).
`onChangeValue(value)` - An handler called when the value is changed (may happens for different reasons).


You can thing to it as a React form input field
If you don't need to handle these things in your code, just use the `UncontrolledReactSVGPanZoom` component that does this work for you.

To use is just replace:

`import {ReactSVGPanZoom} from 'react-svg-pan-zoom';`

with

`import {UncontrolledReactSVGPanZoom as ReactSVGPanZoom} from 'react-svg-pan-zoom';`
