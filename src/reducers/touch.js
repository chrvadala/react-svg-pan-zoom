import {getSVGPoint} from '../features/common';
import {startPanning, updatePanning, stopPanning} from '../features/pan';
import {startZooming, updateZooming, stopZooming, zoom} from '../features/zoom';
import mapRange from '../utils/mapRange';

import {
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
} from '../actions/types';

import {
  TOOL_AUTO,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_ZOOMING,
  MODE_PANNING,
} from '../constants';


const viewer = (state, action) => {
  const {type, payload} = action;
  const {settings, viewer} = state;
  const {scaleFactor, scaleFactorMin, scaleFactorMax, scaleFactorOnWheel} = settings;
  const {viewerSize, SVGGeometry} = state.geometry;

  const {start, end, matrix, mode, tool} = state.viewer;
  const {cursurPosition} = payload;
  let SVGpoint
  if(cursurPosition) {
    let {x, y} = cursurPosition;
    SVGpoint = getSVGPoint(x, y, matrix);
  }

  switch (type) {
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