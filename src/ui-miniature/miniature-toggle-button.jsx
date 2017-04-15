import React, {PropTypes} from 'react';
import {openMiniature, closeMiniature} from '../features/miniature';
import IconOpen from './icon-open';
import IconClose from './icon-close';

export default function MiniatureToggleButton({value, onChangeValue}) {
  let style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: "rgba(19, 20, 22, 0.901961)",
    border: 0,
    padding: 0,
    outline: 0,
    color: "#fff"
  };

  return value.miniatureOpen ?
    <button role="button" style={style} onClick={event => onChangeValue(closeMiniature(value))}>
      <IconClose/>
    </button>
    :
    <button role="button" style={style} onClick={event => onChangeValue(openMiniature(value))}>
      <IconOpen/>
    </button>
}

MiniatureToggleButton.propTypes = {
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};
