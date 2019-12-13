import eventFactory from "../../src/events/event-factory";
import {getDefaultValue} from "../../src/features/common";
import {createFakeDOM, createFakeEvent} from "../test-utils";
import ViewerMouseEvent from "../../src/events/viewer-mouse-event";
import ViewerTouchEvent from "../../src/events/viewer-touch-event";

test("event factor", () => {
  const value = getDefaultValue(
    100, 200,       //viewer 100x200
    0, 0, 50, 50, //svg 50x50
  )

  const SVGViewer = createFakeDOM()

  const viewerEvent1 = eventFactory(
    createFakeEvent({type: 'click', mouse: [0, 0]}),
    value, SVGViewer
  )
  expect(viewerEvent1 instanceof ViewerMouseEvent).toBe(true)

  const viewerEvent2 = eventFactory(
    createFakeEvent({type: 'touchstart', touches: [[0, 0]]}),
    value, SVGViewer
  )
  expect(viewerEvent2 instanceof ViewerTouchEvent).toBe(true)
})
