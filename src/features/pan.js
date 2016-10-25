import {MODE_IDLE, MODE_PANNING} from '../constants';
import {getDefaultValue, set, getSVGPoint} from './common';
import {Matrix} from 'transformation-matrix-js';

/**
 *
 * @param value
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
export function pan(value, SVGDeltaX, SVGDeltaY, panLimit = undefined) {
  let {a, b, c, d, e, f} = value;
  let matrix = Matrix.from(a, b, c, d, e, f);

  let act = new Matrix();
  act = act.translate(SVGDeltaX, SVGDeltaY);

  matrix = matrix.multiply(act);

  // apply pan limits
  if(panLimit) {
    let zoomLevel = matrix.decompose(false).scale.x;
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
    startY: viewerY
  });
}

export function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

  let {startX, startY} = value;

  let start = getSVGPoint(value, startX, startY);
  let end = getSVGPoint(value, viewerX, viewerY);

  let deltaX = end.x - start.x;
  let deltaY = end.y - start.y;

  let nextValue = pan(value, deltaX, deltaY, panLimit);
  return set(nextValue, {
    mode: MODE_PANNING,
    startX: viewerX,
    startY: viewerY,
  });
}

export function stopPanning(value) {
  return set(value, {
      mode: MODE_IDLE,
      viewerStartX: null,
      viewerStartY: null
    }
  );
}

export function autoPanIfNeeded(value) {
  let deltaX = 0;
  let deltaY = 0;

  if (value.viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - value.viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - value.viewerY <= 20) deltaY = -20;
  if (value.viewerX <= 20) deltaX = 20;

  return (deltaX === 0 && deltaY === 0) ? value : pan(value, deltaX, deltaY);
}
