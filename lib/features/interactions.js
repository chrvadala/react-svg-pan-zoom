'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onMouseDown = onMouseDown;
exports.onMouseMove = onMouseMove;
exports.onMouseUp = onMouseUp;
exports.onWheel = onWheel;
exports.onMouseEnterOrLeave = onMouseEnterOrLeave;

var _constants = require('../constants');

var _common = require('./common');

var _pan = require('./pan');

var _zoom = require('./zoom');

var _utils = require('../utils');

function onMouseDown(event, viewerCoords, props, value) {
  var x = viewerCoords.x,
      y = viewerCoords.y;


  var nextValue = value;

  switch (value.tool) {
    case _constants.TOOL_NONE:
      return value;

    case _constants.TOOL_ZOOM_OUT:
      var SVGPoint = (0, _common.getSVGPoint)(value, x, y);
      nextValue = (0, _zoom.zoom)(value, SVGPoint.x, SVGPoint.y, 0.8);
      break;

    case _constants.TOOL_ZOOM_IN:
      nextValue = (0, _zoom.startZooming)(value, x, y);
      break;

    case _constants.TOOL_PAN:
      nextValue = (0, _pan.startPanning)(value, x, y);
      break;
  }

  event.preventDefault();
  return nextValue;
}

function onMouseMove(event, viewerCoords, props, value) {
  var x = viewerCoords.x,
      y = viewerCoords.y;


  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var nextValue = value;

  switch (value.tool) {
    case _constants.TOOL_NONE:
      return value;

    case _constants.TOOL_ZOOM_OUT:
      return value;

    case _constants.TOOL_ZOOM_IN:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = forceExit ? (0, _zoom.stopZooming)(value, x, y, 1.1) : (0, _zoom.updateZooming)(value, x, y);
      break;

    case _constants.TOOL_PAN:
      if (value.mode === _constants.MODE_PANNING) nextValue = forceExit ? (0, _pan.stopPanning)(value) : (0, _pan.updatePanning)(value, x, y, 20);
      break;
  }

  event.preventDefault();
  return nextValue;
}

function onMouseUp(event, viewerCoords, props, value) {
  var x = viewerCoords.x,
      y = viewerCoords.y;


  var nextValue = value;

  switch (value.tool) {
    case _constants.TOOL_NONE:
      return value;

    case _constants.TOOL_ZOOM_OUT:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = (0, _zoom.stopZooming)(value, x, y, 0.8);
      break;

    case _constants.TOOL_ZOOM_IN:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = (0, _zoom.stopZooming)(value, x, y, 1.1);
      break;

    case _constants.TOOL_PAN:
      if (value.mode === _constants.MODE_PANNING) nextValue = (0, _pan.stopPanning)(value, x, y);
      break;
  }

  event.preventDefault();
  return nextValue;
}

function onWheel(event, viewerCoords, props, value) {
  var x = viewerCoords.x,
      y = viewerCoords.y;


  if (!props.detectWheel) return value;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = (0, _utils.mapRange)(delta, -1, 1, 1.06, 0.96);

  var SVGPoint = (0, _common.getSVGPoint)(value, x, y);
  var nextValue = (0, _zoom.zoom)(value, SVGPoint.x, SVGPoint.y, scaleFactor);

  event.preventDefault();
  return nextValue;
}

function onMouseEnterOrLeave(event, viewerCoords, props, value) {
  var nextValue = (0, _common.setFocus)(value, event.type === 'mouseenter');

  event.preventDefault();
  return nextValue;
}