import ReactSVGPanZoom from './viewer';
import Toolbar from './ui-toolbar/toolbar';
import {setPointOnViewerCenter, reset} from './features/common';
import {pan} from './features/pan';
import {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

const Viewer = () => {
  let msg = "HEY! You are trying to use an older version of ReactSVGPanZoom. "
   + "Read here https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/migrate-from-v1-to-v2.md";

  console.error(msg);
  return null;
};


export {
  Viewer, //deprecated
  ReactSVGPanZoom, Toolbar,
  pan, zoom, fitSelection, fitToViewer, zoomOnViewerCenter, setPointOnViewerCenter, reset,
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
};
