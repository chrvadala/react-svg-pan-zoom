import {
  TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING
} from '../constants';
import {resetMode} from './common';
import {onMouseDown, onMouseMove, onMouseUp} from './interactions';

export function onTouchStart(event, ViewerDOM, tool, value, props) {
  let x, y;
  if (event.touches.length === 1) {
    let touchPosition = event.touches[0];
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = touchPosition.clientX - Math.round(left);
    y = touchPosition.clientY - Math.round(top);
  } else {
    if ( [MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0 ){
      return resetMode(value);
    }else if([MODE_IDLE].indexOf(value.mode) >= 0){
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
      return onMouseDown(event, ViewerDOM, tool, value, props, {x, y});

    default:
      return value;
  }
}

export function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  let touchPosition = event.touches[0];
  let {left, top} = ViewerDOM.getBoundingClientRect();
  let x = touchPosition.clientX - Math.round(left);
  let y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseMove(event, ViewerDOM, tool, value, props, {x, y});

    default:
      return value;
  }
}

export function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) return value;

  let touchPosition = event.changedTouches[0];
  let {left, top} = ViewerDOM.getBoundingClientRect();
  let x = touchPosition.clientX - Math.round(left);
  let y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return onMouseUp(event, ViewerDOM, tool, value, props, {x, y});

    default:
      return value;
  }
}

export function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return resetMode(value);
}

