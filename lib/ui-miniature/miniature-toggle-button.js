'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MiniatureToggleButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _miniature = require('../features/miniature');

var _iconArrow = require('./icon-arrow');

var _iconArrow2 = _interopRequireDefault(_iconArrow);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MiniatureToggleButton(_ref) {
  var _style;

  var value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      position = _ref.position;

  var style = (_style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0
  }, _defineProperty(_style, position === _constants.POSITION_LEFT ? 'left' : 'right', '0px'), _defineProperty(_style, 'background', "rgba(19, 20, 22, 0.901961)"), _defineProperty(_style, 'border', 0), _defineProperty(_style, 'padding', 0), _defineProperty(_style, 'outline', 0), _defineProperty(_style, 'color', "#fff"), _style);

  var action = value.miniatureOpen ? _miniature.closeMiniature : _miniature.openMiniature;

  return _react2.default.createElement(
    'button',
    { role: 'button', style: style, onClick: function onClick(event) {
        return onChangeValue(action(value));
      } },
    _react2.default.createElement(_iconArrow2.default, { open: value.miniatureOpen, position: position })
  );
}

MiniatureToggleButton.propTypes = {
  value: _propTypes2.default.object.isRequired,
  onChangeValue: _propTypes2.default.func.isRequired,
  position: _propTypes2.default.oneOf([_constants.POSITION_RIGHT, _constants.POSITION_LEFT]).isRequired
};