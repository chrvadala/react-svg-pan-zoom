'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.zoom = zoom;
exports.fitSelection = fitSelection;
exports.fitToViewer = fitToViewer;
exports.zoomOnViewerCenter = zoomOnViewerCenter;
exports.startZooming = startZooming;
exports.updateZooming = updateZooming;
exports.stopZooming = stopZooming;

var _transformationMatrix = require('transformation-matrix');

var _constants = require('../constants');

var _common = require('./common');

var _utils = require('../utils');

function zoom(value, SVGPointX, SVGPointY, scaleFactor) {

  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.fromObject)(value), (0, _transformationMatrix.translate)(SVGPointX, SVGPointY), (0, _transformationMatrix.scale)(scaleFactor, scaleFactor), (0, _transformationMatrix.translate)(-SVGPointX, -SVGPointY));

  return (0, _common.set)(value, _extends({
    mode: _constants.MODE_IDLE
  }, matrix, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }));
}

function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var scaleX = viewerWidth / selectionWidth;
  var scaleY = viewerHeight / selectionHeight;

  var scaleLevel = Math.min(scaleX, scaleY);

  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.scale)(scaleLevel, scaleLevel), //2
  (0, _transformationMatrix.translate)(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  return (0, _common.set)(value, _extends({
    mode: _constants.MODE_IDLE
  }, matrix, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }));
}

function fitToViewer(value) {
  return fitSelection(value, 0, 0, value.SVGWidth, value.SVGHeight);
}

function zoomOnViewerCenter(value, scaleFactor) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;

  var SVGPoint = (0, _common.getSVGPoint)(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}

function startZooming(value, viewerX, viewerY) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_ZOOMING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== _constants.MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);

  return (0, _common.set)(value, {
    endX: viewerX,
    endY: viewerY
  });
}

function stopZooming(value, viewerX, viewerY, scaleFactor) {
  var startX = value.startX,
      startY = value.startY,
      endX = value.endX,
      endY = value.endY;


  var start = (0, _common.getSVGPoint)(value, startX, startY);
  var end = (0, _common.getSVGPoint)(value, endX, endY);

  if (Math.abs(startX - endX) > 7 && Math.abs(startY - endY) > 7) {
    var box = (0, _utils.calculateBox)(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    var SVGPoint = (0, _common.getSVGPoint)(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}