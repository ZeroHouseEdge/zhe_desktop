import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import wallet from './wallet';

const rootReducer = combineReducers({
  routing,
  wallet
});

export default rootReducer;
