import React, {PropTypes} from 'react';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  ORIENTATION_VERTICAL, ORIENTATION_HORIZONTAL
} from '../constants';

import {fitToViewer} from '../features/zoom';
import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';
import IconFit from './icon-fit';

import Link from '../ui/link';

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


let calcElementStyle = (orientation, active, hover) => {
  return {
    display: "block",
    width: "24px",
    height: "24px",
    padding: orientation === ORIENTATION_HORIZONTAL ? "1px 2px" : "2px 1px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: hover ? "color 200ms ease" : "unset"
  };
};

export default function Toolbar({tool, value, onChangeValue, onChangeTool, orientation}) {

  let handleChangeTool = (event, tool) => {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  let handleFit = event => {
    onChangeValue(fitToViewer(value));
    event.stopPropagation();
    event.preventDefault();
  };

  let styleToolbarFull = STYLE_TOOLBAR_ORIENTED[orientation];

  return (
    <div style={styleToolbarFull}>
      <Link
        style={calcElementStyle(orientation, tool === TOOL_NONE, false)}
        styleHover={calcElementStyle(orientation, tool === TOOL_NONE, true)}
        title="Selection"
        onClick={ event => handleChangeTool(event, TOOL_NONE) }>
        <IconCursor/>
      </Link>

      <Link
        style={calcElementStyle(orientation, tool === TOOL_PAN, false)}
        styleHover={calcElementStyle(orientation, tool === TOOL_PAN, true)}
        title="Pan"
        onClick={ event => handleChangeTool(event, TOOL_PAN) }>
        <IconPan/>
      </Link>

      <Link
        style={calcElementStyle(orientation, tool === TOOL_ZOOM_IN, false)}
        styleHover={calcElementStyle(orientation, tool === TOOL_ZOOM_IN, true)}
        title="Zoom in"
        onClick={ event => handleChangeTool(event, TOOL_ZOOM_IN) }>
        <IconZoomIn/>
      </Link>

      <Link
        style={calcElementStyle(orientation, tool === TOOL_ZOOM_OUT, false)}
        styleHover={calcElementStyle(orientation, tool === TOOL_ZOOM_OUT, true)}
        title="Zoom out"
        onClick={ event => handleChangeTool(event, TOOL_ZOOM_OUT) }>
        <IconZoomOut/>
      </Link>

      <Link
        style={calcElementStyle(orientation, false, false)}
        styleHover={calcElementStyle(orientation, false, true)}
        title="Fit to viewer"
        onClick={ event => handleFit(event) }>
        <IconFit/>
      </Link>
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
