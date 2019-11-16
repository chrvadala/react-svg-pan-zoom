import {getDefaultValue} from "../src/features/common";
import {testBBox, testMatrix} from "./test-utils";
import {fromObject, identity} from "transformation-matrix";

describe('testBBox', () => {
  test('square', () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    expect(testBBox(value)).toEqual([0, 0, 400, 400])
  })

  test('view box', () => {
    const value = getDefaultValue(
      200, 100,         //viewer 200x100
      30, 60, 100, 200, //svg 70x140
    )

    expect(testBBox(value)).toEqual([0, 0, 70, 140])
  })
})

test('testMatrix', () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 400, 400, //svg 400x400
  )

  const matrix = testMatrix(value)
  expect(matrix).toEqual(identity())
  expect(matrix).toMatchSnapshot()
})
