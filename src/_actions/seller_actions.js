//seller 
import axios from 'axios';
import {
    LOGIN_SELLER,
    REGISTER_SELLER,
    AUTH_SELLER,
    LOGOUT_SELLER
} from './types';
// import { USER_SERVER } from '../Pages/Config.js';
const USER_SERVER = "https://www.alconn.co/api";
export function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cValue = '';
    if (start !== -1) {
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end === -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

export function autoLoginWithAccessToken() {
    if(getCookie("accessToken")!==""){
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie("accessToken")}`;
        const res = axios.get('https://alconn.co/api/user')
        .then(response => response.data);
        console.log(res);
    ;
    }
}
export function registerSeller(dataToSubmit) {
    const request = axios.post('https://alconn.co/api/auth/signup/seller', dataToSubmit)
        .then(response => response.data);
    return {
        type: REGISTER_SELLER,
        payload: request
    }
}

export function loginSeller(dataToSubmit) {
    const request = axios.post('https://alconn.co/api/auth/login', dataToSubmit)
        .then(response => {
            return response.data;
        });
        
    console.log(request);
    return {
        type: LOGIN_SELLER,
        payload: request
    }
}

export async function auth() {
    //axios.defaults.header의 accesstoken값으로 사용자 인증
    // const request = axios.get(`${USER_SERVER}/seller/user`)
    // const request = await axios.get("https://alconn.co/api/seller/user")
    // .then(response => {
    //     console.log(response.data)
    //     return response.data.data;
    // })
    
    
    const request = await axios.get("https://alconn.co/api/seller/user")
    const data = await request.data;
        console.log(request);
        // .catch(err =>{
        //     return ({
        //         type: AUTH_SELLER,
        //         message: err.response.data.message
        //     });
        // });

    return {
        type: AUTH_SELLER,
        payload: data
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/auth/logout`)
        .then(response => response.data);
    
    return {
        type: LOGOUT_SELLER,
        payload: request
    }
}



