import React from 'react';
import PropTypes from 'prop-types';
import { calculateBox } from '../utils';

export default function Selection(_ref) {
  var startX = _ref.startX,
      startY = _ref.startY,
      endX = _ref.endX,
      endY = _ref.endY;

  if (!startX || !startY || !endX || !endY) return null;

  var box = calculateBox({ x: startX, y: startY }, { x: endX, y: endY });

  return React.createElement('rect', {
    stroke: '#969FFF',
    strokeOpacity: 0.7,
    fill: '#F3F4FF',
    fillOpacity: 0.7,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    style: { pointerEvents: "none" } });
}

Selection.propTypes = {
  startX: PropTypes.number,
  startY: PropTypes.number,
  endX: PropTypes.number,
  endY: PropTypes.number
};