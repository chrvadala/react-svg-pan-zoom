import { TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, MODE_PANNING, MODE_ZOOMING, MODE_IDLE } from '../constants';
import { setFocus, setViewerCoords, getSVGPoint } from './common';
import { startPanning, updatePanning, stopPanning, autoPanIfNeeded } from './pan';
import { startZooming, updateZooming, stopZooming, zoom } from './zoom';
import { mapRange } from '../utils';

export function onMouseDown(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin.left,
        top = _ViewerDOM$getBoundin.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case TOOL_ZOOM_OUT:
      var SVGPoint = getSVGPoint(value, x, y);
      nextValue = zoom(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor);
      break;

    case TOOL_ZOOM_IN:
      nextValue = startZooming(value, x, y);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      nextValue = startPanning(value, x, y);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseMove(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin2.left,
        top = _ViewerDOM$getBoundin2.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var nextValue = value;

  switch (tool) {
    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING) nextValue = forceExit ? stopZooming(value, x, y, props.scaleFactor) : updateZooming(value, x, y);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (value.mode === MODE_PANNING) nextValue = forceExit ? stopPanning(value) : updatePanning(value, x, y, props.preventPanOutside ? 20 : undefined);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseUp(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin3.left,
        top = _ViewerDOM$getBoundin3.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case TOOL_ZOOM_OUT:
      if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, 1 / props.scaleFactor);
      break;

    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, props.scaleFactor);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (value.mode === MODE_PANNING) nextValue = stopPanning(value, x, y);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

export function onDoubleClick(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin4 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin4.left,
        top = _ViewerDOM$getBoundin4.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case TOOL_AUTO:
      var SVGPoint = getSVGPoint(value, x, y);
      var modifierKeysReducer = function modifierKeysReducer(current, modifierKey) {
        return current || event.getModifierState(modifierKey);
      };
      var modifierKeyActive = props.modifierKeys.reduce(modifierKeysReducer, false);
      var scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
      nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

export function onWheel(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin5 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin5.left,
        top = _ViewerDOM$getBoundin5.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  if (!props.detectWheel) return value;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = mapRange(delta, -1, 1, 1.06, 0.96);

  var SVGPoint = getSVGPoint(value, x, y);
  var nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);

  event.preventDefault();
  return nextValue;
}

export function onMouseEnterOrLeave(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var nextValue = setFocus(value, event.type === 'mouseenter');

  event.preventDefault();
  return nextValue;
}

export function onInterval(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var x = coords.x,
      y = coords.y;


  if (!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0)) return value;
  if (!props.detectAutoPan) return value;
  if (!value.focus) return value;

  return autoPanIfNeeded(value, x, y);
}