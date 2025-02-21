import userReducer from './userSlice';
import counterReducer from './counterSlice';
import themeReducer from './themeSlice';

const rootReducer = {
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer
};

export default rootReducer;