import React from 'react';
import PropTypes from 'prop-types';
import {toSVG} from 'transformation-matrix';

//events
import eventFactory from './events/event-factory';

//features
import {pan} from './features/pan';
import {getDefaultValue, setViewerSize, setSVGSize, setPointOnViewerCenter, reset} from './features/common';
import {
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel,
  onMouseEnterOrLeave,
  onInterval,
  onDoubleClick
} from './features/interactions';
import {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel
}from './features/interactions-touch';

import {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';
import {openMiniature, closeMiniature} from './features/miniature';

//ui
import cursorPolyfill from './ui/cursor-polyfill';
import BorderGradient from './ui/border-gradient';
import If from './ui/if';
import Selection from './ui/selection';
import Toolbar from './ui-toolbar/toolbar';
import detectTouch from './ui/detect-touch';
import Miniature from './ui-miniature/miniature'

import {
  TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

export default class ReactSVGPanZoom extends React.Component {

  constructor(props, context) {
    super(props, context);

    let {tool, value, width: viewerWidth, height: viewerHeight, children} = this.props;
    let {width: SVGWidth, height: SVGHeight} = children.props;

    this.state = {
      value: value ? value : getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight),
      tool: tool ? tool : TOOL_NONE
    };
    this.ViewerDOM = null;
  }

  componentWillReceiveProps(nextProps) {
    let value = this.getValue();

    if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
      let nextValue = setViewerSize(value, nextProps.width, nextProps.height);
      this.setValue(nextValue);
    }

    let {width: SVGWidth, height: SVGHeight} = nextProps.children.props;
    if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
      let nextValue = setSVGSize(value, SVGWidth, SVGHeight);
      this.setValue(nextValue);
    }
  }


  getValue() {
    return this.props.value ? this.props.value : this.state.value;
  }

  getTool() {
    return this.props.tool ? this.props.tool : this.state.tool;
  }

  setValue(nextValue) {
    this.setState({value: nextValue});
    if (this.props.onChangeValue) this.props.onChangeValue(nextValue);
  }

  pan(SVGDeltaX, SVGDeltaY) {
    let nextValue = pan(this.getValue(), SVGDeltaX, SVGDeltaY);
    this.setValue(nextValue);
  }

  zoom(SVGPointX, SVGPointY, scaleFactor) {
    let nextValue = zoom(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
    this.setValue(nextValue);
  }

  fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    let nextValue = fitSelection(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
    this.setValue(nextValue);
  }

  fitToViewer() {
    let nextValue = fitToViewer(this.getValue());
    this.setValue(nextValue);
  }

  zoomOnViewerCenter(scaleFactor) {
    let nextValue = zoomOnViewerCenter(this.getValue(), scaleFactor);
    this.setValue(nextValue);
  }

  setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
    let nextValue = setPointOnViewerCenter(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
    this.setValue(nextValue);
  }

  reset() {
    let nextValue = reset(this.getValue());
    this.setValue(nextValue);
  }

  changeTool(tool) {
    this.setState({tool});
    if (this.props.onChangeTool) this.props.onChangeTool(tool);
  }

  openMiniature(){
    let nextValue = openMiniature(this.getValue());
    this.setValue(nextValue);
  }

  closeMiniature(){
    let nextValue = closeMiniature(this.getValue());
    this.setValue(nextValue);
  }

  handleViewerEvent(event) {
    let {props, state: {value}, ViewerDOM} = this;

    if ( !([TOOL_NONE, TOOL_AUTO].indexOf(this.getTool())>=0) ) return;
    if (event.target === ViewerDOM) return;

    let eventsHandler = {
      click: props.onClick,
      dblclick: props.onDoubleClick,

      mousemove: props.onMouseMove,
      mouseup: props.onMouseUp,
      mousedown: props.onMouseDown,

      touchstart: props.onTouchStart,
      touchmove: props.onTouchMove,
      touchend: props.onTouchEnd,
      touchcancel: props.onTouchCancel,
    };

    let onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(eventFactory(event, value, ViewerDOM));
  }


  componentDidMount() {
    let {props, state} = this;
    if (props.onChangeValue) props.onChangeValue(state.value);

    this.autoPanTimer = setInterval(() => {
      let coords = {x: this.state.viewerX, y: this.state.viewerY};
      let nextValue = onInterval(null, this.ViewerDOM, this.getTool(), this.getValue(), this.props, coords);

      if (this.getValue() !== nextValue) {
        this.setValue(nextValue);
      }
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.autoPanTimer);
  }

  render() {
    let {props, state: {viewerX, viewerY}} = this;
    let tool = this.getTool();
    let value = this.getValue();
    let {customToolbar: CustomToolbar, customMiniature: CustomMiniature} = props;

    let panningWithToolAuto = tool === TOOL_AUTO
      && value.mode === MODE_PANNING
      && value.startX !== value.endX
      && value.startY !== value.endY;

    let cursor;

    if (tool === TOOL_PAN)
      cursor = cursorPolyfill(value.mode === MODE_PANNING ? 'grabbing' : 'grab');

    if (tool === TOOL_ZOOM_IN)
      cursor = cursorPolyfill('zoom-in');

    if (tool === TOOL_ZOOM_OUT)
      cursor = cursorPolyfill('zoom-out');

    if (panningWithToolAuto)
      cursor = cursorPolyfill('grabbing');

    let blockChildEvents = [TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT].indexOf(tool) >= 0;
    blockChildEvents = blockChildEvents || panningWithToolAuto;

    return (
      <div
        style={{position: "relative", width: value.viewerWidth, height: value.viewerHeight, ...props.style}}
        className={this.props.className}>
        <svg
          ref={ViewerDOM => this.ViewerDOM = ViewerDOM}
          width={value.viewerWidth}
          height={value.viewerHeight}
          style={cursor ? {cursor, display: "block"} : {display: 'block'}}

          onMouseDown={ event => {
            let nextValue = onMouseDown(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onMouseMove={ event => {
            let {left, top} = this.ViewerDOM.getBoundingClientRect();
            let x = event.clientX - Math.round(left);
            let y = event.clientY - Math.round(top);

            let nextValue = onMouseMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props, {x, y});
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.setState({viewerX: x, viewerY: y});
            this.handleViewerEvent(event);
          }}
          onMouseUp={ event => {
            let nextValue = onMouseUp(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}

          onClick={event => {
            this.handleViewerEvent(event)
          }}
          onDoubleClick={ event => {
            let nextValue = onDoubleClick(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}

          onWheel={ event => {
            let nextValue = onWheel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}

          onMouseEnter={ event => {
            if (detectTouch()) return;
            let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}
          onMouseLeave={ event => {
            let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}

          onTouchStart={ event => {
            let nextValue = onTouchStart(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchMove={ event => {
            let nextValue = onTouchMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchEnd={ event => {
            let nextValue = onTouchEnd(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchCancel={ event => {
            let nextValue = onTouchCancel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}>

          <rect
            fill={props.background}
            x={0}
            y={0}
            width={value.viewerWidth}
            height={value.viewerHeight}
            style={{pointerEvents: "none"}}
          />

          <g
            transform={toSVG(value)}
            style={blockChildEvents ? {pointerEvents: "none"} : {}}>
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

          <If condition={tool === TOOL_NONE && props.detectAutoPan && value.focus}>
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

        {props.toolbarPosition === POSITION_NONE ? null :
          <CustomToolbar
            position={props.toolbarPosition}
            value={value}
            onChangeValue={value => this.setValue(value)}
            tool={tool}
            onChangeTool={tool => this.changeTool(tool)}/> }

        {props.miniaturePosition === POSITION_NONE ? null :
          <CustomMiniature
            position={props.miniaturePosition}
            value={value}
            onChangeValue={value => this.setValue(value)}
            background={this.props.SVGBackground}
            width={this.props.miniatureWidth}
          >
            {props.children.props.children}
          </CustomMiniature>
        }
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
    startX: PropTypes.number,
    startY: PropTypes.number,
    endX: PropTypes.number,
    endY: PropTypes.number,
    miniatureOpen: PropTypes.bool.isRequired,
  }),

  //CSS style of the Viewer
  style: PropTypes.object,

  //className of the Viewer
  className: PropTypes.string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: PropTypes.bool,

  //toolbar position
  toolbarPosition: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),

  //handler something changed
  onChangeValue: PropTypes.func,

  //handler tool changed
  onChangeTool: PropTypes.func,

  //handler click
  onClick: PropTypes.func,

  //handler double click
  onDoubleClick: PropTypes.func,

  //handler mouseup
  onMouseUp: PropTypes.func,

  //handler mousemove
  onMouseMove: PropTypes.func,

  //handler mousedown
  onMouseDown: PropTypes.func,

  //if disabled the user can move the image outside the viewer
  preventPanOutside: PropTypes.bool,

  //how much scale in or out
  scaleFactor: PropTypes.number,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: PropTypes.oneOf([TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]),

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: PropTypes.array,

  //override toolbar component
  customToolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  //miniature position
  miniaturePosition: PropTypes.oneOf([POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]),

  //miniature width
  miniatureWidth: PropTypes.number,

  //override miniature component
  customMiniature: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  //accept only one node SVG
  children: function (props, propName, componentName) {
    // Only accept a single child, of the appropriate type
    //credits: http://www.mattzabriskie.com/blog/react-validating-children
    let prop = props[propName];
    let types = ['svg'];
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
  toolbarPosition: POSITION_RIGHT,
  modifierKeys: ["Alt", "Shift", "Control"],
  customToolbar: Toolbar,
  preventPanOutside: true,
  scaleFactor: 1.1,
  miniaturePosition: POSITION_LEFT,
  miniatureWidth: 100,
  customMiniature: Miniature,
};
