import axios from 'axios';
import {
    
        LOGIN_USER,
        REGISTER_USER,
        AUTH_USER,
        LOGOUT_USER,
        UPDATE_DATA_USER,
        CLEAR_UPDATE_USER,
        ORDER_USER,    
       
    } from './types';
    
    import { USER_SERVER}  from '../components/utils/misc'
    
    export function registerUser(dataToSubmit){
       return async dispatch => {  
            const request = await axios.post(`${USER_SERVER}/register`,dataToSubmit)
                .then(response => response.data);
            return dispatch ({
                type: REGISTER_USER,
                payload: request
            })

  
   }
}

      
    
    export async function loginUser(dataToSubmit){
        return async dispatch => {
            const response = await axios.post(`${USER_SERVER}/login`,dataToSubmit)
            console.log('login user', response)
            return dispatch({
                type: LOGIN_USER,
                payload: response.data.loginSuccess
            })    
        }
    }


   
export function auth(user){
    return async dispatch => {
        const response = await axios.get(`${USER_SERVER}/auth`)
        console.log('auth response', response)
        
        return dispatch({
            type: AUTH_USER,
            payload: response.data
        })
    }    
}


export function logoutUser(user){
    console.log('logout user');
    return async dispatch => {
        const request = await axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);
    
    
        return dispatch ({
            type:LOGOUT_USER,
            payload: request
        })
    } 
    }
    

export function updateDataUser(dataToSubmit){
    return async dispatch => {
        const request = await axios.post(`${USER_SERVER}/update_profile`, dataToSubmit)
        .then(response => {
            console.log('updating user data', response)
            return response.data
        });
    
        return dispatch({
            type: UPDATE_DATA_USER,
            payload: request
        })
    
    }
    }
   

export function clearUpdateUser(){
    return {
        type: CLEAR_UPDATE_USER,
        payload: ''
    }
}

 export function orderUser(dataToSubmit){
       return async dispatch => {  
            const request = await axios.post(`${USER_SERVER}/standing_order`,dataToSubmit)
                .then(response => response.data);
            return dispatch ({
                type: ORDER_USER,
                payload: request
            })

  
   }
}

