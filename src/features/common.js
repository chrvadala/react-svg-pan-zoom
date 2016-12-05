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
    startX: null,
    startY: null,
    endX: null,
    endY: null
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
 * @param value
 * @param SVGWidth
 * @param SVGHeight
 * @returns {Object}
 */
export function setSVGSize(value, SVGWidth, SVGHeight) {
  return set(value, {SVGWidth, SVGHeight});
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

  let matrix = new Matrix()
    .translate(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2)   //4
    .translate(SVGPointX, SVGPointY)                                          //3
    .scaleU(zoomLevel)                                                        //2
    .translate(-SVGPointX, -SVGPointY);                                       //1

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

/**
 *
 * @param value
 * @returns {Object}
 */
export function reset(value) {
  let matrix = new Matrix();

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

/**
 *
 * @param value
 * @returns {Object}
 */
export function resetMode(value) {
  return set(value, {
    mode: MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  })
}
