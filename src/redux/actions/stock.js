import { get } from '../../axios';
import { addAlert } from './alert';
import { setLoading } from './loading';
import { STOCKS_ADD } from '../actionTypes';

export const getStocks = () => (dispatch) => {
    dispatch(setLoading(true))
    get(
        `/products/stocks`,
        ({ data }) => {
            dispatch({
                type: STOCKS_ADD,
                payload: {
                    data,
                },
            });
            dispatch(setLoading(false))
        },
        (error) => {
            dispatch(addAlert('Telah terjadi kesalahan'));
            dispatch(setLoading(false))
        }
    );
};
