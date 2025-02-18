import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

// створення стори станів редаксу
const store = createStore(rootReducer, composeWithDevTools());

export default store;
