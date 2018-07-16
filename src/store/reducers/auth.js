import { createReducer } from 'reduxsauce';
import { Types as ReduxSauceTypes } from 'reduxsauce';

import actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INITIAL_STATE = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state = INITIAL_STATE, action) => {
    return updateObject(state, { 
        error: null, 
        loading: true });
}

const authSuccess = (state = INITIAL_STATE, action) => {
    const { idToken, userId } = action;
    return updateObject(state, {
        token: idToken,
        userId: userId,
        error: null,
        loading: false
    });
}

const authFail = (state = INITIAL_STATE, action) => {
    const { error } = action;
    return updateObject(state, {
        error: error,
        loading: false
    });
}

const authLogout = (state = INITIAL_STATE, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
}

const setAuthRedirectPath = (state = INITIAL_STATE, action) => {
    const { path } = action;
    return updateObject(state, { authRedirectPath: path })
}

const defaultHandler = (state = INITIAL_STATE) => {
    return state;
}

const HANDLERS = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_LOGOUT]: authLogout,
    [actionTypes.SET_AUTH_REDIRECT_PATH]: setAuthRedirectPath,
    [ReduxSauceTypes.DEFAULT]: defaultHandler
}

export default createReducer(INITIAL_STATE, HANDLERS);