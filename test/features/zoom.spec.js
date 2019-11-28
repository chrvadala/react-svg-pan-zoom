import {getDefaultValue} from "../../src/features/common";
import {
  ALIGN_BOTTOM, ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  ALIGN_TOP,
  fitToViewer,
  MODE_IDLE,
  MODE_ZOOMING,
  zoom,
  zoomOnViewerCenter
} from "../../src";
import {testBBox} from "../test-utils";
import {startZooming, stopZooming, updateZooming} from "../../src/features/zoom";

// declaring this because Number.EPSILON doesn't work with comparable numbers
const EPSILON = 0.00000001

describe("zoom", () => {
  test("test zoom in", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    const value1 = zoom(value, 0, 0, 2)
    expect(testBBox(value1)).toEqual([0, 0, 800, 800])
    expect(value1).toMatchSnapshot()

    const value2 = zoom(value1, 0, 0, 2)
    expect(testBBox(value2)).toEqual([0, 0, 1600, 1600])
    expect(value2).toMatchSnapshot()

    const value3 = zoom(value, 100, 100, 2)
    expect(testBBox(value3)).toEqual([-100, -100, 700, 700])

    const value4 = zoom(value, 200, 200, 2)
    expect(testBBox(value4)).toEqual([-200, -200, 600, 600])
  })

  test("test zoom out", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    const value1 = zoom(value, 0, 0, 1 / 2)
    expect(testBBox(value1)).toEqual([0, 0, 200, 200])
    expect(value1).toMatchSnapshot()

    const value2 = zoom(value1, 0, 0, 1 / 2)
    expect(testBBox(value2)).toEqual([0, 0, 100, 100])
    expect(value2).toMatchSnapshot()

    const value3 = zoom(value, 100, 100, 1 / 2)
    expect(testBBox(value3)).toEqual([50, 50, 250, 250])

    const value4 = zoom(value, 200, 200, 1 / 2)
    expect(testBBox(value4)).toEqual([100, 100, 300, 300])
  })

  test("test min bound", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
      1 / 2, 4          //min/max scaleFactor 1/2 - 4
    )

    const value1 = zoom(value, 0, 0, 4 + EPSILON)
    expect(value1).toBe(value) //should be unchanged

    const value2 = zoom(value, 0, 0, 4)
    expect(testBBox(value2)).toEqual([0, 0, 1600, 1600])
  })

  test("test min bound", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
      1 / 2, 4          //min/max scaleFactor 1/2 - 4
    )

    const value1 = zoom(value, 0, 0, 1 / 2 - EPSILON)
    expect(value1).toBe(value) //should be unchanged

    const value2 = zoom(value, 0, 0, 1 / 2)
    expect(testBBox(value2)).toEqual([0, 0, 200, 200])
  })
})

describe("fitSelection", () => {
  //TODO
})

describe("fitToViewer", () => {
  test("rect with w>h", () => {
    const value = getDefaultValue(
      200, 100,       //viewer 200x100
      0, 0, 50, 50, //svg 50x50
    )

    const value1 = fitToViewer(value, ALIGN_LEFT, ALIGN_TOP)
    expect(testBBox(value1)).toEqual([0, 0, 100, 100])

    const value2 = fitToViewer(value, ALIGN_CENTER, ALIGN_TOP)
    expect(testBBox(value2)).toEqual([50, 0, 150, 100])

    const value3 = fitToViewer(value, ALIGN_RIGHT, ALIGN_TOP)
    expect(testBBox(value3)).toEqual([100, 0, 200, 100])
  })

  test("rect with w<h", () => {
    const value = getDefaultValue(
      100, 200,       //viewer 100x200
      0, 0, 50, 50, //svg 50x50
    )

    const value1 = fitToViewer(value, ALIGN_LEFT, ALIGN_TOP)
    expect(testBBox(value1)).toEqual([0, 0, 100, 100])

    const value2 = fitToViewer(value, ALIGN_LEFT, ALIGN_CENTER)
    expect(testBBox(value2)).toEqual([0, 50, 100, 150])

    const value3 = fitToViewer(value, ALIGN_LEFT, ALIGN_BOTTOM)
    expect(testBBox(value3)).toEqual([0, 100, 100, 200])
  })
})

test("zoomOnViewerCenter", () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 200, 200, //svg 200x200
  )

  const value1 = zoomOnViewerCenter(value, 2)
  expect(testBBox(value1)).toEqual([-100, -100, 300, 300])

  const value2 = zoomOnViewerCenter(value, 1 / 2)
  expect(testBBox(value2)).toEqual([50, 50, 150, 150])
})

test("zoom lifecycle", () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 200, 200, //svg 200x200
  )

  const value1 = startZooming(value, 0, 0)
  expect(value1).toMatchObject({mode: MODE_ZOOMING, startX: 0, startY: 0})

  const value2 = updateZooming(value1, 100, 100)
  expect(value2).toMatchObject({endX: 100, endY: 100})

  //zoom on point
  const value3 = stopZooming(value2, 0, 0, 2)
  expect(testBBox(value3)).toEqual([0, 0, 400, 400])
  expect(value3).toMatchObject({mode: MODE_IDLE})
  expect(value3).toMatchSnapshot()

  //zoom on area
  const value4 = stopZooming(value2, 50, 50)
  expect(testBBox(value4)).toEqual([0, 0, 800, 800])
  expect(value4).toMatchObject({mode: MODE_IDLE})
  expect(value4).toMatchSnapshot()
})
