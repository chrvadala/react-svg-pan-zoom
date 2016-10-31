'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getDefaultValue = getDefaultValue;
exports.set = set;
exports.isValueValid = isValueValid;
exports.getSVGPoint = getSVGPoint;
exports.decompose = decompose;
exports.setFocus = setFocus;
exports.setViewerSize = setViewerSize;
exports.sameValues = sameValues;
exports.changeTool = changeTool;

var _constants = require('../constants');

var _transformationMatrixJs = require('transformation-matrix-js');

/**
 * Obtain default value
 * @returns {Object}
 */
function getDefaultValue(tool, viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, {
    version: 2,
    tool: tool,
    mode: _constants.MODE_IDLE,
    focus: false,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    viewerWidth: viewerWidth,
    viewerHeight: viewerHeight,
    SVGWidth: SVGWidth,
    SVGHeight: SVGHeight,
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
function set(value, change) {
  value = Object.assign({}, value, change);
  return Object.freeze(value);
}

/**
 * value valid check
 * @param value
 */
function isValueValid(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.hasOwnProperty('version');
}

/**
 * Export x,y coords relative to SVG
 * @param value
 * @param viewerX
 * @param viewerY
 * @returns {*|{x, y}|{x: number, y: number}}
 */
function getSVGPoint(value, viewerX, viewerY) {
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

  var inverseMatrix = matrix.inverse();
  return inverseMatrix.applyToPoint(viewerX, viewerY);
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
function decompose(value) {
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

  var decompose = matrix.decompose(false);

  return {
    scaleFactor: decompose.scale.x,
    translationX: decompose.translate.x,
    translationY: decompose.translate.y
  };
}

/**
 *
 * @param value
 * @param focus
 * @returns {Object}
 */
function setFocus(value, focus) {
  return set(value, { focus: focus });
}

/**
 *
 * @param value
 * @param viewerWidth
 * @param viewerHeight
 * @returns {Object}
 */
function setViewerSize(value, viewerWidth, viewerHeight) {
  return set(value, { viewerWidth: viewerWidth, viewerHeight: viewerHeight });
}

/**
 *
 * @param value1
 * @param value2
 */
function sameValues(value1, value2) {
  return value1.version === value2.version && value1.tool === value2.tool && value1.mode === value2.mode && value1.focus === value2.focus && value1.a === value2.a && value1.b === value2.b && value1.c === value2.c && value1.d === value2.d && value1.e === value2.e && value1.f === value2.f && value1.viewerWidth === value2.viewerWidth && value1.viewerHeight === value2.viewerHeight && value1.SVGWidth === value2.SVGWidth && value1.SVGHeight === value2.SVGHeight && value1.startX === value2.startX && value1.startY === value2.startY && value1.endX === value2.endX && value1.endY === value2.endY;
}

/**
 *
 * @param value
 * @param tool
 */
function changeTool(value, tool) {
  return set(value, { tool: tool });
}