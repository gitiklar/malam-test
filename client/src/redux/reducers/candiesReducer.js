import { ADD_NEW_CANDY, UPDATE_CANDIES_ARRAY_IN_STORE } from '../actions';
import produce from 'immer';

const initialState = {
    candiesArray : [],
};

export default produce((state , action) => {
    switch(action.type) {
        case ADD_NEW_CANDY: 
            state.candiesArray.push(action.payload);
            break;
        case UPDATE_CANDIES_ARRAY_IN_STORE:
            state.candiesArray = action.payload;
            break;
    }
} , initialState);