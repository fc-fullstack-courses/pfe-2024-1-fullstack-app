import { legacy_createStore as createStore } from 'redux';
import reducer from './reducers/counterReducer';

// створення стори станів редаксу
const store = createStore(reducer);

export default store;
