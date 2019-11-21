import {
  SET_AUTO_PAN_RUNNING,
  SET_AUTO_PAN_HOVER,
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const autoPanning = (state = INITIAL_STATE.autoPanning, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_AUTO_PAN_RUNNING:
      return {...state, autoPanIsRunning: payload.autoPanIsRunning};
    case SET_AUTO_PAN_HOVER:
      return {...state, autoPanHover: payload.autoPanHover};
    default:
      return state;
  }
};
export default autoPanning;