'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MiniatureMask;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MiniatureMask(_ref) {
  var SVGWidth = _ref.SVGWidth,
      SVGHeight = _ref.SVGHeight,
      visibleAreaX = _ref.visibleAreaX,
      visibleAreaY = _ref.visibleAreaY,
      visibleAreaWidth = _ref.visibleAreaWidth,
      visibleAreaHeight = _ref.visibleAreaHeight,
      zoomToFit = _ref.zoomToFit;

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'mask',
        { id: 'react-svg-pan-zoom-miniature-mask' },
        _react2.default.createElement('rect', { x: '0', y: '0', width: SVGWidth, height: SVGHeight, fill: '#ffffff' }),
        _react2.default.createElement('rect', { x: visibleAreaX, y: visibleAreaY, width: visibleAreaWidth, height: visibleAreaHeight })
      )
    ),
    _react2.default.createElement('rect', { x: '0',
      y: '0',
      width: SVGWidth,
      height: SVGHeight,
      style: {
        stroke: "none",
        fill: "#000",
        mask: "url(#react-svg-pan-zoom-miniature-mask)",
        opacity: 0.4
      }
    }),
    _react2.default.createElement('rect', {
      stroke: "#47484a",
      strokeWidth: 0.75 / zoomToFit,
      fill: 'transparent',
      x: visibleAreaX,
      y: visibleAreaY,
      width: visibleAreaWidth,
      height: visibleAreaHeight })
  );
}

MiniatureMask.propTypes = {
  SVGWidth: _propTypes2.default.number.isRequired,
  SVGHeight: _propTypes2.default.number.isRequired,
  visibleAreaX: _propTypes2.default.number.isRequired,
  visibleAreaY: _propTypes2.default.number.isRequired,
  visibleAreaWidth: _propTypes2.default.number.isRequired,
  visibleAreaHeight: _propTypes2.default.number.isRequired,
  zoomToFit: _propTypes2.default.number.isRequired
};