import React from 'react';
import ViewerHelper from './viewer-helper';
import ViewerEvent from './viewer-event';
import cursor from './cursor';
import {calculateBox} from './utils';
import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM,
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOMING,
} from './constants';

export default class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleSpecialKeyChange = this.handleSpecialKeyChange.bind(this);
  }

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
    let {value, tool, onChange, width, height, children} = this.props;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_PAN) return;
    if (value.mode !== MODE_PANNING) return;

    //the mouse exited and reentered into svg
    let forceExit = (value.mode === MODE_PANNING && event.buttons === 0);

    let nextValue = forceExit ?
      ViewerHelper.stopPan(value) :
      ViewerHelper.updatePan(value, x, y, 20, SVGWidth, SVGHeight, width, height);

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

  handleStartZoom(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange, children} = this.props;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_ZOOM) return;
    if (value.mode !== MODE_IDLE) return;

    let point = ViewerHelper.getSVGPoint(value, x, y);
    if(!ViewerHelper.isPointInsideSVG(point.x, point.y, SVGWidth, SVGHeight)) return;

    let nextValue = ViewerHelper.startZoomSelection(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleUpdateZoom(event) {
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange, width, height} = this.props;

    if (tool !== TOOL_ZOOM) return;
    if (value.mode !== MODE_ZOOMING) return;

    //the mouse exited and reentered into svg
    let forceExit = (event.buttons === 0);

    let nextValue = forceExit ?
      ViewerHelper.stopZoomSelection(value, width, height)
      : ViewerHelper.updateZoomSelection(value, x, y);

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleStopZoom(event) {
    let abs = Math.abs;
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
    let {value, tool, onChange, width, height} = this.props;
    let {startX, endX, startY, endY, specialKeyEnabled} = value;

    if (tool !== TOOL_ZOOM) return;
    if (value.mode !== MODE_ZOOMING) return;

    let selectionMode = abs(startX - endX) > 2 && abs(startY - endY) > 2;

    let nextValue;

    if (selectionMode) {
      nextValue = ViewerHelper.stopZoomSelection(value, width, height);
    } else {
      let scaleFactor = specialKeyEnabled ? 0.9 : 1.1;
      nextValue = ViewerHelper.zoom(value, scaleFactor, x, y);
    }

    event.preventDefault();
    onChange(new ViewerEvent(event, nextValue));
  }

  handleClick(event) {
    let {value, tool, onClick, children} = this.props;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_NONE) return;
    if (!onClick) return;

    let viewerEvent = new ViewerEvent(event, value);
    if(!ViewerHelper.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

    onClick(viewerEvent);
  }

  handleMouseUp(event) {
    let {value, tool, onMouseUp, children} = this.props;
    let x = event.offsetX, y = event.offsetY;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_NONE) return;
    if (!onMouseUp) return;

    let viewerEvent = new ViewerEvent(event, value);
    if(!ViewerHelper.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

    onMouseUp(viewerEvent);
  }

  handleMouseDown(event) {
    let {value, tool, onMouseDown, children} = this.props;
    let x = event.offsetX, y = event.offsetY;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_NONE) return;
    if (!onMouseDown) return;

    let viewerEvent = new ViewerEvent(event, value);
    if(!ViewerHelper.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

    onMouseDown(viewerEvent);
  }

  handleMouseMove(event) {
    let {value, tool, onMouseMove, children} = this.props;
    let x = event.offsetX, y = event.offsetY;
    let SVGWidth = children.props.width, SVGHeight = children.props.height;

    if (tool !== TOOL_NONE) return;
    if (!onMouseMove) return;

    let viewerEvent = new ViewerEvent(event, value);
    if(!ViewerHelper.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

    onMouseMove(viewerEvent);
  }

  handleSpecialKeyChange(event) {
    let {value, onChange} = this.props;
    let key = event.which;
    let active = event.type === "keydown";

    if ([18].indexOf(key) === -1) return;

    let nextValue = active ? ViewerHelper.enableSpecialKey(value) : ViewerHelper.disableSpecialKey(value);

    onChange(new ViewerEvent(event, nextValue));
  }

  componentWillMount(event) {
    window.addEventListener("keydown", this.handleSpecialKeyChange, false);
    window.addEventListener("keyup", this.handleSpecialKeyChange, false);
  }

  componentWillUnmount(event) {
    window.removeEventListener("keydown", this.handleSpecialKeyChange, false);
    window.removeEventListener("keyup", this.handleSpecialKeyChange, false);
  }

  render() {
    let originalSVG = this.props.children;
    let tool = this.props.tool;
    let {matrix, mode, specialKeyEnabled} = this.props.value;
    let matrixStr = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;

    let style = {};
    let gStyle = {pointerEvents: "none"};
    if (tool === TOOL_PAN) style.cursor = cursor(mode === MODE_PANNING ? 'grabbing' : 'grab');
    if (tool === TOOL_ZOOM) style.cursor = cursor(specialKeyEnabled ? 'zoom-out' : 'zoom-in');

    let zoomSelectionRect;
    if (mode === MODE_ZOOMING) {
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
        onMouseDown={ event => {this.handleMouseDown(event); this.handleStartPan(event);  this.handleStartZoom(event)} }
        onMouseMove={ event => {this.handleMouseMove(event); this.handleUpdatePan(event); this.handleUpdateZoom(event)} }
        onMouseUp={ event =>   {this.handleMouseUp(event);   this.handleStopPan(event);   this.handleStopZoom(event)} }
        onClick={event => this.handleClick(event)}
      >

        <rect
          fill={this.props.background}
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height}
          style={{pointerEvents: "none"}}
        />

        <g ref="originalSvg" transform={matrixStr} style={gStyle}>
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
  background: React.PropTypes.string,

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

  //handler mouseup
  onMouseUp: React.PropTypes.func,

  //handler mousemove
  onMouseMove: React.PropTypes.func,

  //handler mousedown
  onMouseDown: React.PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM)
  tool: React.PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM]),

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
    if (!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) {
      return new Error('SVG should have props `width` and `height`');
    }

  }
};

Viewer.defaultProps = {
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  tool: TOOL_NONE
};
