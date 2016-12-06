import ViewerMouseEvent from './viewer-mouse-event';

export default function (originalEvent, value, SVGViewer) {

  let eventType = originalEvent.type;

  switch (eventType) {
    case "mousemove":
    case "mouseup":
    case "mousedown":

    case "click":
    case "dblclick":
      return new ViewerMouseEvent(originalEvent, value, SVGViewer);

    default:
      throw new Error(`${eventType} not supported`);
  }
}
