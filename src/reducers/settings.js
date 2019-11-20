import {
  SET_DETECT_PINCH_GESTURE,
  SET_DETECT_WHEEL,
  SET_MODIFIER_KEYS,
  SET_PREVENT_PAN_OUTSIDE,
  SET_PINCH_POINT_DISTANCE,
  SET_PRE_PINCH_MODE,
} from '../actions/types';

import {INITIAL_STATE} from './initialState';

const settings = (state = INITIAL_STATE.settings, action) => {
  const {type, payload} = action;
  switch (type) {
    //detect touch/wheel    
    case SET_DETECT_PINCH_GESTURE:
      return {...state, detectPinchGesture: payload.detectPinchGesture};
    case SET_DETECT_WHEEL:
      return {...state, detectWheel: payload.detectWheel};
    //other
    case SET_MODIFIER_KEYS:
      return {...state, modifierKeys: payload.modifierKeys};
    case SET_PREVENT_PAN_OUTSIDE:
      return {...state, preventPanOutside: payload.preventPanOutside};
    case SET_PINCH_POINT_DISTANCE:
      return {...state, pinchPointDistance: payload.pinchPointDistance};
    case SET_PRE_PINCH_MODE:
      return {...state, prePinchMode: payload.prePinchMode};
    default:
      return state;
  }
};
export default settings;
