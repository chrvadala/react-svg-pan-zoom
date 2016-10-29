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

var _pan2 = require('./features/pan');

var _common = require('./features/common');

var _interactions = require('./features/interactions');

var _zoom2 = require('./features/zoom');

var _cursor = require('./ui/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _borderGradient = require('./ui/border-gradient');

var _borderGradient2 = _interopRequireDefault(_borderGradient);

var _if = require('./ui/if');

var _if2 = _interopRequireDefault(_if);

var _selection = require('./ui/selection');

var _selection2 = _interopRequireDefault(_selection);

var _toolbarWrapper = require('./ui-toolbar/toolbar-wrapper');

var _toolbarWrapper2 = _interopRequireDefault(_toolbarWrapper);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//common


//features


//ui


var ReactSVGPanZoom = function (_React$Component) {
  _inherits(ReactSVGPanZoom, _React$Component);

  function ReactSVGPanZoom(props, context) {
    _classCallCheck(this, ReactSVGPanZoom);

    var _this = _possibleConstructorReturn(this, (ReactSVGPanZoom.__proto__ || Object.getPrototypeOf(ReactSVGPanZoom)).call(this, props, context));

    var _this$props = _this.props,
        tool = _this$props.tool,
        onChange = _this$props.onChange,
        onReady = _this$props.onReady,
        viewerWidth = _this$props.width,
        viewerHeight = _this$props.height,
        children = _this$props.children;
    var _children$props = children.props,
        SVGWidth = _children$props.width,
        SVGHeight = _children$props.height;
    //TODO check props.value ??

    var nextValue = (0, _common.getDefaultValue)(tool, viewerWidth, viewerHeight, SVGWidth, SVGHeight);
    _this.state = { value: nextValue };
    _this.setState = _this.setState.bind(_this);
    return _this;
  }

  _createClass(ReactSVGPanZoom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props,
          value = this.state.value;
      var onChange = nextProps.onChange;


      var nextValue = value;

      if (nextProps.value && (0, _common.isValueValid)(nextProps.value) && !(0, _common.sameValues)(value, nextProps.value)) {
        nextValue = nextProps.value;
      }

      if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
        nextValue = (0, _common.setViewerSize)(nextValue, nextProps.width, nextProps.height);
      }

      if (nextProps.tool !== props.tool) {
        nextValue = (0, _common.changeTool)(nextValue, nextProps.tool);
      }

      if (nextValue === value) return;
      this.setState({ value: nextValue });
      onChange(nextValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'setValue',
    value: function setValue(nextValue) {
      if (!(0, _common.sameValues)(this.state.value, nextValue)) {
        this.setState({ value: nextValue });
        if (this.props.onChange) this.props.onChange(nextValue);
      }
    }
  }, {
    key: 'pan',
    value: function pan(SVGDeltaX, SVGDeltaY) {
      var nextValue = (0, _pan2.pan)(this.state.value, SVGDeltaX, SVGDeltaY);
      this.setState({ value: nextValue });
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }, {
    key: 'zoom',
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      var nextValue = (0, _zoom2.zoom)(this.state.value, SVGPointX, SVGPointY, scaleFactor);
      this.setState({ value: nextValue });
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }, {
    key: 'fitSelection',
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      var nextValue = (0, _zoom2.fitSelection)(this.state.value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
      this.setState({ value: nextValue });
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }, {
    key: 'fitToViewer',
    value: function fitToViewer() {
      var nextValue = (0, _zoom2.fitToViewer)(this.state.value);
      this.setState({ value: nextValue });
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }, {
    key: 'zoomOnViewerCenter',
    value: function zoomOnViewerCenter(scaleFactor) {
      var nextValue = (0, _zoom2.zoomOnViewerCenter)(this.state.value, scaleFactor);
      this.setState({ value: nextValue });
      if (this.props.onChange) this.props.onChange(nextValue);
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(event) {
      var _props = this.props,
          value = _props.value,
          onClick = _props.onClick,
          onMouseMove = _props.onMouseMove,
          onMouseUp = _props.onMouseUp,
          onMouseDown = _props.onMouseDown;

      var eventsHandler = {
        click: onClick,
        mousemove: onMouseMove,
        mouseup: onMouseUp,
        mousedown: onMouseDown
      };

      if (value.tool !== _constants.TOOL_NONE) return;
      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;

      onEventHandler(new _viewerEvent2.default(event, value, this.refs.Viewer));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props,
          state = this.state;

      if (props.onChange) props.onChange(state.value);

      this.autoPanTimer = setInterval(function () {
        var props = _this2.props,
            state = _this2.state;

        if (!(state.value.tool === _constants.TOOL_NONE && props.detectAutoPan && state.value.focus)) return;

        var nextValue = (0, _pan2.autoPanIfNeeded)(state.value, state.viewerX, state.viewerY);

        if (nextValue === state.value) return;
        _this2.setState({ value: nextValue });
        props.onChange(nextValue);
      }, 200);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.autoPanTimer);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var viewerCoords = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
      var value = (0, _interactions.onMouseDown)(event, viewerCoords, this.props, this.state.value);
      this.setState({ value: value });
    }
  }, {
    key: 'handlerMouseMove',
    value: function handlerMouseMove(event) {
      var viewerCoords = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
      var value = (0, _interactions.onMouseMove)(event, viewerCoords, this.props, this.state.value);
      this.setState({ value: value, viewerX: viewerCoords.x, viewerY: viewerCoords.y });
    }
  }, {
    key: 'handlerMouseUp',
    value: function handlerMouseUp(event) {
      var viewerCoords = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
      var value = (0, _interactions.onMouseUp)(event, viewerCoords, this.props, this.state.value);
      this.setState({ value: value });
    }
  }, {
    key: 'handlerWheel',
    value: function handlerWheel(event) {
      var viewerCoords = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
      var value = (0, _interactions.onWheel)(event, viewerCoords, this.props, this.state.value);
      this.setState({ value: value });
    }
  }, {
    key: 'handlerMouseEnterOrLeave',
    value: function handlerMouseEnterOrLeave(event) {
      var viewerCoords = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
      var value = (0, _interactions.onMouseEnterOrLeave)(event, viewerCoords, this.props, this.state.value);
      this.setState({ value: value });
    }
  }, {
    key: 'handlerChangeTool',
    value: function handlerChangeTool(tool) {
      var state = this.state,
          props = this.props;

      var nextValue = (0, _common.changeTool)(state.value, tool);
      this.setState({ value: nextValue });
      if (props.onChange) props.onChange(nextValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props,
          _state = this.state,
          value = _state.value,
          viewerX = _state.viewerX,
          viewerY = _state.viewerY;

      var style = props.style;

      if (value.tool === _constants.TOOL_PAN) style = _extends({
        cursor: (0, _cursor2.default)(value.mode === _constants.MODE_PANNING ? 'grabbing' : 'grab')
      }, style);

      if (value.tool === _constants.TOOL_ZOOM_IN) style = _extends({
        cursor: 'zoom-in'
      }, style);

      if (value.tool === _constants.TOOL_ZOOM_OUT) style = _extends({
        cursor: 'zoom-out'
      }, style);

      return _react2.default.createElement(
        'div',
        { style: { position: "relative", width: value.viewerWidth, height: value.viewerHeight } },
        _react2.default.createElement(
          'svg',
          {
            ref: 'Viewer',
            width: value.viewerWidth,
            height: value.viewerHeight,
            style: style,
            onMouseDown: function onMouseDown(event) {
              return _this3.handleMouseDown(event);
            },
            onMouseMove: function onMouseMove(event) {
              return _this3.handlerMouseMove(event);
            },
            onMouseUp: function onMouseUp(event) {
              return _this3.handlerMouseUp(event);
            },
            onWheel: function onWheel(event) {
              return _this3.handlerWheel(event);
            },
            onMouseEnter: function onMouseEnter(event) {
              return _this3.handlerMouseEnterOrLeave(event);
            },
            onMouseLeave: function onMouseLeave(event) {
              return _this3.handlerMouseEnterOrLeave(event);
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
              style: value.tool === _constants.TOOL_NONE ? {} : { pointerEvents: "none" },
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
            { condition: value.tool === _constants.TOOL_NONE && props.detectAutoPan && value.focus },
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
        _react2.default.createElement(
          _if2.default,
          { condition: props.toolbarPosition !== _constants.POSITION_NONE },
          _react2.default.createElement(_toolbarWrapper2.default, { position: props.toolbarPosition, tool: value.tool,
            onChangeTool: function onChangeTool(tool) {
              return _this3.handlerChangeTool(tool);
            } })
        )
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
  value: _react.PropTypes.object,

  //CSS style of the SVG tag
  style: _react.PropTypes.object,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: _react.PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: _react.PropTypes.bool,

  //toolbar position
  toolbarPosition: _react.PropTypes.oneOf([_constants.POSITION_NONE, _constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),

  //handler something changed
  onChange: _react.PropTypes.func.isRequired,

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

ReactSVGPanZoom.defaultProps = {
  value: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  tool: _constants.TOOL_NONE,
  detectWheel: true,
  detectAutoPan: true,
  toolbarPosition: _constants.POSITION_RIGHT
};