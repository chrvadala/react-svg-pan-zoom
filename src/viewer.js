import React, {PropTypes} from 'react';
import ViewerEvent from './viewer-event';
import cursor from './ui/cursor';
import BorderGradient from './ui/border-gradient';
import {autoPanIfNeeded} from './features/pan';
import {getDefaultValue, isValueValid, setViewerSize, sameValues} from './features/common';
import If from './ui/if';
import Selection from './ui/selection';
import {onMouseDown, onMouseMove, onMouseUp, onWheel, onMouseEnterOrLeave} from './features/interactions';

import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING,
  POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

export default class Viewer extends React.Component {

  constructor(props, context) {
    super(props, context);

    let {onChange, onReady, width: viewerWidth, height: viewerHeight, children} = this.props;
    let {width: SVGWidth, height: SVGHeight} = children.props;
    //TODO check props.value ??
    let nextValue = getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight);
    this.state = {value: nextValue};
    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let {props, state: {value}} = this;
    let {onChange} = nextProps;

    let nextValue = value;


    if (nextProps.value && isValueValid(nextProps.value) && !sameValues(value, nextProps.value)) {
      nextValue = nextProps.value;
    }

    if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
      nextValue = setViewerSize(nextValue, nextProps.width, nextProps.height);
    }

    if (nextValue === value) return;
    this.setState({value: nextValue});
    onChange(nextValue);
  }


  setValue(value) {
    let {state, props: {onChange}} = this;
    if (!sameValues(state.value, value)) {
      this.setState({value});
      onChange(value);
    }
  }

  getValue() {
    return this.state.value;
  }

  handleEvent(event) {
    let {props: {value, tool, onClick, onMouseMove, onMouseUp, onMouseDown}} = this;
    let eventsHandler = {
      click: onClick,
      mousemove: onMouseMove,
      mouseup: onMouseUp,
      mousedown: onMouseDown
    };

    if (tool !== TOOL_NONE) return;
    let onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(new ViewerEvent(event, value, this.refs.Viewer));
  }


  componentDidMount() {
    let {props, state} = this;
    if (props.onChange) props.onChange(state.value);

    this.autoPanTimer = setInterval(()=> {
      let {props, state} = this;
      if (!(props.tool === TOOL_NONE && props.detectAutoPan && state.value.focus)) return;

      let nextValue = autoPanIfNeeded(state.value, state.viewerX, state.viewerY);

      if (nextValue === state.value) return;
      this.setState({value: nextValue});
      props.onChange(nextValue);
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.autoPanTimer);
  }

  handleMouseDown(event) {
    let viewerCoords = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    let value = onMouseDown(event, viewerCoords, this.props, this.state.value);
    this.setState({value});
  }

  handlerMouseMove(event) {
    let viewerCoords = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    let value = onMouseMove(event, viewerCoords, this.props, this.state.value);
    this.setState({value, viewerX: viewerCoords.x, viewerY: viewerCoords.y});
  }

  handlerMouseUp(event) {
    let viewerCoords = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    let value = onMouseUp(event, viewerCoords, this.props, this.state.value);
    this.setState({value});
  }

  handlerWheel(event) {
    let viewerCoords = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    let value = onWheel(event, viewerCoords, this.props, this.state.value);
    this.setState({value});
  }

  handlerMouseEnterOrLeave(event) {
    let viewerCoords = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    let value = onMouseEnterOrLeave(event, viewerCoords, this.props, this.state.value);
    this.setState({value});
  }

  render() {
    let {props, state: {value, viewerX, viewerY}} = this;
    let style = props.style;

    if (props.tool === TOOL_PAN)
      style = {
        cursor: cursor(value.mode === MODE_PANNING ? 'grabbing' : 'grab'),
        ...style
      };


    if (props.tool === TOOL_ZOOM_IN)
      style = {
        cursor: 'zoom-in',
        ...style
      };


    if (props.tool === TOOL_ZOOM_OUT)
      style = {
        cursor: 'zoom-out',
        ...style
      };


    return (
      <svg
        ref="Viewer"
        width={value.viewerWidth}
        height={value.viewerHeight}
        style={style}
        onMouseDown={ event => this.handleMouseDown(event)}
        onMouseMove={ event => this.handlerMouseMove(event)}
        onMouseUp={ event => this.handlerMouseUp(event)}
        onWheel={ event => this.handlerWheel(event)}
        onMouseEnter={ event => this.handlerMouseEnterOrLeave(event)}
        onMouseLeave={ event => this.handlerMouseEnterOrLeave(event)}>


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
          style={props.tool === TOOL_NONE ? {} : {pointerEvents: "none"}}
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
            <If condition={viewerY <= 20}>
              <BorderGradient direction={POSITION_TOP} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={value.viewerWidth - viewerX <= 20}>
              <BorderGradient direction={POSITION_RIGHT} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={ value.viewerHeight - viewerY <= 20}>
              <BorderGradient direction={POSITION_BOTTOM} width={value.viewerWidth} height={value.viewerHeight}/>
            </If>

            <If condition={value.focus && viewerX <= 20}>
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
