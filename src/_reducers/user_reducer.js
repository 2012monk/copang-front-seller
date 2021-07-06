import {
    LOGIN_SELLER,
    REGISTER_SELLER,
    AUTH_SELLER,
    LOGOUT_SELLER
} from '../_actions/types';


export default function (state = {}, action) {
    // console.log(action.payload);
    switch (action.type) {
        case REGISTER_SELLER:
            return { ...state, registerSeller: action.payload }
        case LOGIN_SELLER:
            return { ...state, loginSuccess: action.payload.data}
        case AUTH_SELLER:
            return { ...state, userData: action.payload }
        case LOGOUT_SELLER:
            return { ...state }
        

        default:
            return state;
    }
}