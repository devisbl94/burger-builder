import { createActions } from 'reduxsauce';
import axios from '../../axios-orders';

export const { Types, Creators } = createActions({
    purchaseBurgerSuccess: ['orderId', 'orderData'],
    purchaseBurgerFail: ['error'],
    purchaseBurgerStart: null,
    purchaseInit: null,
    fetchOrdersSuccess: ['orders'],
    fetchOrdersFail: ['error'],
    fetchOrdersStart: null

});

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(Creators.purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(Creators.purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(Creators.purchaseBurgerFail(error));
            });
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(Creators.fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(Creators.fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(Creators.fetchOrdersFail(error));
            });
    }
}