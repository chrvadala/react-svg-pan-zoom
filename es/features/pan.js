import { MODE_IDLE, MODE_PANNING } from '../constants';
import { set, getSVGPoint } from './common';
import { Matrix } from 'transformation-matrix-js';

/**
 *
 * @param value
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
export function pan(value, SVGDeltaX, SVGDeltaY) {
  var panLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = Matrix.from(a, b, c, d, e, f);

  var act = new Matrix();
  act = act.translate(SVGDeltaX, SVGDeltaY);

  matrix = matrix.multiply(act);

  // apply pan limits
  if (panLimit) {
    var zoomLevel = matrix.decompose(false).scale.x;
    matrix.e = Math.min(matrix.e, value.viewerWidth - panLimit);
    matrix.e = Math.max(matrix.e, panLimit - value.SVGWidth * zoomLevel);

    matrix.f = Math.min(matrix.f, value.viewerHeight - panLimit);
    matrix.f = Math.max(matrix.f, panLimit - value.SVGHeight * zoomLevel);
  }

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

export function startPanning(value, viewerX, viewerY) {
  return set(value, {
    mode: MODE_PANNING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

export function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

  var endX = value.endX,
      endY = value.endY;


  var start = getSVGPoint(value, endX, endY);
  var end = getSVGPoint(value, viewerX, viewerY);

  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;

  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return set(nextValue, {
    mode: MODE_PANNING,
    endX: viewerX,
    endY: viewerY
  });
}

export function stopPanning(value) {
  return set(value, {
    mode: MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

export function autoPanIfNeeded(value, viewerX, viewerY) {
  var deltaX = 0;
  var deltaY = 0;

  if (viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - viewerY <= 20) deltaY = -20;
  if (viewerX <= 20) deltaX = 20;

  return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
}