import { SET_MENU_OPEN, SET_MENU_CLOSE } from '../actionTypes';

export const setMenuState = (menu) => (dispatch) => {
    if (menu) {
        dispatch({ type: SET_MENU_OPEN });
    } else {
        dispatch({ type: SET_MENU_CLOSE });
    }
};
