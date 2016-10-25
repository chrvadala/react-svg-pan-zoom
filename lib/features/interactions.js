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

var _viewerEvent = require('../viewer-event');

var _viewerEvent2 = _interopRequireDefault(_viewerEvent);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onMouseDown(event, props, SVG) {
  var x = event.nativeEvent.offsetX,
      y = event.nativeEvent.offsetY;
  var tool = props.tool,
      onChange = props.onChange,
      value = props.value;

  var nextValue = value;

  switch (tool) {
    case _constants.TOOL_NONE:
      return;

    case _constants.TOOL_ZOOM_OUT:
      nextValue = (0, _zoom.zoom)(value, x, y, 0.8);
      break;

    case _constants.TOOL_ZOOM_IN:
      nextValue = (0, _zoom.startZooming)(value, x, y);
      break;

    case _constants.TOOL_PAN:
      nextValue = (0, _pan.startPanning)(value, x, y);
      break;
  }

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new _viewerEvent2.default(event, nextValue, SVG));
}

function onMouseMove(event, props, SVG) {
  var x = event.nativeEvent.offsetX,
      y = event.nativeEvent.offsetY;
  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var tool = props.tool,
      onChange = props.onChange,
      value = props.value;

  var nextValue = value;

  switch (tool) {
    case _constants.TOOL_NONE:
      nextValue = (0, _common.setViewerCoords)(value, x, y);
      break;

    case _constants.TOOL_ZOOM_OUT:

      break;

    case _constants.TOOL_ZOOM_IN:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = forceExit ? (0, _zoom.stopZooming)(value, x, y, 1.1) : (0, _zoom.updateZooming)(value, x, y);
      break;

    case _constants.TOOL_PAN:
      if (value.mode === _constants.MODE_PANNING) nextValue = forceExit ? (0, _pan.stopPanning)(value) : (0, _pan.updatePanning)(value, x, y, 20);
      break;
  }

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new _viewerEvent2.default(event, nextValue, SVG));
}

function onMouseUp(event, props, SVG) {
  var x = event.nativeEvent.offsetX,
      y = event.nativeEvent.offsetY;
  var tool = props.tool,
      onChange = props.onChange,
      value = props.value;

  var nextValue = value;

  switch (tool) {
    case _constants.TOOL_NONE:
      return;

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

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new _viewerEvent2.default(event, nextValue, SVG));
}

function onWheel(event, props, SVG) {
  var x = event.nativeEvent.offsetX,
      y = event.nativeEvent.offsetY;
  var value = props.value,
      onChange = props.onChange,
      detectWheel = props.detectWheel;


  if (!detectWheel) return;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = (0, _utils.mapRange)(delta, -1, 1, 1.06, 0.96);

  var nextValue = (0, _zoom.zoom)(value, x, y, scaleFactor);
  event.preventDefault();
  onChange(new _viewerEvent2.default(event, nextValue, SVG));
}

function onMouseEnterOrLeave(event, props, SVG) {
  var value = props.value,
      onChange = props.onChange,
      detectWheel = props.detectWheel;


  if (!detectWheel) return;
  var nextValue = (0, _common.setFocus)(value, event.type === 'mouseenter');
  event.preventDefault();
  onChange(new _viewerEvent2.default(event, nextValue, SVG));
}