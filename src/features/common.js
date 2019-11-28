import {MODE_IDLE} from '../constants';
import {applyToPoint, fromObject, identity, inverse, scale, transform, translate} from 'transformation-matrix';

const VERSION = 3
export const DEFAULT_MODE = MODE_IDLE

/**
 * Obtain default value
 * @returns {Object}
 */
export function getDefaultValue(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight, scaleFactorMin = null, scaleFactorMax = null) {
  return set({}, {
    ...identity(),
    version: VERSION,
    mode: DEFAULT_MODE,
    focus: false,
    pinchPointDistance: null,
    prePinchMode: null,
    viewerWidth,
    viewerHeight,
    SVGMinX,
    SVGMinY,
    SVGWidth,
    SVGHeight,
    scaleFactorMin,
    scaleFactorMax,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true,
    lastAction: null,
  });
}

/**
 * Change value
 * @param value
 * @param patch
 * @param action
 * @returns {Object}
 */
export function set(value, patch, action = null) {
  value = Object.assign({}, value, patch, {lastAction: action});
  return Object.freeze(value);
}

/**
 * value valid check
 * @param value
 */
export function isValueValid(value) {
  return value !== null
    && typeof value === 'object'
    && value.hasOwnProperty('version')
    && value.version === VERSION;
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
 * @param SVGMinX
 * @param SVGMinY
 * @param SVGWidth
 * @param SVGHeight
 * @returns {Object}
 */
export function setSVGViewBox(value, SVGMinX, SVGMinY, SVGWidth, SVGHeight) {
  return set(value, {SVGMinX, SVGMinY, SVGWidth, SVGHeight});
}

/**
 *
 * @param value
 * @param scaleFactorMin
 * @param scaleFactorMax
 * @returns {Object}
 */
//TODO rename to setZoomLimits
export function setZoomLevels(value, scaleFactorMin, scaleFactorMax) {
  return set(value, {scaleFactorMin, scaleFactorMax});
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
    mode: DEFAULT_MODE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  })
}
