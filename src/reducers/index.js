
import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';

import scaleFactors from './scale-factors';
import autoPanning from './auto-panning';
import controls from './controls';
import settings from './settings';
import geometry from './geometry';
import mouse from './mouse';
import touch from './touch';
import imperative from './imperative';

import {INITIAL_STATE} from './initialState';


export default reduceReducers(
  INITIAL_STATE,
  //first the independent reducers
  combineReducers({
    scaleFactors,
    autoPanning,
    settings,
    controls,
    geometry,
    viewer: (state = []) => state,

  }),
  //then the reducer that depends on the settings above:
  (state, action) => {
    const reducers = {
      mouse,
      touch,
      imperative,
    }
    return Object.keys(reducers).reduce((newState, key) => ({...newState, ...reducers[key](newState, action)}), state)
  },
)
