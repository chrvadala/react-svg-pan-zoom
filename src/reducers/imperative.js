import {getSVGPoint} from '../features/common';
import {startPanning, updatePanning, stopPanning} from '../features/pan';
import {startZooming, updateZooming, stopZooming, zoom} from '../features/zoom';
import mapRange from '../utils/mapRange';

import {
  PAN,
  ZOOM,
  FIT_SELECTION,
  FIT_TO_VIEWER,
  ZOOM_ON_VIEW_CENTER,
  SET_POINT_ON_VIEW_CENTER,
  RESET
} from '../actions/types';

import {
  TOOL_AUTO,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_ZOOMING,
  MODE_PANNING,
} from '../constants';

import {INITIAL_STATE} from './initialState';

const viewer = (state, action) => {
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
    case PAN:
      // #TODO
      return state;
    case ZOOM:
      // #TODO
      return state;
    case FIT_SELECTION:
      // #TODO
      return state;
    case FIT_TO_VIEWER:
      // #TODO
      return state;
    case ZOOM_ON_VIEW_CENTER:
      // #TODO
      return state;
    case SET_POINT_ON_VIEW_CENTER:
      // #TODO
      return state;
    case RESET:
      // #TODO
      return state;
    default:
      return state;
  }
}
export default viewer;