import {transform, fromObject, translate, scale} from 'transformation-matrix';

import {
  ACTION_ZOOM, MODE_IDLE, MODE_ZOOMING,
  ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM
} from '../constants';
import {set, getSVGPoint} from './common';
import calculateBox from '../utils/calculateBox';

function lessThanScaleFactorMin (value, scaleFactor) {
  return value.scaleFactorMin && (value.d * (scaleFactor)) <= value.scaleFactorMin;
}

function moreThanScaleFactorMax (value, scaleFactor) {
  return value.scaleFactorMax && (value.d * scaleFactor) >= value.scaleFactorMax;
}

export function isZoomLevelGoingOutOfBounds(value, scaleFactor) {
  return lessThanScaleFactorMin(value, scaleFactor) && scaleFactor < 1 || moreThanScaleFactorMax(value, scaleFactor) && scaleFactor > 1;
}

export function limitZoomLevel(value, matrix) {
  let scaleLevel = matrix.a;

  if(value.scaleFactorMin != null) {
    // limit minimum zoom
    scaleLevel = Math.max(scaleLevel, value.scaleFactorMin);
  }

  if(value.scaleFactorMax != null) {
    // limit maximum zoom
    scaleLevel = Math.min(scaleLevel, value.scaleFactorMax);
  }

  return set(matrix, {
    a: scaleLevel,
    d: scaleLevel
  });
}

export function zoom(value, SVGPointX, SVGPointY, scaleFactor) {
  if (isZoomLevelGoingOutOfBounds(value, scaleFactor)) {
      // Do not change translation and scale of value
      return value;
  }

  const matrix = transform(
    fromObject(value),
    translate(SVGPointX, SVGPointY),
    scale(scaleFactor, scaleFactor),
    translate(-SVGPointX, -SVGPointY)
  );

  return set(value, {
    mode: MODE_IDLE,
    ...limitZoomLevel(value, matrix),
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, ACTION_ZOOM);
}

export function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  let {viewerWidth, viewerHeight} = value;

  let scaleX = viewerWidth / selectionWidth;
  let scaleY = viewerHeight / selectionHeight;

  let scaleLevel = Math.min(scaleX, scaleY);

  const matrix = transform(
    scale(scaleLevel, scaleLevel),                      //2
    translate(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  if(isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
    // Do not allow scale and translation
    return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }

  return set(value, {
    mode: MODE_IDLE,
    ...limitZoomLevel(value, matrix),
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, ACTION_ZOOM);
}

export function fitToViewer(value, SVGAlignX=ALIGN_LEFT, SVGAlignY=ALIGN_TOP) {
  let {viewerWidth, viewerHeight, SVGWidth, SVGHeight} = value;

  let scaleX = viewerWidth / SVGWidth;
  let scaleY = viewerHeight / SVGHeight;
  let scaleLevel = Math.min(scaleX, scaleY);

  const scaleMatrix = scale(scaleLevel, scaleLevel);
  let translationMatrix = translate(0, 0);

  // after fitting, SVG and the viewer will match in width (1) or in height (2)
  if (scaleX < scaleY) {
    //(1) match in width, meaning scaled SVGHeight <= viewerHeight
    let remainderY = viewerHeight - scaleX * SVGHeight;

    if (SVGAlignY === ALIGN_CENTER)
      translationMatrix = translate(0, Math.round(remainderY / 2));
    if (SVGAlignY === ALIGN_BOTTOM)
      translationMatrix = translate(0, remainderY);
  }
  else {
    //(2) match in height, meaning scaled SVGWidth <= viewerWidth
    let remainderX = viewerWidth - scaleY * SVGWidth;

    if (SVGAlignX === ALIGN_CENTER)
      translationMatrix = translate(Math.round(remainderX / 2), 0);
    if (SVGAlignX === ALIGN_RIGHT)
      translationMatrix = translate(remainderX, 0);
  }

  const matrix = transform(
    translationMatrix, //2
    scaleMatrix        //1
  );

  if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
    // Do not allow scale and translation
    return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }

  return set(value, {
    mode: MODE_IDLE,
    ...limitZoomLevel(value, matrix),
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, ACTION_ZOOM);
}

export function zoomOnViewerCenter(value, scaleFactor) {
  let {viewerWidth, viewerHeight} = value;
  let SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}

export function startZooming(value, viewerX, viewerY) {
  return set(value, {
    mode: MODE_ZOOMING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

export function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);

  return set(value, {
    endX: viewerX,
    endY: viewerY
  });
}

export function stopZooming(value, viewerX, viewerY, scaleFactor, props) {
  let {startX, startY, endX, endY} = value;

  let start = getSVGPoint(value, startX, startY);
  let end = getSVGPoint(value, endX, endY);

  if (Math.abs(startX - endX) > 7 && Math.abs(startY - endY) > 7) {
    let box = calculateBox(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    let SVGPoint = getSVGPoint(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
  }
}
