import {getDefaultValue} from "../../src/features/common";
import {closeMiniature, openMiniature} from "../../src";

test("open/close miniature", () => {
  const value = getDefaultValue(
    10, 20,
    5, 6, 7, 8,
    80, 90
  )

  expect(value).toMatchObject({miniatureOpen: true}) //test default

  const value1 = closeMiniature(value)
  expect(value1).toMatchObject({miniatureOpen: false})

  const value2 = openMiniature(value1)
  expect(value2).toMatchObject({miniatureOpen: true})
})

