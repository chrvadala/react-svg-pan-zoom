import React, {forwardRef, useState} from "react";
import ReactSVGPanZoom from './viewer'
import PropTypes from "prop-types";
import {TOOL_NONE} from "./constants";

const UncontrolledReactSVGPanZoom = forwardRef((props, Viewer) => {
  const [value, setValue] = useState(props.defaultValue || {});
  const [tool, setTool] = useState(props.defaultTool || TOOL_NONE);

  function pan(SVGDeltaX, SVGDeltaY) {
    Viewer.pan(SVGDeltaX, SVGDeltaY)
  }

  function zoom(SVGPointX, SVGPointY, scaleFactor) {
    Viewer.zoom(SVGPointX, SVGPointY, scaleFactor)
  }

  function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    Viewer.fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)
  }

  function fitToViewer(SVGAlignX, SVGAlignY) {
    Viewer.fitToViewer(SVGAlignX, SVGAlignY)
  }

  function zoomOnViewerCenter(scaleFactor) {
    Viewer.zoomOnViewerCenter(scaleFactor)
  }

  function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
    Viewer.setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)
  }

  function reset() {
    Viewer.reset()
  }

  function openMiniature() {
    Viewer.openMiniature()
  }

  function closeMiniature() {
    Viewer.closeMiniature()
  }

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
