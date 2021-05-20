import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { loadLoggedInUserFormDataFromLocalStorage, saveLoggedInUserFormDataToLocalStorage } from './middlewares';
import { loadCandiesArrayFromServer, loadDataFromLocalStorage } from './actions';
import userReducer from './reducers/userReducer';
import candiesReducer from './reducers/candiesReducer';
import buyingSummaryReducer from './reducers/buyingSummaryReducer';

const reducer = combineReducers({ userReducer , candiesReducer , buyingSummaryReducer});

const store = createStore(reducer , applyMiddleware(thunk , saveLoggedInUserFormDataToLocalStorage , loadLoggedInUserFormDataFromLocalStorage));
store.dispatch(loadDataFromLocalStorage());
store.dispatch(loadCandiesArrayFromServer());
window.store = store;
export default store;