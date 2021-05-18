export const INDICATION_MESSAGE = 'INDICATION_MESSAGE';
export const UPDATE_LOGGED_IN_USER_FORM_DATA = 'UPDATE_LOGGED_IN_USER_FORM_DATA';
export const LOAD_DATA_FROM_LOCAL_STORAGE = 'LOAD_DATA_FROM_LOCAL_STORAGE';
import { postRequest } from "../service";

export const updateLoggedInUserFormData = user => {
    return { type: UPDATE_LOGGED_IN_USER_FORM_DATA , payload: user };
}

export const indicationMessage = (type , message) => {
    return { type: INDICATION_MESSAGE , payload: { type , message } };
}

export const loadDataFromLocalStorage = () => {
    return { type: LOAD_DATA_FROM_LOCAL_STORAGE };
}

export const createNewUser = (registerUserFormData , history) => {
    registerUserFormData.role = 'client';
    delete registerUserFormData['confirm-password'];

    return async (dispatch , getState) => {
        try {     
            const response = await postRequest('/user' , registerUserFormData);
            dispatch(indicationMessage(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessage('', '')));
            response.status === 200 && history.push('/login'); 
        } catch(err) {
            dispatch(indicationMessage('error','!An error occurred the form was not submitted'));
        }
    }
}

export const login = (loginUserFormData , history) => {
    return async (dispatch, getState) => {
        try {
            const response = await postRequest('/login' , loginUserFormData);
            if(response.status === 200) {
                dispatch(updateLoggedInUserFormData(response.user));
                history.push('/home');
            } else {
                dispatch(indicationMessage(response.type, response.message));
            }
        } catch(err) {
            dispatch(indicationMessage('error','!אופססס התרחשה שגיאה'));
        }
        setTimeout(()=> dispatch(indicationMessage('', '')));
    }
}