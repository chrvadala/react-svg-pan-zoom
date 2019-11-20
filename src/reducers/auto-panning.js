import {
  SET_AUTO_PAN_RUNNING,
  SET_AUTO_PAN_HOVER,
} from '../actions/types';

import {
  POSITION_NONE,
} from '../constants';

const INITIAL_STATE = {
  autoPanIsRunning: true,
  autoPanHover: POSITION_NONE,
};

const autoPanning = (state = INITIAL_STATE, action) => {
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