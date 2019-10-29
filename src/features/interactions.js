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
import {setViewerCoords, getSVGPoint, getCursorPosition} from './common';
import {startPanning, updatePanning, stopPanning} from './pan';
import {startZooming, updateZooming, stopZooming, zoom} from './zoom';
import mapRange from '../utils/mapRange';


export function onMouseDown(event, boundingRect, matrix, tool, props, mode) {
  const cursurPosition = getCursorPosition(event, boundingRect);
  let nextValue = {};
  switch (tool) {
    case TOOL_ZOOM_OUT:
      const {x, y} = cursurPosition;
      const SVGPoint = getSVGPoint(x, y, matrix);
      nextValue = zoom(matrix, SVGPoint, 1 / props.scaleFactor);
      break;

    case TOOL_ZOOM_IN:
      nextValue = startZooming(cursurPosition);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      nextValue = startPanning(cursurPosition);
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseMove(event, boundingRect, matrix, tool, props, mode, start, end, viewer, SVGAttributes) {
  const cursurPosition = getCursorPosition(event, boundingRect);
  const forceExit = (event.buttons === 0); //the mouse exited and reentered into svg
  let nextValue = {};

  switch (tool) {
    case TOOL_ZOOM_IN:
      if (mode === MODE_ZOOMING)
        nextValue = forceExit ? stopZooming(cursurPosition, start, end, matrix, props.scaleFactor, props, viewer) : updateZooming(mode, cursurPosition);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (mode === MODE_PANNING)
        nextValue = forceExit ? stopPanning() : updatePanning(cursurPosition, start, end, matrix, props.preventPanOutside ? 20 : undefined, mode, viewer, SVGAttributes);
      break;
    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onMouseUp(event, boundingRect, matrix, tool, props, mode, start, end, viewer) {
  const cursurPosition = getCursorPosition(event, boundingRect);
  let nextValue = {};
  switch (tool) {
    case TOOL_ZOOM_OUT:
      if (mode === MODE_ZOOMING)
        nextValue = stopZooming(cursurPosition, start, end, matrix, 1 / props.scaleFactor, props, viewer);
      break;

    case TOOL_ZOOM_IN:
      if (mode === MODE_ZOOMING)
        nextValue = stopZooming(cursurPosition, start, end, matrix, props.scaleFactor, props, viewer);
      break;

    case TOOL_AUTO:
    case TOOL_PAN:
      if (mode === MODE_PANNING)
        nextValue = stopPanning();
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onDoubleClick(event, boundingRect, matrix, tool, props, mode) {
  const cursurPosition = getCursorPosition(event, boundingRect);
  const {x, y} = cursurPosition;

  let nextValue = {};
  switch (tool) {
    case TOOL_AUTO:
      if (!props.disableDoubleClickZoomWithToolAuto) {
        const SVGPoint = getSVGPoint(x, y);
        const modifierKeysReducer = (current, modifierKey) => current || event.getModifierState(modifierKey);
        const modifierKeyActive = props.modifierKeys.reduce(modifierKeysReducer, false);
        const scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
        nextValue = zoom(SVGPoint.x, SVGPoint.y, scaleFactor, props);
      }
      break;

    default:
      return {};
  }

  event.preventDefault();
  return nextValue;
}

export function onWheel(event, boundingRect, matrix, tool, props, mode) {
  const cursurPosition = getCursorPosition(event, boundingRect);
  const {x, y} = cursurPosition;

  if (!props.detectWheel) return {};

  const delta = Math.max(-1, Math.min(1, event.deltaY));
  const scaleFactor = mapRange(delta, -1, 1, props.scaleFactorOnWheel, 1 / props.scaleFactorOnWheel);
  const SVGPoint = getSVGPoint(x, y, matrix);

  event.preventDefault();
  return zoom(matrix, SVGPoint, scaleFactor);
}

export function onMouseEnterOrLeave(event, boundingRect, matrix, tool, props, mode) {
  event.preventDefault();
  return {focus: event.type === 'mouseenter'};
}
