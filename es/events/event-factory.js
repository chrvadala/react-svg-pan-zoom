import ViewerMouseEvent from './viewer-mouse-event';
import ViewerTouchEvent from './viewer-touch-event';

export default function (originalEvent, value, SVGViewer) {

  var eventType = originalEvent.type;

  switch (eventType) {
    case "mousemove":
    case "mouseup":
    case "mousedown":
    case "click":
    case "dblclick":
      return new ViewerMouseEvent(originalEvent, value, SVGViewer);

    case "touchstart":
    case "touchmove":
    case "touchend":
    case "touchcancel":
      return new ViewerTouchEvent(originalEvent, value, SVGViewer);

    default:
      throw new Error(eventType + ' not supported');
  }
}