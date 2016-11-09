export function selectTool(tool){
  return {
    type: "SELECT_TOOL",
    tool
  }
}

export function selectToolNone(){
  return {
    type: "SELECT_TOOL_NONE"
  }
}

export function selectToolPan(){
  return {
    type: "SELECT_TOOL_PAN"
  }
}

export function selectToolZoomIn(){
  return {
    type: "SELECT_TOOL_ZOOM_IN"
  }
}

export function selectToolZoomOut(){
  return {
    type: "SELECT_TOOL_ZOOM_OUT"
  }
}

export function zoomOnViewerCenter(scaleFactor){
  return {
    type: "ZOOM_ON_VIEWER_CENTER",
    scaleFactor
  }
}

export function fitToViewer() {
  return {
    type: "FIT_TO_VIEWER"
  }
}

export function pan(deltaX, deltaY){
  return {
    type: "PAN",
    deltaX, deltaY
  }
}

export function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight){
  return {
    type: "FIT_SELECTION",
    selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight
  }
}

export function setValue(value){
  return {
    type: "SET_VALUE",
    value
  }
}
