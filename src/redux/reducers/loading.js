import { LOADING_START, LOADING_END } from "../actionTypes";

export const loading = (state = false, action) => {
    switch (action.type) {
        case LOADING_START:
            return true;

        case LOADING_END:
            return false;

        default:
            return state;
    }
};
