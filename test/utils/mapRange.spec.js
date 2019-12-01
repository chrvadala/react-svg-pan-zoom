import mapRange from "../../src/utils/mapRange";

test("mapRange", () => {
  expect(mapRange(50, 0, 100, 0, 1000)).toBe(500)
})
