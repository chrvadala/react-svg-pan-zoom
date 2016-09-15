'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Gradient;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Gradient(_ref) {
  var direction = _ref.direction;
  var SVGWidth = _ref.SVGWidth;
  var SVGHeight = _ref.SVGHeight;


  var transform = void 0;

  switch (direction) {

    case _constants.DIRECTION_LEFT:
      transform = " ";
      break;

    case _constants.DIRECTION_RIGHT:
      transform = 'translate(' + SVGWidth + ', ' + SVGHeight + ') rotate(180)';
      break;

    case _constants.DIRECTION_UP:
      transform = 'translate(' + SVGWidth + ', 0) rotate(90)';
      break;

    case _constants.DIRECTION_DOWN:
      transform = 'translate(0, ' + SVGHeight + ') rotate(270)';
      break;

    case _constants.DIRECTION_NONE:
    default:
      return null;
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
        { id: 'react-svg-pan-zoom-mask1', x: '0', y: '0', width: '20', height: Math.max(SVGWidth, SVGHeight) },
        _react2.default.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(SVGWidth, SVGHeight),
          style: { stroke: "none", fill: "url(#react-svg-pan-zoom-gradient1)" } })
      )
    ),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(SVGWidth, SVGHeight),
      style: { stroke: "none", fill: "#000", mask: "url(#react-svg-pan-zoom-mask1)" }, transform: transform })
  );
}