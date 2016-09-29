'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewerHelper = require('./viewer-helper');

var _viewerHelper2 = _interopRequireDefault(_viewerHelper);

var _viewerEvent = require('./viewer-event');

var _viewerEvent2 = _interopRequireDefault(_viewerEvent);

var _cursor = require('./cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _utils = require('./utils');

var _gradient = require('./gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _constants = require('./constants');

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

      value = value || _viewerHelper2.default.getDefaultValue();

      if (tool !== _constants.TOOL_PAN) return;
      if (value.mode !== _constants.MODE_IDLE) return;

      var nextValue = _viewerHelper2.default.startPan(value, x, y);

      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();
      var SVGWidth = children.props.width,
          SVGHeight = children.props.height;

      if (tool !== _constants.TOOL_PAN) return;
      if (value.mode !== _constants.MODE_PANNING) return;

      //the mouse exited and reentered into svg
      var forceExit = value.mode === _constants.MODE_PANNING && event.buttons === 0;

      var nextValue = forceExit ? _viewerHelper2.default.stopPan(value) : _viewerHelper2.default.updatePan(value, x, y, 20, SVGWidth, SVGHeight, width, height);

      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();

      if (tool !== _constants.TOOL_PAN) return;
      if (value.mode !== _constants.MODE_PANNING) return;

      var nextValue = _viewerHelper2.default.stopPan(value, x, y);

      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();
      var SVGWidth = children.props.width,
          SVGHeight = children.props.height;

      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN].indexOf(tool) === -1) return;
      if (value.mode !== _constants.MODE_IDLE) return;

      //let point = ViewerHelper.getSVGPoint(value, x, y);
      //if(!ViewerHelper.isPointInsideSVG(point.x, point.y, SVGWidth, SVGHeight)) return;

      var nextValue = _viewerHelper2.default.startZoomSelection(value, x, y);

      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();

      if ([_constants.TOOL_ZOOM, _constants.TOOL_ZOOM_IN].indexOf(tool) === -1) return;
      if (value.mode !== _constants.MODE_ZOOMING) return;

      //the mouse exited and reentered into svg
      var forceExit = event.buttons === 0;

      var nextValue = forceExit ? _viewerHelper2.default.stopZoomSelection(value, width, height) : _viewerHelper2.default.updateZoomSelection(value, x, y);

      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();
      var _value = value;
      var startX = _value.startX;
      var endX = _value.endX;
      var startY = _value.startY;
      var endY = _value.endY;
      var specialKeyEnabled = _value.specialKeyEnabled;


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
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();
      var eventsHandler = { click: onClick, mousemove: onMouseMove, mouseup: onMouseUp, mousedown: onMouseDown };

      if (tool !== _constants.TOOL_NONE) return;
      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;

      onEventHandler(new _viewerEvent2.default(event, value, this.refs.svg));
    }
  }, {
    key: 'handleSpecialKeyChange',
    value: function handleSpecialKeyChange(event) {
      var _props8 = this.props;
      var value = _props8.value;
      var specialKeys = _props8.specialKeys;
      var onChange = _props8.onChange;

      value = value || _viewerHelper2.default.getDefaultValue();
      var key = event.which;
      var active = event.type === "keydown";

      if (specialKeys.indexOf(key) === -1) return;

      var nextValue = active ? _viewerHelper2.default.enableSpecialKey(value) : _viewerHelper2.default.disableSpecialKey(value);

      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
    }
  }, {
    key: 'handlePinch',
    value: function handlePinch(event) {
      var _props9 = this.props;
      var value = _props9.value;
      var onChange = _props9.onChange;
      var detectPinch = _props9.detectPinch;

      value = value || _viewerHelper2.default.getDefaultValue();
      if (!detectPinch) return;

      var rect = this.refs.svg.getBoundingClientRect();
      var x = event.clientX - Math.round(rect.left);
      var y = event.clientY - Math.round(rect.top);
      var delta = Math.max(-1, Math.min(1, event.deltaY));
      var scaleFactor = (0, _utils.mapRange)(delta, -1, 1, 1.06, 0.96);

      var nextValue = _viewerHelper2.default.zoom(value, scaleFactor, x, y);
      event.preventDefault();
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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

      value = value || _viewerHelper2.default.getDefaultValue();
      if (tool !== _constants.TOOL_NONE) return;

      var rect = this.refs.svg.getBoundingClientRect();
      var x = event.clientX - Math.round(rect.left);
      var y = event.clientY - Math.round(rect.top);

      var nextValue = _viewerHelper2.default.updateAutoPan(value, x, y, width, height);
      if (value !== nextValue) onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
    }
  }, {
    key: 'handleAutoPan',
    value: function handleAutoPan() {
      var _props11 = this.props;
      var value = _props11.value;
      var onChange = _props11.onChange;
      var tool = _props11.tool;
      var detectAutoPan = _props11.detectAutoPan;

      value = value || _viewerHelper2.default.getDefaultValue();
      var _value2 = value;
      var autoPanX = _value2.autoPanX;
      var autoPanY = _value2.autoPanY;

      var deltaX = 0,
          deltaY = 0,
          delta = 30;

      if (tool !== _constants.TOOL_NONE) return;
      if (!value.focus) return;
      if (!detectAutoPan) return;
      if (autoPanX === _constants.DIRECTION_NONE && autoPanY === _constants.DIRECTION_NONE) return;

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
      onChange(new _viewerEvent2.default(null, nextValue, this.refs.svg));
    }
  }, {
    key: 'handleUpdateFocus',
    value: function handleUpdateFocus(event, focus) {
      var _props12 = this.props;
      var value = _props12.value;
      var onChange = _props12.onChange;

      value = value || _viewerHelper2.default.getDefaultValue();
      var nextValue = _viewerHelper2.default.updateFocus(value, focus);
      onChange(new _viewerEvent2.default(event, nextValue, this.refs.svg));
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
      var value = this.props.value || _viewerHelper2.default.getDefaultValue();
      var matrix = value.matrix;
      var mode = value.mode;
      var specialKeyEnabled = value.specialKeyEnabled;
      var autoPanX = value.autoPanX;
      var autoPanY = value.autoPanY;
      var focus = value.focus;
      var _props13 = this.props;
      var SVGWidth = _props13.width;
      var SVGHeight = _props13.height;
      var detectAutoPan = _props13.detectAutoPan;
      var tool = _props13.tool;

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
        var startX = value.startX;
        var startY = value.startY;
        var endX = value.endX;
        var endY = value.endY;

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
          width: SVGWidth,
          height: SVGHeight,
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
        focus && tool === _constants.TOOL_NONE && detectAutoPan ? _react2.default.createElement(
          'g',
          { style: { pointerEvents: "none" } },
          _react2.default.createElement(_gradient2.default, { direction: autoPanX, SVGWidth: SVGWidth, SVGHeight: SVGHeight }),
          _react2.default.createElement(_gradient2.default, { direction: autoPanY, SVGWidth: SVGWidth, SVGHeight: SVGHeight })
        ) : null,
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
  value: _react2.default.PropTypes.object,

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
  value: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  tool: _constants.TOOL_NONE,
  detectPinch: true,
  detectAutoPan: true,
  specialKeys: [91, 17] //91=Win/Cmd 17=Ctrl,
};