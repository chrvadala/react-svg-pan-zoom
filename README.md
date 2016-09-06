# react-svg-pan-zoom
A React component that adds pan and zoom features to SVG

[Live Demo available at http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)

[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)



## Usage
```
npm install --save react-svg-pan-zoom
```

[A full DEMO is available here](https://github.com/chrvadala/react-svg-pan-zoom/blob/master/demo/demo.js)
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
  - `width` – **required** – width of the viewer displayed on screen (if you want to omit this see below)
  - `height` – **required** – height of the viewer displayed on screen (if you want to omit this see below)
  - `background` – background of the viewer (default dark grey)
  - `style` - CSS style of the viewer
  - `specialKeys` - array of keys that in zoom mode switch zoom in and zoom out (default Win/Cmd, Ctrl)
  - `detectPinch` - detect zoom operation performed trough pinch gesture or mouse scroll
  - `SVGBackground` - background of the SVG (default white)
  - `value` - value of the viewer (current point of view)
  - `tool` - active tool ( one of `none`, `pan`, `zoom`, `zoom-in`, `zoom-out` )
  - `onChange` - handler something changed `fn(viewerEvent)`
  - `onClick` - handler click `fn(viewerEvent)`
  - `onMouseUp` - handler mouseup `fn(viewerEvent)`
  - `onMouseMove` - handler mousemove `fn(viewerEvent)`
  - `onMouseDown` - handler mousedown `fn(viewerEvent)`

## ViewerEvent attributes
Your event handlers will be passed instances of `ViewerEvent`. It has some useful attributes (See below). If, for your purpose, you need original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`.

  - `SyntheticEvent originalEvent` - The original React event
  - `object` - coordinate {x,y} of the event mapped to SVG coordinates
  - `number x` - x coordinate of the event mapped to SVG coordinates
  - `number y` - y coordinate of the event mapped to SVG coordinates
  - `number scaleFactor` - zoom level
  - `number translationX` - x delta from the viewer origin
  - `number translationY` - y delta from the viewer origin

## Autosize
**React SVG Pan Zoom** requires `width` and `height` to works properly. If you need an autosized component you can get the dimensions of a wrapper element and pass them as properties to the child element through [ReactDimension](https://github.com/digidem/react-dimensions).

## Start local demo
```
git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install && npm start
```

## Contributing
Your contributions (issues and pull request) are appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
