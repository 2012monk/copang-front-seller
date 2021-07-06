import React, { useEffect } from 'react';
import { auth } from '../../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

/*
option : true - 로그인 되어야하는 컴포넌트
option : false - 로그아웃 되었을때 볼 수 있는 컴포넌트
option : null 로그인/아웃 상관없는 컴포넌트
*/
function Auth(Component, option) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        console.log(user);
        const dispatch = useDispatch();

        useEffect(() => {
            console.log("effect called!")
            dispatch(auth())
                .then(async response => {
                    console.log(response)
                    console.log(user.loginSuccess.role)
                    console.log((!(response.payload.message === "success") && option));
                    if(user.loginSuccess.role === "SELLER") {
                        props.history.push("/");
                    }else {
                        props.history.push("/login");
                    }

                    // if (!(option && (user.userData.message !== undefined))) {
                    //     console.log('option: false, message : success');
                    //     return (
                    //         <Component {...props} user={user} />
                    //     )
                    // }
                    // if((option && (user.userData.message ==="success"))) {
                    //     console.log('option: true, message : success');
                    //     return (
                    //         <Component {...props} user={user} />
                    //     )
                    // }
                }
                )
        }, [dispatch, props.history, user.loginSuccess])
        // 로그인, 회원가입페이지는 option : false
        return (
            <Component {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

export default Auth;
