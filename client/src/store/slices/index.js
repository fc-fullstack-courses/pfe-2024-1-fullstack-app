import userReducer from './userSlice';
import counterReducer from './counterSlice';
import themeReducer from './themeSlice';
import chatReducer from './chatSlice';

const rootReducer = {
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer,
  chat: chatReducer,
};

export default rootReducer;
