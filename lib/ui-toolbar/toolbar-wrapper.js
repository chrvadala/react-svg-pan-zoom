'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _STYLE_POSITION_ORIEN, _POSITION_2_ORIENTATI;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ToolbarWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STYLE_POSITION = { position: "absolute" };

var STYLE_POSITION_ORIENTED = (_STYLE_POSITION_ORIEN = {}, _defineProperty(_STYLE_POSITION_ORIEN, _constants.POSITION_TOP, _extends({}, STYLE_POSITION, {
  top: "5px",
  left: "50%",
  transform: "translate(-50%, 0px)"
})), _defineProperty(_STYLE_POSITION_ORIEN, _constants.POSITION_RIGHT, _extends({}, STYLE_POSITION, {
  top: "5px",
  right: "5px"
})), _defineProperty(_STYLE_POSITION_ORIEN, _constants.POSITION_BOTTOM, _extends({}, STYLE_POSITION, {
  bottom: "5px",
  left: "50%",
  transform: "translate(-50%, 0px)"
})), _defineProperty(_STYLE_POSITION_ORIEN, _constants.POSITION_LEFT, _extends({}, STYLE_POSITION, {
  top: "5px",
  left: "5px"
})), _STYLE_POSITION_ORIEN);

var POSITION_2_ORIENTATION = (_POSITION_2_ORIENTATI = {}, _defineProperty(_POSITION_2_ORIENTATI, _constants.POSITION_TOP, _constants.ORIENTATION_HORIZONTAL), _defineProperty(_POSITION_2_ORIENTATI, _constants.POSITION_RIGHT, _constants.ORIENTATION_VERTICAL), _defineProperty(_POSITION_2_ORIENTATI, _constants.POSITION_BOTTOM, _constants.ORIENTATION_HORIZONTAL), _defineProperty(_POSITION_2_ORIENTATI, _constants.POSITION_LEFT, _constants.ORIENTATION_VERTICAL), _POSITION_2_ORIENTATI);

function ToolbarWrapper(_ref) {
  var position = _ref.position,
      tool = _ref.tool,
      onChangeTool = _ref.onChangeTool;

  return _react2.default.createElement(
    'div',
    { style: STYLE_POSITION_ORIENTED[position] },
    _react2.default.createElement(_toolbar2.default, { orientation: POSITION_2_ORIENTATION[position], tool: tool, onChangeTool: onChangeTool })
  );
}

ToolbarWrapper.propTypes = {
  position: _react.PropTypes.oneOf([_constants.POSITION_NONE, _constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),
  tool: _react.PropTypes.oneOf([_constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]).isRequired,
  onChangeTool: _react.PropTypes.func.isRequired
};