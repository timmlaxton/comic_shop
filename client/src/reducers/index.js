import {combineReducers} from 'redux';
import user from './user_reducer';
import products from './products_reducer'
import site from './site_reducer'
import cart from './cart_reducer'

const rootReducer = combineReducers({
    user,
    products,
    site,
    cart
});

export default rootReducer;