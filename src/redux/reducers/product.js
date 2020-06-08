import {PRODUCT_GET, PRODUCT_REMOVE} from '../actionTypes';

const initialState = {};

export const product = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_GET:
            return action.payload;

        case PRODUCT_REMOVE:
            return null;

        default:
            return state;
    }
};
