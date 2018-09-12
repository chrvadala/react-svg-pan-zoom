import {transform, fromObject, rotate as rotateTransformation} from 'transformation-matrix';

import {set, getSVGPoint} from './common';

export function rotateOnCenter(value, rotateFactor) {
  let {viewerWidth, viewerHeight} = value;
  let SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
  
  const matrix = transform(
    fromObject(value),
    rotateTransformation(rotateFactor, SVGPoint.x, SVGPoint.y)
  );

  return set(value, {
    ...matrix,
  });
}


