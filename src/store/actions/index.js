import { Creators as burguerBuilderCreators, initIngredients } from './burgerBuilder';
import { Creators as orderCreators, purchaseBurger, fetchOrders } from './order';
import { Creators as authCreators, auth, authCheckState } from './auth';

export const { addIngredient, removeIngredient } = burguerBuilderCreators;
export { initIngredients };

export const { purchaseInit } = orderCreators;
export { purchaseBurger, fetchOrders };

export const { authLogout, setAuthRedirectPath } = authCreators;
export { auth, authCheckState };
