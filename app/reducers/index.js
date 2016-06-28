import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import wallet from './wallet';
import soccer from './soccer';

const rootReducer = combineReducers({
  routing,
  wallet,
  soccer
});

export default rootReducer;
