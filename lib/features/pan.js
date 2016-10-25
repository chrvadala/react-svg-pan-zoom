'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pan = pan;
exports.startPanning = startPanning;
exports.updatePanning = updatePanning;
exports.stopPanning = stopPanning;
exports.autoPanIfNeeded = autoPanIfNeeded;

var _constants = require('../constants');

var _common = require('./common');

var _transformationMatrixJs = require('transformation-matrix-js');

/**
 *
 * @param value
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
function pan(value, SVGDeltaX, SVGDeltaY) {
  var panLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

  var act = new _transformationMatrixJs.Matrix();
  act = act.translate(SVGDeltaX, SVGDeltaY);

  matrix = matrix.multiply(act);

  // apply pan limits
  if (panLimit) {
    var zoomLevel = matrix.decompose(false).scale.x;
    matrix.e = Math.min(matrix.e, value.viewerWidth - panLimit);
    matrix.e = Math.max(matrix.e, panLimit - value.SVGWidth * zoomLevel);

    matrix.f = Math.min(matrix.f, value.viewerHeight - panLimit);
    matrix.f = Math.max(matrix.f, panLimit - value.SVGHeight * zoomLevel);
  }

  return (0, _common.set)(value, {
    mode: _constants.MODE_IDLE,
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

function startPanning(value, viewerX, viewerY) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_PANNING,
    startX: viewerX,
    startY: viewerY
  });
}

function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== _constants.MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

  var startX = value.startX,
      startY = value.startY;


  var start = (0, _common.getSVGPoint)(value, startX, startY);
  var end = (0, _common.getSVGPoint)(value, viewerX, viewerY);

  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;

  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return (0, _common.set)(nextValue, {
    mode: _constants.MODE_PANNING,
    startX: viewerX,
    startY: viewerY
  });
}

function stopPanning(value) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_IDLE,
    viewerStartX: null,
    viewerStartY: null
  });
}

function autoPanIfNeeded(value) {
  var deltaX = 0;
  var deltaY = 0;

  if (value.viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - value.viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - value.viewerY <= 20) deltaY = -20;
  if (value.viewerX <= 20) deltaX = 20;

  return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
}