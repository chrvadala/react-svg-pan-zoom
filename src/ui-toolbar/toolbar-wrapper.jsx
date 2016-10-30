import React, {PropTypes} from 'react';
import Toolbar from './toolbar';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
  ORIENTATION_HORIZONTAL, ORIENTATION_VERTICAL
} from '../constants';

const STYLE_POSITION = {position: "absolute"};

const STYLE_POSITION_ORIENTED = {
  [POSITION_TOP]: {
    ...STYLE_POSITION,
    top: "5px",
    left: "50%",
    transform: "translate(-50%, 0px)"
  },
  [POSITION_RIGHT]: {
    ...STYLE_POSITION,
    top: "5px",
    right: "5px"
  },
  [POSITION_BOTTOM]: {
    ...STYLE_POSITION,
    bottom: "5px",
    left: "50%",
    transform: "translate(-50%, 0px)"
  },
  [POSITION_LEFT]: {
    ...STYLE_POSITION,
    top: "5px",
    left: "5px"
  }
};

const POSITION_2_ORIENTATION = {
  [POSITION_TOP]: ORIENTATION_HORIZONTAL,
  [POSITION_RIGHT]: ORIENTATION_VERTICAL,
  [POSITION_BOTTOM]: ORIENTATION_HORIZONTAL,
  [POSITION_LEFT]: ORIENTATION_VERTICAL,
};

export default function ToolbarWrapper({position, ...rest}) {
  return (
    <div style={STYLE_POSITION_ORIENTED[position]}>
      <Toolbar orientation={POSITION_2_ORIENTATION[position]} {...rest}/>
    </div>
  );
}

ToolbarWrapper.propTypes = {
  position: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT])
};
