export const INDICATION_MESSAGE = 'INDICATION_MESSAGE';
export const UPDATE_LOGGED_IN_USER_FORM_DATA = 'UPDATE_LOGGED_IN_USER_FORM_DATA';
export const LOAD_DATA_FROM_LOCAL_STORAGE = 'LOAD_DATA_FROM_LOCAL_STORAGE';
export const ADD_NEW_CANDY = 'ADD_NEW_CANDY';
export const UPDATE_CANDIES_ARRAY_IN_STORE = 'UPDATE_CANDIES_ARRAY_IN_STORE';
export const DELETE_CANDY_ROW = 'DELETE_CANDY_ROW';
export const UPDATE_CANDY_TO_STORE = 'UPDATE_CANDY_TO_STORE';
export const UPDATE_BUYING_SUMMARY = 'UPDATE_BUYING_SUMMARY';
export const CLEAR_BUYING_SUMMARY = 'CLEAR_BUYING_SUMMARY';
export const USER_DATA_IS_LOADED = 'USER_DATA_IS_LOADED';
export const CANDIES_DATA_IS_LOADED = 'CANDIES_DATA_IS_LOADED';
const SEND_X_ACCESS_TOKEN = true;
const DONT_SEND_X_ACCESS_TOKEN = false;

import { deleteRequest, getRequest, postRequest, putRequest } from "../service";

export const clearBuyingSummary = () => {
    return { type: CLEAR_BUYING_SUMMARY};
}

export const updateBuyingSummary = buyingSummary => {
    return { type: UPDATE_BUYING_SUMMARY ,  payload: buyingSummary};
}

export const deleteCandyRow = rowIndex => {
    return { type: DELETE_CANDY_ROW ,  payload: rowIndex};
}

export const updateLoggedInUserFormData = user => {
    return { type: UPDATE_LOGGED_IN_USER_FORM_DATA , payload: user };
}

export const indicationMessageHandler = (type , message) => {
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

export const updateCandyToStore = newCandyFormData => {
    return { type: UPDATE_CANDY_TO_STORE , payload: newCandyFormData};
}

export const userDataIsLoaded = () => {
    return { type: USER_DATA_IS_LOADED };
}

export const candiesDataIsLoaded = () => {
    return { type: CANDIES_DATA_IS_LOADED };
}

export const getUserIfActive = () => {
    return async (dispatch) => {
        const userId = (localStorage.getItem('userId'));
        try {
            const response = await getRequest('/user/' + userId , true );
            response.status === 200 && dispatch(updateLoggedInUserFormData(response.user));
        } catch(err) {
            dispatch(indicationMessageHandler('error','Oops, an error occurred!'));
        }
        dispatch(userDataIsLoaded());
    }
}

export const loadCandiesArrayFromServer = () => {
    return async (dispatch) => {
        try {     
            const response = await getRequest('/candies' , DONT_SEND_X_ACCESS_TOKEN);
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && (
                dispatch(updateCandiesArray(response.candies)),
                setTimeout(()=>dispatch(candiesDataIsLoaded()) , 500)
            );
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','Oops, an error occurred!'));
        }
    }
}

export const updateCandiesCountByOrder = (buyingSummary , history) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/candies', SEND_X_ACCESS_TOKEN , buyingSummary);
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && dispatch(clearBuyingSummary());
            response.status === 401 && (dispatch(logout()) , history.push('/login', { backToBuyOnline: true }));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const updateCandyRow = (rowId , updatedCandyData , history) => {
    return async (dispatch) => {
        try {     
            const response = await putRequest('/candy/'+ rowId , SEND_X_ACCESS_TOKEN, updatedCandyData);
            response.status === 200 && dispatch(updateCandyToStore(response.updatedCandy));
            response.status === 401 && (dispatch(logout()) , history.push('/login', { backToBuyOnline: true }));
            dispatch(indicationMessageHandler(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const deleteCandyRowFromServer = (rowId , history) => {
    return async (dispatch) => {
        try {     
            const response = await deleteRequest('/candy/'+ rowId , SEND_X_ACCESS_TOKEN);
            response.status === 401 && (dispatch(logout()) , history.push('/login', { backToBuyOnline: true }));
            dispatch(indicationMessageHandler(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','Oops, an error occurred!'));
        }
    }
}

export const addNewCandy = (newCandyFormData , visibleFalse , setKey , history) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/candy' , SEND_X_ACCESS_TOKEN , newCandyFormData);
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && (setKey(key=>!key),  visibleFalse() , dispatch(addNewCandyToStore(response.newCandy)));
            response.status === 401 && (dispatch(logout()) , history.push('/login', { backToBuyOnline: true }));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const signUp = (registerUserFormData , history , state) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/user' , DONT_SEND_X_ACCESS_TOKEN, registerUserFormData);
            dispatch(indicationMessageHandler(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
            response.status === 200 && history.push('/login', state);
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const login = (loginUserFormData , history , urlParams) => {
    return async (dispatch) => {
        try {
            const response = await postRequest('/login' , DONT_SEND_X_ACCESS_TOKEN , loginUserFormData);
            if(response.status === 200) {
                dispatch(updateLoggedInUserFormData(response.user));
                localStorage.setItem('accessToken' , response.accessToken);
                urlParams && urlParams.backToBuyOnline && history.push('/home/buy-online');
                !(urlParams && urlParams.backToBuyOnline) && history.push('/home');
            } else {
                dispatch(indicationMessageHandler(response.type, response.message));
            }
        } catch(err) {
            dispatch(indicationMessageHandler('error','Oops, an error occurred!'));
        }
        setTimeout(()=> dispatch(indicationMessageHandler('', '')));
    }
}