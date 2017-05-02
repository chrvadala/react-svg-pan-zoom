'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BorderGradient;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BorderGradient(_ref) {
  var direction = _ref.direction,
      width = _ref.width,
      height = _ref.height;


  var transform = void 0;

  switch (direction) {
    case _constants.POSITION_TOP:
      transform = 'translate(' + width + ', 0) rotate(90)';
      break;

    case _constants.POSITION_RIGHT:
      transform = 'translate(' + width + ', ' + height + ') rotate(180)';
      break;

    case _constants.POSITION_BOTTOM:
      transform = 'translate(0, ' + height + ') rotate(270)';
      break;

    case _constants.POSITION_LEFT:
      transform = " ";
      break;
  }

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'linearGradient',
        { id: 'react-svg-pan-zoom-gradient1', x1: '0%', y1: '0%', x2: '100%', y2: '0%', spreadMethod: 'pad' },
        _react2.default.createElement('stop', { offset: '0%', stopColor: '#fff', stopOpacity: '0.8' }),
        _react2.default.createElement('stop', { offset: '100%', stopColor: '#000', stopOpacity: '0.5' })
      ),
      _react2.default.createElement(
        'mask',
        { id: 'react-svg-pan-zoom-mask1', x: '0', y: '0', width: '20', height: Math.max(width, height) },
        _react2.default.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(width, height),
          style: { stroke: "none", fill: "url(#react-svg-pan-zoom-gradient1)" } })
      )
    ),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(width, height),
      style: { stroke: "none", fill: "#000", mask: "url(#react-svg-pan-zoom-mask1)" }, transform: transform })
  );
}

BorderGradient.propTypes = {
  direction: _propTypes2.default.oneOf([_constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]).isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};