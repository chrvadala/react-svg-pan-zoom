import {
  TOOL_NONE, TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING
} from '../constants';
import {resetMode, getSVGPoint} from './common';
import {onMouseDown, onMouseMove, onMouseUp} from './interactions';
import {startZooming, updateZooming, stopZooming, zoom} from './zoom';

let previousPointDistance;

function onMultiTouchMove(event, ViewerDOM, tool, value, props) {
  const {left, top} = ViewerDOM.getBoundingClientRect();
  const x1 = event.touches[0].clientX - Math.round(left);
  const y1 = event.touches[0].clientY - Math.round(top);
  const x2 = event.touches[1].clientX - Math.round(left);
  const y2 = event.touches[1].clientY - Math.round(top);
  const pointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  if (!previousPointDistance) {
    previousPointDistance = pointDistance;
  }

  const svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
  const midPointX = svgPoint.x >= 0 && svgPoint.x <= value.viewerWidth ? svgPoint.x : value.viewerWidth / 2;
  const midPointY = svgPoint.y >= 0 && svgPoint.y <= value.viewerHeight ? svgPoint.y : value.viewerHeight / 2;
  const previousScaleFactor = value.a;
  const distanceFactor = pointDistance/previousPointDistance;
  const scaleFactor = previousScaleFactor * distanceFactor;

  console.log('onMultiTouchMove', {
    previousScaleFactor,
    scaleFactor
  });

  let nextValue = zoom(value, midPointX, midPointY, distanceFactor, MODE_ZOOMING);

  event.preventDefault();
  return nextValue;
}

export function onTouchStart(event, ViewerDOM, tool, value, props) {
  let x, y;
  if (event.touches.length === 1) {
    let touchPosition = event.touches[0];
    let {left, top} = ViewerDOM.getBoundingClientRect();
    x = touchPosition.clientX - Math.round(left);
    y = touchPosition.clientY - Math.round(top);
  } else if (event.touches.length > 1 && props.detectWheel) {
    return value;
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

  if (event.touches.length > 1 && props.detectWheel) {
    return onMultiTouchMove(event, ViewerDOM, tool, value, props);
  }

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
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }

  if (previousPointDistance && props.detectWheel && event.touches.length === 1) {
    previousPointDistance = undefined;
  }

  if (event.touches.length > 0) {
    return value;
  }

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
