import React from 'react';
import PropTypes from 'prop-types';
import {POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT} from '../constants';

export default function BorderGradient({direction, width, height}) {

  let transform;

  switch (direction) {
    case POSITION_TOP:
      transform = `translate(${width}, 0) rotate(90)`;
      break;

    case POSITION_RIGHT:
      transform = `translate(${width}, ${height}) rotate(180)`;
      break;

    case POSITION_BOTTOM:
      transform = `translate(0, ${height}) rotate(270)`;
      break;

    case POSITION_LEFT:
      transform = " ";
      break;
  }

  return (
    <g>
      <defs>
        <linearGradient id="react-svg-pan-zoom-gradient1" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.5"/>
        </linearGradient>

        <mask id="react-svg-pan-zoom-mask1" x="0" y="0" width="20" height={Math.max(width, height)}>
          <rect x="0" y="0" width="20" height={Math.max(width, height)}
                style={{stroke: "none", fill: "url(#react-svg-pan-zoom-gradient1)"}}/>
        </mask>
      </defs>

      <rect x="0" y="0" width="20" height={Math.max(width, height)}
            style={{stroke: "none", fill: "#000", mask: "url(#react-svg-pan-zoom-mask1)"}} transform={transform}/>
    </g>
  );
}

BorderGradient.propTypes = {
  direction: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
