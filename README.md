# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

## Live Demo
[available at http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)

[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Features
This component can work in three different modes depending on the selected tool:
- With the tool **pan** the user can move the image dragging it around within the viewer
- With the tool **zoom** the user can scale the image either with a point click or selecting a region to zoom the specified area
- With the tool **none** the user can interact with the SVG content and trigger browser events

##Additional Features
- Zoom detection performed through pinch and scroll (optional)
- *Autopan* when the mouse is close to the edge of the viewer (optional)
- Each callback function receives (x,y) coords mapped to the real size of the SVG
- Fully stateless
- Event info managed lazily to ensure high performance
- ES6 syntax


## Usage
```
npm install --save react-svg-pan-zoom
```

[Sample code available here](https://github.com/chrvadala/react-svg-pan-zoom/blob/master/demo/demo.js)
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper} from 'react-svg-pan-zoom';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ViewerHelper.getDefaultValue(),
      tool: 'pan'  //one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out`
    };
  }

  handleChange(event) {
    this.setState({value: event.value});
  }

  handleClick(event){
    console.log('click', event.x, event.y, event.originalEvent);
  }

  render() {
    return (
      <Viewer width={400} height={400} value={this.state.value}
      tool={this.state.tool}  onChange={this.handleChange} onClick={this.handleClick}>

        <svg width={800} height={800} >
          <-- put here your SVG content -->
        </svg>

      </Viewer>
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
  - `detectPinch` - detect zoom operation performed trough pinch gesture or mouse scroll
  - `detectAutoPan` - perform PAN if the mouse is on the border of the viewer
  - `SVGBackground` - background of the SVG (default color: white)
  - `value` - value of the viewer (current point of view)
  - `tool` - active tool ( one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out` )
  - `onChange` - handler for changes `fn(viewerEvent)`
  - `onClick` - handler for click `fn(viewerEvent)`
  - `onMouseUp` - handler for mouseup `fn(viewerEvent)`
  - `onMouseMove` - handler for mousemove `fn(viewerEvent)`
  - `onMouseDown` - handler for mousedown `fn(viewerEvent)`

## ViewerEvent attributes
Your event handlers will be passed instances of `ViewerEvent`. It has some useful attributes (See below). If your purpose demands you to have  the original React event instance (`SyntheticEvent`), it is provided by `event.originalEvent.

  - `SyntheticEvent originalEvent` - The original React event
  - `SVGSVGElement SVGViewer` - Reference to SVGViewer
  - `object` - coordinate (x,y) of the event mapped to SVG coordinates
  - `number x` - x coordinate of the event mapped to SVG coordinates
  - `number y` - y coordinate of the event mapped to SVG coordinates
  - `number scaleFactor` - zoom level
  - `number translationX` - x delta from the viewer origin
  - `number translationY` - y delta from the viewer origin

## Autosize
**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. If you need an autosized component you can use [ReactDimension](https://github.com/digidem/react-dimensions) to get the dimensions of a wrapper element and pass them as properties to its/the child element.

## Start local demo
```
git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install && npm start
```

## Contributing
Your contributions (issues and pull request) are much appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
