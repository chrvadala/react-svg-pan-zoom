import {getMousePosition, onDoubleClick, onMouseDown, onMouseMove, onMouseUp} from "../../src/features/interactions";
import {createFakeDOM, createFakeEvent, testSVGBBox, testMatrix, testSVGPoint} from "../test-utils";
import {getDefaultValue} from "../../src/features/common";
import {TOOL_AUTO, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from "../../src";
import {toBeDeepCloseTo, toMatchCloseTo} from 'jest-matcher-deep-close-to';

expect.extend({toBeDeepCloseTo, toMatchCloseTo});

const VALUE = getDefaultValue(
  200, 200,       //viewer 200x200
  0, 0, 400, 400, //svg 400x400
)

test("getMousePosition", () => {
  const event = createFakeEvent({type: 'click', mouse: [100, 200]})
  const viewerDOM = createFakeDOM({position: [50, 30]})
  const coords = getMousePosition(event, viewerDOM)

  expect(coords).toMatchObject({x: 50, y: 170})
})

describe("mouse interactions", () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 400, 400, //svg 400x400
  )
  const event = createFakeEvent({type: 'click', mouse: [100, 200]})
  const ViewerDOM = createFakeDOM()
  const point1 = {x: 50, y: 50}
  const point2 = {x: 100, y: 100}
  const point3 = {x: 150, y: 150}

  describe("tool: TOOL_AUTO", () => {
    test("click", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_AUTO, value, {}, point1)
      const value2 = onMouseMove(event, ViewerDOM, TOOL_AUTO, value1, {}, point1)
      const value3 = onMouseUp(event, ViewerDOM, TOOL_AUTO, value2, {}, point1)
      expect(testMatrix(value3)).toEqual(testMatrix(value))
    })

    test.skip("click and drag", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_AUTO, value, {}, point1)
      const value2 = onMouseMove(event, ViewerDOM, TOOL_AUTO, value1, {}, point2)
      expect(testSVGBBox(value2)).toEqual([50, 50, expect.any(Number), expect.any(Number)])
      const value3 = onMouseUp(event, ViewerDOM, TOOL_AUTO, value2, {}, point3)
      //TODO onMouseUp doesn't consider last coords update, so this step fails
      expect(testSVGBBox(value3)).toEqual([100, 100, expect.any(Number), expect.any(Number)])
    })

    test('dblclick', () => {
      const value1 = onDoubleClick(event, ViewerDOM, TOOL_AUTO, value, {disableDoubleClickZoomWithToolAuto: true}, point1)
      expect(testMatrix(value1)).toEqual(testMatrix(value1))

      //should zoom in (x2)
      const value2 = onDoubleClick(event, ViewerDOM, TOOL_AUTO, value, {scaleFactor: 2, modifierKeys: ['Alt']}, {
        x: 200,
        y: 200
      })
      expect(testSVGBBox(value2)).toEqual([-200, -200, 600, 600])

      //should zoom out (x0.5)
      const event2 = createFakeEvent({type: 'dblclick', pressedKeys: ['Alt']})
      const value3 = onDoubleClick(event2, ViewerDOM, TOOL_AUTO, value, {
        scaleFactor: 2,
        modifierKeys: ['Alt']
      }, {x: 200, y: 200})
      expect(testSVGBBox(value3)).toEqual([100, 100, 300, 300])
    })
  })

  describe("tool: TOOL_PAN", () => {
    test("click", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_PAN, value, {}, point1)
      const value2 = onMouseMove(event, ViewerDOM, TOOL_PAN, value1, {}, point1)
      const value3 = onMouseUp(event, ViewerDOM, TOOL_PAN, value2, {}, point1)
      expect(testMatrix(value3)).toEqual(testMatrix(value))
    })
    test.skip("click and drag", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_PAN, value, {}, point1)
      const value2 = onMouseMove(event, ViewerDOM, TOOL_PAN, value1, {}, point2)
      expect(testSVGBBox(value2)).toEqual([50, 50, expect.any(Number), expect.any(Number)])
      const value3 = onMouseUp(event, ViewerDOM, TOOL_PAN, value2, {}, point3)
      //TODO onMouseUp doesn't consider last coords update, so this step fails
      expect(testSVGBBox(value3)).toEqual([100, 100, expect.any(Number), expect.any(Number)])
    })
  })

  describe("tool: TOOL_ZOOM_IN", () => {
    test("click", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_ZOOM_IN, value, {scaleFactor: 2}, {x: 200, y: 200})
      const value2 = onMouseMove(event, ViewerDOM, TOOL_ZOOM_IN, value1, {scaleFactor: 2}, {x: 200, y: 200})
      const value3 = onMouseUp(event, ViewerDOM, TOOL_ZOOM_IN, value2, {scaleFactor: 2}, {x: 200, y: 200})
      expect(testSVGBBox(value3)).toEqual([-200, -200, 600, 600])
    })
    test("click and drag", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_ZOOM_IN, value, {scaleFactor: 2}, {x: 50, y: 50})
      const value2 = onMouseMove(event, ViewerDOM, TOOL_ZOOM_IN, value1, {scaleFactor: 2}, {x: 100, y: 100})
      const value3 = onMouseUp(event, ViewerDOM, TOOL_ZOOM_IN, value2, {scaleFactor: 2}, {x: 200, y: 200})
      expect(testMatrix(value1)).toEqual(testMatrix(value2))
      expect(testSVGPoint(value3, 0, 0)).toMatchCloseTo([50, 50], 5)
      expect(testSVGPoint(value3, 200, 200)).toEqual([200, 200])
    })
  })

  describe("tool: TOOL_ZOOM_OUT", () => {
    test("click", () => {
      const value1 = onMouseDown(event, ViewerDOM, TOOL_ZOOM_OUT, value, {scaleFactor: 2}, {x: 200, y: 200})
      const value2 = onMouseMove(event, ViewerDOM, TOOL_ZOOM_OUT, value1, {scaleFactor: 2}, {x: 200, y: 200})
      const value3 = onMouseUp(event, ViewerDOM, TOOL_ZOOM_OUT, value2, {scaleFactor: 2}, {x: 200, y: 200})
      expect(testSVGBBox(value3)).toEqual([100, 100, 300, 300])
    })
  })
})

