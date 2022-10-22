import AXIOS from 'axios';
import * as actionType from './actionTypes';


export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}
const authSucces = (tokenId, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}
const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expresTime')
    localStorage.removeItem('userId')
    return {
        type: actionType.AUTH_LOGOUT
    }


}
const authTimeOut = time => {
    return dispatch => {
        setTimeout(() => {

            dispatch(authLogout())
        }, time * 1000)
    }

}
export const authenticate = (email, password, isSignIn) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(authStart())
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCzDT9RcJ6PwhOqOwqdctKvr3oziUFiAY'
        if (isSignIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCzDT9RcJ6PwhOqOwqdctKvr3oziUFiAY'
        }

        AXIOS.post(url, authData)
            .then(res => {

               const date = new Date(new Date().getTime() + res.data.expiresIn * 1000)
             
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expresTime',date)
                localStorage.setItem('userId',res.data.localId)
                dispatch(authTimeOut(res.data.expiresIn))
                return dispatch(authSucces(res.data.idToken, res.data.localId))
            }).catch(err => {
               
                return dispatch(authFail(err.message))
            })
    }

}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expresTime'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucces(token, userId));
                dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const setAuthPath=path=>{
    return{
        type:actionType.AUTH_PATH,
        path:path
    }
}