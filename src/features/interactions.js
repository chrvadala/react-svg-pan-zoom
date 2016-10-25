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


export function onMouseDown(event, props, SVG) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {tool, onChange, value} = props;
  let nextValue = value;

  switch (tool) {
    case TOOL_NONE:
      return;

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

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new ViewerEvent(event, nextValue, SVG));
}

export function onMouseMove(event, props, SVG) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let forceExit = (event.buttons === 0); //the mouse exited and reentered into svg
  let {tool, onChange, value} = props;
  let nextValue = value;

  switch (tool) {
    case TOOL_NONE:
      nextValue = setViewerCoords(value, x, y);
      break;

    case TOOL_ZOOM_OUT:

      break;

    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING)
        nextValue = forceExit ? stopZooming(value, x, y, 1.1) : updateZooming(value, x, y);
      break;

    case TOOL_PAN:
      if (value.mode === MODE_PANNING)
        nextValue = forceExit ? stopPanning(value) : updatePanning(value, x, y, 20);
      break;
  }

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new ViewerEvent(event, nextValue, SVG));
}

export function onMouseUp(event, props, SVG) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {tool, onChange, value} = props;
  let nextValue = value;

  switch (tool) {
    case TOOL_NONE:
      return;

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

  if (value === nextValue) return;
  event.preventDefault();
  onChange(new ViewerEvent(event, nextValue, SVG));
}

export function onWheel(event, props, SVG) {
  let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
  let {value, onChange, detectWheel} = props;

  if (!detectWheel) return;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  let scaleFactor = mapRange(delta, -1, 1, 1.06, 0.96);

  let nextValue = zoom(value, x, y, scaleFactor);
  event.preventDefault();
  onChange(new ViewerEvent(event, nextValue, SVG));
}

export function onMouseEnterOrLeave(event, props, SVG) {
  let {value, onChange, detectWheel} = props;

  if (!detectWheel) return;
  let nextValue = setFocus(value, event.type === 'mouseenter');
  event.preventDefault();
  onChange(new ViewerEvent(event, nextValue, SVG));
}
