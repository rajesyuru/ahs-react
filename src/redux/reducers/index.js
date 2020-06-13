import { combineReducers } from "redux";
import { alert } from "./alert";
import { user } from "./user";
import { product } from './product';

export default combineReducers({ alert, user, product });
