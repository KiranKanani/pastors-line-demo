import { combineReducers, createStore } from 'redux';
import contactReducer from './reducers/contactReducer';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
  contact: contactReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer);

export default store;
