import { post, get } from "../../axios";
import { addAlert } from "./alert";
import { PRODUCT_GET } from '../actionTypes';

export const getProducts = (page) => (dispatch) => {
    get(
        `/products?limit=10&page=${page}`,
         (success) => {
            dispatch({
                type: PRODUCT_GET,
                payload: {
                    data: success.data,
                    currentPage: success.page,
                    totalPage: success.totalPage,
                    totalData: success.totalData,
                }
            });
        },
        (error) => {
            dispatch(addAlert("Telah terjadi kesalahan"));
        }
    );
};

