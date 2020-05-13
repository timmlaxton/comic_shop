import {   
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    SUB_QUANTITY,
    ADD_QUANTITY,
    UPDATE_CART_DETAIL,
    SET_CART_ITEMS
} from '../actions/types';

const initialState = {
    cartItems: [],
    cartDetail: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART_USER:
            return {...state, 
                cartItems: action.payload
            }
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        case GET_CART_ITEMS_USER:
            return {...state,cartDetail: action.payload }
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,            
                cartItems: action.payload.cart
            }
        case SUB_QUANTITY:
            return {...state, cartDetail: action.payload}
        case ADD_QUANTITY:
            return{...state, cartDetail: action.payload}

        case ON_SUCCESS_BUY_USER:
            return {
                ...state, 
                successBuy: action.payload.success,
                cartItems: action.payload.cart,
                cartDetail: action.payload.cartDetail
            }
        case UPDATE_CART_DETAIL:
            return {
                ...state,
                cartDetail: action.payload
            }
        default:
            return state
    }
}