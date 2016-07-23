"use strict";

import React from 'react';
import {Viewer, ViewerHelper, Toolbar, TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from '../src/index';
import SnakeSVG from './svg/snake';
import If from './if';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);

    let defaultValue = ViewerHelper.getDefaultValue();
    defaultValue = ViewerHelper.fitSVGToViewer(defaultValue, 1440, 1440, 500, 500);

    this.state = {value: defaultValue, tool: TOOL_NONE, x: 0, y: 0};
  }


  handleReset(event) {
    this.setState({value: ViewerHelper.fitSVGToViewer(this.state.value, 1440, 1440, 500, 500)})
  }

  debugClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <div style={{position: "relative", width: "500px", height: "500px", border: '1px solid black'}}>

          <Viewer width={500} height={500}
                  value={this.state.value} tool={this.state.tool}
                  onChange={event => this.setState({value: event.value})}         //update state

                  onClick={event => this.debugClick(event)}                       //display click on console
                  onMouseMove={event => this.setState({x: event.x, y: event.y })} //display mouse position on window
                  onMouseUp={event => console.info('up', event.x, event.y)}       //print mouseup on console
                  onMouseDown={event => console.info('down', event.x, event.y)}   //print mousedown on console
            >
            {SnakeSVG}
          </Viewer>

          <Toolbar
            style={{position: "absolute", top: "10px", right: "10px"}}
            tool={this.state.tool}
            onChangeTool={tool =>  this.setState({tool: tool})} />
        </div>

        <div style={{paddingLeft: "15px"}}>
          <If condition={this.state.tool === TOOL_NONE}>
            <strong>SVG Mouse Position</strong> <br/>
            x: {Number(this.state.x).toFixed(4)} <br/>
            y: {Number(this.state.y).toFixed(4)}
            <hr/>
          </If>

          <If condition={this.state.tool === TOOL_ZOOM}>
            <strong>Hey!</strong> <br/>
            Use CTRL or Win/CMD to switch zoom-in/zoom-out
            <hr/>
          </If>

          <strong>Reset pan/zoom state</strong> <br/>
          <button onClick={event => this.handleReset(event)}>Reset view</button>
        </div>

      </div>
    )
  }
}
