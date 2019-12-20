import {createFakeDOM, createFakeEvent} from "../test-utils";
import {getDefaultValue} from "../../src/features/common";
import ViewerMouseEvent from "../../src/events/viewer-mouse-event";
import {zoom} from "../../src";

describe('ViewerMouseEvent', () => {
  const value = getDefaultValue(
    100, 200,       //viewer 100x200
    0, 0, 500, 500, //svg 50x50
  )

  test("basic", () => {
    const SVGViewer = createFakeDOM({position: [50, 90]})

    const event = createFakeEvent({type: 'click', mouse: [300, 400]})
    const viewerEvent = new ViewerMouseEvent(event, value, SVGViewer)
    expect(viewerEvent.point).toEqual({x: 300 - 50, y: 400 - 90})
    expect(viewerEvent.x).toBe(300 - 50)
    expect(viewerEvent.y).toBe(400 - 90)
  })

  test("zoom on a point", () => {
    const SVGViewer = createFakeDOM({position: [0, 0]})

    //zoom x2
    const event1 = createFakeEvent({type: 'click', mouse: [30, 40]})
    const value1 = zoom(value, 0, 0, 2)
    const viewerEvent1 = new ViewerMouseEvent(event1, value1, SVGViewer)
    expect(viewerEvent1.point).toEqual({x: 15, y: 20})

    //when zooming on a point the underling point should be unchanged
    const value2 = zoom(value, 40, 70, 2)
    const event2 = createFakeEvent({type: 'click', mouse: [40, 70]})
    const viewerEvent2 = new ViewerMouseEvent(event2, value2, SVGViewer)
    expect(viewerEvent2.point).toEqual({x: 40, y: 70})
  })
})
