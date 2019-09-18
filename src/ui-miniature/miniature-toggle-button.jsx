import React from 'react';
import PropTypes from 'prop-types';
import {openMiniature, closeMiniature} from '../features/miniature';
import IconArrow from './icon-arrow';
import {POSITION_RIGHT, POSITION_LEFT} from '../constants';

export default function MiniatureToggleButton({position, miniatureOpen, setMiniatureOpen}) {
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

  return (
    <button role="button" type="button" style={style} onClick={event => setMiniatureOpen(!miniatureOpen)}>
      <IconArrow open={miniatureOpen} position={position}/>
    </button>
  )

}

MiniatureToggleButton.propTypes = {
  // onChangeValue: PropTypes.func.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
};
