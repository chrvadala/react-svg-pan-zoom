'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.pan = pan;
exports.startPanning = startPanning;
exports.updatePanning = updatePanning;
exports.stopPanning = stopPanning;
exports.autoPanIfNeeded = autoPanIfNeeded;

var _constants = require('../constants');

var _common = require('./common');

var _transformationMatrix = require('transformation-matrix');

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


  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.fromObject)(value), //2
  (0, _transformationMatrix.translate)(SVGDeltaX, SVGDeltaY) //1
  );

  // apply pan limits
  if (panLimit) {
    var _applyToPoints = (0, _transformationMatrix.applyToPoints)(matrix, [{ x: panLimit, y: panLimit }, { x: value.SVGWidth - panLimit, y: value.SVGHeight - panLimit }]),
        _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
        _applyToPoints2$ = _applyToPoints2[0],
        x1 = _applyToPoints2$.x,
        y1 = _applyToPoints2$.y,
        _applyToPoints2$2 = _applyToPoints2[1],
        x2 = _applyToPoints2$2.x,
        y2 = _applyToPoints2$2.y;

    //x limit


    var moveX = 0;
    if (value.viewerWidth - x1 < 0) moveX = value.viewerWidth - x1;else if (x2 < 0) moveX = -x2;

    //y limit
    var moveY = 0;
    if (value.viewerHeight - y1 < 0) moveY = value.viewerHeight - y1;else if (y2 < 0) moveY = -y2;

    //apply limits
    matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(moveX, moveY), matrix);
  }

  return (0, _common.set)(value, _extends({
    mode: _constants.MODE_IDLE
  }, matrix));
}

function startPanning(value, viewerX, viewerY) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_PANNING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== _constants.MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

  var endX = value.endX,
      endY = value.endY;


  var start = (0, _common.getSVGPoint)(value, endX, endY);
  var end = (0, _common.getSVGPoint)(value, viewerX, viewerY);

  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;

  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return (0, _common.set)(nextValue, {
    mode: _constants.MODE_PANNING,
    endX: viewerX,
    endY: viewerY
  });
}

function stopPanning(value) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

function autoPanIfNeeded(value, viewerX, viewerY) {
  var deltaX = 0;
  var deltaY = 0;

  if (viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - viewerY <= 20) deltaY = -20;
  if (viewerX <= 20) deltaX = 20;

  return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
}