import React, { PropTypes } from 'react';
import { TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT } from '../constants';

import { fitToViewer } from '../features/zoom';
import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';
import IconFit from './icon-fit';

import Link from '../ui/link';

var isHorizontal = function isHorizontal(position) {
  return [POSITION_TOP, POSITION_BOTTOM].includes(position);
};

var calcToolbarStyle = function calcToolbarStyle(position) {
  return {
    //position
    position: "absolute",
    transform: [POSITION_TOP, POSITION_BOTTOM].includes(position) ? "translate(-50%, 0px)" : "none",
    top: [POSITION_LEFT, POSITION_RIGHT, POSITION_TOP].includes(position) ? "5px" : "unset",
    left: [POSITION_TOP, POSITION_BOTTOM].includes(position) ? "50%" : POSITION_LEFT === position ? "5px" : "unset",
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

var calcElementStyle = function calcElementStyle(position, active, hover) {
  return {
    display: "block",
    width: "24px",
    height: "24px",
    margin: isHorizontal(position) ? "2px 1px" : "1px 2px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: hover ? "color 200ms ease" : "unset"
  };
};

export default function Toolbar(_ref) {
  var tool = _ref.tool,
      value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      onChangeTool = _ref.onChangeTool,
      position = _ref.position;


  var handleChangeTool = function handleChangeTool(event, tool) {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  var handleFit = function handleFit(event) {
    onChangeValue(fitToViewer(value));
    event.stopPropagation();
    event.preventDefault();
  };

  return React.createElement(
    'div',
    { style: calcToolbarStyle(position) },
    React.createElement(
      Link,
      {
        style: calcElementStyle(position, tool === TOOL_NONE, false),
        styleHover: calcElementStyle(position, tool === TOOL_NONE, true),
        title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, TOOL_NONE);
        } },
      React.createElement(IconCursor, null)
    ),
    React.createElement(
      Link,
      {
        style: calcElementStyle(position, tool === TOOL_PAN, false),
        styleHover: calcElementStyle(position, tool === TOOL_PAN, true),
        title: 'Pan',
        onClick: function onClick(event) {
          return handleChangeTool(event, TOOL_PAN);
        } },
      React.createElement(IconPan, null)
    ),
    React.createElement(
      Link,
      {
        style: calcElementStyle(position, tool === TOOL_ZOOM_IN, false),
        styleHover: calcElementStyle(position, tool === TOOL_ZOOM_IN, true),
        title: 'Zoom in',
        onClick: function onClick(event) {
          return handleChangeTool(event, TOOL_ZOOM_IN);
        } },
      React.createElement(IconZoomIn, null)
    ),
    React.createElement(
      Link,
      {
        style: calcElementStyle(position, tool === TOOL_ZOOM_OUT, false),
        styleHover: calcElementStyle(position, tool === TOOL_ZOOM_OUT, true),
        title: 'Zoom out',
        onClick: function onClick(event) {
          return handleChangeTool(event, TOOL_ZOOM_OUT);
        } },
      React.createElement(IconZoomOut, null)
    ),
    React.createElement(
      Link,
      {
        style: calcElementStyle(position, false, false),
        styleHover: calcElementStyle(position, false, true),
        title: 'Fit to viewer',
        onClick: function onClick(event) {
          return handleFit(event);
        } },
      React.createElement(IconFit, null)
    )
  );
}

Toolbar.propTypes = {
  position: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]).isRequired,
  tool: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeTool: PropTypes.func.isRequired
};