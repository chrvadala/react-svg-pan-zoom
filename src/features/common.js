import {TOOL_NONE, MODE_IDLE} from '../constants';
import {Matrix} from 'transformation-matrix-js';

/**
 * Obtain default value
 * @returns {Object}
 */
export function getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, {
    version: 2,
    mode: MODE_IDLE,
    focus: false,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    viewerWidth,
    viewerHeight,
    SVGWidth,
    SVGHeight,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  });
}

/**
 * Change value
 * @param value
 * @param change
 * @returns {Object}
 */
export function set(value, change) {
  value = Object.assign({}, value, change);
  return Object.freeze(value);
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
  let {a, b, c, d, e, f} = value;
  let matrix = Matrix.from(a, b, c, d, e, f);

  let inverseMatrix = matrix.inverse();
  return inverseMatrix.applyToPoint(viewerX, viewerY);
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
export function decompose(value) {
  let {a, b, c, d, e, f} = value;
  let matrix = Matrix.from(a, b, c, d, e, f);

  let decompose = matrix.decompose(false);

  return {
    scaleFactor: decompose.scale.x,
    translationX: decompose.translate.x,
    translationY: decompose.translate.y
  }
}

/**
 *
 * @param value
 * @param focus
 * @returns {Object}
 */
export function setFocus(value, focus) {
  return set(value, {focus});
}


/**
 *
 * @param value
 * @param viewerWidth
 * @param viewerHeight
 * @returns {Object}
 */
export function setViewerSize(value, viewerWidth, viewerHeight) {
  return set(value, {viewerWidth, viewerHeight});
}

/**
 *
 * @param value1
 * @param value2
 */
export function sameValues(value1, value2) {
  return value1.version === value2.version
    && value1.mode === value2.mode
    && value1.focus === value2.focus
    && value1.a === value2.a
    && value1.b === value2.b
    && value1.c === value2.c
    && value1.d === value2.d
    && value1.e === value2.e
    && value1.f === value2.f
    && value1.viewerWidth === value2.viewerWidth
    && value1.viewerHeight === value2.viewerHeight
    && value1.SVGWidth === value2.SVGWidth
    && value1.SVGHeight === value2.SVGHeight
    && value1.startX === value2.startX
    && value1.startY === value2.startY
    && value1.endX === value2.endX
    && value1.endY === value2.endY;
}
