'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transformationMatrix = require('transformation-matrix');

var _eventFactory = require('./events/event-factory');

var _eventFactory2 = _interopRequireDefault(_eventFactory);

var _pan2 = require('./features/pan');

var _common = require('./features/common');

var _interactions = require('./features/interactions');

var _interactionsTouch = require('./features/interactions-touch');

var _zoom2 = require('./features/zoom');

var _miniature = require('./features/miniature');

var _cursorPolyfill = require('./ui/cursor-polyfill');

var _cursorPolyfill2 = _interopRequireDefault(_cursorPolyfill);

var _borderGradient = require('./ui/border-gradient');

var _borderGradient2 = _interopRequireDefault(_borderGradient);

var _if = require('./ui/if');

var _if2 = _interopRequireDefault(_if);

var _selection = require('./ui/selection');

var _selection2 = _interopRequireDefault(_selection);

var _toolbar = require('./ui-toolbar/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _detectTouch = require('./ui/detect-touch');

var _detectTouch2 = _interopRequireDefault(_detectTouch);

var _miniature2 = require('./ui-miniature/miniature');

var _miniature3 = _interopRequireDefault(_miniature2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//events


//features


//ui


var ReactSVGPanZoom = function (_React$Component) {
  _inherits(ReactSVGPanZoom, _React$Component);

  function ReactSVGPanZoom(props, context) {
    _classCallCheck(this, ReactSVGPanZoom);

    var _this = _possibleConstructorReturn(this, (ReactSVGPanZoom.__proto__ || Object.getPrototypeOf(ReactSVGPanZoom)).call(this, props, context));

    var _this$props = _this.props,
        tool = _this$props.tool,
        value = _this$props.value,
        viewerWidth = _this$props.width,
        viewerHeight = _this$props.height,
        children = _this$props.children;
    var _children$props = children.props,
        SVGWidth = _children$props.width,
        SVGHeight = _children$props.height;


    _this.state = {
      value: value ? value : (0, _common.getDefaultValue)(viewerWidth, viewerHeight, SVGWidth, SVGHeight),
      tool: tool ? tool : _constants.TOOL_NONE
    };
    _this.ViewerDOM = null;
    return _this;
  }

  _createClass(ReactSVGPanZoom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.getValue();

      if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
        var nextValue = (0, _common.setViewerSize)(value, nextProps.width, nextProps.height);
        this.setValue(nextValue);
      }

      var _nextProps$children$p = nextProps.children.props,
          SVGWidth = _nextProps$children$p.width,
          SVGHeight = _nextProps$children$p.height;

      if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
        var _nextValue = (0, _common.setSVGSize)(value, SVGWidth, SVGHeight);
        this.setValue(_nextValue);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.props.value ? this.props.value : this.state.value;
    }
  }, {
    key: 'getTool',
    value: function getTool() {
      return this.props.tool ? this.props.tool : this.state.tool;
    }
  }, {
    key: 'setValue',
    value: function setValue(nextValue) {
      this.setState({ value: nextValue });
      if (this.props.onChangeValue) this.props.onChangeValue(nextValue);
    }
  }, {
    key: 'pan',
    value: function pan(SVGDeltaX, SVGDeltaY) {
      var nextValue = (0, _pan2.pan)(this.getValue(), SVGDeltaX, SVGDeltaY);
      this.setValue(nextValue);
    }
  }, {
    key: 'zoom',
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      var nextValue = (0, _zoom2.zoom)(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitSelection',
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      var nextValue = (0, _zoom2.fitSelection)(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitToViewer',
    value: function fitToViewer() {
      var nextValue = (0, _zoom2.fitToViewer)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'zoomOnViewerCenter',
    value: function zoomOnViewerCenter(scaleFactor) {
      var nextValue = (0, _zoom2.zoomOnViewerCenter)(this.getValue(), scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'setPointOnViewerCenter',
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      var nextValue = (0, _common.setPointOnViewerCenter)(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
      this.setValue(nextValue);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var nextValue = (0, _common.reset)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'changeTool',
    value: function changeTool(tool) {
      this.setState({ tool: tool });
      if (this.props.onChangeTool) this.props.onChangeTool(tool);
    }
  }, {
    key: 'openMiniature',
    value: function openMiniature() {
      var nextValue = (0, _miniature.openMiniature)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'closeMiniature',
    value: function closeMiniature() {
      var nextValue = (0, _miniature.closeMiniature)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'handleViewerEvent',
    value: function handleViewerEvent(event) {
      var props = this.props,
          value = this.state.value,
          ViewerDOM = this.ViewerDOM;


      if (!([_constants.TOOL_NONE, _constants.TOOL_AUTO].indexOf(this.getTool()) >= 0)) return;
      if (event.target === ViewerDOM) return;

      var eventsHandler = {
        click: props.onClick,
        dblclick: props.onDoubleClick,

        mousemove: props.onMouseMove,
        mouseup: props.onMouseUp,
        mousedown: props.onMouseDown,

        touchstart: props.onTouchStart,
        touchmove: props.onTouchMove,
        touchend: props.onTouchEnd,
        touchcancel: props.onTouchCancel
      };

      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;

      onEventHandler((0, _eventFactory2.default)(event, value, ViewerDOM));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props,
          state = this.state;

      if (props.onChangeValue) props.onChangeValue(state.value);

      this.autoPanTimer = setInterval(function () {
        var coords = { x: _this2.state.viewerX, y: _this2.state.viewerY };
        var nextValue = (0, _interactions.onInterval)(null, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props, coords);

        if (_this2.getValue() !== nextValue) {
          _this2.setValue(nextValue);
        }
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
          _state = this.state,
          viewerX = _state.viewerX,
          viewerY = _state.viewerY;

      var tool = this.getTool();
      var value = this.getValue();
      var CustomToolbar = props.customToolbar,
          CustomMiniature = props.customMiniature;


      var panningWithToolAuto = tool === _constants.TOOL_AUTO && value.mode === _constants.MODE_PANNING && value.startX !== value.endX && value.startY !== value.endY;

      var cursor = void 0;

      if (tool === _constants.TOOL_PAN) cursor = (0, _cursorPolyfill2.default)(value.mode === _constants.MODE_PANNING ? 'grabbing' : 'grab');

      if (tool === _constants.TOOL_ZOOM_IN) cursor = (0, _cursorPolyfill2.default)('zoom-in');

      if (tool === _constants.TOOL_ZOOM_OUT) cursor = (0, _cursorPolyfill2.default)('zoom-out');

      if (panningWithToolAuto) cursor = (0, _cursorPolyfill2.default)('grabbing');

      var blockChildEvents = [_constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT].indexOf(tool) >= 0;
      blockChildEvents = blockChildEvents || panningWithToolAuto;

      return _react2.default.createElement(
        'div',
        {
          style: _extends({ position: "relative", width: value.viewerWidth, height: value.viewerHeight }, props.style),
          className: this.props.className },
        _react2.default.createElement(
          'svg',
          {
            ref: function ref(ViewerDOM) {
              return _this3.ViewerDOM = ViewerDOM;
            },
            width: value.viewerWidth,
            height: value.viewerHeight,
            style: cursor ? { cursor: cursor, display: "block" } : { display: 'block' },

            onMouseDown: function onMouseDown(event) {
              var nextValue = (0, _interactions.onMouseDown)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onMouseMove: function onMouseMove(event) {
              var _ViewerDOM$getBoundin = _this3.ViewerDOM.getBoundingClientRect(),
                  left = _ViewerDOM$getBoundin.left,
                  top = _ViewerDOM$getBoundin.top;

              var x = event.clientX - Math.round(left);
              var y = event.clientY - Math.round(top);

              var nextValue = (0, _interactions.onMouseMove)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props, { x: x, y: y });
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.setState({ viewerX: x, viewerY: y });
              _this3.handleViewerEvent(event);
            },
            onMouseUp: function onMouseUp(event) {
              var nextValue = (0, _interactions.onMouseUp)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onClick: function onClick(event) {
              _this3.handleViewerEvent(event);
            },
            onDoubleClick: function onDoubleClick(event) {
              var nextValue = (0, _interactions.onDoubleClick)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onWheel: function onWheel(event) {
              var nextValue = (0, _interactions.onWheel)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onMouseEnter: function onMouseEnter(event) {
              if ((0, _detectTouch2.default)()) return;
              var nextValue = (0, _interactions.onMouseEnterOrLeave)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },
            onMouseLeave: function onMouseLeave(event) {
              var nextValue = (0, _interactions.onMouseEnterOrLeave)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onTouchStart: function onTouchStart(event) {
              var nextValue = (0, _interactionsTouch.onTouchStart)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchMove: function onTouchMove(event) {
              var nextValue = (0, _interactionsTouch.onTouchMove)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchEnd: function onTouchEnd(event) {
              var nextValue = (0, _interactionsTouch.onTouchEnd)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchCancel: function onTouchCancel(event) {
              var nextValue = (0, _interactionsTouch.onTouchCancel)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
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
              transform: (0, _transformationMatrix.toSVG)(value),
              style: blockChildEvents ? { pointerEvents: "none" } : {} },
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
            { condition: tool === _constants.TOOL_NONE && props.detectAutoPan && value.focus },
            _react2.default.createElement(
              'g',
              { style: { pointerEvents: "none" } },
              _react2.default.createElement(
                _if2.default,
                { condition: viewerY <= 20 },
                _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_TOP, width: value.viewerWidth, height: value.viewerHeight })
              ),
              _react2.default.createElement(
                _if2.default,
                { condition: value.viewerWidth - viewerX <= 20 },
                _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_RIGHT, width: value.viewerWidth, height: value.viewerHeight })
              ),
              _react2.default.createElement(
                _if2.default,
                { condition: value.viewerHeight - viewerY <= 20 },
                _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_BOTTOM, width: value.viewerWidth, height: value.viewerHeight })
              ),
              _react2.default.createElement(
                _if2.default,
                { condition: value.focus && viewerX <= 20 },
                _react2.default.createElement(_borderGradient2.default, { direction: _constants.POSITION_LEFT, width: value.viewerWidth, height: value.viewerHeight })
              )
            )
          ),
          _react2.default.createElement(
            _if2.default,
            { condition: value.mode === _constants.MODE_ZOOMING },
            _react2.default.createElement(_selection2.default, { startX: value.startX, startY: value.startY, endX: value.endX, endY: value.endY })
          )
        ),
        props.toolbarPosition === _constants.POSITION_NONE ? null : _react2.default.createElement(CustomToolbar, {
          position: props.toolbarPosition,
          value: value,
          onChangeValue: function onChangeValue(value) {
            return _this3.setValue(value);
          },
          tool: tool,
          onChangeTool: function onChangeTool(tool) {
            return _this3.changeTool(tool);
          } }),
        props.miniaturePosition === _constants.POSITION_NONE ? null : _react2.default.createElement(
          CustomMiniature,
          {
            position: props.miniaturePosition,
            value: value,
            onChangeValue: function onChangeValue(value) {
              return _this3.setValue(value);
            },
            background: this.props.SVGBackground,
            width: this.props.miniatureWidth
          },
          props.children.props.children
        )
      );
    }
  }]);

  return ReactSVGPanZoom;
}(_react2.default.Component);

exports.default = ReactSVGPanZoom;


ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: _propTypes2.default.number.isRequired,

  //height of the viewer displayed on screen
  height: _propTypes2.default.number.isRequired,

  //background of the viewer
  background: _propTypes2.default.string,

  //background of the svg
  SVGBackground: _propTypes2.default.string,

  //value of the viewer (current point of view)
  value: _propTypes2.default.shape({
    version: _propTypes2.default.oneOf([2]).isRequired,
    mode: _propTypes2.default.oneOf([_constants.MODE_IDLE, _constants.MODE_PANNING, _constants.MODE_ZOOMING]).isRequired,
    focus: _propTypes2.default.bool.isRequired,
    a: _propTypes2.default.number.isRequired,
    b: _propTypes2.default.number.isRequired,
    c: _propTypes2.default.number.isRequired,
    d: _propTypes2.default.number.isRequired,
    e: _propTypes2.default.number.isRequired,
    f: _propTypes2.default.number.isRequired,
    viewerWidth: _propTypes2.default.number.isRequired,
    viewerHeight: _propTypes2.default.number.isRequired,
    SVGWidth: _propTypes2.default.number.isRequired,
    SVGHeight: _propTypes2.default.number.isRequired,
    startX: _propTypes2.default.number,
    startY: _propTypes2.default.number,
    endX: _propTypes2.default.number,
    endY: _propTypes2.default.number,
    miniatureOpen: _propTypes2.default.bool.isRequired
  }),

  //CSS style of the Viewer
  style: _propTypes2.default.object,

  //className of the Viewer
  className: _propTypes2.default.string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: _propTypes2.default.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: _propTypes2.default.bool,

  //toolbar position
  toolbarPosition: _propTypes2.default.oneOf([_constants.POSITION_NONE, _constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),

  //handler something changed
  onChangeValue: _propTypes2.default.func,

  //handler tool changed
  onChangeTool: _propTypes2.default.func,

  //handler click
  onClick: _propTypes2.default.func,

  //handler double click
  onDoubleClick: _propTypes2.default.func,

  //handler mouseup
  onMouseUp: _propTypes2.default.func,

  //handler mousemove
  onMouseMove: _propTypes2.default.func,

  //handler mousedown
  onMouseDown: _propTypes2.default.func,

  //if disabled the user can move the image outside the viewer
  preventPanOutside: _propTypes2.default.bool,

  //how much scale in or out
  scaleFactor: _propTypes2.default.number,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: _propTypes2.default.oneOf([_constants.TOOL_AUTO, _constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]),

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: _propTypes2.default.array,

  //override toolbar component
  customToolbar: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

  //miniature position
  miniaturePosition: _propTypes2.default.oneOf([_constants.POSITION_NONE, _constants.POSITION_RIGHT, _constants.POSITION_LEFT]),

  //miniature width
  miniatureWidth: _propTypes2.default.number,

  //override miniature component
  customMiniature: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

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

ReactSVGPanZoom.defaultProps = {
  value: null,
  tool: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  detectWheel: true,
  detectAutoPan: true,
  toolbarPosition: _constants.POSITION_RIGHT,
  modifierKeys: ["Alt", "Shift", "Control"],
  customToolbar: _toolbar2.default,
  preventPanOutside: true,
  scaleFactor: 1.1,
  miniaturePosition: _constants.POSITION_LEFT,
  miniatureWidth: 100,
  customMiniature: _miniature3.default
};