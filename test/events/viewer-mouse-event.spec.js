import {createFakeDOM, createFakeEvent} from "../test-utils";
import {getDefaultValue} from "../../src/features/common";
import ViewerMouseEvent from "../../src/events/viewer-mouse-event";

test('ViewerMouseEvent', () => {
  const value = getDefaultValue(
    100, 200,       //viewer 100x200
    0, 0, 500, 500, //svg 50x50
  )

  const SVGViewer = createFakeDOM({position: [50, 90]})

  const event = createFakeEvent({type: 'click', mouse: [300, 400]})
  const viewerEvent = new ViewerMouseEvent(event, value, SVGViewer)
  expect(viewerEvent.point).toEqual({x: 300 - 50, y: 400 - 90})
  expect(viewerEvent.x).toBe(300 - 50)
  expect(viewerEvent.y).toBe(400 - 90)
})
