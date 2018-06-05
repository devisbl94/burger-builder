import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
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
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
};