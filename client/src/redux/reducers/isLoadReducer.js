import produce from 'immer';
import { USER_DATA_IS_LOADED , CANDIES_DATA_IS_LOADED } from '../actions';

const initialState = {
    userDataIsLoaded: false,
    candiesDataIsLoaded: false,
};

export default produce((state , action) => {
    switch(action.type) {
        case USER_DATA_IS_LOADED: 
            state.userDataIsLoaded = true;
            break;
        case CANDIES_DATA_IS_LOADED: 
            state.candiesDataIsLoaded = true;
            break;
    }} , initialState);
