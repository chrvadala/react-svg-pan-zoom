import {
  SET_TOOL,
  SET_MINIATURE_OPEN
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const controls = (state = INITIAL_STATE.controls, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_TOOL:
      return {...state, tool: payload.tool};
    case SET_MINIATURE_OPEN:
      return {...state, miniatureOpen: payload.miniatureOpen};
    default:
      return state;
  }
}
export default controls;