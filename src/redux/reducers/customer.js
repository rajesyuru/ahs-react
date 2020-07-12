import { CUSTOMER_ADD, CUSTOMER_REMOVE } from '../actionTypes';

const initialState = null;

export const customer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_ADD:
            return action.payload;

        case CUSTOMER_REMOVE:
            return null;

        default:
            return state;
    }
};
