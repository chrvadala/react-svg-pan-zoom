import React from 'react';
import PropTypes from 'prop-types';
import {openMiniature, closeMiniature} from '../features/miniature';
import IconArrow from './icon-arrow';
import {POSITION_RIGHT, POSITION_LEFT} from '../constants';

export default function MiniatureToggleButton({value, onChangeValue, position}) {
  let style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0,
    [position === POSITION_LEFT ? 'left' : 'right']: '0px',
    background: "rgba(19, 20, 22, 0.901961)",
    border: 0,
    padding: 0,
    outline: 0,
    color: "#fff"
  };

  let action = value.miniatureOpen ? closeMiniature : openMiniature;

  return (
    <button role="button" style={style} onClick={event => onChangeValue(action(value))}>
      <IconArrow open={value.miniatureOpen} position={position}/>
    </button>
  )

}

MiniatureToggleButton.propTypes = {
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
};
