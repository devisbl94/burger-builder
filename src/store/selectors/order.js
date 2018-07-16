import { createSelector } from 'reselect';

const ordersSelector = state => state.order.orders;
const purchasedSelector = state => state.order.purchased;
const loadingSelector = state => state.order.loading;

export const getOrders = createSelector(
    ordersSelector,
    orders => orders
);
export const purchased = createSelector(
    purchasedSelector,
    purchased => purchased
);
export const isLoading = createSelector(
    loadingSelector,
    loading => loading
);