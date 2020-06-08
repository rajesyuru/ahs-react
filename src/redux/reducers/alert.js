import { ALERT_ADD, ALERT_REMOVE } from "../actionTypes";

const intialState = [];

export const alert = (state = intialState, action) => {
    switch (action.type) {
        case ALERT_ADD:
            return [...state, action.payload];

        case ALERT_REMOVE:
            return state.filter((alert) => alert.id !== action.id);

        default:
            return state;
    }
};
