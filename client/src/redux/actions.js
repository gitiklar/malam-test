export const INDICATION_MESSAGE = 'INDICATION_MESSAGE';
export const UPDATE_LOGGED_IN_USER_FORM_DATA = 'UPDATE_LOGGED_IN_USER_FORM_DATA';
export const LOAD_DATA_FROM_LOCAL_STORAGE = 'LOAD_DATA_FROM_LOCAL_STORAGE';
export const ADD_NEW_CANDY = 'ADD_NEW_CANDY';
export const UPDATE_CANDIES_ARRAY_IN_STORE = 'UPDATE_CANDIES_ARRAY_IN_STORE';
import { getRequest, postRequest } from "../service";

export const updateLoggedInUserFormData = user => {
    return { type: UPDATE_LOGGED_IN_USER_FORM_DATA , payload: user };
}

export const indicationMessage = (type , message) => {
    return { type: INDICATION_MESSAGE , payload: { type , message } };
}

export const loadDataFromLocalStorage = () => {
    return { type: LOAD_DATA_FROM_LOCAL_STORAGE };
}

export const logout = () => {
    return updateLoggedInUserFormData({ username: 'guest', role: 'guest' });
}

export const updateCandiesArray = candiesArray => {
    return { type: UPDATE_CANDIES_ARRAY_IN_STORE , payload: candiesArray };
}

export const addNewCandyToStore = newCandyFormData => {
    return { type: ADD_NEW_CANDY , payload: newCandyFormData};
}

export const loadCandiesArrayFromServer = () => {
    return async (dispatch) => {
        try {     
            const response = await getRequest('/candies');
            dispatch(indicationMessage(response.type, response.message));
            response.status === 200 && dispatch(updateCandiesArray(response.candies));
            setTimeout(()=> dispatch(indicationMessage('', '')));
        } catch(err) {
            dispatch(indicationMessage('error','!An error occurred the form was not submitted'));
        }
    }
}

export const addNewCandy = (newCandyFormData , visibleFalse) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/candy' , newCandyFormData);
            dispatch(indicationMessage(response.type, response.message));
            response.status === 200 && (visibleFalse() , dispatch(addNewCandyToStore(newCandyFormData)));
            setTimeout(()=> dispatch(indicationMessage('', '')));
        } catch(err) {
            dispatch(indicationMessage('error','!An error occurred the form was not submitted'));
        }
    }
}

export const createNewUser = (registerUserFormData , history) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
        try {
            const response = await postRequest('/login' , loginUserFormData);
            if(response.status === 200) {
                dispatch(updateLoggedInUserFormData(response.user));
                history.push('/home');
            } else {
                dispatch(indicationMessage(response.type, response.message));
            }
        } catch(err) {
            dispatch(indicationMessage('error','Oops, an error occurred!'));
        }
        setTimeout(()=> dispatch(indicationMessage('', '')));
    }
}