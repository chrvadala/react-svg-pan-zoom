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
export function getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, {
    ...identity(),
    version: 2,
    mode: MODE_IDLE,
    focus: false,
    viewerWidth,
    viewerHeight,
    SVGWidth,
    SVGHeight,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true
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

  let matrix = transform(
    translate(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2),   //4
    translate(SVGPointX, SVGPointY),                                          //3
    scale(zoomLevel, zoomLevel),                                              //2
    translate(-SVGPointX, -SVGPointY)                                         //1
  );

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
  });
}

/**
 *
 * @param value
 * @returns {Object}
 */
export function reset(value) {
  return set(value, {
    mode: MODE_IDLE,
    ...identity()
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
