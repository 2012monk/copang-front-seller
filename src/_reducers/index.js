import { combineReducers } from 'redux';
import user from './user_reducer';
import {setter} from '../product/AddNewProduct/productRedux';

const rootReducer = combineReducers({
    user,
    setter,
});

export default rootReducer;