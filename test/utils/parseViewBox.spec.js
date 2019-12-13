import parseViewBox from "../../src/utils/parseViewBox";

const cases = [
  ["20, 40, 300, 500", [20, 40, 300, 500]],
  ["20 40 300 500", [20, 40, 300, 500]],
]

test.each(cases)("parseViewBox %s", (viewBox, expected) => {
  expect(parseViewBox(viewBox)).toEqual(expected)
})
