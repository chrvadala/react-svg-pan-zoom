import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  MODE_PANNING,
  MODE_ZOOMING,
  MODE_IDLE
} from '../constants';
import {setFocus, setViewerCoords} from './common';
import {startPanning, updatePanning, stopPanning} from './pan';
import {startZooming, updateZooming, stopZooming, zoom} from './zoom';
import ViewerEvent from '../viewer-event';
import {mapRange} from '../utils'


export function onMouseDown(event, props, value) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {tool, onChange} = props;
  let nextValue = value;

  switch (tool) {
    case TOOL_NONE:
      return value;

    case TOOL_ZOOM_OUT:
      nextValue = zoom(value, x, y, 0.8);
      break;

    case TOOL_ZOOM_IN:
      nextValue = startZooming(value, x, y);
      break;

    case TOOL_PAN:
      nextValue = startPanning(value, x, y);
      break;
  }

  event.preventDefault();
  if (onChange) onChange(nextValue);
  return nextValue;
}

export function onMouseMove(event, props, value) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let forceExit = (event.buttons === 0); //the mouse exited and reentered into svg
  let {tool, onChange} = props;
  let nextValue = value;

  switch (tool) {
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
  if (onChange) onChange(nextValue);
  return nextValue;
}

export function onMouseUp(event, props, value) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {tool, onChange} = props;
  let nextValue = value;

  switch (tool) {
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
  if (onChange) onChange(nextValue);
  return nextValue;
}

export function onWheel(event, props, value) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {tool, onChange, detectWheel} = props;

  if (!detectWheel) return value;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  let scaleFactor = mapRange(delta, -1, 1, 1.06, 0.96);

  let nextValue = zoom(value, x, y, scaleFactor);

  event.preventDefault();
  if (onChange) onChange(nextValue);
  return nextValue;
}

export function onMouseEnterOrLeave(event, props, value) {
  let {tool, onChange} = props;

  let nextValue = setFocus(value, event.type === 'mouseenter');
  event.preventDefault();
  if (onChange) onChange(nextValue);
  return nextValue;
}
