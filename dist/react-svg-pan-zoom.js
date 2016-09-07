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
	exports.TOOL_ZOOM_OUT = exports.TOOL_ZOOM_IN = exports.TOOL_ZOOM = exports.TOOL_PAN = exports.TOOL_NONE = exports.Toolbar = exports.ViewerHelper = exports.Viewer = undefined;

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	var _viewerHelper = __webpack_require__(3);

	var _viewerHelper2 = _interopRequireDefault(_viewerHelper);

	var _toolbar = __webpack_require__(16);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Viewer = _viewer2.default;
	exports.ViewerHelper = _viewerHelper2.default;
	exports.Toolbar = _toolbar2.default;
	exports.TOOL_NONE = _constants.TOOL_NONE;
	exports.TOOL_PAN = _constants.TOOL_PAN;
	exports.TOOL_ZOOM = _constants.TOOL_ZOOM;
	exports.TOOL_ZOOM_IN = _constants.TOOL_ZOOM_IN;
	exports.TOOL_ZOOM_OUT = _constants.TOOL_ZOOM_OUT;

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

	var _viewerEvent = __webpack_require__(14);

	var _viewerEvent2 = _interopRequireDefault(_viewerEvent);

	var _cursor = __webpack_require__(15);

	var _cursor2 = _interopRequireDefault(_cursor);

	var _utils = __webpack_require__(5);

	var _constants = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Viewer = function (_React$Component) {
	  _inherits(Viewer, _React$Component);

	  function Viewer(props) {
	    _classCallCheck(this, Viewer);

	    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

	    _this.handleSpecialKeyChange = _this.handleSpecialKeyChange.bind(_this);
	    _this.handleAutoPan = _this.handleAutoPan.bind(_this);
	    return _this;
	  }

	  _createClass(Viewer, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps !== this.props;
	    }
	  }, {
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

	      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN].indexOf(tool) === -1) return;
	      if (value.mode !== _constants.MODE_IDLE) return;

	      //let point = ViewerHelper.getSVGPoint(value, x, y);
	      //if(!ViewerHelper.isPointInsideSVG(point.x, point.y, SVGWidth, SVGHeight)) return;

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


	      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN].indexOf(tool) === -1) return;
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


	      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT].indexOf(tool) === -1) return;
	      if (value.mode !== _constants.MODE_ZOOMING && tool !== _constants.TOOL_ZOOM_OUT) return;

	      var selectionMode = abs(startX - endX) > 7 && abs(startY - endY) > 7 && tool !== _constants.TOOL_ZOOM_OUT;

	      var nextValue = void 0;

	      if (selectionMode) {
	        nextValue = _viewerHelper2.default.stopZoomSelection(value, width, height);
	      } else {
	        var needZoomIn = tool === _constants.TOOL_ZOOM_IN || tool === _constants.TOOL_ZOOM && !specialKeyEnabled;
	        var scaleFactor = needZoomIn ? 1.1 : 0.9;
	        nextValue = _viewerHelper2.default.zoom(value, scaleFactor, x, y);
	      }

	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleEvent',
	    value: function handleEvent(event) {
	      var _props7 = this.props;
	      var value = _props7.value;
	      var tool = _props7.tool;
	      var onClick = _props7.onClick;
	      var onMouseUp = _props7.onMouseUp;
	      var onMouseMove = _props7.onMouseMove;
	      var onMouseDown = _props7.onMouseDown;

	      var eventsHandler = { click: onClick, mousemove: onMouseMove, mouseup: onMouseUp, mousedown: onMouseDown };

	      if (tool !== _constants.TOOL_NONE) return;
	      var onEventHandler = eventsHandler[event.type];
	      if (!onEventHandler) return;

	      event.target = this.refs.svg;

	      onEventHandler(new _viewerEvent2.default(event, value));
	    }
	  }, {
	    key: 'handleSpecialKeyChange',
	    value: function handleSpecialKeyChange(event) {
	      var _props8 = this.props;
	      var value = _props8.value;
	      var specialKeys = _props8.specialKeys;
	      var onChange = _props8.onChange;

	      var key = event.which;
	      var active = event.type === "keydown";

	      if (specialKeys.indexOf(key) === -1) return;

	      var nextValue = active ? _viewerHelper2.default.enableSpecialKey(value) : _viewerHelper2.default.disableSpecialKey(value);

	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handlePinch',
	    value: function handlePinch(event) {
	      var _props9 = this.props;
	      var value = _props9.value;
	      var onChange = _props9.onChange;
	      var detectPinch = _props9.detectPinch;

	      if (!detectPinch) return;

	      var rect = this.refs.svg.getBoundingClientRect();
	      var x = event.clientX - Math.round(rect.left);
	      var y = event.clientY - Math.round(rect.top);
	      var delta = Math.max(-1, Math.min(1, event.deltaY));
	      var scaleFactor = (0, _utils.mapRange)(delta, -1, 1, 1.06, 0.96);

	      var nextValue = _viewerHelper2.default.zoom(value, scaleFactor, x, y);
	      event.preventDefault();
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleAutoPanDetection',
	    value: function handleAutoPanDetection(event) {
	      var _props10 = this.props;
	      var value = _props10.value;
	      var onChange = _props10.onChange;
	      var width = _props10.width;
	      var height = _props10.height;
	      var tool = _props10.tool;

	      if (tool !== _constants.TOOL_NONE) return;

	      var rect = this.refs.svg.getBoundingClientRect();
	      var x = event.clientX - Math.round(rect.left);
	      var y = event.clientY - Math.round(rect.top);

	      var nextValue = _viewerHelper2.default.updateAutoPan(value, x, y, width, height);
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'handleAutoPan',
	    value: function handleAutoPan() {
	      var _props11 = this.props;
	      var value = _props11.value;
	      var onChange = _props11.onChange;
	      var tool = _props11.tool;
	      var detectAutoPan = _props11.detectAutoPan;
	      var autoPanX = value.autoPanX;
	      var autoPanY = value.autoPanY;

	      var deltaX = 0,
	          deltaY = 0,
	          delta = 30;

	      if (tool !== _constants.TOOL_NONE) return;
	      if (!value.focus) return;
	      if (!detectAutoPan) return;

	      if (autoPanX === _constants.DIRECTION_LEFT) {
	        deltaX = delta;
	      } else if (autoPanX === _constants.DIRECTION_RIGHT) {
	        deltaX = -delta;
	      }

	      if (autoPanY === _constants.DIRECTION_UP) {
	        deltaY = delta;
	      } else if (autoPanY === _constants.DIRECTION_DOWN) {
	        deltaY = -delta;
	      }

	      var nextValue = _viewerHelper2.default.pan(value, deltaX, deltaY);
	      onChange(new _viewerEvent2.default(null, nextValue));
	    }
	  }, {
	    key: 'handleUpdateFocus',
	    value: function handleUpdateFocus(event, focus) {
	      var _props12 = this.props;
	      var value = _props12.value;
	      var onChange = _props12.onChange;

	      var nextValue = _viewerHelper2.default.updateFocus(value, focus);
	      onChange(new _viewerEvent2.default(event, nextValue));
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount(event) {
	      window.addEventListener("keydown", this.handleSpecialKeyChange, false);
	      window.addEventListener("keyup", this.handleSpecialKeyChange, false);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.autoPanTimer = setInterval(this.handleAutoPan, 200);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount(event) {
	      window.removeEventListener("keydown", this.handleSpecialKeyChange, false);
	      window.removeEventListener("keyup", this.handleSpecialKeyChange, false);
	      clearTimeout(this.autoPanTimer);
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
	      var gStyle = tool === _constants.TOOL_NONE ? {} : { pointerEvents: "none" };
	      if (tool === _constants.TOOL_PAN) style.cursor = (0, _cursor2.default)(mode === _constants.MODE_PANNING ? 'grabbing' : 'grab');
	      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT].indexOf(tool) >= 0) {
	        var needZoomIn = tool === _constants.TOOL_ZOOM_IN || tool === _constants.TOOL_ZOOM && !specialKeyEnabled;
	        style.cursor = (0, _cursor2.default)(needZoomIn ? 'zoom-in' : 'zoom-out');
	      }

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
	            _this2.handleStartPan(event);
	            _this2.handleStartZoom(event);
	          },
	          onMouseMove: function onMouseMove(event) {
	            _this2.handleUpdatePan(event);
	            _this2.handleUpdateZoom(event);
	            _this2.handleAutoPanDetection(event);
	          },
	          onMouseUp: function onMouseUp(event) {
	            _this2.handleStopPan(event);
	            _this2.handleStopZoom(event);
	          },
	          onWheel: function onWheel(event) {
	            _this2.handlePinch(event);
	          },
	          onMouseEnter: function onMouseEnter(event) {
	            _this2.handleUpdateFocus(event, true);
	          },
	          onMouseLeave: function onMouseLeave(event) {
	            _this2.handleUpdateFocus(event, false);
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
	          {
	            ref: 'originalSVG',
	            transform: matrixStr,
	            style: gStyle,
	            onMouseDown: function onMouseDown(event) {
	              return _this2.handleEvent(event);
	            },
	            onMouseMove: function onMouseMove(event) {
	              return _this2.handleEvent(event);
	            },
	            onMouseUp: function onMouseUp(event) {
	              return _this2.handleEvent(event);
	            },
	            onClick: function onClick(event) {
	              return _this2.handleEvent(event);
	            }
	          },
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

	  //array of keys that in zoom mode switch zoom in and zoom out
	  specialKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),

	  //detect zoom operation performed trough pinch gesture or mouse scroll
	  detectPinch: _react2.default.PropTypes.bool,

	  //perform PAN if the mouse is on viewer border
	  detectAutoPan: _react2.default.PropTypes.bool,

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
	  tool: _react2.default.PropTypes.oneOf([_constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]),

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
	  tool: _constants.TOOL_NONE,
	  detectPinch: true,
	  detectAutoPan: true,
	  specialKeys: [91, 17] //91=Win/Cmd 17=Ctrl,
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

	var _constants = __webpack_require__(13);

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
	exports.mapRange = mapRange;
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

	function mapRange(value, low1, high1, low2, high2) {
	  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
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

	var _prodInvariant = __webpack_require__(9),
	    _assign = __webpack_require__(10);

	var keyOf = __webpack_require__(11);
	var invariant = __webpack_require__(12);
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
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : _prodInvariant('1', command, value) : void 0;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. Did you forget to wrap your parameter in an array?', command, specValue) : _prodInvariant('2', command, specValue) : void 0;
	}

	/**
	 * Returns a updated shallow copy of an object without mutating the original.
	 * See https://facebook.github.io/react/docs/update.html for details.
	 */
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : _prodInvariant('3', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : void 0;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : _prodInvariant('4', COMMAND_SET) : void 0;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : _prodInvariant('5', COMMAND_MERGE, mergeObj) : void 0;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : _prodInvariant('6', COMMAND_MERGE, nextValue) : void 0;
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
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : _prodInvariant('7', COMMAND_SPLICE, value) : void 0;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : _prodInvariant('9', COMMAND_APPLY, spec[COMMAND_APPLY]) : void 0;
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

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule reactProdInvariant
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
	var TOOL_ZOOM_IN = exports.TOOL_ZOOM_IN = 'zoom-in';
	var TOOL_ZOOM_OUT = exports.TOOL_ZOOM_OUT = 'zoom-out';

	var DIRECTION_UP = exports.DIRECTION_UP = 'up';
	var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = 'right';
	var DIRECTION_DOWN = exports.DIRECTION_DOWN = 'down';
	var DIRECTION_LEFT = exports.DIRECTION_LEFT = 'left';
	var DIRECTION_NONE = exports.DIRECTION_NONE = 'none';

/***/ },
/* 14 */
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
	    key: 'point',
	    get: function get() {
	      if (!this._cachePoint) {
	        var event = this.originalEvent,
	            value = this.value;

	        var rect = event.target.getBoundingClientRect();
	        var x = event.clientX - Math.round(rect.left);
	        var y = event.clientY - Math.round(rect.top);

	        this._cachePoint = _viewerHelper2.default.getSVGPoint(value, x, y);
	      }
	      return this._cachePoint;
	    }
	  }, {
	    key: 'x',
	    get: function get() {
	      return this.point.x;
	    }
	  }, {
	    key: 'y',
	    get: function get() {
	      return this.point.y;
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = Toolbar;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(13);

	var _icons = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var STYLE_TOOLBAR = {
	  backgroundColor: '#28292D',
	  padding: "5px 2px 2px",
	  width: "24px",
	  borderRadius: "2px"
	};

	var STYLE_ELEMENT = {
	  display: "block",
	  width: "24px",
	  height: "24px",
	  marginBottom: "5px"
	};

	var ICON_COLOR_OFF = '#FFF';
	var ICON_COLOR_ON = '#1CA6FC';

	function Toolbar(_ref) {
	  var tool = _ref.tool;
	  var onChangeTool = _ref.onChangeTool;
	  var style = _ref.style;


	  var handleChangeTool = function handleChangeTool(event, tool) {
	    event.stopPropagation();
	    event.preventDefault();
	    onChangeTool(tool);
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: _extends({}, STYLE_TOOLBAR, style) },
	    _react2.default.createElement(
	      'a',
	      { href: true, style: STYLE_ELEMENT, title: 'Selection', onClick: function onClick(event) {
	          return handleChangeTool(event, _constants.TOOL_NONE);
	        } },
	      _react2.default.createElement(
	        'svg',
	        { width: 24, height: 24 },
	        _react2.default.createElement(_icons.IconCursor, { color: tool === _constants.TOOL_NONE ? ICON_COLOR_ON : ICON_COLOR_OFF })
	      )
	    ),
	    _react2.default.createElement(
	      'a',
	      { style: STYLE_ELEMENT, href: 'javascript:;', title: 'Pan', onClick: function onClick(event) {
	          return onChangeTool(_constants.TOOL_PAN);
	        } },
	      _react2.default.createElement(
	        'svg',
	        { width: 24, height: 24 },
	        _react2.default.createElement(_icons.IconPan, { color: tool === _constants.TOOL_PAN ? ICON_COLOR_ON : ICON_COLOR_OFF })
	      )
	    ),
	    _react2.default.createElement(
	      'a',
	      { style: STYLE_ELEMENT, href: 'javascript:;', title: 'Zoom', onClick: function onClick(event) {
	          return onChangeTool(_constants.TOOL_ZOOM);
	        } },
	      _react2.default.createElement(
	        'svg',
	        { width: 24, height: 24 },
	        _react2.default.createElement(_icons.IconZoom, { color: tool === _constants.TOOL_ZOOM ? ICON_COLOR_ON : ICON_COLOR_OFF })
	      )
	    ),
	    _react2.default.createElement(
	      'a',
	      { style: STYLE_ELEMENT, href: 'javascript:;', title: 'Zoom in', onClick: function onClick(event) {
	          return onChangeTool(_constants.TOOL_ZOOM_IN);
	        } },
	      _react2.default.createElement(
	        'svg',
	        { width: 24, height: 24 },
	        _react2.default.createElement(_icons.IconZoomIn, { color: tool === _constants.TOOL_ZOOM_IN ? ICON_COLOR_ON : ICON_COLOR_OFF })
	      )
	    ),
	    _react2.default.createElement(
	      'a',
	      { style: STYLE_ELEMENT, href: 'javascript:;', title: 'Zoom out', onClick: function onClick(event) {
	          return onChangeTool(_constants.TOOL_ZOOM_OUT);
	        } },
	      _react2.default.createElement(
	        'svg',
	        { width: 24, height: 24 },
	        _react2.default.createElement(_icons.IconZoomOut, { color: tool === _constants.TOOL_ZOOM_OUT ? ICON_COLOR_ON : ICON_COLOR_OFF })
	      )
	    )
	  );
	}

	Toolbar.propTypes = {
	  tool: _react.PropTypes.oneOf([_constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]).isRequired,
	  onChangeTool: _react.PropTypes.func.isRequired,
	  style: _react.PropTypes.object
	};

	Toolbar.defaultProps = {
	  style: {}
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IconZoomOut = exports.IconZoomIn = exports.IconZoom = exports.IconPan = exports.IconCursor = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IconCursor = exports.IconCursor = function IconCursor(_ref) {
	  var color = _ref.color;
	  return _react2.default.createElement("path", { stroke: color,
	    d: "M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8,5.12V15.9L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" });
	};

	var IconPan = exports.IconPan = function IconPan(_ref2) {
	  var color = _ref2.color;
	  return _react2.default.createElement("path", { stroke: color,
	    d: "M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" });
	};

	var IconZoom = exports.IconZoom = function IconZoom(_ref3) {
	  var color = _ref3.color;
	  return _react2.default.createElement("path", { stroke: color,
	    d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" });
	};

	var IconZoomIn = exports.IconZoomIn = function IconZoomIn(_ref4) {
	  var color = _ref4.color;
	  return _react2.default.createElement(
	    "g",
	    null,
	    _react2.default.createElement("path", { stroke: color,
	      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
	    _react2.default.createElement("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z", stroke: color })
	  );
	};

	var IconZoomOut = exports.IconZoomOut = function IconZoomOut(_ref5) {
	  var color = _ref5.color;
	  return _react2.default.createElement("path", { stroke: color,
	    d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" });
	};

/***/ }
/******/ ]);