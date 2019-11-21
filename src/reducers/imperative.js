import {getSVGPoint, setPointOnViewerCenter, reset} from '../features/common';
import {pan} from '../features/pan';
import {zoom, fitToViewer, fitSelection} from '../features/zoom';

import {
  PAN,
  ZOOM,
  FIT_SELECTION,
  FIT_TO_VIEWER,
  ZOOM_ON_VIEW_CENTER,
  SET_POINT_ON_VIEW_CENTER,
  RESET
} from '../actions/types';


const imperative = (state, action) => {
  const {type, payload} = action;
  const {scaleFactors, viewer} = state;
  const {scaleFactor, scaleFactorMin, scaleFactorMax, scaleFactorOnWheel} = scaleFactors;
  const {viewerSize, SVGGeometry} = state.geometry;
  const {tool} = state.controls;

  const {start, end, matrix, mode} = state.viewer;
  const {cursurPosition} = payload;
  let SVGpoint, scale
  if(cursurPosition) {
    let {x, y} = cursurPosition;
    SVGpoint = getSVGPoint(x, y, matrix);
  }

  const {viewerWidth, viewerHeight} = viewerSize;
  switch (type) {
    case PAN:
      const {preventPanOutside} = state.settings;
      const {delta} = payload;
      return {...state, viewer: {...viewer, ...pan(matrix, delta, viewerSize, SVGGeometry, preventPanOutside ? 20 : undefined)}}
    case ZOOM_ON_VIEW_CENTER:
      SVGpoint = getSVGPoint(viewerWidth / 2, viewerHeight / 2, matrix);
      scale = ('scaleFactor' in payload) ? payload.scaleFactor : scaleFactor;
      return {...state, viewer: {...viewer, ...zoom(matrix, SVGpoint, 1 / scale, scaleFactorMin, scaleFactorMax)}}
    case ZOOM:
      scale = ('scaleFactor' in payload) ? payload.scaleFactor : scaleFactor;
      return {...state, viewer: {...viewer, ...zoom(matrix, payload.SVGPoint, 1 / scale, scaleFactorMin, scaleFactorMax)}}
    case FIT_SELECTION:
      const {selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight} = payload;
      return {...state, viewer: {...viewer, ...fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight, viewerWidth, viewerHeight)}}
    case FIT_TO_VIEWER:
      const {SVGAlignX, SVGAlignY} = payload;
      return {...state, viewer: {...viewer, ...fitToViewer(viewerSize, SVGGeometry, SVGAlignX, SVGAlignY)}}
    case SET_POINT_ON_VIEW_CENTER:
      const {SVGPointX, SVGPointY, zoomLevel} = payload;
      return {...state, viewer: {...viewer, ...setPointOnViewerCenter(viewerWidth, viewerHeight, SVGPointX, SVGPointY, zoomLevel)}}
    case RESET:
      return {...state, viewer: {...viewer, ...reset()}};
    default:
      return state;
  }
}
export default imperative;