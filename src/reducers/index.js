
import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';

import settings from './settings';
import viewer from './viewer';
import geometry from './geometry';
import mouse from './mouse';
import touch from './touch';
import imperative from './imperative';

import {INITIAL_STATE} from './initialState';


export default reduceReducers(
  INITIAL_STATE,
  //first the independent reducers...
  combineReducers({
    settings,
    viewer,
    geometry,
  }),
  //...then the reducer that depends on the settings above. 
  // Operates on 'viewer'
  (state, action) => {
    const reducers = {
      mouse,
      touch,
      imperative,
    }
    return Object.keys(reducers).reduce((newState, key) => ({...newState, ...reducers[key](newState, action)}), state)
  },
)
