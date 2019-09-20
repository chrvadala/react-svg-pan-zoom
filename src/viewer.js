import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import {identity, toSVG} from 'transformation-matrix';
//events
import eventFactory from './events/event-factory';
//features
import {pan} from './features/pan';
import {
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
import {isEmpty} from "./utils/is";

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
  TOOL_ZOOM_OUT,
  NULL_POSITION
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
  const viewer = {viewerWidth, viewerHeight};

  const [autoPanIsRunning, setAutoPanning] = useState(true);

  const [matrix, setMatrix] = useState(identity());
  const [pointer, setPointer] = useState(NULL_POSITION);
  const [start, setStart] = useState(NULL_POSITION);
  const [end, setEnd] = useState(NULL_POSITION);

  const [mode, setMode] = useState(MODE_IDLE);
  const [focus, setFocus] = useState(false);
  const [pinchPointDistance, setPinchPointDistance] = useState(null);
  const [prePinchMode, setPrePinchMode] = useState(null);
  const [miniatureOpen, setMiniatureOpen] = useState(true);
  const [lastAction, setLastAction] = useState(null);

  const ViewerDOM = useRef(null);
  const boundingRect = ViewerDOM.current && ViewerDOM.current.getBoundingClientRect();

  const {viewBox: SVGViewBox} = children.props;
  const {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = SVGViewBox ? parseViewBox(SVGViewBox) : {
    SVGHeight: children.props.height,
    SVGWidth: children.props.width,
    SVGMinX: 0,
    SVGMinY: 0
  };
  const SVGAttributes = {SVGMinX, SVGMinY, SVGWidth, SVGHeight};

  // componentDidMount()
  useEffect(() => {
    requestAnimationFrame(autoPanLoop);
    return () => setAutoPanning(false)
  }, []);

  // on value change
  useEffect(() => {
    let {onChangeValue, onZoom, onPan} = props;
    const nextValue = getValue();
    if (onChangeValue) onChangeValue(nextValue);
    if (nextValue.lastAction) {
      if (onZoom && nextValue.lastAction === ACTION_ZOOM) onZoom(nextValue);
      if (onPan && nextValue.lastAction === ACTION_PAN) onPan(nextValue);
    }

    return () => setAutoPanning(false)
  }, [
    matrix, pointer, start, end,
    mode, focus, pinchPointDistance, prePinchMode, miniatureOpen,
    lastAction,
  ]);

  function getValue() {
    return {
      //directly from props:
      viewerWidth,
      viewerHeight,
      scaleFactorMin,
      scaleFactorMax,

      //from child props:
      SVGAttributes,

      //
      matrix,
      start,
      end,
      pointer,

      //
      mode,
      focus,
      pinchPointDistance,
      prePinchMode,
      miniatureOpen,
      lastAction,

      //
      version: 3,
    };
  }

  function updateValue(nextValue) {
    const { matrix, start, end, pointer, mode, lastAction} = nextValue;
    if('matrix' in nextValue) setMatrix(matrix);
    if('start' in nextValue) setStart(start);
    if('end' in nextValue) setEnd(end);
    if('pointer' in nextValue) setPointer(pointer);

    if('mode' in nextValue) setMode(mode);
    if('lastAction' in nextValue) setLastAction(lastAction);
    if('focus' in nextValue) setFocus(focus);

  }

  /** ReactSVGPanZoom methods **/
  useImperativeHandle(Viewer, () => ({

    pan(matrix, SVGDeltaX, SVGDeltaY) {
      const panValue = pan(matrix, {x: SVGDeltaX, y: SVGDeltaY}, SVGAttributes, viewer);
      setMatrix(panValue.matrix);
      setMode(panValue.mode);
      setLastAction(ACTION_PAN);
    },

    zoom(matrix, SVGPointX, SVGPointY, scaleFactor) {
      const zoomValue = zoom(SVGPointX, SVGPointY, scaleFactor)
      setLastAction(ACTION_ZOOM);
    },

    fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      fitSelection(
        selectionSVGPointX,
        selectionSVGPointY,
        selectionWidth,
        selectionHeight,
        viewerWidth,
        viewerHeight
      );
    },

    fitToViewer(SVGAlignX = ALIGN_LEFT, SVGAlignY = ALIGN_TOP) {
      const zoomValue = fitToViewer(viewer, SVGAttributes, SVGAlignX, SVGAlignY);
      setMatrix(zoomValue.matrix);
      setStart(zoomValue.start);
      setEnd(zoomValue.end);
      setLastAction(zoomValue.last_action);
    },

    zoomOnViewerCenter(viewer, scaleFactor) {
      zoomOnViewerCenter(scaleFactor);
    },

    setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      setPointOnViewerCenter(viewerWidth, viewerHeight, SVGPointX, SVGPointY, zoomLevel);
    },

    reset() {
      // updateValue(reset());
      setMode(MODE_IDLE);
      setMatrix(identity());
    },

    openMiniature() {
      setMiniatureOpen(true);
    },

    closeMiniature() {
      setMiniatureOpen(false);
    }
  }));

  /** ReactSVGPanZoom internals **/
  function handleViewerEvent(event) {
    if (!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0)) return;
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

    const onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(eventFactory(event, matrix, boundingRect));
  }

  function autoPanLoop() {
    // let nextValue = onInterval(null, boundingRect, matrix, tool, props, mode, pointer, viewer);
    // if (value !== nextValue) {
    //   updateValue(nextValue);
    // }

    // if (autoPanIsRunning) {
    //   requestAnimationFrame(autoPanLoop);
    // }
  }

  /** React renderer **/
  let {customToolbar: CustomToolbar, customMiniature: CustomMiniature} = props;

  let panningWithToolAuto = tool === TOOL_AUTO
    && mode === MODE_PANNING
    && start.x !== end.x
    && start.y !== end.y;

  let cursor;

  if (tool === TOOL_PAN)
    cursor = cursorPolyfill(mode === MODE_PANNING ? 'grabbing' : 'grab');

  if (tool === TOOL_ZOOM_IN)
    cursor = cursorPolyfill('zoom-in');

  if (tool === TOOL_ZOOM_OUT)
    cursor = cursorPolyfill('zoom-out');

  if (panningWithToolAuto)
    cursor = cursorPolyfill('grabbing');

  let blockChildEvents = [TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT].indexOf(tool) >= 0;
  blockChildEvents = blockChildEvents || panningWithToolAuto;

  const touchAction = (props.detectPinchGesture || [TOOL_PAN, TOOL_AUTO].indexOf(tool) !== -1) ? 'none' : undefined

  const style = {display: 'block', cursor, touchAction};
  return (
    <div
      style={{position: "relative", width: viewerWidth, height: viewerHeight, ...props.style}}
      className={props.className}>
      <svg
        ref={ViewerDOM}
        width={viewerWidth}
        height={viewerHeight}
        style={style}

        onMouseDown={event => {
          let nextValue = onMouseDown(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);

          handleViewerEvent(event);
        }}
        onMouseMove={event => {
          let {left, top} = boundingRect;
          let x = event.clientX - Math.round(left);
          let y = event.clientY - Math.round(top);

          let nextValue = onMouseMove(event, boundingRect, matrix, tool, props, mode, {x, y}, start, end);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onMouseUp={event => {
          let nextValue = onMouseUp(event, boundingRect, matrix, tool, props, mode, null, start, end);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}

        onClick={event => {
          handleViewerEvent(event)
        }}
        onDoubleClick={event => {
          let nextValue = onDoubleClick(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}

        onWheel={event => {
          let nextValue = onWheel(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
        }}

        onMouseEnter={event => {
          if (detectTouch()) return;
          let nextValue = onMouseEnterOrLeave(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
        }}
        onMouseLeave={event => {
          let nextValue = onMouseEnterOrLeave(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
        }}

        onTouchStart={event => {
          let nextValue = onTouchStart(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchMove={event => {
          let nextValue = onTouchMove(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchEnd={event => {
          let nextValue = onTouchEnd(event, boundingRect, matrix, tool, props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}
        onTouchCancel={event => {
          let nextValue = onTouchCancel(event, boundingRect, tool,  props, mode);
          if (!isEmpty(nextValue)) updateValue(nextValue);
          handleViewerEvent(event);
        }}>

        <rect
          fill={props.background}
          x={0}
          y={0}
          width={viewerWidth}
          height={viewerHeight}
          style={{pointerEvents: "none"}}
        />

        <g
          transform={toSVG(matrix)}
          style={blockChildEvents ? {pointerEvents: "none"} : {}}>
          <rect
            fill={props.SVGBackground}
            style={props.SVGStyle}
            x={SVGMinX || 0}
            y={SVGMinY || 0}
            width={SVGWidth}
            height={SVGHeight}/>
          <g>
            {children.props.children}
          </g>
        </g>

        {!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0 && props.detectAutoPan && focus) ? null : (
          <g style={{pointerEvents: "none"}}>
            {!(pointer.y <= 20) ? null :
              <BorderGradient direction={POSITION_TOP} width={viewerWidth} height={viewerHeight}/>
            }

            {!(viewerWidth - pointer.x <= 20) ? null :
              <BorderGradient direction={POSITION_RIGHT} width={viewerWidth} height={viewerHeight}/>
            }

            {!(viewerHeight - pointer.y <= 20) ? null :
              <BorderGradient direction={POSITION_BOTTOM} width={viewerWidth} height={viewerHeight}/>
            }

            {!(focus && pointer.x <= 20) ? null :
              <BorderGradient direction={POSITION_LEFT} width={viewerWidth} height={viewerHeight}/>
            }
          </g>
        )}

        {!(mode === MODE_ZOOMING) ? null :
          <Selection startX={start.x} startY={start.y} endX={end.x} endY={end.y}/>
        }
      </svg>

      {props.toolbarProps.position === POSITION_NONE ? null :
        <CustomToolbar
          {...props.toolbarProps}
          // value={value}
          // onChangeValue={value => updateValue(value)}
          tool={tool}
          onChangeTool={tool => props.onChangeTool(tool)}
        />}

      {props.miniatureProps.position === POSITION_NONE ? null :
        <CustomMiniature
          viewer={viewer}
          SVGAttributes={SVGAttributes}
          miniatureOpen={miniatureOpen}
          setMiniatureOpen={setMiniatureOpen}
          matrix={matrix}
          {...props.miniatureProps}
          // value={value}
          // onChangeValue={value => updateValue(value)}
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
  //
  // //value of the viewer (current camera view)
  // value: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.shape({
  //     version: PropTypes.oneOf([2]).isRequired,
  //     mode: PropTypes.oneOf([MODE_IDLE, MODE_PANNING, MODE_ZOOMING]).isRequired,
  //     focus: PropTypes.bool.isRequired,
  //     a: PropTypes.number.isRequired,
  //     b: PropTypes.number.isRequired,
  //     c: PropTypes.number.isRequired,
  //     d: PropTypes.number.isRequired,
  //     e: PropTypes.number.isRequired,
  //     f: PropTypes.number.isRequired,
  //     viewerWidth: PropTypes.number.isRequired,
  //     viewerHeight: PropTypes.number.isRequired,
  //     SVGMinX: PropTypes.number.isRequired,
  //     SVGMinY: PropTypes.number.isRequired,
  //     SVGWidth: PropTypes.number.isRequired,
  //     SVGHeight: PropTypes.number.isRequired,
  //     startX: PropTypes.number,
  //     startY: PropTypes.number,
  //     endX: PropTypes.number,
  //     endY: PropTypes.number,
  //     miniatureOpen: PropTypes.bool.isRequired,
  //   })
  // ]).isRequired,

  //handler something changed
  // onChangeValue: PropTypes.func.isRequired,

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
