# react-svg-pan-zoom
A react component that adds pan and zoom features to SVG

## Installation
```
npm install --save react-svg-pan-zoom
```

## See SVGPanZoom in action
```
  git clone https://github.com/chrvadala/react-svg-pan-zoom.git
  cd react-svg-pan-zoom
  npm install
  npm start
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
      tool: 'pan'  //one of `none`, `pan`, `zoom`
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
        <Viewer width={400} height={400}
          value={this.state.value} tool={this.state.tool}
          onChange={event => this.handleChange(event)}
          onClick={event => this.handleClick(event)}
          onMouseMove={event => this.handleMouseMove(event)} >

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
  - `width` – **required** – width of the viewer displayed on screen
  - `height` – **required** – height of the viewer displayed on screen
  - `background` – background of the viewer (default dark grey)
  - `style` - CSS style of the viewer
  - `SVGBackground` - background of the SVG (default white)
  - `value` - value of the viewer (current point of view)
  - `tool` - active tool ( one of `none`, `pan`, `zoom` )
  - `onChange` - handler something changed `fn(viewerEvent)`
  - `onClick` - handler click `fn(viewerEvent)`
  - `onMouseMove` - handler mousemove `fn(viewerEvent)`

## ViewerEvent attributes
Your event handlers will be passed instances of `ViewerEvent`. It has some useful attributes (See below). If, for your purpose, you need original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`.

  - `SyntheticEvent originalEvent` - The original React event
  - `number x` - x coordinate of the event mapped to SVG coordinates
  - `number y` - y coordinate of the event mapped to SVG coordinates
  - `number scaleFactor` - zoom level
  - `number translationX` - x delta from the viewer origin
  - `number translationY` - y delta from the viewer origin

## Contributing
Your contributions (issues and pull request) are appreciated!

### Author

- [chrvadala](https://github.com/chrvadala)

### License
MIT
