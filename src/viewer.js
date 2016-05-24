import React from 'react';
import ViewerHelper from './viewer-helper';
import ViewerEvent from './viewer-event';
import cursor from './cursor';
import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM,
  MODE_IDLE,
  MODE_PANNING
} from './constants';

export default class Viewer extends React.Component {

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
    let tool = this.props.tool;
    let matrix = this.props.value.matrix;
    let matrixStr = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;

    let style = {};
    if(tool === TOOL_PAN) style.cursor = cursor('grab');
    if(tool === TOOL_ZOOM) style.cursor = cursor('zoom-in');

    return (
      <svg
        ref="svg"
        width={this.props.viewerWidth}
        height={this.props.viewerHeight}
        style={Object.assign(style, this.props.style)}
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

        <g ref="artboard" transform={matrixStr}>
          <rect
            fill={this.props.artboardBackground}
            x={0}
            y={0}
            width={this.props.artboardWidth}
            height={this.props.artboardHeight}/>
          <g ref="content">
            {this.props.children}
          </g>
        </g>
      </svg>
    );
  }
}

Viewer.propTypes = {
  //width of the viewer displayed on screen
  viewerWidth: React.PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  viewerHeight: React.PropTypes.number.isRequired,

  //background of the viewer
  viewerBackground: React.PropTypes.string,

  //width of the artboard (size of the original vector image)
  artboardWidth: React.PropTypes.number.isRequired,

  //height of the artboard (size of the original vector image)
  artboardHeight: React.PropTypes.number.isRequired,

  //background of the artboard
  artboardBackground: React.PropTypes.string,

  //value of the viewer (current point of view)
  value: React.PropTypes.object.isRequired,

  //CSS style of the SVG tag
  style: React.PropTypes.object,

  //handler something changed
  onChange: React.PropTypes.func.isRequired,

  //handler click
  onClick: React.PropTypes.func,

  //handler mousemove
  onMouseMove: React.PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM)
  tool: React.PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM])
};

Viewer
  .defaultProps = {
  style: {},
  viewerBackground: "#616264",
  artboardBackground: "#fff",
  tool: TOOL_NONE
};
