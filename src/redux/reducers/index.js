import { combineReducers } from 'redux';
import { alert } from './alert';
import { user } from './user';
import { product } from './product';
import { transaction } from './transaction';
import { stock } from './stock';
import { loading } from './loading';
import { customer } from './customer';

export default combineReducers({
    alert,
    user,
    product,
    transaction,
    stock,
    loading,
    customer,
});
