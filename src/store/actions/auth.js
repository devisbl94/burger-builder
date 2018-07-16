import { createActions } from 'reduxsauce';
import axios from 'axios';

export const { Types, Creators } = createActions({
    authStart: null,
    authSuccess: ['idToken', 'userId'],
    authFail: ['error'],
    authLogout: null,
    setAuthRedirectPath: ['path'],
});

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(Creators.authLogout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(Creators.authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const googleURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
        let authAction = 'signupNewUser';
        const key = 'AIzaSyA5VQYiYzoN3vNLN1AcByIum3lUBFuL1MM';
        if (!isSignup) {
            authAction = 'verifyPassword';
        }
        let url = googleURL + '/' + authAction + '?key=' + key;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(Creators.authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(Creators.authFail(error.response.data.error));
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(Creators.authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(Creators.authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(Creators.authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}