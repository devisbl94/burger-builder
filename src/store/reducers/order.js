import { createReducer } from 'reduxsauce';
import { Types as ReduxSauceTypes } from 'reduxsauce';
import actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INITIAL_STATE = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state = INITIAL_STATE, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state = INITIAL_STATE, action) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state = INITIAL_STATE, action) => {
    const { orderData, orderId } = action;
    const newOrder = updateObject(orderData, { id: orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state = INITIAL_STATE, action) => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state = INITIAL_STATE, action) => {
    return updateObject(state, { loading: true });  
}

const fetchOrdersSuccess = (state = INITIAL_STATE, action) => {
    const { orders } = action;
    return updateObject(state, {
        loading: false,
        orders: orders
    });
}

const fetchOrdersFail = (state = INITIAL_STATE, action) => {
    return updateObject(state, { loading: false });  
}

const defaultHandler = (state = INITIAL_STATE) => {
    return state;
}

const HANDLERS = {
    [actionTypes.PURCHASE_INIT]: purchaseInit,
    [actionTypes.PURCHASE_BURGER_START]: purchaseBurgerStart,
    [actionTypes.PURCHASE_BURGER_SUCCESS]: purchaseBurgerSuccess,
    [actionTypes.PURCHASE_BURGER_FAIL]: purchaseBurgerFail,
    [actionTypes.FETCH_ORDERS_START]: fetchOrdersStart,
    [actionTypes.FETCH_ORDERS_SUCCESS]: fetchOrdersSuccess,
    [actionTypes.FETCH_ORDERS_FAIL]: fetchOrdersFail,
    [ReduxSauceTypes.DEFAULT]: defaultHandler
}

export default createReducer(INITIAL_STATE, HANDLERS);