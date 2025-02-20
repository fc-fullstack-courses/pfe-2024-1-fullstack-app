import userReducer from './userReducer';
import counterReducer from './counterReducer';
import themeReducer from './themeReducer';

const rootReducer = {
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer
};

export default rootReducer;