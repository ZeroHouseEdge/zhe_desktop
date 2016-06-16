import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import wallet from './wallet';

const rootReducer = combineReducers({
  counter,
  routing,
  wallet
});

export default rootReducer;
