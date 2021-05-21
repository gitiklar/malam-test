import produce from 'immer';
import { INDICATION_MESSAGE, LOAD_DATA_FROM_LOCAL_STORAGE, UPDATE_LOGGED_IN_USER_FORM_DATA } from '../actions';

const initialState = {
    loggedInUserFormData: {
        username: 'guest',
        role: 'guest',
    },
    indicationMessage: {
        type: '',
        message:'',
        key:'xxx',
    },
};

export default produce((state , action) => {
    switch(action.type) {
        case INDICATION_MESSAGE: 
            state.indicationMessage = { ...state.indicationMessage , ...action.payload };
            break;
        case UPDATE_LOGGED_IN_USER_FORM_DATA:
            state.loggedInUserFormData = action.payload;
            action.payload._id && localStorage.setItem('userId' , action.payload._id);
            !action.payload._id && localStorage.removeItem('userId');
            break;
        case LOAD_DATA_FROM_LOCAL_STORAGE: 
            state.loggedInUserFormData = action.payload;
            break;
    }
} , initialState);