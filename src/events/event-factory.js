import ViewerMouseEvent from './viewer-mouse-event';
import ViewerTouchEvent from './viewer-touch-event';

export default function (originalEvent, matrix, SVGViewer) {

  let eventType = originalEvent.type;

  switch (eventType) {
    case "mousemove":
    case "mouseup":
    case "mousedown":
    case "click":
    case "dblclick":
      return new ViewerMouseEvent(originalEvent, matrix, SVGViewer);

    case "touchstart":
    case "touchmove":
    case "touchend":
    case "touchcancel":
      return new ViewerTouchEvent(originalEvent, matrix, SVGViewer);

    default:
      throw new Error(`${eventType} not supported`);
  }
}
