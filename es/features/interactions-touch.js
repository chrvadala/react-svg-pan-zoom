import { TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, MODE_IDLE, MODE_PANNING, MODE_ZOOMING } from '../constants';
import { resetMode } from './common';
import { onMouseDown, onMouseMove, onMouseUp } from './interactions';

export function onTouchStart(event, ViewerDOM, tool, value, props) {
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
    if ([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0) {
      return resetMode(value);
    } else if ([MODE_IDLE].indexOf(value.mode) >= 0) {
      return value;
    }
  }

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseDown(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

export function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.touches[0];

  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin2.left,
      top = _ViewerDOM$getBoundin2.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseMove(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

export function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.changedTouches[0];

  var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin3.left,
      top = _ViewerDOM$getBoundin3.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseUp(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

export function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return resetMode(value);
}