import React, {PropTypes} from 'react';
import ViewerEvent from './viewer-event';
import cursor from './ui/cursor';
import BorderGradient from './ui/border-gradient';
import {autoPanIfNeeded} from './features/pan';
import {getDefaultValue, isValueValid} from './features/common';
import If from './ui/if';
import Selection from './ui/selection';
import {onMouseDown, onMouseMove, onMouseUp, onWheel, onMouseEnterOrLeave} from './features/interactions';

import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING,
  POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

export default class Viewer extends React.Component {

  handleEvent(event) {
    let {props} = this;
    let {value, tool} = props;
    let eventsHandler = {
      click: props.onClick,
      mousemove: props.onMouseMove,
      mouseup: props.onMouseUp,
      mousedown: props.onMouseDown
    };

    if (tool !== TOOL_NONE) return;
    let onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(new ViewerEvent(event, value, this.refs.Viewer));
  }

  componentWillMount(event) {
    let {onChange, onReady, width: viewerWidth, height: viewerHeight, children} = this.props;
    let {width: SVGWidth, height: SVGHeight} = children.props;
    let {Viewer} = this.refs;

    let nextValue = getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight);
    onChange(new ViewerEvent(null, nextValue, Viewer));
    setTimeout(() => {
      if (onReady) onReady();
    }, 0);
  }

  componentDidMount() {
    this.autoPanTimer = setInterval(()=> {

      let {tool, detectAutoPan, value, onChange} = this.props;
      if (!(tool === TOOL_NONE && detectAutoPan && value.focus)) return;

      let nextValue = autoPanIfNeeded(value);
      if (value !== nextValue)
        onChange(new ViewerEvent(null, nextValue, this.refs.Viewer));
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.autoPanTimer);
  }

  render() {
    let {props, refs} = this;
    let {value, style, tool} = props;
    if (!isValueValid(value)) return null;

    if (tool === TOOL_PAN) {
      style = {
        cursor: cursor(value.mode === MODE_PANNING ? 'grabbing' : 'grab'),
        ...style
      };
    }

    if (tool === TOOL_ZOOM_IN || tool === TOOL_ZOOM_OUT) {
      style = {
        cursor: tool === TOOL_ZOOM_IN ? 'zoom-in' : 'zoom-out',
        ...style
      };
    }

    return (
      <svg
        ref="Viewer"
        width={value.viewerWidth}
        height={value.viewerHeight}
        style={style}
        onMouseDown={ event => onMouseDown(event, this.props, this.refs.Viewer)}
        onMouseMove={ event => onMouseMove(event, this.props, this.refs.Viewer)}
        onMouseUp={ event => onMouseUp(event, this.props, this.refs.Viewer)}
        onWheel={ event => onWheel(event, this.props, this.refs.Viewer)}
        onMouseEnter={event => onMouseEnterOrLeave(event, this.props, this.refs.Viewer)}
        onMouseLeave={event => onMouseEnterOrLeave(event, this.props, this.refs.Viewer)}>

        <rect
          fill={props.background}
          x={0}
          y={0}
          width={value.viewerWidth}
          height={value.viewerHeight}
          style={{pointerEvents: "none"}}
        />

        <g
          transform={`matrix(${value.a}, ${value.b}, ${value.c}, ${value.d}, ${value.e}, ${value.f})`}
          style={tool === TOOL_NONE ? {} : {pointerEvents: "none"}}
          onMouseDown={ event => this.handleEvent(event)}
          onMouseMove={event => this.handleEvent(event)}
          onMouseUp={event => this.handleEvent(event)}
          onClick={event => this.handleEvent(event)}
        >
          <rect
            fill={this.props.SVGBackground}
            x={0}
            y={0}
            width={value.SVGWidth}
            height={value.SVGHeight}/>
          <g>
            {props.children.props.children}
          </g>
        </g>

        <If condition={props.tool === TOOL_NONE && props.detectAutoPan && value.focus}>
          <g style={{pointerEvents: "none"}}>
            <If condition={value.viewerY <= 20}>
              <BorderGradient direction={POSITION_TOP} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={value.viewerWidth - value.viewerX <= 20}>
              <BorderGradient direction={POSITION_RIGHT} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={ value.viewerHeight - value.viewerY <= 20}>
              <BorderGradient direction={POSITION_BOTTOM} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={value.focus && value.viewerX <= 20}>
              <BorderGradient direction={POSITION_LEFT} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>
          </g>
        </If>

        <If condition={value.mode === MODE_ZOOMING}>
          <Selection startX={value.startX} startY={value.startY} endX={value.endX} endY={value.endY}/>
        </If>
      </svg>
    );
  }
}

Viewer.propTypes = {
  //width of the viewer displayed on screen
  width: PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: PropTypes.number.isRequired,

  //background of the viewer
  background: PropTypes.string,

  //background of the svg
  SVGBackground: PropTypes.string,

  //value of the viewer (current point of view)
  value: PropTypes.object,

  //CSS style of the SVG tag
  style: PropTypes.object,

  //array of keys that in zoom mode switch zoom in and zoom out
  specialKeys: PropTypes.arrayOf(PropTypes.number),

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: PropTypes.bool,

  //handler something changed
  onChange: PropTypes.func.isRequired,

  //handler viewer is ready
  onReady: PropTypes.func,

  //handler click
  onClick: PropTypes.func,

  //handler mouseup
  onMouseUp: PropTypes.func,

  //handler mousemove
  onMouseMove: PropTypes.func,

  //handler mousedown
  onMouseDown: PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]),

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
  value: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  tool: TOOL_NONE,
  detectWheel: true,
  detectAutoPan: true,
  onReady: null
};
