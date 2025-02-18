import { legacy_createStore as createStore } from 'redux';
import reducer from './reducers/counterReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

// створення стори станів редаксу
const store = createStore(reducer, composeWithDevTools());

export default store;
