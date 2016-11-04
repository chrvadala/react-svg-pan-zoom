import React, {PropTypes} from 'react';

//common
import ViewerEvent from './viewer-event';

//features
import {pan} from './features/pan';
import {getDefaultValue, setViewerSize, sameValues, changeTool} from './features/common';
import {onMouseDown, onMouseMove, onMouseUp, onWheel, onMouseEnterOrLeave, onInterval} from './features/interactions';
import {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';

//ui
import cursor from './ui/cursor';
import BorderGradient from './ui/border-gradient';
import If from './ui/if';
import Selection from './ui/selection';
import ToolbarWrapper from './ui-toolbar/toolbar-wrapper';

import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

export default class ReactSVGPanZoom extends React.Component {

  constructor(props, context) {
    super(props, context);

    let {tool, value, onChange, onReady, width: viewerWidth, height: viewerHeight, children} = this.props;
    let {width: SVGWidth, height: SVGHeight} = children.props;

    tool = tool !== null ? tool : TOOL_NONE;
    value = value !== null ? value : getDefaultValue(tool, viewerWidth, viewerHeight, SVGWidth, SVGHeight);

    this.state = {value};
    this.SVGViewer = null;
  }

  componentWillReceiveProps(nextProps) {
    let {props, state} = this;
    let {onChange} = nextProps;

    let nextValue = state.value;

    if (nextProps.value !== null && typeof nextProps.value === 'object' && !sameValues(nextProps.value, state.value)) {
      nextValue = nextProps.value;
    }

    if (state.value.viewerWidth !== nextProps.width || state.value.viewerHeight !== nextProps.height) {
      nextValue = setViewerSize(nextValue, nextProps.width, nextProps.height);
    }

    if (nextProps.tool !== null && nextProps.tool !== state.value.tool) {
      nextValue = changeTool(nextValue, nextProps.tool);
    }

    if (nextValue !== state.value) {
      this.setState({value: nextValue});
      if (onChange) onChange(nextValue);
    }
  }


  getValue() {
    return this.state.value;
  }

  getTool() {
    return this.state.value.tool;
  }

  setValue(nextValue) {
    if (!sameValues(this.state.value, nextValue)) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }

  pan(SVGDeltaX, SVGDeltaY) {
    let nextValue = pan(this.state.value, SVGDeltaX, SVGDeltaY);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  zoom(SVGPointX, SVGPointY, scaleFactor) {
    let nextValue = zoom(this.state.value, SVGPointX, SVGPointY, scaleFactor);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    let nextValue = fitSelection(this.state.value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  fitToViewer() {
    let nextValue = fitToViewer(this.state.value);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  zoomOnViewerCenter(scaleFactor) {
    let nextValue = zoomOnViewerCenter(this.state.value, scaleFactor);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  changeTool(tool) {
    let nextValue = changeTool(this.state.value, tool);
    this.setState({value: nextValue});
    if (this.props.onChange) this.props.onChange(nextValue);
  }

  handleEvent(event) {
    let {props: {onClick, onMouseMove, onMouseUp, onMouseDown}, state: {value}} = this;

    let eventsHandler = {
      click: onClick,
      mousemove: onMouseMove,
      mouseup: onMouseUp,
      mousedown: onMouseDown
    };

    if (value.tool !== TOOL_NONE) return;
    let onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(new ViewerEvent(event, value, this.SVGViewer));
  }


  componentDidMount() {
    let {props, state} = this;
    if (props.onChange) props.onChange(state.value);

    this.autoPanTimer = setInterval(()=> {
      let coords = {x: this.state.viewerX, y: this.state.viewerY};
      let nextValue = onInterval(null, this.SVGViewer, this.getTool(), this.getValue(), this.props, coords);

      if (this.state.value !== nextValue) {
        this.setState({value: nextValue});
        if (this.props.onChange) this.props.onChange(nextValue);
      }
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.autoPanTimer);
  }

  handleMouseDown(event) {
    let nextValue = onMouseDown(event, this.SVGViewer, this.getTool(), this.getValue(), this.props);

    if (this.state.value !== nextValue) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }

  handlerMouseMove(event) {
    let {left, top} = this.SVGViewer.getBoundingClientRect();
    let x = event.clientX - Math.round(left);
    let y = event.clientY - Math.round(top);

    let nextValue = onMouseMove(event, this.SVGViewer, this.getTool(), this.getValue(), this.props, {x, y});

    if (this.state.value !== nextValue) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
    this.setState({viewerX: x, viewerY: y});
  }

  handlerMouseUp(event) {
    let {left, top} = this.SVGViewer.getBoundingClientRect();
    let x = event.clientX - Math.round(left);
    let y = event.clientY - Math.round(top);

    let nextValue = onMouseUp(event, this.SVGViewer, this.getTool(), this.getValue(), this.props);

    if (this.state.value !== nextValue) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }

  handlerWheel(event) {
    let nextValue = onWheel(event, this.SVGViewer, this.getTool(), this.getValue(), this.props);

    if (this.state.value !== nextValue) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }

  handlerMouseEnterOrLeave(event) {
    let nextValue = onMouseEnterOrLeave(event, this.SVGViewer, this.getTool(), this.getValue(), this.props);

    if (this.state.value !== nextValue) {
      this.setState({value: nextValue});
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }

  render() {
    let {props, state: {value, viewerX, viewerY}} = this;
    let style = props.style;

    if (value.tool === TOOL_PAN)
      style = {
        cursor: cursor(value.mode === MODE_PANNING ? 'grabbing' : 'grab'),
        ...style
      };


    if (value.tool === TOOL_ZOOM_IN)
      style = {
        cursor: 'zoom-in',
        ...style
      };


    if (value.tool === TOOL_ZOOM_OUT)
      style = {
        cursor: 'zoom-out',
        ...style
      };


    return (
      <div style={{position: "relative", width: value.viewerWidth, height: value.viewerHeight}}>
        <svg
          ref={SVGViewer => this.SVGViewer = SVGViewer}
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
            style={value.tool === TOOL_NONE ? {} : {pointerEvents: "none"}}
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

          <If condition={value.tool === TOOL_NONE && props.detectAutoPan && value.focus}>
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

        <If condition={props.toolbarPosition !== POSITION_NONE}>
          <ToolbarWrapper position={props.toolbarPosition} value={value} onChange={value => this.setValue(value)}/>
        </If>
      </div>
    );
  }
}

ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: PropTypes.number.isRequired,

  //background of the viewer
  background: PropTypes.string,

  //background of the svg
  SVGBackground: PropTypes.string,

  //value of the viewer (current point of view)
  value: PropTypes.shape({
    version: PropTypes.oneOf([2]).isRequired,
    tool: PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,
    mode: PropTypes.oneOf([MODE_IDLE, MODE_PANNING, MODE_ZOOMING]).isRequired,
    focus: PropTypes.bool.isRequired,
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    e: PropTypes.number.isRequired,
    f: PropTypes.number.isRequired,
    viewerWidth: PropTypes.number.isRequired,
    viewerHeight: PropTypes.number.isRequired,
    SVGWidth: PropTypes.number.isRequired,
    SVGHeight: PropTypes.number.isRequired,
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
  }),

  //CSS style of the SVG tag
  style: PropTypes.object,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: PropTypes.bool,

  //toolbar position
  toolbarPosition: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),

  //handler something changed
  onChange: PropTypes.func,

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

ReactSVGPanZoom.defaultProps = {
  value: null,
  tool: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  detectWheel: true,
  detectAutoPan: true,
  toolbarPosition: POSITION_RIGHT
};
