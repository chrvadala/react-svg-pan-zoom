import {ACTION_PAN, MODE_IDLE, MODE_PANNING} from '../constants';
import {getSVGPoint} from './common';
import {fromObject, translate, transform, applyToPoints, inverse} from 'transformation-matrix';

/**
 *
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
export function pan(initialMatrix, delta, SVGAttributes, viewer, panLimit = undefined) {
  let matrix = transform(
    fromObject(initialMatrix),              //2
    translate(delta.x, delta.y) //1
  );
  const {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = SVGAttributes;
  const {viewerWidth, viewerHeight} = viewer;

  // apply pan limits
  if (panLimit) {
    let [{x: x1, y: y1}, {x: x2, y: y2}] = applyToPoints(matrix, [
      {x: SVGMinX + panLimit, y: SVGMinY + panLimit},
      {x: SVGMinX + SVGWidth - panLimit, y: SVGMinY + SVGHeight - panLimit}
    ]);

    //x limit
    let moveX = 0;
    if (viewerWidth - x1 < 0)
      moveX = viewerWidth - x1;
    else if (x2 < 0) moveX = -x2;


    //y limit
    let moveY = 0;
    if (viewerHeight - y1 < 0)
      moveY = viewerHeight - y1;
    else if (y2 < 0) moveY = -y2;

    //apply limits
    matrix = transform(
      translate(moveX, moveY),
      matrix
    )
  }
  return {
    mode: MODE_IDLE,
    matrix,
    lastAction: ACTION_PAN
  };
}

export function startPanning(viewer) {
  return {
    mode: MODE_PANNING,
    start: viewer,
    end: viewer,
    last_action: ACTION_PAN
  };
}

export function updatePanning(start, end, viewerX, viewerY, matrix, panLimit, mode) {
  if (mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + mode);

  let startPos = getSVGPoint(end.x, end.y, matrix);
  let endPos = getSVGPoint(viewerX, viewerY, matrix);

  let deltaX = endPos.x - startPos.x;
  let deltaY = endPos.y - startPos.y;

  return {
    ...pan(deltaX, deltaY, panLimit),
    mode: MODE_PANNING,
    endX: viewerX,
    endY: viewerY,
    last_action: ACTION_PAN
  };
}

export function stopPanning() {
  return {
    mode: MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    last_action: ACTION_PAN
  }
}

export function autoPanIfNeeded(viewerWidth, viewerHeight, viewerX, viewerY, matrix) {
  let deltaX = 0;
  let deltaY = 0;

  if (viewerY <= 20) deltaY = 2;
  if (viewerWidth - viewerX <= 20) deltaX = -2;
  if (viewerHeight - viewerY <= 20) deltaY = -2;
  if (viewerX <= 20) deltaX = 2;

  deltaX = deltaX / matrix.d;
  deltaY = deltaY / matrix.d;

  return (deltaX === 0 && deltaY === 0) ? {} : pan(deltaX, deltaY);
}
