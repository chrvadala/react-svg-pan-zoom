import {
  TOOL_AUTO,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_PANNING,
  MODE_ZOOMING,
  MODE_IDLE
} from '../constants';
import {setViewerCoords, getSVGPoint} from './common';
import {startPanning, updatePanning, stopPanning, autoPanIfNeeded} from './pan';
import {startZooming, updateZooming, stopZooming, zoom} from './zoom';
import mapRange from '../utils/mapRange';


export function onMouseDown(event, ViewerDOM, tool, props, coords = null) {
  let x, y;
  if (coords) {
    ({x, y} = coords);
  } else {
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  let nextValue = {};

  switch (tool) {
    case TOOL_ZOOM_OUT:
      let SVGPoint = getSVGPoint(x, y, matrix);
      nextValue = zoom(matrix, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor, props);
      break;

    case TOOL_ZOOM_IN:
      nextValue = startZooming(x, y);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      nextValue = startPanning(x, y);
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseMove(event, ViewerDOM, tool, props, mode, coords = null) {
  let x, y;
  if (coords) {
    ({x, y} = coords);
  } else {
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  let forceExit = (event.buttons === 0); //the mouse exited and reentered into svg
  let nextValue = {};

  switch (tool) {
    case TOOL_ZOOM_IN:
      if (mode === MODE_ZOOMING)
        nextValue = forceExit ? stopZooming(x, y, props.scaleFactor, props) : updateZooming(x, y);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (mode === MODE_PANNING)
        nextValue = forceExit ? stopPanning() : updatePanning(x, y, props.preventPanOutside ? 20 : undefined);
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseUp(event, ViewerDOM, tool, props, mode, coords = null) {
  let x, y;
  if (coords) {
    ({x, y} = coords);
  } else {
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  let nextValue = {};

  switch (tool) {
    case TOOL_ZOOM_OUT:
      if (mode === MODE_ZOOMING)
        nextValue = stopZooming(x, y, 1 / props.scaleFactor, props);
      break;

    case TOOL_ZOOM_IN:
      if (mode === MODE_ZOOMING)
        nextValue = stopZooming(x, y, props.scaleFactor, props);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (mode === MODE_PANNING)
        nextValue = stopPanning(x, y);
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onDoubleClick(event, ViewerDOM, tool, props, mode, coords = null) {
  let x, y;
  if (coords) {
    ({x, y} = coords);
  } else {
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  let nextValue = {};

  switch (tool) {
    case TOOL_AUTO:
      if (!props.disableDoubleClickZoomWithToolAuto) {
        let SVGPoint = getSVGPoint(x, y);
        let modifierKeysReducer = (current, modifierKey) => current || event.getModifierState(modifierKey);
        let modifierKeyActive = props.modifierKeys.reduce(modifierKeysReducer, false);
        let scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
        nextValue = zoom(SVGPoint.x, SVGPoint.y, scaleFactor, props);
      }
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onWheel(event, ViewerDOM, tool, props, mode, coords = null) {
  let x, y;
  if (coords) {
    ({x, y} = coords);
  } else {
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  if (!props.detectWheel) return {};

  let delta = Math.max(-1, Math.min(1, event.deltaY));
  let scaleFactor = mapRange(delta, -1, 1, props.scaleFactorOnWheel, 1 / props.scaleFactorOnWheel);

  let SVGPoint = getSVGPoint(x, y);

  event.preventDefault();
  return zoom(SVGPoint.x, SVGPoint.y, scaleFactor, props);
}

export function onMouseEnterOrLeave(event, ViewerDOM, tool, props, mode, coords = null) {
  event.preventDefault();
  return {focus: event.type === 'mouseenter'};
}

export function onInterval(event, ViewerDOM, tool, props, mode, coords = null) {
  let {x, y} = coords;
  if (! ([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0) ) return {};
  if (!props.detectAutoPan) return {};
  if (!focus) return {};

  return autoPanIfNeeded(x, y);
}
