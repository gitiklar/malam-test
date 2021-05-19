import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { loadLoggedInUserFormDataFromLocalStorage, saveLoggedInUserFormDataToLocalStorage } from './middlewares';
import { loadDataFromLocalStorage } from './actions';
import userReducer from './reducers/userReducer';
import candiesReducer from './reducers/candiesReducer';

const reducer = combineReducers({ userReducer , candiesReducer});

const store = createStore(reducer , applyMiddleware(thunk , saveLoggedInUserFormDataToLocalStorage , loadLoggedInUserFormDataFromLocalStorage));
store.dispatch(loadDataFromLocalStorage());
window.store = store;
export default store;