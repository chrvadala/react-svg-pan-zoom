# react-svg-pan-zoom
A react component that adds pan and zoom features to SVG

## Installation
```
npm install --save react-svg-pan-zoom
```

## Usage

### SVGPanZoom Viewer

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM} from 'react-svg-pan-zoom';

class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ViewerHelper.getDefaultValue(),
      tool: TOOL_PAN      //you can change this state with TOOL_NONE or TOOL_ZOOM
    };
  }

  handleChange(event) {
    this.setState({value: event.value});
  }

  render() {
    return (
      <div>
        <Viewer width={400} height={400} style={{border:'1px solid black'}}
          value={this.state.value}tool={this.state.tool}
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
  - `onChange` - handler something changed
  - `onClick` - handler click
  - `onMouseMove` - handler mousemove
  - `tool` - active tool (`TOOL_NONE`, `TOOL_PAN`, `TOOL_ZOOM`)
