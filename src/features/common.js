import {TOOL_NONE, MODE_IDLE} from '../constants';
import {Matrix} from 'transformation-matrix-js';

/**
 * Obtain default value
 * @returns {Object}
 */
export function getDefaultValue(tool, viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, {
    version: 2,
    tool,
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
export function setViewerSize(value, viewerWidth, viewerHeight){
  return set(value, {viewerWidth, viewerHeight});
}

/**
 *
 * @param value1
 * @param value2
 */
export function sameValues(value1, value2){
  let r = true;
  let keys = Object.keys(value1);
  keys.forEach(key => r = r && value1[key] === value2[key]);
  return r;
}

/**
 *
 * @param value
 * @param tool
 */
export function changeTool(value, tool){
  return set(value, {tool});
}
