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
  setSVGViewBox,
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
import parseViewBox from './utils/parseViewBox';
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
import {printMigrationTipsRelatedToProps} from "./migration-tips";

export default class ReactSVGPanZoom extends React.Component {

  constructor(props, context) {
    const {width: viewerWidth, height: viewerHeight, scaleFactorMin, scaleFactorMax, children} = props;
    const {viewBox: SVGViewBox} = children.props;
    let defaultValue;
    if (SVGViewBox) {
      const [SVGMinX, SVGMinY, SVGWidth, SVGHeight] = parseViewBox(SVGViewBox);
      defaultValue = getDefaultValue(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax)
    } else {
      const {width: SVGWidth, height: SVGHeight} = children.props;
      defaultValue = getDefaultValue(viewerWidth, viewerHeight, 0, 0, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax)
    }

    super(props, context);
    this.ViewerDOM = null;
    this.state = {
      pointerX: null,
      pointerY: null,
      defaultValue
    }
    this.autoPanLoop = this.autoPanLoop.bind(this);
    this.onWheel = this.onWheel.bind(this);

    if (process.env.NODE_ENV !== 'production') {
      printMigrationTipsRelatedToProps(props)
    }
  }

  /** React hooks **/
  componentDidUpdate(prevProps) {
    const value = this.getValue();
    const props = this.props

    let nextValue = value;
    let needUpdate = false;

    if (process.env.NODE_ENV !== 'production') {
      printMigrationTipsRelatedToProps(props)
    }

    // This block checks the size of the SVG
    const {viewBox: SVGViewBox} = props.children.props;
    if (SVGViewBox) {
      // if the viewBox prop is specified
      const [x, y, width, height] = parseViewBox(SVGViewBox);

      if(value.SVGMinX !== x || value.SVGMinY !== y || value.SVGWidth !== width || value.SVGHeight !== height) {
        nextValue = setSVGViewBox(nextValue, x, y, width, height);
        needUpdate = true;
      }
    } else {
      // if the width and height props are specified
      const {width: SVGWidth, height: SVGHeight} = props.children.props;
      if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
        nextValue = setSVGViewBox(nextValue, 0, 0, SVGWidth, SVGHeight);
        needUpdate = true;
      }
    }

    // This block checks the size of the viewer
    if (
      prevProps.width !== props.width ||
      prevProps.height !== props.height
    ) {
      nextValue = setViewerSize(nextValue, props.width, props.height);
      needUpdate = true;
    }

    // This blocks checks the scale factors
    if (
      prevProps.scaleFactorMin !== props.scaleFactorMin ||
      prevProps.scaleFactorMax !== props.scaleFactorMax
    ) {
      nextValue = setZoomLevels(nextValue, props.scaleFactorMin, props.scaleFactorMax);
      needUpdate = true;
    }

    if (needUpdate) {
      this.setValue(nextValue);
    }
  }

  componentDidMount() {
    this.autoPanIsRunning = true;
    requestAnimationFrame(this.autoPanLoop);
    this.ViewerDOM.addEventListener('wheel', this.onWheel, false);
  }

  componentWillUnmount() {
    this.autoPanIsRunning = false;
    this.ViewerDOM.removeEventListener('wheel', this.onWheel);
  }

  /** ReactSVGPanZoom handlers **/
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

  /** ReactSVGPanZoom methods **/
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

  /** ReactSVGPanZoom internals **/
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

  onWheel(event) {
    let nextValue = onWheel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
    if (this.getValue() !== nextValue) this.setValue(nextValue);
  }

  /** React renderer **/
  render() {
    let {props, state: {pointerX, pointerY}} = this;
    let tool = this.getTool();
    let value = this.getValue();
    let {customToolbar: CustomToolbar = Toolbar, customMiniature: CustomMiniature = Miniature} = props;

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
              x={value.SVGMinX || 0}
              y={value.SVGMinY || 0}
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

        {props.toolbarProps.position === POSITION_NONE ? null :
          <CustomToolbar
            {...this.props.toolbarProps}
            value={value}
            onChangeValue={value => this.setValue(value)}
            tool={tool}
            onChangeTool={tool => this.props.onChangeTool(tool)}
          />}

        {props.miniatureProps.position === POSITION_NONE ? null :
          <CustomMiniature
            {...this.props.miniatureProps}
            value={value}
            onChangeValue={value => this.setValue(value)}
            SVGBackground={this.props.SVGBackground}
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

  /**
   *   width of the viewer displayed on screen
   */
  width: PropTypes.number.isRequired,

  /**
  * height of the viewer displayed on screen
  */
  height: PropTypes.number.isRequired,

  /**
  * value of the viewer (current camera view)
  */
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
      SVGMinX: PropTypes.number.isRequired,
      SVGMinY: PropTypes.number.isRequired,
      SVGWidth: PropTypes.number.isRequired,
      SVGHeight: PropTypes.number.isRequired,
      startX: PropTypes.number,
      startY: PropTypes.number,
      endX: PropTypes.number,
      endY: PropTypes.number,
      miniatureOpen: PropTypes.bool.isRequired,
    })
  ]).isRequired,

  /**
  * handler something changed
  */
  onChangeValue: PropTypes.func.isRequired,

  /**
  * current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  */
  tool: PropTypes.oneOf([TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,

  /**
  * handler tool changed
  */
  onChangeTool: PropTypes.func.isRequired,

  /**************************************************************************/
  /* Customize style                                                        */
  /**************************************************************************/

  /**
  * background of the viewer
  */
  background: PropTypes.string,

  /**
  * background of the svg
  */
  SVGBackground: PropTypes.string,

  /**
  * style of the svg
  */
  SVGStyle: PropTypes.object,

  /**
  * CSS style of the Viewer
  */
  style: PropTypes.object,

  /**
  * className of the Viewer
  */
  className: PropTypes.string,

  /**************************************************************************/
  /* Detect events                                                          */
  /**************************************************************************/

  /**
  * perform zoom operation on mouse scroll
  */
  detectWheel: PropTypes.bool,

  /**
  * perform PAN if the mouse is on viewer border
  */
  detectAutoPan: PropTypes.bool,

  /**
  * perform zoom operation on pinch gesture
  */
  detectPinchGesture: PropTypes.bool,

  /**
  * handler zoom level changed
  */
  onZoom: PropTypes.func,

  /**
  * handler pan action performed
  */
  onPan: PropTypes.func,

  /**
  * handler click
  */
  onClick: PropTypes.func,

  /**
  * handler double click
  */
  onDoubleClick: PropTypes.func,

  /**
  * handler mouseup
  */
  onMouseUp: PropTypes.func,

  /**
  * handler mousemove
  */
  onMouseMove: PropTypes.func,

  /**
  * handler mousedown
  */
  onMouseDown: PropTypes.func,

  /**************************************************************************/
  /* Some advanced configurations                                           */
  /**************************************************************************/

  /**
  * if disabled the user can move the image outside the viewer
  */
  preventPanOutside: PropTypes.bool,

  /**
  * how much scale in or out
  */
  scaleFactor: PropTypes.number,

  /**
  * how much scale in or out on mouse wheel (requires detectWheel enabled)
  */
  scaleFactorOnWheel: PropTypes.number,

  /**
  * maximum amount of scale a user can zoom in to
  */
  scaleFactorMax: PropTypes.number,

  /**
  * minimum amount of a scale a user can zoom out of
  */
  scaleFactorMin: PropTypes.number,

  /**
  * modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  */
  modifierKeys: PropTypes.array,

  /**
  * Turn off zoom on double click
  */
  disableDoubleClickZoomWithToolAuto: PropTypes.bool,

  /**************************************************************************/
  /* Miniature configurations                                                 */
  /**************************************************************************/

  /**
  * override miniature component
  */
  customMiniature: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
  * miniature props
  */
  miniatureProps: PropTypes.shape({
    position: PropTypes.oneOf([POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]),
    background: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),

  /**************************************************************************/
  /* Toolbar configurations                                                 */
  /**************************************************************************/

  /**
  * override toolbar component
  */
  customToolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
  * toolbar props
  */
  toolbarProps: PropTypes.shape({
    position: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),
    SVGAlignX: PropTypes.oneOf([ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
    SVGAlignY: PropTypes.oneOf([ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
    activeToolColor: PropTypes.string,
  }),

  /**************************************************************************/
  /* Children Check                                                         */
  /**************************************************************************/
  /**
  * accept only one node SVG
  */
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
    if (
      (!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) &&
      (!prop.props.hasOwnProperty('viewBox'))
    ) {
      return new Error('SVG should have props `width` and `height` or `viewBox`');
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
  modifierKeys: ["Alt", "Shift", "Control"],
  preventPanOutside: true,
  scaleFactor: 1.1,
  scaleFactorOnWheel: 1.06,
  disableZoomWithToolAuto: false,
  onZoom: null,
  onPan: null,
  toolbarProps: {},
  miniatureProps: {},
};
