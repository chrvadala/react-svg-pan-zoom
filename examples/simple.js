"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM} from '../index';

class Simple extends React.Component {

  constructor(props) {
    super(props);

    let defaultValue = ViewerHelper.getDefaultValue();

    //defaultValue =  ViewerHelper.zoom(defaultValue, 4.1, 30, 50);
    //defaultValue =  ViewerHelper.pan(defaultValue, 100, 80);
    //defaultValue = ViewerHelper.startPan(defaultValue, 0, 0);
    //defaultValue = ViewerHelper.updatePan(defaultValue, 100, 100);
    //defaultValue = ViewerHelper.stopPan(defaultValue, 100, 100);

    this.state = {value: defaultValue, tool: TOOL_NONE};
  }


  handleChange(event) {
    this.setState({value: event.value});
    console.log('changed');
  }

  handleClick(event) {
    console.log('click', event);
    console.log('artboardX', event.artboardX);
    console.log('artboardY', event.artboardY);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.artboardX,
      y: event.artboardY
    });
  }

  handleChangeTool(event) {
    this.setState({tool: event.target.value});
  }

  render() {
    return (
      <div style={{margin:'100px'}}>
        <Viewer
          viewerWidth={400}
          viewerHeight={400}
          artboardWidth={800}
          artboardHeight={800}
          style={{border:'1px solid black'}}
          value={this.state.value}
          onChange={event => this.handleChange(event)}
          onClick={event => this.handleClick(event)}
          onMouseMove={event => this.handleMouseMove(event)}
          tool={this.state.tool}
        >

          <rect x="30" y="50" width="100" height="70" fill="black"/>
          <circle cx="210" cy="120" r="50" fill="blue"/>


        </Viewer>
        <ul style={{listStyle: "none", padding:"0px"}}>
          <li><input
            type="radio"
            value={TOOL_NONE}
            checked={this.state.tool === TOOL_NONE}
            onChange={event => this.handleChangeTool(event)}/>TOOL: NONE
          </li>
          <li><input
            type="radio"
            value={TOOL_PAN}
            checked={this.state.tool === TOOL_PAN}
            onChange={event => this.handleChangeTool(event)}/>TOOL: PAN
          </li>
          <li><input
            type="radio"
            value={TOOL_ZOOM}
            checked={this.state.tool === TOOL_ZOOM}
            onChange={event => this.handleChangeTool(event)}/>TOOL: ZOOM
          </li>
        </ul>

        <div>
          Position: {this.state.x},{this.state.y}
        </div>

      </div>

    );
  }
}


ReactDOM.render(
  React.createElement(Simple),
  document.getElementById('app')
);
