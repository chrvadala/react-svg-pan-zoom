import { TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, MODE_IDLE, MODE_PANNING, MODE_ZOOMING } from '../constants';
import { resetMode, getSVGPoint, set } from './common';
import { onMouseDown, onMouseMove, onMouseUp } from './interactions';
import { zoom } from './zoom';

function hasPinchPointDistance(value) {
  return typeof value.pinchPointDistance === 'number';
}

function onMultiTouch(event, ViewerDOM, tool, value, props) {
  var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin.left,
      top = _ViewerDOM$getBoundin.top;

  var x1 = event.touches[0].clientX - Math.round(left);
  var y1 = event.touches[0].clientY - Math.round(top);
  var x2 = event.touches[1].clientX - Math.round(left);
  var y2 = event.touches[1].clientY - Math.round(top);
  var pinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var previousPointDistance = hasPinchPointDistance(value) ? value.pinchPointDistance : pinchPointDistance;
  var svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
  var distanceFactor = pinchPointDistance / previousPointDistance;

  if (distanceFactor === 1) {
    return set(value, { mode: MODE_ZOOMING, pinchPointDistance: pinchPointDistance });
  }

  event.preventDefault();
  return zoom(value, svgPoint.x, svgPoint.y, distanceFactor, {
    mode: MODE_ZOOMING,
    prePinchMode: value.mode === MODE_ZOOMING ? value.prePinchMode : value.mode,
    pinchPointDistance: pinchPointDistance
  });
}

function isMultiTouch(event, props) {
  return props.detectPinchGesture && event.touches.length > 1;
}

function shouldResetPinchPointDistance(event, value, props) {
  return props.detectPinchGesture && hasPinchPointDistance(value) && event.touches.length < 2;
}

function getTouchPosition(touch, ViewerDOM) {
  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin2.left,
      top = _ViewerDOM$getBoundin2.top;

  var x = touch.clientX - Math.round(left);
  var y = touch.clientY - Math.round(top);

  return { x: x, y: y };
}

function getNextValue(event, ViewerDOM, tool, value, props, nextValueFn) {
  var hasTouchPoints = event.touches.length > 0;
  var nextValue = hasTouchPoints ? value : set(value, { mode: value.prePinchMode });
  var touch = hasTouchPoints ? event.touches[0] : event.changedTouches[0];
  var touchPosition = getTouchPosition(touch, ViewerDOM);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return nextValueFn(event, ViewerDOM, tool, nextValue, props, touchPosition);

    default:
      return nextValue;
  }
}

export function onTouchStart(event, ViewerDOM, tool, value, props) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, value, props);
  }

  if (event.touches.length !== 1) {
    if ([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0) {
      return resetMode(value);
    } else if ([MODE_IDLE].indexOf(value.mode) >= 0) {
      return value;
    }
  }

  return getNextValue(event, ViewerDOM, tool, value, props, onMouseDown);
}

export function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, value, props);
  }

  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }

  return getNextValue(event, ViewerDOM, tool, value, props, onMouseMove);
}

export function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }

  var nextValue = shouldResetPinchPointDistance(event, value, props) ? set(value, { pinchPointDistance: null }) : value;

  if (event.touches.length > 0) {
    return nextValue;
  }

  return getNextValue(event, ViewerDOM, tool, nextValue, props, onMouseUp);
}

export function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return resetMode(value);
}