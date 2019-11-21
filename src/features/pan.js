import {ACTION_PAN, MODE_IDLE, MODE_PANNING, NULL_POSITION} from '../constants';
import {getSVGPoint} from './common';
import {fromObject, translate, transform, applyToPoints, inverse} from 'transformation-matrix';

/**
 *
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
export function pan(initialMatrix, delta, viewer, SVGAttributes, panLimit = undefined) {
  let matrix = transform(
    fromObject(initialMatrix),              //2
    translate(delta.x, delta.y) //1
  );

  // apply pan limits
  if (panLimit) {
    const {viewerWidth, viewerHeight} = viewer;
    const {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = SVGAttributes;

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
    last_action: ACTION_PAN
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

export function updatePanning(cursor, start, end, matrix, panLimit, mode, viewer, SVGAttributes) {
  if (mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + mode);

  let startPos = getSVGPoint(end.x, end.y, matrix);
  let endPos = getSVGPoint(cursor.x, cursor.y, matrix);

  let delta = {x: endPos.x - startPos.x, y: endPos.y - startPos.y};

  return {
    ...pan(matrix, delta, viewer, SVGAttributes, panLimit),
    mode: MODE_PANNING,
    end: cursor,
    last_action: ACTION_PAN
  };
}

export function stopPanning() {
  return {
    mode: MODE_IDLE,
    start: NULL_POSITION,
    end: NULL_POSITION,
    last_action: ACTION_PAN
  }
}

export function autoPanIfNeeded(viewer, pointer, matrix) {
  let deltaX = 0;
  let deltaY = 0;

  if (pointer.y <= 20) deltaY = 2;
  if (viewer.viewerWidth - pointer.x <= 20) deltaX = -2;
  if (viewer.viewerHeight - pointer.y <= 20) deltaY = -2;
  if (pointer.x <= 20) deltaX = 2;

  deltaX = deltaX / matrix.d;
  deltaY = deltaY / matrix.d;

  return (deltaX === 0 && deltaY === 0) ? {} : pan(matrix, {x: deltaX, y: deltaY}, null, viewer);
}
