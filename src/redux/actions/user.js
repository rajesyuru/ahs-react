import { post, get } from "../../axios";
import { addAlert } from "./alert";
import { USER_SET, USER_REMOVE, PRODUCT_REMOVE, TRANSACTION_REMOVE, STOCK_STAT_REMOVE_ALL } from "../actionTypes";

export const login = (email, password) => (dispatch) => {
    post(
        "/auth/login",
        {
            email,
            password,
        },
        (success) => {
            localStorage.setItem("token", success.token);
            localStorage.setItem("refreshToken", success.refreshToken);
            
            get(
                "/auth/me",
                ({ data }) => {
                    dispatch({
                        type: USER_SET,
                        payload: {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            group_id: data.group_id,
                            merchant_id: data.merchant_id,
                        },
                    });
                },
                (error) => {
                    dispatch(addAlert("Telah terjadi kesalahan"));
                }
            );
        },
        (error) => {
            dispatch(addAlert(error.message));
        }
    );
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch({ type: USER_REMOVE });
    dispatch({ type: PRODUCT_REMOVE });
    dispatch({ type: TRANSACTION_REMOVE });
    dispatch({type: STOCK_STAT_REMOVE_ALL})
};