var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, POSITION_RIGHT, POSITION_LEFT } from '../constants';
import { applyToPoints, inverse } from 'transformation-matrix';
import MiniatureToggleButton from './miniature-toggle-button';
import MiniatureMask from './miniature-mask';

var min = Math.min,
    max = Math.max;


export default function Miniature(_ref) {
  var value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      position = _ref.position,
      children = _ref.children,
      background = _ref.background,
      miniatureWidth = _ref.width;
  var SVGWidth = value.SVGWidth,
      SVGHeight = value.SVGHeight,
      viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;

  var ratio = SVGWidth / SVGHeight;

  var miniatureHeight = miniatureWidth * ratio;

  var zoomToFit = miniatureWidth / SVGWidth;

  var _applyToPoints = applyToPoints(inverse(value), [{ x: 0, y: 0 }, { x: viewerWidth, y: viewerHeight }]),
      _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
      _applyToPoints2$ = _applyToPoints2[0],
      x1 = _applyToPoints2$.x,
      y1 = _applyToPoints2$.y,
      _applyToPoints2$2 = _applyToPoints2[1],
      x2 = _applyToPoints2$2.x,
      y2 = _applyToPoints2$2.y;

  x1 = max(x1, 0);
  y1 = max(y1, 0);
  x2 = min(x2, SVGWidth);
  y2 = min(y2, SVGHeight);

  var width = void 0,
      height = void 0,
      bottom = void 0;

  if (value.miniatureOpen) {
    width = miniatureWidth;
    height = miniatureHeight;
  } else {
    width = 24;
    height = 24;
  }

  var style = _defineProperty({
    position: "absolute",
    overflow: "hidden",
    outline: "1px solid rgba(19, 20, 22, 0.90)",
    transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
    width: width + "px",
    height: height + "px",
    bottom: "6px"
  }, position === POSITION_LEFT ? 'left' : 'right', "6px");

  return React.createElement(
    'div',
    { role: 'navigation', style: style },
    React.createElement(
      'svg',
      {
        width: miniatureWidth,
        height: miniatureHeight,
        style: { pointerEvents: "none" } },
      React.createElement(
        'g',
        { transform: 'scale(' + zoomToFit + ', ' + zoomToFit + ')' },
        React.createElement('rect', {
          fill: background,
          x: 0,
          y: 0,
          width: value.SVGWidth,
          height: value.SVGHeight }),
        children,
        x1 === 0 && y1 === 0 && x2 - x1 === SVGWidth && y2 - y1 === SVGHeight ? null : React.createElement(MiniatureMask, {
          SVGWidth: SVGWidth,
          SVGHeight: SVGHeight,
          visibleAreaX: x1,
          visibleAreaY: y1,
          visibleAreaWidth: x2 - x1,
          visibleAreaHeight: y2 - y1,
          zoomToFit: zoomToFit
        })
      )
    ),
    React.createElement(MiniatureToggleButton, { value: value, onChangeValue: onChangeValue, position: position })
  );
}

Miniature.propTypes = {
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  background: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};