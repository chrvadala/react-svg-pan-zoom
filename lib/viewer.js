'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transformationMatrix = require('transformation-matrix');

var _eventFactory = require('./events/event-factory');

var _eventFactory2 = _interopRequireDefault(_eventFactory);

var _pan2 = require('./features/pan');

var _common = require('./features/common');

var _interactions = require('./features/interactions');

var _interactionsTouch = require('./features/interactions-touch');

var _zoom2 = require('./features/zoom');

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
      var CustomToolbar = props.customToolbar;

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
              var _onMouseDown = (0, _interactions.onMouseDown)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props),
                  operation = _onMouseDown.operation,
                  nextValue = _onMouseDown.nextValue;

              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);

              console.log(operation);
              if (operation === ACTION_ZOOM) props.onZoom && props.onZoom((0, _eventFactory2.default)(event, nextValue, _this3.ViewerDOM));
            },
            onMouseMove: function onMouseMove(event) {
              var _ViewerDOM$getBoundin = _this3.ViewerDOM.getBoundingClientRect(),
                  left = _ViewerDOM$getBoundin.left,
                  top = _ViewerDOM$getBoundin.top;

              var x = event.clientX - Math.round(left);
              var y = event.clientY - Math.round(top);

              var _onMouseDown2 = (0, _interactions.onMouseDown)(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props),
                  operation = _onMouseDown2.operation,
                  nextValue = _onMouseDown2.nextValue;

              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.setState({ viewerX: x, viewerY: y });
              _this3.handleViewerEvent(event);

              console.log(operation);
              if (operation === ACTION_PAN) props.onPan && props.onPan((0, _eventFactory2.default)(event, nextValue, _this3.ViewerDOM));
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
          } })
      );
    }
  }]);

  return ReactSVGPanZoom;
}(_react2.default.Component);

exports.default = ReactSVGPanZoom;


ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: _react.PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: _react.PropTypes.number.isRequired,

  //background of the viewer
  background: _react.PropTypes.string,

  //background of the svg
  SVGBackground: _react.PropTypes.string,

  //value of the viewer (current point of view)
  value: _react.PropTypes.shape({
    version: _react.PropTypes.oneOf([2]).isRequired,
    mode: _react.PropTypes.oneOf([_constants.MODE_IDLE, _constants.MODE_PANNING, _constants.MODE_ZOOMING]).isRequired,
    focus: _react.PropTypes.bool.isRequired,
    a: _react.PropTypes.number.isRequired,
    b: _react.PropTypes.number.isRequired,
    c: _react.PropTypes.number.isRequired,
    d: _react.PropTypes.number.isRequired,
    e: _react.PropTypes.number.isRequired,
    f: _react.PropTypes.number.isRequired,
    viewerWidth: _react.PropTypes.number.isRequired,
    viewerHeight: _react.PropTypes.number.isRequired,
    SVGWidth: _react.PropTypes.number.isRequired,
    SVGHeight: _react.PropTypes.number.isRequired,
    startX: _react.PropTypes.number,
    startY: _react.PropTypes.number,
    endX: _react.PropTypes.number,
    endY: _react.PropTypes.number
  }),

  //CSS style of the Viewer
  style: _react.PropTypes.object,

  //className of the Viewer
  className: _react.PropTypes.string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: _react.PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: _react.PropTypes.bool,

  //toolbar position
  toolbarPosition: _react.PropTypes.oneOf([_constants.POSITION_NONE, _constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),

  //handler something changed
  onChangeValue: _react.PropTypes.func,

  //handler tool changed
  onChangeTool: _react.PropTypes.func,

  //handler click
  onClick: _react.PropTypes.func,

  //handler double click
  onDoubleClick: _react.PropTypes.func,

  //handler mouseup
  onMouseUp: _react.PropTypes.func,

  //handler mousemove
  onMouseMove: _react.PropTypes.func,

  //handler mousedown
  onMouseDown: _react.PropTypes.func,

  // callback that fires while a user is panning the SVG
  onPan: _react.PropTypes.func,

  // callback that fires on zoom in/out
  onZoom: _react.PropTypes.func,

  //if disabled the user can move the image outside the viewer
  preventPanOutside: _react.PropTypes.bool,

  //how much scale in or out
  scaleFactor: _react.PropTypes.number,

  // maximum amount of scale a user can zoom in to
  scaleFactorMax: _react.PropTypes.number,

  // minimum amount of a scale a user can zoom out to
  scaleFactorMin: _react.PropTypes.number,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: _react.PropTypes.oneOf([_constants.TOOL_AUTO, _constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]),

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: _react.PropTypes.array,

  //override default toolbar component
  customToolbar: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func]),

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
  scaleFactor: 1.1
};