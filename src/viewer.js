import React from 'react';
import ViewerHelper from './viewer-helper';
import ViewerEvent from './viewer-event';
import cursor from './cursor';
import {calculateBox} from './utils';
import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_ZOOM_FIT,
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOM_SELECTING,
} from './constants';

export default class Viewer extends React.Component {

  handleStartPan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if (tool !== TOOL_PAN) return;
    if (value.mode !== MODE_IDLE) return;

    let nextValue = ViewerHelper.startPan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleUpdatePan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if (tool !== TOOL_PAN) return;
    if (value.mode !== MODE_PANNING) return;

    //the mouse exited and reentered into svg
    let forceExit = (value.mode === MODE_PANNING && event.buttons === 0);

    let nextValue = forceExit ? ViewerHelper.stopPan(value) : ViewerHelper.updatePan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleStopPan(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if (tool !== TOOL_PAN) return;
    if (value.mode !== MODE_PANNING) return;

    let nextValue = ViewerHelper.stopPan(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleZoom(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if ([TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT].indexOf(tool) === -1) return;

    let scaleFactor = event.altKey ? 0.9 : 1.1;
    if (tool === TOOL_ZOOM_IN) scaleFactor = 1.1;
    if (tool === TOOL_ZOOM_OUT) scaleFactor = 0.9;

    let nextValue = ViewerHelper.zoom(value, scaleFactor, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleStartZoomSelection(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange} = this.props;

    if (tool !== TOOL_ZOOM_FIT) return;
    if (value.mode !== MODE_IDLE) return;

    let nextValue = ViewerHelper.startZoomSelection(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleUpdateZoomSelection(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange, width, height} = this.props;

    if (tool !== TOOL_ZOOM_FIT) return;
    if (value.mode !== MODE_ZOOM_SELECTING) return;

    //the mouse exited and reentered into svg
    let forceExit = (event.buttons === 0);

    let nextValue = forceExit ?
      ViewerHelper.stopZoomSelection(value, width, height)
      : ViewerHelper.updateZoomSelection(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleStopZoomSelection(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange, width, height} = this.props;

    if (tool !== TOOL_ZOOM_FIT) return;
    if (value.mode !== MODE_ZOOM_SELECTING) return;

    let nextValue = ViewerHelper.stopZoomSelection(value, width, height);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleClick(event) {
    let {value, tool, onClick} = this.props;
    if (tool !== TOOL_NONE) return;
    if (!onClick) return;

    onClick(new ViewerEvent(event, value));
  }

  handleMouseMove(event) {
    let {value, tool, onMouseMove} = this.props;
    if (tool !== TOOL_NONE) return;
    if (!onMouseMove) return;

    onMouseMove(new ViewerEvent(event, value));
  }

  render() {
    let originalSVG = this.props.children;
    let tool = this.props.tool;
    let {matrix, mode} = this.props.value;
    let matrixStr = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;

    let style = {};
    if (tool === TOOL_PAN) style.cursor = cursor(mode === MODE_PANNING ? 'grabbing' : 'grab');
    if (tool === TOOL_ZOOM) style.cursor = cursor('zoom-in');
    if (tool === TOOL_ZOOM_IN) style.cursor = cursor('zoom-in');
    if (tool === TOOL_ZOOM_OUT) style.cursor = cursor('zoom-out');

    let zoomSelectionRect;
    if (mode === MODE_ZOOM_SELECTING) {
      let {startX, startY, endX, endY} = this.props.value;
      let box = calculateBox({x: startX, y: startY}, {x: endX, y: endY});

      zoomSelectionRect =
        <rect
          stroke="#969FFF"
          strokeOpacity={0.7}
          fill="#F3F4FF"
          fillOpacity={0.7}
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}/>
    }


    return (
      <svg
        ref="svg"
        width={this.props.width}
        height={this.props.height}
        style={Object.assign(style, this.props.style)}
        onMouseDown={ event => {this.handleZoom(event); this.handleStartPan(event); this.handleStartZoomSelection(event)} }
        onMouseMove={ event => {this.handleUpdatePan(event); this.handleMouseMove(event); this.handleUpdateZoomSelection(event)} }
        onMouseUp={ event => {this.handleStopPan(event); this.handleStopZoomSelection(event)} }
        onClick={event => this.handleClick(event)}
      >

        <rect
          fill={this.props.viewerBackground}
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height}/>

        <g ref="originalSvg" transform={matrixStr}>
          <rect
            fill={this.props.SVGBackground}
            x={0}
            y={0}
            width={originalSVG.props.width}
            height={originalSVG.props.height}/>
          <g ref="content">
            {originalSVG.props.children}
          </g>
        </g>
        {zoomSelectionRect}
      </svg>
    );
  }
}

Viewer.propTypes = {
  //width of the viewer displayed on screen
  width: React.PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: React.PropTypes.number.isRequired,

  //background of the viewer
  viewerBackground: React.PropTypes.string,

  //background of the svg
  SVGBackground: React.PropTypes.string,

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
  tool: React.PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_ZOOM_FIT]),

  //accept only one node SVG
  children: function (props, propName, componentName) {
    // Only accept a single child, of the appropriate type
    //credits: http://www.mattzabriskie.com/blog/react-validating-children
    var prop = props[propName];
    var types = ['svg'];
    if (React.Children.count(prop) !== 1 ||
      types.indexOf(prop.type) === -1) {
      return new Error(
        '`' + componentName + '` ' +
        'should have a single child of the following types: ' +
        ' `' + types.join('`, `') + '`.'
      );
    }
  }
};

Viewer.defaultProps = {
  style: {},
  viewerBackground: "#616264",
  SVGBackground: "#fff",
  tool: TOOL_NONE
};
