
import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';

import scaleFactors from './scale-factors';
import autoPanning from './auto-panning';
import controls from './controls';
import settings from './settings';
import geometry from './geometry';
import viewer from './viewer';


export default reduceReducers(
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
  viewer
)
    

