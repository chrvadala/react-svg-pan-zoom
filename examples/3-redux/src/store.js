import {createStore} from 'redux';
import {Record, fromJS} from 'immutable';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  pan, zoom, fitSelection, fitToViewer, zoomOnViewerCenter
} from 'react-svg-pan-zoom';

const State = Record({
  tool: TOOL_NONE,
  value: null
}, 'State');


function reducer(state, action) {
  state = state || new State();

  let value = state.value ? state.value.toJS() : null;

  switch (action.type) {

    case "SELECT_TOOL":
      return state.set('tool', action.tool);

    case "SELECT_TOOL_NONE":
      return state.set('tool', TOOL_NONE);

    case "SELECT_TOOL_PAN":
      return state.set('tool', TOOL_PAN);

    case "SELECT_TOOL_ZOOM_IN":
      return state.set('tool', TOOL_ZOOM_IN);

    case "SELECT_TOOL_ZOOM_OUT":
      return state.set('tool', TOOL_ZOOM_OUT);

    case "ZOOM_ON_VIEWER_CENTER":
      return state.set('value', fromJS(zoomOnViewerCenter(value, action.scaleFactor)));

    case "FIT_TO_VIEWER":
      return state.set('value', fromJS(fitToViewer(value)));

    case "PAN":
      return state.set('value', fromJS(pan(value, action.deltaX, action.deltaY)));

    case "FIT_SELECTION":
      return state.set('value', fromJS(fitSelection(value, action.selectionSVGPointX, action.selectionSVGPointY, action.selectionWidth, action.selectionHeight)));

    case "SET_VALUE":
      return state.set('value', fromJS(action.value));

    default:
      return state;
  }
}

export function initStore() {
  let middlewares = window.devToolsExtension ? window.devToolsExtension() : f => f;
  return createStore(reducer, null, middlewares);
}
