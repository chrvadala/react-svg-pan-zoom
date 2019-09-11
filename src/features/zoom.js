import {transform, fromObject, translate, scale} from 'transformation-matrix';

import {
  ACTION_ZOOM, MODE_IDLE, MODE_ZOOMING,
  ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM
} from '../constants';
import {getSVGPoint} from './common';
import calculateBox from '../utils/calculateBox';

function lessThanScaleFactorMin (matrix, scaleFactor, scaleFactorMin) {
  return scaleFactorMin && (matrix.d * scaleFactor) <= scaleFactorMin;
}

function moreThanScaleFactorMax (matrix, scaleFactor, scaleFactorMax) {
  return scaleFactorMax && (matrix.d * scaleFactor) >= scaleFactorMax;
}

export function isZoomLevelGoingOutOfBounds(matrix, scaleFactor, scaleFactorMin, scaleFactorMax) {
  return lessThanScaleFactorMin(matrix, scaleFactor, scaleFactorMin) && scaleFactor < 1 ||
          moreThanScaleFactorMax(matrix, scaleFactor, scaleFactorMax) && scaleFactor > 1;
}

export function limitZoomLevel(matrix, scaleFactorMin, scaleFactorMax) {
  let scaleLevel = matrix.a;

  if(scaleFactorMin != null) {
    // limit minimum zoom
    scaleLevel = Math.max(scaleLevel, scaleFactorMin);
  }

  if(scaleFactorMax != null) {
    // limit maximum zoom
    scaleLevel = Math.min(scaleLevel, scaleFactorMax);
  }

  return {
    ...matrix,
    a: scaleLevel,
    d: scaleLevel
  };
}

export function zoom(matrix, SVGPointX, SVGPointY, scaleFactor, scaleFactorMin, scaleFactorMax) {
  if (isZoomLevelGoingOutOfBounds(matrix, scaleFactor, scaleFactorMin, scaleFactorMax)) {
      return {matrix};
  }

  const newMatrix = transform(
    fromObject(matrix),
    translate(SVGPointX, SVGPointY),
    scale(scaleFactor, scaleFactor),
    translate(-SVGPointX, -SVGPointY)
  );

  return {
    mode: MODE_IDLE,
    matrix: limitZoomLevel(value, newMatrix),
    start: {x: null, y: null},
    end: {x: null, y: null},
    last_action: ACTION_ZOOM
  };
}

export function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  let {viewerWidth, viewerHeight} = value;

  let scaleX = viewerWidth / selectionWidth;
  let scaleY = viewerHeight / selectionHeight;

  let scaleLevel = Math.min(scaleX, scaleY);

  const matrix = transform(
    scale(scaleLevel, scaleLevel),                      //2
    translate(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  if(isZoomLevelGoingOutOfBounds(scaleLevel / value.d)) {
    // Do not allow scale and translation
    return {
      mode: MODE_IDLE,
      start: {x: null, y: null},
      end: {x: null, y: null},
    };
  }

  return {
    mode: MODE_IDLE,
    matrix: limitZoomLevel(matrix),
    start: {x: null, y: null},
    end: {x: null, y: null},
    last_action: ACTION_ZOOM
  };
}

export function fitToViewer(SVGAlignX=ALIGN_LEFT, SVGAlignY=ALIGN_TOP) {
  let {viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight} = value;

  let scaleX = viewerWidth / SVGWidth;
  let scaleY = viewerHeight / SVGHeight;
  let scaleLevel = Math.min(scaleX, scaleY);

  const scaleMatrix = scale(scaleLevel, scaleLevel);

  let translateX = -SVGMinX * scaleX;
  let translateY = -SVGMinY * scaleY;

  // after fitting, SVG and the viewer will match in width (1) or in height (2)
  if (scaleX < scaleY) {
    //(1) match in width, meaning scaled SVGHeight <= viewerHeight
    let remainderY = viewerHeight - scaleX * SVGHeight;
    switch(SVGAlignY) {
      case ALIGN_TOP:
        translateY = -SVGMinY * scaleLevel;
      break;
      case ALIGN_CENTER:
        translateY = Math.round(remainderY / 2) - SVGMinY * scaleLevel;
      break;
      case ALIGN_BOTTOM:
        translateY = remainderY - SVGMinY * scaleLevel;
      break;
    }
  } else {
    //(2) match in height, meaning scaled SVGWidth <= viewerWidth
    let remainderX = viewerWidth - scaleY * SVGWidth;
    switch(SVGAlignX) {
      case ALIGN_LEFT:
        translateX = -SVGMinX * scaleLevel;
      break;
      case ALIGN_CENTER:
        translateX = Math.round(remainderX / 2) - SVGMinX * scaleLevel;
      break;
      case ALIGN_RIGHT:
        translateX = remainderX - SVGMinX * scaleLevel;
      break;
    }
  }

  const translationMatrix = translate(translateX, translateY);
  const matrix = transform(
    translationMatrix, //2
    scaleMatrix        //1
  );

  if (isZoomLevelGoingOutOfBounds(scaleLevel / matrix.d)) {
    // Do not allow scale and translation
    return {
      mode: MODE_IDLE,
      start: {x: null, y: null},
      end: {x: null, y: null},
    };
  }

  return {
    mode: MODE_IDLE,
    matrix:limitZoomLevel(matrix),
    start: {x: null, y: null},
    end: {x: null, y: null},
    last_action: ACTION_ZOOM
  };
}

export function zoomOnViewerCenter(viewerWidth, viewerHeight, scaleFactor) {
  let SVGPoint = getSVGPoint(viewerWidth / 2, viewerHeight / 2);
  return zoom(SVGPoint.x, SVGPoint.y, scaleFactor);
}

export function startZooming(viewerX, viewerY) {
  return {
    mode: MODE_ZOOMING,
    start: {x: viewerX, y: viewerY},
    end: {x: viewerX, y: viewerY}
  };
}

export function updateZooming(mode, viewerX, viewerY) {
  if (mode !== MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + mode);

  return {
    end: {x: viewerX, y: viewerY}
  };
}

export function stopZooming(viewerX, viewerY, scaleFactor, start, end, props) {

  let start = getSVGPoint(start.x, start.y);
  let end = getSVGPoint(end.x, end.y);

  if (Math.abs(start.x - end.x) > 7 && Math.abs(start.y - end.y) > 7) {
    let box = calculateBox(start, end);
    return fitSelection(box.x, box.y, box.width, box.height);
  } else {
    let SVGPoint = getSVGPoint(viewerX, viewerY);
    return zoom(SVGPoint.x, SVGPoint.y, scaleFactor, props);
  }
}
