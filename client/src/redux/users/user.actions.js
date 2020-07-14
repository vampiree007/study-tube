import axios from 'axios';
import { } from './user.selectors';
import {USER_SERVER} from '../../components/config';

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

export const loginUser = (dataToSubmit) => {
    const request = axios.post('/api/v1/users/login', dataToSubmit)
    .then(response => response.data)

    return({
        type: 'LOGIN_USER',
        payload: request
    })
    
}
export const signupUser = (dataToSubmit) => {
    const request = axios.post('/api/v1/users/signup', dataToSubmit)
    .then(response => response.data)

    return({
        type: 'SIGNUP_USER',
        payload: request
    })
    
}
export const auth = (data) => {
    return {
        type: 'AUTH_USER',
        payload: data.data
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: 'LOGOUT_USER',
        payload: request
    }
}
//function is called and payload is passed into function parameter
//type is already set matching with user.reducer switch.case.value...