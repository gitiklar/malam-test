import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import { loadLoggedInUserFormDataFromLocalStorage, saveLoggedInUserFormDataToLocalStorage } from './middlewares';
import { loadDataFromLocalStorage } from './actions';

const reducer = combineReducers({ userReducer });

const store = createStore(reducer , applyMiddleware(thunk , saveLoggedInUserFormDataToLocalStorage , loadLoggedInUserFormDataFromLocalStorage));
store.dispatch(loadDataFromLocalStorage());
window.store = store;
export default store;