import {MODE_IDLE, MODE_PANNING} from '../constants';
import {set, getSVGPoint} from './common';
import {fromObject, translate, transform} from 'transformation-matrix';

/**
 *
 * @param value
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
export function pan(value, SVGDeltaX, SVGDeltaY, panLimit = undefined) {

  let matrix = transform(
    fromObject(value),              //2
    translate(SVGDeltaX, SVGDeltaY) //1
  );

  // apply pan limits
  if (panLimit) {
    //TODO
    let zoomLevel = matrix.a;
    matrix.e = Math.min(matrix.e, value.viewerWidth - panLimit);
    matrix.e = Math.max(matrix.e, panLimit - value.SVGWidth * zoomLevel);

    matrix.f = Math.min(matrix.f, value.viewerHeight - panLimit);
    matrix.f = Math.max(matrix.f, panLimit - value.SVGHeight * zoomLevel);
  }

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
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

  let {endX, endY} = value;

  let start = getSVGPoint(value, endX, endY);
  let end = getSVGPoint(value, viewerX, viewerY);

  let deltaX = end.x - start.x;
  let deltaY = end.y - start.y;

  let nextValue = pan(value, deltaX, deltaY, panLimit);
  return set(nextValue, {
    mode: MODE_PANNING,
    endX: viewerX,
    endY: viewerY,
  });
}

export function stopPanning(value) {
  return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }
  );
}

export function autoPanIfNeeded(value, viewerX, viewerY) {
  let deltaX = 0;
  let deltaY = 0;

  if (viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - viewerY <= 20) deltaY = -20;
  if (viewerX <= 20) deltaX = 20;

  return (deltaX === 0 && deltaY === 0) ? value : pan(value, deltaX, deltaY);
}
