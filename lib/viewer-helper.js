'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transformationMatrixJs = require('transformation-matrix-js');

var _utils = require('./utils');

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrix2obj = function matrix2obj(matrix) {
  return { a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f };
};

var ViewerHelper = function () {
  function ViewerHelper() {
    _classCallCheck(this, ViewerHelper);
  }

  _createClass(ViewerHelper, null, [{
    key: 'getDefaultValue',
    value: function getDefaultValue() {
      var matrix = new _transformationMatrixJs.Matrix();

      return {
        mode: _constants.MODE_IDLE,
        matrix: matrix2obj(matrix),
        specialKeyEnabled: false,
        focus: false
      };
    }
  }, {
    key: 'zoom',
    value: function zoom(value, scaleFactor, viewerX, viewerY) {
      var _value$matrix = value.matrix;
      var a = _value$matrix.a;
      var b = _value$matrix.b;
      var c = _value$matrix.c;
      var d = _value$matrix.d;
      var e = _value$matrix.e;
      var f = _value$matrix.f;

      var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

      var SVGPoint = ViewerHelper.getSVGPoint(value, viewerX, viewerY);

      var act = new _transformationMatrixJs.Matrix();
      act = act.translate(SVGPoint.x, SVGPoint.y);
      act = act.scaleU(scaleFactor);
      act = act.translate(-SVGPoint.x, -SVGPoint.y);

      matrix = matrix.multiply(act);

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_IDLE,
          matrix: matrix2obj(matrix)
        }
      });
    }
  }, {
    key: 'pan',
    value: function pan(value, deltaX, deltaY) {
      var _value$matrix2 = value.matrix;
      var a = _value$matrix2.a;
      var b = _value$matrix2.b;
      var c = _value$matrix2.c;
      var d = _value$matrix2.d;
      var e = _value$matrix2.e;
      var f = _value$matrix2.f;

      var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

      var act = new _transformationMatrixJs.Matrix();
      act = act.translate(deltaX, deltaY);

      matrix = matrix.multiply(act);

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_IDLE,
          matrix: matrix2obj(matrix)
        }
      });
    }
  }, {
    key: 'startPan',
    value: function startPan(value, startX, startY) {
      var matrix = value.matrix;

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_PANNING,
          startX: startX,
          startY: startY,
          matrix: matrix2obj(matrix)
        }
      });
    }
  }, {
    key: 'updatePan',
    value: function updatePan(value, x, y, panLimit, SVGWidth, SVGHeight, viewerWidth, viewerHeight) {

      if (value.mode !== _constants.MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

      var _value$matrix3 = value.matrix;
      var a = _value$matrix3.a;
      var b = _value$matrix3.b;
      var c = _value$matrix3.c;
      var d = _value$matrix3.d;
      var e = _value$matrix3.e;
      var f = _value$matrix3.f;

      var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);
      var zoomLevel = matrix.decompose(false).scale.x;

      var deltaX = (value.startX - x) / zoomLevel;
      var deltaY = (value.startY - y) / zoomLevel;

      var act = new _transformationMatrixJs.Matrix();
      act = act.translate(-deltaX, -deltaY);

      matrix = matrix.multiply(act);

      //apply pan limits
      matrix.e = Math.min(matrix.e, viewerWidth - panLimit);
      matrix.e = Math.max(matrix.e, panLimit - SVGWidth * zoomLevel);

      matrix.f = Math.min(matrix.f, viewerHeight - panLimit);
      matrix.f = Math.max(matrix.f, panLimit - SVGHeight * zoomLevel);

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_PANNING,
          startX: x,
          startY: y,
          matrix: matrix2obj(matrix)
        }
      });
    }
  }, {
    key: 'stopPan',
    value: function stopPan(value) {
      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_IDLE
        }
      });
    }
  }, {
    key: 'startZoomSelection',
    value: function startZoomSelection(value, x, y) {
      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_ZOOMING,
          startX: x,
          startY: y,
          endX: x,
          endY: y
        }
      });
    }
  }, {
    key: 'updateZoomSelection',
    value: function updateZoomSelection(value, x, y) {
      if (value.mode !== _constants.MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_ZOOMING,
          endX: x,
          endY: y
        }
      });
    }
  }, {
    key: 'stopZoomSelection',
    value: function stopZoomSelection(value, viewerWidth, viewerHeight) {
      var startX = value.startX;
      var startY = value.startY;
      var endX = value.endX;
      var endY = value.endY;


      var start = ViewerHelper.getSVGPoint(value, startX, startY);
      var end = ViewerHelper.getSVGPoint(value, endX, endY);

      var box = (0, _utils.calculateBox)(start, end);

      return ViewerHelper.fitSelectionToViewer(value, box.x, box.y, box.width, box.height, viewerWidth, viewerHeight);
    }
  }, {
    key: 'updateAutoPan',
    value: function updateAutoPan(value, viewerX, viewerY, viewerWidth, viewerHeight) {
      var borderSize = 20;

      var autoPanX = _constants.DIRECTION_NONE;
      if (viewerX < borderSize) {
        autoPanX = _constants.DIRECTION_LEFT;
      } else if (viewerWidth - viewerX < borderSize) {
        autoPanX = _constants.DIRECTION_RIGHT;
      }

      var autoPanY = _constants.DIRECTION_NONE;
      if (viewerY < borderSize) {
        autoPanY = _constants.DIRECTION_UP;
      } else if (viewerHeight - viewerY < borderSize) {
        autoPanY = _constants.DIRECTION_DOWN;
      }

      if (value.autoPanX === autoPanX && value.autoPanY === autoPanY) return value;

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          autoPanX: autoPanX,
          autoPanY: autoPanY
        }
      });
    }
  }, {
    key: 'updateFocus',
    value: function updateFocus(value, focus) {
      return value.focus === focus ? value : (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          focus: focus
        }
      });
    }
  }, {
    key: 'fitSelectionToViewer',
    value: function fitSelectionToViewer(value, selectionX, selectionY, selectionWidth, selectionHeight, viewerWidth, viewerHeight) {

      var scaleX = viewerWidth / selectionWidth;
      var scaleY = viewerHeight / selectionHeight;

      var scale = Math.min(scaleX, scaleY);

      var matrix = new _transformationMatrixJs.Matrix();
      matrix = matrix.scaleU(scale);
      matrix = matrix.translate(-selectionX, -selectionY);

      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          mode: _constants.MODE_IDLE,
          matrix: matrix2obj(matrix)
        }
      });
    }
  }, {
    key: 'fitSVGToViewer',
    value: function fitSVGToViewer(value, SVGWidth, SVGHeight, viewerWidth, viewerHeight) {
      return ViewerHelper.fitSelectionToViewer(value, 0, 0, SVGWidth, SVGHeight, viewerWidth, viewerHeight);
    }
  }, {
    key: 'enableSpecialKey',
    value: function enableSpecialKey(value) {
      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          specialKeyEnabled: true
        }
      });
    }
  }, {
    key: 'disableSpecialKey',
    value: function disableSpecialKey(value) {
      return (0, _reactAddonsUpdate2.default)(value, {
        $merge: {
          specialKeyEnabled: false
        }
      });
    }
  }, {
    key: 'getSVGPoint',
    value: function getSVGPoint(value, viewerX, viewerY) {
      var _value$matrix4 = value.matrix;
      var a = _value$matrix4.a;
      var b = _value$matrix4.b;
      var c = _value$matrix4.c;
      var d = _value$matrix4.d;
      var e = _value$matrix4.e;
      var f = _value$matrix4.f;

      var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);

      var inverseMatrix = matrix.inverse();
      return inverseMatrix.applyToPoint(viewerX, viewerY);
    }
  }, {
    key: 'decomposeValue',
    value: function decomposeValue(value) {
      var _value$matrix5 = value.matrix;
      var a = _value$matrix5.a;
      var b = _value$matrix5.b;
      var c = _value$matrix5.c;
      var d = _value$matrix5.d;
      var e = _value$matrix5.e;
      var f = _value$matrix5.f;

      var matrix = _transformationMatrixJs.Matrix.from(a, b, c, d, e, f);
      var decompose = matrix.decompose(false);

      return {
        scaleFactor: decompose.scale.x,
        translationX: decompose.translate.x,
        translationY: decompose.translate.y
      };
    }
  }, {
    key: 'isPointInsideSVG',
    value: function isPointInsideSVG(x, y, SVGWidth, SVGHeight) {
      return 0 <= x && x <= SVGWidth && 0 <= y && y <= SVGHeight;
    }
  }]);

  return ViewerHelper;
}();

exports.default = ViewerHelper;