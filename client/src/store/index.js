import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// створення стори станів редаксу
// const store = createStore(rootReducer, composeWithDevTools());
const store = configureStore({ reducer: rootReducer });

export default store;
