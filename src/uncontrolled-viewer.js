import React from "react";
import ReactSVGPanZoom from './viewer'
import PropTypes from "prop-types";
import {TOOL_NONE} from "./constants";

export default class UncontrolledReactSVGPanZoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || {},
      tool: props.defaultTool || TOOL_NONE,
    }

    this.Viewer = null;
    this.changeTool = this.changeTool.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  changeTool(tool) {
    this.setState({tool})
  }

  changeValue(value) {
    this.setState({value})
  }

  pan(SVGDeltaX, SVGDeltaY) {
    this.Viewer.pan(SVGDeltaX, SVGDeltaY)
  }

  zoom(SVGPointX, SVGPointY, scaleFactor) {
    this.Viewer.zoom(SVGPointX, SVGPointY, scaleFactor)
  }

  fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    this.Viewer.fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)
  }

  fitToViewer(SVGAlignX, SVGAlignY) {
    this.Viewer.fitToViewer(SVGAlignX, SVGAlignY)
  }

  zoomOnViewerCenter(scaleFactor) {
    this.Viewer.zoomOnViewerCenter(scaleFactor)
  }

  setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
    this.Viewer.setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)
  }

  reset() {
    this.Viewer.reset()
  }

  openMiniature() {
    this.Viewer.openMiniature()
  }

  closeMiniature() {
    this.Viewer.closeMiniature()
  }

  render() {
    const {width, height, onChangeTool, onChangeValue, ...props} = this.props
    const {tool, value} = this.state

    return (
      <ReactSVGPanZoom
        width={width} height={height}
        tool={tool} onChangeTool={this.changeTool}
        value={value} onChangeValue={this.changeValue}
        ref={Viewer => this.Viewer = Viewer}
        {...props}
      />
    )
  }
}

UncontrolledReactSVGPanZoom.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  defaultValue: PropTypes.object,
  defaultTool: PropTypes.string,
}
