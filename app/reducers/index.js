import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import wallet from './wallet';
import soccer from './soccer';
import mlb from './mlb';
import wagers from './wager';

const rootReducer = combineReducers({
  routing,
  wallet,
  soccer,
  mlb,
  wagers
});

export default rootReducer;
