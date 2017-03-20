'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _zoom = require('../features/zoom');

var _iconCursor = require('./icon-cursor');

var _iconCursor2 = _interopRequireDefault(_iconCursor);

var _iconPan = require('./icon-pan');

var _iconPan2 = _interopRequireDefault(_iconPan);

var _iconZoomIn = require('./icon-zoom-in');

var _iconZoomIn2 = _interopRequireDefault(_iconZoomIn);

var _iconZoomOut = require('./icon-zoom-out');

var _iconZoomOut2 = _interopRequireDefault(_iconZoomOut);

var _iconFit = require('./icon-fit');

var _iconFit2 = _interopRequireDefault(_iconFit);

var _link = require('../ui/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isHorizontal = function isHorizontal(position) {
  return [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0;
};

var calcToolbarStyle = function calcToolbarStyle(position) {
  return {
    //position
    position: "absolute",
    transform: [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
    top: [_constants.POSITION_LEFT, _constants.POSITION_RIGHT, _constants.POSITION_TOP].indexOf(position) >= 0 ? "5px" : "unset",
    left: [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "50%" : _constants.POSITION_LEFT === position ? "5px" : "unset",
    right: [_constants.POSITION_RIGHT].indexOf(position) >= 0 ? "5px" : "unset",
    bottom: [_constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "5px" : "unset",

    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal(position) ? "row" : "column",
    padding: isHorizontal(position) ? "1px 2px" : "2px 1px"
  };
};

var calcElementStyle = function calcElementStyle(position, active, hover) {
  return {
    display: "block",
    width: "24px",
    height: "24px",
    margin: isHorizontal(position) ? "2px 1px" : "1px 2px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: hover ? "color 200ms ease" : "unset"
  };
};

function Toolbar(_ref) {
  var tool = _ref.tool,
      value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      onChangeTool = _ref.onChangeTool,
      position = _ref.position;


  var handleChangeTool = function handleChangeTool(event, tool) {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  var handleFit = function handleFit(event) {
    onChangeValue((0, _zoom.fitToViewer)(value));
    event.stopPropagation();
    event.preventDefault();
  };

  return _react2.default.createElement(
    'div',
    { style: calcToolbarStyle(position) },
    _react2.default.createElement(
      _link2.default,
      {
        style: calcElementStyle(position, tool === _constants.TOOL_NONE, false),
        styleHover: calcElementStyle(position, tool === _constants.TOOL_NONE, true),
        title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_NONE);
        } },
      _react2.default.createElement(_iconCursor2.default, null)
    ),
    _react2.default.createElement(
      _link2.default,
      {
        style: calcElementStyle(position, tool === _constants.TOOL_PAN, false),
        styleHover: calcElementStyle(position, tool === _constants.TOOL_PAN, true),
        title: 'Pan',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_PAN);
        } },
      _react2.default.createElement(_iconPan2.default, null)
    ),
    _react2.default.createElement(
      _link2.default,
      {
        style: calcElementStyle(position, tool === _constants.TOOL_ZOOM_IN, false),
        styleHover: calcElementStyle(position, tool === _constants.TOOL_ZOOM_IN, true),
        title: 'Zoom in',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_IN);
        } },
      _react2.default.createElement(_iconZoomIn2.default, null)
    ),
    _react2.default.createElement(
      _link2.default,
      {
        style: calcElementStyle(position, tool === _constants.TOOL_ZOOM_OUT, false),
        styleHover: calcElementStyle(position, tool === _constants.TOOL_ZOOM_OUT, true),
        title: 'Zoom out',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_OUT);
        } },
      _react2.default.createElement(_iconZoomOut2.default, null)
    ),
    _react2.default.createElement(
      _link2.default,
      {
        style: calcElementStyle(position, false, false),
        styleHover: calcElementStyle(position, false, true),
        title: 'Fit to viewer',
        onClick: function onClick(event) {
          return handleFit(event);
        } },
      _react2.default.createElement(_iconFit2.default, null)
    )
  );
}

Toolbar.propTypes = {
  position: _react.PropTypes.oneOf([_constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]).isRequired,
  tool: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.object.isRequired,
  onChangeValue: _react.PropTypes.func.isRequired,
  onChangeTool: _react.PropTypes.func.isRequired
};