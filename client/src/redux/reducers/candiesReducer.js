import produce from 'immer';
import { ADD_NEW_CANDY, DELETE_CANDY_ROW, UPDATE_CANDIES_ARRAY_IN_STORE, UPDATE_CANDY_TO_STORE } from '../actions';

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
        case DELETE_CANDY_ROW:
            state.candiesArray.splice(action.payload , 1);
            break;
        case UPDATE_CANDY_TO_STORE:
            const indexToUpdate = state.candiesArray.findIndex(candy=>candy._id === action.payload._id);
            state.candiesArray[indexToUpdate] = action.payload;
            break;
    }
} , initialState);