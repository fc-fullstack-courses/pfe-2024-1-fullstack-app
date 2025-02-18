import { combineReducers } from 'redux';
import userReducer from './userReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer
});

export default rootReducer;