import {getDefaultValue} from "../../src/features/common";
import {MODE_IDLE, MODE_PANNING, pan} from "../../src";
import {testSVGBBox} from "../test-utils";
import {autoPanIfNeeded, startPanning, stopPanning, updatePanning} from "../../src/features/pan";


describe("atomic pan", () => {
  test("basic", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    const value1 = pan(value, 50, 70)
    expect(testSVGBBox(value1)).toEqual([50, 70, 450, 470])
    expect(value1).toMatchObject({mode: MODE_IDLE})
  })

  test("view box", () => {
    const value = getDefaultValue(
      200, 100,         //viewer 200x100
      30, 60, 100, 200, //svg 70x140
    )

    const value1 = pan(value, 50, 70)
    expect(testSVGBBox(value1)).toEqual([50, 70, 120, 210])
  })

  test("pan limit", () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    //move to bottom right limit
    const value1 = pan(value, 500, 700, 20)
    expect(testSVGBBox(value1)).toEqual([180, 180, expect.any(Number), expect.any(Number)])

    //move to top left limit
    const value2 = pan(value, -500, -700, 20)
    expect(testSVGBBox(value2)).toEqual([expect.any(Number), expect.any(Number), 20, 20])
  })

})

test("pan lifecycle", () => {
  let value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 400, 400, //svg 400x400
  )

  value = startPanning(value, 100, 70)
  expect(value).toMatchObject({mode: MODE_PANNING, startX: 100, startY: 70})

  value = updatePanning(value, 230, 120) //drag to bottom right direction (deltaX: 130, deltaY: 50)
  expect(testSVGBBox(value)).toEqual([130, 50, 530, 450])
  expect(value).toMatchObject({mode: MODE_PANNING, startX: 100, startY: 70})

  value = stopPanning(value)
  expect(value).toMatchObject({mode: MODE_IDLE, startX: null, startY: null})
})

test("auto pan", () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 400, 400, //svg 400x400
  )

  const value1 = autoPanIfNeeded(value, 100, 100) //because far from viewer edge -> no pan operation
  expect(value1).toBe(value)

  const value2 = autoPanIfNeeded(value, 190, 190)
  expect(testSVGBBox(value2)).toEqual([-2, -2, expect.any(Number), expect.any(Number)])

  const value3 = autoPanIfNeeded(value, 10, 10)
  expect(testSVGBBox(value3)).toEqual([2, 2, expect.any(Number), expect.any(Number)])
})
