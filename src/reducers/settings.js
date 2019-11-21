import {
  SET_DETECT_AUTO_PAN,
  SET_DETECT_PINCH_GESTURE,
  SET_DETECT_WHEEL,
  SET_MODIFIER_KEYS,
  SET_PREVENT_PAN_OUTSIDE,
  SET_PINCH_POINT_DISTANCE,
  SET_PRE_PINCH_MODE,
  SET_SCALE_FACTOR,
  SET_SCALE_FACTOR_MIN,
  SET_SCALE_FACTOR_MAX,
  SET_SCALE_FACTOR_ON_WHEEL,
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const settings = (state = INITIAL_STATE.settings, action) => {
  const {type, payload} = action;
  switch (type) {
    //detect interactions
    case SET_DETECT_AUTO_PAN:
        return {...state, detectAutoPan: payload.detectAutoPan};
    case SET_DETECT_WHEEL:
      return {...state, detectWheel: payload.detectWheel};
    case SET_DETECT_PINCH_GESTURE:
      return {...state, detectPinchGesture: payload.detectPinchGesture};
    case SET_PREVENT_PAN_OUTSIDE:
      return {...state, preventPanOutside: payload.preventPanOutside};
    //scale factors
    case SET_SCALE_FACTOR:
      return {...state, scaleFactor: payload.scaleFactor};
    case SET_SCALE_FACTOR_MIN:
      return {...state, scaleFactorMin: payload.scaleFactorMin};
    case SET_SCALE_FACTOR_MAX:
      return {...state, scaleFactorMax: payload.scaleFactorMax};
    case SET_SCALE_FACTOR_ON_WHEEL:
        return {...state, scaleFactorOnWheel: payload.scaleFactorOnWheel};
    //other
    case SET_MODIFIER_KEYS:
      return {...state, modifierKeys: payload.modifierKeys};
    case SET_PINCH_POINT_DISTANCE:
      return {...state, pinchPointDistance: payload.pinchPointDistance};
    case SET_PRE_PINCH_MODE:
      return {...state, prePinchMode: payload.prePinchMode};
    default:
      return state;
  }
};
export default settings;
