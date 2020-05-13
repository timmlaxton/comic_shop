import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_USER,
    ORDER_USER

    

} from '../actions/types';

const initialState = {
    loginSuccess: false
}
 

export default function(state=initialState,action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state, userData: null, loginSuccess: false }
        
        case UPDATE_DATA_USER:
            return{...state,updateUser: action.payload}
        case CLEAR_UPDATE_USER:
            return{...state,updateUser: action.payload}
        case ORDER_USER:
            return{...state, orderSuccess: action.payload}
        default:
            return state;
    }
}