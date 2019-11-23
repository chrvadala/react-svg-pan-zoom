import {getMousePosition} from "../../src/features/interactions";
import {createFakeDOM, createFakeEvent} from "../test-utils";
import {getDefaultValue} from "../../src/features/common";

const VALUE = getDefaultValue(
  200, 200,       //viewer 200x200
  0, 0, 400, 400, //svg 400x400
)

test("getMousePosition", () => {
  const event = createFakeEvent({type: 'click', mouse: [100, 200]})
  const viewerDOM = createFakeDOM({position: [50, 30]})
  const coords = getMousePosition(event, viewerDOM)

  expect(coords).toMatchObject({x: 50, y: 170})
})

describe("mouse interactions", () => {
  describe("tool: TOOL_AUTO", () => {
    test("click", () => {
      //TODO
    })

    test("click and drag", () => {
      //TODO
    })
  })

  describe("tool: TOOL_PAN", () => {
    test("click", () => {
      //TODO
    })

    test("click and drag", () => {
      //TODO
    })
  })

  describe("tool: TOOL_ZOOM_IN", () => {
    test("click", () => {
      //TODO
    })

    test("click and drag", () => {
      //TODO
    })
  })

  describe("tool: TOOL_ZOOM_OUT", () => {
    test("click", () => {
      //TODO
    })

    test("click and drag", () => {
      //TODO
    })
  })
})

