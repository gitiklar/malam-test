import { ADD_NEW_CANDY } from '../actions';
import produce from 'immer';

const initialState = {
    candiesArray : [
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
        {
            "name": "for food",
            "price": "a",
            "image": "1",
        },
    ],
};

export default produce((state , action) => {
    switch(action.type) {
        case ADD_NEW_CANDY: 
            state.candiesArray.push(action.payload);
            break;
    }
} , initialState);