# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)

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

[Sample code available here](./demo1)
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactSVGPanZoom, fitToViewer} from 'react-svg-pan-zoom';

class Demo1 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
  }
  componentDidMount() {
    this.Viewer.setValue(fitToViewer(this.Viewer.getValue()));
    //or simply
    this.Viewer.fitToViewer();
  }
  render() {
    return (
      <div>
        <button onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
        <button onClick={event => this.Viewer.fitSelection(40, 40, 200, 200)}>Zoom area 200x200</button>
        <button onClick={event => this.Viewer.fitToViewer()}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          style={{border: "1px solid black"}}
          width={500} height={500} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseUp={event => console.log('up', event.x, event.y)}
          onMouseMove={event => console.log('move', event.x, event.y)}
          onMouseDown={event => console.log('down', event.x, event.y)}>

          <svg width={617} height={316}>
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
  - `specialKeys` - array of keys used in zoom mode to switch between zoom-in and zoom-out (default binding: Win/Cmd, Ctrl)
  - `detectWheel` - detect zoom operation performed through pinch gesture or mouse scroll
  - `detectAutoPan` - perform PAN if the mouse is on the border of the viewer
  - `toolbarPosition` - toolbar position (one of `none`, `top`, `right`, `bottom`, `left`)
  - `SVGBackground` - background of the SVG (default color: white)
  - `onClick` - handler for click `fn(viewerEvent)`
  - `onMouseUp` - handler for mouseup `fn(viewerEvent)`
  - `onMouseMove` - handler for mousemove `fn(viewerEvent)`
  - `onMouseDown` - handler for mousedown `fn(viewerEvent)`
  - `value` - point of the view
  - `tool` - tool ( one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out` )
  - `onChange` - handler for changes `fn(value)`

##  Methods
 - `setValue( nextValue )` - Through this method you can set a new value
 - `pan( SVGDeltaX, SVGDeltaY )` - Apply a pan
 - `zoom(SVGPointX, SVGPointY, scaleFactor)` - Zoom in or out the SVG
 - `fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)` - Fit an SVG area to viewer
 - `fitToViewer()` - Fit all SVG to Viewer
 - `zoomOnViewerCenter(scaleFactor)` - Zoom SVG on center
 - `changeTool(tool)` - change current tool ( one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out` )

## ViewerEvent attributes
Your event handlers will be passed instances of `ViewerEvent`. It has some useful attributes (See below).
If, for your purpose, you need the original React event instance (`SyntheticEvent), you can get it through `event.originalEvent`.

  - `SyntheticEvent originalEvent` - The original React event
  - `SVGSVGElement SVGViewer` - Reference to SVGViewer
  - `object` - coordinates (x,y) of the event mapped to SVG coordinates
  - `number x` - x coordinate of the event mapped to SVG coordinates
  - `number y` - y coordinate of the event mapped to SVG coordinates
  - `number scaleFactor` - zoom level
  - `number translationX` - x delta from the viewer origin
  - `number translationY` - y delta from the viewer origin

## Advanced usage
If you need to control the state of the viewer you can use the method `onChange` and the prop `value`. With this two you
can control React SVG Pan Zoom in the same way in which you would with an `<input>` tag ([See here how](https://facebook.github.io/react/docs/forms.html#controlled-components)).

[Sample code available here](./demo2)
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';

class Demo2 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: null,
      tool: TOOL_NONE
    };
  }
  componentDidMount() {
    this.Viewer.setValue(fitToViewer(this.Viewer.getValue()));
    //or simply
    this.Viewer.fitToViewer();
  }
  render() {
    return (
      <div>
        <button onClick={event => this.setState({value: zoomOnViewerCenter(this.state.value, 1.1)})}>Zoom in</button>
        <button onClick={event => this.setState({value: fitSelection(this.state.value, 40, 40, 200, 200)})}>
          Zoom area 200x200
        </button>
        <button onClick={event => this.setState({value: fitToViewer(this.state.value)})}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          style={{border: "1px solid black"}}
          width={400} height={400} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseUp={event => console.log('up', event.x, event.y)}
          onMouseMove={event => console.log('move', event.x, event.y)}
          onMouseDown={event => console.log('down', event.x, event.y)}

          value={this.state.value} tool={this.state.tool}
          onChange={value => this.setState({value, tool: value.tool})}>

          <svg width={800} height={800}>
            <-- put here your SVG content -->
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
```


## Autosize
**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. If you need an autosized component you can use [ReactDimension](https://github.com/digidem/react-dimensions) to get the dimensions of a wrapper element and pass them as properties to its child element.

## Start local demo
```
git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install && npm start
```

## Contributing
Your contributions (issues and pull request) are very appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
