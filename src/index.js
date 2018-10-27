import {tipNoViewer} from "./migration-tips";

export {default as ReactSVGPanZoom} from './viewer';
export {default as UncontrolledReactSVGPanZoom} from './uncontrolled-viewer';
export {default as Toolbar} from './ui-toolbar/toolbar';
export {default as Miniature} from './ui-miniature/miniature';
export {setPointOnViewerCenter, reset} from './features/common';
export {pan} from './features/pan';
export {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';
export {openMiniature, closeMiniature} from './features/miniature'
export * from './constants';

export const Viewer = () => {
  tipNoViewer()
  return null;
};
