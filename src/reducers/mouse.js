import {getSVGPoint} from '../features/common';
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
} from '../actions/types';

import {
  TOOL_AUTO,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_ZOOMING,
  MODE_PANNING,
} from '../constants';


const mouse = (state, action) => {
  const {type, payload} = action;
  const {scaleFactors, viewer} = state;
  const {scaleFactor, scaleFactorMin, scaleFactorMax, scaleFactorOnWheel} = scaleFactors;
  const {viewerSize, SVGGeometry} = state.geometry;
  const {tool} = state.controls;

  const {start, end, matrix, mode} = state.viewer;
  const {cursurPosition} = payload;
  let SVGpoint
  if(cursurPosition) {
    let {x, y} = cursurPosition;
    SVGpoint = getSVGPoint(x, y, matrix);
  }

  switch (type) {

    case MOUSE_UP:
      switch (tool) {
        case TOOL_ZOOM_IN:
          if (mode !== MODE_ZOOMING) return state;
          return {...state, viewer: {...viewer, ...stopZooming(cursurPosition, start, end, matrix, scaleFactors, viewerSize)}}
        case TOOL_ZOOM_OUT:
          if (mode !== MODE_ZOOMING) return state;
          return {...state, viewer: {...viewer, ...stopZooming(cursurPosition, start, end, matrix, {...scaleFactors, scaleFactor: 1 / scaleFactor}, viewerSize)}}
        case TOOL_AUTO: // fall through to TOOL_PAN (no break or return)
        case TOOL_PAN:
          if(mode !== MODE_PANNING) return state;
          return {...state, viewer: {...viewer, ...stopPanning()}}
        default:
          return state;
      }
    case MOUSE_DOWN:
      switch (tool) {
        case TOOL_ZOOM_IN:
          return {...state, viewer: {...viewer, ...startZooming(cursurPosition)}}
        case TOOL_ZOOM_OUT:
          return {...state, viewer: {...viewer, ...zoom(matrix, SVGpoint, 1 / scaleFactor, scaleFactorMin, scaleFactorMax)}}
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
      const {buttons} = payload;
      const forceExit = (buttons === 0); //the mouse exited and reentered into svg
      switch (tool) {
        case TOOL_ZOOM_IN:
          if(mode !== MODE_ZOOMING) return state;
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
          if(mode !== MODE_PANNING) return state;
          if(forceExit) {
            return {...state, viewer: {...viewer, ...stopPanning()}}
          } else {
            const {preventPanOutside} = state.settings;
            return {...state, viewer: {...viewer, ...updatePanning(cursurPosition, start, end, matrix, preventPanOutside ? 20 : undefined, mode, viewerSize, SVGGeometry)}}
          }
        default:
          return state;
      }
    case MOUSE_CLICK:
      // #TODO
      return state;
    case MOUSE_DOUBLE_CLICK:
      // #TODO
      const {disableDoubleClickZoomWithToolAuto, modifierKeys} = state.settings;
      switch (tool) {
        case TOOL_AUTO:
          // if (!disableDoubleClickZoomWithToolAuto) {
          //   const modifierKeysReducer = (current, modifierKey) => current || event.getModifierState(modifierKey);
          //   const modifierKeyActive = modifierKeys.reduce(modifierKeysReducer, false);
          //   const scaleFactor = modifierKeyActive ? 1 / scaleFactor : scaleFactor;
          // }
          // return {...state, viewer: {...viewer, ...zoom(SVGpoint.x, SVGpoint.y, scaleFactor, props)}}
        default:
          return state;
      }
    case MOUSE_WHEEL:
      const {detectWheel} = state.settings;
      if (!detectWheel) return state;
    
      const delta = Math.max(-1, Math.min(1, event.deltaY));
      const scale = mapRange(delta, -1, 1, scaleFactorOnWheel, 1 / scaleFactorOnWheel);
      return {...state, viewer: {...viewer, ...zoom(matrix, SVGpoint, scale, scaleFactorMin, scaleFactorMax)}}

    default:
      return state;
  }
}
export default mouse;