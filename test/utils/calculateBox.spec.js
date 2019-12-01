import calculateBox from "../../src/utils/calculateBox";

/**
 * b=bottom
 * t=top
 * l=left
 * r=right
 */

describe("calculateBox", () => {
  test("tl+br, br+tl", () => {
    const point1 = {x: 20, y: 40}
    const point2 = {x: 200, y: 150}
    const expected = {x: 20, y: 40, width: 180, height: 110}
    expect(calculateBox(point1, point2)).toEqual(expected)
    expect(calculateBox(point2, point1)).toEqual(expected)
  })

  test("tr+bl, bl+tr", () => {
    const point1 = {x: 200, y: 40}
    const point2 = {x: 20, y: 150}
    const expected = {x: 20, y: 40, width: 180, height: 110}
    expect(calculateBox(point1, point2)).toEqual(expected)
    expect(calculateBox(point2, point1)).toEqual(expected)
  })
})
