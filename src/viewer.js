import React, {forwardRef, useReducer, useEffect, useRef, useImperativeHandle} from 'react';
import {toSVG} from 'transformation-matrix';
import PropTypes from 'prop-types';
//events
import eventFactory from './events/event-factory';
//features
import {pan} from './features/pan';
import {reset, setPointOnViewerCenter, getCursorPosition} from './features/common';

import parseViewBox from './utils/ViewBoxParser';
import {isEmpty} from "./utils/is";

import {fitSelection, fitToViewer, zoom, zoomOnViewerCenter} from './features/zoom';
import {closeMiniature, openMiniature} from './features/miniature';
//ui
import cursorPolyfill from './ui/cursor-polyfill';
import BorderGradient from './ui/border-gradient';
import Selection from './ui/selection';
import Toolbar from './ui-toolbar/toolbar';
import detectTouch from './ui/detect-touch';
import Miniature from './ui-miniature/miniature'
import reducer from './reducers';

import {
  SET_BOUNDING_RECT
} from './actions/types'

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
import { SET_PINCH_POINT_DISTANCE, SET_PRE_PINCH_MODE } from './actions/types';

import {INITIAL_STATE} from './reducers/initialState';


const ReactSVGPanZoom = forwardRef((props, Viewer) => {
  if (process.env.NODE_ENV !== 'production') printMigrationTipsRelatedToProps(props)

  const ViewerDOM = useRef(null);
  const boundingRect = ViewerDOM.current && ViewerDOM.current.getBoundingClientRect();
  useEffect(() => dispatch({type: SET_BOUNDING_RECT, payload: {boundingRect}}), [ViewerDOM.current]);

  const {
    width: viewerWidth,
    height: viewerHeight,
    children,
    settings
  } = props;
  const viewerSize = {viewerWidth, viewerHeight};

  const {viewBox: SVGViewBox} = children.props;
  const {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = SVGViewBox ? parseViewBox(SVGViewBox) : {
    SVGHeight: children.props.height,
    SVGWidth: children.props.width,
    SVGMinX: 0,
    SVGMinY: 0
  };
  const SVGGeometry = {SVGMinX, SVGMinY, SVGWidth, SVGHeight};

  const [state, dispatch] = useReducer(reducer, {...INITIAL_STATE, geometry: {viewerSize, boundingRect, SVGGeometry}});
  

  const {viewer, controls, autoPanning} = state;
  const {tool, miniatureOpen} = controls;
  const {matrix, start, end, mode} = viewer;
  
  const {autoPanHover, autoPanIsRunning} = autoPanning;


  const hoverBorderRef = useRef()
  useEffect(() => {
    hoverBorderRef.current = requestAnimationFrame(() => panOnHover(matrix));
    return () => cancelAnimationFrame(hoverBorderRef.current);
  }, [autoPanHover]);

  const panOnHover = (inputMatrix) => {
    if(!autoPanIsRunning) return

    let deltaX = 0;
    let deltaY = 0;

    if(autoPanHover === POSITION_NONE){
      cancelAnimationFrame(hoverBorderRef.current)
    } else {
      switch (autoPanHover) {
        case POSITION_TOP:
            deltaY = -2;
          break;

        case POSITION_RIGHT:
            deltaX = 2;
          break;

        case POSITION_BOTTOM:
            deltaY = 2;
          break;

        case POSITION_LEFT:
            deltaX = -2;
          break;
      }
      const delta =  {x: deltaX / inputMatrix.d, y: deltaY / inputMatrix.d};
      // const nextValue = pan(inputMatrix, delta, viewerSize, SVGGeometry, props.preventPanOutside ? 20 : undefined);
      // updateValue(nextValue);
      // dispatch("")
      hoverBorderRef.current = requestAnimationFrame(() => panOnHover(nextValue.matrix));
    }
  }

  // // on value change
  // useEffect(() => {
  //   let {onChangeValue, onZoom, onPan} = props;
  //   const nextValue = getValue();
  //   if (onChangeValue) onChangeValue(nextValue);
  //   if (nextValue.lastAction) {
  //     if (onZoom && nextValue.lastAction === ACTION_ZOOM) onZoom(nextValue);
  //     if (onPan && nextValue.lastAction === ACTION_PAN) onPan(nextValue);
  //   }
  // }, [
  //   matrix, start, end,
  //   mode, focus, pinchPointDistance, prePinchMode, miniatureOpen,
  //   lastAction,
  // ]);

  // function getValue() {
  //   return {
  //     //directly from props:
  //     viewerWidth,
  //     viewerHeight,
  //     scaleFactorMin,
  //     scaleFactorMax,

  //     //from child props:
  //     SVGGeometry,

  //     //
  //     matrix,
  //     start,
  //     end,

  //     //
  //     mode,
  //     focus,
  //     pinchPointDistance,
  //     prePinchMode,
  //     miniatureOpen,
  //     lastAction,

  //     //
  //     version: 3,
  //   };
  // }

  // /** ReactSVGPanZoom methods **/
  useImperativeHandle(Viewer, () => ({

  //   pan(SVGDeltaX, SVGDeltaY) {
  //     const nextValue = pan(matrix, {x: SVGDeltaX, y: SVGDeltaY}, viewerSize, SVGGeometry, props.preventPanOutside ? 20 : undefined);
  //     updateValue(nextValue);
  //   },

  //   zoom(SVGPointX, SVGPointY, scaleFactor) {
  //     const nextValue = zoom(matrix, {x: SVGPointX, y: SVGPointY}, scaleFactor, scaleFactorMin, scaleFactorMax);
  //     updateValue(nextValue);
  //   },

  //   fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  //     const nextValue = fitSelection(
  //       selectionSVGPointX,
  //       selectionSVGPointY,
  //       selectionWidth,
  //       selectionHeight,
  //       viewerWidth,
  //       viewerHeight
  //     );
  //     updateValue(nextValue);
  //   },

    fitToViewer(SVGAlignX = ALIGN_LEFT, SVGAlignY = ALIGN_TOP) {
      // const nextValue = fitToViewer(viewer, SVGGeometry, SVGAlignX, SVGAlignY);
      // updateValue(nextValue);
    },

  //   zoomOnViewerCenter(scaleFactor) {
  //     const nextValue = zoomOnViewerCenter(matrix, viewer, scaleFactor, scaleFactorMin, scaleFactorMax);
  //     updateValue(nextValue);
  //   },

  //   setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
  //     const nextValue = setPointOnViewerCenter(viewerWidth, viewerHeight, SVGPointX, SVGPointY, zoomLevel);
  //     updateValue(nextValue);
  //   },

  //   reset() {
  //     const nextValue = reset();
  //     updateValue(nextValue);
  //   },

  //   openMiniature() {
  //     const nextValue = openMiniature();
  //     updateValue(nextValue);
  //   },

  //   closeMiniature() {
  //     const nextValue = closeMiniature();
  //     updateValue(nextValue);
  //   },

  //   changeTool(tool) {
  //     setTool(tool);
  //   }
  }));

  // /** ReactSVGPanZoom internals **/
  // function handleViewerEvent(event) {
  //   if (!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0)) return;
  //   if (event.target === ViewerDOM) return;

  //   let eventsHandler = {
  //     click: props.onClick,
  //     dblclick: props.onDoubleClick,

  //     mousemove: props.onMouseMove,
  //     mouseup: props.onMouseUp,
  //     mousedown: props.onMouseDown,

  //     touchstart: props.onTouchStart,
  //     touchmove: props.onTouchMove,
  //     touchend: props.onTouchEnd,
  //     touchcancel: props.onTouchCancel,
  //   };

  //   const onEventHandler = eventsHandler[event.type];
  //   if (!onEventHandler) return;

  //   onEventHandler(eventFactory(event, matrix, boundingRect));
  // }

  // /** React renderer **/
  // // SVG components
  const svgBackground = (
    <rect
      fill={props.background}
      x={0}
      y={0}
      width={viewerWidth}
      height={viewerHeight}
      style={{pointerEvents: "none"}}
    />
  );
  let blockChildEvents = [TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT].indexOf(tool) >= 0;
  blockChildEvents = blockChildEvents || panningWithToolAuto;
  const svgContent = (
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
  );
  const borderGradients = !([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0 && props.detectAutoPan) ? null : (
    <g>
      <BorderGradient direction={POSITION_TOP} width={viewerWidth} height={viewerHeight} setAutoPanHover={() => dispatch({type: "SET_AUTO_PAN_HOVER", payload: {autoPanHover}})}/>
      <BorderGradient direction={POSITION_RIGHT} width={viewerWidth} height={viewerHeight} setAutoPanHover={() => dispatch({type: "SET_AUTO_PAN_HOVER", payload: {autoPanHover}})}/>
      <BorderGradient direction={POSITION_BOTTOM} width={viewerWidth} height={viewerHeight} setAutoPanHover={() => dispatch({type: "SET_AUTO_PAN_HOVER", payload: {autoPanHover}})}/>
      <BorderGradient direction={POSITION_LEFT} width={viewerWidth} height={viewerHeight} setAutoPanHover={() => dispatch({type: "SET_AUTO_PAN_HOVER", payload: {autoPanHover}})}/>
    </g>
  );
  const selection = !(mode === MODE_ZOOMING) ? null : (
    <Selection startX={start.x} startY={start.y} endX={end.x} endY={end.y}/>
  );

  // // DIV ui components
  const {customToolbar: CustomToolbar, customMiniature: CustomMiniature} = props;
  const toolbar = props.toolbarProps.position === POSITION_NONE ? null : (
    <CustomToolbar
      {...props.toolbarProps}
      fitToViewer={(SVGAlignX, SVGAlignY) => updateValue(fitToViewer(viewerSize, SVGGeometry, SVGAlignX, SVGAlignY))}
      tool={tool}
      onChangeTool={tool => {
        setTool(tool);
        const { onChangeTool } = props;
        if(onChangeTool) onChangeTool(tool);
      }}
    />
  );
  const miniature = props.miniatureProps.position === POSITION_NONE ? null : (
    <CustomMiniature
      viewer={viewerSize}
      SVGAttributes={SVGGeometry}
      miniatureOpen={miniatureOpen}
      setMiniatureOpen={() => dispatch({type: "SET_MINIATURE_OPEN", payload: miniatureOpen})}
      matrix={matrix}
      {...props.miniatureProps}
      // value={value}
      // onChangeValue={value => updateValue(value)}
      SVGBackground={props.SVGBackground}
    >
      {props.children.props.children}
    </CustomMiniature>
  );
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

  const touchAction = (props.detectPinchGesture || [TOOL_PAN, TOOL_AUTO].indexOf(tool) !== -1) ? 'none' : undefined
  const style = {display: 'block', cursor, touchAction};
  const eventToPayload = (event) => {
    const cursurPosition = getCursorPosition(event, boundingRect);
    const {type} = event;
    return {
      cursurPosition,
      type
    }
  }
  return (
    <div
      style={{position: "relative", width: viewerWidth, height: viewerHeight, ...props.style}}
      className={props.className}>
       <svg
        ref={ViewerDOM}
        width={viewerWidth}
        height={viewerHeight}
        style={style}
        onMouseUp={(event) => {dispatch({type: "MOUSE_UP", payload: eventToPayload(event)}); event.preventDefault();}}
        onMouseDown={(event) => dispatch({type: "MOUSE_DOWN", payload: eventToPayload(event)})}
        onMouseMove={(event) => dispatch({type: "MOUSE_MOVE", payload: eventToPayload(event)})}
        onMouseEnter={(event) => dispatch({type: "MOUSE_ENTER", payload: eventToPayload(event)})}
        onMouseLeave={(event) => dispatch({type: "MOUSE_LEAVE", payload: eventToPayload(event)})}
        onClick={(event) => dispatch({type: "MOUSE_CLICK", payload: eventToPayload(event)})}
        onDoubleClick={(event) => dispatch({type: "MOUSE_DOUBLE_CLICK", payload: eventToPayload(event)})}
        onWheel={(event) => dispatch({type: "MOUSE_WHEEL", payload: eventToPayload(event)})}
        onTouchStart={(event) => dispatch({type: "TOUCH_START", payload: eventToPayload(event)})}
        onTouchMove={(event) => dispatch({type: "TOUCH_MOVE", payload: eventToPayload(event)})}
        onTouchEnd={(event) => dispatch({type: "TOUCH_END", payload: eventToPayload(event)})}
        onTouchCancel={(event) => dispatch({type: "TOUCH_CANCEL", payload: eventToPayload(event)})}
      >
        {svgBackground}
        {svgContent}
        {borderGradients}
        {selection}
      </svg>
      {toolbar}
      {miniature}
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

  //handler something changed
  onChangeValue: PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: PropTypes.oneOf([TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,

  //handler tool changed
  onChangeTool: PropTypes.func,

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
