# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)
![licence-mit](https://img.shields.io/badge/license-MIT-42cd00.svg)

[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Live Demo
available at [http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)

## Features
This component can work in three different modes depending on the selected tool:
- With the tool **pan** the user can move the image and drag it around within the viewer
- With the tool **zoom** the user can scale the image either with a point click or selecting a region to zoom the specified area
- With the tool **none** the user can interact with the SVG content and trigger browser events

##Additional Features
- Zoom detection performed through pinch and scroll (optional)
- *Autopan* when the mouse is close to the edge of the viewer (optional)
- Each callback function receives (x,y) coords mapped to the real size of the SVG
- Programmatically controllable
- Event info managed lazily to ensure high performance
- ES6 syntax


## Usage
```
npm install --save react-svg-pan-zoom
```

[Sample code available here](examples/1-basic/example1.jsx)
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

class Demo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
  }
  componentDidMount() {    
    this.Viewer.fitToViewer();
  }
  render() {
    return (
      <div>
        <button onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
        <button onClick={event => this.Viewer.fitSelection(40, 40, 200, 200)}>Zoom area</button>
        <button onClick={event => this.Viewer.fitToViewer()}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          style={{border: "1px solid black"}}
          width={500} height={500} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseUp={event => console.log('up', event.x, event.y)}
          onMouseMove={event => console.log('move', event.x, event.y)}
          onMouseDown={event => console.log('down', event.x, event.y)}>

          <svg width={900} height={800}>
              <-- put here your SVG content -->
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
```

## Props
  - `width` – **required** – width of the viewer displayed on screen (if you want to omit this see [Autosize](#autosize))
  - `height` – **required** – height of the viewer displayed on screen (if you want to omit this see  [Autosize](#autosize))
  - `background` – background of the viewer (default color: dark grey)
  - `style` - CSS style of the viewer
  - `detectWheel` - detect zoom operation performed through pinch gesture or mouse scroll
  - `detectAutoPan` - perform PAN if the mouse is on the border of the viewer
  - `toolbarPosition` - toolbar position (one of `none`, `top`, `right`, `bottom`, `left`)
  - `SVGBackground` - background of the SVG (default color: white)
  - `onClick` - handler for click `fn(viewerEvent: ViewerEvent)` *(available with the tool `none`)*
  - `onMouseUp` - handler for mouseup `fn(viewerEvent: ViewerEvent)` *(available with the tool `none`)*
  - `onMouseMove` - handler for mousemove `fn(viewerEvent: ViewerEvent)` *(available with the tool `none`)*
  - `onMouseDown` - handler for mousedown `fn(viewerEvent: ViewerEvent)` *(available with the tool `none`)*
  - `value` - inject and lock the viewer to a specific value
  - `onChangeValue` - callback called when the viewer changes its value `fn(value)`
  - `tool` - inject and lock the viewer to a specific tool ( one of `none`, `pan`, `zoom-in`, `zoom-out` )
  - `onChangeTool` - callback called when the viewer changes the used tool `fn(tool)`

##  Methods
 - `pan( SVGDeltaX, SVGDeltaY )` - Apply a pan
 - `zoom(SVGPointX, SVGPointY, scaleFactor)` - Zoom in or out the SVG
 - `fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)` - Fit an SVG area to viewer
 - `fitToViewer()` - Fit all SVG to Viewer
 - `zoomOnViewerCenter(scaleFactor)` - Zoom SVG on center
 - `getValue()` - Get current viewer value
 - `setValue(value)` - Through this method you can set a new value
 - `getTool()` - Get current tool
 - `setTool(tool)` - Set a tool (one of `none`,`pan`,`zoom-in`,`zoom-out`)

## ViewerEvent attributes
Your event handlers will be passed instances of `ViewerEvent`. It has some useful attributes (See below).
If, for your purpose, you need the original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`.

  - `originalEvent: SyntheticEvent` - The original React event
  - `SVGViewer: SVGSVGElement ` - Reference to SVGViewer
  - `point: object ` - coordinates (x,y) of the event mapped to SVG coordinates
  - `x: number ` - x coordinate of the event mapped to SVG coordinates
  - `y: number ` - y coordinate of the event mapped to SVG coordinates
  - `scaleFactor: number ` - zoom level
  - `translationX: number ` - x delta from the viewer origin
  - `translationY: number ` - y delta from the viewer origin

## Examples
| Example          |  Description |
| ---------------- |  ----------- |
|[Basic](examples/1-basic/) | This project show how to use the component in a scenario when is not required a full control on the internal state. This is the easist React SVG Pan Zoom usage.|
|[Controlled state](examples/2-controlled-state/) | This advanced project show a scenario in which the parent component has a full control of the svg viewer. *The state is owned by the parent* and injected on the viewer throught `props`. Any state change request is performed by two callbacks `onChangeValue(value)` and `onChangeTool(tool)`. This demo apply the same pattern of an `<input>` tag ([React Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)).|
|[Redux](examples/3-redux/) | This advanced project show a scenario in which a redux store handle the state. Each component can dispatch a Redux action and edit the current view of the viewer.|
|[React Planner](https://cvdlab.github.io/react-planner/) | This is a React project that use this component.|


## Autosize
**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. If you need an autosized component you can use [ReactDimension](https://github.com/digidem/react-dimensions) to get the dimensions of a wrapper element and pass them as properties to its child element.

## Start local demo
```
git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install && npm start
```

## Changelog
| V | Changes |
|---| ------- |
|2.0| Project refactor. Follow [this guide](/docs/migrate-from-v1-to-v2.md) for migration instructions.|

## Contributing
Your contributions (issues and pull request) are very appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
