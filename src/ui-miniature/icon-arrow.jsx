import React from 'react';
import PropTypes from 'prop-types';
import {POSITION_RIGHT, POSITION_LEFT} from '../constants';

//credits https://materialdesignicons.com/icon/chevron-up

export default function IconArrow({open, position}) {

  let transform = 0;

  switch (position){
    case POSITION_LEFT:
      transform = open ? "rotate(225, 12, 13)" : "rotate(45, 12, 13)";
      break;

    case POSITION_RIGHT:
      transform = transform = open ? "rotate(135, 12, 13)" : "rotate(-45, 12, 13)";
  }

  return (
    <svg width={24} height={24} stroke="currentColor">
      <g transform={transform}>
        <path fill="#000000" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
      </g>
    </svg>
  );
}

IconArrow.propTypes = {
  open: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
};
