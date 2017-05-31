# React SVG Pan Zoom - Getting Started

## Install
### NPM
```sh
npm install --save react-svg-pan-zoom
```
### UMD
```html
<script src="https://unpkg.com/react-svg-pan-zoom@2"></script>
```

## Usage
The easiest way to use **React SVG Pan Zoom** is to wrap an SVG tag with `<ReactSVGPanZoom>`. 

This operation adds zoom and pan features to the image and thanks to the toolbar, mouse and gesture events support,
 your users can interact with the image.
```jsx harmony
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
//or
const {ReactSVGPanZoom} = window.ReactSVGPanZoom;

<ReactSVGPanZoom
  width={500} height={500}
  onClick={event => console.log(event.x, event.y, event.originalEvent)}>
  
  <svg width={617} height={316}>
    <g>
      <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
      <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
      <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
      <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
    </g>
  </svg>  
</ReactSVGPanZoom>

```

If you need to fully control the current tool (one of `none`, `auto`, `pan`, `zoom-in`, `zoom-out` ), You can specify it using the prop `tool={ }`.
 To support the toolbar you have to manage the tool change request and so you have to attach an handler to 
 the props `onChangeTool={tool => {...}}` and update the current tool when requested.
```jsx harmony
import {ReactSVGPanZoom, TOOL_NONE, TOOL_AUTO, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
//or
const {ReactSVGPanZoom, TOOL_NONE, TOOL_AUTO, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} = window.ReactSVGPanZoom;

<ReactSVGPanZoom
  width={500} height={500}
  onClick={event => console.log(event.x, event.y, event.originalEvent)}
  
  tool={this.state.tool}
  onChangeTool={tool => this.setState({tool})}>
  
  <svg width={617} height={316}>
    <g>
      <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
      <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
      <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
      <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
    </g>
  </svg>
  
</ReactSVGPanZoom>

```

You can also fully control the state of the viewer. You can lock the viewer state on a specific value and 
support the view change with the handler `onChangeValue(value => {...})`.
You can also use any available methods exported by this module, to create a new value that can be injected into the component.
```jsx harmony
import {ReactSVGPanZoom, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
//or
const {ReactSVGPanZoom, fitSelection, zoomOnViewerCenter, fitToViewer} = window.ReactSVGPanZoom;

<div>
  <button onClick={e => this.setState({value: zoomOnViewerCenter(this.state.value, 1.1)}) }>zoom</button>
  <button onClick={e => this.setState({value: fitSelection(this.state.value, 40, 40, 200, 200)})}>fitSelection</button>
  <button onClick={e => this.setState({value: fitToViewer(this.state.value)})}>fitToViewer</button>
  
  <ReactSVGPanZoom
  width={500} height={500}
  onClick={event => console.log(event.x, event.y, event.originalEvent)}>
  
    <svg width={617} height={316}>
      <g>
        <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
        <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
        <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
        <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
      </g>
    </svg>
  
  </ReactSVGPanZoom>
</div>

``` 

You can also obtain an instance of this component and programmatically call each available methods.
```jsx harmony
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
//or
const {ReactSVGPanZoom} = window.ReactSVGPanZoom;

<div>
  <button onClick={e => this.Viewer.zoomOnViewerCenter(1.1)}>zoom</button> 
  <button onClick={e => this.Viewer.fitSelection(40, 40, 200, 200)}>fitSelection</button>
  <button onClick={e => this.Viewer.fitToViewer()}>fitToViewer</button>
  
  <ReactSVGPanZoom
  width={500} height={500}
  onClick={event => console.log(event.x, event.y, event.originalEvent)}
  ref={Viewer => this.Viewer = Viewer}>
    
    <svg width={617} height={316}>
      <g>
        <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
        <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
        <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
        <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
      </g>
    </svg>
  
  </ReactSVGPanZoom>
</div>
``` 

**React SVG Pan Zoom** supports a lot of features. [Documentation](./documentation.md) page describe each available **prop** and **methods**. 
[Examples](https://github.com/chrvadala/react-svg-pan-zoom#usage-examples) directory shows some useful usage.
