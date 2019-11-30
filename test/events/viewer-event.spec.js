import {createFakeDOM, createFakeEvent} from "../test-utils";
import ViewerEvent from "../../src/events/viewer-event";
import {getDefaultValue} from "../../src/features/common";
import {pan, zoom} from "../../src";

test('ViewerEvent', () => {
  const value = getDefaultValue(
    100, 200,       //viewer 100x200
    0, 0, 50, 50, //svg 50x50
  )
  const value1 = zoom(value, 0, 0, 3)
  const value2 = pan(value1, 30, 80)

  const SVGViewer = createFakeDOM({position: [500, 900]})

  const event = createFakeEvent({type: 'click', mouse: [300, 400]})
  const viewerEvent = new ViewerEvent(event, value2, SVGViewer)

  expect(viewerEvent.scaleFactor).toBe(3)
  expect(viewerEvent.translationX).toBe(30 * 3)
  expect(viewerEvent.translationY).toBe(80 * 3)

  //cached values
  expect(viewerEvent.scaleFactor).toBe(3)
  expect(viewerEvent.translationX).toBe(30 * 3)
  expect(viewerEvent.translationY).toBe(80 * 3)


  viewerEvent.preventDefault()
  viewerEvent.stopPropagation()
  expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  expect(event.preventDefault).toHaveBeenCalledTimes(1)
})
