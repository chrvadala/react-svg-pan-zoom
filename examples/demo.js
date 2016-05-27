"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM} from '../index';
import SnakeSVG from './svg/snake';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);

    let defaultValue = ViewerHelper.getDefaultValue();
    defaultValue = ViewerHelper.fitSVGToViewer(defaultValue, 1440, 1440, 400, 400);

    this.state = {value: defaultValue, tool: TOOL_NONE, x: 0, y: 0};
  }


  handleChange(event) {
    this.setState({value: event.value});
  }

  handleReset(event){
    this.setState({value: ViewerHelper.fitSVGToViewer(this.state.value, 1440, 1440, 400, 400)})
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
      <div>

        <Viewer width={400} height={400} style={{border:'1px solid black'}}
          value={this.state.value}tool={this.state.tool}
          onChange={event => this.handleChange(event)}
          onClick={event => this.handleClick(event)}
          onMouseMove={event => this.handleMouseMove(event)} >

          {SnakeSVG}

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

        <div>
          <button onClick={event => this.handleReset(event)}>Reset</button>
        </div>

      </div>

    );
  }
}
