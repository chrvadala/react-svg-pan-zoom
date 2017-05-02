<!-- START_NO_WEB -->
# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![es-next-compliant](https://img.shields.io/badge/es:next-compliant-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)
![license-mit](https://img.shields.io/badge/license-MIT-42cd00.svg)

[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Live Demo
available at [http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)
<!-- END_NO_WEB -->

## Features
This component can work in four different modes depending on the selected tool:
- With the tool **pan** the user can move the image and drag it around within the viewer, but can't interact with SVG child elements.
- With the tool **zoom** the user can scale the image either with a point click or selecting a region to zoom the specified area, but can't interact with SVG child elements.
- With the tool **none** the user can interact with SVG child elements and trigger events.
- With the tool **auto** the user can interact with SVG child elements, perform *pan* (dragging the image), *zoom in* (double click), *zoom out* (double click + shift).

## Additional Features
- Zoom detection performed through pinch and scroll (optional)
- *Autopan* when the mouse is close to the edge of the viewer (optional)
- Each callback function receives (x,y) coords mapped to the real size of the SVG
- Programmatically controllable
- Event info managed lazily to ensure high performance
- ES6 syntax


## Usage
```sh
npm install --save react-svg-pan-zoom
```
```sh
bower install react-svg-pan-zoom
```

[Sample code available here](./examples/1-basic/example1.jsx)
```js
import React from 'react';
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
          style={{outline: "1px solid black"}}
          width={500} height={500} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseMove={event => console.log('move', event.x, event.y)} >

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
  - `value` - inject and lock the viewer to a specific value
  - `onChangeValue` - callback called when the viewer changes its value `fn(value: object)`
  - `tool` - inject and lock the viewer to a specific tool ( one of `none`, `pan`, `zoom-in`, `zoom-out`, `auto` )
  - `onChangeTool` - callback called when the viewer changes the used tool `fn(tool: string)`
  - `SVGBackground` - background of the SVG (default color: white)
  - `background` – background of the viewer (default color: dark grey)
  - `style` - CSS style of the viewer
  - `className` - CSS class of the viewer
  - `detectWheel` - detect zoom operation performed through pinch gesture or mouse scroll
  - `detectAutoPan` - perform PAN if the mouse is on the border of the viewer
  - `toolbarPosition` - toolbar position (one of `none`, `top`, `right`, `bottom`, `left`)
  - `customToolbar` - React component with custom toolbar
  - `modifierKeys` - array with modifier keys used with the tool `auto` to swap `zoom in` and `zoom out` ([Accepted value]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState))
  - `preventPanOutside` - if false the user can move the image outside the viewer
  - `scaleFactor` - how much scale in or out (default: 1.1 = 110%)
  - `customToolbar` - override toolbar component
  - `miniaturePosition` - miniature position (one of `none`, `right`, `left`)
  - `miniatureWidth` - miniature width (default: 100px)
  - `customMiniature` - override miniature component
  - `onClick` - handler* for click `fn(viewerEvent: ViewerMouseEvent)`
  - `onDoubleClick` - handler* for dblclick `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseUp` - handler* for mouseup `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseMove` - handler* for mousemove `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseDown` - handler* for mousedown `fn(viewerEvent: ViewerMouseEvent)`
  - `onTouchStart` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchMove` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchEnd` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchCancel` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`

\* handler available only with the tool `none` or `auto`

##  Methods
 - `pan( SVGDeltaX, SVGDeltaY )` - Apply a pan
 - `zoom(SVGPointX, SVGPointY, scaleFactor)` - Zoom in or out the SVG
 - `fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)` - Fit an SVG area to viewer
 - `fitToViewer()` - Fit all SVG to Viewer
 - `setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)` - Set a point on Viewer center
 - `reset()` - Reset Viewer view to default
 - `zoomOnViewerCenter(scaleFactor)` - Zoom SVG on center
 - `getValue()` - Get current viewer value
 - `setValue(value)` - Through this method you can set a new value
 - `getTool()` - Get current tool
 - `setTool(tool)` - Set a tool (one of `none`,`pan`,`zoom-in`,`zoom-out`,`auto`)

## Event attributes
To your event handlers will be passed an instance of `ViewerMouseEvent` or `ViewerTouchEvent` (as the case). They have some useful attributes that map event positions to SVG coords.
If, for your purpose, you need the original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`. You can't use event in async way, see [React Event Pooling](https://facebook.github.io/react/docs/events.html#event-pooling) for more information.

### Viewer Mouse Event
  - `originalEvent: SyntheticEvent` - The original React event
  - `SVGViewer: SVGSVGElement ` - Reference to SVGViewer
  - `point: object ` - coordinates (x,y) of the event mapped to SVG coordinates
  - `x: number ` - x coordinate of the event mapped to SVG coordinates
  - `y: number ` - y coordinate of the event mapped to SVG coordinates
  - `scaleFactor: number ` - zoom level
  - `translationX: number ` - x delta from the viewer origin
  - `translationY: number ` - y delta from the viewer origin
  - `preventDefault(): void ` - alias `originalEvent.preventDefault()`
  - `stopPropagation(): void ` - alias `originalEvent.stopPropagation()`

### Viewer Touch Event
  - `originalEvent: SyntheticEvent` - The original React event
  - `SVGViewer: SVGSVGElement ` - Reference to SVGViewer
  - `points: array[{x, y, identifier}] ` - array with coordinates (x, y, identifier) of the touches mapped to SVG coordinates
  - `changedPoints: array[{x, y, identifier}] ` - coordinates (x, y, identifier) of the changed touches mapped to SVG coordinates
  - `scaleFactor: number ` - zoom level
  - `translationX: number ` - x delta from the viewer origin
  - `translationY: number ` - y delta from the viewer origin
  - `preventDefault(): void ` - alias `originalEvent.preventDefault()`
  - `stopPropagation(): void ` - alias `originalEvent.stopPropagation()`

## Examples
- [**Basic**](./examples/1-basic/) - This project show how to use the component in a scenario when is not required a full control on the internal state. This is the easist React SVG Pan Zoom usage.
- [**Controlled state**](./examples/2-controlled-state/) - This advanced project show a scenario in which the parent component has a full control of the svg viewer. *The state is owned by the parent* and injected on the viewer throught `props`. Any state change request is performed by two callbacks `onChangeValue(value)` and `onChangeTool(tool)`. This demo apply the same pattern of an `<input>` tag ([React Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)).
- [**Redux**](./examples/3-redux/) - This advanced project show a scenario in which a redux store handle the state. Each component can dispatch a Redux action and edit the current view of the viewer.
- [**Bower**](./examples/4-bower/) - This project show how to use this component by mean of bower.

## Some projects using react-svg-pan-zoom
- [**React Planner**](https://github.com/cvdlab/react-planner)
- [**Others...**](https://libraries.io/npm/react-svg-pan-zoom/dependent-repositories)

## Autosize
**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. If you need an autosized component you can use [ReactDimension](https://github.com/digidem/react-dimensions) to get the dimensions of a wrapper element and pass them as properties to its child element.

## Start local demo
```sh
git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install && npm start
```

## Changelog
- **v2.0** - Project refactor. Follow [this guide](./docs/migrate-from-v1-to-v2.md) for migration instructions.
- **v2.1** - Adds `setPointOnViewerCenter`, `reset` methods and `className`, `style` props
- **v2.2** - Introduce tool `auto`, improve default toolbar
- **v2.3** - Adds touch events support
- **v2.4** - Adds es:next support, deploy new website
- **v2.5** - Adds `preventPanOutside` and `scaleFactor` props
- **v2.6** - Introduce [transformation-matrix](https://www.npmjs.com/package/transformation-matrix) that reduce bundle size thanks to three shaking, Fix pan limit behaviour, Replaces toolbar links with buttons, minor improvements
- **v2.7** - Adds miniature feature, Adds [PropTypes](https://www.npmjs.com/package/prop-types) support

## Contributing
Your contributions (issues and pull request) are very appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
