import { combineReducers } from 'redux';
import { alert } from './alert';
import { user } from './user';
import { product } from './product';
import { transaction } from './transaction';

export default combineReducers({ alert, user, product, transaction });
