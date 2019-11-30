import {createFakeDOM, createFakeEvent} from "../test-utils";
import {getDefaultValue} from "../../src/features/common";
import ViewerTouchEvent from "../../src/events/viewer-touch-event";

test('ViewerTouchEvent', () => {
  const value = getDefaultValue(
    100, 200,       //viewer 100x200
    0, 0, 500, 500, //svg 50x50
  )

  const SVGViewer = createFakeDOM({position: [50, 90]})

  const event = createFakeEvent({type: 'click', touches: [[300, 400], [350, 540]]})
  const viewerEvent = new ViewerTouchEvent(event, value, SVGViewer)
  expect(viewerEvent.points).toEqual([
    {x: 300 - 50, y: 400 - 90},
    {x: 350 - 50, y: 540 - 90}
  ])
})
