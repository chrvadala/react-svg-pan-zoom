import {isNullOrUndefined} from "../../src/utils/is";
const cases = [
  [2, false],
  ["test", false],
  [null, true],
  [undefined, true]
]

test.each(cases)("isNullOrUndefined [%s]", (value, expected) => {
  expect(isNullOrUndefined(value)).toBe(expected)
})
