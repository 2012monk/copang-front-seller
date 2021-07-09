import {
    LOGIN_SELLER,
    REGISTER_SELLER,
    AUTH_SELLER,
    LOGOUT_SELLER
} from '../_actions/types';


export default function (state = {}, action) {
    console.log(action);
    console.log(action.payload);
    switch (action.type) {
        case REGISTER_SELLER:
            return { ...state, registerSeller: action.payload }
        case LOGIN_SELLER:
            return { ...state, loginSuccess: action.payload}
        case AUTH_SELLER:
            console.log(typeof action.payload);
            return { ...state, sellerData: action.payload}
        case LOGOUT_SELLER:
            return { ...state }
        default:
            return state;
    }
}