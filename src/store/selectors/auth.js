export const getUserId = state => state.auth.userId;
export const getToken = state => state.auth.token;
export const isAuthenticated = state => state.auth.token !== null;
export const getAuthRedirectPath = state => state.auth.authRedirectPath;
export const isLoading = state => state.auth.loading;
export const getError = state => state.auth.error ? state.auth.error.message : null;