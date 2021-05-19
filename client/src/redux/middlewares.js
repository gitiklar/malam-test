import { UPDATE_LOGGED_IN_USER_FORM_DATA , LOAD_DATA_FROM_LOCAL_STORAGE } from "./actions";

export const saveLoggedInUserFormDataToLocalStorage = ({ getState }) => next => action => {
    const nextAction = next(action);
    if(action.type !== UPDATE_LOGGED_IN_USER_FORM_DATA) return nextAction;
    localStorage.setItem('loggedInUserFormData',JSON.stringify(getState().userReducer.loggedInUserFormData));
    return nextAction;
}

export const loadLoggedInUserFormDataFromLocalStorage = store => next => action => {
    if(action.type !== LOAD_DATA_FROM_LOCAL_STORAGE) return next(action);
    action.payload = JSON.parse(localStorage.getItem('loggedInUserFormData'));
    if(!action.payload) return;
    return next(action);
}