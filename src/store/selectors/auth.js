import { createSelector } from 'reselect';

const userIdSelector = state => state.auth.userId;
const tokenSelector = state => state.auth.token;
const authRedirectPathSelector = state => state.auth.authRedirectPath;
const loadingSelector = state => state.auth.loading;
const errorSelector = state => state.auth.error;

export const getUserId = createSelector(
    userIdSelector,
    userId => userId
);

export const getToken = createSelector(
    tokenSelector,
    token => token
);

export const isAuthenticated = createSelector(
    tokenSelector,
    token => token !== null
);

export const getAuthRedirectPath = createSelector(
    authRedirectPathSelector,
    authRedirectPath => authRedirectPath
);

export const isLoading = createSelector(
    loadingSelector,
    loading => loading
);

export const getError = createSelector(
    errorSelector,
    error => error ? error.message : null
);