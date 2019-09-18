import {transform, fromObject, translate, scale} from 'transformation-matrix';
import {
  TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING
} from '../constants';
import {resetMode, getSVGPoint} from './common';
import {onMouseDown, onMouseMove, onMouseUp} from './interactions';
import {isZoomLevelGoingOutOfBounds, limitZoomLevel} from './zoom';

function hasPinchPointDistance(pinchPointDistance) {
  return typeof pinchPointDistance === 'number';
}

function onMultiTouch(event, ViewerDOM, tool, props, mode, matrix, prePinchMode) {
  const {left, top} = ViewerDOM.getBoundingClientRect();
  const x1 = event.touches[0].clientX - Math.round(left);
  const y1 = event.touches[0].clientY - Math.round(top);
  const x2 = event.touches[1].clientX - Math.round(left);
  const y2 = event.touches[1].clientY - Math.round(top);
  const thisPinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const previousPointDistance = hasPinchPointDistance(pinchPointDistance) ? pinchPointDistance : thisPinchPointDistance;
  const svgPoint = getSVGPoint((x1 + x2) / 2, (y1 + y2) / 2, matrix);
  let distanceFactor = pinchPointDistance/previousPointDistance;

  if (isZoomLevelGoingOutOfBounds(distanceFactor)) {
    return {};
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  let newMatrix = transform(
    fromObject(matrix),
    translate(svgPoint.x, svgPoint.y),
    scale(distanceFactor, distanceFactor),
    translate(-svgPoint.x, -svgPoint.y)
  );

  return {
    mode: MODE_ZOOMING,
    ...limitZoomLevel(newMatrix),
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    prePinchMode: prePinchMode ? prePinchMode : mode,
    pinchPointDistance
  };
}

function isMultiTouch(event, props) {
  return props.detectPinchGesture && event.touches.length > 1;
}

function shouldResetPinchPointDistance(event, pinchPointDistance, props) {
  return props.detectPinchGesture && hasPinchPointDistance(pinchPointDistance) && event.touches.length < 2;
}

function getTouchPosition(touch, ViewerDOM) {
  let {left, top} = ViewerDOM.getBoundingClientRect();
  let x = touch.clientX - Math.round(left);
  let y = touch.clientY - Math.round(top);

  return { x, y };
}

function getNextValue(event, ViewerDOM, tool, props, mode, prePinchMode, nextValueFn) {
  let nextValue = event.touches.length === 0 ? { mode: prePinchMode ? MODE_IDLE : mode, prePinchMode: null } : {};
  let touch = event.touches.length > 0 ? event.touches[0] : event.changedTouches[0];
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

export function onTouchStart(event, ViewerDOM, tool, props, mode) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, props);
  }

  if (event.touches.length !== 1) {
    if ([MODE_PANNING, MODE_ZOOMING].indexOf(mode) >= 0){
      return resetMode();
    } else if([MODE_IDLE].indexOf(mode) >= 0){
      return {};
    }
  }

  return getNextValue(event, ViewerDOM, tool, props, onMouseDown);
}

export function onTouchMove(event, ViewerDOM, tool, props, mode) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, props);
  }

  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(mode) >= 0)) {
    return {};
  }

  return getNextValue(event, ViewerDOM, tool, props, onMouseMove);
}

export function onTouchEnd(event, ViewerDOM, tool, props, mode, pinchPointDistance) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(mode) >= 0)) {
    return {};
  }

  const nextValue = shouldResetPinchPointDistance(event, pinchPointDistance, props) ? { pinchPointDistance: null } : {};

  if (event.touches.length > 0) {
    return nextValue;
  }

  return getNextValue(event, ViewerDOM, tool, nextValue, props, onMouseUp);
}

export function onTouchCancel(event, ViewerDOM, tool, props) {
  event.stopPropagation();
  event.preventDefault();

  return resetMode();
}
