export const INDICATION_MESSAGE = 'INDICATION_MESSAGE';
export const UPDATE_LOGGED_IN_USER_FORM_DATA = 'UPDATE_LOGGED_IN_USER_FORM_DATA';
export const LOAD_DATA_FROM_LOCAL_STORAGE = 'LOAD_DATA_FROM_LOCAL_STORAGE';
export const ADD_NEW_CANDY = 'ADD_NEW_CANDY';
export const UPDATE_CANDIES_ARRAY_IN_STORE = 'UPDATE_CANDIES_ARRAY_IN_STORE';
export const DELETE_CANDY_ROW = 'DELETE_CANDY_ROW';
export const UPDATE_CANDY_TO_STORE = 'UPDATE_CANDY_TO_STORE';
export const UPDATE_BUYING_SUMMARY = 'UPDATE_BUYING_SUMMARY';
export const CLEAR_BUYING_SUMMARY = 'CLEAR_BUYING_SUMMARY';
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

export const updateCandiesCountByOrder = (buyingSummary) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/candies', buyingSummary);
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && dispatch(clearBuyingSummary());
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const updateCandyRow = (rowId , updatedCandyData) => {
    return async (dispatch) => {
        try {     
            const response = await putRequest('/candy/'+ rowId , updatedCandyData);
            response.status === 200 && dispatch(updateCandyToStore(response.updatedCandy));
            dispatch(indicationMessageHandler(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const deleteCandyRowFromServer = rowId => {
    return async (dispatch) => {
        try {     
            const response = await deleteRequest('/candy/'+ rowId);
            dispatch(indicationMessageHandler(response.type, response.message));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const loadCandiesArrayFromServer = () => {
    return async (dispatch) => {
        try {     
            const response = await getRequest('/candies');
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && dispatch(updateCandiesArray(response.candies));
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const addNewCandy = (newCandyFormData , visibleFalse , setKey) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/candy' , newCandyFormData);
            dispatch(indicationMessageHandler(response.type, response.message));
            response.status === 200 && (
                setKey(key=>!key),  visibleFalse() , dispatch(addNewCandyToStore(response.newCandy))
            );
            setTimeout(()=> dispatch(indicationMessageHandler('', '')));
        } catch(err) {
            dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
        }
    }
}

export const createNewUser = (registerUserFormData , history , state) => {
    return async (dispatch) => {
        try {     
            const response = await postRequest('/user' , registerUserFormData);
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
            const response = await postRequest('/login' , loginUserFormData);
            if(response.status === 200) {
                dispatch(updateLoggedInUserFormData(response.user));
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