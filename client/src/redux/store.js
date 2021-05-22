import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { getUserIfActive, loadCandiesArrayFromServer } from './actions';
import isLoadReducer from './reducers/isLoadReducer';
import userReducer from './reducers/userReducer';
import candiesReducer from './reducers/candiesReducer';
import buyingSummaryReducer from './reducers/buyingSummaryReducer';

const reducer = combineReducers({ isLoadReducer , userReducer , candiesReducer , buyingSummaryReducer});

const store = createStore(reducer , applyMiddleware(thunk));
store.dispatch(getUserIfActive());
store.dispatch(loadCandiesArrayFromServer());
window.store = store;
export default store;