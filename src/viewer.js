import React from 'react';
import PropTypes from 'prop-types';
import {toSVG} from 'transformation-matrix';
//events
import eventFactory from './events/event-factory';
//features
import {pan} from './features/pan';
import {
  getDefaultValue,
  isValueValid,
  reset,
  setPointOnViewerCenter,
  setSVGSize,
  setViewerSize,
  setZoomLevels
} from './features/common';
import {
  onDoubleClick,
  onInterval,
  onMouseDown,
  onMouseEnterOrLeave,
  onMouseMove,
  onMouseUp,
  onWheel
} from './features/interactions';
import {onTouchCancel, onTouchEnd, onTouchMove, onTouchStart} from './features/interactions-touch';

import {fitSelection, fitToViewer, zoom, zoomOnViewerCenter} from './features/zoom';
import {closeMiniature, openMiniature} from './features/miniature';
//ui
import cursorPolyfill from './ui/cursor-polyfill';
import BorderGradient from './ui/border-gradient';
import Selection from './ui/selection';
import Toolbar from './ui-toolbar/toolbar';
import detectTouch from './ui/detect-touch';
import Miniature from './ui-miniature/miniature'

import {
  ACTION_PAN,
  ACTION_ZOOM,
  ALIGN_BOTTOM,
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  ALIGN_TOP,
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOMING,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_NONE,
  POSITION_RIGHT,
  POSITION_TOP,
  TOOL_AUTO,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT
} from './constants';
import {isNullOrUndefined} from "./utils/is";
import {tipControlledComponent} from "./migration-tips";

export default class ReactSVGPanZoom extends React.Component {

  constructor(props, context) {
    const {value, width: viewerWidth, height: viewerHeight, scaleFactorMin, scaleFactorMax, children} = props;
    const {width: SVGWidth, height: SVGHeight} = children.props;

    super(props, context);
    this.ViewerDOM = null;
    this.state = {
      pointerX: null,
      pointerY: null,
      defaultValue: getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax)
    }
    this.autoPanLoop = this.autoPanLoop.bind(this);

    if(isNullOrUndefined(props.tool) || isNullOrUndefined(props.value)){
      tipControlledComponent()
    }
  }

  getValue() {
    if (isValueValid(this.props.value)) return this.props.value
    return this.state.defaultValue
  }

  getTool() {
    if (this.props.tool) return this.props.tool
    return TOOL_NONE
  }

  setValue(nextValue) {
    let {onChangeValue, onZoom, onPan} = this.props;

    if (onChangeValue) onChangeValue(nextValue);
    if (nextValue.lastAction) {
      if (onZoom && nextValue.lastAction === ACTION_ZOOM) onZoom(nextValue);
      if (onPan && nextValue.lastAction === ACTION_PAN) onPan(nextValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    let value = this.getValue();
    let needUpdate = false;
    let nextValue = value;

    if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
      nextValue = setViewerSize(nextValue, nextProps.width, nextProps.height);
      needUpdate = true;
    }

    let {width: SVGWidth, height: SVGHeight} = nextProps.children.props;
    if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
      nextValue = setSVGSize(nextValue, SVGWidth, SVGHeight);
      needUpdate = true;
    }

    if (value.scaleFactorMin !== nextProps.scaleFactorMin || value.scaleFactorMax !== nextProps.scaleFactorMax) {
      nextValue = setZoomLevels(nextValue, nextProps.scaleFactorMin, nextProps.scaleFactorMax);
      needUpdate = true;
    }

    if (needUpdate) {
      this.setValue(nextValue);
    }
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

  fitToViewer(SVGAlignX = ALIGN_LEFT, SVGAlignY = ALIGN_TOP) {
    let nextValue = fitToViewer(this.getValue(), SVGAlignX, SVGAlignY);
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

  openMiniature() {
    let nextValue = openMiniature(this.getValue());
    this.setValue(nextValue);
  }

  closeMiniature() {
    let nextValue = closeMiniature(this.getValue());
    this.setValue(nextValue);
  }

  handleViewerEvent(event) {
    let {props, ViewerDOM} = this;

    if (!([TOOL_NONE, TOOL_AUTO].indexOf(this.getTool()) >= 0)) return;
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

    onEventHandler(eventFactory(event, props.value, ViewerDOM));
  }

  autoPanLoop() {
    let coords = {x: this.state.pointerX, y: this.state.pointerY};
    let nextValue = onInterval(null, this.ViewerDOM, this.getTool(), this.getValue(), this.props, coords);
    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }

    if (this.autoPanIsRunning) {
      requestAnimationFrame(this.autoPanLoop);
    }
  }

  componentDidMount() {
    if (isValueValid(this.props.value)) return this.props.value
    this.props.onChangeValue(this.state.defaultValue)

    this.autoPanIsRunning = true;
    requestAnimationFrame(this.autoPanLoop);
  }

  componentWillUnmount() {
    this.autoPanIsRunning = false;
  }

  render() {
    let {props, state: {pointerX, pointerY}} = this;
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

    const touchAction = (this.props.detectPinchGesture || [TOOL_PAN, TOOL_AUTO].indexOf(this.getTool()) !== -1) ? 'none' : undefined

    const style = {display: 'block', cursor, touchAction};

    return (
      <div
        style={{position: "relative", width: value.viewerWidth, height: value.viewerHeight, ...props.style}}
        className={this.props.className}>
        <svg
          ref={ViewerDOM => this.ViewerDOM = ViewerDOM}
          width={value.viewerWidth}
          height={value.viewerHeight}
          style={style}

          onMouseDown={event => {
            let nextValue = onMouseDown(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onMouseMove={event => {
            let {left, top} = this.ViewerDOM.getBoundingClientRect();
            let x = event.clientX - Math.round(left);
            let y = event.clientY - Math.round(top);

            let nextValue = onMouseMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props, {x, y});
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.setState({pointerX: x, pointerY: y});
            this.handleViewerEvent(event);
          }}
          onMouseUp={event => {
            let nextValue = onMouseUp(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}

          onClick={event => {
            this.handleViewerEvent(event)
          }}
          onDoubleClick={event => {
            let nextValue = onDoubleClick(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}

          onWheel={event => {
            let nextValue = onWheel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}

          onMouseEnter={event => {
            if (detectTouch()) return;
            let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}
          onMouseLeave={event => {
            let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
          }}

          onTouchStart={event => {
            let nextValue = onTouchStart(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchMove={event => {
            let nextValue = onTouchMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchEnd={event => {
            let nextValue = onTouchEnd(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
            if (this.getValue() !== nextValue) this.setValue(nextValue);
            this.handleViewerEvent(event);
          }}
          onTouchCancel={event => {
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
              style={this.props.SVGStyle}
              x={0}
              y={0}
              width={value.SVGWidth}
              height={value.SVGHeight}/>
            <g>
              {props.children.props.children}
            </g>
          </g>

          {!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0 && props.detectAutoPan && value.focus) ? null : (
            <g style={{pointerEvents: "none"}}>
              {!(pointerY <= 20) ? null :
                <BorderGradient direction={POSITION_TOP} width={value.viewerWidth} height={value.viewerHeight}/>
              }

              {!(value.viewerWidth - pointerX <= 20) ? null :
                <BorderGradient direction={POSITION_RIGHT} width={value.viewerWidth} height={value.viewerHeight}/>
              }

              {!(value.viewerHeight - pointerY <= 20) ? null :
                <BorderGradient direction={POSITION_BOTTOM} width={value.viewerWidth} height={value.viewerHeight}/>
              }

              {!(value.focus && pointerX <= 20) ? null :
                <BorderGradient direction={POSITION_LEFT} width={value.viewerWidth} height={value.viewerHeight}/>
              }
            </g>
          )}

          {!(value.mode === MODE_ZOOMING) ? null :
            <Selection startX={value.startX} startY={value.startY} endX={value.endX} endY={value.endY}/>
          }
        </svg>

        {props.toolbarPosition === POSITION_NONE ? null :
          <CustomToolbar
            position={props.toolbarPosition}
            value={value}
            onChangeValue={value => this.setValue(value)}
            tool={tool}
            onChangeTool={tool => this.props.onChangeTool(tool)}
            {...this.props.toolbarProps}
          />}

        {props.miniaturePosition === POSITION_NONE ? null :
          <CustomMiniature
            position={props.miniaturePosition}
            value={value}
            onChangeValue={value => this.setValue(value)}
            SVGBackground={this.props.SVGBackground}
            background={this.props.miniatureBackground}
            width={this.props.miniatureWidth}
            height={this.props.miniatureHeight}
          >
            {props.children.props.children}
          </CustomMiniature>
        }
      </div>
    );
  }
}

ReactSVGPanZoom.propTypes = {
  /**************************************************************************/
  /*  Viewer configuration                                                  */
  /**************************************************************************/
  //width of the viewer displayed on screen
  width: PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: PropTypes.number.isRequired,

  //value of the viewer (current camera view)
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
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
    })
  ]).isRequired,

  //handler something changed
  onChangeValue: PropTypes.func.isRequired,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: PropTypes.oneOf([TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,

  //handler tool changed
  onChangeTool: PropTypes.func.isRequired,

  /**************************************************************************/
  /* Customize style                                                        */
  /**************************************************************************/

  //background of the viewer
  background: PropTypes.string,

  //background of the svg
  SVGBackground: PropTypes.string,

  //style of the svg
  SVGStyle: PropTypes.object,

  //CSS style of the Viewer
  style: PropTypes.object,

  //className of the Viewer
  className: PropTypes.string,


  /**************************************************************************/
  /* Detect events                                                          */
  /**************************************************************************/

  //perform zoom operation on mouse scroll
  detectWheel: PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: PropTypes.bool,

  //perform zoom operation on pinch gesture
  detectPinchGesture: PropTypes.bool,

  //toolbar position
  toolbarPosition: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),

  //handler zoom level changed
  onZoom: PropTypes.func,

  //handler pan action performed
  onPan: PropTypes.func,

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

  /**************************************************************************/
  /* Some advanced configurations                                           */
  /**************************************************************************/

  //if disabled the user can move the image outside the viewer
  preventPanOutside: PropTypes.bool,

  //how much scale in or out
  scaleFactor: PropTypes.number,

  //how much scale in or out on mouse wheel (requires detectWheel enabled)
  scaleFactorOnWheel: PropTypes.number,

  // maximum amount of scale a user can zoom in to
  scaleFactorMax: PropTypes.number,

  // minimum amount of a scale a user can zoom out of
  scaleFactorMin: PropTypes.number,

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: PropTypes.array,

  //Turn off zoom on double click
  disableDoubleClickZoomWithToolAuto: PropTypes.bool,

  /**************************************************************************/
  /* Miniature configurations                                                 */
  /**************************************************************************/
  //miniature position
  miniaturePosition: PropTypes.oneOf([POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]),

  //miniature height
  miniatureBackground: PropTypes.string,

  //miniature width
  miniatureWidth: PropTypes.number,

  //miniature height
  miniatureHeight: PropTypes.number,

  //override miniature component
  customMiniature: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**************************************************************************/
  /* Toolbar configurations                                                 */
  /**************************************************************************/

  //override toolbar component
  customToolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  //toolbar props
  toolbarProps: PropTypes.shape({
    SVGAlignX: PropTypes.oneOf([ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
    SVGAlignY: PropTypes.oneOf([ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
  }),

  /**************************************************************************/
  /* Children Check                                                         */
  /**************************************************************************/
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
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  SVGStyle: {},
  detectWheel: true,
  detectAutoPan: true,
  detectPinchGesture: true,
  toolbarPosition: POSITION_RIGHT,
  modifierKeys: ["Alt", "Shift", "Control"],
  customToolbar: Toolbar,
  preventPanOutside: true,
  scaleFactor: 1.1,
  scaleFactorOnWheel: 1.06,
  miniaturePosition: POSITION_LEFT,
  miniatureWidth: 100,
  miniatureHeight: 80,
  miniatureBackground: "#616264",
  customMiniature: Miniature,
  disableZoomWithToolAuto: false,
  onZoom: null,
  onPan: null,
  toolbarProps: {}
};
