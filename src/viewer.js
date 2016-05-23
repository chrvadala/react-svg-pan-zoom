import React from 'react';
import ViewerHelper from './viewer-helper';
import ViewerEvent from './viewer-event';
import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM,
  MODE_IDLE,
  MODE_PANNING
} from './constants';

class SvgPanZoom extends React.Component {

  handleStartPan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if(tool !== TOOL_PAN) return;
    if(value.mode !== MODE_IDLE) return;

    let nextValue = ViewerHelper.startPan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleUpdatePan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if(tool !== TOOL_PAN) return;
    if(value.mode !== MODE_PANNING) return;

    //the mouse exited and reentered into svg
    let forceExit = (value.mode === MODE_PANNING && event.buttons === 0);

    let nextValue = forceExit ? ViewerHelper.stopPan(value) : ViewerHelper.updatePan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleStopPan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if(tool !== TOOL_PAN) return;
    if(value.mode !== MODE_PANNING) return;

    let nextValue = ViewerHelper.stopPan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleZoom(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if(tool !== TOOL_ZOOM) return;

    let scaleFactor = event.altKey ? 0.9 : 1.1;

    let nextValue = ViewerHelper.zoom(value, scaleFactor, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleClick(event){
    let {value, tool, onClick} = this.props;
    if(tool !== TOOL_NONE) return;
    if(!onClick) return;

    onClick(new ViewerEvent(event, value));
  }

  handleMouseMove(event){
    let {value, tool, onMouseMove} = this.props;
    if(tool !== TOOL_NONE) return;
    if(!onMouseMove) return;

    onMouseMove(new ViewerEvent(event, value));
  }

  render() {

    let matrix = this.props.value.matrix;
    let matrixStr = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;

    return (
      <svg
        ref="svg"
        width={this.props.viewerWidth}
        height={this.props.viewerHeight}
        style={this.props.style}
        onMouseDown={ event => {this.handleZoom(event); this.handleStartPan(event)} }
        onMouseMove={ event => {this.handleUpdatePan(event); this.handleMouseMove(event)} }
        onMouseUp={ event => this.handleStopPan(event) }
        onClick={event => this.handleClick(event)}
      >

        <rect
          fill={this.props.viewerBackground}
          x={0}
          y={0}
          width={this.props.viewerWidth}
          height={this.props.viewerHeight}/>

        <g ref="paper" transform={matrixStr}>
          <rect
            fill={this.props.paperBackground}
            x={0}
            y={0}
            width={this.props.paperWidth}
            height={this.props.paperHeight}/>
          <g ref="content">
            {this.props.children}
          </g>
        </g>
      </svg>
    );
  }
}

SvgPanZoom
  .propTypes = {
  //width of the container displayed on screen
  viewerWidth: React.PropTypes.number.isRequired,

  //height of the container displayed on screen
  viewerHeight: React.PropTypes.number.isRequired,

  //background of the viewer
  viewerBackground: React.PropTypes.string,

  //width of the paper
  paperWidth: React.PropTypes.number.isRequired,

  //height of the paper
  paperHeight: React.PropTypes.number.isRequired,

  //background of the paper
  paperBackground: React.PropTypes.string,

  //state of the viewer
  value: React.PropTypes.object.isRequired,

  //style of the SVG tag
  style: React.PropTypes.object,

  //handler something change
  onChange: React.PropTypes.func.isRequired,

  //handler click
  onClick: React.PropTypes.func,

  //handler mousemove
  onMouseMove: React.PropTypes.func,

  //active tool
  tool: React.PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM])
};

SvgPanZoom
  .defaultProps = {
  style: {},
  viewerBackground: "#616264",
  paperBackground: "#fff",
  tool: TOOL_NONE
};

export
default
SvgPanZoom;
