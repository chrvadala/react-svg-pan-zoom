"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_ZOOM_FIT} from '../index';

class Simple extends React.Component {

  constructor(props) {
    super(props);

    let defaultValue = ViewerHelper.getDefaultValue();

    //defaultValue =  ViewerHelper.zoom(defaultValue, 4.1, 30, 50);
    //defaultValue =  ViewerHelper.pan(defaultValue, 100, 80);
    //defaultValue = ViewerHelper.startPan(defaultValue, 0, 0);
    //defaultValue = ViewerHelper.updatePan(defaultValue, 100, 100);
    //defaultValue = ViewerHelper.stopPan(defaultValue, 100, 100);

    defaultValue = ViewerHelper.fitSelectionToViewer(
      defaultValue,
      0, 0, 800, 800,
      400, 400);

    this.state = {value: defaultValue, tool: TOOL_NONE, x: 0, y: 0};
  }


  handleChange(event) {
    this.setState({value: event.value});
    console.log('changed');
  }

  handleClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.x,
      y: event.y
    });
  }

  handleChangeTool(event) {
    this.setState({tool: event.target.value});
  }

  render() {
    return (
      <div style={{margin:'100px'}}>


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
          <li><input
            type="radio"
            value={TOOL_ZOOM_IN}
            checked={this.state.tool === TOOL_ZOOM_IN}
            onChange={event => this.handleChangeTool(event)}/>TOOL: ZOOM IN
          </li>
          <li><input
            type="radio"
            value={TOOL_ZOOM_OUT}
            checked={this.state.tool === TOOL_ZOOM_OUT}
            onChange={event => this.handleChangeTool(event)}/>TOOL: ZOOM OUT
          </li>
          <li><input
            type="radio"
            value={TOOL_ZOOM_FIT}
            checked={this.state.tool === TOOL_ZOOM_FIT}
            onChange={event => this.handleChangeTool(event)}/>TOOL: ZOOM FIT
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
