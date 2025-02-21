import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

// створення стори станів редаксу
// const store = createStore(rootReducer, composeWithDevTools());
const store = configureStore({ reducer: rootReducer });

export default store;
