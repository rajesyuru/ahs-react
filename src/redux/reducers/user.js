import { USER_SET, USER_REMOVE } from "../actionTypes";

const initialState = null;

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_SET:
            return action.payload;

        case USER_REMOVE:
            return null;

        default:
            return state;
    }
};
