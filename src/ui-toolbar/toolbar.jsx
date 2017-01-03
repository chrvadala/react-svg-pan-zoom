import React, {PropTypes} from 'react';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
} from '../constants';

import {fitToViewer} from '../features/zoom';
import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';
import IconFit from './icon-fit';

import Link from '../ui/link';

let isHorizontal = position => [POSITION_TOP, POSITION_BOTTOM].includes(position);

let calcToolbarStyle = position => {
  return {
    //position
    position: "absolute",
    transform: [POSITION_TOP, POSITION_BOTTOM].includes(position) ? "translate(-50%, 0px)" : "none",
    top: [POSITION_LEFT, POSITION_RIGHT, POSITION_TOP].includes(position) ? "5px" : "unset",
    left: [POSITION_TOP, POSITION_BOTTOM].includes(position) ? "50%" : (POSITION_LEFT === position ? "5px" : "unset"),
    right: [POSITION_RIGHT].includes(position) ? "5px" : "unset",
    bottom: [POSITION_BOTTOM].includes(position) ? "5px" : "unset",

    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal(position) ? "row" : "column",
    padding: isHorizontal(position) ? "1px 2px" : "2px 1px"
  };
};

let calcElementStyle = (position, active, hover) => {
  return {
    display: "block",
    width: "24px",
    height: "24px",
    margin: isHorizontal(position) ? "2px 1px" : "1px 2px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: hover ? "color 200ms ease" : "unset"
  };
};

export default function Toolbar({tool, value, onChangeValue, onChangeTool, position}) {

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

  return (
    <div style={calcToolbarStyle(position)}>
      <Link
        style={calcElementStyle(position, tool === TOOL_NONE, false)}
        styleHover={calcElementStyle(position, tool === TOOL_NONE, true)}
        title="Selection"
        onClick={ event => handleChangeTool(event, TOOL_NONE) }>
        <IconCursor/>
      </Link>

      <Link
        style={calcElementStyle(position, tool === TOOL_PAN, false)}
        styleHover={calcElementStyle(position, tool === TOOL_PAN, true)}
        title="Pan"
        onClick={ event => handleChangeTool(event, TOOL_PAN) }>
        <IconPan/>
      </Link>

      <Link
        style={calcElementStyle(position, tool === TOOL_ZOOM_IN, false)}
        styleHover={calcElementStyle(position, tool === TOOL_ZOOM_IN, true)}
        title="Zoom in"
        onClick={ event => handleChangeTool(event, TOOL_ZOOM_IN) }>
        <IconZoomIn/>
      </Link>

      <Link
        style={calcElementStyle(position, tool === TOOL_ZOOM_OUT, false)}
        styleHover={calcElementStyle(position, tool === TOOL_ZOOM_OUT, true)}
        title="Zoom out"
        onClick={ event => handleChangeTool(event, TOOL_ZOOM_OUT) }>
        <IconZoomOut/>
      </Link>

      <Link
        style={calcElementStyle(position, false, false)}
        styleHover={calcElementStyle(position, false, true)}
        title="Fit to viewer"
        onClick={ event => handleFit(event) }>
        <IconFit/>
      </Link>
    </div>
  )
}

Toolbar.propTypes = {
  position: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]).isRequired,
  tool: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeTool: PropTypes.func.isRequired,
};
