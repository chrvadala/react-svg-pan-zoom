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
export function testMatrix(value) {
  return fromObject(value)
}

export function createFakeEvent({type, mouse, touches, deltaY, buttons = 1, pressedKeys = []}) {
  const obj = {
    type,
    buttons,
    preventDefault: jest.fn(),
    getModifierState: jest.fn().mockImplementation(key => pressedKeys.includes(key))
  }

  if (mouse) {
    obj.clientX = mouse[0]
    obj.clientY = mouse[1]
  }

  if (touches && Array.isArray(touches)) {
    obj.touches = touches.map(([x, y]) => ({clientX: x, clientY: y}))
  }

  if (Number.isFinite(deltaY)) {
    obj.deltaY = deltaY
  }

  Object.freeze(obj)
  return obj
}

export function createFakeDOM({position} = {}) {
  const obj = {}
  if (position) {
    obj.getBoundingClientRect = jest.fn().mockReturnValue({left: position[0], top: position[1]})
  }
  Object.freeze(obj)
  return obj
}
