import React, { useEffect } from 'react';
import { auth } from '../../_actions/seller_actions';
import { useSelector, useDispatch } from "react-redux";

/*
option : true - 로그인 되어야하는 컴포넌트
option : false - 로그아웃 되었을때 볼 수 있는 컴포넌트
option : null 로그인/아웃 상관없는 컴포넌트
*/
function Auth(Component, option) {
    function AuthenticationCheck(props) {
        console.log(props);
        let user = useSelector(
            state => {
                console.log(state.user)
                return state.user;
            }
        );
        console.log(user);
        console.log(user.sellerData);

        try{
            console.log(user.sellerData.role);

        }catch(err){
            console.log(err)
        }
        
        const dispatch = useDispatch();
        let loginSuccess;
        useEffect(() => {
            console.log("effect called!")
            console.log(dispatch(auth()));
            dispatch(auth())
                .then(async response => {
                    console.log(response.payload.data.role);
                    loginSuccess = response.payload.data.role === "SELLER";
                    console.log(loginSuccess);
                    console.log(!loginSuccess && (option));
                    if(!loginSuccess) {
                        props.history.push("/login");
                    }
                
                }
                )
        }, [props.history])
        
        console.log(loginSuccess);
        // 로그인, 회원가입페이지는 option : false
        
        return (
            <Component {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

export default Auth;
