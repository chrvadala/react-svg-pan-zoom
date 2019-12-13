import {
  decompose,
  getDefaultValue,
  getSVGPoint,
  isValueValid,
  reset,
  resetMode,
  set,
  setFocus,
  setPointOnViewerCenter,
  setSVGViewBox,
  setViewerSize,
  setZoomLevels
} from "../../src/features/common";
import {fitToViewer, MODE_IDLE, pan} from "../../src";

const VALUE = getDefaultValue(
  200, 200, //viewer 200x200
  0, 0, 400, 400, //svg 400x400
)


test("getDefaultValue", () => {
  const value = getDefaultValue(
    10, 20,
    5, 6, 7, 8,
    80, 90
  )

  expect(value.mode).toBe(MODE_IDLE)

  expect(value.viewerWidth).toBe(10)
  expect(value.viewerHeight).toBe(20)

  expect(value.SVGMinX).toBe(5)
  expect(value.SVGMinY).toBe(6)
  expect(value.SVGWidth).toBe(7)
  expect(value.SVGHeight).toBe(8)

  expect(value.scaleFactorMin).toBe(80)
  expect(value.scaleFactorMax).toBe(90)
})

test("set", () => {
  const value = getDefaultValue()

  const nextValue = set(value, {a: 1, b: 2, c: 3, d: 4, e: 6}, 'ZOOM')

  expect(nextValue).not.toBe(value)
  expect(nextValue).toMatchObject({a: 1, b: 2, c: 3, d: 4, e: 6})
  expect(function () {
    nextValue.a = 100
  }).toThrow()
})

test("isValueValid", () => {
  expect(isValueValid({version: 99})).toBe(false)
  expect(isValueValid('123456789')).toBe(false)

  expect(isValueValid({version: 3})).toBe(true)
})

test("getSVGPoint", () => {
  expect(getSVGPoint(VALUE, 100, 100)).toEqual({x: 100, y: 100})
  expect(getSVGPoint(VALUE, 200, 200)).toEqual({x: 200, y: 200})

  const value_2 = fitToViewer(VALUE)
  expect(getSVGPoint(value_2, 100, 100)).toEqual({x: 200, y: 200})
})

test("decompose", () => {
  expect(decompose(VALUE)).toMatchObject({scaleFactor: 1, translationX: 0, translationY: 0})

  const value_2 = fitToViewer(VALUE)
  expect(decompose(value_2)).toMatchObject({scaleFactor: 0.5, translationX: 0, translationY: 0})

  const value_3 = pan(VALUE, 100, 200)
  expect(decompose(value_3)).toMatchObject({scaleFactor: 1, translationX: 100, translationY: 200})

  const value_4 = pan(fitToViewer(VALUE), 100, 200)
  expect(decompose(value_4)).toMatchObject({scaleFactor: 0.5, translationX: 50, translationY: 100})
})

test("setFocus", () => {
  expect(VALUE).toMatchObject({focus: false})
  const value_2 = setFocus(VALUE, true)
  expect(value_2).toMatchObject({focus: true})
})

test("setViewerSize", () => {
  expect(VALUE).toMatchObject({viewerWidth: 200, viewerHeight: 200})
  const value_2 = setViewerSize(VALUE, 50, 100)
  expect(value_2).toMatchObject({viewerWidth: 50, viewerHeight: 100})
})

test("setSVGViewBox", () => {
  expect(VALUE).toMatchObject({SVGMinX: 0, SVGMinY: 0, SVGWidth: 400, SVGHeight: 400})
  const value_2 = setSVGViewBox(VALUE, 30, 40, 130, 140)
  expect(value_2).toMatchObject({SVGMinX: 30, SVGMinY: 40, SVGWidth: 130, SVGHeight: 140})
})

test("setZoomLevels", () => {
  expect(VALUE).toMatchObject({scaleFactorMin: null, scaleFactorMax: null})
  const value_2 = setZoomLevels(VALUE, 0.1, 99)
  expect(value_2).toMatchObject({scaleFactorMin: 0.1, scaleFactorMax: 99})
})

test("setPointOnViewerCenter", () => {
  const value_2 = setPointOnViewerCenter(VALUE, 200, 200, 1) //move SVG center to viewer center
  expect(value_2).toMatchSnapshot()
  expect(decompose(value_2)).toMatchObject({translationX: -100, translationY: -100})

  const value_3 = setPointOnViewerCenter(VALUE, 200, 200, 2) //move SVG center to viewer center and apply zoom
  expect(value_3).toMatchSnapshot()
  const translation = (((400 * 2) - 200) / 2) // (((SVGWidth * zoomLevel) - viewerWidth) / 2)
  expect(decompose(value_3)).toMatchObject({translationX: -translation, translationY: -translation})
})

test("reset", () => {
  const value_2 = fitToViewer(VALUE) //apply something
  expect(value_2).not.toBe(VALUE)
  expect(value_2).not.toMatchObject(VALUE)

  const value_3 = reset(value_2)
  expect(value_3).not.toBe(VALUE)
  expect(value_3).toMatchObject(VALUE)
})

test("resetMode", () => {
  const value_2 = fitToViewer(VALUE) //apply something
  const value_3 = set(value_2, {mode: 'ABC', startX: 10, startY: 20, endX: 100, endY: 200})

  expect(value_3).toMatchObject({mode: 'ABC', startX: 10, startY: 20, endX: 100, endY: 200})
  const value_4 = resetMode(value_3)
  expect(value_4).toMatchObject({mode: 'idle', startX: null, startY: null, endX: null, endY: null})
})
