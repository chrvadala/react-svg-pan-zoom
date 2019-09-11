import {TOOL_NONE, MODE_IDLE} from '../constants';
import {
  identity,
  fromObject,
  inverse,
  applyToPoint,
  transform,
  translate,
  scale
} from 'transformation-matrix';

/**
 * Obtain default value
 * @returns {Object}
 */
export function getDefaultValue(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax) {
  return {
    ...identity(),
    version: 2,
    mode: MODE_IDLE,
    focus: false,
    pinchPointDistance: null,
    prePinchMode: null,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true,
    lastAction: null,

    viewerWidth,
    viewerHeight,
    SVGMinX,
    SVGMinY,
    SVGWidth,
    SVGHeight,
    scaleFactorMin,
    scaleFactorMax,
  };
}

/**
 * value valid check
 * @param value
 */
export function isValueValid(value) {
  return value !== null
    && typeof value === 'object'
    && value.hasOwnProperty('version');
}

/**
 * Export x,y coords relative to SVG
 * @param value
 * @param viewerX
 * @param viewerY
 * @returns {*|{x, y}|{x: number, y: number}}
 */
export function getSVGPoint(value, viewerX, viewerY) {
  let matrix = fromObject(value);

  let inverseMatrix = inverse(matrix);
  return applyToPoint(inverseMatrix, {x: viewerX, y: viewerY});
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
export function decompose(value) {
  let matrix = fromObject(value);

  return {
    scaleFactor: matrix.a,
    translationX: matrix.e,
    translationY: matrix.f
  }
}

/**
 *
 * @param value
 * @param SVGPointX
 * @param SVGPointY
 * @param zoomLevel
 * @returns {Object}
 */
export function setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel) {
  let {viewerWidth, viewerHeight} = value;

  let matrix = transform(
    translate(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2),   //4
    translate(SVGPointX, SVGPointY),                                          //3
    scale(zoomLevel, zoomLevel),                                              //2
    translate(-SVGPointX, -SVGPointY)                                         //1
  );

  return {
    mode: MODE_IDLE,
    ...matrix,
  };
}

/**
 *
 * @returns {Object}
 */
export function reset() {
  return {
    mode: MODE_IDLE,
    ...identity()
  };
}

/**
 *
 * @returns {Object}
 */
export function resetMode() {
  return {
    mode: MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }
}
