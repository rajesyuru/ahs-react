import { get } from '../../axios';
import { addAlert } from './alert';
import { setLoading } from './loading';
import { CUSTOMER_ADD } from '../actionTypes';

export const getCustomers = (page, name = '') => (dispatch) => {
    dispatch(setLoading(true));
    get(
        `/customers?page=${page}&limit=10${name.length > 0 ? `&name=${name}` : ''}`,
        ({ data, totalPage, totalData, page }) => {
            dispatch({
                type: CUSTOMER_ADD,
                payload: {
                    totalPage,
                    totalData,
                    page,
                    data,
                },
            });
            dispatch(setLoading(false));
        },
        (error) => {
            dispatch(addAlert('Telah terjadi kesalahan'));
            dispatch(setLoading(false));
        }
    );
};
