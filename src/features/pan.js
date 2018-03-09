import {ACTION_PAN, MODE_IDLE, MODE_PANNING} from '../constants';
import {set, getSVGPoint} from './common';
import {fromObject, translate, transform, applyToPoints, inverse} from 'transformation-matrix';

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
    let [{x: x1, y: y1}, {x: x2, y: y2}] = applyToPoints(matrix, [
      {x: panLimit, y: panLimit},
      {x: value.SVGWidth - panLimit, y: value.SVGHeight - panLimit}
    ]);

    //x limit
    let moveX = 0;
    if (value.viewerWidth - x1 < 0)
      moveX = value.viewerWidth - x1;
    else if (x2 < 0) moveX = -x2;


    //y limit
    let moveY = 0;
    if (value.viewerHeight - y1 < 0)
      moveY = value.viewerHeight - y1;
    else if (y2 < 0) moveY = -y2;

    //apply limits
    matrix = transform(
      translate(moveX, moveY),
      matrix
    )
  }

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
  }, ACTION_PAN);
}

export function startPanning(value, viewerX, viewerY) {
  return set(value, {
    mode: MODE_PANNING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  }, ACTION_PAN);
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
  }, ACTION_PAN);
}

export function stopPanning(value) {
  return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }, ACTION_PAN
  );
}

export function autoPanIfNeeded(value, viewerX, viewerY) {
  let deltaX = 0;
  let deltaY = 0;

  if (viewerY <= 20) deltaY = 2;
  if (value.viewerWidth - viewerX <= 20) deltaX = -2;
  if (value.viewerHeight - viewerY <= 20) deltaY = -2;
  if (viewerX <= 20) deltaX = 2;

  deltaX = deltaX / value.d;
  deltaY = deltaY / value.d;

  return (deltaX === 0 && deltaY === 0) ? value : pan(value, deltaX, deltaY);
}
