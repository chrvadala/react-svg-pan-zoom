import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import {identity, toSVG} from 'transformation-matrix';
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
import parseViewBox from './utils/ViewBoxParser';
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


const ReactSVGPanZoom = forwardRef((props, Viewer) => {
  if (process.env.NODE_ENV !== 'production') {
    printMigrationTipsRelatedToProps(props)
  }
  const {
    width: viewerWidth,
    height: viewerHeight,
    scaleFactorMin,
    scaleFactorMax,
    tool,
    children
  } = props;

  const [value, setCurrentValue] = useState(defaultValue);
  const [pointerX, setPointerX] = useState(null);
  const [pointerY, setPointerY] = useState(null);
  const [autoPanIsRunning, setAutoPanning] = useState(true);

  const ViewerDOM = useRef(null);

  const {viewBox: SVGViewBox, width: SVGWidth, height: SVGHeight} = children.props;

  // componentDidMount()
  useEffect(() => {

    requestAnimationFrame(autoPanLoop);
  }, []);

  // update on viewBox change
  useEffect(() => {
    if(!SVGViewBox) return
    const [x, y, width, height] = parseViewBox(SVGViewBox);
    updateValue(setSVGViewBox(x, y, SVGWidth, SVGHeight));
  }, [SVGViewBox]);

  // update on width and height change
  useEffect(() => {
    if(!SVGWidth || !SVGHeight) return
    updateValue(setSVGViewBox(0, 0, SVGWidth, SVGHeight));
  }, [SVGWidth, SVGHeight]);

  // update on scaleFactor change
  useEffect(() => {
    updateValue(setZoomLevels(scaleFactorMin, scaleFactorMax));
  }, [scaleFactorMin, scaleFactorMax]);

  // update on viewer width and height change
  useEffect(() => {
    updateValue(setViewerSize(viewerWidth, viewerHeight));
  }, [viewerWidth, viewerHeight]);


  /** ReactSVGPanZoom handlers **/
  function defaultValue() {
    const {viewBox: SVGViewBox, width: SVGWidth, height: SVGHeight} = children.props;

    if (SVGViewBox) {
      const [x, y, width, height] = parseViewBox(SVGViewBox);
      return getDefaultValue(viewerWidth, viewerHeight, x, y, width, height, scaleFactorMin, scaleFactorMax)
    } else {
      return getDefaultValue(viewerWidth, viewerHeight, 0, 0, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax)
    }
  }

  function updateValue(newValues) {
    let {onChangeValue, onZoom, onPan} = props;
    const nextValue = {...value, ...newValues};
    if (onChangeValue) onChangeValue(nextValue);
    if (nextValue.lastAction) {
      if (onZoom && nextValue.lastAction === ACTION_ZOOM) onZoom(nextValue);
      if (onPan && nextValue.lastAction === ACTION_PAN) onPan(nextValue);
    }
    setCurrentValue((value) => ({...value, ...newValues}));
  }

  function getTool() {
    return tool || TOOL_NONE
  }

  /** ReactSVGPanZoom methods **/
  useImperativeHandle(Viewer, () => ({

    pan(SVGDeltaX, SVGDeltaY) {
      updateValue(pan(value, SVGDeltaX, SVGDeltaY));
    },

    zoom(SVGPointX, SVGPointY, scaleFactor) {
      updateValue(zoom(SVGPointX, SVGPointY, scaleFactor));
    },

    fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      updateValue(fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight));
    },

    fitToViewer(SVGAlignX = ALIGN_LEFT, SVGAlignY = ALIGN_TOP) {
      console.log("fitToViewer");
      updateValue(fitToViewer(value, SVGAlignX, SVGAlignY));
    },

    zoomOnViewerCenter(scaleFactor) {
      updateValue(zoomOnViewerCenter(value, scaleFactor));
    },

    setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      updateValue(setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel));
    },

    reset() {
      updateValue(reset());
    },

    openMiniature() {
      updateValue(openMiniature());
    },

    closeMiniature() {
      updateValue(closeMiniature());
    }
  }));

  /** ReactSVGPanZoom internals **/
  function handleViewerEvent(event) {
    if (!([TOOL_NONE, TOOL_AUTO].indexOf(getTool()) >= 0)) return;
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

  function autoPanLoop() {
    let coords = {x: pointerX, y: pointerY};
    let nextValue = onInterval(null, ViewerDOM, getTool(), value, props, coords);
    if (value !== nextValue) {
      updateValue(nextValue);
    }

    if (autoPanIsRunning) {
      requestAnimationFrame(autoPanLoop);
    }
  }

  /** React renderer **/
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

  const touchAction = (props.detectPinchGesture || [TOOL_PAN, TOOL_AUTO].indexOf(getTool()) !== -1) ? 'none' : undefined

  const style = {display: 'block', cursor, touchAction};
  return (
    <div
      style={{position: "relative", width: value.viewerWidth, height: value.viewerHeight, ...props.style}}
      className={props.className}>
      <svg
        ref={ViewerDOM}
        width={value.viewerWidth}
        height={value.viewerHeight}
        style={style}

        onMouseDown={event => {
          let nextValue = onMouseDown(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onMouseMove={event => {
          let {left, top} = ViewerDOM.current.getBoundingClientRect();
          let x = event.clientX - Math.round(left);
          let y = event.clientY - Math.round(top);

          let nextValue = onMouseMove(event, ViewerDOM.current, getTool(), value, props, {x, y});
          if (value !== nextValue) updateValue(nextValue);
          setPointerX(x);
          setPointerY(y);
          handleViewerEvent(event);
        }}
        onMouseUp={event => {
          let nextValue = onMouseUp(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}

        onClick={event => {
          handleViewerEvent(event)
        }}
        onDoubleClick={event => {
          let nextValue = onDoubleClick(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}

        onWheel={event => {
          let nextValue = onWheel(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
        }}

        onMouseEnter={event => {
          if (detectTouch()) return;
          let nextValue = onMouseEnterOrLeave(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
        }}
        onMouseLeave={event => {
          let nextValue = onMouseEnterOrLeave(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
        }}

        onTouchStart={event => {
          let nextValue = onTouchStart(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchMove={event => {
          let nextValue = onTouchMove(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchEnd={event => {
          let nextValue = onTouchEnd(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchCancel={event => {
          let nextValue = onTouchCancel(event, ViewerDOM.current, getTool(), value, props);
          if (value !== nextValue) updateValue(nextValue);
          handleViewerEvent(event);
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
            fill={props.SVGBackground}
            style={props.SVGStyle}
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
          {...props.toolbarProps}
          value={value}
          onChangeValue={value => updateValue(value)}
          tool={tool}
          onChangeTool={tool => props.onChangeTool(tool)}
        />}

      {props.miniatureProps.position === POSITION_NONE ? null :
        <CustomMiniature
          {...props.miniatureProps}
          value={value}
          onChangeValue={value => updateValue(value)}
          SVGBackground={props.SVGBackground}
        >
          {props.children.props.children}
        </CustomMiniature>
      }
    </div>
  );
});

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

  //override miniature component
  customMiniature: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  //miniature props
  miniatureProps: PropTypes.shape({
    position: PropTypes.oneOf([POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]),
    background: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),

  /**************************************************************************/
  /* Toolbar configurations                                                 */
  /**************************************************************************/

  //override toolbar component
  customToolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  //toolbar props
  toolbarProps: PropTypes.shape({
    position: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),
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
  customToolbar: Toolbar,
  toolbarProps: {},
  customMiniature: Miniature,
  miniatureProps: {},
};

export default ReactSVGPanZoom;
