'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var isHorizontal = [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0;

  var style = {
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
    flexDirection: isHorizontal ? "row" : "column",
    padding: isHorizontal ? "1px 2px" : "2px 1px"
  };

  return _react2.default.createElement(
    'div',
    { style: style, role: 'toolbar' },
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        toolbarPosition: position,
        active: tool === _constants.TOOL_NONE,
        name: 'unselect-tools',
        title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_NONE);
        } },
      _react2.default.createElement(_iconCursor2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        toolbarPosition: position,
        active: tool === _constants.TOOL_PAN,
        name: 'select-tool-pan',
        title: 'Pan',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_PAN);
        } },
      _react2.default.createElement(_iconPan2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        toolbarPosition: position,
        active: tool === _constants.TOOL_ZOOM_IN,
        name: 'select-tool-zoom-in',
        title: 'Zoom in',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_IN);
        } },
      _react2.default.createElement(_iconZoomIn2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        toolbarPosition: position,
        active: tool === _constants.TOOL_ZOOM_OUT,
        name: 'select-tool-zoom-out',
        title: 'Zoom out',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_OUT);
        } },
      _react2.default.createElement(_iconZoomOut2.default, null)
    ),
    _react2.default.createElement(
      _toolbarButton2.default,
      {
        toolbarPosition: position,
        active: false,
        name: 'fit-to-viewer',
        title: 'Fit to viewer',
        onClick: function onClick(event) {
          return handleFit(event);
        } },
      _react2.default.createElement(_iconFit2.default, null)
    )
  );
}

Toolbar.propTypes = {
  position: _propTypes2.default.oneOf([_constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]).isRequired,
  tool: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.object.isRequired,
  onChangeValue: _propTypes2.default.func.isRequired,
  onChangeTool: _propTypes2.default.func.isRequired
};