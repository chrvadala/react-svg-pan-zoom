import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_PANNING,
  MODE_ZOOMING,
  MODE_IDLE
} from '../constants';
import {setFocus, setViewerCoords, getSVGPoint} from './common';
import {startPanning, updatePanning, stopPanning} from './pan';
import {startZooming, updateZooming, stopZooming, zoom} from './zoom';
import {mapRange} from '../utils'


export function onMouseDown(event, viewerCoords, props, value) {
  let {x, y} = viewerCoords;

  let nextValue = value;

  switch (value.tool) {
    case TOOL_NONE:
      return value;

    case TOOL_ZOOM_OUT:
      let SVGPoint = getSVGPoint(value, x, y);
      nextValue = zoom(value, SVGPoint.x, SVGPoint.y, 0.8);
      break;

    case TOOL_ZOOM_IN:
      nextValue = startZooming(value, x, y);
      break;

    case TOOL_PAN:
      nextValue = startPanning(value, x, y);
      break;
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseMove(event, viewerCoords, props, value) {
  let {x, y} = viewerCoords;

  let forceExit = (event.buttons === 0); //the mouse exited and reentered into svg
  let nextValue = value;

  switch (value.tool) {
    case TOOL_NONE:
      return value;

    case TOOL_ZOOM_OUT:
      return value;

    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING)
        nextValue = forceExit ? stopZooming(value, x, y, 1.1) : updateZooming(value, x, y);
      break;

    case TOOL_PAN:
      if (value.mode === MODE_PANNING)
        nextValue = forceExit ? stopPanning(value) : updatePanning(value, x, y, 20);
      break;
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseUp(event, viewerCoords, props, value) {
  let {x, y} = viewerCoords;

  let nextValue = value;

  switch (value.tool) {
    case TOOL_NONE:
      return value;

    case TOOL_ZOOM_OUT:
      if (value.mode === MODE_ZOOMING)
        nextValue = stopZooming(value, x, y, 0.8);
      break;

    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING)
        nextValue = stopZooming(value, x, y, 1.1);
      break;

    case TOOL_PAN:
      if (value.mode === MODE_PANNING)
        nextValue = stopPanning(value, x, y);
      break;
  }

  event.preventDefault();
  return nextValue;
}

export function onWheel(event, viewerCoords, props, value) {
  let {x, y} = viewerCoords;

  if (!props.detectWheel) return value;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  let scaleFactor = mapRange(delta, -1, 1, 1.06, 0.96);

  let SVGPoint = getSVGPoint(value, x, y);
  let nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);

  event.preventDefault();
  return nextValue;
}

export function onMouseEnterOrLeave(event, viewerCoords, props, value) {
  let nextValue = setFocus(value, event.type === 'mouseenter');

  event.preventDefault();
  return nextValue;
}
