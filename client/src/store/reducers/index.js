import { combineReducers } from 'redux';
import userReducer from './userReducer';
import counterReducer from './counterReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer
});

export default rootReducer;