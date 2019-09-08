import React, {forwardRef, useState} from "react";
import ReactSVGPanZoom from './viewer'
import PropTypes from "prop-types";
import {TOOL_NONE} from "./constants";

const UncontrolledReactSVGPanZoom = forwardRef((props, Viewer) => {
  const [value, setValue] = useState(props.defaultValue || {});
  const [tool, setTool] = useState(props.defaultTool || TOOL_NONE);

  const {width, height, onChangeTool, onChangeValue, ...svgProps} = props;

  return (
    <ReactSVGPanZoom
      width={width} height={height}
      tool={tool} onChangeTool={setTool}
      value={value} onChangeValue={setValue}
      ref={Viewer}
      {...svgProps}
    />
  )
})

UncontrolledReactSVGPanZoom.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  defaultValue: PropTypes.object,
  defaultTool: PropTypes.string,
}

export default UncontrolledReactSVGPanZoom;
