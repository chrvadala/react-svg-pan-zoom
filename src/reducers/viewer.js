import {setViewerCoords, getSVGPoint, getCursorPosition} from '../features/common';
import {startPanning, updatePanning, stopPanning} from '../features/pan';
import {startZooming, updateZooming, stopZooming, zoom} from '../features/zoom';
import mapRange from '../utils/mapRange';

import {
  MOUSE_UP,
  MOUSE_DOWN,
  MOUSE_ENTER,
  MOUSE_LEAVE,
  MOUSE_MOVE,
  MOUSE_CLICK,
  MOUSE_DOUBLE_CLICK,
  MOUSE_WHEEL,

  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
} from '../actions/types';

import {
  NULL_POSITION,
  TOOL_AUTO,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_PANNING,
  MODE_ZOOMING,
  MODE_IDLE
} from '../constants';

import {INITIAL_STATE} from './initialState';

const viewer = (state = INITIAL_STATE.interactions, action) => {
  const {type, payload} = action;
  const {scaleFactors, viewer} = state;
  const {scaleFactor} = scaleFactors;
  const {boundingRect, viewerSize, SVGGeometry} = state.geometry;
  const {tool} = state.controls;

  const {start, end, matrix, mode} = state.viewer;
  const {cursurPosition} = payload;
  if(cursurPosition) {
    let {x, y} = cursurPosition;
    let SVGPoint = getSVGPoint(x, y, state.matrix);
  }

  switch (type) {

    case MOUSE_UP:
      switch (state.tool) {
        case TOOL_ZOOM_IN:
          return {...state, viewer: {...viewer, ...stopZooming(cursurPosition, start, end, matrix, scaleFactors, viewerSize)}}
        case TOOL_ZOOM_OUT:
          return {...state, viewer: {...viewer, ...stopZooming(cursurPosition, start, end, matrix, {...scaleFactors, scaleFactor: 1 / scaleFactor}, viewerSize)}}
        case TOOL_AUTO: // fall through to TOOL_PAN (no break or return)
        case TOOL_PAN:
          return {...state, viewer: {...viewer, ...stopPanning()}}
        default:
          return state;
      }
    case MOUSE_DOWN:
      switch (state.tool) {
        case TOOL_ZOOM_IN:
          return {...state, viewer: {...viewer, ...startZooming(cursurPosition)}}
        case TOOL_ZOOM_OUT:
          return {...state, viewer: {...viewer, ...zoom(state.matrix, SVGPoint, 1 / scaleFactor)}}
        case TOOL_AUTO: // fall through to TOOL_PAN (no break or return)
        case TOOL_PAN:
          return {...state, viewer: {...viewer, ...startPanning(cursurPosition)}}
        default:
          return state;
      }
    case MOUSE_ENTER: // fall through to MOUSE_LEAVE (no break or return)
    case MOUSE_LEAVE:
      const {type: eventType} = payload;
      return {...state, viewer: {...viewer, focus: eventType === 'mouseenter'}};
    case MOUSE_MOVE:
      const {buttons} = event;
      const forceExit = (buttons === 0); //the mouse exited and reentered into svg
      switch (tool) {
        case TOOL_ZOOM_IN:
          if(forceExit) {
            return {...state, viewer: {...viewer, ...stopZooming(cursurPosition, start, end, matrix, scaleFactors, viewerSize)}}
          } else {
            return {...state, viewer: {...viewer, ...updateZooming(mode, cursurPosition)}}
          }
        case TOOL_ZOOM_OUT:
          // #TODO
          return state;
        case TOOL_AUTO: // fall through to TOOL_PAN (no break or return)
        case TOOL_PAN:
          if(forceExit) {
            return {...state, viewer: {...viewer, ...stopPanning()}}
          } else {
            const {preventPanOutside} = state.settings;
            return {...state, viewer: {...viewer, ...updatePanning(cursurPosition, start, end, matrix, preventPanOutside ? 20 : undefined, mode, viewer, SVGGeometry)}}
          }
        default:
          return state;
      }
    case MOUSE_CLICK:
      // #TODO
      return state;
    case MOUSE_DOUBLE_CLICK:
      switch (state.tool) {
        case TOOL_AUTO:
          if (!props.disableDoubleClickZoomWithToolAuto) {
            const modifierKeysReducer = (current, modifierKey) => current || event.getModifierState(modifierKey);
            const modifierKeyActive = props.modifierKeys.reduce(modifierKeysReducer, false);
            const scaleFactor = modifierKeyActive ? 1 / scaleFactor : scaleFactor;
          }
          return {...state, viewer: {...viewer, ...zoom(SVGPoint.x, SVGPoint.y, scaleFactor, props)}}
        default:
          return state;
      }
    case MOUSE_WHEEL:
      const {detectWheel} = state.settings;
      if (!detectWheel) return {};
    
      const {x, y} = cursurPosition;
      const delta = Math.max(-1, Math.min(1, event.deltaY));
      const scaleFactor = mapRange(delta, -1, 1, scaleFactorOnWheel, 1 / scaleFactorOnWheel);
      const SVGPoint = getSVGPoint(x, y, matrix);
      return {...state, viewer: {...viewer, ...zoom(matrix, SVGPoint, scaleFactor)}}

    case TOUCH_START:
      // #TODO
      return state;
    case TOUCH_MOVE:
      // #TODO
      return state;
    case TOUCH_END:
      // #TODO
      return state;
    case TOUCH_CANCEL:
      // #TODO
      return state;     
    default:
      return state;
  }
}
export default viewer;