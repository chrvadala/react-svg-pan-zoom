'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (originalEvent, value, SVGViewer) {

  var eventType = originalEvent.type;

  switch (eventType) {
    case "mousemove":
    case "mouseup":
    case "mousedown":
    case "click":
    case "dblclick":
      return new _viewerMouseEvent2.default(originalEvent, value, SVGViewer);

    case "touchstart":
    case "touchmove":
    case "touchend":
    case "touchcancel":
      return new _viewerTouchEvent2.default(originalEvent, value, SVGViewer);

    default:
      throw new Error(eventType + ' not supported');
  }
};

var _viewerMouseEvent = require('./viewer-mouse-event');

var _viewerMouseEvent2 = _interopRequireDefault(_viewerMouseEvent);

var _viewerTouchEvent = require('./viewer-touch-event');

var _viewerTouchEvent2 = _interopRequireDefault(_viewerTouchEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }