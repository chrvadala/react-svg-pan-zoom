var ReactSVGPanZoom =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TOOL_ZOOM = exports.TOOL_PAN = exports.TOOL_NONE = exports.ViewerResponsive = exports.ViewerHelper = exports.Viewer = undefined;

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	var _viewerResponsive = __webpack_require__(15);

	var _viewerResponsive2 = _interopRequireDefault(_viewerResponsive);

	var _viewerHelper = __webpack_require__(3);

	var _viewerHelper2 = _interopRequireDefault(_viewerHelper);

	var _constants = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Viewer = _viewer2.default;
	exports.ViewerHelper = _viewerHelper2.default;
	exports.ViewerResponsive = _viewerResponsive2.default;
	exports.TOOL_NONE = _constants.TOOL_NONE;
	exports.TOOL_PAN = _constants.TOOL_PAN;
	exports.TOOL_ZOOM = _constants.TOOL_ZOOM;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _viewerHelper = __webpack_require__(3);

	var _viewerHelper2 = _interopRequireDefault(_viewerHelper);

	var _viewerEvent = __webpack_require__(13);

	var _viewerEvent2 = _interopRequireDefault(_viewerEvent);

	var _cursor = __webpack_require__(14);

	var _cursor2 = _interopRequireDefault(_cursor);

	var _utils = __webpack_require__(5);

	var _constants = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Viewer = function (_React$Component) {
	  _inherits(Viewer, _React$Component);

	  function Viewer(props) {
	    _classCallCheck(this, Viewer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).call(this, props));

	    _this.handleSpecialKeyChange = _this.handleSpecialKeyChange.bind(_this);
	    return _this;
	  }

	  _createClass(Viewer, [{
	    key: 'handleStartPan',
	    value: function handleStartPan(event) {
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props = this.props;
	      var value = _props.value;
	      var tool = _props.tool;
	      var onChange = _props.onChange;


	      if (tool !== _constants.TOOL_PAN) return;
	      if (value.mode !== _constants.MODE_IDLE) return;

	      var nextValue = _viewerHelper2.default.startPan(value, x, y);

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleUpdatePan',
	    value: function handleUpdatePan(event) {
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props2 = this.props;
	      var value = _props2.value;
	      var tool = _props2.tool;
	      var onChange = _props2.onChange;
	      var width = _props2.width;
	      var height = _props2.height;
	      var children = _props2.children;

	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_PAN) return;
	      if (value.mode !== _constants.MODE_PANNING) return;

	      //the mouse exited and reentered into svg
	      var forceExit = value.mode === _constants.MODE_PANNING && event.buttons === 0;

	      var nextValue = forceExit ? _viewerHelper2.default.stopPan(value) : _viewerHelper2.default.updatePan(value, x, y, 20, SVGWidth, SVGHeight, width, height);

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleStopPan',
	    value: function handleStopPan(event) {
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props3 = this.props;
	      var value = _props3.value;
	      var tool = _props3.tool;
	      var onChange = _props3.onChange;


	      if (tool !== _constants.TOOL_PAN) return;
	      if (value.mode !== _constants.MODE_PANNING) return;

	      var nextValue = _viewerHelper2.default.stopPan(value, x, y);

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleStartZoom',
	    value: function handleStartZoom(event) {
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props4 = this.props;
	      var value = _props4.value;
	      var tool = _props4.tool;
	      var onChange = _props4.onChange;
	      var children = _props4.children;

	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_ZOOM) return;
	      if (value.mode !== _constants.MODE_IDLE) return;

	      var point = _viewerHelper2.default.getSVGPoint(value, x, y);
	      if (!_viewerHelper2.default.isPointInsideSVG(point.x, point.y, SVGWidth, SVGHeight)) return;

	      var nextValue = _viewerHelper2.default.startZoomSelection(value, x, y);

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleUpdateZoom',
	    value: function handleUpdateZoom(event) {
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props5 = this.props;
	      var value = _props5.value;
	      var tool = _props5.tool;
	      var onChange = _props5.onChange;
	      var width = _props5.width;
	      var height = _props5.height;


	      if (tool !== _constants.TOOL_ZOOM) return;
	      if (value.mode !== _constants.MODE_ZOOMING) return;

	      //the mouse exited and reentered into svg
	      var forceExit = event.buttons === 0;

	      var nextValue = forceExit ? _viewerHelper2.default.stopZoomSelection(value, width, height) : _viewerHelper2.default.updateZoomSelection(value, x, y);

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleStopZoom',
	    value: function handleStopZoom(event) {
	      var abs = Math.abs;
	      var x = event.nativeEvent.offsetX,
	          y = event.nativeEvent.offsetY;
	      var _props6 = this.props;
	      var value = _props6.value;
	      var tool = _props6.tool;
	      var onChange = _props6.onChange;
	      var width = _props6.width;
	      var height = _props6.height;
	      var startX = value.startX;
	      var endX = value.endX;
	      var startY = value.startY;
	      var endY = value.endY;
	      var specialKeyEnabled = value.specialKeyEnabled;


	      if (tool !== _constants.TOOL_ZOOM) return;
	      if (value.mode !== _constants.MODE_ZOOMING) return;

	      var selectionMode = abs(startX - endX) > 2 && abs(startY - endY) > 2;

	      var nextValue = void 0;

	      if (selectionMode) {
	        nextValue = _viewerHelper2.default.stopZoomSelection(value, width, height);
	      } else {
	        var scaleFactor = specialKeyEnabled ? 0.9 : 1.1;
	        nextValue = _viewerHelper2.default.zoom(value, scaleFactor, x, y);
	      }

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var _props7 = this.props;
	      var value = _props7.value;
	      var tool = _props7.tool;
	      var onClick = _props7.onClick;
	      var children = _props7.children;

	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_NONE) return;
	      if (!onClick) return;

	      var viewerEvent = new _viewerEvent2.default(event, value);
	      if (!_viewerHelper2.default.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

	      onClick(viewerEvent);
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(event) {
	      var _props8 = this.props;
	      var value = _props8.value;
	      var tool = _props8.tool;
	      var onMouseUp = _props8.onMouseUp;
	      var children = _props8.children;

	      var x = event.offsetX,
	          y = event.offsetY;
	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_NONE) return;
	      if (!onMouseUp) return;

	      var viewerEvent = new _viewerEvent2.default(event, value);
	      if (!_viewerHelper2.default.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

	      onMouseUp(viewerEvent);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      var _props9 = this.props;
	      var value = _props9.value;
	      var tool = _props9.tool;
	      var onMouseDown = _props9.onMouseDown;
	      var children = _props9.children;

	      var x = event.offsetX,
	          y = event.offsetY;
	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_NONE) return;
	      if (!onMouseDown) return;

	      var viewerEvent = new _viewerEvent2.default(event, value);
	      if (!_viewerHelper2.default.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

	      onMouseDown(viewerEvent);
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(event) {
	      var _props10 = this.props;
	      var value = _props10.value;
	      var tool = _props10.tool;
	      var onMouseMove = _props10.onMouseMove;
	      var children = _props10.children;

	      var x = event.offsetX,
	          y = event.offsetY;
	      var SVGWidth = children.props.width,
	          SVGHeight = children.props.height;

	      if (tool !== _constants.TOOL_NONE) return;
	      if (!onMouseMove) return;

	      var viewerEvent = new _viewerEvent2.default(event, value);
	      if (!_viewerHelper2.default.isPointInsideSVG(viewerEvent.x, viewerEvent.y, SVGWidth, SVGHeight)) return;

	      onMouseMove(viewerEvent);
	    }
	  }, {
	    key: 'handleSpecialKeyChange',
	    value: function handleSpecialKeyChange(event) {
	      var _props11 = this.props;
	      var value = _props11.value;
	      var onChange = _props11.onChange;

	      var key = event.which;
	      var active = event.type === "keydown";

	      if ([18].indexOf(key) === -1) return;

	      var nextValue = active ? _viewerHelper2.default.enableSpecialKey(value) : _viewerHelper2.default.disableSpecialKey(value);

	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount(event) {
	      window.addEventListener("keydown", this.handleSpecialKeyChange, false);
	      window.addEventListener("keyup", this.handleSpecialKeyChange, false);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount(event) {
	      window.removeEventListener("keydown", this.handleSpecialKeyChange, false);
	      window.removeEventListener("keyup", this.handleSpecialKeyChange, false);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var originalSVG = this.props.children;
	      var tool = this.props.tool;
	      var _props$value = this.props.value;
	      var matrix = _props$value.matrix;
	      var mode = _props$value.mode;
	      var specialKeyEnabled = _props$value.specialKeyEnabled;

	      var matrixStr = 'matrix(' + matrix.a + ', ' + matrix.b + ', ' + matrix.c + ', ' + matrix.d + ', ' + matrix.e + ', ' + matrix.f + ')';

	      var style = {};
	      var gStyle = { pointerEvents: "none" };
	      if (tool === _constants.TOOL_PAN) style.cursor = (0, _cursor2.default)(mode === _constants.MODE_PANNING ? 'grabbing' : 'grab');
	      if (tool === _constants.TOOL_ZOOM) style.cursor = (0, _cursor2.default)(specialKeyEnabled ? 'zoom-out' : 'zoom-in');

	      var zoomSelectionRect = void 0;
	      if (mode === _constants.MODE_ZOOMING) {
	        var _props$value2 = this.props.value;
	        var startX = _props$value2.startX;
	        var startY = _props$value2.startY;
	        var endX = _props$value2.endX;
	        var endY = _props$value2.endY;

	        var box = (0, _utils.calculateBox)({ x: startX, y: startY }, { x: endX, y: endY });

	        zoomSelectionRect = _react2.default.createElement('rect', {
	          stroke: '#969FFF',
	          strokeOpacity: 0.7,
	          fill: '#F3F4FF',
	          fillOpacity: 0.7,
	          x: box.x,
	          y: box.y,
	          width: box.width,
	          height: box.height });
	      }

	      return _react2.default.createElement(
	        'svg',
	        {
	          ref: 'svg',
	          width: this.props.width,
	          height: this.props.height,
	          style: Object.assign(style, this.props.style),
	          onMouseDown: function onMouseDown(event) {
	            _this2.handleMouseDown(event);_this2.handleStartPan(event);_this2.handleStartZoom(event);
	          },
	          onMouseMove: function onMouseMove(event) {
	            _this2.handleMouseMove(event);_this2.handleUpdatePan(event);_this2.handleUpdateZoom(event);
	          },
	          onMouseUp: function onMouseUp(event) {
	            _this2.handleMouseUp(event);_this2.handleStopPan(event);_this2.handleStopZoom(event);
	          },
	          onClick: function onClick(event) {
	            return _this2.handleClick(event);
	          }
	        },
	        _react2.default.createElement('rect', {
	          fill: this.props.background,
	          x: 0,
	          y: 0,
	          width: this.props.width,
	          height: this.props.height,
	          style: { pointerEvents: "none" }
	        }),
	        _react2.default.createElement(
	          'g',
	          { ref: 'originalSvg', transform: matrixStr, style: gStyle },
	          _react2.default.createElement('rect', {
	            fill: this.props.SVGBackground,
	            x: 0,
	            y: 0,
	            width: originalSVG.props.width,
	            height: originalSVG.props.height }),
	          _react2.default.createElement(
	            'g',
	            { ref: 'content' },
	            originalSVG.props.children
	          )
	        ),
	        zoomSelectionRect
	      );
	    }
	  }]);

	  return Viewer;
	}(_react2.default.Component);

	exports.default = Viewer;


	Viewer.propTypes = {
	  //width of the viewer displayed on screen
	  width: _react2.default.PropTypes.number.isRequired,

	  //height of the viewer displayed on screen
	  height: _react2.default.PropTypes.number.isRequired,

	  //background of the viewer
	  background: _react2.default.PropTypes.string,

	  //background of the svg
	  SVGBackground: _react2.default.PropTypes.string,

	  //value of the viewer (current point of view)
	  value: _react2.default.PropTypes.object.isRequired,

	  //CSS style of the SVG tag
	  style: _react2.default.PropTypes.object,

	  //handler something changed
	  onChange: _react2.default.PropTypes.func.isRequired,

	  //handler click
	  onClick: _react2.default.PropTypes.func,

	  //handler mouseup
	  onMouseUp: _react2.default.PropTypes.func,

	  //handler mousemove
	  onMouseMove: _react2.default.PropTypes.func,

	  //handler mousedown
	  onMouseDown: _react2.default.PropTypes.func,

	  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM)
	  tool: _react2.default.PropTypes.oneOf([_constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM]),

	  //accept only one node SVG
	  children: function children(props, propName, componentName) {
	    // Only accept a single child, of the appropriate type
	    //credits: http://www.mattzabriskie.com/blog/react-validating-children
	    var prop = props[propName];
	    var types = ['svg'];
	    if (_react2.default.Children.count(prop) !== 1 || types.indexOf(prop.type) === -1) {
	      return new Error('`' + componentName + '` ' + 'should have a single child of the following types: ' + ' `' + types.join('`, `') + '`.');
	    }
	    if (!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) {
	      return new Error('SVG should have props `width` and `height`');
	    }
	  }
	};

	Viewer.defaultProps = {
	  style: {},
	  background: "#616264",
	  SVGBackground: "#fff",
	  tool: _constants.TOOL_NONE
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _transformationMatrixJs = __webpack_require__(4);

	var _utils = __webpack_require__(5);

	var _reactAddonsUpdate = __webpack_require__(6);

	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

	var _constants = __webpack_require__(12);

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
	        specialKeyEnabled: false
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
		2D Transformation Matrix v2.6.5
		(c) Epistemex.com 2014-2016
		License: MIT, header required.
	*/

	/* --- To see contributors: please see readme.md and Change.log --- */

	/**
	 * 2D transformation matrix object initialized with identity matrix.
	 *
	 * The matrix can synchronize a canvas 2D context by supplying the context
	 * as an argument, or later apply current absolute transform to an
	 * existing context.
	 *
	 * To synchronize a DOM element you can use [`toCSS()`]{@link Matrix#toCSS} or [`toCSS3D()`]{@link Matrix#toCSS3D}.
	 *
	 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
	 * @prop {number} a - scale x
	 * @prop {number} b - shear y
	 * @prop {number} c - shear x
	 * @prop {number} d - scale y
	 * @prop {number} e - translate x
	 * @prop {number} f - translate y
	 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
	 * @constructor
	 * @license MIT license (header required)
	 * @copyright Epistemex.com 2014-2016
	 */
	function Matrix(context) {

		var me = this;
		me._t = me.transform;

		me.a = me.d = 1;
		me.b = me.c = me.e = me.f = 0;

		// reset canvas to enable 100% sync.
		if (context)
			(me.context = context).setTransform(1, 0, 0, 1, 0, 0);
	}

	/**
	 * Returns a new matrix that transforms a triangle `t1` into another triangle
	 * `t2`, or throws an exception if it is impossible.
	 *
	 * Note: the method can take both arrays as well as literal objects.
	 * Just make sure that both arguments (`t1`, `t2`) are of the same type.
	 *
	 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t1 - Object or array containing the three points for the triangle.
	 * For object use obj.px, obj.py, obj.qx, obj.qy, obj.rx and obj.ry. For arrays provide the points in the order [px, py, qx, qy, rx, ry], or as point array [{x:,y:}, {x:,y:}, {x:,y:}]
	 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t2 - See description for t1.
	 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
	 * @returns {Matrix}
	 * @throws Exception is matrix becomes not invertible
	 * @static
	 */
	Matrix.fromTriangles = function(t1, t2, context) {

		var m1 = new Matrix(),
			m2 = new Matrix(context),
			r1, r2, rx1, ry1, rx2, ry2;

		if (Array.isArray(t1)) {
			if (typeof t1[0] === "number") {
				rx1 = t1[4]; ry1 = t1[5]; rx2 = t2[4]; ry2 = t2[5];
				r1 = [t1[0] - rx1, t1[1] - ry1, t1[2] - rx1, t1[3] - ry1, rx1, ry1];
				r2 = [t2[0] - rx2, t2[1] - ry2, t2[2] - rx2, t2[3] - ry2, rx2, ry2]
			}
			else {
				rx1 = t1[2].x; ry1 = t1[2].y; rx2 = t2[2].x; ry2 = t2[2].y;
				r1 = [t1[0].x - rx1, t1[0].y - ry1, t1[1].x - rx1, t1[1].y - ry1, rx1, ry1];
				r2 = [t2[0].x - rx2, t2[0].y - ry2, t2[1].x - rx2, t1[1].y - ry2, rx2, ry2]
			}
		}
		else {
			r1 = [t1.px - t1.rx, t1.py - t1.ry, t1.qx - t1.rx, t1.qy - t1.ry, t1.rx, t1.ry];
			r2 = [t2.px - t2.rx, t2.py - t2.ry, t2.qx - t2.rx, t2.qy - t2.ry, t2.rx, t2.ry]
		}

		m1.setTransform.apply(m1, r1);
		m2.setTransform.apply(m2, r2);

		return m2.multiply(m1.inverse())
	};

	/**
	 * Create a new matrix from a SVGMatrix
	 *
	 * @param {SVGMatrix} svgMatrix - source SVG Matrix
	 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
	 * @returns {Matrix}
	 * @static
	 * @private
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix|MDN / SVGMatrix}
	 */
	Matrix.fromSVGMatrix = function(svgMatrix, context) {
		console.warn("Obsolete. Use Matrix.from()");
		return new Matrix(context).multiply(svgMatrix)
	};

	/**
	 * Create a new matrix from a DOMMatrix
	 *
	 * @param {DOMMatrix} domMatrix - source DOMMatrix
	 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
	 * @returns {Matrix}
	 * @static
	 * @private
	 * @see {@link https://drafts.fxtf.org/geometry/#dommatrix|MDN / DOMMatrix}
	 */
	Matrix.fromDOMMatrix = function(domMatrix, context) {
		console.warn("Obsolete. Use Matrix.from()");
		if (!domMatrix.is2D) throw "Cannot use 3D matrix.";
		return new Matrix(context).multiply(domMatrix)
	};

	/**
	 * Create a matrix from a transform list from an SVG shape. The list
	 * can be for example baseVal (i.e. `shape.transform.baseVal`).
	 *
	 * The resulting matrix has all transformations from that list applied
	 * in the same order as the list.
	 *
	 * @param {SVGTransformList} tList - transform list from an SVG shape.
	 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
	 * @returns {Matrix}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGTransformList|MDN / SVGTransformList}
	 */
	Matrix.fromSVGTransformList = function(tList, context) {

		var m = new Matrix(context),
			i = 0;

		while(i < tList.length)
			m.multiply(tList[i++].matrix);

		return m
	};

	/**
	 * Create and transform a new matrix based on given matrix values, or
	 * provide SVGMatrix or a (2D) DOMMatrix or another instance of a Matrix
	 * (in fact, any 2D matrix object using properties a-f can be used as source).
	 *
	 * @example
	 *
	 *     var m = Matrix.from(1, 0.2, 0, 2, 120, 97);
	 *     var m = Matrix.from(domMatrix, ctx);
	 *     var m = Matrix.from(svgMatrix);
	 *     var m = Matrix.from(matrix);
	 *
	 * @param {number|DOMMatrix|SVGMatrix|Matrix} a - number representing a in [a-f], or a Matrix object containing properties a-f
	 * @param {number|CanvasRenderingContext2D} [b] - b property if a is not a matrix object, or optional canvas 2D context
	 * @param {number} [c]
	 * @param {number} [d]
	 * @param {number} [e]
	 * @param {number} [f]
	 * @param {CanvasRenderingContext2D} [context] - optional canvas context to synchronize
	 * @returns {Matrix}
	 * @static
	 */
	Matrix.from = function(a, b, c, d, e, f, context) {

		var m = new Matrix(context);

		if (typeof a === "number")
			m.setTransform(a, b, c, d, e, f);

		else {
			if (typeof a.is2D === "boolean" && !a.is2D) throw "Cannot use 3D DOMMatrix.";
			if (b) m.context = b;
			m.multiply(a)
		}

		return m
	};

	Matrix.prototype = {

		/**
		 * Concatenates transforms of this matrix onto the given child matrix and
		 * returns a new matrix. This instance is used on left side.
		 *
		 * @param {Matrix|SVGMatrix} cm - child matrix to apply concatenation to
		 * @returns {Matrix} - new Matrix instance
		 */
		concat: function(cm) {
			return this.clone().multiply(cm)
		},

		/**
		 * Flips the horizontal values.
		 * @returns {Matrix}
		 */
		flipX: function() {
			return this._t(-1, 0, 0, 1, 0, 0)
		},

		/**
		 * Flips the vertical values.
		 * @returns {Matrix}
		 */
		flipY: function() {
			return this._t(1, 0, 0, -1, 0, 0)
		},

		/**
		 * Reflects incoming (velocity) vector on the normal which will be the
		 * current transformed x axis. Call when a trigger condition is met.
		 *
		 * @param {number} x - vector end point for x (start = 0)
		 * @param {number} y - vector end point for y (start = 0)
		 * @returns {{x: number, y: number}}
		 */
		reflectVector: function(x, y) {

			var v = this.applyToPoint(0, 1),
				d = (v.x * x + v.y * y) * 2;

			x -= d * v.x;
			y -= d * v.y;

			return {x: x, y: y}
		},

		/**
		 * Short-hand to reset current matrix to an identity matrix.
		 * @returns {Matrix}
		 */
		reset: function() {
			return this.setTransform(1, 0, 0, 1, 0, 0)
		},

		/**
		 * Rotates current matrix by angle (accumulative).
		 * @param {number} angle - angle in radians
		 * @returns {Matrix}
		 */
		rotate: function(angle) {
			var cos = Math.cos(angle),
				sin = Math.sin(angle);
			return this._t(cos, sin, -sin, cos, 0, 0)
		},

		/**
		 * Converts a vector given as `x` and `y` to angle, and
		 * rotates (accumulative).
		 * @param x
		 * @param y
		 * @returns {Matrix}
		 */
		rotateFromVector: function(x, y) {
			return this.rotate(Math.atan2(y, x))
		},

		/**
		 * Helper method to make a rotation based on an angle in degrees.
		 * @param {number} angle - angle in degrees
		 * @returns {Matrix}
		 */
		rotateDeg: function(angle) {
			return this.rotate(angle * Math.PI / 180)
		},

		/**
		 * Scales current matrix uniformly and accumulative.
		 * @param {number} f - scale factor for both x and y (1 does nothing)
		 * @returns {Matrix}
		 */
		scaleU: function(f) {
			return this._t(f, 0, 0, f, 0, 0)
		},

		/**
		 * Scales current matrix accumulative.
		 * @param {number} sx - scale factor x (1 does nothing)
		 * @param {number} sy - scale factor y (1 does nothing)
		 * @returns {Matrix}
		 */
		scale: function(sx, sy) {
			return this._t(sx, 0, 0, sy, 0, 0)
		},

		/**
		 * Scales current matrix on x axis accumulative.
		 * @param {number} sx - scale factor x (1 does nothing)
		 * @returns {Matrix}
		 */
		scaleX: function(sx) {
			return this._t(sx, 0, 0, 1, 0, 0)
		},

		/**
		 * Scales current matrix on y axis accumulative.
		 * @param {number} sy - scale factor y (1 does nothing)
		 * @returns {Matrix}
		 */
		scaleY: function(sy) {
			return this._t(1, 0, 0, sy, 0, 0)
		},

		/**
		 * Apply shear to the current matrix accumulative.
		 * @param {number} sx - amount of shear for x
		 * @param {number} sy - amount of shear for y
		 * @returns {Matrix}
		 */
		shear: function(sx, sy) {
			return this._t(1, sy, sx, 1, 0, 0)
		},

		/**
		 * Apply shear for x to the current matrix accumulative.
		 * @param {number} sx - amount of shear for x
		 * @returns {Matrix}
		 */
		shearX: function(sx) {
			return this._t(1, 0, sx, 1, 0, 0)
		},

		/**
		 * Apply shear for y to the current matrix accumulative.
		 * @param {number} sy - amount of shear for y
		 * @returns {Matrix}
		 */
		shearY: function(sy) {
			return this._t(1, sy, 0, 1, 0, 0)
		},

		/**
		 * Apply skew to the current matrix accumulative. Angles in radians.
		 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
		 * @param {number} ax - angle of skew for x
		 * @param {number} ay - angle of skew for y
		 * @returns {Matrix}
		 */
		skew: function(ax, ay) {
			return this.shear(Math.tan(ax), Math.tan(ay))
		},

		/**
		 * Apply skew to the current matrix accumulative. Angles in degrees.
		 * Also see [`skew()`]{@link Matrix#skew}.
		 * @param {number} ax - angle of skew for x
		 * @param {number} ay - angle of skew for y
		 * @returns {Matrix}
		 */
		skewDeg: function(ax, ay) {
			return this.shear(Math.tan(ax / 180 * Math.PI), Math.tan(ay / 180 * Math.PI))
		},

		/**
		 * Apply skew for x to the current matrix accumulative. Angles in radians.
		 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
		 * @param {number} ax - angle of skew for x
		 * @returns {Matrix}
		 */
		skewX: function(ax) {
			return this.shearX(Math.tan(ax))
		},

		/**
		 * Apply skew for y to the current matrix accumulative. Angles in radians.
		 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
		 * @param {number} ay - angle of skew for y
		 * @returns {Matrix}
		 */
		skewY: function(ay) {
			return this.shearY(Math.tan(ay))
		},

		/**
		 * Set current matrix to new absolute matrix.
		 * @param {number} a - scale x
		 * @param {number} b - shear y
		 * @param {number} c - shear x
		 * @param {number} d - scale y
		 * @param {number} e - translate x
		 * @param {number} f - translate y
		 * @returns {Matrix}
		 */
		setTransform: function(a, b, c, d, e, f) {
			var me = this;
			me.a = a;
			me.b = b;
			me.c = c;
			me.d = d;
			me.e = e;
			me.f = f;
			return me._x()
		},

		/**
		 * Translate current matrix accumulative.
		 * @param {number} tx - translation for x
		 * @param {number} ty - translation for y
		 * @returns {Matrix}
		 */
		translate: function(tx, ty) {
			return this._t(1, 0, 0, 1, tx, ty)
		},

		/**
		 * Translate current matrix on x axis accumulative.
		 * @param {number} tx - translation for x
		 * @returns {Matrix}
		 */
		translateX: function(tx) {
			return this._t(1, 0, 0, 1, tx, 0)
		},

		/**
		 * Translate current matrix on y axis accumulative.
		 * @param {number} ty - translation for y
		 * @returns {Matrix}
		 */
		translateY: function(ty) {
			return this._t(1, 0, 0, 1, 0, ty)
		},

		/**
		 * Multiplies current matrix with new matrix values. Also see [`multiply()`]{@link Matrix#multiply}.
		 *
		 * @param {number} a2 - scale x
		 * @param {number} b2 - shear y
		 * @param {number} c2 - shear x
		 * @param {number} d2 - scale y
		 * @param {number} e2 - translate x
		 * @param {number} f2 - translate y
		 * @returns {Matrix}
		 */
		transform: function(a2, b2, c2, d2, e2, f2) {

			var me = this,
				a1 = me.a,
				b1 = me.b,
				c1 = me.c,
				d1 = me.d,
				e1 = me.e,
				f1 = me.f;

			/* matrix order (canvas compatible):
			* ace
			* bdf
			* 001
			*/
			me.a = a1 * a2 + c1 * b2;
			me.b = b1 * a2 + d1 * b2;
			me.c = a1 * c2 + c1 * d2;
			me.d = b1 * c2 + d1 * d2;
			me.e = a1 * e2 + c1 * f2 + e1;
			me.f = b1 * e2 + d1 * f2 + f1;

			return me._x()
		},

		/**
		 * Multiplies current matrix with source matrix.
		 * @param {Matrix|SVGMatrix} m - source matrix to multiply with.
		 * @returns {Matrix}
		 */
		multiply: function(m) {
			return this._t(m.a, m.b, m.c, m.d, m.e, m.f)
		},

		/**
		 * Divide this matrix on input matrix which must be invertible.
		 * @param {Matrix} m - matrix to divide on (divisor)
		 * @throws Exception is input matrix is not invertible
		 * @returns {Matrix}
		 */
		divide: function(m) {

			if (!m.isInvertible())
				throw "Matrix not invertible";

			return this.multiply(m.inverse())
		},

		/**
		 * Divide current matrix on scalar value != 0.
		 * @param {number} d - divisor (can not be 0)
		 * @returns {Matrix}
		 */
		divideScalar: function(d) {

			var me = this;
			me.a /= d;
			me.b /= d;
			me.c /= d;
			me.d /= d;
			me.e /= d;
			me.f /= d;

			return me._x()
		},

		/**
		 * Get an inverse matrix of current matrix. The method returns a new
		 * matrix with values you need to use to get to an identity matrix.
		 * Context from parent matrix is not applied to the returned matrix.
		 *
		 * @param {boolean} [cloneContext=false] - clone current context to resulting matrix
		 * @throws Exception is input matrix is not invertible
		 * @returns {Matrix} - new Matrix instance
		 */
		inverse: function(cloneContext) {

			var me = this,
				m  = new Matrix(cloneContext ? me.context : null),
				dt = me.determinant();

			if (me._q(dt, 0))
				throw "Matrix not invertible.";

			m.a = me.d / dt;
			m.b = -me.b / dt;
			m.c = -me.c / dt;
			m.d = me.a / dt;
			m.e = (me.c * me.f - me.d * me.e) / dt;
			m.f = -(me.a * me.f - me.b * me.e) / dt;

			return m
		},

		/**
		 * Interpolate this matrix with another and produce a new matrix.
		 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
		 * 1 is equal to the second matrix. The `t` value is not clamped.
		 *
		 * Context from parent matrix is not applied to the returned matrix.
		 *
		 * Note: this interpolation is naive. For animation containing rotation,
		 * shear or skew use the [`interpolateAnim()`]{@link Matrix#interpolateAnim} method instead
		 * to avoid unintended flipping.
		 *
		 * @param {Matrix|SVGMatrix} m2 - the matrix to interpolate with.
		 * @param {number} t - interpolation [0.0, 1.0]
		 * @param {CanvasRenderingContext2D} [context] - optional context to affect
		 * @returns {Matrix} - new Matrix instance with the interpolated result
		 */
		interpolate: function(m2, t, context) {

			var me = this,
				m  = context ? new Matrix(context) : new Matrix();

			m.a = me.a + (m2.a - me.a) * t;
			m.b = me.b + (m2.b - me.b) * t;
			m.c = me.c + (m2.c - me.c) * t;
			m.d = me.d + (m2.d - me.d) * t;
			m.e = me.e + (m2.e - me.e) * t;
			m.f = me.f + (m2.f - me.f) * t;

			return m._x()
		},

		/**
		 * Interpolate this matrix with another and produce a new matrix.
		 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
		 * 1 is equal to the second matrix. The `t` value is not constrained.
		 *
		 * Context from parent matrix is not applied to the returned matrix.
		 *
		 * To obtain easing `t` can be preprocessed using easing-functions
		 * before being passed to this method.
		 *
		 * Note: this interpolation method uses decomposition which makes
		 * it suitable for animations (in particular where rotation takes
		 * places).
		 *
		 * @param {Matrix} m2 - the matrix to interpolate with.
		 * @param {number} t - interpolation [0.0, 1.0]
		 * @param {CanvasRenderingContext2D} [context] - optional context to affect
		 * @returns {Matrix} - new Matrix instance with the interpolated result
		 */
		interpolateAnim: function(m2, t, context) {

			var m          = new Matrix(context ? context : null),
				d1         = this.decompose(),
				d2         = m2.decompose(),
				t1         = d1.translate,
				t2         = d2.translate,
				s1         = d1.scale,
				rotation   = d1.rotation + (d2.rotation - d1.rotation) * t,
				translateX = t1.x + (t2.x - t1.x) * t,
				translateY = t1.y + (t2.y - t1.y) * t,
				scaleX     = s1.x + (d2.scale.x - s1.x) * t,
				scaleY     = s1.y + (d2.scale.y - s1.y) * t
				;

			// QR order (t-r-s-sk)
			m.translate(translateX, translateY);
			m.rotate(rotation);
			m.scale(scaleX, scaleY);
			//todo test skew scenarios

			return m._x()
		},

		/**
		 * Decompose the current matrix into simple transforms using either
		 * QR (default) or LU decomposition.
		 *
		 * @param {boolean} [useLU=false] - set to true to use LU rather than QR decomposition
		 * @returns {*} - an object containing current decomposed values (translate, rotation, scale, skew)
		 * @see {@link http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices|Adoption based on this code}
		 * @see {@link https://en.wikipedia.org/wiki/QR_decomposition|More on QR decomposition}
		 * @see {@link https://en.wikipedia.org/wiki/LU_decomposition|More on LU decomposition}
		 */
		decompose: function(useLU) {

			var me        = this,
				a         = me.a,
				b         = me.b,
				c         = me.c,
				d         = me.d,
				acos      = Math.acos,
				atan      = Math.atan,
				sqrt      = Math.sqrt,
				pi        = Math.PI,

				translate = {x: me.e, y: me.f},
				rotation  = 0,
				scale     = {x: 1, y: 1},
				skew      = {x: 0, y: 0},

				determ    = a * d - b * c;	// determinant(), skip DRY here...

			if (useLU) {
				if (a) {
					skew = {x: atan(c / a), y: atan(b / a)};
					scale = {x: a, y: determ / a};
				}
				else if (b) {
					rotation = pi * 0.5;
					scale = {x: b, y: determ / b};
					skew.x = atan(d / b);
				}
				else { // a = b = 0
					scale = {x: c, y: d};
					skew.x = pi * 0.25;
				}
			}
			else {
				// Apply the QR-like decomposition.
				if (a || b) {
					var r = sqrt(a * a + b * b);
					rotation = b > 0 ? acos(a / r) : -acos(a / r);
					scale = {x: r, y: determ / r};
					skew.x = atan((a * c + b * d) / (r * r));
				}
				else if (c || d) {
					var s = sqrt(c * c + d * d);
					rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
					scale = {x: determ / s, y: s};
					skew.y = atan((a * c + b * d) / (s * s));
				}
				else { // a = b = c = d = 0
					scale = {x: 0, y: 0};
				}
			}

			return {
				translate: translate,
				rotation : rotation,
				scale    : scale,
				skew     : skew
			}
		},

		/**
		 * Returns the determinant of the current matrix.
		 * @returns {number}
		 */
		determinant: function() {
			return this.a * this.d - this.b * this.c
		},

		/**
		 * Apply current matrix to `x` and `y` of a point.
		 * Returns a point object.
		 *
		 * @param {number} x - value for x
		 * @param {number} y - value for y
		 * @returns {{x: number, y: number}} A new transformed point object
		 */
		applyToPoint: function(x, y) {

			var me = this;

			return {
				x: x * me.a + y * me.c + me.e,
				y: x * me.b + y * me.d + me.f
			}
		},

		/**
		 * Apply current matrix to array with point objects or point pairs.
		 * Returns a new array with points in the same format as the input array.
		 *
		 * A point object is an object literal:
		 *
		 *     {x: x, y: y}
		 *
		 * so an array would contain either:
		 *
		 *     [{x: x1, y: y1}, {x: x2, y: y2}, ... {x: xn, y: yn}]
		 *
		 * or
		 *
		 *     [x1, y1, x2, y2, ... xn, yn]
		 *
		 * @param {Array} points - array with point objects or pairs
		 * @returns {Array} A new array with transformed points
		 */
		applyToArray: function(points) {

			var i = 0, p, l,
				mxPoints = [];

			if (typeof points[0] === 'number') {

				l = points.length;

				while(i < l) {
					p = this.applyToPoint(points[i++], points[i++]);
					mxPoints.push(p.x, p.y);
				}
			}
			else {
				while(p = points[i++]) {
					mxPoints.push(this.applyToPoint(p.x, p.y));
				}
			}

			return mxPoints
		},

		/**
		 * Apply current matrix to a typed array with point pairs. Although
		 * the input array may be an ordinary array, this method is intended
		 * for more performant use where typed arrays are used. The returned
		 * array is regardless always returned as a `Float32Array`.
		 *
		 * @param {*} points - (typed) array with point pairs [x1, y1, ..., xn, yn]
		 * @param {boolean} [use64=false] - use Float64Array instead of Float32Array
		 * @returns {*} A new typed array with transformed points
		 */
		applyToTypedArray: function(points, use64) {

			var i = 0, p,
				l = points.length,
				mxPoints = use64 ? new Float64Array(l) : new Float32Array(l);

			while(i < l) {
				p = this.applyToPoint(points[i], points[i + 1]);
				mxPoints[i++] = p.x;
				mxPoints[i++] = p.y;
			}

			return mxPoints
		},

		/**
		 * Apply to any canvas 2D context object. This does not affect the
		 * context that optionally was referenced in constructor unless it is
		 * the same context.
		 *
		 * @param {CanvasRenderingContext2D} context - target context
		 * @returns {Matrix}
		 */
		applyToContext: function(context) {
			var me = this;
			context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
			return me
		},

		/**
		 * Returns true if matrix is an identity matrix (no transforms applied).
		 * @returns {boolean}
		 */
		isIdentity: function() {
			var me = this;
			return me._q(me.a, 1) &&
				me._q(me.b, 0) &&
				me._q(me.c, 0) &&
				me._q(me.d, 1) &&
				me._q(me.e, 0) &&
				me._q(me.f, 0)
		},

		/**
		 * Returns true if matrix is invertible
		 * @returns {boolean}
		 */
		isInvertible: function() {
			return !this._q(this.determinant(), 0)
		},

		/**
		 * The method is intended for situations where scale is accumulated
		 * via multiplications, to detect situations where scale becomes
		 * "trapped" with a value of zero. And in which case scale must be
		 * set explicitly to a non-zero value.
		 *
		 * @returns {boolean}
		 */
		isValid: function() {
			return !(this.a * this.d)
		},

		/**
		 * Compares current matrix with another matrix. Returns true if equal
		 * (within epsilon tolerance).
		 * @param {Matrix|SVGMatrix} m - matrix to compare this matrix with
		 * @returns {boolean}
		 */
		isEqual: function(m) {

			var me = this,
				q = me._q;

			return  q(me.a, m.a) &&
					q(me.b, m.b) &&
					q(me.c, m.c) &&
					q(me.d, m.d) &&
					q(me.e, m.e) &&
					q(me.f, m.f)
		},

		/**
		 * Clones current instance and returning a new matrix.
		 * @param {boolean} [noContext=false] don't clone context reference if true
		 * @returns {Matrix} - a new Matrix instance with identical transformations as this instance
		 */
		clone: function(noContext) {
			return new Matrix(noContext ? null : this.context).multiply(this)
		},

		/**
		 * Returns an array with current matrix values.
		 * @returns {Array}
		 */
		toArray: function() {
			var me = this;
			return [me.a, me.b, me.c, me.d, me.e, me.f]
		},

		/**
		 * Returns a binary typed array, either as 32-bit (default) or
		 * 64-bit.
		 * @param {boolean} [use64=false] chose whether to use 32-bit or 64-bit typed array
		 * @returns {*}
		 */
		toTypedArray: function(use64) {

			var a  = use64 ? new Float64Array(6) : new Float32Array(6),
				me = this;

			a[0] = me.a;
			a[1] = me.b;
			a[2] = me.c;
			a[3] = me.d;
			a[4] = me.e;
			a[5] = me.f;

			return a
		},

		/**
		 * Generates a string that can be used with CSS `transform`.
		 * @example
		 *     element.style.transform = m.toCSS();
		 * @returns {string}
		 */
		toCSS: function() {
			return "matrix(" + this.toArray() + ")"
		},

		/**
		 * Generates a `matrix3d()` string that can be used with CSS `transform`.
		 * Although the matrix is for 2D use you may see performance benefits
		 * on some devices using a 3D CSS transform instead of a 2D.
		 * @example
		 *     element.style.transform = m.toCSS3D();
		 * @returns {string}
		 */
		toCSS3D: function() {
			var me = this;
			return "matrix3d(" + me.a + "," + me.b + ",0,0," + me.c + "," + me.d + ",0,0,0,0,1,0," + me.e + "," + me.f + ",0,1)"
		},

		/**
		 * Returns a JSON compatible string of current matrix.
		 * @returns {string}
		 */
		toJSON: function() {
			var me = this;
			return '{"a":' + me.a + ',"b":' + me.b + ',"c":' + me.c + ',"d":' + me.d + ',"e":' + me.e + ',"f":' + me.f + '}'
		},

		/**
		 * Returns a string with current matrix as comma-separated list.
		 * @param {number} [fixLen=4] - truncate decimal values to number of digits
		 * @returns {string}
		 */
		toString: function(fixLen) {
			var me = this;
			fixLen = fixLen || 4;
			return 	 "a=" + me.a.toFixed(fixLen) +
					" b=" + me.b.toFixed(fixLen) +
					" c=" + me.c.toFixed(fixLen) +
					" d=" + me.d.toFixed(fixLen) +
					" e=" + me.e.toFixed(fixLen) +
					" f=" + me.f.toFixed(fixLen)
		},

		/**
		 * Returns a string with current matrix as comma-separated values
		 * string with line-end (CR+LF).
		 * @returns {string}
		 */
		toCSV: function() {
			return this.toArray().join() + "\r\n"
		},

		/**
		 * Convert current matrix into a `DOMMatrix`. If `DOMMatrix` is not
		 * supported, a `null` is returned.
		 *
		 * @returns {DOMMatrix}
		 * @see {@link https://drafts.fxtf.org/geometry/#dommatrix|MDN / SVGMatrix}
		 */
		toDOMMatrix: function() {
			var m = null;
			if ("DOMMatrix" in window) {
				m = new DOMMatrix();
				m.a = this.a;
				m.b = this.b;
				m.c = this.c;
				m.d = this.d;
				m.e = this.e;
				m.f = this.f;
			}
			return m
		},

		/**
		 * Convert current matrix into a `SVGMatrix`. If `SVGMatrix` is not
		 * supported, a `null` is returned.
		 *
		 * Note: BETA
		 *
		 * @returns {SVGMatrix}
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix|MDN / SVGMatrix}
		 */
		toSVGMatrix: function() {

			// as we can not set transforms directly on SVG matrices we need
			// to decompose our own matrix first:
			var dc = this.decompose(),
				translate = dc.translate,
				scale = dc.scale,
				skew = dc.skew,
				eq = this._q,
				svgMatrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

			if (!svgMatrix) return null;

			// apply transformations in the correct order (see decompose()), QR: translate -> rotate -> scale -> skew
			svgMatrix = svgMatrix.translate(translate.x, translate.y);
			svgMatrix = svgMatrix.rotate(dc.rotation / Math.PI * 180);		// SVGMatrix uses degrees
			svgMatrix = svgMatrix.scaleNonUniform(scale.x, scale.y);

			if (!eq(0, skew.x))
				svgMatrix = svgMatrix.skewX(skew.x);

			if (!eq(0, skew.y))
				svgMatrix = svgMatrix.skewY(skew.y);

			return svgMatrix
		},

		/**
		 * Compares floating point values with some tolerance (epsilon)
		 * @param {number} f1 - float 1
		 * @param {number} f2 - float 2
		 * @returns {boolean}
		 * @private
		 */
		_q: function(f1, f2) {
			return Math.abs(f1 - f2) < 1e-14
		},

		/**
		 * Apply current absolute matrix to context if defined, to sync it.
		 * @returns {Matrix}
		 * @private
		 */
		_x: function() {
			var me = this;
			if (me.context)
				me.context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
			return me
		}
	};

	// Node support
	if (true) exports.Matrix = Matrix;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.calculateBox = calculateBox;
	function calculateBox(start, end) {
	  if (start.x <= end.x && start.y <= end.y) {
	    return {
	      x: start.x,
	      y: start.y,
	      width: end.x - start.x,
	      height: end.y - start.y
	    };
	  } else if (start.x >= end.x && start.y <= end.y) {
	    return {
	      x: end.x,
	      y: start.y,
	      width: start.x - end.x,
	      height: end.y - start.y
	    };
	  } else if (start.x >= end.x && start.y >= end.y) {
	    return {
	      x: end.x,
	      y: end.y,
	      width: start.x - end.x,
	      height: start.y - end.y
	    };
	  } else if (start.x <= end.x && start.y >= end.y) {
	    return {
	      x: start.x,
	      y: end.y,
	      width: end.x - start.x,
	      height: start.y - end.y
	    };
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var _assign = __webpack_require__(9);

	var keyOf = __webpack_require__(10);
	var invariant = __webpack_require__(11);
	var hasOwnProperty = {}.hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return _assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });

	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : void 0;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : void 0;
	}

	/**
	 * Returns a updated shallow copy of an object without mutating the original.
	 * See https://facebook.github.io/react/docs/update.html for details.
	 */
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : void 0;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : void 0;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : void 0;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : void 0;
	    _assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : void 0;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : void 0;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MODE_IDLE = exports.MODE_IDLE = 'idle';
	var MODE_PANNING = exports.MODE_PANNING = 'panning';
	var MODE_ZOOMING = exports.MODE_ZOOMING = 'zooming';

	var TOOL_NONE = exports.TOOL_NONE = 'none';
	var TOOL_ZOOM = exports.TOOL_ZOOM = 'zoom';
	var TOOL_PAN = exports.TOOL_PAN = 'pan';

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _viewerHelper = __webpack_require__(3);

	var _viewerHelper2 = _interopRequireDefault(_viewerHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewerEvent = function () {
	  function ViewerEvent(originalEvent, value) {
	    _classCallCheck(this, ViewerEvent);

	    this.originalEvent = originalEvent;
	    this.value = value;
	  }

	  _createClass(ViewerEvent, [{
	    key: 'x',
	    get: function get() {
	      if (!this._cachePoint) {
	        var event = this.originalEvent,
	            value = this.value;
	        var x = event.nativeEvent.offsetX,
	            y = event.nativeEvent.offsetY;
	        this._cachePoint = _viewerHelper2.default.getSVGPoint(value, x, y);
	      }
	      return this._cachePoint.x;
	    }
	  }, {
	    key: 'y',
	    get: function get() {
	      if (!this._cachePoint) {
	        var event = this.originalEvent,
	            value = this.value;
	        var x = event.nativeEvent.offsetX,
	            y = event.nativeEvent.offsetY;
	        this._cachePoint = _viewerHelper2.default.getSVGPoint(value, x, y);
	      }
	      return this._cachePoint.y;
	    }
	  }, {
	    key: 'scaleFactor',
	    get: function get() {
	      if (!this._cacheDecomposedValue) {
	        var value = this.value;
	        this._cacheDecomposedValue = _viewerHelper2.default.decomposeValue(value);
	      }
	      return this._cacheDecomposedValue.scaleFactor;
	    }
	  }, {
	    key: 'translationX',
	    get: function get() {
	      if (!this._cacheDecomposedValue) {
	        var value = this.value;
	        this._cacheDecomposedValue = _viewerHelper2.default.decomposeValue(value);
	      }
	      return this._cacheDecomposedValue.translationX;
	    }
	  }, {
	    key: 'translationY',
	    get: function get() {
	      if (!this._cacheDecomposedValue) {
	        var value = this.value;
	        this._cacheDecomposedValue = _viewerHelper2.default.decomposeValue(value);
	      }
	      return this._cacheDecomposedValue.translationY;
	    }
	  }]);

	  return ViewerEvent;
	}();

	exports.default = ViewerEvent;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (cursor) {
	  if (!needPrefix(cursor)) return cursor;
	  if (isFirefox()) return '-moz-' + cursor;
	  if (isWebkit()) return '-webkit-' + cursor;
	};

	//specs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor

	var needPrefix = function needPrefix(cursor) {
	  return ['zoom-in', 'zoom-out', 'grab', 'grabbing'].indexOf(cursor) > -1;
	};
	var userAgent = function userAgent() {
	  return navigator.userAgent.toLowerCase();
	};
	var isFirefox = function isFirefox() {
	  return userAgent().indexOf('firefox') > -1;
	};
	var isWebkit = function isWebkit() {
	  return userAgent().indexOf('webkit') > -1;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDimensions = __webpack_require__(16);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ViewerResponsive = function (_React$Component) {
	  _inherits(ViewerResponsive, _React$Component);

	  function ViewerResponsive() {
	    _classCallCheck(this, ViewerResponsive);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewerResponsive).apply(this, arguments));
	  }

	  _createClass(ViewerResponsive, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var containerWidth = _props.containerWidth;
	      var containerHeight = _props.containerHeight;
	      var width = _props.width;
	      var height = _props.height;
	      var children = _props.children;

	      var props = _objectWithoutProperties(_props, ['containerWidth', 'containerHeight', 'width', 'height', 'children']);

	      width = width || containerWidth;height = height || containerHeight;
	      return _react2.default.createElement(
	        _viewer2.default,
	        _extends({}, props, { width: width, height: height }),
	        children
	      );
	    }
	  }]);

	  return ViewerResponsive;
	}(_react2.default.Component);

	exports.default = (0, _reactDimensions2.default)()(ViewerResponsive);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var onElementResize = __webpack_require__(17);

	var defaultContainerStyle = {
	  width: '100%',
	  height: '100%',
	  padding: 0,
	  border: 0
	};

	function defaultGetWidth(element) {
	  return element.clientWidth;
	}

	function defaultGetHeight(element) {
	  return element.clientHeight;
	}

	/**
	 * Wraps a react component and adds properties `containerHeight` and
	 * `containerWidth`. Useful for responsive design. Properties update on
	 * window resize. **Note** that the parent element must have either a
	 * height or a width, or nothing will be rendered
	 *
	 * Can be used as a
	 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
	 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
	 * (see examples)
	 *
	 * @param {object} [options]
	 * @param {function} [options.getHeight] A function that is passed an element and returns element
	 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
	 * @param {function} [options.getWidth]  A function that is passed an element and returns element
	 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
	 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
	 * The dimensions of this `div` are what are passed as props to your component. The default style is
	 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
	 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
	 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
	 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
	 * @return {function}                   A higher-order component that can be
	 * used to enhance a react component `Dimensions()(MyComponent)`
	 *
	 * @example
	 * // ES2015
	 * import React from 'react'
	 * import Dimensions from 'react-dimensions'
	 *
	 * class MyComponent extends React.Component {
	 *   render() (
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )
	 * }
	 *
	 * export default Dimensions()(MyComponent) // Enhanced component
	 *
	 * @example
	 * // ES5
	 * var React = require('react')
	 * var Dimensions = require('react-dimensions')
	 *
	 * var MyComponent = React.createClass({
	 *   render: function() {(
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )}
	 * }
	 *
	 * module.exports = Dimensions()(MyComponent) // Enhanced component
	 *
	 */
	module.exports = function Dimensions() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$getHeight = _ref.getHeight;
	  var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
	  var _ref$getWidth = _ref.getWidth;
	  var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;
	  var _ref$containerStyle = _ref.containerStyle;
	  var containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle;
	  var _ref$elementResize = _ref.elementResize;
	  var elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

	  return function (ComposedComponent) {
	    return function (_React$Component) {
	      _inherits(DimensionsHOC, _React$Component);

	      function DimensionsHOC() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, DimensionsHOC);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DimensionsHOC)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.updateDimensions = function () {
	          var container = _this.refs.container;
	          var containerWidth = getWidth(container);
	          var containerHeight = getHeight(container);

	          if (containerWidth !== _this.state.containerWidth || containerHeight !== _this.state.containerHeight) {
	            _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
	          }
	        }, _this.onResize = function () {
	          if (_this.rqf) return;
	          _this.rqf = _this.getWindow().requestAnimationFrame(function () {
	            _this.rqf = null;
	            _this.updateDimensions();
	          });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }
	      // ES7 Class properties
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers


	      // Using arrow functions and ES7 Class properties to autobind
	      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions


	      _createClass(DimensionsHOC, [{
	        key: 'getWindow',


	        // If the component is mounted in a different window to the javascript
	        // context, as with https://github.com/JakeGinnivan/react-popout
	        // then the `window` global will be different from the `window` that
	        // contains the component.
	        // Depends on `defaultView` which is not supported <IE9
	        value: function getWindow() {
	          return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          if (!this.refs.container) {
	            throw new Error('Cannot find container div');
	          }
	          this.updateDimensions();
	          if (elementResize) {
	            // Experimental: `element-resize-event` fires when an element resizes.
	            // It attaches its own window resize listener and also uses
	            // requestAnimationFrame, so we can just call `this.updateDimensions`.
	            onElementResize(this.refs.container, this.updateDimensions);
	          } else {
	            this.getWindow().addEventListener('resize', this.onResize, false);
	          }
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.getWindow().removeEventListener('resize', this.onResize);
	        }

	        /**
	         * Returns the underlying wrapped component instance.
	         * Useful if you need to access a method or property of the component
	         * passed to react-dimensions.
	         *
	         * @return {object} The rendered React component
	         **/

	      }, {
	        key: 'getWrappedInstance',
	        value: function getWrappedInstance() {
	          this.refs.wrappedInstance;
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return React.createElement(
	            'div',
	            { style: containerStyle, ref: 'container' },
	            (this.state.containerWidth || this.state.containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
	              updateDimensions: this.updateDimensions,
	              ref: 'wrappedInstance'
	            }))
	          );
	        }
	      }]);

	      return DimensionsHOC;
	    }(React.Component);
	  };
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	var exports = function exports(element, fn) {
	  var window = this
	  var document = window.document
	  var isIE
	  var requestFrame

	  var attachEvent = document.attachEvent
	  if (typeof navigator !== 'undefined') {
	    isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)
	  }

	  requestFrame = (function () {
	    var raf = window.requestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	          function fallbackRAF(func) {
	            return window.setTimeout(func, 20)
	          }
	    return function requestFrameFunction(func) {
	      return raf(func)
	    }
	  })()

	  var cancelFrame = (function () {
	    var cancel = window.cancelAnimationFrame ||
	      window.mozCancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	          window.clearTimeout
	    return function cancelFrameFunction(id) {
	      return cancel(id)
	    }
	  })()

	  function resizeListener(e) {
	    var win = e.target || e.srcElement
	    if (win.__resizeRAF__) {
	      cancelFrame(win.__resizeRAF__)
	    }
	    win.__resizeRAF__ = requestFrame(function () {
	      var trigger = win.__resizeTrigger__
	      trigger.__resizeListeners__.forEach(function (fn) {
	        fn.call(trigger, e)
	      })
	    })
	  }

	  function objectLoad() {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	  }

	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    } else {
	      if (getComputedStyle(element).position === 'static') {
	        element.style.position = 'relative'
	      }
	      var obj = element.__resizeTrigger__ = document.createElement('object')
	      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
	      obj.setAttribute('class', 'resize-sensor')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      if (isIE) {
	        element.appendChild(obj)
	      }
	      obj.data = 'about:blank'
	      if (!isIE) {
	        element.appendChild(obj)
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn)
	}

	module.exports = (typeof window === 'undefined') ? exports : exports.bind(window)


/***/ }
/******/ ]);