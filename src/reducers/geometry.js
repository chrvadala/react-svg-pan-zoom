import {
  SET_BOUNDING_RECT,
  SET_VIEWER_SIZE,
  SET_SVG_GEOMETRY,
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const geometry = (state = INITIAL_STATE.geometry, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_BOUNDING_RECT:
      return {...state, boundingRect: payload.boundingRect};
    case SET_VIEWER_SIZE:
      return {...state, viewerSize: payload.viewerSize};
    case SET_SVG_GEOMETRY:
      return {...state, SVGGeometry: payload.SVGGeometry};
    default:
      return state;
  }
}
export default geometry;
