import { SET_MENU_OPEN, SET_MENU_CLOSE } from "../actionTypes";

export const menu = (state = false, action) => {
    switch (action.type) {
        case SET_MENU_OPEN:
            return true;

        case SET_MENU_CLOSE:
            return false;

        default:
            return state;
    }
};
