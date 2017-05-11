'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewer = require('./viewer');

Object.defineProperty(exports, 'ReactSVGPanZoom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_viewer).default;
  }
});

var _toolbar = require('./ui-toolbar/toolbar');

Object.defineProperty(exports, 'Toolbar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolbar).default;
  }
});

var _common = require('./features/common');

Object.defineProperty(exports, 'setPointOnViewerCenter', {
  enumerable: true,
  get: function get() {
    return _common.setPointOnViewerCenter;
  }
});
Object.defineProperty(exports, 'reset', {
  enumerable: true,
  get: function get() {
    return _common.reset;
  }
});

var _pan = require('./features/pan');

Object.defineProperty(exports, 'pan', {
  enumerable: true,
  get: function get() {
    return _pan.pan;
  }
});

var _zoom = require('./features/zoom');

Object.defineProperty(exports, 'zoom', {
  enumerable: true,
  get: function get() {
    return _zoom.zoom;
  }
});
Object.defineProperty(exports, 'fitSelection', {
  enumerable: true,
  get: function get() {
    return _zoom.fitSelection;
  }
});
Object.defineProperty(exports, 'fitToViewer', {
  enumerable: true,
  get: function get() {
    return _zoom.fitToViewer;
  }
});
Object.defineProperty(exports, 'zoomOnViewerCenter', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomOnViewerCenter;
  }
});

var _miniature = require('./features/miniature');

Object.defineProperty(exports, 'openMiniature', {
  enumerable: true,
  get: function get() {
    return _miniature.openMiniature;
  }
});
Object.defineProperty(exports, 'closeMiniature', {
  enumerable: true,
  get: function get() {
    return _miniature.closeMiniature;
  }
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Viewer = exports.Viewer = function Viewer() {
  var msg = "HEY! You are trying to use an older version of ReactSVGPanZoom. " + "Read here https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/migrate-from-v1-to-v2.md";

  console.error(msg);
  return null;
};