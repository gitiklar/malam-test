import produce from 'immer';
import { CLEAR_BUYING_SUMMARY, UPDATE_BUYING_SUMMARY } from '../actions';

const initialState = {
    buyingSummary : [],
};

export default produce((state , action) => {
    switch(action.type) {
        case UPDATE_BUYING_SUMMARY: 
            state.buyingSummary = action.payload;
            break;
        case CLEAR_BUYING_SUMMARY: 
            state.buyingSummary = initialState.buyingSummary;
            break;
    }
} , initialState);