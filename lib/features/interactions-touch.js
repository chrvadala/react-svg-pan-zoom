'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTouchStart = onTouchStart;
exports.onTouchMove = onTouchMove;
exports.onTouchEnd = onTouchEnd;
exports.onTouchCancel = onTouchCancel;

var _constants = require('../constants');

var _common = require('./common');

var _interactions = require('./interactions');

function onTouchStart(event, ViewerDOM, tool, value, props) {
  var x = void 0,
      y = void 0;
  if (event.touches.length === 1) {
    var touchPosition = event.touches[0];

    var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin.left,
        top = _ViewerDOM$getBoundin.top;

    x = touchPosition.clientX - Math.round(left);
    y = touchPosition.clientY - Math.round(top);
  } else {
    if ([_constants.MODE_PANNING, _constants.MODE_ZOOMING].indexOf(value.mode) >= 0) {
      return (0, _common.resetMode)(value);
    } else if ([_constants.MODE_IDLE].indexOf(value.mode) >= 0) {
      return value;
    }
  }

  switch (tool) {
    case _constants.TOOL_ZOOM_OUT:
    case _constants.TOOL_ZOOM_IN:
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return (0, _interactions.onMouseDown)(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (!([_constants.MODE_PANNING, _constants.MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.touches[0];

  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin2.left,
      top = _ViewerDOM$getBoundin2.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case _constants.TOOL_ZOOM_OUT:
    case _constants.TOOL_ZOOM_IN:
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return (0, _interactions.onMouseMove)(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([_constants.MODE_PANNING, _constants.MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.changedTouches[0];

  var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin3.left,
      top = _ViewerDOM$getBoundin3.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case _constants.TOOL_ZOOM_OUT:
    case _constants.TOOL_ZOOM_IN:
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return (0, _interactions.onMouseUp)(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return (0, _common.resetMode)(value);
}