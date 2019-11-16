import {getDefaultValue} from "../src/features/common";
import {testBBox} from "./test-utils";

describe('test-utils', () => {
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
