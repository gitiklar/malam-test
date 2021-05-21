import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { updateLoggedInUserFormDataMiddleware } from './middlewares';
import { getUserIfActive, loadCandiesArrayFromServer } from './actions';
import userReducer from './reducers/userReducer';
import candiesReducer from './reducers/candiesReducer';
import buyingSummaryReducer from './reducers/buyingSummaryReducer';

const reducer = combineReducers({ userReducer , candiesReducer , buyingSummaryReducer});

const store = createStore(reducer , applyMiddleware(thunk , updateLoggedInUserFormDataMiddleware ));
store.dispatch(getUserIfActive());
store.dispatch(loadCandiesArrayFromServer());
window.store = store;
export default store;