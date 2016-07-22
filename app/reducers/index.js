import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import wallet from './wallet';
import soccer from './soccer';
import mlb from './mlb';
import wagers from './wager';
import socket from './socket';
import casino from './casino';

const rootReducer = combineReducers({
  routing,
  wallet,
  soccer,
  mlb,
  wagers,
  socket,
  casino
});

export default rootReducer;
