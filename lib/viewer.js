'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewerEvent = require('./viewer-event');

var _viewerEvent2 = _interopRequireDefault(_viewerEvent);

var _cursor = require('./ui/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _borderGradient = require('./ui/border-gradient');

var _borderGradient2 = _interopRequireDefault(_borderGradient);

var _pan = require('./features/pan');

var _common = require('./features/common');

var _if = require('./ui/if');

var _if2 = _interopRequireDefault(_if);

var _selection = require('./ui/selection');

var _selection2 = _interopRequireDefault(_selection);

var _interactions = require('./features/interactions');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer = function (_React$Component) {
  _inherits(Viewer, _React$Component);

  function Viewer() {
    _classCallCheck(this, Viewer);

    return _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).apply(this, arguments));
  }

  _createClass(Viewer, [{
    key: 'handleEvent',
    value: function handleEvent(event) {
      var props = this.props;
      var value = props.value,
          tool = props.tool;

      var eventsHandler = {
        click: props.onClick,
        mousemove: props.onMouseMove,
        mouseup: props.onMouseUp,
        mousedown: props.onMouseDown
      };

      if (tool !== _constants.TOOL_NONE) return;
      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;

      onEventHandler(new _viewerEvent2.default(event, value, this.refs.Viewer));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      var onChange = nextProps.onChange,
          viewerWidth = nextProps.width,
          viewerHeight = nextProps.height;


      if (nextProps.width === props.width && nextProps.height === props.height) return;

      var nextValue = (0, _common.setViewerSize)(nextProps.value, nextProps.width, nextProps.height);

      onChange(new _viewerEvent2.default(null, nextValue, Viewer));
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount(event) {
      var _props = this.props,
          onChange = _props.onChange,
          onReady = _props.onReady,
          viewerWidth = _props.width,
          viewerHeight = _props.height,
          children = _props.children;
      var _children$props = children.props,
          SVGWidth = _children$props.width,
          SVGHeight = _children$props.height;
      var Viewer = this.refs.Viewer;


      var nextValue = (0, _common.getDefaultValue)(viewerWidth, viewerHeight, SVGWidth, SVGHeight);
      onChange(new _viewerEvent2.default(null, nextValue, Viewer));
      setTimeout(function () {
        if (onReady) onReady();
      }, 0);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.autoPanTimer = setInterval(function () {
        var _props2 = _this2.props,
            tool = _props2.tool,
            detectAutoPan = _props2.detectAutoPan,
            value = _props2.value,
            onChange = _props2.onChange;

        if (!(tool === _constants.TOOL_NONE && detectAutoPan && value.focus)) return;

        var nextValue = (0, _pan.autoPanIfNeeded)(value);
        if (value !== nextValue) onChange(new _viewerEvent2.default(null, nextValue, _this2.refs.Viewer));
      }, 200);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.autoPanTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props,
          refs = this.refs;
      var value = props.value,
          style = props.style,
          tool = props.tool;

      if (!(0, _common.isValueValid)(value)) return null;

      if (tool === _constants.TOOL_PAN) {
        style = _extends({
          cursor: (0, _cursor2.default)(value.mode === _constants.MODE_PANNING ? 'grabbing' : 'grab')
        }, style);
      }

      if (tool === _constants.TOOL_ZOOM_IN || tool === _constants.TOOL_ZOOM_OUT) {
        style = _extends({
          cursor: tool === _constants.TOOL_ZOOM_IN ? 'zoom-in' : 'zoom-out'
        }, style);
      }

      return _react2.default.createElement(
        'svg',
        {
          ref: 'Viewer',
          width: value.viewerWidth,
          height: value.viewerHeight,
          style: style,
          onMouseDown: function onMouseDown(event) {
            return (0, _interactions.onMouseDown)(event, _this3.props, _this3.refs.Viewer);
          },
          onMouseMove: function onMouseMove(event) {
            return (0, _interactions.onMouseMove)(event, _this3.props, _this3.refs.Viewer);
          },
          onMouseUp: function onMouseUp(event) {
            return (0, _interactions.onMouseUp)(event, _this3.props, _this3.refs.Viewer);
          },
          onWheel: function onWheel(event) {
            return (0, _interactions.onWheel)(event, _this3.props, _this3.refs.Viewer);
          },
          onMouseEnter: function onMouseEnter(event) {
            return (0, _interactions.onMouseEnterOrLeave)(event, _this3.props, _this3.refs.Viewer);
          },
          onMouseLeave: function onMouseLeave(event) {
            return (0, _interactions.onMouseEnterOrLeave)(event, _this3.props, _this3.refs.Viewer);
          } },
        _react2.default.createElement('rect', {
          fill: props.background,
          x: 0,
          y: 0,
          width: value.viewerWidth,
          height: value.viewerHeight,
          style: { pointerEvents: "none" }
        }),
        _react2.default.createElement(
          'g',
          {
            transform: 'matrix(' + value.a + ', ' + value.b + ', ' + value.c + ', ' + value.d + ', ' + value.e + ', ' + value.f + ')',
            style: tool === _constants.TOOL_NONE ? {} : { pointerEvents: "none" },
            onMouseDown: function onMouseDown(event) {
              return _this3.handleEvent(event);
            },
            onMouseMove: function onMouseMove(event) {
              return _this3.handleEvent(event);
            },
            onMouseUp: function onMouseUp(event) {
              return _this3.handleEvent(event);
            },
            onClick: function onClick(event) {
              return _this3.handleEvent(event);
            }
          },
          _react2.default.createElement('rect', {
            fill: this.props.SVGBackground,
            x: 0,
            y: 0,
            width: value.SVGWidth,
            height: value.SVGHeight }),
          _react2.default.createElement(
            'g',
            null,
            props.children.props.children
          )
        ),
        _react2.default.createElement(
          _if2.default,
          { condition: props.tool === _constants.TOOL_NONE && props.detectAutoPan && value.focus },
          _react2.default.createElement(
            'g',
            { style: { pointerEvents: "none" } },
            _react2.default.createElement(
              _if2.default,
              { condition: value.viewerY <= 20 },
              _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_TOP, width: value.viewerWidth, height: value.viewerHeight })
            ),
            _react2.default.createElement(
              _if2.default,
              { condition: value.viewerWidth - value.viewerX <= 20 },
              _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_RIGHT, width: value.viewerWidth, height: value.viewerHeight })
            ),
            _react2.default.createElement(
              _if2.default,
              { condition: value.viewerHeight - value.viewerY <= 20 },
              _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_BOTTOM, width: value.viewerWidth, height: value.viewerHeight })
            ),
            _react2.default.createElement(
              _if2.default,
              { condition: value.focus && value.viewerX <= 20 },
              _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_LEFT, width: value.viewerWidth, height: value.viewerHeight })
            )
          )
        ),
        _react2.default.createElement(
          _if2.default,
          { condition: value.mode === _constants.MODE_ZOOMING },
          _react2.default.createElement(_selection2.default, { startX: value.startX, startY: value.startY, endX: value.endX, endY: value.endY })
        )
      );
    }
  }]);

  return Viewer;
}(_react2.default.Component);

exports.default = Viewer;


Viewer.propTypes = {
  //width of the viewer displayed on screen
  width: _react.PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: _react.PropTypes.number.isRequired,

  //background of the viewer
  background: _react.PropTypes.string,

  //background of the svg
  SVGBackground: _react.PropTypes.string,

  //value of the viewer (current point of view)
  value: _react.PropTypes.object,

  //CSS style of the SVG tag
  style: _react.PropTypes.object,

  //array of keys that in zoom mode switch zoom in and zoom out
  specialKeys: _react.PropTypes.arrayOf(_react.PropTypes.number),

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: _react.PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: _react.PropTypes.bool,

  //handler something changed
  onChange: _react.PropTypes.func.isRequired,

  //handler viewer is ready
  onReady: _react.PropTypes.func,

  //handler click
  onClick: _react.PropTypes.func,

  //handler mouseup
  onMouseUp: _react.PropTypes.func,

  //handler mousemove
  onMouseMove: _react.PropTypes.func,

  //handler mousedown
  onMouseDown: _react.PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: _react.PropTypes.oneOf([_constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]),

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
  detectWheel: true,
  detectAutoPan: true,
  onReady: null
};