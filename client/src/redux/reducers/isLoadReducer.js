import produce from 'immer';
import { ALL_DATA_IS_LOADED } from '../actions';

const initialState = {
    allDataIsLoaded: false,
};

export default produce((state , action) => {
    switch(action.type) {
        case ALL_DATA_IS_LOADED: 
            state.allDataIsLoaded = true;
            break;
    }} , initialState);
