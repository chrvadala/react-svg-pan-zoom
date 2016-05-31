var demo =
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _index = __webpack_require__(4);

	var _snake = __webpack_require__(5);

	var _snake2 = _interopRequireDefault(_snake);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Demo = function (_React$Component) {
	  _inherits(Demo, _React$Component);

	  function Demo(props) {
	    _classCallCheck(this, Demo);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, props));

	    var defaultValue = _index.ViewerHelper.getDefaultValue();
	    defaultValue = _index.ViewerHelper.fitSVGToViewer(defaultValue, 1440, 1440, 400, 400);

	    _this.state = { value: defaultValue, tool: _index.TOOL_NONE, x: 0, y: 0 };
	    return _this;
	  }

	  _createClass(Demo, [{
	    key: 'handleChange',
	    value: function handleChange(event) {
	      this.setState({ value: event.value });
	    }
	  }, {
	    key: 'handleReset',
	    value: function handleReset(event) {
	      this.setState({ value: _index.ViewerHelper.fitSVGToViewer(this.state.value, 1440, 1440, 400, 400) });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(event) {
	      console.log('click', event);
	      console.log('X', event.x);
	      console.log('Y', event.y);
	      console.log('scaleFactor', event.scaleFactor);
	      console.log('translationX', event.translationX);
	      console.log('translationY', event.translationY);
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(event) {
	      this.setState({
	        x: event.x,
	        y: event.y
	      });
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(event) {
	      console.log('up', event.x, event.y);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      console.log('down', event.x, event.y);
	    }
	  }, {
	    key: 'handleChangeTool',
	    value: function handleChangeTool(event) {
	      this.setState({ tool: event.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _index.Viewer,
	          { width: 400, height: 400, style: { border: '1px solid black' },
	            value: this.state.value, tool: this.state.tool,
	            onChange: function onChange(event) {
	              return _this2.handleChange(event);
	            },
	            onClick: function onClick(event) {
	              return _this2.handleClick(event);
	            },
	            onMouseMove: function onMouseMove(event) {
	              return _this2.handleMouseMove(event);
	            },
	            onMouseUp: function onMouseUp(event) {
	              return _this2.handleMouseUp(event);
	            },
	            onMouseDown: function onMouseDown(event) {
	              return _this2.handleMouseDown(event);
	            } },
	          _snake2.default
	        ),
	        _react2.default.createElement(
	          'ul',
	          { style: { listStyle: "none", padding: "0px" } },
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement('input', {
	              type: 'radio',
	              value: _index.TOOL_NONE,
	              checked: this.state.tool === _index.TOOL_NONE,
	              onChange: function onChange(event) {
	                return _this2.handleChangeTool(event);
	              } }),
	            'TOOL: NONE'
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement('input', {
	              type: 'radio',
	              value: _index.TOOL_PAN,
	              checked: this.state.tool === _index.TOOL_PAN,
	              onChange: function onChange(event) {
	                return _this2.handleChangeTool(event);
	              } }),
	            'TOOL: PAN'
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement('input', {
	              type: 'radio',
	              value: _index.TOOL_ZOOM,
	              checked: this.state.tool === _index.TOOL_ZOOM,
	              onChange: function onChange(event) {
	                return _this2.handleChangeTool(event);
	              } }),
	            'TOOL: ZOOM'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick(event) {
	                return _this2.handleReset(event);
	              } },
	            'Reset view'
	          )
	        ),
	        _react2.default.createElement('hr', { style: { border: "1px solid #aaa", borderTop: "0px" } }),
	        _react2.default.createElement(
	          'span',
	          { style: { color: "10px" } },
	          'Note: ',
	          _react2.default.createElement(
	            'strong',
	            null,
	            'Press Alt for zoom out'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          'Position: ',
	          this.state.x,
	          ',',
	          this.state.y
	        )
	      );
	    }
	  }]);

	  return Demo;
	}(_react2.default.Component);

	exports.default = Demo;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = svgPanZoom;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//image credits http://clipartsy.com/Giki/animal/Colorful_Animal_Snake.svg
	//svg2react credits https://theadd.github.io/svg2react/

	exports.default = _react2.default.createElement(
	  'svg',
	  { width: 1440, height: 1440 },
	  _react2.default.createElement('path', { d: 'M990.59 863.597c-.96-128.127-81.78-280.585-150.783-387.578 19.282-1.67 37.952-4.887 55.914-9.417 20.648 61.67 64.087 139.057 131.55 115.483 0 0-30.156-1.17-50.27-29.763 0 0 39.153 26.916 57.578 11.218 0 0-59.255-5.81-109.382-105.827 102.074-35.93 173.367-117.347 173.367-212.096 0-128-130.054-231.772-290.49-231.772-136.616 0-251.173 75.247-282.18 176.634l-1.27-.883c-1.89 7.84-3.31 15.985-4.323 24.406-1.77 10.342-2.715 20.89-2.715 31.614 0 7.69.488 15.29 1.407 22.793 11.45 197.56 177.71 481.938 177.71 481.938-69.91-15.698-164.446 1.796-246.957 37.758-2.34-196.392-148.304-260.133-172.085-246.256-24.306 14.165-2.027 40.48-2.027 40.48 81.14 128.358 69.81 230.883 57.698 277.07-23.518 20.49-42.03 42.65-53.248 65.573-81.523 14.903-105.923 93.166-105.923 93.166-102.032 303.645 277.58 380.006 277.58 380.006 530.383 105.272 649.783-131.687 685.5-234.825 60.89-175.794-122.332-294.837-146.65-299.723zM704.415 911.41s-9.178 11.824-32.152 20.92c-18.22 8.678-41.412 12.845-70.974 9.86-3.735-.318-7.382-.78-10.892-1.4-9.204-1.408-18.95-3.442-29.33-6.226 0 0-28.88-17.336-12.27-30.75 8.565-9.26 33.254-16.43 81.604-16.055 0 0 13.22 1.076 29.28 3.265 6.232.745 11.92 1.665 17.012 2.64 13.564 2.403 26.677 5.55 33.847 9.46l-6.124 8.284z', style: { fill: '#92cd8b' } }),
	  _react2.default.createElement('path', { d: 'M848.103 102.062c1.226 29.462 18.563 52.736 38.69 51.88 20.04-.877 35.343-25.434 34.13-54.92-1.283-29.47-18.55-52.7-38.685-51.867-20.083.832-35.355 25.445-34.135 54.907zM732.727 148.028c8.734 28.924 32.246 47.544 52.473 41.544 20.215-6.07 29.506-34.436 20.747-63.373-8.778-29.018-32.27-47.575-52.467-41.57-20.215 6.058-29.537 34.406-20.753 63.398zM977 552.323s39.153 26.916 57.578 11.218c0 0-77.574-7.563-130.298-155.216 34.23-12.85 56.39-35.806 56.39-35.806 3.992-2.365 2.56-9.33.263-12.182-2.315-2.852-9.73-2.258-9.73-2.258s-111.477 124.736-218.532-47.875c0 0-8.464-2.302-11.174 3.53-2.164 4.68 3.04 9.997 3.04 9.997 55.797 86.083 113.644 99.466 158.115 90.763 7.397 50.965 54.658 199.02 144.614 167.593.006 0-30.15-1.17-50.265-29.763zM344.455 1082.35c-36.063-22.83-58.01-47.187-68.628-71.963-2.59.788-5.174 1.745-7.708 2.978 0 0-46.336 72.18-24.952 144.375 0 0 55.714-71.875 113.412-65.168 1.958.238 3.73.313 5.374.263-5.843-3.31-11.68-6.807-17.5-10.486zM412.976 1117.254c-17.13 20.984-42.4 66.025-25.664 137.15 0 0 61.49-81.33 121.795-112.186-31.683-4.286-63.948-12.244-96.13-24.964zM639.605 1141.473c37.17 34.592 92.22 100.955 80.008 182.408 0 0 84.513-100.985 34.11-209.767-33.02 11.256-71.818 21.58-114.118 27.36zM881.732 1055.46c26.984 20.1 70.767 66.18 64.435 150.605 0 0 66.188-127.5 13.026-221.248-17.336 27.422-42.58 51.403-77.46 70.642zM990.55 863.597c.157 20.59-1.72 40.548-6.068 59.58 21.222 3.298 68.02 16.743 97.633 71.425 0 0 5.606-33.642-7.533-69.585-36.194-37.57-73.958-59.443-84.03-61.42zM710.96 903.363c-.143-.08-.28-.163-.425-.238M670.988 703.662c32.646-33.078 118.523-74.71 118.523-74.71-63.377-11.023-119.192 5.282-148.153 16.693 10.95 22.286 21.097 41.944 29.63 58.017zM747.21 530.27c-70.49-76.537-183.265-76.537-183.265-76.537s-.675 1.92-1.614 5.644c8.93 25.6 18.67 50.865 28.712 75.165 51.635-16.335 156.17-4.273 156.17-4.273zM469.954 780.673s80.56 21.485 71.16 105.41c0 0 40.487-76.086 11.79-131.474-27.905 6.05-56.09 14.658-83.332 25.306.132.263.25.5.382.757zM546.12 906.466c-134.2-11.88-141.96 106.492-141.96 106.492 19.283-61.826 117.64-80.996 147.685-85.457-5.956-5.6-11.593-13.67-5.725-21.034zM566.504 935.953c-29.218 107.65 37.045 158.24 37.045 158.24 1.088-98.765 25.857-140.065 35.323-152.27-19.914 2.627-43.77 1.15-72.37-5.97zM677.895 746.994c-23.925-3.247-50.102-3.128-77.268-.2 12.557 18.213 30.313 53.55 32.46 109.745 0 0 50-50.497 44.808-109.546zM341.54 803.39c52.172-17.092 59.267-73.74 59.267-73.74-15.96 13.966-40.31 22.006-60.838 26.56 1.857 17.193 2.19 32.985 1.57 47.18zM382.676 624.918c-17.556 19.013-55.27 18.913-74.615 17.424 7.496 16.642 13.49 32.69 18.207 48.05 62.89-18.35 56.41-65.474 56.41-65.474z', style: { fill: '#293b8f' } }),
	  _react2.default.createElement('path', { d: 'M726.508 856.608c47.105-34.342 144.594-50.127 144.594-50.127-56.31-46.053-123.49-19.988-151.22-5.705 5.005 16.71 8.384 36.144 6.626 55.833zm-22.092 54.8s0 .05-.075.107c0 .02 0 .02-.06.057-.064.087-.158.194-.296.356 0 .02-.062.038-.062.07-.125.15-.288.312-.463.506 0 .044-.064.062-.076.094-.2.212-.438.456-.682.725l-.182.182c-.28.28-.58.588-.925.92 0 .018-.063.043-.063.068-.332.32-.695.65-1.09 1-.08.077-.155.152-.243.233-.414.37-.858.757-1.333 1.164l-.313.256c-.444.382-.932.776-1.433 1.176-.08.063-.155.126-.23.176-.545.438-1.14.882-1.746 1.35-.18.126-.344.245-.513.376-.637.463-1.288.926-1.976 1.408-.144.1-.294.2-.45.307-.6.412-1.233.818-1.89 1.23-.213.145-.407.283-.638.414-.757.476-1.545.957-2.365 1.433-.268.15-.543.313-.82.47-.73.425-1.5.85-2.295 1.282-.27.143-.544.293-.82.443-.825.425-1.664.85-2.527 1.29-.37.174-.732.362-1.114.537-.957.463-1.945.92-2.972 1.382-.387.163-.775.332-1.163.5-.808.345-1.628.69-2.473 1.033-.294.125-.575.244-.882.376-5.387 2.553-11.218 4.718-17.505 6.426C718.775 964.34 777.398 1053.9 777.398 1053.9c16.63-82.09-33.93-144.387-57.647-168.374-3.522 8.922-8.533 17.624-15.346 25.883z', style: { fill: '#293b8f' } })
	);

/***/ }
/******/ ]);