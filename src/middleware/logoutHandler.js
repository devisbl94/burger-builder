import createHandlerMiddleware from 'redux-handler-middleware';
import actionTypes from '../store/actions/actionTypes';

const handlerMiddleware = createHandlerMiddleware([{
    action: actionTypes.AUTH_LOGOUT,
    beforeHandler: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
    }
}]);

export default handlerMiddleware;