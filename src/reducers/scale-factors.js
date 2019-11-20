import {
  SET_SCALE_FACTOR,
  SET_SCALE_FACTOR_MIN,
  SET_SCALE_FACTOR_MAX,
  SET_SCALE_FACTOR_ON_WHEEL,
} from '../actions/types';


import {INITIAL_STATE} from './initialState';

const scaleFactors = (state = INITIAL_STATE.scaleFactors, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SCALE_FACTOR:
      return {...state, scaleFactor: payload.scaleFactor};
    case SET_SCALE_FACTOR_MIN:
      return {...state, scaleFactorMin: payload.scaleFactorMin};
    case SET_SCALE_FACTOR_MAX:
      return {...state, scaleFactorMax: payload.scaleFactorMax};
    case SET_SCALE_FACTOR_ON_WHEEL:
        return {...state, scaleFactorOnWheel: payload.scaleFactorOnWheel};
    default:
      return state;
  }
};
export default scaleFactors;
