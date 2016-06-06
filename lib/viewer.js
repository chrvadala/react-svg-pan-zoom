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

var _constants = require('./constants');

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
      if (tool === _constants.TOOL_ZOOM) gStyle.cursor = (0, _cursor2.default)(specialKeyEnabled ? 'zoom-out' : 'zoom-in');

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