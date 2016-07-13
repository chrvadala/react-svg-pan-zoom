# react-svg-pan-zoom
A react component that adds pan and zoom features to SVG

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)

[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Installation
```
npm install --save react-svg-pan-zoom
```

## See SVGPanZoom in action

### online
http://chrvadala.github.io/react-svg-pan-zoom/

### localhost
```
  git clone https://github.com/chrvadala/react-svg-pan-zoom.git
  cd react-svg-pan-zoom
  npm install && npm start
```

## Usage

### SVGPanZoom Viewer

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
      <div>
        <Viewer width={400} height={400} value={this.state.value}
        tool={this.state.tool}  onChange={this.handleChange} onClick={this.handleClick}>

          <svg width={800} height={800} >
            <rect x="30" y="50" width="100" height="70" fill="black"/>
            <circle cx="210" cy="120" r="50" fill="blue"/>
          </svg>

        </Viewer>
      </div>
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

### SVGPanZoom Responsive
SvgPanZoom requires width and height to work propertly. If you need a responsive component you can use `ViewerResponsive`, a component that extends `Viewer` and detects width and height trought its parent (See [ReactDimension](https://github.com/digidem/react-dimensions) for details).

~~`import {Viewer, ViewerHelper} from 'react-svg-pan-zoom';`~~

become

`import {ViewerResponsive, ViewerHelper} from 'react-svg-pan-zoom';`

## Build
```
npm run build
```

## Contributing
Your contributions (issues and pull request) are appreciated!

### Author

- [chrvadala](https://github.com/chrvadala)

### License
MIT
