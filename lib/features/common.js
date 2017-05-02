'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getDefaultValue = getDefaultValue;
exports.set = set;
exports.isValueValid = isValueValid;
exports.getSVGPoint = getSVGPoint;
exports.decompose = decompose;
exports.setFocus = setFocus;
exports.setViewerSize = setViewerSize;
exports.setSVGSize = setSVGSize;
exports.setPointOnViewerCenter = setPointOnViewerCenter;
exports.reset = reset;
exports.resetMode = resetMode;

var _constants = require('../constants');

var _transformationMatrix = require('transformation-matrix');

/**
 * Obtain default value
 * @returns {Object}
 */
function getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, _extends({}, (0, _transformationMatrix.identity)(), {
    version: 2,
    mode: _constants.MODE_IDLE,
    focus: false,
    viewerWidth: viewerWidth,
    viewerHeight: viewerHeight,
    SVGWidth: SVGWidth,
    SVGHeight: SVGHeight,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true
  }));
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
  var matrix = (0, _transformationMatrix.fromObject)(value);

  var inverseMatrix = (0, _transformationMatrix.inverse)(matrix);
  return (0, _transformationMatrix.applyToPoint)(inverseMatrix, { x: viewerX, y: viewerY });
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
function decompose(value) {
  var matrix = (0, _transformationMatrix.fromObject)(value);

  return {
    scaleFactor: matrix.a,
    translationX: matrix.e,
    translationY: matrix.f
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
 * @param value
 * @param SVGWidth
 * @param SVGHeight
 * @returns {Object}
 */
function setSVGSize(value, SVGWidth, SVGHeight) {
  return set(value, { SVGWidth: SVGWidth, SVGHeight: SVGHeight });
}

/**
 *
 * @param value
 * @param SVGPointX
 * @param SVGPointY
 * @param zoomLevel
 * @returns {Object}
 */
function setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2), //4
  (0, _transformationMatrix.translate)(SVGPointX, SVGPointY), //3
  (0, _transformationMatrix.scale)(zoomLevel, zoomLevel), //2
  (0, _transformationMatrix.translate)(-SVGPointX, -SVGPointY) //1
  );

  return set(value, _extends({
    mode: _constants.MODE_IDLE
  }, matrix));
}

/**
 *
 * @param value
 * @returns {Object}
 */
function reset(value) {
  return set(value, _extends({
    mode: _constants.MODE_IDLE
  }, (0, _transformationMatrix.identity)()));
}

/**
 *
 * @param value
 * @returns {Object}
 */
function resetMode(value) {
  return set(value, {
    mode: _constants.MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}