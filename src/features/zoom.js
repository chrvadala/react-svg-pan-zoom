import {MODE_IDLE, MODE_ZOOMING} from '../constants';
import {getDefaultValue, set, getSVGPoint} from './common';
import {Matrix} from 'transformation-matrix-js';
import {calculateBox} from '../utils';

export function zoom(value, viewerX, viewerY, scaleFactor) {
  let {a, b, c, d, e, f} = value;
  let matrix = Matrix.from(a, b, c, d, e, f);

  let SVGPoint = getSVGPoint(value, viewerX, viewerY);

  let act = new Matrix();
  act = act.translate(SVGPoint.x, SVGPoint.y);
  act = act.scaleU(scaleFactor);
  act = act.translate(-SVGPoint.x, -SVGPoint.y);

  matrix = matrix.multiply(act);

  return set(value, {
    mode: MODE_IDLE,
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

export function fitSelection(value, selectionViewerX, selectionViewerY, selectionWidth, selectionHeight) {
  let {viewerWidth, viewerHeight} = value;

  let scaleX = viewerWidth / selectionWidth;
  let scaleY = viewerHeight / selectionHeight;

  let scale = Math.min(scaleX, scaleY);

  let matrix = new Matrix();
  matrix = matrix.scaleU(scale);
  matrix = matrix.translate(-selectionViewerX, -selectionViewerY);

  return set(value, {
    mode: MODE_IDLE,
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

export function fitToViewer(value) {
  return fitSelection(value, 0, 0, value.SVGWidth, value.SVGHeight);
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
    return zoom(value, viewerX, viewerY, scaleFactor);
  }
}
