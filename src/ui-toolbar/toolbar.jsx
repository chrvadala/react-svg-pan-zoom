import React, {PropTypes} from 'react';
import {TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from '../constants';

import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';

const STYLE_TOOLBAR = {
  backgroundColor: '#28292D',
  padding: "5px 2px 2px",
  width: "24px",
  borderRadius: "2px"
};

const STYLE_ELEMENT = {
  display: "block",
  width: "24px",
  height: "24px",
  marginBottom: "5px"
};

const ICON_COLOR_OFF = '#FFF';
const ICON_COLOR_ON = '#1CA6FC';

export default function Toolbar({tool, onChangeTool, style}) {
  let handleChangeTool = (event, tool) => {
    event.stopPropagation();
    event.preventDefault();
    onChangeTool(tool)
  };

  return (
    <div style={{...STYLE_TOOLBAR, ...style}}>
      <a href style={STYLE_ELEMENT} title="Selection" onClick={ event => handleChangeTool(event, TOOL_NONE) }>
        <IconCursor color={(tool === TOOL_NONE) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={STYLE_ELEMENT} href="javascript:;" title="Pan" onClick={ event => onChangeTool(TOOL_PAN) }>
        <IconPan color={(tool === TOOL_PAN) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={STYLE_ELEMENT} href="javascript:;" title="Zoom in" onClick={ event => onChangeTool(TOOL_ZOOM_IN) }>
        <IconZoomIn color={(tool === TOOL_ZOOM_IN) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>

      <a style={STYLE_ELEMENT} href="javascript:;" title="Zoom out" onClick={ event => onChangeTool(TOOL_ZOOM_OUT) }>
        <IconZoomOut color={(tool === TOOL_ZOOM_OUT) ? ICON_COLOR_ON : ICON_COLOR_OFF}/>
      </a>
    </div>
  )
}

Toolbar.propTypes = {
  tool: PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,
  onChangeTool: PropTypes.func.isRequired,
  style: PropTypes.object
};

Toolbar.defaultProps = {
  style: {}
};
