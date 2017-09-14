export {default as ReactSVGPanZoom} from './viewer';
export {default as Toolbar} from './ui-toolbar/toolbar';
export {default as Miniature} from './ui-miniature/miniature';
export {setPointOnViewerCenter, reset} from './features/common';
export {pan} from './features/pan';
export {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';
export {openMiniature, closeMiniature} from './features/miniature'
export * from './constants';

export const Viewer = () => {
  let msg = "HEY! You are trying to use an older version of ReactSVGPanZoom. "
    + "Read here https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/migrate-from-v1-to-v2.md";

  console.error(msg);
  return null;
};
