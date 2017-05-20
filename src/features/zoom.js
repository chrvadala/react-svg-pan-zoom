import {transform, fromObject, translate, scale} from 'transformation-matrix';

import {MODE_IDLE, MODE_ZOOMING} from '../constants';
import {set, getSVGPoint} from './common';
import {calculateBox} from '../utils';

export function zoom(value, SVGPointX, SVGPointY, scaleFactor) {

  let matrix = transform(
    fromObject(value),
    translate(SVGPointX, SVGPointY),
    scale(scaleFactor, scaleFactor),
    translate(-SVGPointX, -SVGPointY)
  )

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

export function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  let {viewerWidth, viewerHeight} = value;

  let scaleX = viewerWidth / selectionWidth;
  let scaleY = viewerHeight / selectionHeight;

  let scaleLevel = Math.min(scaleX, scaleY);

  let matrix = transform(
    scale(scaleLevel, scaleLevel),                      //2
    translate(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

export function fitToViewer(value) {
  return fitSelection(value, 0, 0, value.SVGWidth, value.SVGHeight);
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

export function stopZooming(value, viewerX, viewerY, scaleFactor) {
  let {startX, startY, endX, endY} = value;

  let start = getSVGPoint(value, startX, startY);
  let end = getSVGPoint(value, endX, endY);

  if (Math.abs(startX - endX) > 7 && Math.abs(startY - endY) > 7) {
    let box = calculateBox(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    let SVGPoint = getSVGPoint(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}
