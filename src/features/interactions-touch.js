import {
  TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING
} from '../constants';
import {resetMode, getSVGPoint, set} from './common';
import {onMouseDown, onMouseMove, onMouseUp} from './interactions';
import {zoom} from './zoom';

function hasPinchPointDistance(value) {
  return typeof value.pinchPointDistance === 'number';
}

function onMultiTouch(event, ViewerDOM, tool, value, props) {
  const {left, top} = ViewerDOM.getBoundingClientRect();
  const x1 = event.touches[0].clientX - Math.round(left);
  const y1 = event.touches[0].clientY - Math.round(top);
  const x2 = event.touches[1].clientX - Math.round(left);
  const y2 = event.touches[1].clientY - Math.round(top);
  const pinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const previousPointDistance = hasPinchPointDistance(value) ? value.pinchPointDistance : pinchPointDistance;
  const svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
  const distanceFactor = pinchPointDistance/previousPointDistance;
  const valuesToSet = {
    mode: MODE_ZOOMING,
    prePinchMode: value.mode === MODE_ZOOMING ? value.prePinchMode : value.mode,
    pinchPointDistance
  };

  if (distanceFactor === 1) {
    return set(value, valuesToSet);
  }

  event.preventDefault();
  return zoom(value, svgPoint.x, svgPoint.y, distanceFactor, valuesToSet);
}

function isMultiTouch(event, props) {
  return props.detectPinchGesture && event.touches.length > 1;
}

function shouldResetPinchPointDistance(event, value, props) {
  return props.detectPinchGesture && hasPinchPointDistance(value) && event.touches.length < 2;
}

function getTouchPosition(touch, ViewerDOM) {
  let {left, top} = ViewerDOM.getBoundingClientRect();
  let x = touch.clientX - Math.round(left);
  let y = touch.clientY - Math.round(top);

  return { x, y };
}

function getNextValue(event, ViewerDOM, tool, value, props, nextValueFn) {
  let hasTouchPoints = event.touches.length > 0;
  let nextValue = hasTouchPoints ? value : set(value, { mode: value.prePinchMode });
  let touch = hasTouchPoints ? event.touches[0] : event.changedTouches[0];
  let touchPosition = getTouchPosition(touch, ViewerDOM);

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
    if ([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0){
      return resetMode(value);
    } else if([MODE_IDLE].indexOf(value.mode) >= 0){
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

  let nextValue = shouldResetPinchPointDistance(event, value, props) ? set(value, { pinchPointDistance: null }) : value;

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
