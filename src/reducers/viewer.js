import {
  SET_TOOL,
  SET_MINIATURE_OPEN,
  SET_AUTO_PAN_HOVER
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const viewer = (state = INITIAL_STATE.viewer, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_TOOL:
      return {...state, tool: payload.tool};
    case SET_MINIATURE_OPEN:
      return {...state, miniatureOpen: payload.miniatureOpen};
    case SET_AUTO_PAN_HOVER:
      return {...state, autoPanHover: payload.autoPanHover};
    default:
      return state;
  }
}
export default viewer;