import { get } from '../../axios';
import { addAlert } from './alert';
import { TRANSACTION_ADD, TRANSACTION_REMOVE } from '../actionTypes';

export const getTransactions = (page) => (dispatch) => {
    get(
        `/transactions?limit=10&page=${page}`,
        ({data, page, totalPage, totalData}) => {
            dispatch({
                type: TRANSACTION_ADD,
                payload: {
                    data: data,
                    currentPage: page,
                    totalPage: totalPage,
                    totalData: totalData,
                },
            });
        },
        (error) => {
            dispatch(addAlert('Telah terjadi kesalahan'));
        }
    );
};
