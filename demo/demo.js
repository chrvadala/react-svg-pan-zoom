"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT } from '../src/index';
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

  handleReset(event) {
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

  handleMouseUp(event) {
    console.log('up', event.x, event.y);
  }

  handleMouseDown(event) {
    console.log('down', event.x, event.y);
  }

  handleChangeTool(event) {
    this.setState({tool: event.target.value});
  }

  render() {
    return (
      <div style={{display: "flex"}}>

        {/* col-1 */}
        <div style={{width: "50%"}} style={{border:'1px solid black'}}>
          <Viewer width={400} height={400}
                  value={this.state.value} tool={this.state.tool}
                  onChange={event => this.handleChange(event)}
                  onClick={event => this.handleClick(event)}
                  onMouseMove={event => this.handleMouseMove(event)}
                  onMouseUp={event => this.handleMouseUp(event)}
                  onMouseDown={event => this.handleMouseDown(event)}>

            {SnakeSVG}

          </Viewer>
        </div>

        {/* col-2 */}
        <div style={{width: "50%", paddingLeft: "20px"}}>

          <ul style={{listStyle: "none", padding:"0px", margin:"0px"}}>
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
              <span style={{fontSize: "12px", color:"#555", paddingLeft: "4px"}}>Switch with CTRL or Win/CMD</span>
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
          </ul>

          <div>
            <button onClick={event => this.handleReset(event)}>Reset view</button>
          </div>


          <div>
            Position: {this.state.x},{this.state.y}
          </div>

        </div>
      </div>


    );
  }
}
