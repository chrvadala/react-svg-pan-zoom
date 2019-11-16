import {applyToPoint, fromObject} from "transformation-matrix";

/**
 * extracts bounding box for testing purpose
 * @param value
 * @return {[number, number, number, number]}
 */
export function testBBox(value) {
  const matrix = fromObject(value)

  const {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = value
  const topLeft = applyToPoint(matrix, {x: 0, y: 0})
  const bottomRight = applyToPoint(matrix, {x: SVGWidth - SVGMinX, y: SVGHeight - SVGMinY})

  //x1, y1, x2, y2
  return [topLeft.x, topLeft.y, bottomRight.x, bottomRight.y]
}


/**
 * extracts matrix for testing purpose
 * @param value
 * @return {Matrix}
 */
export function testMatrix(value){
  return fromObject(value)
}
