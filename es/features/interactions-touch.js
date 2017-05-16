import { TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, MODE_IDLE, MODE_PANNING, MODE_ZOOMING } from '../constants';
import { resetMode, getSVGPoint, set } from './common';
import { onMouseDown, onMouseMove, onMouseUp } from './interactions';
import { zoom } from './zoom';

function onMultiTouchMove(event, ViewerDOM, tool, value, props) {
  var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin.left,
      top = _ViewerDOM$getBoundin.top;

  var x1 = event.touches[0].clientX - Math.round(left);
  var y1 = event.touches[0].clientY - Math.round(top);
  var x2 = event.touches[1].clientX - Math.round(left);
  var y2 = event.touches[1].clientY - Math.round(top);
  var pinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var previousPointDistance = !isNaN(value.pinchPointDistance) ? value.pinchPointDistance : pinchPointDistance;
  var svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
  var distanceFactor = pinchPointDistance / previousPointDistance;

  event.preventDefault();
  return zoom(value, svgPoint.x, svgPoint.y, distanceFactor, { mode: MODE_ZOOMING, pinchPointDistance: pinchPointDistance });
}

function isMultiTouch(event, props) {
  return props.detectPinchGesture && event.touches.length > 1;
}

export function onTouchStart(event, ViewerDOM, tool, value, props) {
  var x = void 0,
      y = void 0;
  if (event.touches.length === 1) {
    var touchPosition = event.touches[0];

    var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin2.left,
        top = _ViewerDOM$getBoundin2.top;

    x = touchPosition.clientX - Math.round(left);
    y = touchPosition.clientY - Math.round(top);
  } else if (isMultiTouch(event, props)) {
    return value;
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

  if (isMultiTouch(event, props)) {
    return onMultiTouchMove(event, ViewerDOM, tool, value, props);
  }

  var touchPosition = event.touches[0];

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
      return onMouseMove(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

export function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }

  var nextValue = set(value, {
    pinchPointDistance: !isNaN(value.pinchPointDistance) && props.detectPinchGesture && event.touches.length < 2 ? undefined : value.pinchPointDistance
  });

  if (event.touches.length > 0) {
    return nextValue;
  }

  var touchPosition = event.changedTouches[0];

  var _ViewerDOM$getBoundin4 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin4.left,
      top = _ViewerDOM$getBoundin4.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseUp(event, ViewerDOM, tool, nextValue, props, { x: x, y: y });

    default:
      return nextValue;
  }
}

export function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return resetMode(value);
}