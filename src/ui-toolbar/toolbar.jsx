import React, {PropTypes} from 'react';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  ORIENTATION_VERTICAL, ORIENTATION_HORIZONTAL
} from '../constants';

import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';

import {changeTool} from '../features/common'

const STYLE_TOOLBAR = {
  backgroundColor: "rgba(19, 20, 22, 0.90)",
  borderRadius: "2px",
  display: "flex",
};

const STYLE_TOOLBAR_ORIENTED = {
  [ORIENTATION_HORIZONTAL]: {
    ...STYLE_TOOLBAR,
    padding: "3px 5px 3px 3px",
    flexDirection: "row"
  },
  [ORIENTATION_VERTICAL]: {
    ...STYLE_TOOLBAR,
    padding: "5px 3px 3px 3px",
    flexDirection: "column"
  }
};

const STYLE_ELEMENT = {
  display: "block",
  width: "24px",
  height: "24px"
};

const STYLE_ELEMENT_ORIENTED = {
  [ORIENTATION_HORIZONTAL]: {
    ...STYLE_ELEMENT,
    padding: "1px 2px"
  },
  [ORIENTATION_VERTICAL]: {
    ...STYLE_ELEMENT,
    padding: "2px 1px"
  }
};

const ICON_COLOR_OFF = '#FFF';
const ICON_COLOR_ON = '#1CA6FC';

export default function Toolbar({tool, value, onChangeValue, onChangeTool, orientation}) {

  let handleChangeTool = (event, tool) => {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  let styleToolbarFull = STYLE_TOOLBAR_ORIENTED[orientation];
  let styleElementFull = STYLE_ELEMENT_ORIENTED[orientation];

  return (
    <div style={styleToolbarFull}>
      <a style={styleElementFull} href="javascript:;" title="Selection"
         onClick={ event => handleChangeTool(event, TOOL_NONE) }>
        <IconCursor color={(tool === TOOL_NONE) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={styleElementFull} href="javascript:;" title="Pan" onClick={ event => handleChangeTool(event, TOOL_PAN) }>
        <IconPan color={(tool === TOOL_PAN) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={styleElementFull} href="javascript:;" title="Zoom in" onClick={ event => handleChangeTool(event, TOOL_ZOOM_IN) }>
        <IconZoomIn color={(tool === TOOL_ZOOM_IN) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={styleElementFull} href="javascript:;" title="Zoom out" onClick={ event => handleChangeTool(event, TOOL_ZOOM_OUT) }>
        <IconZoomOut color={(tool === TOOL_ZOOM_OUT) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>
    </div>
  )
}

Toolbar.propTypes = {
  orientation: PropTypes.oneOf([ORIENTATION_VERTICAL, ORIENTATION_HORIZONTAL]).isRequired,
  tool: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeTool: PropTypes.func.isRequired,
};
